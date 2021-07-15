<template>
  <div class="f-header">
    <div class="f-header-left" @click="showSidebar">
      <!--<img src="../../assets/images/menu-icon.png" alt="" style="width: 60%;">-->
      分类
    </div>
    <div class="f-header-center">首页</div>
    <div class="f-header-right" @click="checkLogin">求购</div>
   
  </div>

</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
      }
    },
    methods:{
      showSidebar() {
//        $(document.body).css({
//          "overflow-x":"hidden",
//          "overflow-y":"hidden"
//        });
        this.$emit('showSidebarPT')
      },
      //判断是否登录
      checkLogin(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        
        if(this.loginCode != "" && this.loginCode != null){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "publish_purchase?releaseBack=001"
        }
        else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=001"
        }
      }
    }
  }
</script>
<style scoped>
  .f-header{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items:center ;
    -webkit-align-items:center ;
    height: 3.9rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 1111;
    width: 100%;
  }

  .f-header-left{
    font-size: 1.5rem;
    color: #333;
    padding-right: .3rem;
  }
  .f-header-center{
    font-size: 1.8rem;
  }
  .f-header-right{
    font-size: 1.5rem;
    color: #333;
    padding-right: .3rem;
  }
  a{
    display: block;overflow: hidden;
  }
</style>
