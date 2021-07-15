<template>
    <div class="current_card">
        <div class="header">
            <span class="return" @click="returnBack"><img style="height: 2rem;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">支付</span>
        </div>
        <div class="grayLine"></div>

        <div class="current">
            <div class="word">
                <span>当前银行卡</span>
                <div class="img" @click="chooseCard">
                    <span class="img_1"><img src="../../assets/images/rightri.png" alt=""></span>
                </div>
            </div>
            <div class="currentCard">
                <div class="currentCardLeft">
                    <div class="div1">
                        <img :src=defaultBank.bankImgPath alt="">
                    </div>
                    <div class="div2">
                        <span class="div2_1">{{ defaultBank.bank_name }}</span>
                        <span v-show="defaultBank.card_type ==2" class="div2_2">储蓄卡</span>
                        <span v-show="defaultBank.card_type ==3" class="div2_2">信用卡</span>
                    </div>
                </div>
                <div class="currentCardRight">
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp2">{{defaultBank.card_no}}</span>
                </div>
            </div>
        </div>
        <div class="payNum">
            <span>支付金额:</span>
            <span class="red">
                <span>￥</span>
                <span class="redNum">{{ totalMoney }}</span>
                <span>元</span>
            </span>
        </div>
        <div class="next">
            <mt-button size="normal" class="nextBtn" @click="payNow">支付</mt-button>
        </div>

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

    .current_card{
        width:100%;
    }

    .current_card  .header{
        padding: 1.3rem 0;
    }

    .current_card  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .current_card  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .current_card .current{
        padding: 0 0.8rem 1rem 0.8rem;
    }

    .current_card .current .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }

    .current_card .current .word .img{
        width:2rem;
        height:2rem;
    }

    .current_card .current .word .img .img_1{
        width:0.5rem;
        height:1rem;
        float: right;
    }

    .current_card .current .currentCard{
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

    .current_card .current .currentCard .currentCardLeft{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .current_card .current .currentCard .currentCardLeft .div1{
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

    .current_card .current .currentCard .currentCardLeft .div1 img{
        width:3rem;
        height:3rem;
    }

    .current_card .current .currentCard .currentCardLeft .div2{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
    }

    .current_card .current .currentCard .currentCardLeft .div2 .div2_1{
        font-size: 1.3rem;
        font-weight: bolder;
    }

    .current_card .current .currentCard .currentCardLeft .div2 .div2_2{
        font-size: 1rem;
        margin-top:0.5rem;
    }

    .current_card .current .currentCard .currentCardRight{
        font-size:1.2rem;
    }

    .current_card .current .currentCard .currentCardRight .sp1{
        margin-right:0.7rem;
    }

    .current_card .current .currentCard .currentCardRight .sp2{
        margin-right:1rem;
    }

    .current_card .ableChooseCard .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
    }


    .current_card .next{
        width:100%;
        padding: 0 0.8rem 0 0;
    }

    .current_card .next .nextBtn{
        width:97%;
        height:4.3rem !important;
        background: #F9BE00;
        font-size:1.7rem !important;
        color: #fff;
    }

    .current_card .payNum{
        font-size:1.2rem;
        margin: 2.5rem 0 1.5rem 0;
    }

    .current_card .payNum .red{
        color: #cc141c;
        font-size:1.2rem;
        justify-content: center;
        align-items: center;
    }

    .current_card .payNum .red .redNum{
        font-size:1.7rem;
        font-weight: bolder;
        margin: 0 -0.2rem 0 -0.2rem;
    }

    .current_card .popup{
        width:100%;
        height:100rem;
        background: #7A7A7A;
        position: fixed;
        top:0;
        z-index:11;
        opacity:0.5;
    }

    .current_card  .alertWindow{
        width:75%;
        height:16.8rem;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-8.6rem;
        margin-left:-37.5%;
        z-index:22;
    }

    .current_card  .alertWindow{
        background: #fff;
        border-radius: 5%;
    }

    .current_card  .alertWindow_ul .li1 .title{
        font-size: 1.8rem;
        color:#000;
        margin: 1rem 0 1.5rem 0;
        font-weight: bolder;
    }

    .current_card  .alertWindow_ul .li2{
        font-size: 1.5rem;
        color:#333;
        line-height: 2rem;
        width:21rem;
        margin: 0 auto;
    }

    .current_card  .alertWindow_ul .li3{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        height:6rem;
        line-height:6rem;
        border-top:1px solid #D8D9DB;
        margin-top: 1rem;
    }

    .current_card  .alertWindow_ul .li3 .cancel{
        font-size:1.8rem;
        color: #999;
        width:50%;
        border-right:1px solid #D8D9DB;
    }

    .current_card  .alertWindow_ul .li3 .addAddress{
        font-size:1.8rem;
        color: #f9be00;
        width:50%;
    }
</style>

<script>
    import { Toast } from 'mint-ui'
    import { throttle } from 'util'




    export default{
        name: 'choose_card',
        data(){
            return{
                page_url: HOST_HDPTEST + '/#/pay_susess',
                bankList: [],
                loginCode: '',
                userId: '',
                no_agree: '',
                totalMoney: '',
                defaultBank: '',
                noDefaultBank: '',
                isHaveBankCard: false,
                params: {
                    acct_name: '',
                    card_no: '',
                    id_no: this.userId,
                    loginCode: this.loginCode,
                    no_agree: this.noAgree,
                    no_order: this.$route.query.orderCode,
                    order_notify_era_url: ( HOST_HDPORDERS + "/wsms/pay/asynCardandpayInform.json" ),
                    order_notify_refund_url: ( HOST_HDPORDERS + "/wsms/pay/asynRefundInform.json" ),
                    order_notify_url: ( HOST_HDPORDERS + "/wsms/pay/asynInform.json" ),
                    order_url_return:  ( HOST_HDPORDERS + "/wsms/pay/syncInform.json" ),
                    query_order_info: ( HOST_HDPORDERS + "/wsms/public/beforePay.json" ),
                    query_order_price: ( HOST_HDPORDERS + "/wsms/public/getPriceByOrderCode.json" ),
                    url_return_update_bank: '',
                    user_url_return:'',
                },
                bankImgUrl: ''
            }
        },
        mounted(){
            this.dbReq = throttle(this.requestToPay,10000)

            this.getStorageBank()



        },
        methods: {
            //获取localstorage存储的银行卡的信息
            getStorageBank(){
                if( window.localStorage.getItem('defaultBank') ){
                    this.loginCode = window.localStorage.getItem('loginCode')
                    this.defaultBank = JSON.parse( window.localStorage.getItem('defaultBank') )
                    // console.log( this.defaultBank )
                    this.totalMoney = this.$route.query.totalMoney
                    this.noAgree =  this.defaultBank.no_agree
                }
            },

            //返回
            returnBack(){
                window.history.back()
            },

            //支付
            payNow(){
                this.dbReq()

            },

            //选择卡
            chooseCard(){
                window.localStorage.setItem('orderCode',this.$route.query.orderCode)
                window.localStorage.setItem('totalMoney',this.$route.query.totalMoney)
                window.localStorage.setItem('bank_name',this.defaultBank.bank_name)
                window.localStorage.setItem('card_no',this.defaultBank.card_no)
                window.localStorage.setItem('card_type',this.defaultBank.card_type)
                window.localStorage.setItem('no_agree',this.defaultBank.no_agree)
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "choose_card"
            },

            //真正去支付
            requestToPay(){
                var redirect = encodeURI(HOST_HDPTEST + '/#/pay_susess?orderId='+this.$route.query.orderCode)
                let url = HOST_HDPPAY + '/wk/wsms/payment/wapPay/toWapPay.json'
                this.loginCode= window.localStorage.getItem('loginCode')
                this.params = {
                    acct_name: '',
                    card_no: '',
                    id_no: '',
                    loginCode: this.loginCode,
                    no_agree: this.noAgree,
                    no_order: this.$route.query.orderCode,
                    order_notify_era_url: ( HOST_HDPORDERS + "/order/pay/asynCardandpayInform.json"),
                    order_notify_refund_url: ( HOST_HDPORDERS + "/order/pay/asynRefundInform.json"),
                    order_notify_url: ( HOST_HDPORDERS + "/order/pay/asynInform.json"),
                    order_url_return:  ( HOST_HDPORDERS + "/order/pay/syncInform.json"),
                    query_order_info: ( HOST_HDPORDERS + "/order/public/beforePay"),
                    query_order_price: ( HOST_HDPORDERS + "/order/public/getPriceByCardandpayOrderCode"),
//                    url_return_update_bank: HOST_HDPTEST + '/#/first_pay',
                    url_return_update_bank: redirect,
                    user_url_return:  HOST_HDPPAY + '/wk/wsms/payment/wapPay/urlReturn?redirect='+redirect,
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
                    }else if( res.ret_code == '6001' ){
                        // console.log( 4444 )
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
        }

    }
</script>
