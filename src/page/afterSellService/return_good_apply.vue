<template>
    <div class="afterSellService_list">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">售后列表</span>
        </div>
        <div class="grayLine"></div>
        <div class="main">
            <ul class="main_ul">
                <li>
                    <div class="div1">
                        <div class="div_l">
                            <span class="word">售后单号:</span>
                            <span></span>
                        </div>
                        <div class="div1_r">
                            待处理
                        </div>
                    </div>
                    <div class="div2">
                        <div class="div2_l">
                            <img src="../../assets/images/detailList1.png" alt="">
                        </div>
                        <div class="div2_r">
                            <div class="div2_r_1">

                            </div>
                            <div class="div2_r_2">
                                <ul class="specifications">
                                    <li>
                                        <span class="sp1">规格1 : </span>
                                        <span>大小: </span>
                                    </li>
                                    <li>
                                        <span class="sp1">规格 2: </span>
                                        <span>颜色</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="div3">
                        <div class="div3_l">
                            <span>申请时间 : </span>
                            <span>2017-02-19</span>
                        </div>
                        <div class="div3_r">
                            <span>退款金额 : </span>
                            <span>￥100</span>
                        </div>
                    </div>
                    <div class="div4">

                    </div>
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

    .afterSellService_list{
        width:100%;
    }

    .afterSellService_list  .header{
        padding: 1.3rem 0;
    }

    .afterSellService_list  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .afterSellService_list  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .afterSellService_list .main .main_ul li .div1{
        display: flex;
        justify-content: space-between;
        padding: 2.7rem 0.8rem;
        font-size:1.3rem;
        color: #333;
        width:100%;
    }

    .afterSellService_list .main .main_ul li .div1 .word{
        margin-right:1rem;
    }

    .afterSellService_list .main .main_ul li .div1 .div1_r{
        color: #f9be00;
    }

    .afterSellService_list .main .main_ul li .div2{
        width:100%;
        background: #F4F4F4;
        padding: 0.7rem 0.8rem;
        display: flex;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_l{
        width:7.6rem;
        height:7.6rem;
        margin-right:1rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_1{
        width:26rem;
        font-size:1.2rem;
        color: #333;
        text-align: left;
        line-height:1.7rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2{
        font-size:1.2rem;
        text-align: left;
        margin-top: 1.5rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications{
        display: flex;
        color: #868686;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications li{
        margin-right:1.6rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications li .sp1{
        margin-right:0.8rem;
    }
</style>

<script>
    export default{
        name: 'afterSellService_list',
        data(){
            return{

            }
        },
      mounted(){

      },
        methods: {
            returnBack(){
                window.history.back()
            }
        }

    }
</script>
