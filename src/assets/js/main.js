$(document)
    .ready(function () {
        function arrowAlignCenter() {
            var dom = $('.arrow');
            dom.css('left', (window.innerWidth - dom.width()) / 2);
        }

        function initDOM() {
            var arr = [];
            for (var i = 1; i <= 27; i++) {
                var j = (i < 10
                    ? '0'
                    : '') + i;
                arr.push('<div class="section">\
            <img src="./assets/img/' + j + '.jpg">\
        </div>')
            }
            $('#app').append(arr.join(''));
        }

        function initFullpage() {
            $('.counter').counterUp({delay: 10, time: 2000});
            $('#app').fullpage({
                css3: true,
                slidesNavigation: true,
                afterLoad: function (page, index) {},
                onLeave: function (index) {}
            });
        }

        function init() {
            initDOM();
            arrowAlignCenter();
            initFullpage();
            audioInit('1、前言');
        }
        init();
    })