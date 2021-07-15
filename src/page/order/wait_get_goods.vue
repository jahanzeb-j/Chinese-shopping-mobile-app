<template>
  <div class="order_all">
    <div class="order_all_img clearfix">
      待收货
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="order_all_line"></div>
    <div class="order_one" v-for="(checkb,index) in allList1">
      <div v-show="checkb.organStatus == 3">
        <div class="all clearfix">
          <div class="all_o1">订单号：</div>
          <div class="all_o1">{{checkb.id}}</div>
          <div class="all_o3" v-show="checkb.organStatus == 1">等待付款</div>
          <div class="all_o3" v-show="checkb.organStatus == 2">等待发货</div>
          <div class="all_o3" v-show="checkb.organStatus == 3">等待收货</div>
          <div class="all_o3" v-show="checkb.organStatus == 10">交易完成</div>
          <div class="all_o3" v-show="checkb.organStatus == -1">交易取消</div>
        </div>
        <div class="goods clearfix" v-for="(checkb1,index1) in checkb.items">
          <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
          <div class="goods_name floatL">
            <div class="goods_word">{{checkb1.pdName}}</div>
            <div class="goods_nature">
              <span>{{checkb1.pdSpce[0].name}}</span><span class="goods_nature1">{{checkb1.pdSpce[0].value}}</span><span>{{checkb1.pdSpce[1].name}}</span><span class="goods_nature1">{{checkb1.pdSpce[1].value}}</span>
            </div>
          </div>
          <div class="goods_detail floatR">
            <div class="order_male">¥{{checkb1.pdPrice}}</div>
            <div class="order_detailNumber">×{{checkb1.pdQuantity}}</div>
          </div>
        </div>
        <div class="allMoney clearfix">
          <div class="all_o2">（含运费¥{{checkb.costFreight}}）</div>
          <div class="all_o4">{{checkb.actualMoney}}</div>
          <div class="all_o2">共{{checkb.itemnum}}件商品 合计：¥</div>
        </div>
        <div class="operation clearfix">
          <div class="operation_button operation_button1 floatR" v-show="checkb.organStatus == 1">去付款<span>（23:11:34）</span></div>
          <div class="operation_button floatR" v-show="checkb.organStatus == 1">取消订单</div>

          <div class="operation_button floatR" v-show="checkb.organStatus == 2">提醒发货</div>
          <div class="operation_button floatR" v-show="checkb.organStatus == 3">确认收货</div>
          <div class="operation_button floatR" @click="details(index)">详情</div>
        </div>
        <div class="order_all_line"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .order_all{
    width:100%;
    height:100%;
    background:#fff;
  }
  .order_all_img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .order_all_img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .order_all_line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .all{
    padding: 0 4%;
    width: 100%;
  }
  .allMoney{
    padding: 0 4%;
    width: 100%;
    border-bottom: 1px solid #acacac;
  }
  .all_o1{
    float: left;
    font-size: 1.3rem;
    height: 4rem;
    line-height: 4rem;
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
    color: #f9be00;
  }
  .operation{
    padding: 0.7rem 4%;
    width: 100%;

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
    background: #f4f4f4;
    margin-bottom: 0.5rem;
  }
  .goods_img img{
    width: 7.5rem;
    margin-right: 1.5rem;
  }
  .goods_word{
    width: 16rem;
    line-height: 1.5rem;
    text-align: left;
    font-size: 1.3rem;
  }
  .goods_nature {
    margin-top: 1.5rem;
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
  }
  .order_detailNumber{
    color: #868686;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
<script>
  export default {
    name: 'order_all',
    data () {
      return {
        loginCode:"",
        allList1:[]
      }
    },
    mounted () {
      this.allList();

    },
    methods:{
      allList: function () {
        let url =HOST_ORDERS + '/order/front/orderPage/';
        this.loginCode= window.localStorage.getItem('loginCode')
        if(this.loginCode != ""){
          this.$resource(url).save({pageSize:10,pageNo:0}).then((response) => {
            if (response.status == 200) {
            console.log(response)
            this.allList1 = response.data.list;
            for(let i = 0;i<this.allList1.length;i++){
              for(let j = 0;j<this.allList1[i].items.length;j++){
//                console.log( this.allList1[i].items[j].pdSpce)
                this.allList1[i].items[j].pdSpce = eval('('+this.allList1[i].items[j].pdSpce+')');;
                console.log( this.allList1[i].items[j].pdSpce)
              }
            }
          }
        })
        }
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
      },
      details: function (index) {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_details"
      }
    }
  }
</script>
