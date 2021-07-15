<template>
    <div class="pay_susess">
        <div class="header">
            <span class="orderTitle">支付成功</span>
            <span class="return" @click="back">完成</span>
        </div>
        <div class="blank">
            <div class="blank_center">
                <!--其他环境-->
                <div class="blank_box1" v-if="isShow==0">
                    <div class="img">
                        <img src="../../assets/images/success/fair.png" alt="">
                    </div>
                    <div class="payNumWord">
                       <p class="p1">支付失败，请重新支付</p>
                       <p class="p2">订单已为您保留，若24小时后未付款，系统将自动取消。</p>
                    </div>
                     <div class="blank_button">
                        <div class="button_left">继续逛</div>
                        <div class="button_right">查看订单</div>
                    </div>
                </div>
                <!--<div class="border"></div>-->
                <div class="message">
                    <p>安全提示：好单品不会通过任何非官方电话、QQ、微信与您联系,也不会要求您点击链接进行退款或取消订单！</p>
                    <p>客服电话：400-8716-727</p>
                </div>
            </div>

        </div>
        <div class="banner">
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
        height: 33rem;
        background:rgba(244,244,244,1);
        padding: 1rem;

    }
    .blank .blank_center{
        height: 100%;
        background: url('../../assets/images/success/duan.png') no-repeat;
        background-size: 100% 100%;
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
        border:1px solid #EB544D;
        color: #EB544D;
        margin-right: 5rem;
    }
    .blank_button .button_right{
        border:1px solid #808080;
        color: #808080;
    }
    .message{
        width: 30rem;
        margin: 0 auto;
        font-size:1.2rem;
        font-family:PingFangSC-Regular;
        color:rgba(153,153,153,1);
        text-align: left;
        line-height: 1.8rem;
        border-top: 1px dashed #ccc;
        padding-top:1.5rem;
    }
    .banner{
        width:37.5rem;
        height:6rem;
        background:#ccc;
    }
    /*其他环境*/
    .pay_susess .blank_box1{
        padding-top:3rem;
    }
    .pay_susess .blank_box1 .img{
        width:5rem;
        height: 5rem;
        margin-bottom:1rem;
        margin: 0 auto 1.5rem;
    }
    .blank_box1 .img img{
        width:100%;
        height: 100%;

    }
    .pay_susess .blank_box1 .payNumWord{
        font-family:PingFangSC-Regular;
        padding:0;
        margin-bottom:2.8rem;
    }
    .blank_box1 .payNumWord .p1{
        font-size:1.4rem;
        color:#EB544D;
        margin-bottom:1.5rem;
    }
    .blank_box1 .payNumWord .p2{
        font-size:1.2rem;
        color:#BFBFBF;
    }
</style>

<script>
    export default{
        name: 'pay_susess',
        data(){
            return{
                isShow:'',
            }
        },
      mounted(){
        this.is_weixn();
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
                } else {
                    this.isShow=0;
                }
            }
        }
    }
</script>
