<table border="1" width="90%">
<tr>
<td>Client</td><td>Backup begin</td><td>Backup complete</td><td>Image now</td><td>Status</td>
</tr>
<?php

$master_conf_path = '/etc/dirvish/master.conf';

$master_conf = file_get_contents($master_conf_path);

preg_match('/bank:\n(.*)\n\n/msU',$master_conf,$matches);

$bank_folders = explode("\n",$matches[1]);

foreach ($bank_folders as $bank_folder) {

	$bank_folder=trim($bank_folder);

	$backup_folders = scandir($bank_folder);

	foreach ($backup_folders as $backup_folder) {

		if ($backup_folder!='.' && $backup_folder!='..' && is_dir($bank_folder.'/'.$backup_folder)) {

			$date_folders = scandir($bank_folder.'/'.$backup_folder,SCANDIR_SORT_DESCENDING);

			foreach ($date_folders as $date_folder) {
				if ($date_folder != 'dirvish') {
					if (file_exists($bank_folder.'/'.$backup_folder.'/'.$date_folder.'/summary')) {
							$summary = file_get_contents($bank_folder.'/'.$backup_folder.'/'.$date_folder.'/summary');

							preg_match('/client:(.*)/',$summary,$summary_matches);
							$client = trim($summary_matches[1]);
							
							preg_match('/Status:(.*)/',$summary,$summary_matches);
							$status = trim($summary_matches[1]);

							preg_match('/Backup-begin:(.*)/',$summary,$summary_matches);
							$backup_begin = trim($summary_matches[1]);

							preg_match('/Backup-complete:(.*)/',$summary,$summary_matches);
							$backup_complete = trim($summary_matches[1]);

							preg_match('/Image-now:(.*)/',$summary,$summary_matches);
							$image_now = trim($summary_matches[1]);


							echo '<tr>';
							echo '<td>'.$client.'</td>';
							echo '<td>'.$backup_begin.'</td>';
							echo '<td>'.$backup_complete.'</td>';
							if (date('Ymd',strtotime($image_now))==date('Ymd',time())) {
								echo '<td style="background-color: #00FF00">'.$image_now.'</td>';
							} else {
								echo '<td style="background-color: #FF0000">'.$image_now.'</td>';
							}
							
							if ($status=='success') { echo '<td style="background-color: #00FF00">'.$status.'</td>'; } else { '<td style="background-color: #FF0000">'.$status.'</td>'; }
							echo '<tr>';
					}
					break;
				}
			}
		}

	}
}

?>

</table>
