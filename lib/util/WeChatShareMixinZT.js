import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';

export var WeChatShareMixinZT = function () {
    function WeChatShareMixinZT() {
        _classCallCheck(this, WeChatShareMixinZT);
    }

    _createClass(WeChatShareMixinZT, [{
        key: 'getSignature',
        value: function getSignature(zttitle, imgUrl, desc, link, _success) {

            var urlParam = window.location.href.split('#')[0];
            link = link || window.location.href;
            var url = HOST_HDPUSER + '/weixin/getSignature';
            var nonceStr = Math.random().toString(36).substr(2);
            var timestamp = new Date().getTime().toString().substr(0, 10);
            this.$api_get_no({
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
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: weixinSignature,
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] });
                } else {
                    console.log('获取签名失败');
                }
            });
            wx.ready(function () {

                wx.onMenuShareAppMessage({
                    zttitle: zttitle,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    type: 'link',
                    success: function success() {
                        _success();
                    }
                });
                wx.onMenuShareTimeline({
                    zttitle: zttitle,
                    link: link,
                    imgUrl: imgUrl,
                    cancel: function cancel() {}
                });
            });
        }
    }, {
        key: 'changeShareContent',
        value: function changeShareContent(zttitle, imgUrl, desc, link) {
            link = link || window.location.href;
            wx.onMenuShareAppMessage({
                zttitle: zttitle,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                type: 'link' });
            wx.onMenuShareTimeline({
                zttitle: zttitle,
                link: link,
                imgUrl: imgUrl,
                cancel: function cancel() {}
            });
        }
    }]);

    return WeChatShareMixinZT;
}();