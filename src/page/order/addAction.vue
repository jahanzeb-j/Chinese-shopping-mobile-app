<template>
  <div class="order_page">
    <div class="header">
      <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
      <span class="orderTitle">填写订单</span>
    </div>
    <div class="haveAddress" v-show="isHaveAddress">
      <div class="grayLine"></div>
      <div class="personInfo" @click="changeAddress">
        <div class="personInfoCont">
          <span class="name">不知道</span>
          <span class="phone">1378958988</span>
          <span class="default">默认</span>
        </div>
        <div class="personAddressInfo">
          <span class="p_pic"><img src="../../assets/images/location.png" alt=""></span>
                    <span class="p-location">
                        北京市东城区蓝宝大厦对面
                    </span>
                    <span class="rightri">
                        <span class="rightriSp">
                              <img src="../../assets/images/rightri.png" alt="">
                        </span>
                    </span>
        </div>
      </div>
      <div class="grayLine"></div>
      <div class="goodPic">
        <div class="left">
                    <span class="leftPic">
                         <img src="../../assets/images/detailList1.png" alt="">
                    </span>
        </div>
        <div class="right">
          <ul class="right_ul">
            <li class="li1">
              发的飞洒范德萨发的萨菲噶的飞洒范德萨发的萨菲噶的发送到发送到发送到发送到
            </li>
            <li class="li2">
              北京市南昌
            </li>
            <li class="li3">
              <div class="li3_div1">
                                <span class="sp1">
                                    ￥
                                <span class="sp1_num">166.8</span>
                                    元
                                </span>
                                <span class="sp2">
                                    /箱
                                </span>
              </div>
              <div class="li3_div2">
                                <span class="sp3">
                                    已成交
                                <span class="sp3_num">
                                    1000
                                </span>
                                    笔
                                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="grayLine"></div>
      <div class="invoice">
        <div class="invoice1">
          发票信息
        </div>
        <div class="invoice2" @click="openInvoice">
                    <span class="invoiceEffect">
                        办公
                    </span>
          -
                    <span class="invoiceName">
                        <span>北京市中国网库公司</span>
                        <span><img src="../../assets/images/rightri.png" alt=""></span>
                    </span>

        </div>
      </div>
      <mt-popup
        v-model="invoiceContent"
        position="bottom">
        <div class="invoicePop">
          <div class="div1">
            <span class="font1">发票信息</span>
            <span class="finish" @click="finish">完成</span>
          </div>
          <div class="div2">
            <span  class="font1">发票类型</span>
            <span class="div2_1">仅支持纸质发票</span>
          </div>
          <div class="div3">
            <div class="div3_1 font1">
              发票抬头
            </div>
            <div class="div3_2">
                            <span class="self">
                                <input type="radio" name="chooseWho">
                                <label for="">个人</label>
                            </span>
                            <span class="public">
                                <input type="radio" name="chooseWho">
                                <label for="">单位</label>
                            </span>
            </div>
            <div class="div3_3">
              <input placeholder="请输入公司名称" class="enterName">
            </div>
          </div>
          <div class="div4">
            <div class="div4_1 font1">
              发票内容
            </div>
            <div class="div4_2">
                            <span class="div4_2_1">
                                <input type="radio" name="choose1">
                                <label for="">办公用品</label>
                            </span>
                            <span class="div4_2_2">
                                <input type="radio" name="choose1">
                                <label for="">耗材</label>
                            </span>
                            <span class="div4_2_3">
                                <input type="radio" name="choose1">
                                <label for="">明细</label>
                            </span>
            </div>
          </div>
        </div>
      </mt-popup>
      <div class="grayLine"></div>
      <div class="invoice">
        <div class="invoice1">
          买家留言
        </div>
        <div class="invoice2">
                    <span class="invoiceName">
                        <input value="" placeholder="给商家留言30字以内" class="leaveMsg">
                        <span><img src="../../assets/images/rightri.png" alt=""></span>
                    </span>

        </div>
      </div>
      <div class="grayLine"></div>
      <div class="invoice">
        <div class="invoice1">
          商品总金额
        </div>
        <div class="invoice2">
                    <span class="invoiceName">
                        ￥
                        <span>100.00</span>
                        元
                    </span>
        </div>
      </div>
      <div class="invoice">
        <div class="invoice1">
          物流费用
        </div>
        <div class="invoice2">
                    <span class="invoiceName">
                        ￥
                        <span>100.00</span>
                        元
                    </span>
        </div>
      </div>
      <div class="grayLine"></div>
      <div class="bottomTotal">
        <ul class="bottomTotal_ul">
          <li class="buyNow" @click="buyNow">
            立即购买
          </li>
          <li  class="word">
            <span class="word1">合计:</span>
            <span class="word2">￥</span>
            <span class="word3">188022</span>
            <span class="word2">元</span>
          </li>
        </ul>
      </div>
    </div>
    <transition name="fold">
      <div class="noAddress" v-show="!isHaveAddress">
        <div class="popup"></div>
        <div class="alertWindow">
          <ul class="alertWindow_ul">
            <li class="li1">
              <div class="title">提示</div>
            </li>
            <li class="li2">
              您还没有设置收货地址，请点击这里设置
            </li>
            <li class="li3">
              <span class="cancel"  @click="cancel">取消</span>
              <span class="addAddress" @click="addAddress">添加地址</span>
            </li>
          </ul>
        </div>
        <div class="bottomTotal">
          <ul class="bottomTotal_ul">
            <li class="buyNow">
              提交订单
            </li>
            <li  class="word">
              <span class="word1">合计:</span>
              <span class="word2">￥</span>
              <span class="word3">188022</span>
              <span class="word2">元</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .fold-enter-active {
    animation-name: fold-in;
    animation-duration: .5s;
  }
  .fold-leave-active {
    animation-name: fold-out;
    animation-duration: .5s;
  }
  @keyframes fold-in {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }
  img{
    width:100%;
    height:100%;
  }

  span{
    display: inline-block;
  }

  .order_page{
    width:100%;
  }

  .order_page  .header{
    padding: 1.3rem 0;
  }

  .order_page  .header .orderTitle{
    font-size:1.6rem;
    color: #333;
    font-weight: bold;
  }

  .order_page  .header .return{
    float: left;
    margin-left:0.9rem;
    width:1rem;
    height:2rem;
  }

  .order_page .noAddress{
    width:100%;
  }

  .order_page .noAddress .popup{
    width:100%;
    height:100rem;
    background: #7A7A7A;
    position: fixed;
    top:0;
    z-index:11;
    opacity:0.5;
  }

  .order_page .noAddress .alertWindow{
    width:75%;
    height:16.8rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top:-8.6rem;
    margin-left:-37.5%;
    z-index:22;
  }

  .order_page .noAddress .alertWindow{
    background: #fff;
    border-radius: 5%;
  }

  .order_page .noAddress .alertWindow_ul .li1 .title{
    font-size: 1.8rem;
    color:#000;
    margin: 3rem 0 1.5rem 0;
    font-weight: bolder;
  }

  .order_page .noAddress .alertWindow_ul .li2{
    font-size: 1.5rem;
    color:#333;
    line-height: 2rem;
    width:21rem;
    margin: 0 auto;
  }

  .order_page .noAddress .alertWindow_ul .li3{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    height:6rem;
    line-height:6rem;
    border-top:1px solid #D8D9DB;
    margin-top: 1rem;
  }

  .order_page .noAddress .alertWindow_ul .li3 .cancel{
    font-size:1.8rem;
    color: #999;
    width:50%;
    border-right:1px solid #D8D9DB;
  }

  .order_page .noAddress .alertWindow_ul .li3 .addAddress{
    font-size:1.8rem;
    color: #f9be00;
    width:50%;
  }

  .grayLine{
    width:100%;
    height:1rem;
    background: #f4f4f4;
  }

  .haveAddress{
    width:100%;
    padding: 0 0.8rem;
  }

  .haveAddress .personInfo{
    padding:1.3rem 0 1.1rem 0;
  }

  .haveAddress .personInfo .personInfoCont{
    text-align: left;
    margin-bottom:1.3rem;
  }

  .haveAddress .personInfo .personInfoCont .name{
    font-size:1.4rem;
    color: #373737;
    font-weight: bold;
    margin: 0 1.4rem 0 1.8rem;
  }

  .haveAddress .personInfo .personInfoCont .phone{
    font-size:1.2rem;
    color: #373737;
    font-weight: bold;
  }

  .haveAddress .personInfo .personInfoCont .default{
    font-size:1.2rem;
    color: #fff;
    padding: 0.25rem 0.5rem;
    background: #F9BE00;
    margin-left:0.7rem;
  }

  .haveAddress .personInfo .personAddressInfo{
    text-align: left;
  }

  .haveAddress .personInfo .personAddressInfo .p_pic{
    width:0.9rem;
    height:1.2rem;
    margin: 0 0.8rem 0 0.1rem
  }

  .haveAddress .personInfo .personAddressInfo .p-location{
    font-size:1.1rem;
    color: #A4A4A4;

  }

  .haveAddress .personInfo .personAddressInfo .rightri{
    width:2rem;
    height:2rem;
    float: right;
    margin-top: -1.5rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }

  .haveAddress .personInfo .personAddressInfo .rightri .rightriSp{
    width:0.6rem;
    height:1rem;

  }

  .haveAddress .goodPic{
    display: flex;
    display: -webkit-flex;
    padding:1rem 0 ;
  }

  .haveAddress .goodPic .left{
    width:10.5rem;
    height:10.5rem;
    background: #F0F0F0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
  }

  .haveAddress .goodPic .left .leftPic{
    width:8rem;
    height:8rem;
  }

  .haveAddress .goodPic .right .right_ul{
    text-align: left;
    padding: 1rem 0 0 1rem;
  }

  .haveAddress .goodPic .right .right_ul .li1{
    font-size:1.2rem;
    color: #333333;
    width:24.4rem;
    line-height:1.75rem;
  }

  .haveAddress .goodPic .right .right_ul .li2{
    font-size:1.1rem;
    color: #8F8F8F;
    margin: 0.8rem 0  1.8rem 0;
  }

  .haveAddress .goodPic .right .right_ul .li3{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .haveAddress .goodPic .right .right_ul .li3 .sp1{
    font-size:1rem;
    color: #CC141C;
  }

  .haveAddress .goodPic .right .right_ul .li3 .sp1 .sp1_num{
    font-size:1.2rem;
    color: #CC141C;
    font-weight: bolder;
  }

  .haveAddress .goodPic .right .right_ul .li3 .sp2{
    font-size:1rem;
    color: #939393;
  }

  .haveAddress .goodPic .right .right_ul .li3 .sp3{
    font-size:1rem;
    color: #939393;
  }

  .haveAddress .invoice{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    padding: 1.5rem 0;
    font-size:1.3rem;
  }

  .haveAddress .invoice .invoice1{
    color:#747474;
    font-weight: bold;
  }

  .bottomTotal{
    width:100%;
    position: fixed;
    bottom:0;
    text-align: right;
  }

  .bottomTotal  .bottomTotal_ul{
    overflow: hidden;
  }

  .bottomTotal  .bottomTotal_ul li{
    float: right;
    padding: 1.7rem 0;
  }

  .bottomTotal .bottomTotal_ul .buyNow{
    margin-top:1.5rem;
    font-size:1.5rem;
    color:#fff;
    background: #F9BE00;
    font-weight: bolder;
    float: right;
    padding-right: 3rem;
    padding-left: 3rem;
  }

  .bottomTotal .bottomTotal_ul .word{
    margin-top:1.5rem;
    font-size:1.5rem;
    font-weight: bolder;
    float: right;
    padding-right: 1rem;
  }

  .bottomTotal .word .word1{
    font-size:1.1rem;
    color: #6B6B6B;
  }

  .bottomTotal .word .word2{
    font-size:1.1rem;
    color: #CC141C;
  }

  .bottomTotal .word .word3{
    font-size:1.2rem;
    color: #CC141C;
    font-weight: bolder;
  }

  .mint-popup{
    width:100%;
  }

  .invoicePop{
    width:100%;
    font-size:1.1rem;
    padding: 0 0.8rem;
  }

  .invoicePop .div1{
    padding: 1.5rem 0;
    border-bottom: 1px solid #D8D9DB;
  }

  .invoicePop .div1 .finish{
    float: right;
    font-size:1.4rem;
  }

  .invoicePop .div2{
    padding: 1.5rem 0;
    border-bottom: 1px solid #D8D9DB;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .invoicePop .font1{
    font-size:1.5rem;
    color:#515151;
    font-weight: bold;
  }

  .invoicePop .div2 .div2_1{
    font-size:1.1rem;
    color: #B4B4B4;
  }

  .invoicePop .div3{
    text-align: left;
    padding: 1.5rem 0;
    border-bottom: 1px solid #D8D9DB;
  }

  .invoicePop .div3 .div3_2{
    margin: 1.5rem 0 1.6rem 0;
  }

  .invoicePop .div3 .div3_2 .self{
    margin: 0 5rem 0 1.3rem;
  }

  .invoicePop .div3 .div3_2 .self .selfRadio{
    width:1rem;
    height:1rem;
  }

  input[type='radio']{
    width:1rem;
    height:1rem;
  }

  label{
    font-size:1.2rem;
    color: #727272;
  }

  .invoicePop .div3 .enterName{
    padding: 0.9rem 0 0.9rem 1rem;
    font-size: 1.1rem;
    margin-left:1.3rem;
    background: #F4F4F4;
    width:86%;
  }

  .invoicePop .div4{
    text-align: left;
    padding: 1.5rem 0 2.1rem 0;
  }

  .invoicePop .div4 .div4_2{
    margin-top:1.5rem;
  }

  .invoicePop .div4 .div4_2 span{
    margin-right:2.8rem;
  }

  .leaveMsg{
    font-size:1.2rem;
    color: #939393;
  }

</style>

<script>
  export default{
    name: 'order_page',
    data(){
      return{
        isHaveAddress: true,
        invoiceContent:false
      }
    },
    mounted(){

    },
    methods: {
      //返回
      returnBack(){
        window.history.back()
      },

      //取消添加收货地址
      cancel(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail';
      },

      //添加收货地址
      addAddress(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address';
      },

      //开发票
      openInvoice(){
        this.invoiceContent = true
      },

      //开发票点击完成
      finish(){
        this.invoiceContent = false
      },

      //点击收货地址
      changeAddress(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'change_address';
      },

      //立即支付
      buyNow(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'first_pay';
      }
    }
  }
</script>
