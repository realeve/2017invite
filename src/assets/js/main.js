$(document).ready(function() {
    function arrowAlignCenter() {
        var dom = $('.arrow');
        dom.css('left', (window.innerWidth - dom.width()) / 2);
        dom = $('.main-pic');
        dom.css('height', dom.width() / 2);
        // dom = $('.copy').eq(1);
        // dom.css('padding-left',(window.innerWidth-dom.width())/2);
    }

    function initFullpage() {
        $('.counter').counterUp({ delay: 10, time: 2000 });
        $('#app').fullpage({
            css3: true,
            afterLoad: function(page, index) {
                $('.section')
                    .eq(index - 1)
                    .find('.hide')
                    .css('display', 'block');
            },
            onLeave: function(index) {
                setTimeout(function() {
                    $('.section')
                        .eq(index - 1)
                        .find('.hide')
                        .css('display', 'none');
                }, 500)
            }
        });
    }

    function init() {
        arrowAlignCenter();
        initFullpage();
    }
    init();
})