$(document).ready(function() {

	$.getJSON('getClients.php', function(data) {

		$('#clients').empty();

		$.each(data, function(bank_key, bank_val) {

			$('#clients').append('<div class="span-24 prepend-top last"><strong>Bank :</strong> '+bank_val.bank+'<strong> - Free space : </strong>'+bank_val.free_space+' / '+bank_val.total_space+'</div><div id="title-bar" class="span-24 last"><div class="span-9">Client</div><div class="span-5">Last image</div><div class="span-5">Last job status</div><div class="span-5 last">Actions</div></div>');

			$.each(bank_val.clients, function(key, val) {

				if (val.date_status == true) { back_color = '#CDEB8B'; } else { back_color = '#D01F3C'; }

				$('#clients').append('<div class="span-24 last" style="background-color: '+back_color+';" id="client-'+bank_key+'-'+key+'"></div>');

				$('#client-'+bank_key+'-'+key).append('<div class="span-9">'+val.client+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-5">'+val.imageNow+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-5">'+val.status+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-5 last"><a href="#" onclick="show_history(\''+bank_val.bank+'\',\''+val.backup_folder+'\');">Show details</a></div>');

				$('#client-'+bank_key+'-'+key).append('<div id="history-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24"></div>');

				$('#history-'+bank_key+'-'+key).append('<div class="span-4">Date</div><div class="span-4">Time</div><div class="span-4">Previous</div><div class="span-4">Image</div><div class="span-8 last">Expire</div>');

				$('#client-'+bank_key+'-'+key).append('<div id="summary-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24 last"><div style="margin: 20px;"></div></div>');	

				$('#history-'+bank_key+'-'+key).hide();
				$('#summary-'+bank_key+'-'+key).hide();
			});

		});
	});

});

function show_history(bank_name,client_name) {

	$('#clients').hide("fade", 250, function() {

		$('#history').empty();

		$.getJSON('getHistory.php?bank='+bank_name+'&client='+client_name, function(data) {

			$('#history').append('<div class="span-24 prepend-top last"><div class="span-23"><strong>Bank :</strong> '+bank_name+'<strong> - Client :</strong> '+client_name+'</div><div class="span-1 last"><a href="#" onclick="show_clients();">Back</a></div></div><div id="title-bar" class="span-24 last"><div class="span-3">Date</div><div class="span-3">Time</div><div class="span-3">Image</div><div class="span-3">Previous</div><div class="span-3">Status</div><div class="span-6">Expire</div><div class="span-3 last">Actions</div></div>');

			$.each(data, function(key, val) {
				
				if (val.history_status == "success") { back_color = '#CDEB8B'; } else { back_color = '#D01F3C'; }
				$('#history').append('<div class="span-24 last" style="background-color: '+back_color+'">'+
					'<div class="span-3">'+val.date+'</div>'+
					'<div class="span-3">'+val.time+'</div>'+
					'<div class="span-3">'+val.image+'</div>'+
					'<div class="span-3">'+val.previous+'</div>'+
					'<div class="span-3">'+val.history_status+'</div>'+
					'<div class="span-6">'+val.expire+'</div>'+
					'<div class="span-3 last"><a href="#" onclick="show_log(\''+bank_name+'\', \''+client_name+'\', \''+val.image+'\')">Show log</a></div></div>');

			});

		});

		$('#history').show("fade", 250);
	});

}

function show_clients() {

	$('#history').hide("fade", 250, function() {
	
		$('#clients').show("fade", 250);

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
