<template>
    <div class="afterSellService_list">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">售后列表</span>
            <img class="returnHome" @click="returnHomeHandle" src="../../assets/images/returnHome.png">
        </div>
        <div class="grayLine firstLine"></div>
        <div class="main">
            <ul class="main_ul"
                v-infinite-scroll="getRefundList"
                infinite-scroll-disabled="lastPage"
                infinite-scroll-distance="100"
            >
                <li v-for="(refundDetailItem,index) in refundDetailItems">
                    <div class="div1">
                        <div class="div_l">
                            <span class="word">售后单号:</span>
                            <span>{{ refundDetailItem.refundCode}}</span>
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==1 && refundDetailItem.refundStatue==0">
                            待审核
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==1 && refundDetailItem.refundStatue==2">
                            已拒绝
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==1 && refundDetailItem.refundStatue==5">
                            已退款
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==1 && refundDetailItem.refundStatue==6">
                            申退关闭
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==1 && refundDetailItem.refundStatue==7">
                            退款失败
                        </div>

                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==0">
                            待审核
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==1">
                            待买家退货
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==2">
                            已拒绝
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==3">
                            待处理
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==4">
                            待返货
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==5">
                            已退款
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==6">
                            申退关闭
                        </div>
                        <div class="div1_r" v-show="refundDetailItem.refundType==2 && refundDetailItem.refundStatue==7">
                            已返货
                        </div>

                    </div>
                    <div class="div2" @click="lookDetail(refundDetailItem.refundCode)">
                        <div class="div2_l">
                            <img :src=refundDetailItem.imgUrl alt="">
                        </div>
                        <div class="div2_r">
                            <div class="div2_r_1">
                                {{ refundDetailItem.pdName }}
                            </div>
                            <div class="div2_r_2 clearfix">
                                <ul class="specifications floatL">
                                    <li>
                                        <span>{{refundDetailItem.pdSpce}}</span>
                                        <!--<span class="sp1">{{ item.name }} : </span>-->
                                    </li>
                                </ul>
                                
                            </div>
                            <div class="div3_r1 clearfix">
                                <div class="floatL">￥{{ refundDetailItem.pdPrice}}</div>
                                <div class="floatR goodsNum">
                                    x{{ refundDetailItem.goodsNum}}
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    <div class="div3">
                        <div class="div3_l">
                            <span>申请时间 : </span>
                            <span>{{ refundDetailItem.createDateStr }}</span>
                        </div>
                        <div class="div3_r">
                            <span>退款金额 : </span>
                            <span>￥{{ refundDetailItem.refundMoney }}</span>
                        </div>
                    </div>
                    <div class="div4">
                        <div class="div_top">
                            <span class="type" v-show="refundDetailItem.refundType==2">退款退货</span>
                            <span class="type" v-show="refundDetailItem.refundType==1">退款</span>
                            <div class="btn_div">
                                <mt-button size="small" class="btn" @click="cancelApply(refundDetailItem.refundCode)" v-show="( refundDetailItem.refundType == 1 && ( refundDetailItem.refundStatue == 0 || refundDetailItem.refundStatue == 2 ) ) || ( ( refundDetailItem.refundType == 2 && ( refundDetailItem.refundStatue == 0 ||  refundDetailItem.refundStatue == 2 ||  refundDetailItem.refundStatue == 1 ) ) )">撤销申请</mt-button>
                                <mt-button size="small" class="btn" @click="lookDetail(refundDetailItem.refundCode)">查看详情</mt-button>
                                <mt-button size="small" class="btn" @click="goTodelivery(refundDetailItem.refundCode,refundDetailItem.orderItemId )" v-show="refundDetailItem.refundType == 2 && refundDetailItem.refundStatue == 1">去发货</mt-button>
                                <mt-button size="small" class="btn" @click="reviseApply(refundDetailItem.refundCode)" v-show="( ( refundDetailItem.refundType == 1) && ( refundDetailItem.refundStatue == 0 || refundDetailItem.refundStatue == 2 ) ) || (  (refundDetailItem.refundType == 2) && ( refundDetailItem.refundStatue == 0 || refundDetailItem.refundStatue == 2) )">修改申请</mt-button></div>
                        </div>
                    </div>
                    <div class="grayLine"></div>
                </li>
            </ul>
            <div  class="loadMore"  v-show="!lastPage">加载更多...</div>
            <div  v-show="lastPage==true" class="loadMore" style="background: #f4f4f4">
                <img src="../../assets/images/end-3x.png" style="vertical-align: middle;width: auto;height: 1.3rem">
            </div>
        </div>
        
    </div>
