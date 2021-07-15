export var WeChatShareMixin = {
    methods: {
        getSignature: function getSignature() {
            var api = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var url = HOST_HDPUSER + '/weixin/getSignature';

            var urlParam = window.location.href.split('#')[0];
            console.log(urlParam);

            var jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo'].concat(api);
            var nonceStr = Math.random().toString(36).substr(2);
            var timestamp = new Date().getTime().toString().substr(0, 10);
            return this.$api_get_no({
                url: url,
                data: {
                    url: 'http://m.haodanpin.com/',
                    nonceStr: nonceStr,
                    timestamp: timestamp
                }
            }).then(function (res) {
                if (res.code == 200) {
                    console.log(res);
                    var weixinSignature = res.signature;
                    wx.config({
                        appId: 'wxa7187fa65b31924e',
                        timestamp: res.timestamp,
                        nonceStr: res.nonceStr,
                        signature: weixinSignature,
                        jsApiList: jsApiList });
                } else {
                    console.log('获取签名失败');
                }
                return res;
            });
        },
        initWeChatShare: function initWeChatShare(option) {
            var _option$titles = option.titles,
                titles = _option$titles === undefined ? '好单品' : _option$titles,
                _option$desc = option.desc,
                desc = _option$desc === undefined ? '好单品' : _option$desc,
                _option$imgUrl = option.imgUrl,
                imgUrl = _option$imgUrl === undefined ? '' : _option$imgUrl,
                _option$link = option.link,
                link = _option$link === undefined ? '' : _option$link,
                _option$success = option.success,
                _success = _option$success === undefined ? function () {} : _option$success,
                _option$callBack = option.callBack,
                callBack = _option$callBack === undefined ? {} : _option$callBack;

            if (link == '') {
                link = window.location.href;
            }

            if (link.indexOf('/#/') > -1) {
                link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1);
            }
            wx.ready(function () {
                wx.error(function (res) {
                    console.log(res);
                });
                var params = {
                    titles: title,
                    link: link,
                    desc: desc,
                    imgUrl: imgUrl,
                    success: function success() {
                        _success();
                    },
                    cancel: function cancel() {}
                };
                console.log(params);

                wx.onMenuShareTimeline(params);

                wx.onMenuShareAppMessage(params);

                wx.onMenuShareQQ(params);

                wx.onMenuShareWeibo(params);
                if (callBack['getLocation']) {
                    wx.getLocation({
                        type: 'wgs84',
                        success: function success(res) {
                            var latitude = res.latitude;
                            var longitude = res.longitude;
                            var speed = res.speed;
                            var accuracy = res.accuracy;
                            callBack['getLocation'](res);
                        },
                        cancel: function cancel(res) {
                            alert('拒绝获取位置将无法精准展示相应地理位置');

                            var cancelRes = {
                                latitude: '39.924091',
                                longitude: '116.403414',
                                speed: '0.01',
                                accuracy: '100'
                            };
                            callBack['getLocation'](cancelRes);
                        },
                        error: function error(res) {
                            alert('定位失败');

                            var cancelRes = {
                                latitude: '39.909604',
                                longitude: '116.397228',
                                speed: '0.01',
                                accuracy: '100'
                            };
                            callBack['getLocation'](cancelRes);
                        }
                    });
                }
            });
        }
    }
};