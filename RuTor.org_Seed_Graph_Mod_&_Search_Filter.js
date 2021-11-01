// ==UserScript==
// @name       RuTor.org Seed Graph Mod & Search Filter22222
// @namespace  https://github.com/Alexey71/script-adguard/blob/master/RuTor.org_Seed_Graph_Mod_&_Search_Filter.js
// @version    0.5.5
// @description  Помогает визуально увидить популярность той или иной раздачи. Быстрый поиск на текущей странице
// @match       http://rutorc6mqdinc4cz.onion/
// @match       http://tor-ru.net/*
// @match       http://zerkalo-rutor.org/*
// @match       http://rutor.info/*
// @match       http://free-rutor.org/*
// @match       http://freedom-tor.org/*
// @match       http://top-tor.org/*
// @match       http://rutor.is/*
// @match       http://live-rutor.org/*
// @match       http://xrutor.org/*
// @match       http://new-rutor.org/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
//
// ==/UserScript==

//Version log:
// v0.5.6
//	- Добавлено выделение раздач с переводом "Локализованная версия"
//
// v0.5.5
//	- Добавлено выделение раздач с переводом "Невафильм"
//
// v0.5.4
//	- Обновлен список адресов
//
// v0.5.3
//	- Объеденены два скрипта Seed Graph Mod и Search Filter в один
//
// v0.5.2
//	- Добавлено выделение раздач за 2021 год
//
// v0.5.1
//	- Добавлено выделение раздач с переводом "Нота"
//
// v0.5.0
//	- Добавлено выделение раздач с переводом "NetFlix"
//
// v0.4.9
//	- Удаление умерших зеркал сайта
//
// v0.4.7
//	- Косметика
//	- Добавлено выделение раздач с переводом "Пифагор"
//	- Добавлено выделение раздач с переводом "Кравец"
//	- Добавлено выделение раздач с переводом "SDI Media"
//	- Добавлено выделение раздач с переводом "FOX"
//	- Добавлено выделение раздач с переводом "Amedia"
//
// v0.4.6
//	- Добавлено выделение раздач за 2020 год
//	- Выделение 3D раздач заменено на выделение 4K
//
// v0.4.5
//	- Выделение iPad раздач заменено на "HDRezka Studio"
//
// v0.4.4
//  - слегка изменён метод вычисления ширины полоски
//
// v0.4.3
//  - Выложил с небольшими изменениями
//
// v0.4
//	- Добавлена возможность выделять раздачи с переводом от "iTunes"
//
// v0.3.5
//	- Исправления всвязи с изменениями на сайте
//
// v0.3.3
// 	- Смена маски скрипта так, чтоб он срабатывал как для домейна с www, так и для альтернативного сервера alt.rutor.org
//
// v0.3
// 	- Добавлено окно настроек (открывается в верхнем меню при клике на таб "Настройки")
// 	- Добавлено выделение раздач для iPad
// 	- Добавлено выделение 3D раздач
//
// v0.2
//	- Добавлено ограничение длины полосы в зависимости от размера окна браузера, так как у супер популярных раздач таблица растягивалась за пределы экрана.
// 	- Лицензионные раздачи теперь помечаются другим цветом.
//

//RuTor.org Seed Graph:
GM_addStyle('#qmegas_settings { width: 470px; height: 530px; position: fixed; left: 0; top: 0; background-color: #fff; border: 1px solid #a00; }');
GM_addStyle('#qmegas_settings .header {	background: url("http://s.rutor.info/i/backgr.png") 0 -13px; height: 41px; color: #000000; font-weight: bold; text-align: center; }');
GM_addStyle('#qmegas_settings .fields { padding: 5px; }');
GM_addStyle('#qmegas_settings .fields .row { clear: both; height: 30px; }');
GM_addStyle('#qmegas_settings .fields .row .col1 { padding-left: 24px; width: 346px; float: left; }');
GM_addStyle('#qmegas_settings .fields .row .col2 { width: 370px; float: left; }');
GM_addStyle('#qmegas_settings .fields .row .col3 { width: 90px; float: left; }');
GM_addStyle('#qmegas_settings .qmegas-color { max-width: 70px; max-height: 20px; }');

