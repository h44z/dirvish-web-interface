$(document).ready(function() {

	$.getJSON('clients.php', function(data) {

		$('#clients').empty();

		$.each(data, function(key, val) {
			$('#clients').append('<div id="client-'+key+'"></div>');

			$('#client-'+key).append('<div class="span-10">'+val.client+'</div>');
			$('#client-'+key).append('<div class="span-5">'+val.imageNow+'</div>');
			$('#client-'+key).append('<div class="span-3">'+val.status+'</div>');
			$('#client-'+key).append('<div class="span-6 last"><a href="#" onclick="sh_history('+key+');">Show history</a> | <a href="#" onclick="sh_summary('+key+')">Show logs</div>');

			$('#client-'+key).append('<div id="history-'+key+'" class="span-24"></div>');

			$.each(val.history, function(cnt,hist) {
	
				$('#history-'+key).append('<div class="span-4">'+hist.date+'</div><div class="span-4">'+hist.time+'</div><div class="span-4">'+hist.previous+'</div><div class="span-4">'+hist.image+'</div><div class="span-8 last">'+hist.expire+'</div>');

			});

			$('#client-'+key).append('<div id="summary-'+key+'" class="span-24 last">'+val.summary+'</div>');	

			$('#history-'+key).hide();
			$('#summary-'+key).hide();
		});
	});



});

function sh_history(id) {

	if( $('#history-'+id).is(':hidden') ) {
		$('#history-'+id).show();
	} else {
		$('#history-'+id).hide();
	}

}

function sh_summary(id) {

	if( $('#summary-'+id).is(':hidden') ) {
		$('#summary-'+id).show();
	} else {
		$('#summary-'+id).hide();
	}

}

