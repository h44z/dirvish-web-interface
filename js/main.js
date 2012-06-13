$(document).ready(function() {

	$.getJSON('clients.php', function(data) {

		$('#clients').empty();

		$.each(data, function(bank_key, bank_val) {

			$('#clients').append('<div class="span-24 prepend-top last"><strong>Bank :</strong> '+bank_val.bank+'<strong> - Free space : </strong>'+bank_val.free_space+' / '+bank_val.total_space+'</div><div id="title-bar" class="span-24 last"><div class="span-10">Client</div><div class="span-5">Last image</div><div class="span-3">Last job status</div><div class="span-6 last">Actions</div></div>');

			$.each(bank_val.clients, function(key, val) {

				if (val.status == 'success') { back_color = '#CDEB8B'; } else { back_color = '#D01F3C'; }

				$('#clients').append('<div class="span-24 last" style="background-color: '+back_color+';" id="client-'+bank_key+'-'+key+'"></div>');

				$('#client-'+bank_key+'-'+key).append('<div class="span-10">'+val.client+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-5">'+val.imageNow+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-3">'+val.status+'</div>');
				$('#client-'+bank_key+'-'+key).append('<div class="span-6 last"><a href="#" onclick="sh_history(\''+bank_key+'-'+key+'\');">Show history</a> | <a href="#" onclick="sh_summary(\''+bank_key+'-'+key+'\')">Show logs</div>');

				$('#client-'+bank_key+'-'+key).append('<div id="history-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24"></div>');

				$('#history-'+bank_key+'-'+key).append('<div class="span-4">Date</div><div class="span-4">Time</div><div class="span-4">Previous</div><div class="span-4">Image</div><div class="span-8 last">Expire</div>');

				$.each(val.history, function(cnt,hist) {
		
					$('#history-'+bank_key+'-'+key).append('<div class="span-4">'+hist.date+'</div><div class="span-4">'+hist.time+'</div><div class="span-4">'+hist.previous+'</div><div class="span-4">'+hist.image+'</div><div class="span-8 last">'+hist.expire+'</div>');

				});

				$('#client-'+bank_key+'-'+key).append('<div id="summary-'+bank_key+'-'+key+'" style="background-color: #EEEEEE;" class="span-24 last"><div style="margin: 20px;">'+val.summary+'</div></div>');	

				$('#history-'+bank_key+'-'+key).hide();
				$('#summary-'+bank_key+'-'+key).hide();
			});

		});
	});

});

function sh_history(id) {

	if( $('#history-'+id).is(':hidden') ) {
		$('[id^=history-]').hide();
		$('[id^=summary-]').hide();
		$('#history-'+id).show();
	} else {
		$('#history-'+id).hide();
	}

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

