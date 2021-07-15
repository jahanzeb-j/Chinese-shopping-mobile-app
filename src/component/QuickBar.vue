<template>
  <div class="quick-box" v-if="isShow">
    <!--<div class="quick-btn " @click="jump('publish_purchase')" v-if="purchase">
        <img src="../assets/images/tab/icon1.png" alt="">
      </div>-->
      <!--<div class="quick-btn" @click="backtop">
        <img src="../assets/images/tab/icon3.png" alt="">
        <i class="iconfont icon-jiantoushang1"></i>
      </div>-->
      <!--<div class="quick-btn " @click="jump('shopping')" v-if="purchase">
        <img src="../assets/images/tab/icon2.png" alt="">
      </div>-->
  </div>
</template>
<script>
  import { _isLogin } from '../util/api'
   export default{
    data(){
      return {
        isShow:true,
      }
  },
  name:'QuickBar',
  props: {
    purchase: {
      type: Boolean,
      default: false
    },
    shoppingBack:{
      type: String,
      default: ''
    }
  },
   mounted(){
    },
  methods:{
      async jump (path) {
        console.log(path)
        let router = {
          'shopping': {path: 'messageIndex', backCode: '130',query: {shoppingBack: this.shoppingBack}},
          // 'shopping': {path: 'shopping', backCode: '130',query: {}},
          // 'publish_purchase': {path: 'publish_purchase', backCode: '001',query:{releaseBack:'001'}},
          'publish_purchase': {path: 'publish_purchase', backCode: '001',query:{}},
        }
        let { loginStatus } = await _isLogin()
        if(loginStatus){
          this.$router.push({path: router[path].path,query: router[path].query})
          console.log(router[path].path)
        }else{
          this.$router.push({path: 'login',query: {shoppingBack: router[path].backCode}})
          // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=" + router[path].backCode
      console.log(router[path].path)  
      }
      },
       //  回到顶部
      // backtop(){
      //   document.body.scrollTop = 0
      //   document.documentElement.scrollTop = 0
      // },
     
  }
}
</script>
<style lang="less" scoped>
.quick-box{
  position: fixed;
  right: 0;
  width: 4.4rem;
  z-index: 200;
  margin-right: .8rem;
  bottom: 7.5rem;
  .quick-btn{
    height:3.8rem;
    width:3.8rem;
    margin-top:1rem;
    img {
      width:100%;
      height:100%;
    }
  }
}

</style>

