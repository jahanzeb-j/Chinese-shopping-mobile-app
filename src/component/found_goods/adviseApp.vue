<template>
  <!--<div class="f-advise">-->
    <!--<div v-for="item in dataContent"><img @click="jumpDetail(item.contentLinkAddress)" :src="item.contentImgUrl"></div>-->
  <!--</div>-->
</template>
<script>
  import router from '../../router.js'
  export default {
    props: {
      data: {},
    },
    data (){
      return {
      }
    },
    computed:{
      dataContent:function(){
        return this.data.content && this.data.content.slice(0,2)
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
  .f-advise{
    /*display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items:center ;
    -webkit-align-items:center ;*/
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: hidden;
  }
  .f-advise div {
    float: left;
  }
  .f-advise div:nth-child(1){
    margin-left: .8rem;
    /*margin-right: .3rem;*/
  }
  .f-advise div:nth-child(2){
    margin-left: 1rem;
  }
  .f-advise img{
    height: 9.5rem;
    width: 17.45rem;
  }
</style>