</template>

<style>
    .mint-msgbox{
        border-radius: 3%!important;
    }
    .mint-msgbox-message{
        font-size:1.5rem!important;
    }
    .mint-button{
        border: 0 !important;
      
    }
    .mint-button--default{
        box-shadow: none !important;
    }
</style>
<style scoped>
    .returnHome{
        float: right;
        margin-right:0.9rem;
        width:1.7rem;
    }
    .noData{
        padding-top: 6rem;
        font-size: 1.8rem;
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

    .firstLine{
        position: fixed;
        margin-top: 4.6rem;
        top: 0px;
        z-index: 11;
    }

    .afterSellService_list{
        width:100%;
        height:100%;
        background: rgb(244,244,244);
    }

    .afterSellService_list  .header{
        padding: 1.3rem 0;
        position: fixed;
        background: #fff;
        width:100%;
        z-index: 66;
        top: 0;
        border-bottom:1px solid #d6d6d6;
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
        margin-top: 5.6rem;
    }

    .afterSellService_list .main .main_ul li .div1{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: 1.5rem 0.8rem;
        font-size:1.3rem;
        color: #333;
        width:100%;
        background: #fff;
        border-bottom:1px solid #d6d6d6;
    }

    .afterSellService_list .main .main_ul li .div1 .word{
        margin-right:1rem;
    }

    .afterSellService_list .main .main_ul li .div1 .div1_r{
        color: #eb544d;
    }

    .afterSellService_list .main .main_ul li .div2{
        width:100%;
        background: #fff;
        padding: 0.7rem 0.8rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_l{
        width:11rem;
        height:11rem;
        margin-right:1rem;
    }

    .afterSellService_list .main .main_ul li .div2 .div2_r_1{
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

    .afterSellService_list .main .main_ul li .div2 .div2_r_2{
        font-size:1.2rem;
        text-align: left;
        margin-top: 1.5rem;
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

    .afterSellService_list .main .main_ul li .div2 .div3_r{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        font-size: 1.3rem;
        line-height: 1.3rem;
        margin-top: 1.2rem;
        text-align: right;
        display: block;
    }
    .div3_r1{
      /* display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center; */
      font-size: 1.4rem;
      line-height: 1.4rem;
      text-align: right;
      color:#eb544d;

    }
    .div3_r1 .goodsNum{
        color:#848484;
    }
    .div3_r2{
      float: right;
    }
    .afterSellService_list .main .main_ul li .div3{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: 1.5rem 0.8rem;
        font-size:1.2rem;
        background: #fff;
        border-top:1px solid #d6d6d6;
    }

    .afterSellService_list .main .main_ul li .div4{
        width:100%;
        border-top: 1px solid #D8D9DB;
        background: #fff;
    }

    .afterSellService_list .main .main_ul li .div4 .div_top{
        width:100%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding: 0.6rem 0.8rem;
        font-size:1.3rem;
        color: #333;
    }

    .afterSellService_list .main .main_ul li .div4 .div_top .btn_div .btn{
        /* width:7.5rem; */
        height:2.7rem;
        font-size:1.3rem;
        color: #000;
        background: #fff;
        border: 1px solid #333 !important;
        box-shadow: 0 !important;
        margin:0;
    }

    .afterSellService_list .main .main_ul li .div4 .div_top .type{
        color: #000;
    }

    .loadMore{
        height: 4.5rem;
        line-height: 4.5rem;
        font-size: 1.2rem;
    }

    .afterSellService_list .popup{
        width:100%;
        height:100rem;
        background: #7A7A7A;
        position: fixed;
        top:0;
        z-index:99;
        opacity:0.5;
    }

    .afterSellService_list  .alertWindow{
        width:75%;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top:-5.3rem;
        margin-left:-37.5%;
        z-index:111;
    }

    .afterSellService_list  .alertWindow{
        background: #fff;
        border-radius: 2%;
    }

    .afterSellService_list  .alertWindow_ul .li1 .title{
        font-size: 1.8rem;
        color:#000;
        margin: 1.9rem 0 1.9rem 0;
        font-weight: bolder;
    }

    .afterSellService_list  .alertWindow_ul .li2{
        font-size: 1.5rem;
        color:#333;
        line-height: 2rem;
        width:21rem;
        margin: 0 auto;
    }

    .afterSellService_list  .alertWindow_ul .li3{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        height:5em;
        line-height:5rem;
        border-top:1px solid #D8D9DB;
        margin-top: 1rem;
    }

    .afterSellService_list  .alertWindow_ul .li3 .cancel{
        font-size:1.8rem;
        color: #999;
        width:50%;
        border-right:1px solid #D8D9DB;
    }

    .afterSellService_list  .alertWindow_ul .li3 .addAddress{
        font-size:1.8rem;
        color: #f9be00;
        width:50%;
    }

</style>

<script>
    import Vue from 'vue'
    import { Toast } from 'mint-ui'
    import { MessageBox } from 'mint-ui'
    import { InfiniteScroll } from 'mint-ui';
    Vue.use(InfiniteScroll);
    export default{
        name: 'afterSellService_list',
        data(){
            return{
               pageNo : 0,
               pageSize: 6,
                refundDetailItems: [],
                params: '',
                refundCode: '',
                loginCode: '',
                lastPage: false
            }
        },
        mounted(){
        //   this.getRefundList()

        },
        methods: {
            //返回
            returnBack(){
                // window.history.back()
                this.$router.push({path:"myIndex"})
            },

            //请求申退列表
            getRefundList(){
                this.pageNo = this.pageNo + 1
                this.loginCode = window.localStorage.getItem('loginCode')
                let url = HOST_HDPORDERS + '/order/front/refundPage?pageSize=6&pageNo='+this.pageNo
                
                this.$api_post({
                    url:url,
                    data:{}
                }).then(res=>{
                    if( res.code == 200 ){
                        
                        if( res.page.lastPage == false ){
                            this.refundDetailItems = this.refundDetailItems.concat( res.list )
                        }else{
                          this.refundDetailItems = this.refundDetailItems.concat( res.list )
                            // this.refundDetailItems = response.body.list 
                        }
                        for( var i = 0; i < res.list.length; i++ ){
                            if(res.list[i].imgUrl){
                                res.list[i].imgUrl =  res.list[i].imgUrl.split(',')[0]
                            }else{

                            }
                            // res.list[i].imgUrl =  res.list[i].imgUrl.split(',')[0]
                        }
                        this.lastPage = res.page.lastPage
                        // console.log(this.refundDetailItems)
                    }else if(res.code == -1  ){
                        let url = HOST_HDPUSER+'/user/isLogin';
                        this.loginCode= window.localStorage.getItem('loginCode')
                        this.userId= window.localStorage.getItem('userId')
                        this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                            if (response.status == 200) {
                                if(response.data.code<0){
                                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                }
                            }
                        })
                    }else{
                        Toast({
                            message: res.msg,
                            position: 'center',
                            duration: 3000
                        })
                    }
                })
            },

            //查看详情
            lookDetail(refundCode){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'afterSellService_detail?refundCode='+refundCode;
            },

            //撤销订单
            cancelApply(refundCode){
                MessageBox.confirm('确定要撤销申请吗?').then(action => {
                    let url = HOST_HDPORDERS + '/order/front/cancelRefund/'
                    this.$resource(url).get({ id: refundCode }).then((response) => {
                        if( response.status == 200 ){
                            if( response.body.code == 200 ){
                                this.getRefundList()
                                window.location.reload()
                            }else {
                                MessageBox('提示', response.body.msg );
                            }
                        }
                    })
                },function () {
                })
            },

            //买家去发货
            goTodelivery( refundCode,orderItemId ){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'logistics_info?refundCode='+refundCode+'&orderItemId='+orderItemId;
            },

            //买家修改申退
            reviseApply( refundCode ){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'revise_apply?refundCode='+refundCode;;
            },
            returnHomeHandle(){
                this.$router.push({path:"found_index"})
            }
        }
    }
</script>
