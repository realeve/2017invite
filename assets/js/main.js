var weixin = (function () {
    var debug = false;

    function initWXConfig() {
        $
            .ajax({
                url: 'http://wx.cbpc.ltd/weixin/signature.json',
                data: {
                    url: window
                        .location
                        .href
                        .split('#')[0]
            }
            })
            .done(function (obj) {
                wx.config({
                    debug: false,
                    appId: obj.appId,
                    timestamp: obj.timestamp,
                    nonceStr: obj.nonceStr,
                    signature: obj.signature,
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                });
                initWXShare();
            });
    }

    function initWXShare() {
        wx
            .ready(function () {
                var option = {
                    title: '人民币硬币发行60周年纪念展邀请函',
                    desc: '中国印钞造币邀您参加人民币硬币发行60周年纪念展，10月6日-9日，中国上海不见不散。',
                    link: window
                        .location
                        .href
                        .split('?')[0],
                    imgUrl: 'http://cbpm.sinaapp.com/cdn/logo/cbpm.jpg'
                };
                wx.onMenuShareAppMessage(option);
                wx.onMenuShareTimeline(option);
                wx.onMenuShareQQ(option);
                wx.onMenuShareWeibo(option);
                wx.onMenuShareQZone(option);
            });
    }

    if (!debug) {
        initWXConfig();
    }
})();

$(document).ready(function () {
    function arrowAlignCenter() {
        var dom = $('.arrow');
        dom.css('left', (window.innerWidth - dom.width()) / 2);
        dom = $('.main-pic');
        dom.css('height', dom.width() / 2);
        // dom = $('.copy').eq(1);
        // dom.css('padding-left',(window.innerWidth-dom.width())/2);
    }
    function initFullpage() {
        $('.counter').counterUp({delay: 10, time: 2000});
        $('#app').fullpage({
            css3: true,
            afterLoad(page, index) {
                $('.section')
                    .eq(index - 1)
                    .find('.hide')
                    .css('display', 'block');
            },
            onLeave(index) {
                setTimeout(function () {
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