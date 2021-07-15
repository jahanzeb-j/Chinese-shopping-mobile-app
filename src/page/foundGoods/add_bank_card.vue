<template>
    <div class="add_bank_card">
        <div class="header">
            <span class="return" @click="returnBack"><img  style="height: 2rem;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">添加银行卡</span>
        </div>
        <div class="grayLine"></div>
        <div class='tipwords'>请绑定持卡人本人的银行卡</div>
        <div class="someInfo" v-show="isFirst">
            <ul style='border-top: 1px solid #D8D9DB;'>
                <li>
                    <label for="">姓名</label>
                    <input type="text" placeholder="输入持卡人姓名"  v-model="cardName" class="diffInput">
                </li>
                <li>
                    <label for="">卡号</label>
                    <input type="text" placeholder="输入银行卡卡号" v-model="cardNumber">
                </li>

                <li>
                    <label for="">身份证号</label>
                    <input type="text" placeholder="输入身份证号"  v-model="cardId">
                </li>
            </ul>
        </div>
        <div class="next" v-show="isFirst">
            <mt-button size="normal" class="nextBtn" @click="next" v-if="!isDisabled">下一步</mt-button>
            <mt-button size="normal" class="nextBtn1" v-if="isDisabled">下一步</mt-button>
        </div>

        <!-- <div class="current" v-show="!isFirst">
            <div class="word">
                <span>当前银行卡</span>
                <div class="img" @click="chooseCard">
                    <span class="img_1"><img src="../../assets/images/rightri.png" alt=""></span>
                </div>

            </div>
            <div class="currentCard">
                <div class="currentCardLeft">
                    <div class="div1">
                        <img src="../../assets/images/banklogo.png" alt="">
                    </div>
                    <div class="div2">
                        <span class="div2_1">民生银行</span>
                        <span class="div2_2">储蓄卡</span>
                    </div>
                </div>
                <div class="currentCardRight">
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp2">7778</span>
                </div>
            </div>
        </div>
        <div class="payNum" v-show="!isFirst">
            <span>支付金额:</span>
            <span class="red">
                <span>￥</span>
                <span class="redNum">1806.3</span>
                <span>元</span>
            </span>
        </div>
        <div class="next" v-show="!isFirst">
            <mt-button size="normal" class="nextBtn" @click="payNow">支付</mt-button>
        </div> -->

        <div class="popup" v-show="isHaveBankCard"></div>
        <div class="alertWindow" v-show="isHaveBankCard">
            <ul class="alertWindow_ul">
                <li class="li1">
                    <div class="title">提示</div>
                </li>
                <li class="li2">
                   银行卡余额不足(如为信用卡则为可透支额度不足),请核实后再试
                </li>
                <li class="li3">
                    <span class="cancel" @click="cancel">取消</span>
                    <span class="addAddress" @click="addBankCard">添加银行卡</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>

    .toast {
        position: fixed;
        /*max-width: 80%;*/
        border-radius: 0.5rem;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear;
        /*width: 80%;*/
        /*padding:0 10rem;*/
        height: 4rem;
        line-height: 3rem;
    }
    .mint-toast-text {
        font-size: 1.4rem !important;
        display: block;
        text-align: center;
    }

    .mint-button{
        border: 0 !important;
    }
