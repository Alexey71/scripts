// ==UserScript==
// @name       RuTor.org Search Filter
// @namespace  rutor
// @version    1.2
// @description  search current table
// @include      *rutor.uproxy.link/*
// @include      *rutor.is/*
// @include      *rutor.info/*
// @copyright  2014, drakulaboy
// ==/UserScript==
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
