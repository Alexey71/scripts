// ==UserScript==
// @name         kinozal.tv magnet links MOD
// @updateURL    https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.js
// @downloadURL  https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.js
// @supportURL   https://github.com/Alexey71/scripts/blob/master/Kinozal.tv_Magnet_Links_Mod.js
// @homepageURL  https://github.com/Alexey71/scripts
// @version      0.9
// @description  add magnet links near to torrent links for kinozal.tv pages
// @icon         https://kinozal.guru/pic/favicon.ico
// @include      /^https?:\/\/kinozal.(tv|guru|me)\/details.php\?id=\d+$/
// @grant        none
/* eslint-env jquery */
// ==/UserScript==

$(function(){
    var imgURL = 'https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.jpg';
    $("a[href*='dl.kinozal.tv/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');
    $("a[href*='dl.kinozal.guru/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');
    $("a[href*='dl.kinozal.me/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');

    $("#magnetLink").click(function(){
        var result = new RegExp('id=(\\d+)').exec(window.location.href);
        var id = result[1];
        $.get('/get_srv_details.php?id=' + id + '&action=2', function(s){
            var result = new RegExp('Инфо хеш: (.\{40\})').exec(s);
            var hash = result[1];
            document.location = 'magnet:?xt=urn:btih:' + hash;
        });
    });
});