</style>
<style scoped>

    .mint-button{
        margin:1rem 0;
    }
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

    .tipwords{
        text-align: left;
        padding: 2rem 1rem;
        font-size: 1.3rem;
        color: #cd141c;
    }
    .add_bank_card{
        width:100%;
    }

    .add_bank_card  .header{
        padding: 1.3rem 0;
    }

    .add_bank_card  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .add_bank_card  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .add_bank_card .someInfo{
        text-align: left;
        padding: 0 0.8rem;
    }

    .add_bank_card .someInfo .diffInput{
        font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu
    }


    .add_bank_card .someInfo label{
        font-size:1.4rem;
        color: #5C5C5C;
        width: 7rem;
        display: inline-block;
    }

    .add_bank_card .someInfo input{
        font-size:1.4rem;
        color: #333;
        width: 20rem
    }

    .add_bank_card .someInfo ul li{
        padding: 1.5rem 0;
        border-bottom: 1px solid #D8D9DB;
    }

    .add_bank_card .next{
        width:100%;
        margin-top:2.5rem;
    }

    .add_bank_card .next .nextBtn{
        width:97%;
        height:4.3rem !important;
        background: #F9BE00;
        color: #fff;
        font-size:1.7rem !important;
    }

    .add_bank_card .next .nextBtn1{
        width:97%;
        height:4.3rem !important;
        background: #d6d6d6;
        font-size:1.7rem !important;
        color: #fff;
    }

   .current{
        padding: 0 0.8rem 1rem 0.8rem;
    }

     .current .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
         -webkit-justify-content: space-between;
    }

     .current .word .img{
        width:2rem;
        height:2rem;
    }

     .current .word .img .img_1{
        width:0.5rem;
        height:1rem;
        float: right;
    }

     .current .currentCard{
        padding: 1.1rem 0.8rem;
        background: #5DC6DD;
        border-radius: 3%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        color: #fff;
    }

     .current .currentCard .currentCardLeft{
        display: flex;
        display: -webkit-flex;
        align-items: center;
         -webkit-align-items: center;
    }

     .current .currentCard .currentCardLeft .div1{
        width:5rem;
        height:5rem;
        border-radius: 50%;
        background: #fff;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        margin-right: 0.6rem;
    }

     .current .currentCard .currentCardLeft .div1 img{
        width:3rem;
        height:3rem;
    }

     .current .currentCard .currentCardLeft .div2{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
    }

     .current .currentCard .currentCardLeft .div2 .div2_1{
        font-size: 1.3rem;
        font-weight: bolder;
    }

     .current .currentCard .currentCardLeft .div2 .div2_2{
        font-size: 1rem;
        margin-top:0.5rem;
    }

     .current .currentCard .currentCardRight{
        font-size:1.2rem;
    }

     .current .currentCard .currentCardRight .sp1{
        margin-right:0.7rem;
    }

     .current .currentCard .currentCardRight .sp2{
        margin-right:1rem;
    }

     .ableChooseCard .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
    }


     .next{
        width:100%;
    }

     .next .nextBtn{
        width:100%;
        height:4rem !important;
        background: #F9BE00;
        font-size:1.5rem;
        color: #fff;
    }

     .payNum{
        font-size:1.2rem;
        margin: 2.5rem 0 1.5rem 0;
    }

     .payNum .red{
        color: #cc141c;
        font-size:1.2rem;
        justify-content: center;
        align-items: center;
    }

     .payNum .red .redNum{
        font-size:1.7rem;
        font-weight: bolder;
        margin: 0 -4px 0 -8px;
    }

    .add_bank_card .popup{
        width:100%;
        height:100rem;
        background: #7A7A7A;
        position: fixed;
        top:0;
        z-index:11;
        opacity:0.5;
    }

    .add_bank_card  .alertWindow{
        width:75%;
        height:16.8rem;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-8.6rem;
        margin-left:-37.5%;
        z-index:22;
    }

    .add_bank_card  .alertWindow{
        background: #fff;
        border-radius: 5%;
    }

    .add_bank_card  .alertWindow_ul .li1 .title{
        font-size: 1.8rem;
        color:#000;
        margin: 1rem 0 1.5rem 0;
        font-weight: bolder;
    }

    .add_bank_card  .alertWindow_ul .li2{
        font-size: 1.5rem;
        color:#333;
        line-height: 2rem;
        width:21rem;
        margin: 0 auto;
    }

    .add_bank_card  .alertWindow_ul .li3{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        height:6rem;
        line-height:6rem;
        border-top:1px solid #D8D9DB;
        margin-top: 1rem;
    }

    .add_bank_card  .alertWindow_ul .li3 .cancel{
        font-size:1.8rem;
        color: #999;
        width:50%;
        border-right:1px solid #D8D9DB;
    }

    .add_bank_card  .alertWindow_ul .li3 .addAddress{
        font-size:1.8rem;
        color: #f9be00;
        width:50%;
    }


</style>

