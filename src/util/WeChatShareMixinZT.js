// import $ from 'jquery'
export class WeChatShareMixinZT {
    /**
     *  WeChatShareService 微信分享工具类，用于分享到朋友圈，发送给朋友
     *  接口地址 http://appms.app.cntvwb.cn/appms/wxjs/getsign.do
     * @requires jquery
     * @param title {String} title  分享的标题
     * @param imgUrl {String} imgUrl  分享的图片地址
     * @param desc {String} desc  分享的描述
     */
    getSignature(zttitle, imgUrl, desc, link,success) {
        
        let urlParam = window.location.href.split('#')[0] //获取url
        link = link || window.location.href;
        let url = HOST_HDPUSER + '/weixin/getSignature' //获取签名接口
        let nonceStr = Math.random().toString(36).substr(2) //生成签名的随机串
        let timestamp = new Date().getTime().toString().substr(0, 10)//生成签名的时间戳
        this.$api_get_no({
            url: url,
            data: {
                url: 'http://m.haodanpin.com/',
                nonceStr: nonceStr,
                timestamp: timestamp
            },
        }).then((res) => {
            if (res.code == 200) {
                console.log(res)
                let weixinSignature = res.signature
                wx.config({
                    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxa7187fa65b31924e', // 公众号的唯一标识
                    timestamp: timestamp, // 生成签名的时间戳
                    nonceStr: nonceStr, // 生成签名的随机串
                    signature: weixinSignature,// 签名
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            } else {
                console.log('获取签名失败')
            }
        })
        wx.ready(function () {
            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            // 获取“分享给朋友”按钮点击状态及自定义分享内容接口

            wx.onMenuShareAppMessage({
                zttitle: zttitle, // 分享标题
                desc: desc, // 分享描述
                link: link,
                imgUrl: imgUrl, // 分享图标
                type: 'link' ,// 分享类型,music、video或link，不填默认为link
                success: () => {
                    success()
                    // 用户确认分享后执行的回调函数
                },  
            });
            wx.onMenuShareTimeline({
                zttitle: zttitle, // 分享标题
                link: link,
                imgUrl: imgUrl, // 分享图标
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    }

    /**
     * 修改分享内容
     * @param title {String} title  分享的标题
     * @param imgUrl {String} imgUrl  分享的图片地址
     * @param desc {String} desc  分享的描述
     * @param link {String} link  分享的url地址
     */
    changeShareContent(zttitle, imgUrl, desc, link) {
        link = link || window.location.href;
        wx.onMenuShareAppMessage({
            zttitle: zttitle, // 分享标题
            desc: desc, // 分享描述
            link: link,
            imgUrl: imgUrl, // 分享图标
            type: 'link' // 分享类型,music、video或link，不填默认为link
        });
        wx.onMenuShareTimeline({
            zttitle: zttitle, // 分享标题
            link: link,
            imgUrl: imgUrl, // 分享图标
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    };





}
