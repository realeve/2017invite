$(document)
    .ready(function () {

        var audioList = [
            '1、前言',
            '2、第一部分',
            [
                '4、第二套人民币流通硬币',
                '5、小知识：为什么“硬分币”有早于1957年年号的产品？',
                '6、小知识：为什么第二套人民币流通硬币没有角币？',
                '7、小知识：为什么会存在“硬分币”与“纸分币”并存现象？',
                '8、小知识：你知道硬币边部丝齿是谁发明的吗？',
                '9、小知识：你知道硬分币试制过程中曾四次转变材质成分吗？'
            ],
            [
                '10、第三套人民币流通硬币', '11、小故事：当年藏友是如何追捧“长城币”的？'
            ],
            [
                '12、第四套人民币流通硬币', '13、小知识：硬币采用“花卉”图案的寓意！', '14、小知识：什么是“辅币”和“主币”？'
            ],
            [
                '15、第五套人民币流通硬币', '16、小知识为什么人们习惯称“元”为“块”？', '17、小知识：货币单位“角”的由来？', '18、小知识：为什么人们习惯称呼“角”为“毛”？'
            ],
            '19、模具设计与制作',
            '20、硬币的生产',
            [
                '21、第二部分', '23、著名人物'
            ],
            '22、重大事件',
            '',
            '25、世界遗产',
            '26、珍稀动物',
            '27、生肖贺岁',
            '28、其他主题',
            [
                '29-1、普通纪念币防伪技术1', '29-2、普通纪念币防伪技术2'
            ],
            [
                '30、第三部分', '32、部分熊猫题材'
            ],
            '31、部分获“世界硬币大奖”的纪念币',
            '33、首轮生肖题材',
            [
                '35、特种工艺', '34、国庆题材'
            ],
            [
                '36.第四部分', '37.国际标准金锭'
            ],
            [
                '24、体育题材', '39.体育奖牌'
            ],
            '40.其他产品',
            '41.设计雕刻团队',
            ['38.纪念章', '42.结束语']
        ]

        function arrowAlignCenter() {
            var dom = $('.arrow');
            dom.css('left', (window.innerWidth - dom.width()) / 2);
        }

        function initDOM() {
            var arr = [];
            for (var i = 1; i <= 27; i++) {
                if (i == 3 || i == 4) {
                    continue;
                }
                var j = (i < 10
                    ? '0'
                    : '') + i;
                arr.push('<div class="section">\
                    <img class="lazyload" data-original="' +
                        'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" data-src' +
                        '="./assets/img/' + j + '.jpg">\
                </div>')
            }
            $('#app').append(arr.join(''));
            // $(".lazyload:not(':first')").lazyload();
        }

        function loadImg(index) {
            // 使用lazyload无法实现实时载入数据，采用手动设置的方式提前加载
            var dom = $(".lazyload").eq(index);
            dom.attr('src', dom.data('src'));
        }

        function initFullpage() {
            $('#app').fullpage({
                css3: true,
                slidesNavigation: true,
                afterLoad: function (page, index) {
                    loadImg(index);
                    // 提前加载2张图片
                    loadImg(index + 1);
                    audioEvents(index);
                },
                onLeave:function(index, nextIndex, direction){
                    $('audio').unbind('ended');
                }
            });
        }

        function audioEvents(index) {

            var audioName = audioList[index - 1];
            if (audioName == '') {
                return;
            }
            var aid = 0;
            if (typeof audioName == 'string') {
                audioInit(audioName);
                $('audio').on('ended', function () {
                    $
                        .fn
                        .fullpage
                        .moveSectionDown();
                });
            } else {
                audioInit(audioName[aid++]);
                $('audio').on('ended', function () {
                    if (aid < audioName.length) {
                        audioInit(audioName[aid++]);
                    } else {
                        // 阅读完毕之后自动翻页
                        $
                            .fn
                            .fullpage
                            .moveSectionDown();
                    }
                });
            }

        }

        function init() {
            initDOM();
            arrowAlignCenter();
            initFullpage();
        }
        init();
    })