<script>
    import { Toast } from 'mint-ui'
    import { Indicator } from 'mint-ui'
    export default{
        name: 'add_bank_card',
        data(){
            return{
                page_url: HOST_HDPTEST + '/#/pay_susess',
                isDisabled:true,
                cardNumber: '',
                cardName:'',
                cardId: '',
                isFirst: true,
                formData: {},
                noAgree: '',
                loginCode: '',
                params: {
                    acct_name: '',
                    card_no: '',
                    id_no: '',
                    loginCode: this.loginCode,
                    no_agree:'',
                    no_order: this.$route.query.orderCode,
                    order_notify_era_url: ( HOST_HDPORDERS + "/order/pay/asynCardandpayInform.json" ),
                    order_notify_refund_url: ( HOST_HDPORDERS + "/order/pay/asynRefundInform.json" ),
                    order_notify_url: ( HOST_HDPORDERS + "/order/pay/asynInform.json" ),
                    order_url_return:  ( HOST_HDPORDERS + "/order/pay/syncInform.json" ),
                    query_order_info: ( HOST_HDPORDERS + "/order/public/beforePay.json" ),
                    query_order_price: ( HOST_HDPORDERS + "/order/public/getPriceByOrderCode.json" ),
                    url_return_update_bank: '',
                    user_url_return: this.page_url
                },
                isHaveBankCard: false
            }
        },
      mounted(){

      },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //请求卡bin，检验银行号
            checkCardNum(){
                this.loginCode= window.localStorage.getItem('loginCode')
                let url = HOST_HDPPAY + '/wk/wsms/payment/pay/bankcardbin.json'
                this.$resource (url ).get({ card_no: this.cardNumber, loginCode: this.loginCode }).then((response) => {
                    // console.log(response.body )
                    if( response.status == 200 ){
                        if( response.body.ret_code == '5001' ){
                            Toast({
                                message: '银行卡号错误',
                                position: 'center',
                                duration: 2000
                            })
                        }else if( response.body.ret_code == '0000'){
                            // console.log(response.body )
                        }
                    }
                })
            },

            //选择银行卡
            chooseCard(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'choose_card';
            },

            //支付
            payNow(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'pay_susess';
            },

            //点击下一步
            next(){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                })
                let url = HOST_HDPPAY + '/wk/wsms/payment/pay/bankcardbin.json'
                this.$resource(url).get({card_no: this.cardNumber, loginCode: this.loginCode }).then((response) => {
                    // console.log( response)
                    if (response.status == 200) {
                        Indicator.close()
                        if (response.body.ret_code == '5001') {
                            Toast({
                                message: '银行卡号错误',
                                position: 'center',
                                duration: 2000
                            })
                        } else if (response.body.ret_code == '0000') {
                            this.requestToPay()
                        } else {
                            Toast({
                                message: response.body.ret_msg,
                                position: 'center',
                                duration: 2000
                            })
                        }
                    }
                })
            },

            //真正去支付的方法
            requestToPay(){
                let url = HOST_HDPPAY + '/wk/wsms/payment/wapPay/toWapPay.json'
                this.loginCode= window.localStorage.getItem('loginCode')
                var redirect = encodeURI(HOST_HDPTEST + '/#/pay_susess?orderId='+this.$route.query.orderCode)
                this.params = {
                        acct_name: this.cardName,
                        card_no: this.cardNumber,
                        id_no: this.cardId,
                        loginCode: this.loginCode,
                        no_agree: '',
                        no_order: this.$route.query.orderCode,
                        order_notify_era_url: ( HOST_HDPORDERS + "/order/pay/asynCardandpayInform.json"),
                        order_notify_refund_url: ( HOST_HDPORDERS + "/order/pay/asynRefundInform.json"),
                        order_notify_url: ( HOST_HDPORDERS + "/order/pay/asynInform.json"),
                        order_url_return:  ( HOST_HDPORDERS + "/order/pay/syncInform.json"),
                        query_order_info: ( HOST_HDPORDERS + "/order/public/beforePay"),
                        query_order_price: ( HOST_HDPORDERS + "/order/public/getPriceByCardandpayOrderCode"),
//                        url_return_update_bank: HOST_HDPTEST + '/#/first_pay',
                        url_return_update_bank:redirect,
                        user_url_return: HOST_HDPPAY + '/wk/wsms/payment/wapPay/urlReturn?redirect='+redirect,
                }
                this.$api_post({
                    url:url,
                    data:this.params
                }).then(res=>{
                    if( res.ret_code == '0000' ){
                        let code = this.loginCode;
                        let no_order =  res.no_order;
                        window.location.href = HOST_HDPPAY+"/wk/wsms/payment/wapPay/toWapPayLianLian.json?loginCode="+code+"&no_order="+no_order
                    }else if(  res.ret_code == '-1111'){
                        let url = HOST_HDPUSER+'/user/isLogin';
                        this.loginCode= window.localStorage.getItem('loginCode')
                        this.userId= window.localStorage.getItem('userId')
                        if(this.loginCode != ""){
                            this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                                if (response.status == 200) {
                                    if(response.data.code<0){
                                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                    }
                                }
                            })
                        }
                    }else {
                        Toast({
                            message: res.ret_msg,
                            position: 'center',
                            duration: 2000
                        })
                    }
                })
            },

            //点击取消
            cancel(){
                this.isHaveBankCard = false
            },

            //添加银行卡
            addBankCard(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_bank_card?orderCode='+this.$route.query.orderCode;
            }
        },
        watch: {
            //监测账号是否输入
            cardNumber: function () {
                if( this.cardNumber !="" && this.cardName !="" && this.cardId != '' ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            },

            //监测姓名是否输入
            cardName: function () {
                if( this.cardNumber !="" && this.cardName !="" && this.cardId != '' ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            },

            //监测身份证号是否输入
            cardId: function () {
                if( this.cardNumber !="" && this.cardName !="" && this.cardId != '' ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            }
        }
    }
</script>
