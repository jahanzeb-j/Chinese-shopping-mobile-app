﻿<template>
  <div class="f-carousel">
    <div v-if="titleContent != ''" class="f-height">
      <img class="hdp-header-img1" src="../../assets/images/carefullyChoose1.png" alt="">
      <!--<div class="hdp-header" v-text="data.title"></div>-->
      <div class="hdp-header">{{titleContent}}</div>
      <img class="hdp-header-img2" src="../../assets/images/carefullyChoose2.png" alt="">
    </div>
    <mt-swipe :auto="3000" >
      <mt-swipe-item v-if="item.isDisplay" v-for="item in data.content">
        <img  @click="jumpDetail(item.contentLinkAddress),window.Android.intent(item.contentLinkAddress+'&found_index=1')" :src="item.contentImgUrl" alt="1">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  import router from '../../router.js'
  export default {
    props: {
      data: {},
    },
    data (){
      return {
        titleContent:''
      }
    },
    mounted(){
    },
    watch: {
      data: function (newVal, oldVal) {
//        console.log('newVal',newVal);
//        console.log('oldVal',oldVal);
        this.titleContent = newVal.title.titleContent;
      }
    },
    methods: {
//      swipeImgList(titleContent){
//        titleContent = data.title.titleContent;
//      },
      jumpDetail(id){
        if (id.indexOf('?') != -1) {
          var u = navigator.userAgent
          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
            window.Android.intent(id+'&found_index=1')
          }else {//是IOS
            window.location.href = id+'&found_index=1'
          }
        }else{
          var u = navigator.userAgent
          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
            window.Android.intent(id+'?&found_index=1')
          }else {//是IOS
            window.location.href = id+'?&found_index=1'
          }
        }
      }
    }
  }
</script>
<style scoped>
  .f-height{
    height: 2rem;
    width: 100%;
    background: #fff;
    padding-left: 6rem;
    line-height: 1.5rem;
  }
  .hdp-header {
    /*width: 26%;*/
    padding-top: .5rem;
    padding-bottom: .5rem;
    background-position: center;
    background-size: 50%;
    font-size: 1.5rem;
    margin: 0 0.9rem;
    font-size: 1.5rem;
    float: left;
    overflow: hidden;
    height: 2rem;
  }
  .f-carousel{
    height: 12.5rem;
    background: #F4F4F4;
  }
  .f-carousel img{
    height: 12.5rem;
    width: 100%;
  }
  .f-carousel .hdp-header-img1{
    width: 32%;
    height: 0.5rem;
    float: left;
    margin-top: 0.4rem;
  }
  .f-carousel .hdp-header-img2{
    width: 26%;
    height: 0.5rem;
    float: left;
    margin-top: 0.4rem;
  }
</style>
<style>
  /* 轮播图样式 */
  .mint-swipe-indicator{
    width: .5rem!important;
    height: .5rem!important;
    background: #fff!important;
    opacity: 1!important;
    margin: 0!important;
    margin-left: .5rem!important;
  }
  .mint-swipe-indicators{
    -webkit-transform: translateX(-0%)!important;
    transform: translateX(-0%)!important;
  }
  .mint-swipe-indicators .is-active{
    background-color: #f9be00!important;
  }
  .f-carousel .mint-swipe-indicators{
    right: 0.8rem!important;
  }
  /* 轮播图样式 */
</style>
