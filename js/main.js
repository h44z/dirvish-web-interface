$(document).ready(function() {

	$.getJSON('getClients.php', function(data) {

		$('#clients').empty();

		$.each(data, function(bank_key, bank_val) {

			$('#clients').append('<div class="span-24 prepend-top last"><strong>Bank :</strong> '+bank_val.bank+'<strong> - Free space : </strong>'+bank_val.free_space+' / '+bank_val.total_space+'</div><div id="title-bar" class="span-24 last"><div class="span-10">Client</div><div class="span-5">Last image</div><div class="span-3">Last job status</div><div class="span-6 last">Actions</div></div>');

			$.each(bank_val.clients, function(key, val) {

				if (val.date_status == true) { back_color = '#CDEB8B'; } else { back_color = '#D01F3C'; }

				$('#clients').append('<div class="span-24 last" style="background-color: '+back_color+';" id="client-'+bank_key+'-'+key+'"></div>');

				$('#client-'+bank_key+'-'+key).append('<div class="span-10">'+val.client+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-5">'+val.imageNow+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-3">'+val.status+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-6 last"><a href="#" onclick="sh_history(\''+bank_val.bank+'\',\''+val.backup_folder+'\');">Show history</a> | <a href="#" onclick="sh_summary(\''+bank_key+'-'+key+'\')">Show logs</div>');

				$('#client-'+bank_key+'-'+key).append('<div id="history-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24"></div>');

				$('#history-'+bank_key+'-'+key).append('<div class="span-4">Date</div><div class="span-4">Time</div><div class="span-4">Previous</div><div class="span-4">Image</div><div class="span-8 last">Expire</div>');

				$('#client-'+bank_key+'-'+key).append('<div id="summary-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24 last"><div style="margin: 20px;"></div></div>');	

				$('#history-'+bank_key+'-'+key).hide();
				$('#summary-'+bank_key+'-'+key).hide();
			});

		});
	});

});

function sh_history(bank_name,client_name) {

	$('#clients').hide("fade", 250, function() {

		$('#history').empty();

		$.getJSON('getHistory.php?bank='+bank_name+'&client='+client_name, function(data) {

			$('#history').append('<div class="span-24 prepend-top last"><strong>Bank :</strong> '+bank_name+'</div><div id="title-bar" class="span-24 last"><div class="span-3">Date</div><div class="span-3">Time</div><div class="span-5">Image</div><div class="span-5 last">Previous</div><div class="span-8">Expire</div></div>');

			$.each(data, function(key, val) {
				
				$('#history').append('<div class="span-24 last">'+
					'<div class="span-3">'+val.date+'</div>'+
					'<div class="span-3">'+val.time+'</div>'+
					'<div class="span-5">'+val.image+'</div>'+
					'<div class="span-5">'+val.previous+'</div>'+
					'<div class="span-8 last">'+val.expire+'</div></div>');

			});

		});

		$('#history').show("fade", 250);
	});

	/*if( $('#history-'+id).is(':hidden') ) {
		$('[id^=history-]').hide();
		$('[id^=summary-]').hide();
		$('#history-'+id).show();
	} else {
		$('#history-'+id).hide();
	}*/

}

function sh_summary(id) {

	if( $('#summary-'+id).is(':hidden') ) {
		$('[id^=history-]').hide();
		$('[id^=summary-]').hide();
		$('#summary-'+id).show();
	} else {
		$('#summary-'+id).hide();
	}

}

