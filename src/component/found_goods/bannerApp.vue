<template>
  <div class="f-banner">
    <!--<img src="../../assets/images/temp5.png" alt="">-->
    <img  @click=jumpDetail(data.contentLinkAddress) :src="data.contentImgUrl" alt="">
  </div>
</template>
<script>
  export default {
    props: {
      data: {},
    },
    data (){
      return {
      }
    },
    methods: {
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
  .f-banner{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items:center ;
    -webkit-align-items:center ;
    width: 100%;
    height: 12.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .f-banner img{
    width: 100%;
    height: 100%;
  }
</style>
