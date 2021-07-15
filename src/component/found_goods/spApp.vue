<template>
  <div class="f-sp">
    <div v-if="titleContent != ''" class="ap-header">
      <span style="line-height: 1.7rem;">{{titleContent}}</span>
      <img style="width: 100%" src="../../assets/images/hdpDivider-3x.png">
    </div>
    <div class="sp-inner" v-for="item in content">
      <div class="sp-img" @click="jumpDetail(item.contentLinkAddressL)">
        <div class="img-wrap">
          <!--<div class="all_reduce">订单满110.00减10.00</div>-->
          <img v-lazy="item.imgL" alt="">
        </div>
        <p>{{item.l.name.length>23?item.l.name.slice(0,23)+'..':item.l.name}}</p>
        <p class="sub-title" v-if='item.r.detail'>{{item.l.detail}}</p>
        <!-- <span>¥<b>{{item.l.salesPrice}}</b>元</span>/{{item.l.unit}} -->
        <span v-if="item.l.promotionPrice">¥<b>{{item.l.promotionPrice.split('-')[0]}}</b></span>
        <span v-if="!item.l.promotionPrice">¥<b>{{item.l.salesPrice.split('-')[0]}}</b></span><!-- /{{item.l.unit}} -->
        <p v-if="item.purchaseQuantityShow" class="deadline">限时秒杀</p>
      </div>
      <div class="sp-img" @click="jumpDetail(item.contentLinkAddressR)">
        <div class="img-wrap">
          <!--<div class="all_reduce">订单满110.00减10.00</div>-->
          <img v-lazy="item.imgR" alt="">
        </div>
        <p> {{item.r.name.length>23?item.r.name.slice(0,23)+'..':item.r.name}}</p>
        <p class="sub-title" v-if='item.r.detail'>{{item.r.detail }}</p>
        <!-- <span>¥<b>{{item.r.salesPrice}}</b>元</span>/{{item.r.unit}} -->
        <span v-if="item.r.promotionPrice">¥<b>{{item.r.promotionPrice.split('-')[0]}}</b></span>
        <span v-if="!item.r.promotionPrice">¥<b>{{item.r.salesPrice}}</b></span><!-- /{{item.r.unit}} -->
        <p v-if="item.purchaseQuantityShow" class="deadline">限时秒杀</p>
      </div>
    </div>
    <div class="sp-bottom"><img src="../../assets/images/endWkhdp.png" style="vertical-align: middle;height: 1.3rem"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import router from '../../router.js'
  export default{
    props: {
      data: {}
    },
    data(){
      return {
        titleContent:'',
        content: [],
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        this.titleContent = newVal['title'].titleContent;
        this.content = newVal;
      }
    },
    methods: {
      jumpDetail(url1){
//        router.push({path: 'good_detail', query: {commodityId: id,found_index:1}})
        var u = navigator.userAgent
        if(url1.indexOf("?") != -1){
          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
           window.Android.intent(url1+'&found_index=1')
          }else {//是IOS
            window.location.href = url1+'&found_index=1'+"://"
          }
        }else{
          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
           window.Android.intent(url1+'?&found_index=1')
          }else {//是IOS
            window.location.href = url1+'?&found_index=1'+"://"
          }
        }
        
      },
    },
//    filters: {
//      capitalize: function (value) {
//        var reg = /^[a-zA-Z0-9_]+$/;
//        var res = reg.test(value)
//        return  res
//
//      }
//    }
  }
</script>
<style scoped>
  .all_reduce{
    position: absolute;
    bottom: 1rem;
    left: 1.8rem;
    width: 13rem;
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    background: #ed84c7;
    color: #fff;
  }
  .f-sp {
    overflow: hidden;
    /*padding-bottom: 4.4rem;*/
    font-size: 1.3rem;
  }

  .ap-header span:first-child {
    font-size: 1.7rem;
    /*width: 28%;*/
    display: inline-block;
    text-align: center;
    padding-bottom: .3rem;
  }
  .ap-header .last-child{
    font-size: 1rem;
  }
  .ap-header {
    margin-bottom: 1.2rem;
    position: relative;
    padding-top: 0.5rem;
  }

  .sp-inner {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #E3E3E3;
  }

  .sp-inner .sp-img:first-child, .sp-inner .sp-img:last-child {
    width: 50%;
    float: left;
    border-right: 1px solid #E3E3E3;
    padding: 1rem;
  }

  .sp-inner .sp-img:last-child {
    border-right: none;
  }

  .sp-inner:last-child .sp-img:first-child, .sp-inner:last-child .sp-img:last-child {
    margin-bottom: 3rem;
  }

  .sp-img p, .sp-img b, .sp-img span {
    font-size: 1.3rem;
    font-weight: 500;
  }

  .sp-img p {
    width: 100%;
    text-align: center;
    display: inline-block;
    color: #333;
    line-height: 2rem;
    height: 4rem;
    overflow: hidden
  }

  .sp-img {
    color: #989898;
  }

  .sp-img span {
    font-size: 1rem;
  }

  .sp-img .sub-title {
    font-size: 1rem;
    font-weight: normal;
    color: #8F8F8F;
    /*height: 1.5rem;*/
    /*line-height: 1.5rem;*/
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .sp-img span {
    color: #cc141c;
    font-weight: 500;
  }

  .img-wrap {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }

  .sp-img img {
    width: 100%;
    width: 13rem;
    height: 13rem;
  }

  .tri {
    position: absolute;
    left: 50%;
    top: 3rem;
    transform: rotate(45deg);
    margin-left: -.25rem;
    background: #fff;
    width: .5rem;
    height: .5rem;
    border-right: 1px solid #BEBEBE;
    border-bottom: 1px solid #BEBEBE;
  }

  .sp-bottom {
    height: 9.4rem;
    line-height: 4.4rem;
    font-size: 1.3rem;
    color: #5A5A5A;
    background: #F4F4F4;
  }
</style>
