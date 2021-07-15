﻿<template>
  <div class="f-sp">
    <!--生鲜水产-->
    <div class="fresh" v-for='(item,index) in content' :key='index' v-show='item.disabled == 1 && item.list.length > 0'>
      <div class="fresh_heading" @click="jumpDetail(item.title.titlelinkUrl,item.title.titleOperationType)">
        <h3 >{{item.title.titleContent}}</h3>
        <!--<i class="iconfont icon-gengduo" v-if="item.title.titleLinkAddress != ''"></i>-->
        <span v-if="item.title.titleLinkAddress != ''">MORE >></span>
      </div>
      <div class="fresh_goods" >
        <div class="goods fl" v-for='(item2,index2) in item.list' :key='index2' @click="jumpGoodsDetail(item2.contentLinkAddress,item2.commodityId)">
          <div class="fresh_goods_icon">
            <img :src="item2.pic" alt="">
            <p>{{item2.saleLable}}</p>
            <div class="mask1" v-if="item2.salelable !=null ">{{item2.saleLable}}</div>
            <div class="mask" v-if='item2.salelable == null && item2.subName!=null'>{{item2.subName}}</div>
            <div class="mask" v-if='item2.salelable == null && item2.subName == null'>企业采购就在好单品</div>
          </div>
          <div class="fresh_goods_text">
            {{item2.name}}
          </div>
          <div class="fresh_goods_m">
            <span v-if="item2.promotionPrice != null ">¥<b>{{item2.promotionPrice}}</b></span>
            <span v-else>¥<b>{{item2.salePrice}}</b></span>
          </div>
        </div>
        
      </div>
      <!--<div class="border"></div>-->
    </div>
    
    
    
  </div>
</template>
<script type="text/ecmascript-6">
  import router from '../../router.js'
  import {_iOSOrAndroid} from '../../util/index'
  export default{
    props: ['data','title'],
    data(){
      return {
        titleContent:'',
        content: [],
        fullLess:'',
        howYuan:'',
        fullLessCash:'',
        howYuan1:'',
        fullLessCash1:'',
        deviceType:''
      }
    },
    watch: {
      data: function (newVal, oldVal) {
       this.content = newVal;
      }
    },
    mounted(){
      this.deviceType = _iOSOrAndroid()
    },
    methods: {
      jumpDetail(url,type){
          // console.log(url,type)
          if( url != ''){
            if(type == 1){
              //链接类型
              if(window.Android){
                window.Android.intent(url)
                
              }else{
                window.location.href = url
              }
            }else if(type == 3){
              if(window.Android){
                window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url)
                
              }else{
                this.$router.push({path:url,query:{found_index:'1',}})  
                // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+url
              }
            }else if(type == 2){
                if( this.deviceType != 'Android' && this.deviceType != 'iOS'){
                  window.location.href= url
                }
            }
          }
      },
      jumpGoodsDetail(url,id){
          //跳转商品
          console.log(url,id)
          if(window.Android){
            window.Android.intent(url)
          }else{
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+id+'&found_index=1'
            
          }
      }
      
    }
  }
</script>
<style scoped>

.f-sp{
  /*overflow: hidden;*/
  /*padding-bottom: 3rem;*/
  /*font-size: 1.3rem;*/
}
.fresh_heading h3{
    font-size:1.8rem;
    font-family:PingFangSC-Regular;
    color: #333;
    float: left;
    margin-left:1rem;
}
.fresh_heading span{
  display: inline-block;
  float: right;
  font-size: 1.2rem;
  margin-right: 1rem;
  color:#DCBE86;
}
.fresh_goods .fresh_goods_icon img {
    width: 17.2rem;
    height: 17.2rem;
    background: rgba(244,244,244,1);
    
}
 @import url('./good.less');
</style>
