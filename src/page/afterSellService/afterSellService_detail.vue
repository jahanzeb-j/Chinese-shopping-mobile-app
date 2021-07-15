<template>
    <div class="afterSellService_list">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">售后详情</span>
        </div>
        <div class="main">
            <ul class="main_ul">
                <li>
                    <div class="div1">
                        <span class="div_l">
                            <span class="word">申退状态:</span>
                            <span class="div1_r" v-show="entitys.refundType==1 && entitys.refundStatue==0">
                                待审核
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==1 && entitys.refundStatue==2">
                                已拒绝
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==1 && entitys.refundStatue==5">
                                已退款
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==1 && entitys.refundStatue==6">
                                申退关闭
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==1 && entitys.refundStatue==7">
                                退款失败
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==0">
                                待审核
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==1">
                                待买家退货
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==2">
                                已拒绝
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==3">
                                待处理
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==4">
                                待返货
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==5">
                                已退款
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==6">
                                申退关闭
                            </span>
                            <span class="div1_r" v-show="entitys.refundType==2 && entitys.refundStatue==7">
                                已返货
                            </span>
                        </span>
                    </div>
                    <div class="div1">
                        <div class="div_l">
                            <span class="word">售后编号:</span>
                            <span>{{entitys.refundCode}}</span>
                        </div>
                    </div>
                    <div class="div1">
                        <div class="div_l">
                            <span class="word">提交时间:</span>
                            <span>{{entitys.createDate}}</span>
                        </div>
                    </div>
                    <div class="div2">
                        <div class="div2_l">
                            <img :src=entitys.imgUrl alt="">
                        </div>
                        <div class="div2_r">
                            <div class="div2_r_1">
                                <div class="div2_r_1_word">
                                    {{ entitys.pdName }}
                                </div>
                                <div class="div2_r_1_num">
                                    ￥{{ entitys.pdPrice }}
                                </div>
                            </div>
                            <div class="div2_r_2">
                                <ul class="specifications">
                                    <li>
                                        <span class="sp1"> {{ entitys.pdSpce }} </span>
                                    </li>
                                </ul>
                                <div class="div3_r">
                                    x{{ entitys.goodsNum}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="div1">
                        <div class="div_l">
                            <span class="word">退款金额:</span>
                            <span class="returnMoney">￥{{ entitys.refundMoney }}</span>
                        </div>
                    </div>
                    <div class="div1 div1_border" v-show="entitys.refundType==2 && (entitys.refundStatue==1 || entitys.refundStatue==5 || entitys.refundStatue==7)">
                        退货地址:
                    </div>
                    <div class="all clearfix" v-show="entitys.refundType==2 && (entitys.refundStatue==1 || entitys.refundStatue==5 || entitys.refundStatue==7)">
                        <div class="all_o7">
                            <img src="../../assets/images/mapicon.png" >
                            {{entitys.receiveUsername}}
                        </div>
                        <div class="all_o6">{{entitys.receiveTel}}</div>
                    </div>
                    <div class="all clearfix border" v-show="entitys.refundType==2 && ( entitys.refundStatue==1 || entitys.refundStatue==5 || entitys.refundStatue==7 )">
                        <div class="all_o8">
                            {{ entitys.receiveAddress }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="grayLine"></div>
        <div class="logisticInfo">
            <ul class="clearfix">
                <li v-for="(item,index) in entitys.logs">
                    <div class="circleDetail">
                        <span class="img" v-show="!index"><img src="../../assets/images/sun.png" alt=""></span>
                        <span class="img_line" v-show="index"><img src="../../assets/images/grayCircleLine.png" alt=""></span>
                    </div>
                    <div class="logistic">
                        <div class="logistic1">
                            <span class="logistic_word">{{ item.content }}</span>
                        </div>
                        <div class="logistic2">
                            <div class="time">
                               {{ item.time }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="apply_btn">
            <mt-button size="small" class="cancel" @click="cancel(entitys.refundCode)" v-show="( (entitys.refundStatue == 0 || entitys.refundStatue == 2) && ( entitys.refundType == 1) ) || ( ( entitys.refundType == 2) && (  entitys.refundStatue == 2 ||  entitys.refundStatue == 1 || entitys.refundStatue == 0 ) )">撤销申请</mt-button>
            <mt-button size="small" class="revise" @click="reviseApply(entitys.refundCode)" v-show="( ( entitys.refundType == 1) && ( entitys.refundStatue == 0 || entitys.refundStatue == 2 ) ) || (  (entitys.refundType == 2) && ( entitys.refundStatue == 0 || entitys.refundStatue == 2) )">修改申请</mt-button>
            <mt-button size="small" class="goToDelivery" @click="goToDelivery" v-show="entitys.refundType == 2 && entitys.refundStatue == 1">去发货</mt-button>
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

    .clearfix{zoom:1;}

    .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}

    .afterSellService_list{
        width:100%;
        /* padding-top:93px; */
        padding-top:4.6rem;
    }

    .afterSellService_list  .header{
        padding: 1.3rem 0;
        position: fixed;
        top:0;
        width:100%;
        background: #fff;
        border-bottom: 1px solid #D8D9DB;
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

    .afterSellService_list .main{
        border-top: 1px solid #D8D9DB;
    }

    .afterSellService_list .main .main_ul li .div1{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size:1.4rem;
        color: #333;
        width:100%;
        margin-bottom:1.5rem;
        padding: 1.5rem 0 0 0.8rem;
    }

    .afterSellService_list .main .main_ul li .div1 .word{
        margin-right:1rem;
        color: #858585;
    }

    .afterSellService_list .main .main_ul li .div1 .returnMoney{
        color: #cd141c;

    }

    .afterSellService_list .main .main_ul li .div2{
        width:100%;
        background: #F4F4F4;
        padding: 0.7rem 0.8rem;
        display: flex;
        display: -webkit-flex;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_l{
        width:7.6rem;
        height:7.6rem;
        margin-right:1rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_1{
        display: flex;
        display: -webkit-flex;
        justify-content:space-between;
        -webkit-justify-content:space-between;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_1 .div2_r_1_word{
        width:18rem;
        font-size:1.2rem;
        color: #333;
        text-align: left;
        line-height: 1.6rem;
        height:3.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap : break-word;
        word-break:normal;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_1 .div2_r_1_num{
        font-weight: bolder;
        font-size:1.4rem;
        /*margin-top:1.8rem;*/
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2{
        font-size:1.2rem;
        text-align: left;
        margin-top: 1.5rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .div3_r{
        float: right;
        margin-top: -1.3rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r{
        width:80%;
        display: flex;
        display: -webkit-flex;
        flex-direction:column;
        -webkit-flex-direction:column;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: 0 0 2.6rem 0;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications{
        display: flex;
        display: -webkit-flex;
        color: #868686;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications li{
        margin-right:1.6rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_2 .specifications li .sp1{
        margin-right:0.8rem;
    }

    .all{
        padding: 0 4%;
        width: 100%;
    }

    .all img{
        width: 1.3rem;
        margin-top: 1.2rem;
        float: left;
        height: 1.7rem;
        margin-right: 0.5rem;
    }

    .all_o6{
        float: right;
        font-size: 1.3rem;
        height: 4rem;
        line-height: 4rem;
        color: #333;
        font-weight: bold;
    }

    .all_o7{
        float: left;
        font-size: 1.3rem;
        height: 4rem;
        line-height: 4rem;
        font-weight: bold;
    }

    .all_o8{
        float: left;
        font-size: 1.3rem;
        height: 4rem;
        line-height: 7.5rem;
        margin-left: 1.5rem;
    }

    .afterSellService_list .logisticInfo{
        font-size:1.3rem;
        text-align: left;
        padding-left:0.8rem;
        padding-bottom:5.2rem;
        position: relative;
        border-bottom: 1px solid #D8D9DB;
    }

    .afterSellService_list .logisticInfo ul li{
        padding: 1.5rem 0 0 0;
        display: flex;
        display: -webkit-flex;
        position: relative;
        height:7rem;
        width:100%;
    }

    .afterSellService_list .logisticInfo ul li .circleDetail{
        overflow: hidden;
    }

    .afterSellService_list .logisticInfo ul li .circleDetail .img{
        margin-right:1.5rem;
        position: absolute;
        z-index: 111;
        left:0.2rem;
    }

    .afterSellService_list .logisticInfo ul li .circleDetail .img_line{
        position: absolute;
        top: -4.4rem;
        left: 0.6rem;
        height: 7rem;
    }

    .afterSellService_list .logisticInfo ul li .logistic{
        width: 90%;
        position: absolute;
        top: 1px;
        left: 51px;
    }

    .afterSellService_list .logisticInfo ul li .logistic .logistic1{
        font-size:1.2rem;
        color: #000;
        margin-top: 1.5rem;
        line-height:1.5rem;
    }

    .afterSellService_list .logisticInfo ul li .logistic .logistic1 .logistic_word{
        font-size:1.2rem;
        color: #000;
        display: block;
        height: 4.5rem;
    }

    .afterSellService_list .logisticInfo ul li .logistic .logistic2{
        font-size:1.2rem;
        color: #868686;
        margin:  0.5rem 0 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #D8D9DB;
    }

    .afterSellService_list .apply_btn{
        padding: 1rem 0;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
        background: #f4f4f4;
    }

    .afterSellService_list .apply_btn button{
        width:8.2rem;
        height:3.6rem;
        border: 1px solid #D8D9DB;
        border-radius: 5%;
        font-size:1.2rem;
        margin-right: 1rem;
        color:#333;
        background: #fff;
    }

    .div1_border{
        border-top:1px solid #EAEAEA;
    }

</style>

<script>
    import Vue from 'vue'
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    }
    import { MessageBox } from 'mint-ui'
    import { Toast } from 'mint-ui'
    export default{
        name: 'afterSellService_list',
        data(){
            return{
                loginCode: '',
                isOnly:true,
                isOnly1:false,
                isShowLine:false,
                isShowLine1:true,
                isShowLine2:true,
                isShowLine3:true,
                isOnly1:false,
                isOnly2:false,
                isOnly3:false,
                entitys: '',
                refundCode: '',
                orderItemId: ''
            }
        },
        created(){
          this.getRefundDetail()

        },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //
            getRefundDetail(){
                this.loginCode = window.localStorage.getItem('loginCode')
                let url = HOST_HDPORDERS + '/order/front/refundDetail'
                // Vue.http.interceptors.push((request, next)  =>{
                //     request.headers.set('loginCode', this.loginCode);
                //     next((response) => {
                //         return response
                //     });
                // });
                this.$resource (url ).get({ id: this.$route.query.refundCode }).then((response) => {
                    let unixTimestamp = new Date( response.body.entity.createDate )
                    response.body.entity.createDate = unixTimestamp.toLocaleString();
                    if( response.status == 200 ){
                        if( response.body.code == 200 ){
                            // console.log( response )
                            this.entitys = response.body.entity
                            response.body.entity.imgUrl = response.body.entity.imgUrl.split(',')[0]
                            this.refundCode = response.body.entity.refundCode
                            this.orderItemId = response.body.entity.orderItemId
                        }else {
                            Toast({
                                message: response.body.msg,
                                position: 'center',
                                duration: 3000
                            })
                        }
                    }
                })
            },

            //去退货
            goToDelivery(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'logistics_info?refundCode='+this.refundCode+'&orderItemId='+this.orderItemId;
            },

            //修改申请
            reviseApply(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'revise_apply?refundCode='+this.refundCode;;
            },

            //撤销申退
            cancel(){
                MessageBox.confirm('确定要撤销申请吗?').then(action => {
                    let url = HOST_HDPORDERS + '/order/front/cancelRefund/'
                    this.$resource(url).get({ id: this.$route.query.refundCode }).then((response) => {
                        if( response.status == 200 ){
                            if( response.body.code == 200 ){
                                this.getRefundDetail()
                            }else {
                                MessageBox('提示', response.body.msg );
                            }
                        }
                    })
                },function () {
                })
            }
        }
    }
</script>
