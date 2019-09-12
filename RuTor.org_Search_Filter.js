// ==UserScript==
// @name       RuTor.org Search Filter
// @namespace  rutor
// @version    1.0
// @description  search current table
// @include      *top-tor.org/*
// @include      *zerkalo-rutor.org/*
// @include      *ru-ru.org/*
// @include      *rutor.is/*
// @include      *rutor.info/*
// @include      *ultra-tor.com/*
// @include      *free-tor.org/*
// @include      *bit-tor.org/*
// @include      *fast-tor.net/*
// @include      *rutor.in/*
// @copyright  2014, drakulaboy
// @require     http://code.jquery.com/jquery-2.1.1.min.js
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
