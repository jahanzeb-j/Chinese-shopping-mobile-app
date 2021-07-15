export const WeChatShareMixin = {
    methods: {
        //获取签名
        getSignature(api = []){
            // 请求后台接口获取签名
            // let url = HOST_HDPUSER + '/weixin/getSignature'
            let url = HOST_HDPUSER + '/weixin/getSignature'
            // let urlParam = encodeURIComponent(window.location.href.split('#')[0])
            let urlParam = window.location.href.split('#')[0]
            console.log(urlParam);
            // let jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo','getLocation']
            let jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo'].concat(api)
            let nonceStr = Math.random().toString(36).substr(2)
            let timestamp = new Date().getTime().toString().substr(0, 10)
            return this.$api_get_no({
                url: url,
                data: {
                    url:'http://m.haodanpin.com/',
                    nonceStr: nonceStr,
                    timestamp: timestamp
                }
            }).then((res) => {
                if (res.code == 200) {
                    console.log(res)
                    let weixinSignature = res.signature
                    wx.config({
                       // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wxa7187fa65b31924e', // 公众号的唯一标识
                        timestamp:res.timestamp, // 生成签名的时间戳
                        nonceStr: res.nonceStr, // 生成签名的随机串
                        signature: weixinSignature,// 签名
                        // jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                } else {
                    console.log('获取签名失败')
                }
                return res
            })
        },
        //使用微信右上角分享功能，初始化微信的分享
        initWeChatShare(option){
            let {titles = '好单品', desc = '好单品', imgUrl = '', link = '', success = () => {}, callBack = {}} = option
            if(link == ''){
                link = window.location.href
            }
            // 处理二次分享的链接，把path强制转换成query，防止被微信篡改后跳到首页
            if(link.indexOf('/#/') > -1){
                // if(link.indexOf('?') > -1){
                //     link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1)
                // }else{
                //     // 如果分享出去的url没有query参数需要追加问号
                //     link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1) + '?'
                // }
                link = link.split('#')[0] + '?hashPath=' + link.split('#')[1].substr(1)
            }
            wx.ready(function () {
                wx.error(function (res) {
                    console.log(res)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                })
                let params = {
                    titles:title,
                    link: link,
                    desc: desc,
                    imgUrl: imgUrl,
                    success: () => {
                        success()
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                }
                console.log(params)
                //分享到微信朋友圈
                wx.onMenuShareTimeline(params);
                //分享到微信好友
                wx.onMenuShareAppMessage(params)
                //分享到QQ
                wx.onMenuShareQQ(params)
                // 分享到微博
                wx.onMenuShareWeibo(params);
                if(callBack['getLocation']){
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: (res) => {
                            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            var speed = res.speed; // 速度，以米/每秒计
                            var accuracy = res.accuracy; // 位置精度
                            callBack['getLocation'](res)
                        },
                        cancel: (res) => {
                            alert('拒绝获取位置将无法精准展示相应地理位置')
                            // 用户取消授权，则指定故宫的经纬度
                            let cancelRes = {
                                latitude: '39.924091',
                                longitude: '116.403414',
                                speed: '0.01',
                                accuracy: '100',
                            }
                            callBack['getLocation'](cancelRes)
                        },
                        error:(res) => {
                            alert('定位失败')
                            // 用户取消授权，则指定故宫的经纬度
                            let cancelRes = {
                                latitude: '39.909604',
                                longitude: '116.397228',
                                speed: '0.01',
                                accuracy: '100',
                            }
                            callBack['getLocation'](cancelRes)
                        },
                    });
                }
            })
        },
    }
}