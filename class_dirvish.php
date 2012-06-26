<?php

class dirvish {

	private $master_conf_path = '/etc/dirvish/master.conf';
	private $bank_folders;
	private $clients;

	function dirvish() {
		$this->load_master_conf();
	}

	private function load_master_conf() {

		$master_conf = file_get_contents($this->master_conf_path);

		preg_match('/bank:\n(.*)\n\n/msU',$master_conf,$matches);
		$this->bank_folders = explode("\n",$matches[1]);
		
	}

	private function scan_bank_folders() {

		foreach ($this->bank_folders as $bank_folder) {
			
			$bank_folder=trim($bank_folder);
			
			if (!preg_match('/\/$/',$bank_folder)) { $bank_folder = $bank_folder.'/'; }

			$backup_folders = scandir($bank_folder);

			$bank_array = array();

			$this->scan_backup_folders($bank_folder,$backup_folders,$bank_array);

			$this->clients[] = array('bank' => $bank_folder,
						'free_space' => $this->getSymbolByQuantity(disk_free_space($bank_folder)),
						'total_space' => $this->getSymbolByQuantity(disk_total_space($bank_folder)),
						'clients' => $bank_array);

		}

	}

	private function scan_backup_folders($bank_folder,$backup_folders,&$bank_array) {

		foreach ($backup_folders as $backup_folder) {

			if ($backup_folder!='.' && $backup_folder!='..' && is_dir($bank_folder.'/'.$backup_folder)) {

				$date_folders = scandir($bank_folder.$backup_folder,SCANDIR_SORT_DESCENDING);
				
				$this->scan_date_folders($bank_folder,$backup_folder,$date_folders,$bank_array);
			}
		}
	}

	private function scan_date_folders($bank_folder,$backup_folder,$date_folders,&$bank_array) {

		foreach ($date_folders as $date_folder) {
			if ($date_folder != 'dirvish') {
				if (file_exists($bank_folder.$backup_folder.'/'.$date_folder.'/summary')) {

					$this->parse_summary($bank_folder.$backup_folder.'/'.$date_folder.'/summary', $bank_folder.'/'.$backup_folder.'/dirvish/default.hist',$bank_array,$backup_folder);
				}
				break;
			}
		}
	}

	private function parse_summary($summary_path,$history_path,&$bank_array,$backup_folder) {

		$summary = file_get_contents($summary_path);

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

		$history = $this->parse_history($history_path);

		$summary = str_replace("\n",'<br/>',$summary);

		if (strtotime($image_now) < (time()-86400)) { $date_status = false; } else { $date_status = true; }

		$bank_array[] = array("client" => $client, "status" => $status, "backupBegin" => $backup_begin, "backupComplete" => $backup_complete, "imageNow" => $image_now, "date_status" => $date_status, "backup_folder" => $backup_folder);

	}

	private function parse_history($bank, $client) {

		$history_path = $bank.$client.'/dirvish/default.hist';

		$history = file_get_contents($history_path);
		$history_array = explode("\n",trim($history));

		array_shift($history_array);

		$history_array = array_reverse($history_array);

		$result = array();

		foreach($history_array as $history_line) {

			preg_match('/([0-9]+).([0-9]{4}-[0-9]{2}-[0-9]{2}).([0-9]{2}:[0-9]{2}:[0-9]{2}).([a-z0-9]+).(.+)/',$history_line,$history_line_matches);

			$history_summary = file_get_contents($bank.$client.'/'.$history_line_matches[1].'/summary');

			preg_match('/Status:(.*)/',$history_summary,$summary_matches);
			$status = trim($summary_matches[1]);

			$result[] = array("image" => $history_line_matches[1], "date" => $history_line_matches[2], "time" => $history_line_matches[3], "previous" => $history_line_matches[4], "expire" => $history_line_matches[5], "history_status" => $status);
		}

		return $result;
	}

	private function getSymbolByQuantity($bytes) {
		$symbols = array('B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB');
		$exp = floor(log($bytes)/log(1024));

		return sprintf('%.2f '.$symbols[$exp], ($bytes/pow(1024, floor($exp))));
	}

	public function get_clients() {

		$this->scan_bank_folders();
		return json_encode($this->clients);

	}

	public function get_history($bank, $client) {

		$history = $this->parse_history($bank,$client);

		return json_encode($history);

	}

	public function get_log($bank, $client, $image) {

		$log = str_replace("\n",'<br/>',trim(implode(gzfile($bank.$client.'/'.$image.'/log.gz'))));

		return json_encode($log);
	}

}

?>
