<template>
  <div class="afterSellService_list">
    <div class="header">
      <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
      <span class="orderTitle">物流信息</span>
    </div>
    <div class="main">
      <ul class="main_ul">
        <li>
          <div class="div1">
            <div class="div_l">
              <span class="word">物流公司:</span>
              <span>{{companyName}}</span>
            </div>
          </div>
          <div class="div1">
            <div class="div_l">
              <span class="word">物流单号:</span>
              <span>{{logisticsNo}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="grayLine"></div>
    <div class="logisticInfo">
      <ul class="clearfix">
        <li v-for="(item,index) in entitys">
          <div class="circleDetail">
            <span class="img" v-show="!index"><img src="../../assets/images/sun.png" alt=""></span>
            <span class="img_line" v-show="index"><img src="../../assets/images/grayCircleLine.png" alt=""></span>
          </div>
          <div class="logistic">
            <div class="logistic1">
              <span class="logistic_word">{{ item.context }}</span>
            </div>
            <div class="logistic2">
              <div class="time">
                {{ item.expressTime }}
              </div>
            </div>
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

  .clearfix{zoom:1;}

  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}

  .afterSellService_list{
    width:100%;
  }

  .afterSellService_list  .header{
    padding: 1.3rem 0;
    position: fixed;
    top:0;
    width:100%;
    background: #fff;
    border-bottom: 1px solid #D8D9DB;
    z-index: 1111;
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
    margin-top: 4.6rem;
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
    margin-top:1.8rem;
  }

  .afterSellService_list .main .main_ul li .div2 .div2_r_2{
    font-size:1.2rem;
    text-align: left;
    margin-top: 1.5rem;
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
    line-height: 4rem;
    margin-left: 1.5rem;
  }

  .afterSellService_list .logisticInfo{
    font-size:1.3rem;
    text-align: left;
    padding-left:0.8rem;
    /*padding-bottom:5.2rem;*/
    position: relative;
    border-bottom: 1px solid #D8D9DB;
  }

  .afterSellService_list .logisticInfo ul li{
    padding: 1.5rem 0 0 0;
    display: flex;
    display: -webkit-flex;
    position: relative;
    /*height:7rem;*/
  }

  .afterSellService_list .logisticInfo ul li .circleDetail .img{
    /*margin-right:1.5rem;*/
    position: absolute;
    z-index: 111;
  }

  .afterSellService_list .logisticInfo ul li .circleDetail .img_line{
    position: absolute;
    top: -4.4rem;
    left: 0.6rem;
    height: 7rem;
  }

  .afterSellService_list .logisticInfo ul li .logistic{
    width: 100%;
    /*position: absolute;*/
    /*top: 1px;*/
    /*left: 51px;*/
  }

  .afterSellService_list .logisticInfo ul li .logistic .logistic1{
    font-size:1.2rem;
    color: #000;
    /*margin-top: 1.5rem;*/
    width: 33rem;
    padding-left: 2.5rem;
  }

  .afterSellService_list .logisticInfo ul li .logistic .logistic1 .logistic_word{
    font-size:1.2rem;
    color: #000;
    line-height: 2rem;
  }

  .afterSellService_list .logisticInfo ul li .logistic .logistic2{
    font-size:1.2rem;
    color: #868686;
    margin: 1.5rem 0;
    /*padding-bottom: 1.5rem;*/
    /*border-bottom: 1px solid #D8D9DB;*/
    padding-left: 2.5rem;
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

</style>

<script>
  import Vue from 'vue'
  Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate()+"     "+
      this.getHours()+":"+ //获取系统时，
    this.getMinutes()+":"+ //分
    this.getSeconds(); //秒;
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
        logisticsNo:'',
        companyName:''
      }
    },
    created(){
      this.getCompary()


    },
    methods: {
      //返回
      returnBack(){
        window.history.back()
      },

      //
      getCompary(){
        this.$route.query.id;
        this.loginCode = window.localStorage.getItem('loginCode')
        let url = HOST_ORDERS + '/order/public/packageDetail'
      //   Vue.http.interceptors.push((request, next)  =>{
      //     request.headers.set('loginCode', this.loginCode);
      //   next((response) => {
      //     return response
      //   });
      // });
//        this.$resource (url ).get({ expressNo: this.$route.query.logisticsNo }).then((response) => {
        this.$resource (url ).get({ id: this.$route.query.id }).then((response) => {

          if( response.status == 200 ){
          if( response.body.code == 200 ){
            this.companyName = response.body.entity.logisticsCompanyName
            this.logisticsNo = response.body.entity.logisticsNo
            this.getRefundDetail()
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
      getRefundDetail(){
        this.loginCode = window.localStorage.getItem('loginCode')
        let url = URL_API_logistics + '/wk/wsms/third/getTradeExpressInfo.json'
      //   Vue.http.interceptors.push((request, next)  =>{
      //     request.headers.set('loginCode', this.loginCode);
      //   next((response) => {
      //     return response
      //   });
      // });
//        this.$resource (url ).get({ expressNo: this.$route.query.logisticsNo }).then((response) => {
        this.$resource (url ).get({ expressNo: this.logisticsNo }).then((response) => {

        if( response.status == 200 ){
          if( response.body.code == 200 ){
            // console.log( response )

            for(var i=0; i<response.body.result.length;i++){
              let unixTimestamp = new Date( response.body.result[i].expressTime )
              response.body.result[i].expressTime = unixTimestamp.toLocaleString();
            }
            this.entitys = response.body.result
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
    }
  }
</script>
