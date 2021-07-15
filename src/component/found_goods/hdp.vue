﻿<template>
  <div>
    <!--热销好单品 sell like hot cakes-->
    <div class="hdp_slhc" v-show="content.disabled == 1">
      <div class="heading">
        <div class="heading_left">
          <div class="div1"><img src="../../assets/images/icon/2@2x.png" alt=""></div>
          <div class="div2">{{content.titleContent}}</div>
        </div>
        <div class="heading_right">
          MORE  >>
        </div>
      </div>
      <div class="hdp_slhc_goods">
        <div class="fl" v-for="(item, index) in content" :key="index">
          <span @click="jump(item.contentLinkUrl,item.contentOperationType)"   class="hdpGood">
            <img :src="item.contentImgUrl" alt="">
          </span>
        </div>
      </div>
      <div class="border"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import router from '../../router.js'
  export default{
    props: {
      data: {
       
      }
    },
    name: 'themeIndex',
    data(){
      return {
        content: [],
        titleList:''
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        this.content = newVal;
      }
    },
    mounted(){
     
    },
    components:{
       
    },
    methods: {
        // 跳转到商品详情
        jumpDetail(commodityId){
            if(window.Android){
              window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+commodityId+'&found_index=1')
            }else{
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+commodityId+'&found_index=1'
            }
            // this.$router.push({path: 'good_detail', query: {commodityId: commodityId, found_index: 1}})
        },
            //   跳转URL
        jump(url,type){
            // console.log(url)
            if(url != '无跳转' && url != ''){
              if(type == 1){
                //链接类型
                if(window.Android){
                  window.Android.intent(url)
                  
                }else{
                  window.location.href = url
                }
              }else{
                if(window.Android){
                  window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url)
                  
                }else{
                  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+url
                }
              }
            }
            
            
        },
        
        
    
    }
  }
</script>
<style >
/*热销好单品*/
  .hdp_slhc{
    /*height: 28.5rem;*/
    line-height: 5.5rem;
    text-align: center;
  }
  .hdpGood{
    display:inline-block;
    width:100%;
    height:100%;
  }
  .heading{
    height: 5rem;
    width:100%;
    line-height: 5rem;
  }
  .heading .heading_left{
    float: left;
    font-family:PingFangSC-Regular;
    color:rgba(51,51,51,1);
    width:50%;
    /*margin-left:3.4rem;*/
  }
  .heading_left .div1{
    float: left;
    height:2rem;
    margin:0.8rem 0.5rem 0rem 1rem;
  }
  .heading_left .div2{
    /*width:13rem;*/
    font-size:1.8rem;
    text-align: left;
  }
  .heading_left .div1 img{
    height:100%;
  }

  .heading .heading_right{
    float: right;
    font-size:1.2rem;
    font-family:PingFangSC-Regular;
    color:#DCBE86;
    margin-right:1rem;
  }
  .hdp_slhc .hdp_slhc_goods a{
    display:block;
  }
  .hdp_slhc_goods{
    overflow: hidden;
    width:100%;
  }
  .hdp_slhc_goods div{
    width:18.6rem;
    height:11.2rem;
    background:rgba(244,244,244,1);
    margin-bottom:0.3rem;
  }
  .hdp_slhc_goods img{
    width:100%;
    height:100%;
    background:#f4f4f4;
  }
  .hdp_slhc_goods div:nth-child(even){
    margin-left:0.3rem;
  }
  .border{
    height:1rem;
    background:rgba(244,244,244,1);
  } 
  
</style>
