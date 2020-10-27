// ==UserScript==
// @name       RuTor.org Search Filter
// @namespace  https://github.com/Alexey71/script-adguard/blob/master/RuTor.org_Search_Filter.js
// @version    1.3
// @description  search current table
// @include      *rutor.is/*
// @include      *rutor.info/*
//
// ==/UserScript==

//Version log:
// v1.3
//	- Удаление умерших зеркал сайта

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
