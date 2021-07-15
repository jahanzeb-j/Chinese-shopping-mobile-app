<template>
    <div class="order_all">

      <div v-if="noData==3" >
        <div class="order_all_img clearfix">
          <!-- <span v-show="actionClass == 4">全部订单</span>
          <span v-show="actionClass == 1">待支付</span>
          <span v-show="actionClass == 2">待发货</span>
          <span v-show="actionClass == 3">待收货</span>
          <span v-show="actionClass == 10">待评价</span> -->
          <span>订单列表</span>
          <img @click="back()" class="returnLogo" src="../../assets/images/returnFront.png" >
          <img  @click="returnHomeHandle" class="returnHome"  src="../../assets/images/returnHome.png">
        </div>
        <nav class="scroll">
          <a v-for="(item,index) in navList" :key="index" @click="switchStatus(index)" :class="{active: activeIndex == index}">{{item.organStatusTxt}}</a>
        </nav>
        <div class="order_all_line1"></div>
        <div class="noData">暂无数据...</div>
      </div>
      <div v-if="noData==1">
        <div class="order_all_img clearfix">
          <!-- <span v-show="actionClass == 4">全部订单</span>
          <span v-show="actionClass == 1">待支付</span>
          <span v-show="actionClass == 2">待发货</span>
          <span v-show="actionClass == 3">待收货</span>
          <span v-show="actionClass == 10">待评价</span> -->
          <span>订单列表</span>
          <img @click="back()"class="returnLogo" src="../../assets/images/returnFront.png" >
          <img @click="returnHomeHandle" class="returnHome" src="../../assets/images/returnHome.png">
        </div>
        <nav class="scroll">
          <a v-for="(item,index) in navList" :key="index" @click="switchStatus(index)" :class="{active: activeIndex == index}">{{item.organStatusTxt}}</a>
        </nav>
        <div class="order_all_line1"></div>
        <div  
            v-infinite-scroll="getOrderList"
            infinite-scroll-disabled="lastPage"
            infinite-scroll-distance="100"
            
        >
            <div class="order_one" v-for="(checkb,index) in allList1" >
              <div v-show="activeIndex == 0">
                <div class="all clearfix">
                  <div class="all_o1">订单号：</div>
                  <div class="all_o1">{{checkb.id}}</div>
                  <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
                  <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == 11">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
                  <div class="all_o3" v-show="checkb.organStatus == -2">交易关闭</div>
                </div>
                <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items" @click="details(index)">
                  <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
                  <div class="goods_name floatL">
                    <div class="goods_word">{{checkb1.pdName}}</div>
                    <div class="goods_nature clearfix">
                      <span v-show="space" class="floatL">{{checkb1.pdSpce}}</span>
                    </div>
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                  </div>
                  <!-- <div class="goods_detail floatR">
                    
                  
                  </div> -->
                </div>
                <div class="allMoney clearfix">
                  <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
                  <div class="all_o4">{{checkb.actualMoney}}</div>
                  <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
                </div>
                <div class="operation clearfix" v-show="checkb.organStatus != -1">
                  <span  class="floatL cancelBtn" v-show="checkb.organStatus == 1">
                    <strong>{{checkb.lastTimeStr}}</strong>后自动取消订单
                  </span>
                  <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1" @click="pay4(index)">去付款</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 1" @click="delete1(index)">取消订单</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3 && checkb.packageId == null" @click="details(index)">确认收货</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3 && checkb.packageId != null" @click="detailsOne(checkb.packageId,index)">确认收货</div>
                  <div class="operation_button floatR evaluateBtn" v-show="checkb.organStatus == 10" @click="assess(checkb.organStatus,index)">去评价</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 11" @click="assess(checkb.organStatus,index)">已评价</div>
                  <!-- <div class="operation_button floatR" @click="details(index)">详情</div> -->
                </div>
                <div class="order_all_line"></div>
              </div>
              <div v-show=" activeIndex == 1">
                <div class="all clearfix">
                  <div class="all_o1">订单号：</div>
                  <div class="all_o1">{{checkb.id}}</div>
                  <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
                  <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
                </div>
                <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items" @click="details(index)" >
                  <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
                  <div class="goods_name floatL">
                    <div class="goods_word">{{checkb1.pdName}}</div>
                    <div class="goods_nature clearfix">
                      <span class="floatL">{{checkb1.pdSpce}}</span>
                    </div>
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                    
                  </div>
                  
                </div>

                <div class="allMoney clearfix">
                  <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
                  <div class="all_o4">{{checkb.actualMoney}}</div>
                  <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
                </div>
                <div class="operation clearfix">
                  <span  class="floatL cancelBtn" v-show="checkb.organStatus == 1">
                    <strong v-cloak>{{checkb.lastTimeStr}}</strong>后自动取消订单
                  </span>
                  <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1" @click="pay1(index)">去付款</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 1" @click="delete1(index)">取消订单</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3" @click="details(index)">确认收货</div>
                  <!-- <div class="operation_button floatR" @click="details(index)">详情</div> -->
                </div>
                <div class="order_all_line"></div>
              </div>
              <div v-show=" activeIndex == 2">
                <div class="all clearfix">
                  <div class="all_o1">订单号：</div>
                  <div class="all_o1">{{checkb.id}}</div>
                  <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
                  <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
                </div>
                <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items" @click="details(index)">
                  <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
                  <div class="goods_name floatL">
                    <div class="goods_word">{{checkb1.pdName}}</div>
                    <div class="goods_nature clearfix">
                      <span class="floatL">{{checkb1.pdSpce}}</span>
                    </div>
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                    
                  </div>
                  
                </div>
                <div class="allMoney clearfix" >
                  <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
                  <div class="all_o4">{{checkb.actualMoney}}</div>
                  <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
                </div>
                <div class="operation clearfix" v-show="checkb.organStatus != 2">
                  <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1" @click="pay(index)">去付款<span>（23:11:34）</span></div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 1" @click="delete1(index)">取消订单</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3" @click="details(index)">确认收货</div>
                  <!-- <div class="operation_button floatR" @click="details(index)">详情</div> -->
                </div>
                <div class="order_all_line"></div>
              </div>
              <div v-show=" activeIndex == 3">
                <div class="all clearfix">
                  <div class="all_o1">订单号：</div>
                  <div class="all_o1">{{checkb.id}}</div>
                  <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
                  <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == 11">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
                </div>
                <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items" @click="details(index)">
                  <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
                  <div class="goods_name floatL">
                    <div class="goods_word">{{checkb1.pdName}}</div>
                    <div class="goods_nature clearfix">
                      <span class="floatL">{{checkb1.pdSpce}}</span>
                    </div>
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                  </div>
                  
                </div>
                <div class="allMoney clearfix">
                  <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
                  <div class="all_o4">{{checkb.actualMoney}}</div>
                  <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
                </div>
                <div class="operation clearfix">
                  <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1" @click="pay(index)">去付款<span>（23:11:34）</span></div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 1" @click="delete1(index)">取消订单</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3 && checkb.packageId == null" @click="details(index)">确认收货</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3 && checkb.packageId != null "  @click="detailsOne(checkb.packageId,index)">确认收货</div>
                <!--  <div class="operation_button floatR" @click="details(index)">详情</div> -->
                </div>
                <div class="order_all_line"></div>
              </div>
              <div v-show=" activeIndex == 4">
                <div class="all clearfix">
                  <div class="all_o1">订单号：</div>
                  <div class="all_o1">{{checkb.id}}</div>
                  <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
                  <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
                  <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == 11">交易完成</div>
                  <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
                </div>
                <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items" @click="details(index)">
                  <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
                  <div class="goods_name floatL">
                    <div class="goods_word">{{checkb1.pdName}}</div>
                    <div class="goods_nature clearfix">
                      <span class="floatL">{{checkb1.pdSpce}}</span>
                    </div>
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                  </div>
                  
                </div>
                <div class="allMoney clearfix">
                  <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
                  <div class="all_o4">{{checkb.actualMoney}}</div>
                  <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
                </div>
                <div class="operation clearfix">
                  <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1" @click="pay(index)">去付款<span>（23:11:34）</span></div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 1" @click="delete1(index)">取消订单</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 3" @click="details(index)">确认收货</div>
                  <div class="operation_button floatR" v-show="checkb.organStatus == 10" @click="assess(checkb.organStatus,index)">去评价</div>
                  <div class="operation_button floatR  evaluateBtn" v-show="checkb.organStatus == 11" @click="assess(checkb.organStatus,index)">已评价</div>
                  <!-- <div class="operation_button floatR" @click="details(index)">详情</div> -->
                </div>
                <div class="order_all_line"></div>
              </div>
            </div>
            <div class="no_more" v-show="moreList == 1">加载更多</div>
            <div v-show=" moreList == 3 && this.allList1.length>2 " class="no_more"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
        </div>
       
      </div>
    </div>
