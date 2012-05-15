<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Dirvish Web Interface</title>

	<link rel="stylesheet" href="css/blueprint/screen.css" type="text/css" media="screen, projection" />
	<link rel="stylesheet" href="css/blueprint/print.css" type="text/css" media="print" />    
	<!--[if IE]><link rel="stylesheet" href="css/blueprint/ie.css" type="text/css" media="screen, projection" /><![endif]-->
	<link rel="stylesheet" href="css/global.css" type="text/css" media="screen" />
</head>

<body>

<div class="container show_grid">

<div class="span-24 last"><img src="img/logo.png" alt="Dirvish Web Interface"></img></div>

<table border="1">
	<thead>
		<tr>
			<th>Client</th><th>Backup begin</th><th>Backup complete</th><th>Last image backuped</th><th>Last job status</th>
		</tr>
	</thead>

		<?php

		require('config.php');

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
										echo '<td><div class="success_div">'.$image_now.'</div></td>';
									} else {
										echo '<td><div class="error_div">'.$image_now.'</div></td>';
									}
									
									if ($status=='success') {
										echo '<td><div class="success_div">'.$status.'</div></td>';
									} else {
										echo '<td><div class="error_div">'.$status.'</div></td>';
									}
									echo '</tr>';
							}
							break;
						}
					}
				}

			}
		}

		?>

</table>
</div>

</body>
</html>
