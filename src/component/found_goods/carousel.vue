﻿<template>
  <div class="f-carousel">
    <!--<div v-if="titleContent != ''" class="f-height">
          <img class="hdp-header-img1" src="../../assets/images/carefullyChoose1.png" alt="">-->
    <!--<div class="hdp-header" v-text="data.title"></div>-->
    <!--<div class="hdp-header">{{titleContent}}</div>
          <img class="hdp-header-img2" src="../../assets/images/carefullyChoose2.png" alt="">
        </div>-->
    <!--<mt-swipe :auto="3000" >
          <mt-swipe-item v-if="item.isDisplay" v-for="item in data.content">
            <img  @click="jumpDetail(item.contentLinkAddress)" :src="item.contentImgUrl" alt="1">
          </mt-swipe-item>
        </mt-swipe>-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-if="item.isDisplay" v-for="(item,index) in data.content" :key="index">
        <img @click="jumpDetail(item.contentLinkAddress,item.id)" :src="item.contentImgUrl">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import router from '../../router.js'
import { _iOSOrAndroid } from '../../util/index'
export default {
  name: 'FCarousel',
  props: {
    data: {},
  },
  data() {
    return {
      titleContent: '',
      deviceType: '',
    }
  },
  deactivated() {
    // this.$parent.$options.swipeImgListce(2,1)
  },
  activated() {

    // this.$destroy()
    // this._render()
    // this.$forceUpdate()
  },
  mounted() {
  },
  watch: {
    data: function(newVal, oldVal) {
      this.titleContent = newVal.title.titleContent;
    }
  },
  methods: {

    jumpDetail(id){
			if (id.indexOf('?') != -1) {
				if(window.Android){
					window.Android.intent(id+'&found_index=1')
				}else{
					window.location.href = id+'&found_index=1'
					}
				}else{
					if(window.Android){
					window.Android.intent(id+'?&found_index=1')
				}else{
					window.location.href = id+'?&found_index=1'
				}
			}
		}
  }
}
</script>
<style scoped>
.f-height {
  height: 2rem;
  width: 100%;
  background: #fff;
  padding-left: 6rem;
  line-height: 1.5rem;
}

.f-carousel {
  /*margin-top:5.8rem;*/
  width: 100%;
  height: 21rem;
  background: #F4F4F4;
}

.f-carousel img {
  height: 21rem;
  width: 100%;
}
</style>
<style scoped>
/* 轮播图样式 */

.mint-swipe-indicator {
  width: 15px !important;
  height: 15px  !important;
  background: #fff!important;
  opacity: 0!important;
  margin: 0!important;
  margin-right: 0.5rem!important;
}

.mint-swipe-indicators {
  display: none !important;
  -webkit-transform: translateX(-0%)!important;
  transform: translateX(-0%)!important;
}

.mint-swipe-indicators .is-active {
  background-color: #f9be00!important;
  /*background:url(../../assets/images/tab/icon.png) no-repeat 0 0;*/
}

.f-carousel div .mint-swipe-indicators {
  right: 1.5rem !important;
}

.mint-swipe-indicator .is-active {
  background-image: url(../../assets/images/tab/icon.png)
}



/* 轮播图样式 */
</style>