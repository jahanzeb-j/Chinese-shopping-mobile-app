<template>
  <div class="f_advise">
    <div class="advise_text">
      <div class="text1 fl">
        <!--<i class="iconfont icon-duihao"></i>-->
         <i>
          <img src="../../assets/images/icon/v.png" alt="">
        </i>
        <span>100%正品保证</span>
      </div>
      <div class="text2 fl">
        <!--<i class="iconfont icon-duihao"></i>-->
        <i>
          <img src="../../assets/images/icon/v.png" alt="">
        </i>
        <span>个性定制采购</span>
      </div>
      <div class="text3 fl">
        <!--<i class="iconfont icon-duihao"></i>-->
        <i>
          <img src="../../assets/images/icon/v.png" alt="">
        </i>
        <span>产地直供货源</span>
      </div>
    </div>
    <div class="advise_icon" v-show="adviseData.disabled == 1">
      <div class="icon1 fl"  @click="jumpTheme(item.contentLinkUrl,item.contentOperationType)" v-for='(item ,index) in adviseData' :key="index">
        <span>
          <i>
            <!-- <img src="../../assets/images/icon/icon1.png" alt="">-->
            <img :src="item.h5Icon" alt="">
          </i>
          <span>{{item.title}}</span>
        </span>
      </div>
      <div class="border"></div>
    </div>
    
    
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
        adviseData:'',
        content:''
      }
    },
    mounted(){
     
      
    },
    watch: {
      data: function (newVal, oldVal) {
        this.adviseData=newVal
        
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
      jumpTheme(url,type){
        if(type == 1){
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
</script>
<style scoped>

 .advise_text{
  height:3.5rem;
  line-height:3.5rem;
  border-bottom:1px solid #E2E2E2;
 }
 .advise_text div{
  width: 33.3333%;
 }
 
 .advise_text div span{
 	color: #666666;
 }
 .advise_text,.advise_icon div{
  font-size:1.2rem;
  font-family:PingFangSC-Regular;
  color:#333;
 }
  .advise_text div i{
    display:inline-block;
    width:1rem;
    height:1rem;
 }
 .advise_text div i img{
    width:100%;
    height:100%;
 }
 .advise_icon{
   height:8.7rem;
 }
 .advise_icon a{
   display: block;
   color:#333;
 }
.advise_icon div{
  width:25%;
}
.advise_icon div i{
  display:block;
  width: 2.8rem;
  height:2.8rem;
  margin:0 auto;
  margin-top:1.9rem;
  margin-bottom:0.75rem;
}
.advise_icon div i img{
  width: 2.8rem;
  height:2.8rem;
}
.border{
  width:37.45rem;
  height:1rem;
  background:rgba(244,244,244,1);
}
.coupon{
  height:9rem;
}
.advise_icon div i img{
  width: 3rem;
  height:3rem;
}
</style>