</template>
<style scoped>
  [v-cloak] {
    display: none;
  }
  .navOrderList{
    font-size:1.3rem;
    height:3.6rem;
    line-height:3.6rem;
    color:#333333;
    margin-top:4rem;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    flex-direction:row;
    justify-content:space-around;
  }
  .scroll{
    position: fixed;
    top:4rem;
    font-size:1.3rem;
    height: 3.6rem;
    line-height:3.6rem;
    width:100%;
    z-index: 1112;
    background:#fff;
    border-bottom: 1px solid #d6d6d6;
    margin-top:0;
    left:0;
    color:#333333;
  }
  
  .scroll a{
    display: inline-block;
    padding: 0 1.5rem;
    color:#333333;
  }
  .scroll a.active{
    color:#ec5f59;
    border-bottom:0.2rem solid #ec5f59;
  }
  .goods_name{
    width:22rem;
    margin-left:2rem;
  }
  .cancelBtn{
    font-size: 1.2rem;
    height:2.9rem;
    line-height:2.9rem;
  }
  .cancelBtn strong{
    color:#ff4444;
  }
  .noData{
    padding-top: 6rem;
    font-size: 1.8rem;
  }
  .no_more{
    width:100%;
    height:3.6rem;
    line-height: 2.6rem;
    background:#f4f4f4;
    font-size:1.2rem;
    color:#555555;
    letter-spacing: 2px;
  }
  .order_all{
    width:100%;
    height:100%;
    background:#fff;
  }
  .order_all_img{
    position: fixed;
    top: 0;
    z-index: 1111;
    background: #fff;
    width:100%;
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #d6d6d6;
  }
  .order_all_img .returnLogo{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
  }
  .order_all_img .returnHome{
    width:1.7rem;
    height:1.75rem;
    position: absolute;
    right:0.8rem;
    top:1.3rem;
  }
  .order_all_line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .order_all_line1{
    margin-top: 7.61rem;
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .all{
    padding: 0 0.8rem;
    width: 100%;
    background-color: #fff;
    border-bottom:1px solid #d6d6d6;
  }
  .allMoney{
    padding: 0 2.6%;
    width: 100%;
   /*  border-top: 1px solid #d6d6d6; */
   /*  border-bottom: 1px solid #d6d6d6; */
  }
  .all_o1{
    float: left;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
  }
  .all_o2{
    float: right;
    font-size: 1.2rem;
    height: 4rem;
    line-height: 4rem;
  }
  .all_o4{
    float: right;
    font-size: 1.4rem;
    height: 4rem;
    line-height: 4rem;
    font-weight: bold;
  }
  .all_o3{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
    color: #eb544d;
  }
  .operation{
    padding: 0.7rem 0.8rem;
    width: 100%;
    border-top:1px solid #d6d6d6;

  }
  .operation_button{
    height: 2.9rem;
    line-height: 2.9rem;
    color: #333;
    font-size: 1.3rem;
    text-align: center;
    border-radius: 0.4rem;
    border: 1px solid #acacac;
    width: 7.4rem;
    margin-left: 0.7rem;
  }
  .evaluateBtn{
    color:#ff4444;
    border:1px solid #ff4444;
  }
  .operation_button1{
    /* width: 12.5rem; */
    color:#ff4444;
    border:1px solid #ff4444;
  }
  .operation_button1 span{
    color: #f9be00;
  }
  .goods{
    width: 100%;
    padding: 0.8rem 0.8rem;
    background: #fff;
    margin-bottom: 0.5rem;
    border-bottom:1px solid #d6d6d6;
  }
  .goods_img{
    width:11rem;
    height:11rem;
  }
  .goods_img img{
    width: 100%;
    height: 100%;
    margin-right: 1.5rem;
  }
  .goods_word{
    width: 100%;
    font-size: 1.3rem;
    height: 3rem;
    line-height: 1.5rem;
    text-align: left;
    margin-top: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
     white-space: normal;
    word-break: break-all;
  }
  .goods_nature {
    margin-top: 1.5rem;
    text-align: left;
  }
  .goods_nature span{
    color: #868686;
    font-size: 1.2rem;
  }
  .goods_nature .goods_nature1{
    margin: 0 2rem 0 0.5rem;
  }
  .order_male{
    line-height: 3rem;
    /*text-align: left;*/
    font-size: 1.4rem;
    margin-top:1rem;
    color:#eb544d;
  }
  .order_detailNumber{
    color: #868686;
    font-size: 1.2rem;
   /*  margin-top: 2rem; */
    text-align: right;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
<script>
  import Vue from 'vue'
  import { Toast } from 'mint-ui';
  import { Loadmore } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  import {api_post} from  '../../util/api.js'
  Vue.use(InfiniteScroll)
  export default {
    name: 'order_all',
    data () {
      return {
        loginCode:"",
        someNumber:1,
        allList1:[],
        // actionClass:'',
        moreList:2,
        time: [],
        space:true,
        allTime:[],
        orderDetail:{
          days:'',
          hours:'',
          mins:'',
          secs:'',
        },
        orderDetailArray:[],
        countdownTimer:'',  //倒计时timer
        urlParams: '',
        urlParamsIndex: '',
        urlRemain: '',
        noData:'',
        lastPage:false,
        navList:[
          {
            organStatusTxt:"全部",
            organStatus:''
          },
          {
            organStatusTxt:"待付款",
            organStatus:1
          },
          {
            organStatusTxt:"待发货",
            organStatus:2
          },
          {
            organStatusTxt:"待收货",
            organStatus:3
          },
          {
            organStatusTxt:"待评价",
            organStatus:10
          },
        ],
        activeIndex:0,
        
        // showHead:true
      }
    },
    mounted () {
      this.activeIndex=this.$route.query.activeIndex||0
      this.getOrderList(this.activeIndex)
      this.getList();
      localStorage.setItem('payRedirct',1)
    },
    methods:{
      goodsDetails: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+'&'+this.urlRemain+"&order_all=1";
      },
      goodsDetails1: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+'&'+this.urlRemain+"&order_all=1";
      },
      goodsDetails2: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+'&'+this.urlRemain+"&order_all=1";
      },
      goodsDetails3: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+'&'+this.urlRemain+"&order_all=1";
      },
      goodsDetails10: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+'&'+this.urlRemain+"&order_all=1";
      },
      details1: function (index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+this.allList1.notPayList[index3].pdId+"&order_details=1";
      },
      getList:function() {
        this.urlParams = window.location.href; //获取url中"?"符后的字串
        this.urlParamsIndex = this.urlParams.indexOf('?')
        this.urlRemain = this.urlParams.substring(this.urlParamsIndex+1,this.urlParams.length+1)
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != ""){
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {  
            if (response.status == 200) {
              if(response.data.code<0){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
              }else{

              }
            }
          })
        }
      },
     /*  allList: function () {

        this.actionClass = this.$route.query.actionClass;

        //        全部订单
        if(this.actionClass == 4){

          let url =HOST_ORDERS + '/order/front/orderPage/';
          this.loginCode= window.localStorage.getItem('loginCode')
          if(this.loginCode != ""){

            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                
              return response
            });
          });
            //添加header
            this.$resource(url).save({pageSize:6,pageNo:this.someNumber}).then((response) => {
              if(response.data.list.length==0){
              this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.data.code == 200) {
                for(var i=0; i<response.data.list.length;i++){
                  for(var j=0; j<response.data.list[i].items.length;j++){
                    if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null){
                    if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                      response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                    }
                    }
                  }
                }
                this.someNumber = this.someNumber + 1;
                this.lastPage=response.data.page.lastPage
                if(response.data.page.lastPage==false){
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 1
                  
                }
                else{
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 3
                }
                for(let i = 0;i<this.allList1.length;i++){
                  for(let j = 0;j<this.allList1[i].items.length;j++) {
                    if (this.allList1[i].items[j].pdSpce.indexOf('{') != -1) {
                      this.allList1[i].items[j].pdSpce = eval(this.allList1[i].items[j].pdSpce);
                    }
                  }
                }
                this.countTime();
              }else{
                Toast({
                  message: response.data.msg,
                  position: 'center',
                  duration: 3000
                });
              }
            })
          }
        }
        //        全部订单
        //        待支付
        if(this.actionClass == 1){
          let url =HOST_ORDERS + '/order/front/orderPage/';
          this.loginCode= window.localStorage.getItem('loginCode')
          if(this.loginCode != ""){
            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                return response
              });
            });
            //添加header
            this.$resource(url).save({pageSize:6,pageNo:this.someNumber,organStatus:1}).then((response) => {
              if(response.data.code == 200){
                  if(response.data.list.length==0){
                  this.noData = 3;
                  }else{
                    this.noData = 1;
                  }
                  for(var i=0; i<response.data.list.length;i++){
                    for(var j=0; j<response.data.list[i].items.length;j++){
                      if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null) {
                        if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                          response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                        }
                      }
                    }
                  }
                this.someNumber = this.someNumber + 1;
                this.lastPage=response.data.page.lastPage
                if(response.data.page.lastPage==false){
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 1
                }
                else{
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 3
                }

                for(let i = 0;i<this.allList1.length;i++){

                  for(let j = 0;j<this.allList1[i].items.length;j++) {
                    if (this.allList1[i].items[j].pdSpce.indexOf('{') != -1) {
                      this.allList1[i].items[j].pdSpce = eval(this.allList1[i].items[j].pdSpce);
                    }
                  }
                }
                this.countTime();
              }else{
                Toast({
                  message: response.data.msg,
                  position: 'center',
                  duration: 3000
                });
              }
            })


          }
        }
        //        待支付
        //        待发货
        if(this.actionClass == 2){
          let url =HOST_ORDERS + '/order/front/mainOrderPage';
          this.loginCode= window.localStorage.getItem('loginCode')
          if(this.loginCode != ""){
            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                // console.log(response.status)
                return response
              });
            });
            //添加header
            this.$resource(url).save({pageSize:6,pageNo:this.someNumber,organStatus:2}).then((response) => {
              if(response.data.list.length==0){
                this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.data.code == 200) {
                  for(var i=0; i<response.data.list.length;i++){
                    for(var j=0; j<response.data.list[i].items.length;j++){
                      if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null) {
                        if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                          response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                        }
                      }
                    }
                  }
                  this.someNumber = this.someNumber + 1;
                  this.lastPage=response.data.page.lastPage
                  if(response.data.page.lastPage==false){
                    this.allList1 = this.allList1.concat(response.data.list);
                    this.moreList = 1
                  }
                  else{
                    this.allList1 = this.allList1.concat(response.data.list);
                    this.moreList = 3
                  }
                  for(let i = 0;i<this.allList1.length;i++){
                    for(let j = 0;j<this.allList1[i].items.length;j++){
                    }
                  }
              }else {
                  Toast({
                    message: response.data.msg,
                    position: 'center',
                    duration: 3000
                  });
              }
            })
          }
        }
        //        待发货
        //        待收货
        if(this.actionClass == 3){
          let url =HOST_ORDERS + '/order/front/mainOrderPage';
          this.loginCode= window.localStorage.getItem('loginCode')
          if(this.loginCode != ""){
            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                return response
              });
            });
            //添加header
            this.$resource(url).save({pageSize:6,pageNo:this.someNumber,organStatus:3}).then((response) => {
              if(response.data.list.length==0){
                this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.data.code == 200) {
                  for(var i=0; i<response.data.list.length;i++){
                    for(var j=0; j<response.data.list[i].items.length;j++){
                      if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null) {
                        if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                          response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                        }
                      }
                    }
                  }
                  this.someNumber = this.someNumber + 1;
                  this.lastPage=response.data.page.lastPage
                  if(response.data.page.lastPage==false){
                    this.allList1 = this.allList1.concat(response.data.list);
                    this.moreList = 1
                  }
                  else{
                    this.allList1 = this.allList1.concat(response.data.list);
                    this.moreList = 3
                  }
                  for(let i = 0;i<this.allList1.length;i++){
                    for(let j = 0;j<this.allList1[i].items.length;j++){

                    }
                  }
              }else{
                  Toast({
                    message: response.data.msg,
                    position: 'center',
                    duration: 3000
                  });
              }
            })
          }
        }
        //        待收货
        //        待评价
        if(this.actionClass == 10){
          let url =HOST_ORDERS + '/order/front/mainOrderPage';
          this.loginCode= window.localStorage.getItem('loginCode')
          if(this.loginCode != ""){
            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                // console.log(response.status)
                return response
              });
            });
            //添加header
            this.$resource(url).save({pageSize:6,pageNo:this.someNumber,organStatus:10}).then((response) => {
              if(response.data.list.length==0){
              this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.data.code == 200) {
                for(var i=0; i<response.data.list.length;i++){
                  for(var j=0; j<response.data.list[i].items.length;j++){
                    if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null) {
                      if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                        response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                      }
                    }
                  }
                }
                this.someNumber = this.someNumber + 1;
                this.lastPage=response.data.page.lastPage
                if(response.data.page.lastPage==false){
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 1
                }
                else{
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 3
                }
                for(let i = 0;i<this.allList1.length;i++){
                  for(let j = 0;j<this.allList1[i].items.length;j++){

                  }
                }
              }else{
                  Toast({
                    message: response.data.msg,
                    position: 'center',
                    duration: 3000
                  });
              }
            })
          }
        }
        //        待评价
        //        倒计时

      }, */
      getOrderList(index){
        index =index || this.activeIndex || 0
        let url;
        if(index == 0 || index == 1 ){
           url =HOST_ORDERS + '/order/front/orderPage/';
        }else{
           url =HOST_ORDERS + '/order/front/mainOrderPage';
        }
        let params={
          pageSize:6,
          pageNo:this.someNumber,
          organStatus:this.navList[index].organStatus
        }
        this.loginCode= window.localStorage.getItem('loginCode')
        /* if(this.loginCode != ""){
            //添加header
            Vue.http.interceptors.push((request, next)  =>{
              request.headers.set('loginCode', this.loginCode);
              next((response) => {
                // console.log(response.status)
                return response
              });
            });
            //添加header
            this.$resource(url).save(params).then((response) => {
              if(response.data.list.length==0){
                this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.data.code == 200) {
                for(var i=0; i<response.data.list.length;i++){
                  for(var j=0; j<response.data.list[i].items.length;j++){
                    if(response.data.list[i].items[j].imgUrl !="" && response.data.list[i].items[j].imgUrl !=null) {
                      if (response.data.list[i].items[j].imgUrl.indexOf(',') != -1) {
                        response.data.list[i].items[j].imgUrl = response.data.list[i].items[j].imgUrl.substring(0, response.data.list[i].items[j].imgUrl.indexOf(','))
                      }
                    }
                  }
                }
                this.someNumber = this.someNumber + 1;
                this.lastPage=response.data.page.lastPage
                if(response.data.page.lastPage==false){
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 1
                }
                else{
                  this.allList1 = this.allList1.concat(response.data.list);
                  this.moreList = 3
                }
                if(this.navList[index].organStatus == '' || this.navList[index].organStatus == '1'){
                   this.countTime()
                }
                
                
              }else{
                  Toast({
                    message: response.data.msg,
                    position: 'center',
                    duration: 3000
                  });
              }
            })
        } */
        api_post({
          url:url,
          data:{
            pageSize:6,
            pageNo:this.someNumber,
            organStatus:this.navList[index].organStatus
          }
        }).then( response =>{
            // console.log(response)
             if(response.list.length==0){
                this.noData = 3;
              }else{
                this.noData = 1;
              }
              if (response.code == 200) {
                for(var i=0; i<response.list.length;i++){
                  for(var j=0; j<response.list[i].items.length;j++){
                    if(response.list[i].items[j].imgUrl !="" && response.list[i].items[j].imgUrl !=null) {
                      if (response.list[i].items[j].imgUrl.indexOf(',') != -1) {
                        response.list[i].items[j].imgUrl = response.list[i].items[j].imgUrl.substring(0, response.list[i].items[j].imgUrl.indexOf(','))
                      }
                    }
                  }
                }
                this.someNumber = this.someNumber + 1;
                this.lastPage=response.page.lastPage
                if(response.page.lastPage==false){
                  this.allList1 = this.allList1.concat(response.list);
                  this.moreList = 1
                }
                else{
                  this.allList1 = this.allList1.concat(response.list);
                  this.moreList = 3
                }

                console.log(this.allList1, 'allList1-------')
                if(this.navList[index].organStatus == '' || this.navList[index].organStatus == '1'){
                   this.countTime()
                }
                
                
              }else{
                  Toast({
                    message: response.msg,
                    position: 'center',
                    duration: 3000
                  });
              }
        })
        


      },
      switchStatus(index){
        //  this.showHead=true
        //  document.documentElement.scrollTop=0
         this.activeIndex=index
         this.$route.query.activeIndex=index
         this.someNumber=1
         this.allList1=[]
         this.getOrderList(this.activeIndex)
      },


      countTime:function() {
        clearInterval(this.countdownTimer);
        for (var i = 0, len = this.allList1.length; i < len; i++) {
          var lastTime = this.allList1[i].lastTime;
          var day = Math.floor(lastTime / 1000 / 60 / 60 / 24);
          var hour = Math.floor(lastTime / 1000 / 60 / 60 % 24);
          var min = Math.floor(lastTime / 1000 / 60 % 60);
          var sec = Math.floor(lastTime / 1000 % 60);
          this.$set(this.allList1[i], 'day', day);
          this.$set(this.allList1[i], 'hour', hour);
          this.$set(this.allList1[i], 'min', min);
          this.$set(this.allList1[i], 'sec', sec);
        }
        var that = this;
        this.countdownTimer = setInterval(function () {
          for (var i = 0, len = that.allList1.length; i < len; i++) {
            var str = '';
            that.allList1[i].sec--;
            if (that.allList1[i].sec < 0) {
              that.allList1[i].sec = 59;
              that.allList1[i].min--;
              if (that.allList1[i].min < 0) {
                that.allList1[i].min = 59;
                that.allList1[i].hour--;
                if (that.allList1[i].hour < 0) {
                  that.allList1[i].hour = 23;
                  that.allList1[i].day--;
                  if (that.allList1[i].day < 0) {
                    that.allList1[i].day = 0;
                    that.allList1[i].hour = 0;
                    that.allList1[i].min = 0;
                    that.allList1[i].sec = 0;
                  }
                }
              }
            }
            str = that.addZero(that.allList1[i].hour) + ":" + that.addZero(that.allList1[i].min) + ":" + that.addZero(that.allList1[i].sec);
            that.$set(that.allList1[i], 'lastTimeStr', str);
          }
        }, 1000);
        },
        addZero(val) {
          if(val < 10) {
            val = '0' + val;
          }
          return val;
        },

      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
      },
      //多个包裹确认收货按钮
      details: function (index) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_details?idDetail="+this.allList1[index].id+"&typeDetail="+this.allList1[index].type+"&activeIndex="+this.$route.query.activeIndex;
      },
      //单个包裹确认收货按钮
      detailsOne: function (packageId,index) {
        MessageBox.confirm('是否确认收货？').then(action => {
          let url =HOST_ORDERS + '/order/front/affirmReceiveByPackage';
        this.loginCode = window.localStorage.getItem('loginCode')
        Vue.http.options.headers = {
          'loginCode':this.loginCode
        }
        if(this.loginCode != ""){
          this.$resource(url).get({id:packageId}).then((response) => {
            if (response.status == 200) {
            window.location.reload()
          }
        })
        }

      });
      },
      assess: function (AssessStatus,index) {
        window.localStorage.setItem('goodAssess',JSON.stringify(this.allList1[index].items));
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "assess?idDetail="+this.allList1[index].id+"&typeDetail="+this.allList1[index].type+"&assessName="+AssessStatus;

      },
      pay1: function (index) {
        let cur = this.allList1[index]
        localStorage.setItem('payParams','lastTime='+ cur.lastTime+'&orderCode='+ cur.orderCode+'&totalMoney='+cur.actualMoney+"&activeIndex=1"+'&order_all=1')

        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "first_pay?totalMoney="+cur.actualMoney+"&lastTime="+cur.lastTime+"&orderCode="+cur.orderCode+"&activeIndex=1"+'&order_all=1'
      },
      pay4: function (index) {

       let cur = this.allList1[index]
        localStorage.setItem('payParams','lastTime='+ cur.lastTime+'&orderCode='+ cur.orderCode+'&totalMoney='+cur.actualMoney+"&activeIndex=0"+'&order_all=1'+'&key1=123')

        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "first_pay?totalMoney="+cur.actualMoney+"&lastTime="+cur.lastTime+"&orderCode="+cur.orderCode+"&activeIndex=0"+'&order_all=1'+'&key1=123'
      },
      delete1: function (index) {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true,
          showConfirmButton:true
        });
        MessageBox.confirm('确定执行此操作?').then(action => {
          let url = HOST_ORDERS+'/order/front/cancelOrder/';
        if(this.loginCode != ""){
          this.$resource(url).get({id:this.allList1[index].id}).then((response) => {
            if (response.status == 200) {
            window.location.reload()
            if(response.data.code == -2){
            }
          }else{
            Toast({
              message: "订单状态不正确",
              duration: 3000,
              className: "toast"
            });
          }
        })
        }
      });

      },
      sureGet:function (index){
        MessageBox.confirm('是否确认收货？').then(action => {
          let url =HOST_ORDERS + '/order/front/affirmReceiveByPackage';
        this.loginCode = window.localStorage.getItem('loginCode')
        Vue.http.options.headers = {
          'loginCode':this.loginCode
        }
        if(this.loginCode != ""){
          this.$resource(url).get({id:this.allList1.packageEntityList[index].id}).then((response) => {
            if (response.status == 200) {
            window.location.reload()
          }
        })
        }
      });
      },
      
      returnHomeHandle(){
         this.$router.push({path:"found_index"})
      }

    }
  }
</script>
