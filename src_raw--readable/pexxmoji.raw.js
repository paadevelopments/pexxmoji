/*
 * pexxmoji ~ v2.0.0
 * Author: 	Paa < paa.code.me@gmail.com >
 * License: MIT
 */
(function (global,factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.pexxmoji = factory());
}(this, (function() {

'use strict';


var pexxmoji = function(jquery, win, input, etray, tab_icons, copts){

	// Check if chosen tray is empty or aready containing an pexxmoji setup
	if (etray.find('.pm_main').length != 0) return etray.find('.pm_mo_acts:eq(0)').click();

	// Check for required input and tray elements
	if (input.length == 0) {
		console.log('no input found'); return false;
	}
	if (etray.length == 0) {
		console.log('no tray found'); return false;
	}
	
	// Default main pexxmoji object options
	var self = this,
	default_icons = [ '🕒', '🙂', '🐱', '☕', '🎮', '🚖', '💡', '💓', '🚩' ],
	default_dopts = {
		focus: function(event){ /* natm */ },
		blur: function(event){ /* natm */ },
		input: function(event){ /* natm */ },
		cursor: {
			'selection': false, 'range': false, 'parent_node': false, 'text_fill': false
		}
	};
	self.input = input;
	self.etray = etray;
	self.$ = jquery;
	self.window = win;
	self.input_runna = false;
	self.tray_busy = true;
	self.icons = self.$.extend(true, default_icons, tab_icons);
	self.oopts = self.$.extend(true, default_dopts, copts);
	self.input_parentNode = self.oopts.cursor['parent_node'];
	self.input_range = self.oopts.cursor['range'];
	self.input_selection = self.oopts.cursor['selection'];
	self.input_found = self.oopts.cursor['text_fill'];
	
	// Begin initial build setup
	self.setup_init();
};


// Initial pexxmoji build setup
pexxmoji.prototype.setup_init = function(){
	var self = this;

	// Construct tray elements
	self.etray.html('');
	var a = self.window.document.createElement('div');
	a.setAttribute('class', 'pm_main');
	self.etray.append(a);
	var b = self.window.document.createElement('div');
	b.setAttribute('class', 'pm_main_one');
	self.$(a).append(b);
	var c = self.window.document.createElement('div');
	c.setAttribute('class', 'pm_main_two');
	self.$(a).append(c);

	// Add onscoll event to handle tray tab emoji load more ( automatically )
	self.etray.find('.pm_main_two').on('scroll', function(){
		var a = self.$(this);
		if (((a.scrollTop() + a.innerHeight()) > (a[0].scrollHeight - 40)) && !self.tray_busy) {
			self.tray_busy = true;
			self.etray.find('.pm_mt_tabs').each(function(){
				var aa = self.$(this);
				if (aa.is(':visible')) {
					switch (aa.attr('id')) {
						case 'pm_mt_a': ;
							break;
						case 'pm_mt_b':
							self.utils_setm(true, em_sm, aa.attr('id'));
							break;
						case 'pm_mt_c':
							self.utils_setm(true, em_na, aa.attr('id'));
							break;
						case 'pm_mt_d':
							self.utils_setm(true, em_fo, aa.attr('id'));
							break;
						case 'pm_mt_e':
							self.utils_setm(true, em_ac, aa.attr('id'));
							break;
						case 'pm_mt_f':
							self.utils_setm(true, em_pl, aa.attr('id'));
							break;
						case 'pm_mt_g':
							self.utils_setm(true, em_ob, aa.attr('id'));
							break;
						case 'pm_mt_h':
							self.utils_setm(true, em_sy, aa.attr('id'));
							break;
						default:
							self.utils_setm(true, em_fg, aa.attr('id'));
							break;
					}
					return false;	
				}
			});
		}
	});

	// Load tray tabs and controls
	for (var lo = 0;lo < 9;lo++) {
		self.utils_cons(lo);
	}
	for (var lo = 0;lo < 9;lo++) {
		self.utils_tabs(lo);
	}

	// Setup tray tab element event listeners
	self.etray.find('.pm_mo_acts').off();
	self.etray.find('.pm_mo_acts').on('click', function(){
		var a = self.$(this);
		a.addClass('pm_pmaa');
		a.siblings('button').removeClass('pm_pmaa');
		self.etray.find('.pm_mt_tabs').each(function(){
			var aa = self.$(this);
			if (aa.attr('id') == a.data('pm-tg')) {
				aa.show();
				self.etray.find('.pm_main_two').scrollTop(0);
			} else {
				aa.hide();
			}
		});
		self.setup_btns(a.data('pm-tg'));
	});
	self.etray.find('.pm_mo_acts:eq(0)').click();
	clearInterval(self.input_runna);

	// Setup input element event listeners
	self.input.off('focus blur input');
	self.input.on('focus', function(ev){
		var a = self.$(this);
		self.input_runna = setInterval(function(){
			self.input_selection = window.getSelection();
			self.input_range = self.input_selection.getRangeAt(0);
			self.input_parentNode = self.input_range.commonAncestorContainer.parentNode;
		}, 10);
		self.oopts.focus(ev);
	}).on('blur', function(ev){
		var a = self.$(this);
		clearInterval(self.input_runna);
		self.oopts.blur(ev);
	}).on('input', function(ev){
		var a = self.$(this);
		self.input_found = self.input.text().trim().length != 0;
		self.oopts.input(ev);
	});

	// Responsive tray [ Experimental ]. Resizes tray buttons emoji sizes on window resize.
	// Enable block below for activation.
	// self.$(self.window).on('resize', function(){
	// 	var a = self.etray;
	// 	if (a.width() > 500) {
	// 		a.find('.pm').attr('style','font-size:'+ 35 +'px;');
	// 	} else if (a.width() < 500 && a.width() > 370) {
	// 		a.find('.pm').attr('style','font-size:'+ 30 +'px;');
	// 	} else {
	// 		a.find('.pm').attr('style','font-size:'+ 25 +'px;');
	// 	}
	// });
};


// Tray tab buttons action handler
pexxmoji.prototype.setup_btns = function(a){
	var self = this;
	if (a == 'pm_mt_a') return self.utils_setm(false, '', a);
	if (self.etray.find('#'+ a).html() == '') {
		switch(a){
			case 'pm_mt_b':
				self.utils_setm(true, em_sm, a);
				break;
			case 'pm_mt_c':
				self.utils_setm(true, em_na, a);
				break;
			case 'pm_mt_d':
				self.utils_setm(true, em_fo, a);
				break;
			case 'pm_mt_e':
				self.utils_setm(true, em_ac, a);
				break;
			case 'pm_mt_f':
				self.utils_setm(true, em_pl, a);
				break;
			case 'pm_mt_g':
				self.utils_setm(true, em_ob, a);
				break;
			case 'pm_mt_h':
				self.utils_setm(true, em_sy, a);
				break;
			default:
				self.utils_setm(true, em_fg, a);
				break;
		}
		return;
	}
};


// Tray tab emoji buttons loader
pexxmoji.prototype.utils_setm = function(a, b, c){
	var self = this,
		font_size  = 0,
		width = self.etray.width(),
		emo_batch = 'pm_mt_e_'+ Date.now(),
		old_index = 0;
	if (width > 500) {
		font_size = 35;
	} else if ((width < 500) && (width > 370)) {
		font_size = 30;
	} else {
		font_size = 25;
	}
	if (!a) {

		// Load from `Frequently Used` history
		self.etray.find('#'+ c).html('');
		var aa = self.utils_emfc();
		if (aa.length == 0) {
			self.etray.find('#'+ c).html('<div class="pm_mt_tno">Frequently used pexxmoji(s) will display here</div>');
			self.tray_busy = false;
			return;
		}
		var bb = 0;
		for (var lo = aa.length - 1;lo >= 0;lo--) {
			bb += 1;
			var cc = self.window.document.createElement('button');
			if (bb == 9) {
				cc.setAttribute('class', emo_batch + ' pm_mt_each pm_icnd');
				bb = 0;
			} else {
				cc.setAttribute('class', emo_batch + ' pm_mt_each');
			}
			var dd = self.utils_emid(aa[lo], { '{': '', '}': '', 'u': '' });
			cc.innerHTML = '<i class=\'pm pm-' + dd[0] + '\' data-pm-co=\'' + dd[1] +
						   '\' data-pm-va=\'' + aa[lo] + '\' style="font-size:'+ font_size +'px;"></i>';
			self.etray.find('#'+ c).append(cc);
		}
	} else {

		// Load tab emojis-set per tab category
		var ee = self.etray.find('#'+ c).data('pm-lc'),
			ef = self.etray.find('#'+ c).data('pm-te');
		old_index = ee;
		if (!b[ (ee + 1) ]) {
			self.tray_busy = false;
			return;
		}
		self.etray.find('#'+ c).data('pm-lc', ee + 45);
		var bb = 0;
		for (var lo = ee; lo < (ee + 45); lo++) {
			if (!b[lo]) {
				break;
			}
			bb += 1;
			var cc = self.window.document.createElement('button');
			if (bb == 9) {
				cc.setAttribute('class', emo_batch + ' pm_mt_each pm_icnd');
				bb = 0;
			} else {
				cc.setAttribute('class', emo_batch + ' pm_mt_each');
			}
			var dd = self.utils_emid(b[lo], { '{': '', '}': '', 'u': '' });
			cc.innerHTML = '<i class=\'pm pm-' + dd[0] + '\' data-pm-co=\'' + dd[1] +
						   '\' data-pm-va=\'' + b[lo] + '\' style="font-size:'+ font_size +'px;"></i>';
			self.etray.find('#'+ c).append(cc);
		}
	}

	// Loaded tab emoji buttons event listener
	self.etray.find('#'+ c +' .'+ emo_batch).off();
	self.etray.find('#'+ c +' .'+ emo_batch).on('click', function(){
		var a = self.$(this).find('i').data('pm-co'),
			b = self.input.scrollTop();
		if ((self.input.scrollTop() + self.input.innerHeight()) >= self.input[0].scrollHeight) {
			b = self.input[0].scrollHeight;
		}
		if (self.input_found) {
			self.utils_stxt(a);
		} else if (self.input.text().length != 0) {
			self.input.html(self.input.html() + '<span>' + a + '</span>');
		} else {
			self.input.html('<span>' + a + '</span>');
		}
		if (!self.input_found) {
			self.input.blur();
		}
		self.input.scrollTop(b);
		var f = self.$(this).find('i').data('pm-va'),
			g = self.utils_emfc(),
			h = true;
		if (g.length > 0) {
			if (g.indexOf(f) >= 0) {
				h = false;
			}
		}

		// Store used emoji to localStorage
		if (h) {
			if (g.length > 0) {
				g.push(f);
				if (g.length > 40) {
					g.shift();
				}
				self.window.localStorage.setItem('pm-fv-ls', JSON.stringify(g));
			} else {
				var i = [];
				i[0] = f;
				self.window.localStorage.setItem('pm-fv-ls', JSON.stringify(i));
			}
		}
	});

	// Handle `Load More` action manually
	if (self.etray.find('#'+ c).data('pm-pi') == 0) {
		if (
			(((old_index + 45) / 9) * 40) < (self.etray.find('.pm_main_two').height() + 5)
		) return self.utils_setm(true, b, c);
		self.etray.find('#'+ c).data('pm-pi', 1);
	}

	// Sets tray build up state to idle ( for initial pexxmoji setup )
	self.tray_busy = false;
};


// Tray tabs builder
pexxmoji.prototype.utils_tabs = function(a){
	var self = this,
		b = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
		c = self.window.document.createElement('div'),
		d = [ 40, 396, 199, 123, 117, 121, 220, 294, 258 ];
	c.setAttribute('data-pm-lc', 0);
	c.setAttribute('data-pm-pi', 0);
	c.setAttribute('data-pm-te', d[a]);
	c.setAttribute('id', 'pm_mt_'+ b[a]);
	c.setAttribute('class', 'pm_mt_tabs');
	self.etray.find('.pm_main_two').append(c);
};


// Tray controls builder
pexxmoji.prototype.utils_cons = function(a){
	var self = this,
		b = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
		c = self.window.document.createElement('button');
	if (a == 8) {
		c.setAttribute('class', 'pm_mo_acts pm_icnd');
	} else {
		c.setAttribute('class', 'pm_mo_acts');
	}
	c.setAttribute('data-pm-tg', 'pm_mt_'+ b[a]);
	c.innerHTML = self.icons[a];
	self.etray.find('.pm_main_one').append(c);
};


// Random string generater
pexxmoji.prototype.utils_rand = function(a){
	var self = this,
		b = '',
		c = 'abcdefghijklmnopqrstuvwxyz0123456789',
		d = c.length;
	for (var e = 0;e < a;e++) {
		b += c.charAt(Math.floor(Math.random() * d));
	}
	return b;
};


// Selected emoji processor ( adds selected emoji to the active input at current cursor position )
pexxmoji.prototype.utils_stxt = function(a){
	var self = this,
		aa = document.createElement('span'); 
	aa.innerHTML = a;
	self.input_range.deleteContents();
	self.input_range.insertNode(aa);
	self.input_range.collapse(false);
	self.input_selection.removeAllRanges();
	self.input_selection.addRange(self.input_range);
	self.input.blur();
};


// Frequently used emoji getter
pexxmoji.prototype.utils_emfc = function(){
	var self = this,
		a = '',
		b = JSON.parse(self.window.localStorage.getItem('pm-fv-ls'));
	if (b) {
		a = b;
	}
	return a;
};


// Selected emoji code processor & setter ( extacts & sets selected emoji's unicode in input )
pexxmoji.prototype.utils_emid = function(a, b){
	var self = this,
		c = [];
	c[0] = a.replace(new RegExp('(' + Object.keys(b).map(function(aa) {
		return aa.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
	}).join('|') + ')', 'g'), function(ab) {
		return b[ab];
	});
	c[1] = a.replace(/u/g, '&#x').replace(/{/g, '').replace(/}/g, '');
	return c;
};


// Input area text checker
pexxmoji.prototype.utils_inps = function(){
	var self = this;
	self.input_found = self.input.text().trim().length != 0;
};


// Input area content extractor and serializer
pexxmoji.prototype.utils_getv = function(){
	var self = this;
	return self.input.html()
	.replace(/\\/g, '∖')
	.replace(/&#10;/g, '\n')
	.replace(/&#09;/g, '\t')
	.replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, '$1')
	.replace(/<i[^>]*data-pm-co="([^"]+)"[^>]*><\/i>/ig, '$1')
	.replace(/\n|\r/g, '')
	.replace(/<br[^>]*>/ig, '\n')
	.replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/ig, '<div>')
	.replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/ig, '</div>')
	.replace(/\n<div><\/div>/ig, '\n')
	.replace(/<div><\/div>\n/ig, '\n')
	.replace(/(?:<div>)+<\/div>/ig, '\n')
	.replace(/([^\n])<\/div><div>/ig, '$1\n')
	.replace(/(?:<\/div>)+/ig, '</div>')
	.replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
	.replace(/<\/div>/ig, '')
	.replace(/([^\n])<div>/ig, '$1\n')
	.replace(/\n<div>/ig, '\n')
	.replace(/<div>\n/ig, '\n')
	.replace(/<(?:[^>]+)?>/g, '')
	.replace(/&nbsp;/g, ' ')
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>')
	.replace(/&quot;/g, '"')
	.replace(/&#x27;/g, "'")
	.replace(/&#x60;/g, '`')
	.replace(/&#60;/g, '<')
	.replace(/&#62;/g, '>')
	.replace(/&amp;/g, '&')
	.replace(/\n/g, '\\n')
	.replace(/\'/g, '′')
	.replace(/\"/g, '″')
	.replace(/</g, '‹')
	.replace(/>/g, '›')
	.replace(/&prime;/g, '′')
	.replace(/&Prime;/g, '″')
	.replace(/&lsaquo;/g, '‹')
	.replace(/&rsaquo;/g, '›');
};


// EmojiCodes [ Smiley ] set
var em_sm = [
	"u{1F604}","u{1F603}","u{1F600}","u{1F60A}","u{263A}","u{1F609}","u{1F60D}","u{1F618}","u{1F61A}","u{1F617}","u{1F619}","u{1F61C}",
	"u{1F61D}","u{1F61B}","u{1F633}","u{1F62C}","u{1F614}","u{1F60C}","u{1F612}","u{1F61E}","u{1F623}","u{1F622}","u{1F602}","u{1F62D}",
	"u{1F62A}","u{1F625}","u{1F630}","u{1F605}","u{1F613}","u{1F629}","u{1F62B}","u{1F628}","u{1F631}","u{1F620}","u{1F621}","u{1F624}",
	"u{1F616}","u{1F606}","u{1F60B}","u{1F637}","u{1F60E}","u{1F634}","u{1F635}","u{1F632}","u{1F61F}","u{1F626}","u{1F627}","u{1F608}",
	"u{1F47F}","u{1F62E}","u{1F610}","u{1F615}","u{1F62F}","u{1F636}","u{1F607}","u{1F60F}","u{1F611}","u{1F601}","u{1F642}","u{1F643}",
	"u{1F970}","u{2639}","u{1F972}","u{1F913}","u{1F92A}","u{1F917}","u{1F923}","u{1F929}","u{1F62E}u{1F4A8}","u{1F92B}","u{1F92D}",
	"u{1F920}","u{1F924}","u{1F911}","u{1F928}","u{1F914}","u{1F9D0}","u{1F92C}","u{1F92E}","u{1F92F}","u{1F97A}","u{1F641}","u{1F644}",
	"u{1F635}u{1F4AB}","u{1F636}u{1F32B}","u{1F910}","u{1F912}","u{1F915}","u{1F927}","u{1F922}","u{1F975}","u{1F925}","u{1F921}",
	"u{1F971}","u{1F976}","u{1F973}","u{1F978}","u{1F974}","u{1F9B8}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9B8}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9B9}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9B9}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F468}u{1F3FD}u{200D}u{1F3A4}",
	"u{1F469}u{1F3FD}u{200D}u{1F3A4}","u{1F468}u{1F3FD}u{200D}u{1F3A8}","u{1F469}u{1F3FD}u{200D}u{1F3A8}","u{1F468}u{1F3FD}u{200D}u{1F3EB}",
	"u{1F469}u{1F3FD}u{200D}u{1F3EB}","u{1F468}u{1F3FD}u{200D}u{1F4BB}","u{1F469}u{1F3FD}u{200D}u{1F4BB}","u{1F468}u{1F3FD}",
	"u{1F469}u{1F3FD}","u{1F468}u{1F3FD}u{200D}u{1F3ED}","u{1F469}u{1F3FD}u{200D}u{1F3ED}","u{1F468}u{1F3FD}u{200D}u{1F4BC}",
	"u{1F469}u{1F3FD}u{200D}u{1F4BC}","u{1F468}u{1F3FD}u{200D}u{1F9B0}","u{1F469}u{1F3FD}u{200D}u{1F9B0}",
	"u{1F468}u{1F3FD}u{200D}u{1F9B1}","u{1F469}u{1F3FD}u{200D}u{1F9B1}","u{1F468}u{1F3FD}u{200D}u{1F9B2}",
	"u{1F469}u{1F3FD}u{200D}u{1F9B2}","u{1F468}u{1F3FD}u{200D}u{1F9B3}","u{1F469}u{1F3FD}u{200D}u{1F9B3}","u{1F468}u{1F3FD}u{200D}u{1F33E}",
	"u{1F469}u{1F3FD}u{200D}u{1F33E}","u{1F468}u{1F3FD}u{200D}u{1F37C}","u{1F469}u{1F3FD}u{200D}u{1F37C}","u{1F468}u{1F3FD}u{200D}u{1F52C}",
	"u{1F469}u{1F3FD}u{200D}u{1F52C}","u{1F468}u{1F3FD}u{200D}u{1F373}","u{1F469}u{1F3FD}u{200D}u{1F373}","u{1F468}u{1F3FD}u{200D}u{1F393}",
	"u{1F469}u{1F3FD}u{200D}u{1F393}","u{1F468}u{1F3FD}u{200D}u{1F527}","u{1F469}u{1F3FD}u{200D}u{1F527}","u{1F468}u{1F3FD}u{200D}u{1F680}",
	"u{1F469}u{1F3FD}u{200D}u{1F680}","u{1F468}u{1F3FD}u{200D}u{1F692}","u{1F469}u{1F3FD}u{200D}u{1F692}","u{1F468}u{1F3FD}u{200D}u{2695}",
	"u{1F469}u{1F3FD}u{200D}u{2695}","u{1F468}u{1F3FD}u{200D}u{2696}","u{1F469}u{1F3FD}u{200D}u{2696}","u{1F468}u{1F3FD}u{200D}u{2708}",
	"u{1F469}u{1F3FD}u{200D}u{2708}","u{1F385}u{1F3FD}","u{1F936}u{1F3FD}","u{1F9D4}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9D4}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9D6}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9D6}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F9D9}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9D9}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9DA}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9DA}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9DB}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9DB}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F9DC}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9DC}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9DD}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9DD}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9DE}u{200D}u{2642}u{FE0F}","u{1F9DE}u{200D}u{2640}u{FE0F}","u{1F9DF}u{200D}u{2642}u{FE0F}",
	"u{1F9DF}u{200D}u{2640}u{FE0F}","u{1F46E}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F46E}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F477}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F477}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F575}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F575}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F482}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F482}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F9CF}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9CF}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F470}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F470}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F935}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F935}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F471}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F471}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F473}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F473}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F64B}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F64B}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F64D}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F64D}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F64E}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F64E}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F481}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F481}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F645}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F645}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F646}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F646}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F937}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F937}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F926}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F926}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F647}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F647}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F486}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F486}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F487}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F487}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F468}u{1F3FD}u{200D}u{1F9AF}",
	"u{1F469}u{1F3FD}u{200D}u{1F9AF}","u{1F6B6}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F6B6}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F9CD}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9CD}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F9CE}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9CE}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F468}u{1F3FD}u{200D}u{1F9BC}","u{1F469}u{1F3FD}u{200D}u{1F9BC}",
	"u{1F468}u{1F3FD}u{200D}u{1F9BD}","u{1F469}u{1F3FD}u{200D}u{1F9BD}","u{1F9D1}u{1F3FB}u{200D}u{1F91D}u{200D}u{1F9D1}u{1F3FD}",
	"u{1F9D1}u{1F3FC}u{200D}u{1F91D}u{200D}u{1F9D1}u{1F3FD}","u{1F9D1}u{1F3FD}u{200D}u{1F91D}u{200D}u{1F9D1}u{1F3FD}",
	"u{1F9D1}u{1F3FE}u{200D}u{1F91D}u{200D}u{1F9D1}u{1F3FD}","u{1F9D1}u{1F3FF}u{200D}u{1F91D}u{200D}u{1F9D1}u{1F3FD}",
	"u{1F468}u{1F3FD}u{200D}u{1F91D}u{200D}u{1F468}u{1F3FD}","u{1F469}u{1F3FD}u{200D}u{1F91D}u{200D}u{1F468}u{1F3FD}",
	"u{1F469}u{1F3FD}u{200D}u{1F91D}u{200D}u{1F469}u{1F3FD}","u{1F48F}u{1F3FD}","u{1F491}u{1F3FD}","u{1F57A}u{1F3FD}",
	"u{1F483}u{1F3FD}","u{1F476}u{1F3FD}","u{1F9D2}u{1F3FD}","u{1F466}u{1F3FD}","u{1F467}u{1F3FD}","u{1F9D3}u{1F3FD}","u{1F474}u{1F3FD}",
	"u{1F475}u{1F3FD}","u{1F934}u{1F3FD}","u{1F478}u{1F3FD}","u{1F472}u{1F3FD}","u{1F977}u{1F3FD}","u{1F9D5}u{1F3FD}","u{1F930}u{1F3FD}",
	"u{1F931}u{1F3FD}","u{1F47C}u{1F3FD}","u{1F46F}u{200D}u{2642}u{FE0F}","u{1F46F}","u{1F46F}u{200D}u{2640}u{FE0F}","u{1F46A}",
	"u{1F468}u{200D}u{1F466}","u{1F468}u{200D}u{1F466}u{200D}u{1F466}","u{1F468}u{200D}u{1F467}","u{1F468}u{200D}u{1F467}u{200D}u{1F466}",
	"u{1F468}u{200D}u{1F467}u{200D}u{1F467}","u{1F468}u{200D}u{1F468}u{200D}u{1F466}","u{1F468}u{200D}u{1F468}u{200D}u{1F466}u{200D}u{1F466}",
	"u{1F468}u{200D}u{1F468}u{200D}u{1F467}","u{1F468}u{200D}u{1F468}u{200D}u{1F467}u{200D}u{1F466}",
	"u{1F468}u{200D}u{1F468}u{200D}u{1F467}u{200D}u{1F467}","u{1F468}u{200D}u{1F469}u{200D}u{1F466}",
	"u{1F468}u{200D}u{1F469}u{200D}u{1F466}u{200D}u{1F466}","u{1F468}u{200D}u{1F469}u{200D}u{1F467}",
	"u{1F468}u{200D}u{1F469}u{200D}u{1F467}u{200D}u{1F466}","u{1F468}u{200D}u{1F469}u{200D}u{1F467}u{200D}u{1F467}",
	"u{1F469}u{200D}u{1F466}","u{1F469}u{200D}u{1F466}u{200D}u{1F466}","u{1F469}u{200D}u{1F467}","u{1F469}u{200D}u{1F467}u{200D}u{1F466}",
	"u{1F469}u{200D}u{1F467}u{200D}u{1F467}","u{1F469}u{200D}u{1F469}u{200D}u{1F466}",
	"u{1F469}u{200D}u{1F469}u{200D}u{1F466}u{200D}u{1F466}","u{1F469}u{200D}u{1F469}u{200D}u{1F467}",
	"u{1F469}u{200D}u{1F469}u{200D}u{1F467}u{200D}u{1F466}","u{1F469}u{200D}u{1F469}u{200D}u{1F467}u{200D}u{1F467}","u{1F574}u{1F3FD}",
	"u{1F4AA}u{1F3FD}","u{1F9BE}","u{1F9B5}u{1F3FD}","u{1F9BF}","u{1F44A}u{1F3FD}","u{1F44B}u{1F3FD}","u{1F44C}u{1F3FD}",
	"u{1F44D}u{1F3FD}","u{1F44E}u{1F3FD}","u{1F44F}u{1F3FD}","u{1F64C}u{1F3FD}","u{1F64F}u{1F3FD}","u{1F90C}u{1F3FD}",
	"u{1F90F}u{1F3FD}","u{1F91A}u{1F3FD}","u{1F91B}u{1F3FD}","u{1F91C}u{1F3FD}","u{1F91E}u{1F3FD}","u{1F91F}u{1F3FD}",
	"u{1F446}u{1F3FD}","u{1F447}u{1F3FD}","u{1F448}u{1F3FD}","u{1F449}u{1F3FD}","u{1F450}u{1F3FD}","u{1F590}u{1F3FD}","u{1F595}u{1F3FD}",
	"u{1F596}u{1F3FD}","u{1F919}u{1F3FD}","u{1F918}u{1F3FD}","u{1F932}u{1F3FD}","u{261D}u{1F3FD}","u{270A}u{1F3FD}","u{270B}u{1F3FD}",
	"u{270C}u{1F3FD}","u{270D}u{1F3FD}","u{1F9B6}u{1F3FD}","u{1F442}u{1F3FD}","u{1F9BB}u{1F3FD}","u{1F443}u{1F3FD}","u{1F485}u{1F3FD}",
	"u{1F933}u{1F3FD}","u{1F9B7}","u{1F9E0}","u{1F440}","u{1F441}","u{1F444}","u{1F445}","u{1FAC0}","u{1FAC1}","u{1F464}","u{1F465}",
	"u{1FAC2}","u{1F5E3}","u{1F463}","u{1F63A}","u{1F63B}","u{1F63C}","u{1F63D}","u{1F63E}","u{1F63F}","u{1F638}","u{1F639}","u{1F640}",
	"u{1F47A}","u{1F47B}","u{1F479}","u{1F480}","u{1F47D}","u{1F916}","u{1F47E}","u{1F4A9}","u{1F383}","u{1F48B}","u{1F3A9}","u{1F4BC}",
	"u{1F4FF}","u{1F9BA}","u{1F9E2}","u{1F9E3}","u{1F9E4}","u{1F9E5}","u{1F9E6}","u{1F9F5}","u{1F9F6}","u{1F45A}","u{1F45B}","u{1F45C}",
	"u{1F45D}","u{1F45E}","u{1F45F}","u{1F48D}","u{1F97B}","u{1F97C}","u{1F97E}","u{1F97F}","u{1F302}","u{1F392}","u{1F393}","u{1F451}",
	"u{1F452}","u{1F453}","u{1F454}","u{1F455}","u{1F456}","u{1F457}","u{1F458}","u{1F459}","u{1F460}","u{1F461}","u{1F462}","u{1F484}",
	"u{1FA71}","u{1FA72}","u{1FA73}","u{1FA74}","u{1FA92}","u{1FA96}","u{1FAA5}","u{26D1}","u{1F576}","u{1F97D}"
];


// EmojiCodes [ Nature ] set
var em_na = [
	"u{1F436}","u{1F431}","u{1F42D}","u{1F439}","u{1F430}","u{1F98A}","u{1F43B}","u{1F43C}","u{1F428}","u{1F42F}","u{1F981}","u{1F42E}",
	"u{1F437}","u{1F43D}","u{1F438}","u{1F435}","u{1F648}","u{1F649}","u{1F64A}","u{1F412}","u{1F414}","u{1F427}","u{1F426}","u{1F424}",
	"u{1F423}","u{1F425}","u{1F986}","u{1F985}","u{1F989}","u{1F987}","u{1F43A}","u{1F417}","u{1F434}","u{1F984}","u{1F41D}","u{1F41B}",
	"u{1F98B}","u{1F40C}","u{1F41E}","u{1F41C}","u{1F99F}","u{1F997}","u{1F577}","u{1F578}","u{1F982}","u{1F422}","u{1F40D}","u{1F98E}",
	"u{1F996}","u{1F995}","u{1F419}","u{1F991}","u{1F990}","u{1F99E}","u{1F980}","u{1F421}","u{1F420}","u{1F41F}","u{1F42C}","u{1F433}",
	"u{1F40B}","u{1F988}","u{1F40A}","u{1F405}","u{1F406}","u{1F993}","u{1F98D}","u{1F9A7}","u{1F418}","u{1F99B}","u{1F98F}","u{1F42A}",
	"u{1F42B}","u{1F992}","u{1F998}","u{1F403}","u{1F402}","u{1F404}","u{1F40E}","u{1F416}","u{1F40F}","u{1F411}","u{1F999}","u{1F410}",
	"u{1F98C}","u{1F415}","u{1F429}","u{1F9AE}","u{1F415}u{1F9BA}","u{1F408}","u{1F413}","u{1F983}","u{1F99A}","u{1F99C}","u{1F9A2}",
	"u{1F9A9}","u{1F407}","u{1F99D}","u{1F9A8}","u{1F9A1}","u{1F9A6}","u{1F9A5}","u{1F401}","u{1F400}","u{1F43F}","u{1F994}","u{1F43E}",
	"u{1F408}u{2B1B}","u{1F409}","u{1F432}","u{1F9A0}","u{1F9A3}","u{1F9A4}","u{1F9AA}","u{1F9AB}","u{1F9AC}","u{1F9AD}","u{1F41A}",
	"u{1F43B}u{2744}","u{1FAB0}","u{1FAB1}","u{1FAB2}","u{1FAB3}","u{1F54A}","u{1F335}","u{1F384}","u{1F332}","u{1F333}","u{1F334}",
	"u{1F331}","u{1F33F}","u{2618}","u{1F340}","u{1F38D}","u{1F38B}","u{1F343}","u{1F342}","u{1F341}","u{1F344}","u{1F33E}","u{1F490}",
	"u{1F337}","u{1F339}","u{1F940}","u{1F33A}","u{1F338}","u{1F33C}","u{1F33B}","u{1F31E}","u{1F31C}","u{1F31D}","u{1F31B}","u{1F31A}",
	"u{1F311}","u{1F312}","u{1F313}","u{1F314}","u{1F315}","u{1F316}","u{1F317}","u{1F318}","u{1F319}","u{1F30D}","u{1F30E}","u{1F30F}",
	"u{1FA90}","u{1F4AB}","u{2B50}","u{1F31F}","u{2728}","u{26A1}","u{2604}","u{1F4A5}","u{1F32A}","u{1F308}","u{2600}","u{1F324}",
	"u{26C5}","u{1F325}","u{2601}","u{1F326}","u{1F327}","u{26C8}","u{1F329}","u{1F328}","u{2744}","u{2603}","u{26C4}","u{1F32C}",
	"u{1F4A8}","u{1F30A}","u{1F4A7}","u{1F4A6}","u{1F32B}","u{2614}","u{2602}","u{1F3F5}","u{1F30B}","u{1F525}"
];


// EmojiCodes [ Food ] set
var em_fo = [
	"u{1F34F}","u{1F34E}","u{1F350}","u{1F34A}","u{1F34B}","u{1F34C}","u{1F349}","u{1F347}","u{1F353}","u{1F348}","u{1F352}","u{1F351}",
	"u{1F96D}","u{1F34D}","u{1F965}","u{1F95D}","u{1F345}","u{1F346}","u{1F951}","u{1F966}","u{1F96C}","u{1F952}","u{1F336}","u{1F33D}",
	"u{1F955}","u{1F9C4}","u{1F9C5}","u{1F954}","u{1F360}","u{1F950}","u{1F96F}","u{1F35E}","u{1F956}","u{1F968}","u{1F9C0}","u{1FAA4}",
	"u{1F95A}","u{1F373}","u{1F9C8}","u{1F95E}","u{1F9C7}","u{1F953}","u{1F969}","u{1F357}","u{1F356}","u{1F9B4}","u{1F32D}","u{1F354}",
	"u{1F35F}","u{1F355}","u{1F96A}","u{1F959}","u{1F9C6}","u{1F32E}","u{1F32F}","u{1F957}","u{1F958}","u{1F96B}","u{1F35D}","u{1F35C}",
	"u{1F372}","u{1F35B}","u{1F363}","u{1FAD3}","u{1FAD5}","u{1FAD4}","u{1F371}","u{1F95F}","u{1F364}","u{1F359}","u{1F35A}","u{1F358}",
	"u{1F365}","u{1F960}","u{1F96E}","u{1F362}","u{1F361}","u{1F367}","u{1F368}","u{1F366}","u{1F967}","u{1F9C1}","u{1F370}","u{1F382}",
	"u{1F36E}","u{1F36D}","u{1F36C}","u{1F37F}","u{1F369}","u{1F36B}","u{1F36A}","u{1FAD2}","u{1F330}","u{1FAD0}","u{1FAD1}","u{1F95C}",
	"u{1F36F}","u{1F95B}","u{1F37C}","u{1FAD6}","u{2615}","u{1F375}","u{1F376}","u{1F9C3}","u{1F964}","u{1F37A}","u{1F37B}","u{1F942}",
	"u{1F377}","u{1F943}","u{1F378}","u{1F379}","u{1F9CB}","u{1F9C9}","u{1F37E}","u{1F9CA}","u{1F944}","u{1F374}","u{1F37D}","u{1F963}",
	"u{1F961}","u{1F962}","u{1F9C2}"
];


// EmojiCodes [ Activity ] set
var em_ac = [
	"u{26BD}","u{1F3C0}","u{1F3C8}","u{26BE}","u{1F94E}","u{1F3BE}","u{1F3D0}","u{1F3C9}","u{1F94F}","u{1F3B1}","u{1FA80}","u{1F3D3}",
	"u{1F3F8}","u{1F3D2}","u{1F3D1}","u{1F3CF}","u{1F94D}","u{1F945}","u{26F3}","u{1FA81}","u{1F3F9}","u{1F3A3}","u{1F93F}","u{1F94A}",
	"u{1F94B}","u{1F3BD}","u{1F6F9}","u{1F6F7}","u{1F6F6}","u{1F6FC}","u{1F94C}","u{1F3BF}","u{26F7}","u{1F3C2}","u{1FA82}","u{1F3CB}u{1F3FD}",
	"u{1F3CB}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F3CB}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F93C}","u{1F93C}u{200D}u{2642}u{FE0F}",
	"u{1F93C}u{200D}u{2640}u{FE0F}","u{1F938}u{1F3FD}","u{1F938}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F938}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{26F9}u{1F3FD}","u{26F9}u{1F3FD}u{200D}u{2642}u{FE0F}","u{26F9}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F93A}","u{1F93E}u{1F3FD}",
	"u{1F93E}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F93E}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3CC}u{1F3FD}","u{1F3CC}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F3CC}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3C7}u{1F3FD}","u{1F9D8}u{1F3FD}","u{1F9D8}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F9D8}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3C4}u{1F3FD}","u{1F3C4}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F3C4}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F3CA}u{1F3FD}","u{1F3CA}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F3CA}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F93D}u{1F3FD}",
	"u{1F93D}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F93D}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3C3}u{1F3FD}","u{1F3C3}u{1F3FD}u{200D}u{2642}u{FE0F}",
	"u{1F3C3}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F6A3}u{1F3FD}","u{1F6A3}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F6A3}u{1F3FD}u{200D}u{2640}u{FE0F}",
	"u{1F9D7}u{1F3FD}","u{1F9D7}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F9D7}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F6B4}u{1F3FD}",
	"u{1F6B4}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F6B4}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3C6}","u{1F947}","u{1F948}","u{1F949}",
	"u{1F3C5}","u{1F396}","u{1F397}","u{1F3AB}","u{1F39F}","u{1F3C1}","u{1F3CD}","u{1F3CE}","u{1F3AA}","u{1F939}u{1F3FD}",
	"u{1F939}u{1F3FD}u{200D}u{2642}u{FE0F}","u{1F939}u{1F3FD}u{200D}u{2640}u{FE0F}","u{1F3AD}","u{1FA70}","u{1F3A8}","u{1F3AC}","u{1F3A4}",
	"u{1F3A7}","u{1F3BC}","u{1F3B9}","u{1F941}","u{1F3B7}","u{1F3BA}","u{1F3B8}","u{1F3BB}","u{1FA95}","u{1FA97}","u{1F3B2}","u{265F}",
	"u{1F3AF}","u{1F3B3}","u{1F3AE}","u{1F3B0}","u{1F9E9}"
];


// EmojiCodes [ Place ] set
var em_pl = [
	"u{1F697}","u{1F695}","u{1F699}","u{1F68C}","u{1F68E}","u{1F693}","u{1F691}","u{1F692}","u{1F690}","u{1F69A}","u{1F69B}","u{1F69C}",
	"u{1F9AF}","u{1F9BD}","u{1F9BC}","u{1F6F4}","u{1F6F5}","u{1F6FA}","u{1F6A8}","u{1F694}","u{1F68D}","u{1F698}","u{1F696}","u{1F6A1}",
	"u{1F6A0}","u{1F69F}","u{1F69E}","u{1F683}","u{1F68B}","u{1F69D}","u{1F684}","u{1F685}","u{1F688}","u{1F682}","u{1F686}","u{1F687}",
	"u{1F68A}","u{1F689}","u{2708}","u{1F6EB}","u{1F6EC}","u{1F6E9}","u{1F4BA}","u{1F6F0}","u{1F680}","u{1F6F8}","u{1F681}","u{26F5}",
	"u{1F6A4}","u{1F6E5}","u{1F6F3}","u{26F4}","u{1F6A2}","u{2693}","u{26FD}","u{1F6A7}","u{1F6A6}","u{1F6A5}","u{1F68F}","u{1F5FA}",
	"u{1F5FF}","u{1F5FD}","u{1F5FC}","u{1F3F0}","u{1F3EF}","u{1F3DF}","u{1F3A1}","u{1F3A2}","u{1F3A0}","u{26F2}","u{26F1}","u{1F3D6}",
	"u{1F3DD}","u{1F3DC}","u{1F3D4}","u{26F0}","u{1F5FB}","u{1F3D5}","u{26FA}","u{1F3E0}","u{1F3E1}","u{1F3D8}","u{1F3DA}","u{1F3D7}",
	"u{1F3ED}","u{1F3E2}","u{1F3EC}","u{1F3E3}","u{1F3E4}","u{1F3E5}","u{1F3E6}","u{1F3E8}","u{1F3EA}","u{1F3EB}","u{1F3E9}","u{1F3DB}",
	"u{26EA}","u{1F54C}","u{1F54D}","u{1F6D5}","u{1F6D6}","u{1F54B}","u{26E9}","u{1F6E4}","u{1F6E3}","u{1F5FE}","u{1F391}","u{1F3DE}",
	"u{1F305}","u{1F304}","u{1F320}","u{1F387}","u{1F386}","u{1F307}","u{1F306}","u{1F3D9}","u{1F303}","u{1F30C}","u{1F309}","u{1F301}",
	"u{1F6FB}"
];


// EmojiCodes [ Object ] set
var em_ob = [
	"u{231A}","u{1F4F1}","u{1F4F2}","u{1F4BB}","u{2328}","u{1F5A5}","u{1F5A8}","u{1F5B1}","u{1F5B2}","u{1F579}","u{1F5DC}","u{1F4BD}",
	"u{1F4BE}","u{1F4BF}","u{1F4C0}","u{1F4FC}","u{1F4F7}","u{1F4F8}","u{1F4F9}","u{1F4FD}","u{1F39E}","u{1F4DE}","u{260E}","u{1F4DF}",
	"u{1F4E0}","u{1F4FA}","u{1F4FB}","u{1F399}","u{1F39A}","u{1F39B}","u{1F9ED}","u{23F1}","u{23F2}","u{23F0}","u{1F570}","u{231B}",
	"u{23F3}","u{1F4E1}","u{1F50B}","u{1F50C}","u{1F4A1}","u{1F526}","u{1F56F}","u{1FA94}","u{1F9EF}","u{1F6E2}","u{1F4B8}","u{1F4B5}",
	"u{1F4B4}","u{1F4B6}","u{1F4B7}","u{1F4B0}","u{1F4B3}","u{1F48E}","u{2696}","u{1F9F0}","u{1F527}","u{1F528}","u{2692}","u{1F6E0}",
	"u{26CF}","u{1F529}","u{2699}","u{1F9F1}","u{26D3}","u{1F9F2}","u{1F52B}","u{1F4A3}","u{1F9E8}","u{1FA93}","u{1FAB5}","u{1FA9A}",
	"u{1FA9C}","u{1FA83}","u{1FAA7}","u{1FAA8}","u{1FAA6}","u{1FA99}","u{1F52A}","u{1F5E1}","u{2694}","u{1F6E1}","u{1F6AC}","u{26B0}",
	"u{26B1}","u{1F3FA}","u{1F52E}","u{1F9FF}","u{1F488}","u{2697}","u{1F52D}","u{1F52C}","u{1F573}","u{1FA79}","u{1FA7A}","u{1F48A}",
	"u{1F489}","u{1FA78}","u{1F9EC}","u{1F9EB}","u{1F9EA}","u{1F321}","u{1F9F9}","u{1F9FA}","u{1F9FB}","u{1F6BD}","u{1F6B0}","u{1F6BF}",
	"u{1F6C1}","u{1F6C0}u{1F3FD}","u{1FAA0}","u{1FAA3}","u{1F9FC}","u{1F9FD}","u{1F9F4}","u{1FAA1}","u{1FAA2}","u{1FA85}","u{2702}",
	"u{1FA86}","u{1FA84}","u{1F6CE}","u{1F511}","u{1F5DD}","u{1FA9E}","u{1F6AA}","u{1FA9F}","u{1FA91}","u{1F6CB}","u{1F6CF}","u{1F6CC}",
	"u{1FA9D}","u{1FAB6}","u{1FA9B}","u{1FA98}","u{1F9F8}","u{1F5BC}","u{1F6CD}","u{1F6D2}","u{1F381}","u{1F388}","u{1F38F}","u{1F380}",
	"u{1F389}","u{1F38E}","u{1F3EE}","u{1F38A}","u{1F3A5}","u{1F390}","u{1F9E7}","u{2709}","u{1F4E9}","u{1F4E8}","u{1F4E7}","u{1F48C}",
	"u{1F4E5}","u{1F4E4}","u{1F4E6}","u{1F3F7}","u{1F4EA}","u{1F4EB}","u{1F4EC}","u{1F4ED}","u{1F4EE}","u{1F4EF}","u{1F4DC}","u{1F4C3}",
	"u{1F4C4}","u{1F4D1}","u{1F9FE}","u{1F4CA}","u{1F4C8}","u{1F4C9}","u{1F5D2}","u{1F5D3}","u{1F4C6}","u{1F4C5}","u{1F5D1}","u{1F4C7}",
	"u{1F5C3}","u{1F5F3}","u{1F5C4}","u{1F4CB}","u{1F4C1}","u{1F4C2}","u{1F5C2}","u{1F5DE}","u{1F4F0}","u{1F4D3}","u{1F4D4}","u{1F4D2}",
	"u{1F4D5}","u{1F4D7}","u{1F4D8}","u{1F4D9}","u{1F4DA}","u{1F4D6}","u{1F516}","u{1F9F7}","u{1F517}","u{1F4CE}","u{1F587}","u{1F4D0}",
	"u{1F4CF}","u{1F9EE}","u{1F4CC}","u{1F4CD}","u{1F58A}","u{1F58B}","u{2712}","u{1F58C}","u{1F58D}","u{1F4DD}","u{270F}","u{1F50D}",
	"u{1F50E}","u{1F50F}","u{1F510}","u{1F512}","u{1F513}"
];


// EmojiCodes [ Symbol ] set
var em_sy = [
	"u{2665}","u{2764}","u{1F9E1}","u{1F49B}","u{1F49A}","u{1F499}","u{1F49C}","u{1F5A4}","u{1F90D}","u{1F90E}","u{1F494}","u{2764}u{1F525}",
	"u{2764}u{1FA79}","u{2763}","u{1F495}","u{1F49E}","u{1F493}","u{1F497}","u{1F496}","u{1F498}","u{1F49D}","u{1F49F}","u{262E}","u{271D}",
	"u{262A}","u{1F549}","u{2638}","u{2721}","u{1F52F}","u{1F54E}","u{262F}","u{2626}","u{1F6D0}","u{26CE}","u{2648}","u{2649}","u{264A}",
	"u{264B}","u{264C}","u{264D}","u{264E}","u{264F}","u{2650}","u{2651}","u{2652}","u{2653}","u{1F194}","u{269B}","u{1F6BA}","u{1F251}",
	"u{2622}","u{2623}","u{1F4F4}","u{1F4F3}","u{1F236}","u{1F21A}","u{1F238}","u{1F23A}","u{1F237}","u{2734}","u{1F19A}","u{1F6BC}",
	"u{1F4AE}","u{1F250}","u{3299}","u{3297}","u{1F234}","u{1F235}","u{1F239}","u{1F232}","u{1F170}","u{1F171}","u{1F18E}","u{1F191}",
	"u{1F17E}","u{1F198}","u{274C}","u{2B55}","u{1F6D1}","u{26D4}","u{1F4DB}","u{1F6AB}","u{1F4AF}","u{1F4A2}","u{2668}","u{1F6B7}",
	"u{1F6AF}","u{1F6B3}","u{1F6B1}","u{1F51E}","u{1F4F5}","u{1F6AD}","u{2757}","u{2755}","u{2753}","u{2754}","u{203C}","u{2049}","u{1F505}",
	"u{1F506}","u{303D}","u{26A0}","u{1F6B8}","u{1F531}","u{269C}","u{1F530}","u{267B}","u{2705}","u{1F22F}","u{1F4B9}","u{2747}","u{2733}",
	"u{274E}","u{1F310}","u{1F4A0}","u{24C2}","u{1F300}","u{1F4A4}","u{1F3E7}","u{1F6BE}","u{267F}","u{1F17F}","u{1F233}","u{1F202}",
	"u{1F6C2}","u{1F6C3}","u{1F6C4}","u{1F6C5}","u{1F6B9}","u{1F6D7}","u{1F6BB}","u{1F6AE}","u{1F3A6}","u{1F4F6}","u{1F201}","u{1F523}",
	"u{2139}","u{1F524}","u{1F521}","u{1F520}","u{1F196}","u{1F197}","u{1F199}","u{1F192}","u{1F195}","u{1F193}","u{0030}u{20E3}",
	"u{0031}u{20E3}","u{0032}u{20E3}","u{0033}u{20E3}","u{0034}u{20E3}","u{0035}u{20E3}","u{0036}u{20E3}","u{0037}u{20E3}","u{0038}u{20E3}",
	"u{0039}u{20E3}","u{1F51F}","u{1F522}","u{0023}u{20E3}","u{002A}u{20E3}","u{23CF}","u{25B6}","u{23F8}","u{23EF}","u{23F9}","u{23FA}",
	"u{23ED}","u{23EE}","u{23E9}","u{23EA}","u{23EB}","u{23EC}","u{25C0}","u{27A1}","u{2B05}","u{2B06}","u{2B07}","u{2197}","u{2198}",
	"u{2199}","u{2196}","u{2195}","u{2194}","u{21AA}","u{21A9}","u{2934}","u{2935}","u{1F500}","u{1F501}","u{1F502}","u{1F53C}","u{1F53D}",
	"u{1F504}","u{1F503}","u{26A7}","u{1F3B5}","u{1F3B6}","u{2795}","u{2796}","u{2797}","u{2716}","u{267E}","u{1F4B2}","u{1F4B1}","u{2122}",
	"u{00A9}","u{00AE}","u{1F5E8}","u{1F441}u{1F5E8}","u{1F51A}","u{1F519}","u{1F51B}","u{1F51D}","u{1F51C}","u{3030}","u{27B0}","u{27BF}",
	"u{2714}","u{2611}","u{1F518}","u{1F534}","u{1F7E0}","u{1F7E1}","u{1F7E2}","u{1F535}","u{1F7E3}","u{26AB}","u{26AA}","u{1F7E4}",
	"u{1F53A}","u{1F53B}","u{1F538}","u{1F539}","u{1F536}","u{1F537}","u{1F533}","u{1F532}","u{25AA}","u{25AB}","u{25FE}","u{25FD}",
	"u{25FC}","u{25FB}","u{1F7E5}","u{1F7E7}","u{1F7E8}","u{1F7E9}","u{1F7E6}","u{1F7EA}","u{2B1B}","u{2B1C}","u{1F7EB}","u{1F507}",
	"u{1F508}","u{1F509}","u{1F50A}","u{1F514}","u{1F515}","u{1F4E3}","u{1F4E2}","u{1F4AC}","u{1F4AD}","u{1F5EF}","u{2660}","u{2663}",
	"u{2666}","u{1F48B}","u{1F0CF}","u{1F3B4}","u{1F004}","u{1F550}","u{1F551}","u{1F552}","u{1F553}","u{1F554}","u{1F555}","u{1F556}",
	"u{1F557}","u{1F558}","u{1F559}","u{1F55A}","u{1F55B}","u{1F55C}","u{1F55D}","u{1F55E}","u{1F55F}","u{1F560}","u{1F561}","u{1F562}",
	"u{1F563}","u{1F564}","u{1F565}","u{1F566}","u{1F567}"
];


// EmojiCodes [ Flag ] set
var em_fg = [
	"u{1F1E6}u{1F1E9}","u{1F1E6}u{1F1EA}","u{1F1E6}u{1F1EB}","u{1F1E6}u{1F1EC}","u{1F1E6}u{1F1EE}","u{1F1E6}u{1F1F1}","u{1F1E6}u{1F1F2}",
	"u{1F1E6}u{1F1F4}","u{1F1E6}u{1F1F6}","u{1F1E6}u{1F1F7}","u{1F1E6}u{1F1F8}","u{1F1E6}u{1F1F9}","u{1F1E6}u{1F1FA}","u{1F1E6}u{1F1FC}",
	"u{1F1E6}u{1F1FD}","u{1F1E6}u{1F1FF}","u{1F1E7}u{1F1E6}","u{1F1E7}u{1F1E7}","u{1F1E7}u{1F1E9}","u{1F1E7}u{1F1EA}","u{1F1E7}u{1F1EB}",
	"u{1F1E7}u{1F1EC}","u{1F1E7}u{1F1ED}","u{1F1E7}u{1F1EE}","u{1F1E7}u{1F1EF}","u{1F1E7}u{1F1F1}","u{1F1E7}u{1F1F2}","u{1F1E7}u{1F1F3}",
	"u{1F1E7}u{1F1F4}","u{1F1E7}u{1F1F6}","u{1F1E7}u{1F1F7}","u{1F1E7}u{1F1F8}","u{1F1E7}u{1F1F9}","u{1F1E7}u{1F1FC}","u{1F1E7}u{1F1FE}",
	"u{1F1E7}u{1F1FF}","u{1F1E8}u{1F1E6}","u{1F1E8}u{1F1E8}","u{1F1E8}u{1F1E9}","u{1F1E8}u{1F1EB}","u{1F1E8}u{1F1EC}","u{1F1E8}u{1F1ED}",
	"u{1F1E8}u{1F1EE}","u{1F1E8}u{1F1F0}","u{1F1E8}u{1F1F1}","u{1F1E8}u{1F1F2}","u{1F1E8}u{1F1F3}","u{1F1E8}u{1F1F4}","u{1F1E8}u{1F1F7}",
	"u{1F1E8}u{1F1FA}","u{1F1E8}u{1F1FB}","u{1F1E8}u{1F1FC}","u{1F1E8}u{1F1FD}","u{1F1E8}u{1F1FE}","u{1F1E8}u{1F1FF}","u{1F1E9}u{1F1EA}",
	"u{1F1E9}u{1F1EF}","u{1F1E9}u{1F1F0}","u{1F1E9}u{1F1F2}","u{1F1E9}u{1F1F4}","u{1F1E9}u{1F1FF}","u{1F1EA}u{1F1E8}","u{1F1EA}u{1F1EA}",
	"u{1F1EA}u{1F1EC}","u{1F1EA}u{1F1ED}","u{1F1EA}u{1F1F7}","u{1F1EA}u{1F1F8}","u{1F1EA}u{1F1F9}","u{1F1EA}u{1F1FA}","u{1F1EB}u{1F1EE}",
	"u{1F1EB}u{1F1EF}","u{1F1EB}u{1F1F0}","u{1F1EB}u{1F1F2}","u{1F1EB}u{1F1F4}","u{1F1EB}u{1F1F7}","u{1F1EC}u{1F1E6}","u{1F1EC}u{1F1E7}",
	"u{1F1EC}u{1F1E9}","u{1F1EC}u{1F1EA}","u{1F1EC}u{1F1EB}","u{1F1EC}u{1F1EC}","u{1F1EC}u{1F1ED}","u{1F1EC}u{1F1EE}","u{1F1EC}u{1F1F1}",
	"u{1F1EC}u{1F1F2}","u{1F1EC}u{1F1F3}","u{1F1EC}u{1F1F5}","u{1F1EC}u{1F1F6}","u{1F1EC}u{1F1F7}","u{1F1EC}u{1F1F8}","u{1F1EC}u{1F1F9}",
	"u{1F1EC}u{1F1FA}","u{1F1EC}u{1F1FC}","u{1F1EC}u{1F1FE}","u{1F1ED}u{1F1F0}","u{1F1ED}u{1F1F3}","u{1F1ED}u{1F1F7}","u{1F1ED}u{1F1F9}",
	"u{1F1ED}u{1F1FA}","u{1F1EE}u{1F1E8}","u{1F1EE}u{1F1E9}","u{1F1EE}u{1F1EA}","u{1F1EE}u{1F1F1}","u{1F1EE}u{1F1F2}","u{1F1EE}u{1F1F3}",
	"u{1F1EE}u{1F1F4}","u{1F1EE}u{1F1F6}","u{1F1EE}u{1F1F7}","u{1F1EE}u{1F1F8}","u{1F1EE}u{1F1F9}","u{1F1EF}u{1F1EA}","u{1F1EF}u{1F1F2}",
	"u{1F1EF}u{1F1F4}","u{1F1EF}u{1F1F5}","u{1F1F0}u{1F1EA}","u{1F1F0}u{1F1EC}","u{1F1F0}u{1F1ED}","u{1F1F0}u{1F1EE}","u{1F1F0}u{1F1F2}",
	"u{1F1F0}u{1F1F3}","u{1F1F0}u{1F1F5}","u{1F1F0}u{1F1F7}","u{1F1F0}u{1F1FC}","u{1F1F0}u{1F1FE}","u{1F1F0}u{1F1FF}","u{1F1F1}u{1F1E6}",
	"u{1F1F1}u{1F1E7}","u{1F1F1}u{1F1E8}","u{1F1F1}u{1F1EE}","u{1F1F1}u{1F1F0}","u{1F1F1}u{1F1F7}","u{1F1F1}u{1F1F8}","u{1F1F1}u{1F1F9}",
	"u{1F1F1}u{1F1FA}","u{1F1F1}u{1F1FB}","u{1F1F1}u{1F1FE}","u{1F1F2}u{1F1E6}","u{1F1F2}u{1F1E8}","u{1F1F2}u{1F1E9}","u{1F1F2}u{1F1EA}",
	"u{1F1F2}u{1F1EC}","u{1F1F2}u{1F1ED}","u{1F1F2}u{1F1F0}","u{1F1F2}u{1F1F1}","u{1F1F2}u{1F1F2}","u{1F1F2}u{1F1F3}","u{1F1F2}u{1F1F4}",
	"u{1F1F2}u{1F1F5}","u{1F1F2}u{1F1F6}","u{1F1F2}u{1F1F7}","u{1F1F2}u{1F1F8}","u{1F1F2}u{1F1F9}","u{1F1F2}u{1F1FA}","u{1F1F2}u{1F1FB}",
	"u{1F1F2}u{1F1FC}","u{1F1F2}u{1F1FD}","u{1F1F2}u{1F1FE}","u{1F1F2}u{1F1FF}","u{1F1F3}u{1F1E6}","u{1F1F3}u{1F1E8}","u{1F1F3}u{1F1EA}",
	"u{1F1F3}u{1F1EB}","u{1F1F3}u{1F1EC}","u{1F1F3}u{1F1EE}","u{1F1F3}u{1F1F1}","u{1F1F3}u{1F1F4}","u{1F1F3}u{1F1F5}","u{1F1F3}u{1F1F7}",
	"u{1F1F3}u{1F1FA}","u{1F1F3}u{1F1FF}","u{1F1F4}u{1F1F2}","u{1F1F5}u{1F1E6}","u{1F1F5}u{1F1EA}","u{1F1F5}u{1F1EB}","u{1F1F5}u{1F1EC}",
	"u{1F1F5}u{1F1ED}","u{1F1F5}u{1F1F0}","u{1F1F5}u{1F1F1}","u{1F1F5}u{1F1F2}","u{1F1F5}u{1F1F3}","u{1F1F5}u{1F1F7}","u{1F1F5}u{1F1F8}",
	"u{1F1F5}u{1F1F9}","u{1F1F5}u{1F1FC}","u{1F1F5}u{1F1FE}","u{1F1F6}u{1F1E6}","u{1F1F7}u{1F1EA}","u{1F1F7}u{1F1F4}","u{1F1F7}u{1F1F8}",
	"u{1F1F7}u{1F1FA}","u{1F1F7}u{1F1FC}","u{1F1F8}u{1F1E6}","u{1F1F8}u{1F1E7}","u{1F1F8}u{1F1E8}","u{1F1F8}u{1F1E9}","u{1F1F8}u{1F1EA}",
	"u{1F1F8}u{1F1EC}","u{1F1F8}u{1F1ED}","u{1F1F8}u{1F1EE}","u{1F1F8}u{1F1F0}","u{1F1F8}u{1F1F1}","u{1F1F8}u{1F1F2}","u{1F1F8}u{1F1F3}",
	"u{1F1F8}u{1F1F4}","u{1F1F8}u{1F1F7}","u{1F1F8}u{1F1F8}","u{1F1F8}u{1F1F9}","u{1F1F8}u{1F1FB}","u{1F1F8}u{1F1FD}","u{1F1F8}u{1F1FE}",
	"u{1F1F8}u{1F1FF}","u{1F1F9}u{1F1E8}","u{1F1F9}u{1F1E9}","u{1F1F9}u{1F1EB}","u{1F1F9}u{1F1EC}","u{1F1F9}u{1F1ED}","u{1F1F9}u{1F1EF}",
	"u{1F1F9}u{1F1F0}","u{1F1F9}u{1F1F1}","u{1F1F9}u{1F1F2}","u{1F1F9}u{1F1F3}","u{1F1F9}u{1F1F4}","u{1F1F9}u{1F1F7}","u{1F1F9}u{1F1F9}",
	"u{1F1F9}u{1F1FB}","u{1F1F9}u{1F1FC}","u{1F1F9}u{1F1FF}","u{1F1FA}u{1F1E6}","u{1F1FA}u{1F1EC}","u{1F1FA}u{1F1F3}","u{1F1FA}u{1F1F8}",
	"u{1F1FA}u{1F1FE}","u{1F1FA}u{1F1FF}","u{1F1FB}u{1F1E6}","u{1F1FB}u{1F1E8}","u{1F1FB}u{1F1EA}","u{1F1FB}u{1F1EC}","u{1F1FB}u{1F1EE}",
	"u{1F1FB}u{1F1F3}","u{1F1FB}u{1F1FA}","u{1F1FC}u{1F1EB}","u{1F1FC}u{1F1F8}","u{1F1FD}u{1F1F0}","u{1F1FE}u{1F1EA}","u{1F1FE}u{1F1F9}",
	"u{1F1FF}u{1F1E6}","u{1F1FF}u{1F1F2}","u{1F1FF}u{1F1FC}","u{1F38C}","u{1F3F3}","u{1F3F3}u{1F308}","u{1F3F3}u{26A7}","u{1F3F4}",
	"u{1F3F4}u{2620}","u{1F3F4}u{E0067}u{E0062}u{E0065}u{E006E}u{E0067}u{E007F}","u{1F3F4}u{E0067}u{E0062}u{E0073}u{E0063}u{E0074}u{E007F}",
	"u{1F3F4}u{E0067}u{E0062}u{E0077}u{E006C}u{E0073}u{E007F}","u{1F6A9}"
];


// The following mojiparser block below is a utility object that extends from the pexxmoji object. It is meant
// to be used for in-app rendering of strings with emojis for a uniform view on all OS
// platforms.
 
// Emoji coded string to pexxmoji renderd elements
function mojiparser$to_html(a, jq){
	var b = mojiparser$mp_regx(),
		c = '',
		d = [],
		e = [],
		m = [],
		k = '';
	while (c = b.exec(a)) {
		var f = '',
			l = '',
			g = c[0],
			h = g.length;
		try {
			for (var i = 0;i < h; i++) {
				var j = c[0].codePointAt(i).toString(16).substring(0,1).toUpperCase();
				if (j != 'D') {
					f += c[0].codePointAt(i).toString(16).toUpperCase();
					l += '&#x' + c[0].codePointAt(i).toString(16).toUpperCase();
				}
			}
		} catch(aa) {
			console.log('Pexxmoji:: '+ aa); // <!== FOR DEBUGGING PURPOSES
		}
		d.push(f);
		e.push(c);
		m.push(l);
	}
	if (d.length > 0) {
		for (var i = 0;i < d.length; i++) {
			if (k == '') {
				k = a.replace(e[i],'<i class="pm pm-' + d[i] + '" data-pm-co="' +
					mojiparser$mp_ingt(m[i], { "{": "", "}": "", "u": "" })[1] + '"></i>');
			} else {
				k = k.replace(e[i],'<i class="pm pm-' + d[i] + '" data-pm-co="' +
					mojiparser$mp_ingt(m[i], { "{": "", "}": "", "u": "" })[1] + '"></i>');
			}
		}
	} else {
		k = a;
	}
	return k;
};


// Emoji coded text extractor ( extracts from pexxmoji rendered elements )
function mojiparser$to_text(a, jq){
	var b = [],
		c = '';
	a.find('i').each(function(i){
		try{
			var d = jq(this).data('pm-co');
			if (d) {
				b.push(d);
			}
		} catch(err){
			console.log('MojiParser:: '+ err); // <!== for debugging purposes
		}
	});
	if (b.length > 0) {
	    for (var aa = 0; aa < b.length; aa++) {
	        if (c == '') {
	        	c = a.html().replace(/(<i\b[^>]*>)[^<>]*(<\/i>)/i, b[aa]);
	        } else {
	        	c = c.replace(/(<i\b[^>]*>)[^<>]*(<\/i>)/i, b[aa]);
	        }
	    }
	} else {
		c = a.html();
	}
	return c
	.replace(/\\/g, '∖')
	.replace(/&#10;/g, '\n')
	.replace(/&#09;/g, '\t')
	.replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, '$1')
	.replace(/<i[^>]*data-pm-co="([^"]+)"[^>]*><\/i>/ig, '$1')
	.replace(/\n|\r/g, '')
	.replace(/<br[^>]*>/ig, '\n')
	.replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/ig, '<div>')
	.replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/ig, '</div>')
	.replace(/\n<div><\/div>/ig, '\n')
	.replace(/<div><\/div>\n/ig, '\n')
	.replace(/(?:<div>)+<\/div>/ig, '\n')
	.replace(/([^\n])<\/div><div>/ig, '$1\n')
	.replace(/(?:<\/div>)+/ig, '</div>')
	.replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
	.replace(/<\/div>/ig, '')
	.replace(/([^\n])<div>/ig, '$1\n')
	.replace(/\n<div>/ig, '\n')
	.replace(/<div>\n/ig, '\n')
	.replace(/<(?:[^>]+)?>/g, '')
	.replace(/&nbsp;/g, ' ')
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>')
	.replace(/&quot;/g, '"')
	.replace(/&#x27;/g, "'")
	.replace(/&#x60;/g, '`')
	.replace(/&#60;/g, '<')
	.replace(/&#62;/g, '>')
	.replace(/&amp;/g, '&')
	.replace(/\n/g, '\\n')
	.replace(/\'/g, '′')
	.replace(/\"/g, '″')
	.replace(/</g, '‹')
	.replace(/>/g, '›')
	.replace(/&prime;/g, '′')
	.replace(/&Prime;/g, '″')
	.replace(/&lsaquo;/g, '‹')
	.replace(/&rsaquo;/g, '›');
};


// Emoji code processor( extacts emoji code from a given rendered emoji element [ singleton ] )
function mojiparser$mp_ingt(a, b){
    var c = [];
    c[0] = a.replace(new RegExp('(' + Object.keys(b).map(function(aa){
        return aa.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
    }).join('|') + ')', 'g'), function(ab) {
        return b[ab];
    });
    c[1] = a.replace(/u/g, '&#x').replace(/{/g, '').replace(/}/g, '').replace(/\\/g, '');
    return c;
};


// Emoji unicode finder regex
function mojiparser$mp_regx(){
	return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F?/g;
};


// Main mojiparser object router
var mojiparser = function(jquery, data, conv){
	if (conv == 'to_html') return mojiparser$to_html(data, jquery);
	if (conv == 'to_text') return mojiparser$to_text(data, jquery);
	return '3rd parameter supports ONLY "to_html" and "to_text" string values';
};


// Globalize both objects
return { 'pexxmoji' : pexxmoji, 'mojiparser' : mojiparser };
})));
