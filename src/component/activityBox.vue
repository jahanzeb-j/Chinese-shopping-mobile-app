<template>
   <div v-show="logoBoxShow" @touchmove.stop.prevent="()=>{return false}">
     <span class="mask"></span>
     <div class="logoBox">
       <span @click="jumpUrl" class="boxUrl"><img src="../assets/images/tanchuang.png"/></span>
       <span class="close" @click="closeBox"><img src="../assets/images/tanchuangClose.png"/>></span>
     </div>
   </div>

</template>
<script>
  export default {
    name:"activityBox",
    data(){
      return {
       logoBoxShow:""
      }
    },
    created(){
      let show=window.sessionStorage.getItem("isShowedBox")
      if(show){
        this.logoBoxShow=false
      }else{
        this.logoBoxShow=true
      }
    },
    methods: {
     closeBox(){
       this.logoBoxShow=false
       window.sessionStorage.setItem("isShowedBox",true)
     },
     jumpUrl(){
      window.sessionStorage.setItem("isShowedBox",true)
      window.location.href="http://zt.99114.com/yw/2017zt/cs/dacuyd/index.html"
     } 
    }
  }
</script>
<style scoped>
.mask{
  position: absolute;
  width:100%;
  height:100%;
  left:0;
  bottom:0;
  background-color:#000;
  opacity:0.6;
  z-index: 1155;
}
.logoBox{
  position: fixed;
  left:50%;
  top:50%;
  margin-left:-14.875rem;
  margin-top:-16.8rem;
  width:29.75rem;
  z-index:1200;

}
.logoBox .boxUrl{
  display: block;
  width:29.75rem;
  
}
.logoBox .boxUrl img{
  width:100%;
  height:100%;
}
.close{
  display: block;
  width:3.5rem;
  height:3.5rem;
  margin-left:13.6rem;
}
.close img{
  width:100%;
  height:100%;
}
</style>
