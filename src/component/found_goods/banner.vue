<template>
  <div class="f-banner" v-if="bannerData.disabled == 1">
    <div class="coupon" @click="jumpUrl(bannerData.contentLinkUrl,bannerData.contentOperationType)">
      <img :src='bannerData.contentImgUrl'/>    
    </div>
    <!--<div class="border"></div>-->
  </div>
</template>
<script>
  export default {
    props: {
      data: {},
    },
    data (){
      return {
        bannerData:''
      }
    },
    mounted(){

    },
    watch: {
      data: function (newVal, oldVal) {
        this.bannerData=newVal;
      }
    },
    methods: {
      jumpDetail(id){
        if (id.indexOf('?') != -1) {
        //          var u = navigator.userAgent
        //          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
        //            window.Android.intent(id+'&found_index=1')
        //            window.location.href = id+'&found_index=1'
        //          }else {//是IOS
        //            window.location.href = id+'&found_index=1'
        //          }
          window.location.href = id+'&found_index=1'
        }else{
        //          var u = navigator.userAgent
        //          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
        //            window.Android.intent(id+'&found_index=1')
        //            window.location.href = id+'&found_index=1'
        //          }else {//是IOS
        //            window.location.href = id+'&found_index=1'
        //          }
          window.location.href = id+'?&found_index=1'
        }
      },
      jumpUrl(url,type){
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
      }
      
    }
  }
</script>
<style scoped>
.border{
  width:37.45rem;
  height:1rem;
  background:rgba(244,244,244,1);
}
.coupon{
  width:100%;
  height:9rem;
}
.coupon img{
  height:100%;
  width:100%;
}


.img1{
	width: 2.2rem;
  height: 2.2rem;
}
</style>
