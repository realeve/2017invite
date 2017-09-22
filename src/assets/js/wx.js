(function() {
    var debug = false;
    var dom = document.createElement("script");
    dom.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
    document.body.appendChild(dom);

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
            .done(function(obj) {
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
            .ready(function() {
                var option = {
                    title: '国币之尊艺术之美，人民币硬币发行60周年纪念展',
                    desc: '国币之尊艺术之美，人民币硬币发行60周年纪念展，等你来！',
                    link: window
                        .location
                        .href
                        .split('?')[0],
                    imgUrl: 'http://cbpm.sinaapp.com/cdn/logo/coin.jpg'
                };
                wx.onMenuShareAppMessage(option);
                wx.onMenuShareTimeline(option);
                wx.onMenuShareQQ(option);
                wx.onMenuShareWeibo(option);
                wx.onMenuShareQZone(option);
            });
    }

    function recordReadNum() {
        $.ajax({
            url: "http://cbpc540.applinzi.com/index.php",
            data: {
                s: "/addon/Api/Api/recordReadNum",
                url: window.location.href.split("#")[0].split("_")[0]
            },
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(n) {
            console.log(n);
        })
    }

    if (!debug) {
        initWXConfig();
        recordReadNum();
    }
})();