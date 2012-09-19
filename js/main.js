$(document).ready(function() {

	$.getJSON('getClients.php', function(data) {

		$('#clients').empty();

		$.each(data, function(bank_key, bank_val) {

			$('#clients').append('<div class="row"><div class="span12"><strong><i class="icon-folder-open"></i> Bank :</strong> '+bank_val.bank+'<strong> - <i class="icon-hdd"></i> Free space : </strong>'+bank_val.free_space+' / '+bank_val.total_space+'</div></div>');

			table_rows = "";

			$.each(bank_val.clients, function(key, val) {

				if (val.date_status == true && val.status == 'success') { back_color = 'success_row'; } else if (val.status == 'success') { back_color = 'warning_row'; } else { back_color = 'error_row'; }

				table_rows += '<div class="row '+back_color+'" style="margin-top: 5px; margin-bottom: 5px;">';
				table_rows += '<div class="span4">'+val.client+'</div>';
				table_rows += '<div class="span3">'+val.imageNow+'</div>';
				table_rows += '<div class="span3">'+val.status+'</div>';
				table_rows += '<div class="span2"><i class="icon-eye-open"></i> <a href="#" onclick="show_history(\''+bank_val.bank+'\',\''+val.backup_folder+'\');">Show details</a></div>';
				table_rows += '</div>';
			});

			$('#clients').append('<div class="row" style="background-color: #000000; color: #FFFFFF; font-weight: bold; margin-top: 5px; margin-bottom: 5px;"><div class="span4">Client</div><div class="span3">Last image</div><div class="span3">Last job status</div><div class="span2">Actions</div></div>'+table_rows+'<div class="row"><div class="span12" style="height: 30px;"></div></div>');
		});
	});

});

function show_history(bank_name,client_name) {

	$('#clients').hide(0, function() {

		$('#history').empty();



		$.getJSON('getHistory.php?bank='+bank_name+'&client='+client_name, function(data) {

			$('#history').append('<div class="row"><div class="span12"><a href="index.php"><i class="icon-arrow-left"></i> Back to clients</a> - <strong>Bank :</strong> '+bank_name+'<strong> - Client :</strong> '+client_name+'</div></div>');

			table_rows = "";

			$.each(data, function(key, val) {
				
				if (val.history_status == 'success') { back_color = 'success_row'; } else { back_color = 'error_row'; }

				table_rows += '<div class="row '+back_color+'" style="margin-top: 5px; margin-bottom: 5px;">';
				table_rows += '<div class="span2">'+val.date+'</div>';
				table_rows += '<div class="span1">'+val.time+'</div>';
				table_rows += '<div class="span1">'+val.image+'</div>';
				table_rows += '<div class="span2">'+val.history_status+'</div>';
				table_rows += '<div class="span4">'+val.expire+'</div>';
				table_rows += '<div class="span2"><i class="icon-eye-open"></i> <a href="#" onclick="show_log(\''+bank_name+'\', \''+client_name+'\', \''+val.image+'\')">Show log</a></div></div>';
			});

			$('#history').append('<div class="row" style="background-color: #000000; color: #FFFFFF; font-weight: bold; margin-top: 5px; margin-bottom: 5px;"><div class="span2">Date</div><div class="span1">Time</div><div class="span1">Image</div><div class="span2">Status</div><div class="span4">Expire</div><div class="span2">Actions</div></div>'+table_rows+'<div class="row"><div class="span12" style="height: 30px;"></div>');

		});

		$('#history').show();
	});

}

function show_clients() {

	$('#history').hide(0, function() {
	
		$('#clients').show();

	});

}

function show_log(bank_name, client_name, image_name) {

	$('#history').hide("fade", 250, function() {

		$('#log').empty();

		$.getJSON('getLog.php?bank='+bank_name+'&client='+client_name+'&image='+image_name, function(data) {

			$('#log').append('<div class="span-24 prepend-top last"><div class="span-23"><strong>Bank :</strong> '+bank_name+'<strong> - Client :</strong> '+client_name+'<strong> - Image :</strong> '+image_name+'</div><div class="span-1 last"><a href="#" onclick="log_to_history();">Back</a></div></div><div id="title-bar" class="span-24 last">Log</div>');

			$('#log').append('<div class="span-24 last" style="background-color: #CCCCCC;"><div style="margin: 10px;">'+data+'</div></div>');

		});

		$('#log').show("fade", 250);
	});

}

function log_to_history() {

	$('#log').hide("fade", 250, function() {
		
		$('#log').empty();

		$('#history').show("fade", 250);

	});

}
