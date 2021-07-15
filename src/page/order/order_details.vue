<template>
  <div class="order_details">
    <div class="order_details_img clearfix">
      订单详情
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    
    <!-- <div class="order_details_line"></div> -->
    
    <div class="order_one" style="margin-top:4rem;">
      <div class="orderBk"></div>
      <div class="all clearfix border1">
        <div class="all_o1">订单号：</div>
        <div class="all_o1">{{allList1.id}}</div>
        <div class="all_o3" v-show="allList1.organStatus == 1">待付款</div>
        <div class="all_o3" v-show="allList1.organStatus == 2">待发货</div>
        <div class="all_o3" v-show="allList1.organStatus == 3">待收货</div>
        <div class="all_o3" v-show="allList1.organStatus == 10">交易完成</div>
        <div class="all_o3" v-show="allList1.organStatus == 11">交易完成</div>
        <div class="all_o3" v-show="allList1.organStatus == -1">交易取消</div>
        <div class="all_o3" v-show="allList1.organStatus == -2">交易取消</div>
      </div>
      
      <div class="order_details_line1"></div>
      
      <div class="clearfix addressBox">
        <div class="floatL addressLogo" style="width:15%"><img src="../../assets/images/address1.png"/><span class="addrssText">[地址]</span></div>
        <div class="floatL" style="width:85%">
          <div class="all clearfix " style="color:#333333">
            <div class="all_o7 floatL" > <!-- <img @click="back()" src="../../assets/images/iconPerson.png" > -->{{allList1.receiveUsername}}</div>
            <div class="all_o6 floatL" style="margin-left:2.9rem;">{{allList1.receiveTel}}</div>
          </div>
          <div class="all clearfix">
            <div class="all_o8"><!--  <img @click="back()" src="../../assets/images/mapicon.png" > -->{{allList1.receiveAddress}}</div>
          </div>
        </div>
        
      </div>
      <div class="order_details_line1"></div>
      <div v-show="allList1.packageEntityList !='' && allList1.packageEntityList != null " v-for="(checkb,index) in allList1.packageEntityList">
            <div class="all clearfix sendStatus">
              <div class="all_o1">包裹{{index+1}}</div>
              <div class="all_o5" v-show="checkb.status == 2" style="color:#ff4444;">待收货</div>
              <div class="all_o5" v-show="checkb.status == 3" style="color:#ff4444;">已收货</div>
            </div>
            <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items">
              <div class="goods_img floatL" @click="details(checkb1.pdId,index1)"><img :src="checkb1.imgUrl" ></div>
              <div class="goods_name floatR" @click="details(checkb1.pdId,index1)">
                <div class="goods_word">{{checkb1.pdName}}</div>
                <div class="goods_nature clearfix">
                  <span class="floatL" v-show="checkb1.pdSpce != '' ">{{checkb1.pdSpce}}</span>
                </div>
                <div class="clearfix priceBox">
                  <!-- <div class="goods_detail floatL"> -->
                    <div class="order_male clearfix"><span class="floatL">¥{{checkb1.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb1.pdQuantity}}</span></div>
                  <!-- </div> -->
                  <div class="goods_detail floatR">
                    <div class="order_tuihuo floatR" v-if="checkb.status == 3 && checkb1.refundId == null " @click.stop="return_goods_apply(checkb1)" >退货</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 2" @click.stop="please()">退货</div>
                    <div class="order_tuihuo floatR" v-else-if="(checkb1.refundType == 1 && checkb1.refundStatus == 2)" @click.stop="return_goods_apply(checkb1)" >退货</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 0" @click.stop="afterSellService(checkb1)">待审核</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 1" @click.stop="afterSellService(checkb1)">待买家退货</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 2" @click.stop="afterSellService(checkb1)">已拒绝</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 3" @click.stop="afterSellService(checkb1)">待验货退款</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 4" @click.stop="afterSellService(checkb1)">待返货</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 5" @click.stop="afterSellService(checkb1)">已退款</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 6" @click.stop="afterSellService(checkb1)">申退关闭</div>
                    <div class="order_tuihuo floatR" v-else-if="checkb.status == 3 && checkb1.refundStatus == 7" @click.stop="afterSellService(checkb1)">已返货</div>
                    
                  </div>
                </div>
              </div>
              
              
              

            </div>
            <div class="operation clearfix">
              <div class="operation_button floatR" v-show="checkb.status != 3" @click="sureGet(index)">确认收货</div>
              <div class="operation_button floatR" @click="logistics(index)">查看物流</div>
            </div>
            <div class="order_details_line"></div>
      </div>
      <div v-show="allList1.notSendList !='' && this.allList1.notSendList != null">
        <div class="all clearfix sendStatus">
          <div class="all_o1" style="float:right;color:#ff4444;">待发货</div>
        </div>
        <div class="goods clearfix" v-for="(checkb2,index2) in allList1.notSendList">
          <div class="goods_img floatL" @click="details2(index2)"><img :src="checkb2.imgUrl" ></div>
          <div class="goods_name floatR" @click="details2(index2)">
            <div class="goods_word">{{checkb2.pdName}}</div>
            <div class="goods_nature clearfix">
              <span class="floatL" v-show="checkb2.pdSpce !='' ">{{checkb2.pdSpce}}</span>
            </div>
            <div class="clearfix priceBox">
              <!-- <div class="goods_detail floatL"> -->
                <div class="order_male clearfix"><span class="floatL">¥{{checkb2.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb2.pdQuantity}}</span></div>
              <!-- </div> -->
              <div class="goods_detail floatR">
                <div class="order_tuihuo floatR" v-show="checkb2.refundId == null" @click.stop="return_money_apply(checkb2)">退款</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 0" @click.stop="afterSellService(checkb2)">待审核</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 1" @click.stop="afterSellService(checkb2)">待买家退货</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 2" @click.stop="afterSellService(checkb2)">已拒绝</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 3" @click.stop="afterSellService(checkb2)">待验货退款</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 4" @click.stop="afterSellService(checkb2)">待返货</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 5" @click.stop="afterSellService(checkb2)">已退款</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 6" @click.stop="afterSellService(checkb2)">申退关闭</div>
                <div class="order_tuihuo floatR" v-show="checkb2.refundStatus == 7" @click.stop="afterSellService(checkb2)">已返货</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div v-show="allList1.notPayList !='' && this.allList1.notPayList != null" >
        <div class="goods clearfix" v-for="(checkb3,index3) in allList1.notPayList">
          <div class="goods_img floatL" @click="details3(index3)"><img :src="checkb3.imgUrl" ></div>
          <div class="goods_name floatR" @click="details3(index3)">
            <div class="goods_word">{{checkb3.pdName}}</div>
            <div class="goods_nature clearfix">
              <span class="floatL" v-show="checkb3.pdSpce != '' ">{{checkb3.pdSpce}}</span>
            </div>
            <div class="goods_detail clearfix priceBox">
              <div class="order_male clearfix"><span class="floatL">¥{{checkb3.pdPrice}}</span><span class="order_detailNumber floatR">×{{checkb3.pdQuantity}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="order_details_line1"></div>
      <div class="all clearfix buyerMessage ">
        <div class="all_o1">买家留言(注：限30个字以内)：</div>
        <div class="all_o1 bold" v-show="allList1.leaveMessage == null">暂无</div>
        <div class="all_o1 bold"v-show="allList1.leaveMessage != null">{{allList1.leaveMessage}}</div>

      </div>
      <div class="order_details_line1"></div>
      <div class="all clearfix " style="border-bottom:1px solid #d6d6d6">
        <div class="all_o1">发票信息：</div>
        <div class="all_o6 floatL floatLMes">{{allList1.invoiceContent}}</div>
      </div>
      <div class="all clearfix">
        <div class="all_o1">支付状态：</div>
        <div class="all_o6 floatL floatLMes" v-show="allList1.payStatus != 2">未支付</div>
        <div class="all_o6 floatL floatLMes" v-show="allList1.payStatus == 2">已支付</div>
      </div>
      <div class="all clearfix">
        <div class="all_o1">支付方式：</div>
        <div class="all_o6 floatL floatLMes">{{bank}}</div>
      </div>
      <div class="order_details_line1"></div>
      <div class="all clearfix ">
        <div class="all_o1">商品合计</div>
        <div class="all_o5" style="color:#555555">¥ {{allList1.totalAmount}}</div>
      </div>
      <div class="all clearfix ">
        <div class="all_o1 all_logistics">物流费用</div>
        <div class="all_o6 all_logistics">¥ {{allList1.costFreight}}</div>
      </div>
      <div class="all clearfix border1">
        <div  v-for="(type,index) in allList1.pdActivity" :key="index">
          <div v-if="type.saleType == 3">
           <div class="all_o1">满{{type.howYuan}}减{{type.fullLessCash}}</div><div class="all_reduce">满减</div>
           <div class="all_o5">- ¥ {{type.costItem}}</div>
          </div>
          <div v-if="type.saleType == 4">
            <div class="all_o1">满{{ type.howYuan}}打{{ type.fullDiscount }}折</div><div class="all_reduce">满减</div>
            <div class="all_o5">- ¥ {{type.costItem}}</div>
          </div>
          <div v-if="type.saleType == 5">
            <div class="all_o1">满{{ type.howPiece }}件减{{ type.fullLessCash }}</div><div class="all_reduce">满减</div>
            <div class="all_o5">- ¥ {{type.costItem}}</div>
          </div>
          <div v-if="type.saleType == 6">
            <div class="all_o1">满{{ type.howPiece }}件打{{ type.fullDiscount }}折</div><div class="all_reduce">满减</div>
            <div class="all_o5">- ¥ {{type.costItem}}</div>
          </div>

        </div>

      </div>
      <div class="allThe clearfix" v-show="allList1.organStatus ==1">
        <!-- <div class="floatL">
        <div class="all_o1_1">付款剩余时间</div><br>
        <div class="all_o5_5">{{orderDetail.days}}天 {{orderDetail.hours}} 小时 {{orderDetail.mins}} 分钟{{orderDetail.secs}}秒</div>
        </div> -->
         <div class="all_o6 all_logistics actualMoney" style="color:#ff4444">应付金额：¥ {{allList1.actualMoney}}</div>
      </div>
      <div class="order_details_line2"></div>
      <div class="shopping_mon  clearfix" v-show="allList1.organStatus == 1">
        <div class="floatL shopping_mon4"><span>{{orderDetail.hours}}:{{orderDetail.mins}}:{{orderDetail.secs}}</span>后自动取消订单</div>
        <div class="floatR" style="margin-right:0.8rem;margin-top:1rem;">
          <div class="shopping_mon1" @click="deleteOrder(index)">取消订单</div>
          <div class="shopping_mon2" @click="first_pay()">
            <div class="shopping_mon3 floatL">去支付</div>
          </div>
        </div>
      </div>
      <div class="shopping_mon" v-show="allList1.organStatus == 2 || allList1.organStatus == 3 ||allList1.organStatus == 10 || allList1.organStatus == -2">
        <div class="floatR allMoney1">
        <div class="all_o5 all_o5_last bold">¥ {{allList1.actualMoney}}</div>
          <div class="all_o111">已付金额：</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .priceBox{
    margin-top: 1rem;
  }
  .goods_name{
    width:21rem;
    margin-left: 1rem;
  }
  .addressBox{
    padding:0.5rem 0 1rem;
  }
  .addressLogo{
   height: 4rem;
   line-height: 4rem;
   margin-top:1rem;
  }
  .addressLogo img,.addrssText{
    display:block;
  }
  .addressLogo img{
    width:1.9rem;
    height: 2rem;
    margin-left:2rem;
  }
  .orderBk{
    width:100%;
    height:0.2rem;
    background:url(../../assets/images/orderBk.png) no-repeat;
    background-size: contain;
  }
  .sendStatus{
    border-bottom: 1px solid #d6d6d6;
   
  }
  .floatLMes{
    margin-left: 2rem;
  }
  .buyerMessage{
    color:#adadad;
  }
  .all_o1 .all_logistics{
    height: 2rem;
    line-height: 2rem;
  }

  .all_o6 .all_logistics{
    height: 2rem;
    line-height: 2rem;
  }
  .all_reduce{
    float: left;
    font-size: 1.1rem;
    width: 3rem;
    height: 1.6rem;
    line-height: 1.6rem;
    color: #f9be00;
    border: 1px solid #f9be00;
    border-radius: 0.3rem;
    margin-top: 1.3rem;
    margin-left: 0.5rem;
  }
  .order_details_line111{
    border-bottom: 1px solid #d6d6d6;
  }
  .allMoney1{
    width: 20.3rem;
  }
  .border1{
    border-bottom: 1px solid #d6d6d6;
  }
  .bold{
    /*font-weight: bold;*/
  }
  .order_details{
    width:100%;
    height:100%;
    background:#fff;
  }
  .order_details_img{
    position: fixed;
    top: 0;
    z-index: 1111;
    background: #fff;
    border-bottom: 1px solid #d6d6d6;
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .order_details_img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .order_details_line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
    margin-top:4rem;
  }
  .order_details_line1{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
  }
  .order_details_line2{
    height: 6rem;
    background: #f4f4f4;
    width: 100%;
    /*margin-bottom: 5rem;*/
  }
  .shopping_mon{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    border-top: 1px solid #cecece;
    z-index: 33;
    background: #fff;
    display: block;
  }
  .shopping_mon1{
    width: 7.4rem;
    float: left;
    height: 2.9rem;
    line-height: 2.9rem;
    font-size: 1.25rem;
    color: #333333;
    border:1px solid #333333;
    margin-right:1rem;
    border-radius: 5px;

  }
  .shopping_mon2{
    width: 7.4rem;
    float: right;
    height: 2.9rem;
    font-size: 1.25rem;
    line-height: 2.9rem;
   
    border:1px solid  #ff4444;
    border-radius: 5px;
  }
  .shopping_mon3{
    color:#ff4444;
    font-size: 1.25rem;
    width: 100%;
    /* height: 2rem;
    line-height: 2rem; */
    
  }
  .shopping_mon4{
    color: #555555;
    font-size: 1.3rem;
    /* width: 100%; */
    height: 2.9rem;
    line-height: 2.9rem;
    margin-top:1rem;
    margin-left: 0.5rem;
  }
  .shopping_mon4 span{
    color:#ff5252;
  }
  .allThe{
    padding: 0 4%;
    width: 100%;
    /*height: 6rem;*/
    padding: 1rem;
  }
  .all{
    padding: 0 4%;
    width: 100%;
    background:#fff;
  }
  .all img{
    width: 1.3rem;
    margin-top: 1.2rem;
    float: left;
    margin-right: 1rem;
  }
  .allMoney{
    padding: 0 4%;
    width: 100%;
    border-bottom: 1px solid #acacac;
  }
  .all_o1{
    float: left;
    font-size: 1.3rem;
    /*height: 4rem;*/
    line-height: 4rem;
    text-align: left;
  }
  .all_o111{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
    color:#ff4444;
  }
  .all_o7{
    float: left;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
  }
  .all_o8{
    float: left;
    font-size: 1.3rem;
    /* height: 3rem; */
    line-height: 2rem;
    width: 100%;
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */
    text-align: left;
  }
  .all .all_o8 img{
    width: 1.3rem;
    margin-top: 0rem;
    float: left;
    margin-right: 1rem;
  }
  .all_o1_1{
    /*float: left;*/
    font-size: 1.3rem;
    text-align: left;
    line-height: 1.3rem;
  }
  .all_o5_5{
    /*float: right;*/
    font-size: 1.3rem;
    color: #cd141c;
    text-align: left;
    line-height: 1.3rem;
  }
  .all_o2{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
  }
  .all_o4{
    float: right;
    font-size: 1.6rem;
    height: 4rem;
    line-height: 4rem;
  }
  .all_o3{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
    color: #ff4444;
  }
  .all_o5{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
    color: #cd141c;
  }
  .all_o5_last{
    margin-right: 10%;
  }
  .all_o6{
    float: right;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
    color: #333;
  }
  .actualMoney{
    font-size: 1.5rem;
    font-weight: bold;
  }
  .operation{
    padding: 0.7rem 4%;
    width: 100%;
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
  }
  .operation_button{
    height: 2.5rem;
    line-height: 2.5rem;
    color: #333;
    font-size: 1.3rem;
    text-align: center;
    border-radius: 0.4rem;
    border: 1px solid #acacac;
    width: 7.5rem;
    margin-left: 1.5rem;
  }
  .operation_button1{
    width: 12.5rem;
  }
  .operation_button1 span{
    color: #f9be00;
  }
  .goods{
    width: 100%;
    padding: 0.5rem 4%;
    background: #fff;
    margin-bottom: 0.5rem;
  }
  .goods_img{
    width: 12rem;
    height: 12rem;
  }
  .goods_img img{
    width: 100%;
    height: 100%;
    /* margin-right: 1.5rem; */
  }
  .goods_word{
    /* width: 16rem; */
    line-height: 1.5rem;
    text-align: left;
    font-size: 1.3rem;
    height: 3rem;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .goods_nature {
    margin-top: 1rem;
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
    /* line-height: 3rem; */
    /*text-align: left;*/
    font-size: 1.4rem;
    text-align: right;
  }
  .order_detailNumber{
    color: #868686;
    font-size: 1.2rem;
    /*margin-top: 1.5rem;*/
    text-align: right;
   /*  margin-top: 1rem; */
  }
  .order_tuihuo{
   /*  width: 3.5rem;/**/
   padding:0 1.2rem;
    height: 1.9rem;
    line-height: 1.9rem;
    font-size: 1.25rem;
    /*width: 5rem;*/
    border-radius:0.4rem;
    border: 1px solid #333333;
    text-align: center;
    color: #333333;
   /*  margin-top: 3rem; */
    margin-left: 0.5rem;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
  .mint-toast {
    position: fixed;
    width: 52% !important;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
  }
  .toast {
    position: fixed;
    width: 52% !important;
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
</style>
<script>
  import Vue from 'vue'
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
//  import $route from 'route'
  export default {
    name: 'order_details',
    data () {
      return {
        loginCode:"",
        allList1:[],
        idDetail:'',
        typeDetail:'',
        time:'',
        bank:'',
        orderDetail:{
          days:'',
          hours:'',
          mins:'',
          secs:'',
        },
        urlParams: '',
        urlParamsIndex: '',
        urlRemain: '',
        howYuan:"",
        fullLessCash:'',
        actualPay:'',
        payTypeWord: {
                '0': '余额支付',
                '1': '网银支付（借记卡）',
                '2': '快捷支付(借记卡)',
                '3': '快捷支付(信用卡)',
                '4': '认证支付',
                '5': '支付宝支付',
                '6': '微信支付',
                '7': '线下支付',
                '8': '网银支付（信用卡）',
                '9': 'B2B 企业网银支付',
                '10': '微信扫码支付',
                '11': '支付宝扫码支付',
              }

      }
    },
    mounted () {
      this.allList();
      setTimeout(() => {
        this.allListTwo()
      }, 3000);

    },
    methods:{
      deleteOrder: function (index) {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true,
          showConfirmButton:true
        });
        MessageBox.confirm('确定执行此操作?').then(action => {
          let url = HOST_ORDERS+'/order/front/cancelOrder/';
          if(this.loginCode != ""){
            this.$resource(url).get({id:this.allList1.id}).then((response) => {
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

      please: function () {
        Toast({
          message: '请确认收货后再提交退货申请',
          duration: 3000,
          className: "toast"
        });
      },

      //点击包裹商品进入商品详情
      details: function (pdId,index1) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+pdId+"&order_details=1"+'&'+this.urlRemain;
      },

      details2: function (index2) {
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+this.allList1.notSendList[index2].pdId+"&order_details=1"+'&'+this.urlRemain;
      },
      details3: function (index3) {
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+this.allList1.notPayList[index3].pdId+"&order_details=1"+'&'+this.urlRemain;
      },
      logistics: function (index) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "logistics?id="+this.allList1.packageEntityList[index].id;
      },
      countTime:function(time){
        let _this = this
        _this.orderDetail
        var totalSecs = time/1000;
        _this.orderDetail.days = Math.floor( totalSecs / (24*60*60) );
        var totalSecs1= (totalSecs-  _this.orderDetail.days*24*60*60);
        _this.orderDetail.hours = Math.floor( totalSecs1 / (60*60) );
        var totalSecs2= (totalSecs1-  _this.orderDetail.hours*60*60);
        _this.orderDetail.mins = Math.floor( totalSecs2 / 60);
        _this.orderDetail.secs = Math.floor( totalSecs2 -  _this.orderDetail.mins*60);
        var timer = setInterval(function () {
          if( _this.orderDetail.days == 0 && _this.orderDetail.hours == 0 && _this.orderDetail.mins == 0 && _this.orderDetail.secs == 0 ){
            _this.orderDetail.days = 0;
            _this.orderDetail.hours = 0;
            _this.orderDetail.mins = 0;
            _this.orderDetail.secs = 0
          }
          _this.orderDetail.secs--;
          if(_this.orderDetail.secs <0 ){
            _this.orderDetail.secs = 59;
            _this.orderDetail.mins--;
            if(_this.orderDetail.mins< 0){
              _this.orderDetail.mins = 59;
              _this.orderDetail.hours--;
              if(_this.orderDetail.hours<0){
                _this.orderDetail.hours = 24;
                _this.orderDetail.days--;
                if( _this.orderDetail.days < 0 ){
                  _this.orderDetail.days = 0;
                }
              }
            }
          }
        }, 1000);
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
                this.allList();
              }
            })
          }

        });
      },
      allList: function () {
        this.urlParams = window.location.href; //获取url中"?"符后的字串
        this.urlParamsIndex = this.urlParams.indexOf('?')
        this.urlRemain = this.urlParams.substring(this.urlParamsIndex+1,this.urlParams.length+1)

        let url =HOST_ORDERS + '/order/front/parentOrOrderDetail';
        this.loginCode = window.localStorage.getItem('loginCode')
        this.idDetail = this.$route.query.idDetail;
        this.typeDetail = this.$route.query.typeDetail;
        Vue.http.options.headers = {
          'loginCode':this.loginCode
        }
        if(this.loginCode != ""){
          this.$resource(url).get({orderId:this.idDetail,type:this.typeDetail}).then((response) => {
            if (response.data.code == 200) {
              this.allList1 = response.data.entity;
              this.actualPay = this.allList1.actualMoney
              if(this.allList1.pdActivity != null){
                this.allList1.pdActivity =  JSON.parse(this.allList1.pdActivity);
                for (var f1 in this.allList1.pdActivity) {
                  if (this.allList1.pdActivity[f1].promotionType == 2) {
                    this.howYuan = this.allList1.pdActivity[f1].howYuan
                    this.fullLessCash = this.allList1.pdActivity[f1].fullLessCash

                  }
                  if (this.allList1.pdActivity[f1].promotionType == 1) {
                    this.howYuan = this.allList1.pdActivity[f1].howYuan
                    this.fullLessCash = this.allList1.pdActivityy[f1].fullLessCash

                  }
    
                }
              }
              this.bank=this.payTypeWord[this.allList1.payType]
              //            银行卡接口
              this.time = this.allList1.lastTime;
              this.countTime(this.time);
              if(this.allList1.packageEntityList != "" && this.allList1.packageEntityList != null){
                for(let i = 0;i<this.allList1.packageEntityList.length;i++){
                  for(let j = 0;j<this.allList1.packageEntityList[i].items.length;j++){
                      if (this.allList1.packageEntityList[i].items[j].imgUrl.indexOf(',') != -1) {
                        this.allList1.packageEntityList[i].items[j].imgUrl = this.allList1.packageEntityList[i].items[j].imgUrl.substring(0, this.allList1.packageEntityList[i].items[j].imgUrl.indexOf(','))
                  }
                  }
                }
              }
              if(this.allList1.notPayList != "" && this.allList1.notPayList != null){
                for(let i = 0;i<this.allList1.notPayList.length;i++){
                  if (this.allList1.notPayList[i].imgUrl.indexOf(',') != -1) {
                    this.allList1.notPayList[i].imgUrl = this.allList1.notPayList[i].imgUrl.substring(0, this.allList1.notPayList[i].imgUrl.indexOf(','))
                  }
                }
              }
              if(this.allList1.notSendList != "" && this.allList1.notSendList != null){
                for(let i = 0;i<this.allList1.notSendList.length;i++){
                  if (this.allList1.notSendList[i].imgUrl.indexOf(',') != -1) {
                    this.allList1.notSendList[i].imgUrl = this.allList1.notSendList[i].imgUrl.substring(0,this.allList1.notSendList[i].imgUrl.indexOf(','))
                  }
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
      },
      // 因为支付状态后台有延时，所以第二次调用比对一下支付状态，如果不相同就刷新页面
      allListTwo(){
        this.$api_get({
          url:HOST_ORDERS + '/order/front/parentOrOrderDetail',
          data:{
            orderId:this.idDetail,
            type:this.typeDetail
          }
        }).then(res=>{
          let organStatus = res.entity.organStatus
          if(organStatus != this.allList1.organStatus){
            window.location.reload()
          }
        })
      },
      back: function () {
        if(this.$route.query.activeIndex){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_all?activeIndex="+this.$route.query.activeIndex
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_all?activeIndex=0"
        }
      },
      return_goods_apply: function (goods) {
        // console.log(goods)
        let  orderItemId = goods.id;//退货退款
        // let  refundMoney = (goods.pdPrice*goods.pdQuantity-goods.costItem).toFixed(2);
        let  refundMoney = goods.refundMoneyMax
        let  refundType  = goods.refundType;
        // console.log(refundMoney)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "return_money_apply?orderItemId="+orderItemId+"&refundMoney="+refundMoney+ "&refundType=2"
      },
      return_money_apply: function (money) {
        // console.log(money)仅退款
        let  orderItemId = money.id;
        // let  refundMoney = (money.pdPrice*money.pdQuantity-money.costItem).toFixed(2);
        let  refundMoney = money.refundMoneyMax
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "return_money_apply?orderItemId="+orderItemId+"&refundMoney="+refundMoney+ "&refundType=1&history=01"
      },
      afterSellService: function (soCode) {
        let refundCode = soCode.refundId
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "afterSellService_detail?refundCode="+refundCode
      },
      first_pay: function () {
        var urlParams = window.location.href; //获取url中"?"符后的字串
        var index = urlParams.indexOf('?')
        var urlRemain = urlParams.substring(index+1,urlParams.length)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "first_pay?totalMoney="+this.allList1.actualMoney+"&lastTime="+this.allList1.lastTime+"&orderCode="+this.allList1.orderCode+"&order_details=1"+'&'+urlRemain;
      }
    }
  }
</script>