function RutorScript()
{
	this.settings = {};

	this.loadSettings = function()
	{
		this.settings = {
			line_color: GM_getValue('line_color', '#ff0000'),
			mark_year: GM_getValue('mark_year', false),
			year_color: GM_getValue('year_color', '#ffffca'),
			mark_license: GM_getValue('mark_license', true),
			license_color: GM_getValue('license_color', '#00ff00'),
			mark_uhd: GM_getValue('mark_uhd', true),
			uhd_color: GM_getValue('uhd_color', '#f4ddff'),
			mark_itunes: GM_getValue('mark_itunes', true),
			itunes_color: GM_getValue('itunes_color', '#00ff00'),
			mark_hdrezka: GM_getValue('mark_hdrezka', true),
			hdrezka_color: GM_getValue('hdrezka_color', '#f1b8b8'),
			mark_pifagor: GM_getValue('mark_pifagor', true),
			pifagor_color: GM_getValue('pifagor_color', '#ffb0ff'),
			mark_kravec: GM_getValue('mark_kravec', true),
			kravec_color: GM_getValue('kravec_color', '#ffb0ff'),
			mark_sdi: GM_getValue('mark_sdi', true),
			sdi_color: GM_getValue('sdi_color', '#ffb0ff'),
			mark_amedia: GM_getValue('mark_amedia', true),
			amedia_color: GM_getValue('amedia_color', '#ffb0ff'),
			mark_fox: GM_getValue('mark_fox', true),
			fox_color: GM_getValue('fox_color', '#ffb0ff'),
			mark_netflix: GM_getValue('mark_netflix', true),
			netflix_color: GM_getValue('netflix_color', '#ffb0ff'),
			mark_nota: GM_getValue('mark_nota', true),
			nota_color: GM_getValue('nota_color', '#ffb0ff'),
			mark_nevafilm: GM_getValue('mark_nevafilm', true),
			nevafilm_color: GM_getValue('nevafilm_color', '#ffb0ff'),
			mark_local: GM_getValue('mark_local', true),
			local_color: GM_getValue('local_color', '#ffb0ff'),
		};
	}

	this.setStyles = function()
	{
		GM_addStyle('.qmegas-line { height: 3px; background-color: ' + this.settings.line_color + '; }');
		GM_addStyle('tr.qmegas-year td { background-color: ' + this.settings.year_color + '; }');
		GM_addStyle('tr.qmegas-license td { background-color: ' + this.settings.license_color + '; }');
		GM_addStyle('tr.qmegas-uhd td { background-color: ' + this.settings.uhd_color + '; }');
		GM_addStyle('tr.qmegas-itunes td { background-color: ' + this.settings.itunes_color + '; }');
		GM_addStyle('tr.qmegas-hdrezka td { background-color: ' + this.settings.hdrezka_color + '; }');
		GM_addStyle('tr.qmegas-pifagor td { background-color: ' + this.settings.pifagor_color + '; }');
		GM_addStyle('tr.qmegas-kravec td { background-color: ' + this.settings.kravec_color + '; }');
		GM_addStyle('tr.qmegas-sdi td { background-color: ' + this.settings.sdi_color + '; }');
		GM_addStyle('tr.qmegas-amedia td { background-color: ' + this.settings.amedia_color + '; }');
		GM_addStyle('tr.qmegas-fox td { background-color: ' + this.settings.fox_color + '; }');
		GM_addStyle('tr.qmegas-netflix td { background-color: ' + this.settings.netflix_color + '; }');
		GM_addStyle('tr.qmegas-nota td { background-color: ' + this.settings.nota_color + '; }');
		GM_addStyle('tr.qmegas-nevafilm td { background-color: ' + this.settings.nevafilm_color + '; }');
		GM_addStyle('tr.qmegas-local td { background-color: ' + this.settings.local_color + '; }');
	}

	this.toggleSettings = function()
	{
		var $sett_wnd = $('#qmegas_settings'),
			x = parseInt(($(window).width() - $sett_wnd.width())/2),
			y = parseInt(($(window).height() - $sett_wnd.height())/2);

		$('#qmegas_line_color').val(this.settings.line_color);
		if (this.settings.mark_year)
			$('#qmegas_mark_year').attr('checked', true);
		$('#qmegas_year_color').val(this.settings.year_color);
		if (this.settings.mark_license)
			$('#qmegas_mark_license').attr('checked', true);
		$('#qmegas_license_color').val(this.settings.license_color);
		if (this.settings.mark_uhd)
			$('#qmegas_mark_uhd').attr('checked', true);
		$('#qmegas_uhd_color').val(this.settings.uhd_color);
		if (this.settings.mark_itunes)
			$('#qmegas_mark_itunes').attr('checked', true);
		$('#qmegas_itunes_color').val(this.settings.itunes_color);
		if (this.settings.mark_hdrezka)
			$('#qmegas_mark_hdrezka').attr('checked', true);
		$('#qmegas_hdrezka_color').val(this.settings.hdrezka_color);
		if (this.settings.mark_pifagor)
			$('#qmegas_mark_pifagor').attr('checked', true);
		$('#qmegas_pifagor_color').val(this.settings.pifagor_color);
		if (this.settings.mark_kravec)
			$('#qmegas_mark_kravec').attr('checked', true);
		$('#qmegas_kravec_color').val(this.settings.kravec_color);
		if (this.settings.mark_sdi)
			$('#qmegas_mark_sdi').attr('checked', true);
		$('#qmegas_sdi_color').val(this.settings.sdi_color);
		if (this.settings.mark_amedia)
			$('#qmegas_mark_amedia').attr('checked', true);
		$('#qmegas_amedia_color').val(this.settings.amedia_color);
		if (this.settings.mark_fox)
			$('#qmegas_mark_fox').attr('checked', true);
		$('#qmegas_fox_color').val(this.settings.fox_color);
		if (this.settings.mark_netflix)
			$('#qmegas_mark_netflix').attr('checked', true);
		$('#qmegas_netflix_color').val(this.settings.netflix_color);
		if (this.settings.mark_nota)
			$('#qmegas_mark_nota').attr('checked', true);
		$('#qmegas_nota_color').val(this.settings.nota_color);
		if (this.settings.mark_nevafilm)
			$('#qmegas_mark_nevafilm').attr('checked', true);
		$('#qmegas_nevafilm_color').val(this.settings.nevafilm_color);
		if (this.settings.mark_local)
			$('#qmegas_mark_local').attr('checked', true);
		$('#qmegas_local_color').val(this.settings.local_color);

		$('#qmegas_settings')
			.css({'left': x, 'top': y})
			.toggle('fast');
	}

	this.addSettings = function()
	{
		var $tab = $('<a href="javascript:;" class="menu_b"><div>Настройка</div></a>');
		var obj = this;
		$tab.click(function(){
			obj.toggleSettings();
		});
		$('#menu').append($tab);

		var $wnd = $('<div id="qmegas_settings" style="display: none">	<div class="header">Настройка скрипта</div>	<div class="fields">		<div class="row">			<div class="col1">Цвет полоски популярности раздачи</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_line_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_year"> Выделять за 2021 год (любые)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_year_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_license"> Выделять лицензии (игры, софт, видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_license_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_uhd"> Выделять 4K (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_uhd_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_itunes"> Выделять с переводом iTunes (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_itunes_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_hdrezka"> Выделять с переводом "HDRezka Studio" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_hdrezka_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_pifagor"> Выделять с переводом "Пифагор" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_pifagor_color" /></div>		</div>		<div class="row"> 			<div class="col2"><input type="checkbox" id="qmegas_mark_kravec"> Выделять с переводом "Кравец" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_kravec_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_sdi"> Выделять с переводом "SDI Media" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_sdi_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_amedia"> Выделять с переводом "Amedia" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_amedia_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_fox"> Выделять с переводом "FOX" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_fox_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_netflix"> Выделять с переводом "NetFlix" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_netflix_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_nota"> Выделять с переводом "Нота" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_nota_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_nevafilm"> Выделять с переводом "Невафильм" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_nevafilm_color" /></div>		</div>		<div class="row">			<div class="col2"><input type="checkbox" id="qmegas_mark_local"> Выделять с переводом "Локализованная версия" (видео)</div>			<div class="col3"><input type="color" class="qmegas-color" id="qmegas_local_color" /></div>		</div>		<div class="row" style="text-align: center">			<input type="button" value="Сохранить настройки" id="qmegas_save_settings" />		</div>	</div></div>');
		$('body').append($wnd);

		var obj = this;
		$('#qmegas_save_settings').live('click', function(){
			GM_setValue('line_color', $('#qmegas_line_color').val());
			GM_setValue('mark_year', $('#qmegas_mark_year').is(':checked'));
			GM_setValue('year_color', $('#qmegas_year_color').val());
			GM_setValue('mark_license', $('#qmegas_mark_license').is(':checked'));
			GM_setValue('license_color', $('#qmegas_license_color').val());
			GM_setValue('mark_uhd', $('#qmegas_mark_uhd').is(':checked'));
			GM_setValue('uhd_color', $('#qmegas_uhd_color').val());
			GM_setValue('mark_itunes', $('#qmegas_mark_itunes').is(':checked'));
			GM_setValue('itunes_color', $('#qmegas_itunes_color').val());
			GM_setValue('mark_hdrezka', $('#qmegas_mark_hdrezka').is(':checked'));
			GM_setValue('hdrezka_color', $('#qmegas_hdrezka_color').val());
			GM_setValue('mark_pifagor', $('#qmegas_mark_pifagor').is(':checked'));
			GM_setValue('pifagor_color', $('#qmegas_pifagor_color').val());
			GM_setValue('mark_kravec', $('#qmegas_mark_kravec').is(':checked'));
			GM_setValue('kravec_color', $('#qmegas_kravec_color').val());
			GM_setValue('mark_sdi', $('#qmegas_mark_sdi').is(':checked'));
			GM_setValue('sdi_color', $('#qmegas_sdi_color').val());
			GM_setValue('mark_amedia', $('#qmegas_mark_amedia').is(':checked'));
			GM_setValue('amedia_color', $('#qmegas_amedia_color').val());
			GM_setValue('mark_fox', $('#qmegas_mark_fox').is(':checked'));
			GM_setValue('fox_color', $('#qmegas_fox_color').val());
			GM_setValue('mark_netflix', $('#qmegas_mark_netflix').is(':checked'));
			GM_setValue('netflix_color', $('#qmegas_netflix_color').val());
			GM_setValue('mark_nota', $('#qmegas_mark_nota').is(':checked'));
			GM_setValue('nota_color', $('#qmegas_nota_color').val());
			GM_setValue('mark_nevafilm', $('#qmegas_mark_nevafilm').is(':checked'));
			GM_setValue('nevafilm_color', $('#qmegas_nevafilm_color').val());
			GM_setValue('mark_local', $('#qmegas_mark_local').is(':checked'));
			GM_setValue('local_color', $('#qmegas_local_color').val());

			obj.loadSettings();
			obj.setStyles();
			$('#qmegas_settings').toggle('fast');
		});
	}

	this.markLines = function()
	{
		var max_width = $(window).width()-280-214, obj = this;
		$('tr.gai, tr.tum').each(function(){
		    var $trs = $(this).find('td'),
                $spans4 = $($trs.get().pop()).find('span'),
		        count = parseInt($.trim($($spans4.get(0)).text())) + parseInt($.trim($($spans4.get(1)).text())),
		        sp1as$ = $($trs.get(1)).find('a');

		    var sp1a = (sp1as$.length == 2) ? sp1as$.get(1) : sp1as$.get(2);

		    count = Math.min(max_width, parseInt(count/1));
		    $($trs.get(1)).append('<div class="qmegas-line" style="width: ' + count + 'px"></div>');

		    if (obj.settings.mark_year && ((sp1a.innerHTML.indexOf('(2021)') !== -1) || (sp1a.innerHTML.indexOf('-2021)') !== -1) || (sp1a.innerHTML.indexOf('(2021-') !== -1)))
		        $(this).addClass('qmegas-year');
		    if (obj.settings.mark_license && ((sp1a.innerHTML.indexOf('| Лицензия') !== -1) || (sp1a.innerHTML.indexOf('| лицензия') !== -1) || (sp1a.innerHTML.indexOf('Лицензия,') !== -1) || (sp1a.innerHTML.indexOf(', Лицензия') !== -1) || (sp1a.innerHTML.indexOf('лицензия,') !== -1) || (sp1a.innerHTML.indexOf(', лицензия') !== -1) || (sp1a.innerHTML.indexOf('Лицензия') !== -1)))
		        $(this).addClass('qmegas-license');
		    if (obj.settings.mark_uhd && (sp1a.innerHTML.indexOf('2160p') !== -1))
		        $(this).addClass('qmegas-uhd');
		    if (obj.settings.mark_itunes && ((sp1a.innerHTML.indexOf('| iTunes') !== -1) || (sp1a.innerHTML.indexOf('iTunes,') !== -1) || (sp1a.innerHTML.indexOf(', iTunes') !== -1)))
		        $(this).addClass('qmegas-itunes');
		    if (obj.settings.mark_hdrezka && ((sp1a.innerHTML.indexOf('| HDRezka Studio') !== -1) || (sp1a.innerHTML.indexOf('| HDRezka') !== -1) || (sp1a.innerHTML.indexOf('| HDrezka Studio') !== -1) || (sp1a.innerHTML.indexOf('HDRezka Studio,') !== -1) || (sp1a.innerHTML.indexOf(', HDRezka Studio') !== -1) || (sp1a.innerHTML.indexOf('HDRezka,') !== -1) || (sp1a.innerHTML.indexOf(', HDRezka') !== -1) || (sp1a.innerHTML.indexOf('HDrezka Studio,') !== -1) || (sp1a.innerHTML.indexOf(', HDrezka Studio') !== -1)))
		        $(this).addClass('qmegas-hdrezka');
		    if (obj.settings.mark_pifagor && ((sp1a.innerHTML.indexOf('| Пифагор') !== -1) || (sp1a.innerHTML.indexOf('Пифагор,') !== -1) || (sp1a.innerHTML.indexOf(', Пифагор') !== -1)))
		        $(this).addClass('qmegas-pifagor');
		    if (obj.settings.mark_kravec && ((sp1a.innerHTML.indexOf('| Кравец') !== -1) || (sp1a.innerHTML.indexOf('Кравец,') !== -1) || (sp1a.innerHTML.indexOf(', Кравец') !== -1) || (sp1a.innerHTML.indexOf('| Кравец-Рекордз') !== -1) || (sp1a.innerHTML.indexOf('Кравец-Рекордз,') !== -1) || (sp1a.innerHTML.indexOf(', Кравец-Рекордз') !== -1) || (sp1a.innerHTML.indexOf('| Кравец-Рекордс') !== -1) || (sp1a.innerHTML.indexOf('Кравец-Рекордс,') !== -1) || (sp1a.innerHTML.indexOf(', Кравец-Рекордс') !== -1)))
		        $(this).addClass('qmegas-kravec');
		    if (obj.settings.mark_sdi && ((sp1a.innerHTML.indexOf('| SDI Media') !== -1) || (sp1a.innerHTML.indexOf('| SDI Moscow') !== -1) || (sp1a.innerHTML.indexOf('SDI Media,') !== -1) || (sp1a.innerHTML.indexOf(', SDI Media') !== -1) || (sp1a.innerHTML.indexOf('SDI Moscow,') !== -1) || (sp1a.innerHTML.indexOf(', SDI Moscow') !== -1)))
		        $(this).addClass('qmegas-sdi');
		    if (obj.settings.mark_amedia && ((sp1a.innerHTML.indexOf('| Amedia') !== -1) || (sp1a.innerHTML.indexOf('Amedia,') !== -1) || (sp1a.innerHTML.indexOf(', Amedia') !== -1)))
		        $(this).addClass('qmegas-amedia');
		    if (obj.settings.mark_fox && ((sp1a.innerHTML.indexOf('| FOX') !== -1) || (sp1a.innerHTML.indexOf('| Fox Life') !== -1) || (sp1a.innerHTML.indexOf('| FOX Life') !== -1) || (sp1a.innerHTML.indexOf('| Fox Crime') !== -1) || (sp1a.innerHTML.indexOf('FOX,') !== -1) || (sp1a.innerHTML.indexOf(', FOX') !== -1) || (sp1a.innerHTML.indexOf('Fox Life,') !== -1) || (sp1a.innerHTML.indexOf(', Fox Life') !== -1) || (sp1a.innerHTML.indexOf('FOX Life,') !== -1) || (sp1a.innerHTML.indexOf('Fox Crime,') !== -1) || (sp1a.innerHTML.indexOf(', Fox Crime') !== -1) || (sp1a.innerHTML.indexOf('| Fox') !== -1) || (sp1a.innerHTML.indexOf('Fox,') !== -1) || (sp1a.innerHTML.indexOf(', Fox') !== -1)))
		        $(this).addClass('qmegas-fox');
		    if (obj.settings.mark_netflix && ((sp1a.innerHTML.indexOf('| NetFlix') !== -1) || (sp1a.innerHTML.indexOf('| Netflix') !== -1) || (sp1a.innerHTML.indexOf('NetFlix,') !== -1) || (sp1a.innerHTML.indexOf('Netflix,') !== -1) || (sp1a.innerHTML.indexOf(', NetFlix') !== -1) || (sp1a.innerHTML.indexOf(', Netflix') !== -1)))
		        $(this).addClass('qmegas-netflix');
		    if (obj.settings.mark_nota && ((sp1a.innerHTML.indexOf('| Нота') !== -1) || (sp1a.innerHTML.indexOf('Нота,') !== -1) || (sp1a.innerHTML.indexOf(', Нота') !== -1) || (sp1a.innerHTML.indexOf('Нота') !== -1)))
		        $(this).addClass('qmegas-nota');
		    if (obj.settings.mark_nevafilm && ((sp1a.innerHTML.indexOf('| Невафильм') !== -1) || (sp1a.innerHTML.indexOf('Невафильм,') !== -1) || (sp1a.innerHTML.indexOf(', Невафильм') !== -1) || (sp1a.innerHTML.indexOf('Невафильм') !== -1)))
		        $(this).addClass('qmegas-nevafilm');
		    if (obj.settings.mark_local && ((sp1a.innerHTML.indexOf('| Локализованная версия') !== -1) || (sp1a.innerHTML.indexOf('Локализованная версия,') !== -1) || (sp1a.innerHTML.indexOf(', Локализованная версия') !== -1) || (sp1a.innerHTML.indexOf('Локализованная версия') !== -1)))
		        $(this).addClass('qmegas-local');
		});
	}

	this.init = function()
	{
		this.loadSettings();
		this.setStyles();
		this.addSettings();
		this.markLines();
	}
}

(new RutorScript()).init();

//RuTor.org Search Filter:
$(function(e){
    $('<input id="filter" />')
    .focus()
    .appendTo("#index > table > tbody > tr.backgr > td:nth-child(2)");
});
$(document).ready(function () {
    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $( "tr.tum" ).slice(1).hide();
            $( "tr.gai" ).slice(1).hide();
            $( "tr.tum" ).slice(1).filter(function () {
                return rex.test($(this).text());
            }).show();
            $( "tr.gai" ).slice(1).filter(function () {
                return rex.test($(this).text());
            }).show();
        });
            }(jQuery));

});
