<template>
    <div class="pay_susess">
        <div class="header">
            <span class="orderTitle">支付成功</span>
            <span class="return" @click="back">完成</span>
        </div>
        <div class="blank">
            <div class="blank_center">
                <!--微信环境下-->
                <div class="blank_box" v-if="isShow==1">
                    <div class="payNumWord">
                        长按识别二维码，获取订单实时信息
                    </div>
                    <div class="img" style="width:10rem;height:10rem;">
                        <img src="http://img.99114.com/group1/M00/86/E1/wKgGSFrKxNOAECvaAABvACEieKg690.jpg" alt="">
                    </div>
                    <div class="blank_button">
                        <div class="button_left" @click="conGo">继续逛</div>
                        <div class="button_right" @click="findOrderList">查看订单</div>
                    </div>
                </div>
                <!--其他环境-->
                <div class="blank_box1" v-if="isShow==0">
                    <div class="img">
                        <img src="../../assets/images/success/sucess.png" alt="">
                    </div>
                    <div class="payNumWord">
                       下单成功
                    </div>
                     <div class="blank_button">
                        <div class="button_left" @click="conGo">继续逛</div>
                        <div class="button_right" @click="findOrderList">查看订单</div>
                    </div>
                </div>
                <div class="address">
                    <div class="address_left">
                        <p>收货人</p>
                         <p>联系电话</p>
                         <p>收货地址</p>
                    </div>
                    <div class="address_right">
                        <p>{{this.receiveUsername}}</p>
                        <p>{{this.receiveTel}}</p>
                        <p class="p3">{{this.receiveAddress}}</p>
                    </div>
                </div>
                <div class="message">
                    <div class="message_left">
                        <p>支付方式</p>
                        <p>实付</p>
                    </div>
                    <div class="message_reight">
                        <p>{{this.payTypeStr}}</p>
                        <p>￥{{this.actualPaidMoney}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner">
            <img  :src='this.advimg'/>
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
    .pay_susess{
        width:100%;
    }
    .pay_susess  .header{
        height: 5rem;
        width: 100%;
        line-height: 5rem;
        /*text-align: center;*/
    }
    .pay_susess  .header .orderTitle{
        font-size:1.7rem;
        font-family:PingFangHK-Regular;
        color:rgba(37,37,37,1);
        margin-left: 5rem;
    }
    .pay_susess  .header .return{
        float: right;
        margin-right: 1.4rem;
        font-size:1.4rem;
        font-family:PingFangSC-Regular;
        color:rgba(92,92,92,1);
    }
    .pay_susess .blank{
        width:100%;
        height: 45rem;
        background:rgba(244,244,244,1);
        padding: 1rem;
    }
    .blank .blank_center{
        height: 100%;
        background: url('../../assets/images/success/chang.png') no-repeat;
        background-size: 100% 100%;
    }
    .pay_susess .blank .img{
        width:10rem;
        height:10rem;
        margin: 0 auto 2rem;
    }
    .pay_susess .blank .payNumWord{
        font-size:1.2rem;
        font-family:PingFangSC-Light;
        color:rgba(153,153,153,1);
        padding: 1.5rem 0;
    }
    .blank_button{
        margin-bottom: 3rem;
    }
    .blank_button div{
        display:inline-block;
        width: 10rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 1.5rem ;
        font-size:1.4rem;
        font-family:PingFangSC-Regular;
    }
    .blank_button .button_left{
        border:1px solid #808080;
        color: #808080;
        margin-right:5rem;
    }
    .blank_button .button_right{
        border:1px solid #808080;
        color: #808080;
    }
    .blank_button .button_left:hover{
         border:1px solid #EB544D;
        color: #EB544D;
        margin-right: 5rem;
    }
     .blank_button .button_right:hover{
        border:1px solid #EB544D;
        color: #EB544D;
    }
    .blank_center .address{
        width: 30rem;
        height: 10rem;
        border-top: 1px dashed #ccc;
        border-bottom: 1px dashed #ccc;
        margin:0 auto;
        text-align: left;
        font-size:1.2rem;
    }
    .blank_center .address div{
        font-family:PingFangSC-Regular;
        padding-top: 1.8rem;
    }
    .address div p{
        margin-bottom: 1rem;
    }
    .address .address_left{
        float: left;
        color:#B3B3B3;
        margin-right: 1rem;
    }
    .address .address_right{
        float: left;
        color:#808080;
    }
    .address .address_right .p3{
        height: 3rem;
        width: 23rem;
        overflow: hidden;
        margin: 0;
        line-height: 1.5rem;
    }
    .message{
        width: 30rem;
        margin: 0 auto;
        text-align: left;
        padding-top: 1.5rem;
        font-size:1.2rem;
        font-family:PingFangSC-Regular;
    }
    .message div p{
        margin-bottom: 1rem;
    }
    .message_left{
        float: left;
        color:#B3B3B3;
        margin-right: 1rem;
    }
    .message_reight{
        float: left;
        color:#808080;
    }
    .banner{
        width:37.5rem;
        height:6rem;
        background:#ccc;
    }
    .banner img{
        width:37.5rem;
        height:6rem;
        background:#ccc;
    }
    /*其他环境*/
    .pay_susess .blank_box1{
        padding-top:3rem;
    }
    .pay_susess .blank .blank_box1 .img{
        width:5rem;
        height: 5rem;
        margin-bottom:1rem;
    }
    .blank_box1 .img img{
        width:100%;
        height: 100%;
    }
    .pay_susess .blank_box1 .payNumWord{
        font-size:1.7rem;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        padding:0;
        margin-bottom:2.8rem;
    }
</style>
<script>
    export default{
        name: 'pay_susess',
        data(){
            return{
                isShow:'',
                advimg:'',
                receiveUsername:'',
                receiveTel:'',
                receiveAddress:'',
                payTypeStr:'',
                actualPaidMoney:'',
            }
        },
      mounted(){
        this.is_weixn();
        this.advShow();
      },
        methods: {
            //返回
            back(){
                window.location.href =  window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + '';
            },
            //点击确定
            makeSure(){
                window.location.href =  window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_details?idDetail='+this.$route.query.orderCode+'&typeDetail=1';
            },
            is_weixn(){
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    this.isShow=1;
                    this.getUserInfo();
                } else {
                    this.isShow=0;
                     this.getUserInfo();
                }
            },
            //得到用户信息
            getUserInfo(){
               var orderId=window.location.href.split("?")[1].split("=")[1];
                let url=HOST_HDPORDERS+'/order/front/parentOrOrderDetail';
                var obj={
                    'orderId':orderId,
                    'type':1
                }
                this.$resource(url).get(obj).then((response) => {
                   if(response.body.code==200){
                        var entity=response.body.entity;
                        this.receiveUsername=entity.receiveUsername;
                        this.receiveTel=entity.receiveTel;
                        this.receiveAddress=entity.receiveAddress;
                        this.payTypeStr=entity.payTypeStr.replace('-','');
                        this.actualPaidMoney=entity.actualPaidMoney;
                   }
                })
            },
            //查看订单
            findOrderList(){
                 window.location.href = HOST_HDPTEST + '/#/order_all?actionClass=4'
            },
            //继续逛
            conGo(){
                 window.location.href = HOST_HDPTEST + '/#/found_index'
            },
            //显示广告HOST_HDPTHEME
            advShow(){
                let url=HOST_HDPTHEME+'/advertising/getAdvertisingByType?type=0'
                this.$resource(url).get().then((response) => {
                   if(response.body.code==200){
                      this.advimg=response.body.respBody[0].advertisingPic
                   }
                })
            }
        }
    }
</script>