var emoji;

$(document).ready(() => {
	// One time initilization on pexxmoji object
	emoji = new pexxmoji['pexxmoji'](
		$, window, $('.px_mj_ar_a_1_a_2:eq(0)'), $('.px_mj_ar_b:eq(0)')
	);
	
	return $('.px_splash').remove();
});

var pm_in = (a) => {
	var b = $('.px_mj_ar_a_1_a_2:eq(0)');
	if (b.text().length == 0) return alert('Enter a text');
	
	// Extract input text (string with raw unicoded emoji) and convert to `rendable` 
	// elements and show.
	$('.px_mj_ar_c p:eq(0)').find('span').html(
		pexxmoji['mojiparser']($, emoji.utils_getv(), 'to_html' ).replace(/\\n/g, '<br>')
	);

	// Extract string (containing raw unicoded emoji) from the already rendered content 
	// by the previous line of code.
	$('.px_mj_ar_c p:eq(1)').find('span').text( pexxmoji['mojiparser']($, b, 'to_text' ) );

	b.html('');
	b.blur();
	$('.px_mj_ar_c').show();
};

var pm_eo = (a) => {
	$('.px_mj_ar_c').hide();
	if ($('.px_mj_ar_b:eq(0)').is(':visible')) return $('.px_mj_ar_b:eq(0)').hide();
	$('.px_mj_ar_b:eq(0)').show();
	if ($('.px_mj_ar_b:eq(0)').find('.pm_main').length != 0) {
		return $('.px_mj_ar_b:eq(0)').find('.pm_mo_acts:eq(0)').click();
	}
};

var pm_ci = (a) => {
	$('.px_mj_ar_c').hide();
	if ($(a).text().length == 0) return $('.px_mj_ar_a_1_a_1').show();
	$('.px_mj_ar_a_1_a_1').hide();
};

var pm_sf = (a, b) => {
	if (
		($(b.target).closest('.px_mj_ar_a_1_b').length == 0) && 
		($(b.target).closest('.px_mj_ar_b').length == 0)
	) {
		if ($('.px_mj_ar_b:eq(0)').is(':visible')) return $('.px_mj_ar_b:eq(0)').hide();
	}
};

var pm_li = (a) => {
	var b = document.createElement('a');
	b.href = a;
	b.target = '_blank';
	b.click();
};
