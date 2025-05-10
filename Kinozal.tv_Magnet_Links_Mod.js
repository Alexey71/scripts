// ==UserScript==
// @name         kinozal.tv magnet links MOD
// @updateURL    https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.js
// @downloadURL  https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.js
// @supportURL   https://github.com/Alexey71/scripts/blob/master/Kinozal.tv_Magnet_Links_Mod.js
// @homepageURL  https://github.com/Alexey71/scripts
// @version      1.0
// @description  add magnet links near to torrent links for kinozal.tv pages with copy functionality
// @icon         https://kinozal.guru/pic/favicon.ico
// @include      /^https?:\/\/kinozal.(tv|guru|me)\/details.php\?id=\d+$/
// @grant        GM_notification
// @grant        GM_setClipboard
/* eslint-env jquery */
// ==/UserScript==

$(function(){
    var imgURL = 'https://raw.githubusercontent.com/Alexey71/scripts/master/Kinozal.tv_Magnet_Links_Mod.jpg';

    // Создаем стили для модального окна
    $('head').append(`
        <style>
            .magnet-modal {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
            }
            .magnet-content {
                background-color: #F1D29C;
                margin: 15% auto;
                padding: 10px;
                border: 1px solid #888;
                width: 80%;
                max-width: 400px;
                border-radius: 5px;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            }
            .magnet-input {
                width: 100%;
                padding: 8px;
                margin: 10px 0;
                box-sizing: border-box;
            }
            .magnet-buttons {
                text-align: center;
            }
            .magnet-button {
                padding: 5px 5px;
                margin-left: 10px;
                cursor: pointer;
            }
        </style>
    `);

    // Создаем модальное окно
    $('body').append(`
        <div id="magnetModal" class="magnet-modal">
            <div class="magnet-content">
                <input type="text" id="magnetLinkInput" class="magnet-input" readonly>
                <div class="magnet-buttons">
                    <button id="copyMagnet" class="magnet-button">Копировать</button>
                    <button id="openMagnet" class="magnet-button">Открыть</button>
                </div>
            </div>
        </div>
    `);

    // Добавляем кнопки magnet-ссылок
    $("a[href*='dl.kinozal.tv/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');
    $("a[href*='dl.kinozal.guru/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');
    $("a[href*='dl.kinozal.me/download.php?id=']").before('<a id="magnetLink" title="Скачать раздачу используя magnet-ссылку" href="#"> <img src="' + imgURL + '" alt="Скачать раздачу используя magnet-ссылку" height="25"/> </a>');

    // Обработчик клика по magnet-ссылке
    $("#magnetLink").click(function(){
        var result = new RegExp('id=(\\d+)').exec(window.location.href);
        var id = result[1];

        $.get('/get_srv_details.php?id=' + id + '&action=2', function(s){
            var result = new RegExp('Инфо хеш: (.{40})').exec(s);
            var hash = result[1];
            var magnetLink = 'magnet:?xt=urn:btih:' + hash;

            // Показываем модальное окно с ссылкой
            $('#magnetLinkInput').val(magnetLink);
            $('#magnetModal').show();
        });
    });

    // Кнопка копирования
    $('#copyMagnet').click(function() {
        var magnetLink = $('#magnetLinkInput').val();
        GM_setClipboard(magnetLink);
        $('#magnetModal').hide();
    });

    // Кнопка открытия
    $('#openMagnet').click(function() {
        var magnetLink = $('#magnetLinkInput').val();
        $('#magnetModal').hide();
        window.location.href = magnetLink;
    });

    // Закрытие при клике вне окна
    $(window).click(function(event) {
        if (event.target == $('#magnetModal')[0]) {
            $('#magnetModal').hide();
        }
    });
});
