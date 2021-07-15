<template>
    <div class="first_pay">
        <div class="header">
            <span class="return" @click="returnBack"><img style="height: 2rem;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">收银台</span>
        </div>
        <div class="grayLine"></div>
        <div class="info">
            <ul class="info_ul">
                <li class="li2">
                    <span class="sp1">应付金额</span>
                    <span class="sp2">
                        ￥
                        <span class="price">{{ totalMoney }}</span>
                        元
                    </span>
                </li>
            </ul>
        </div>
        <div class="grayLine"></div>
        <div class="payType">
            <div class="head">
                选择支付方式
            </div>
            <div class="payTypeList">
                <ul class="payTypeList_ul">
                    <li class="li1" :class="{ 'acitve': 'wechat' === isSelected }" v-show="isWeChat" @click="weChatPay">
                        <!--v-show="isWeChat"-->
                        <div class="left">
                            <span class="img"><img src="../../assets/images/wechatBig.png" alt=""></span>
                            <span>微信支付</span>
                        </div>
                        <div class="right">
                            <img src="../../assets/images/rightri.png" alt="">
                        </div>
                    </li>
                    <li class="li2" :class="{ 'acitve': 'bankCard' === isSelected }" @click="sureToPay">
                        <div class="left">
                            <span class="img"><img src="../../assets/images/Unionpay.png" alt=""></span>
                            <span>银行卡快捷支付</span>
                        </div>
                        <div class="right">
                            <img src="../../assets/images/rightri.png" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="popup" v-show="isHaveBankCard"></div>
        <div class="alertWindow" v-show="isHaveBankCard">
            <ul class="alertWindow_ul">
                <li class="li1">
                    <div class="title">提示</div>
                </li>
                <li class="li2">
                    银行卡快捷支付需添加一张支持提现的银联卡
                </li>
                <li class="li3">
                    <span class="cancel"  @click="cancel">取消</span>
                    <span class="addAddress" @click="addBankCard">添加银行卡</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    img{
        width:100%;
        height:100%;
    }
    span{
        display: inline-block;
    }
    .grayLine{
        width:100%;
        height:1rem;
        background: #f4f4f4;
    }
    .first_pay  .header{
        padding: 1.3rem 0;
    }
    .first_pay  .header .orderTitle{
        font-size:1.8rem;
        color: #333;
    }
    .first_pay  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }
    .first_pay .info{
        width:100%;
        padding: 1.5rem 0.8rem;
    }
    .first_pay .info .info_ul .li2{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .first_pay .info .info_ul .li2 .sp1{
        font-size:1.4rem;
        color: #333333;
    }
    .first_pay .info .info_ul .li2 .sp2{
        font-size:1.2rem;
        color: #cc141c;
    }
    .first_pay .info .info_ul .li2 .sp2 .price{
        font-size:1.5rem;
        color: #cc141c;
        font-weight: bolder;
    }
    .first_pay .payType .head{
        padding: 1.5rem 0.8rem;
        text-align: left;
        font-size:1.4rem;
        color: #5c5c5c;
    }
    .first_pay .payType .payTypeList{
        margin-bottom: 3rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul li{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding: 1.5rem 0.8rem;
        border-top: 1px solid #D8D9DB;
    }
    .first_pay .payType .payTypeList .payTypeList_ul li.acitve{
        background: #F4F4F4;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li1 .right{
        width: 0.6rem;
        height: 1rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li2 .right{
        width: 0.6rem;
        height: 1rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li1 .left{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        font-size:1.4rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li2 .left{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        font-size:1.4rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li1 .left .img{
        margin-right:0.5rem;
        width:2.9rem;
        height:2.9rem;
    }
    .first_pay .payType .payTypeList .payTypeList_ul .li2 .left .img{
        margin-right:0.5rem;
        width:2.9rem;
        height:2.9rem;
    }
    .first_pay .payType .sureToPay{
        width:100%;
        padding: 1.5rem 0;
    }
    .first_pay .payType .sureToPay .surePay{
        width:20rem;
        height:4rem;
        background: #F9BE00;
        font-size:1.5rem;
        color: #fff;
    }
    .first_pay .popup{
        width:100%;
        height:100rem;
        background: #7A7A7A;
        position: fixed;
        top:0;
        z-index:11;
        opacity:0.5;
    }
    .first_pay  .alertWindow{
        width:75%;
        height:16.8rem;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-8.6rem;
        margin-left:-37.5%;
        z-index:22;
    }
    .first_pay  .alertWindow{
        background: #fff;
        border-radius: 5%;
    }
    .first_pay  .alertWindow_ul .li1 .title{
        font-size: 1.8rem;
        color:#000;
        margin: 3rem 0 1.5rem 0;
        font-weight: bolder;
    }
    .first_pay  .alertWindow_ul .li2{
        font-size: 1.5rem;
        color:#333;
        line-height: 2rem;
        width:21rem;
        margin: 0 auto;
    }
    .first_pay  .alertWindow_ul .li3{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        height:6rem;
        line-height:6rem;
        border-top:1px solid #D8D9DB;
        margin-top: 1rem;
    }
    .first_pay  .alertWindow_ul .li3 .cancel{
        font-size:1.8rem;
        color: #999;
        width:50%;
        border-right:1px solid #D8D9DB;
    }
    .first_pay  .alertWindow_ul .li3 .addAddress{
        font-size:1.8rem;
        color: #f9be00;
        width:50%;
    }
</style>
<script>
    import {router} from '../../router/index.js'
    import { Indicator } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default{
        name: 'first_pay',
        data(){
            return{
                paramLocalObj:{},
                isBack:true,
                isSelected:'',
                isHaveBankCard:false,
                loginCode: '',
                userId: '',
                totalMoney: '',
                lastTime: '',
                orderCode: '',
                hours: '',
                mins: '',
                secs: '',
                urlRemain: '',
                isWeChat: '',
                weChatObj: {},
                weixinSignature: '',
                nonceStr: '',
                timestamp: '',
                bank_code: [],
                defaultBank: '',
                noDefaultBank: '',
                bankImgUrl: '',
                bankImgPath: [],
                openId:''
            }
        },
        created(){
            let paramLocal = localStorage.getItem('payParams').split('&')
            paramLocal.forEach((item,i)=>{
                    let temp = item.split('=')
                    this.paramLocalObj[temp[0]] = temp[1]
            })
        },
        mounted(){
            this.gitopenId();
            if(localStorage.getItem('payRedirct') === '1' && (SETDOMAIN=='com' || SETDOMAIN=='cn')){
                let redirectUrl = encodeURIComponent(HOST_HDPUSER+"/weixin/redirectToPay")
                localStorage.setItem('payRedirct',0)
                let url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7187fa65b31924e&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base&state=WEIXIN#wechat_redirect"
                window.location.href = url
            }else{
                let _this = this
                let urlParams = window.location.href; //获取url中"?"符后的字串
                let index = urlParams.indexOf('?')
                this.urlRemain = urlParams.substring(index+1,urlParams.length);
                let paramArr = this.urlRemain.split('&');
                let paramObj = {}
                paramArr.forEach((item,i)=>{
                    let temp = item.split('=')
                    paramObj[temp[0]] = temp[1]
                })
                // this.openId = paramObj['openId']
                let state = {
                        title: "title",
                        url: "#/first_pay?" + this.urlRemain
                };
                window.history.pushState(state, "title", "#/first_pay?" + this.urlRemain);
                if (window.history && window.history.pushState) {
                    $(window).on('popstate', function (e) {
                        //微信后退到详情页
                        if(_this.isBack){
                            $(window).off('popstate');
                            //  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
                            //  + 'good_detail?'
                            //  + 'commodityId='+_this.paramLocalObj.commodityId+'&found_index='+_this.paramLocalObj.found_index
                            // 因为经常有人出现支付的时候跳转到订单的问题，所以先把这里注释掉，如果支付出什么问题再把下边代码放开
                            //  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=0'
                        }
                    });
                }
            }
            this.getOrderInfo()
        },
        methods: {
            // 获取openid
            gitopenId(){
                let loginCode = window.localStorage.getItem('loginCode');
                let url=HOST_HDPUSER+'/weixin/getOpendId?loginCode='+loginCode+'&appId=wxa7187fa65b31924e'
                this.$resource( url ).get().then((res) => {
                    // console.log(res);
                    if(res.status==200){
                        this.openId=res.bodyText;
                    }
                })
            },
            //返回
            returnBack(){
                var order_details = this.paramLocalObj.order_details
                var order_all = this.paramLocalObj.order_all
                var shopping = this.paramLocalObj.shopping
                let paramObj = localStorage.getItem('payParams').split('&')
                let urlParams = 'commodityId='+ this.paramLocalObj['commodityId'] +'&found_index='+this.paramLocalObj['found_index']
                this.isBack = false;
                // if( shopping == 1 ){
                //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+urlParams
                // }else if( order_all == 1 ){
                //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?'+this.urlRemain
                // }else if( order_details == 1 ){
                //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_details?idDetail='+
                //     this.paramLocalObj.orderCode + '&' + urlParams
                // }else {
                //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+urlParams;
                // }
                this.$router.push({path:'order_all',query:{activeIndex:0}})
            },
            //获取订单的信息
            getOrderInfo(){
                let _this = this
                if(this.paramLocalObj.totalMoney1){
                  _this.totalMoney = this.paramLocalObj.totalMoney1
                }else{
                  _this.totalMoney = this.paramLocalObj.totalMoney
                }
                var msec = this.paramLocalObj.lastTime
                var totalSec = Math.floor( msec/1000 )
                _this.hours = Math.floor(totalSec/60/60)
                _this.mins =  Math.floor( (totalSec - _this.hours*60*60)/60 )
                _this.secs = Math.floor(totalSec - _this.hours*60*60 - _this.mins*60)
                var timer = setInterval(function () {
                    if( _this.hours== 0 && _this.mins == 0 && _this.secs == 0 ){
                        _this.hours == 0;
                        _this.mins == 0;
                        _this.secs == 0
                    }
                    _this.secs--;
                    if(_this.secs <0 ){
                        _this.secs = 59;
                        _this.mins--;
                        if(_this.mins< 0){
                            _this.mins = 59;
                            _this.hours--;
                            if(_this.hours<0){
                                _this.hours = 24;
                            }
                        }
                    }
                }, 1000);
                _this.orderCode = this.paramLocalObj.orderCode
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    //是在微信中打开
                    _this.isWeChat = true
                    _this.getSignature()
                }else {
                    //不是微信
                    _this.isWeChat = false
                }
            },
            //获取签名
            getSignature(){
                var _this = this
                // 请求后台接口获取签名
                let url = HOST_HDPUSER + '/weixin/getSignature'
                let urlParam = window.location.href.split('#')[0]
                _this.nonceStr = Math.random().toString(36).substr(2)
                _this.timestamp = new Date().getTime().toString().substr(0,10);
                _this.$resource(url).get({ url: urlParam,nonceStr:_this.nonceStr, timestamp: _this.timestamp }).then((response) =>{
                    if( response.body.code == 200 ){
                        _this.weixinSignature = response.body.signature
                        wx.config({
//                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: 'wxa7187fa65b31924e', // 公众号的唯一标识
                            timestamp:_this.timestamp, // 生成签名的时间戳
                            nonceStr: _this.nonceStr, // 生成签名的随机串
                            signature: _this.weixinSignature,// 签名
                            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    }else {
                        Toast({
                            message: response.body.msg,
                            position: 'center',
                            duration: 3000
                        });
                    }
                })
            },
            //微信支付
            weChatPay(){
                let loginCode = window.localStorage.getItem('loginCode')
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                setTimeout(() => {
                    Indicator.close()
                }, 2000);
                // alert(this.totalMoney+'  ss ' +this.paramLocalObj.orderCode +'  ss  '+this.openId +'  ss  '+ loginCode)
                var _this = this
                let url = HOST_HDPPAY +'/wk/wsms/payment/wxPay/newPay';
                let weChatParams = {
                    cashnum: this.totalMoney,
                    loginCode: loginCode,
                    orderId: this.paramLocalObj.orderCode,
                    openId:this.openId,
                    terminalType:2
                }
                // console.log(weChatParams);
                _this.$resource( url ).get( weChatParams ).then((response) => {
                    console.log(response)
                    if( response.body.code == 200 ){
                        _this.isBack = false;
                        Indicator.close();
                        _this.weChatObj = response.body.result;
                        wx.ready(function() {
                            wx.chooseWXPay({
//                                appId:_this.weChatObj.appId, //公众号名称，由商户传入
                                timestamp:_this.weChatObj.timeStamp, //时间戳，自1970年以来的秒数
                                nonceStr:_this.weChatObj.nonceStr, //随机串
                                package:_this.weChatObj.package,
                                signType:_this.weChatObj.signType, //微信签名方式：
                                paySign:_this.weChatObj.sign,
                                success: function (res) {
                                    // console.log(res)
                                    // if (res.errMsg == "chooseWXPay:ok") {
                                        // _this.$alert_msg('支付成功');
                                        // window.location.href = HOST_HDPTEST + '/#/order_details?idDetail='+_this.paramLocalObj.orderCode+'&typeDetail=1'
                                        Indicator.open({
                                            text: '支付成功跳转中……',
                                            spinnerType: 'fading-circle'
                                        });
                                         setTimeout(()=> {
                                            Indicator.close();
                                            window.location.href = HOST_HDPTEST + '/#/pay_susess?orderId='+_this.paramLocalObj.orderCode
                                        }, 2000);
                                    // }else {
                                    // }
                                },
                                cancel: function (res) {
                                    _this.isBack = true;                               }
                            })
                        })
                    }else if( response.body.code == -1 ){
                        this.isBack = false;
                        let loginCode = window.localStorage.getItem('loginCode')
                        let redirectUrl = encodeURIComponent(HOST_HDPUSER+"/weixin/userBaseInfo?loginCode="+loginCode+"&loginBack=order_all?activeIndex=1");
                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7187fa65b31924e&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base&state=WEIXIN#wechat_redirect"
                    }else{
                        Toast({
                            message: response.body.msg,
                            position: 'center',
                            duration: 3000
                        });
                    }
                })
            },
//            //调用微信的支付API
//            onBridgeReady(){
//                var that = this
//                WeixinJSBridge.invoke(
//                    'getBrandWCPayRequest', {
//                        "appId":that.weChatObj.appId, //公众号名称，由商户传入
//                        "timeStamp":that.weChatObj.timeStamp, //时间戳，自1970年以来的秒数
//                        "nonceStr":that.weChatObj.nonceStr, //随机串
//                        "package":that.weChatObj.package,
//                        "signType":that.weChatObj.signType, //微信签名方式：
//                        "paySign":that.weChatObj.sign //微信签名
//                    },
//                    function(res){
//                        alert("返回"+ res.err_msg);
//                        if( res.err_msg == "get_brand_wcpay_request:ok" ) {
//                            Toast({
//                                message: '支付成功',
//                                position: 'center',
//                                duration: 3000
//                            });
//                            alert( '该跳转页面了')
//                            window.location.href = HOST_HDPTEST + '/#/order_details?idDetail='+paramLocalObj.orderCode+'&typeDetail=1'
//                        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//                    }
//                );
//                that.checkWePayStatue();
//            },
//            checkWePayStatue(){
//                if (typeof WeixinJSBridge == "undefined"){
//                    if( document.addEventListener ){
//                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false);
//                    }else if (document.attachEvent){
//                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady());
//                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady());
//                    }
//                }else{
//                    this.onBridgeReady();
//                }
//            },
            //确认支付
            sureToPay( ){
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                let url = HOST_HDPPAY + '/wk/wsms/payment/pay/getBankcardList.json'
                this.$resource (url ).get({ user_id: this.userId, loginCode: this.loginCode }).then((response) => {
                    this.isBack = false;
                    if( response.status == 200 ){
                        Indicator.close();
                        this.isBack = false;
                        if( response.body.ret_code =='3007' || response.body.ret_code =='8901' ){
                            this.isHaveBankCard = true
                        }else if( response.body.ret_code == '0000' ){
                            var bankCardInfo = response.body.agreement_list
                            for( let i = 0; i < bankCardInfo.length; i++ ){
                                this.bank_code.push( bankCardInfo[i].bank_code )
                            }
                            // console.log(this.bank_code)
                            let url = HOST_HDPPAY +'/wk/wsms/payment/wapPay/getBankInfoByNo.json'
                            // this.$resource ( url ).save({}, this.bank_code ).then((response) => {
                            //     if( response.body.ret_code == 200 ){
                            //         for( let i = 0; i < response.body.resp_body.length; i++ ){
                            //             let ImgUrl = 'http://'+response.body.resp_body[i].bankImgPath
                            //             this.bankImgPath.push( ImgUrl )
                            //         }
                            //         for( let i = 0; i < bankCardInfo.length; i++ ){
                            //             bankCardInfo[i].bankImgPath = this.bankImgPath[i]
                            //             this.defaultBank = bankCardInfo[0]
                            //             if( bankCardInfo.length > 1 ){
                            //                 this.noDefaultBank = bankCardInfo.slice(1,bankCardInfo.length)
                            //             }
                            //             window.localStorage.setItem( 'defaultBank', JSON.stringify(this.defaultBank) )
                            //             window.localStorage.setItem( 'noDefaultBank', JSON.stringify(this.noDefaultBank) )
                            //         }
                            //         window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'current_card?orderCode='+this.orderCode+'&totalMoney='+this.totalMoney;
                            //     }
                            // })
                            this.$api_post({
                                url:url,
                                data:this.bank_code
                            }).then(res=>{
                                if( res.ret_code == 200 ){
                                    // 根据银行卡编号来对应相应的logo
                                    let obj = {}
                                    // console.log(JSON.stringify(res.resp_body))
                                    res.resp_body.forEach(e => {
                                        obj[e.bankNo] = 'http://' + e.bankImgPath
                                    })
                                    // console.log(JSON.stringify(bankCardInfo))
                                    bankCardInfo.forEach(e => {
                                        e.bankImgPath = obj[e.bank_code]
                                    })
                                    // console.log(JSON.stringify(this.defaultBank))
                                    this.defaultBank = bankCardInfo[0]
                                    if( bankCardInfo.length > 1 ){
                                        this.noDefaultBank = bankCardInfo.slice(1, bankCardInfo.length)
                                    }
                                    // console.log(JSON.stringify(this.defaultBank),'77')
                                    window.localStorage.setItem( 'defaultBank', JSON.stringify(this.defaultBank))
                                    window.localStorage.setItem( 'noDefaultBank', JSON.stringify(this.noDefaultBank))
                                    // console.log(88)
                                    this.$router.push({path:'current_card',query:{orderCode:this.orderCode,totalMoney:this.totalMoney}})
                                    // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'current_card?orderCode='+this.orderCode+'&totalMoney='+this.totalMoney;
                                }
                            })
                        }else if( response.body.ret_code == '-1111' ){
                            let url = HOST_HDPUSER+'/user/isLogin';
                            this.loginCode= window.localStorage.getItem('loginCode')
                            this.userId= window.localStorage.getItem('userId')
                            if(this.loginCode == null ){
                                this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                                    if (response.status == 200) {
                                        if(response.data.code<0){
                                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                            window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'first_pay');
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            },
            //取消添加银行卡
            cancel(){
                this.isHaveBankCard = false
            },
            //添加银行卡
            addBankCard(){
                this.isBack = false;
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_bank_card?orderCode='+this.orderCode;
            },
        }
    }
</script>