<template>
  <div class="tab-bottom">
    <img @click="back()" src="../assets/images/returnFront.png" >
    <div class="tab-bottom-item">
      <router-link  to="/collection" repalce>
        <span class="songti">商品</span>
      </router-link>
    </div>
    <!--<div class="tab-bottom-item" @click="checkLogin2">-->
    <div class="tab-bottom-item" >
      <router-link  to="/collection_exhibition" repalce>
        <span class="songti">展厅</span>
      </router-link>
    </div>
    <div class="tab-bottom-item">
      <router-link  to="/collection_theme" repalce >
        <span class="sp3 songti">主题</span>
      </router-link>
    </div>
    <!--<div class="edit" @click="goodsEdit()">主题</div>-->
  </div>

</template>

<script>
  export default {
    name: 'collectionTab',
    data(){
      return{
        isActive:true,
        loginCode: '',
        defaultActive: false,
        loginCode: ''
      }
    },
    created(){
      this.checkDefaultUrl()
    },
    methods: {
      //判断是否登录
      checkLogin(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            if (response.status == 200) {
            if(response.data.code<0){
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
            }else{
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
            }
          }
        })
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
        }
      },

      //判断是否登录
      checkLogin1(){

        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            if (response.status == 200) {
            if(response.data.code<0){
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=004"
            }else{
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "messageIndex"
            }
          }
        })
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=004"
        }

      },

      //判断是否登录
      checkLogin2(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "lookIndex"
        }
        else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=005"
        }
      },

      //判断默认进来的页面
      checkDefaultUrl(){
        let hash = window.location.hash
        hash = hash.split('/')[1]
        if( hash == '' ){
          this.defaultActive = true
        }
      },

      //商品编辑
      goodsEdit(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "goods_edit"
      },
      back(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
      }
    }
  }
</script>

<style scoped>

  .tab-bottom{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:4.2rem;
    border-bottom:1px solid #d6d6d6;
    z-index: 301;
    background:#fff;
    /*display:-webkit-flex;*/
    /*display:flex;*/
    /*justify-content: space-around;*/
    /*-webkit-justify-content: space-around;*/
    /*align-items: center;*/
    /*-webkit-align-items: center;*/
    padding: 0 1.3rem;
  }
  .edit{
    height: 4rem;
    line-height: 4rem;
    float: right;
    font-size: 1.4rem;
    color: #5c5c5c;
  }
  .tab-bottom img{
    float: left;
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    /*position: absolute;*/
    /*left: 1.2rem;*/
    margin-right: 8.5rem;
  }
  .tab-bottom-item{
    float: left;
    height:4rem;
    line-height: 4rem;
    margin-right: 2.9rem;
  }
  .tab-bottom-item a{
    height:4rem;
    line-height: 4rem;
    /*width:100%;*/
    /*display:-webkit-flex;*/
    /*display:flex;*/
    /*flex-direction: column;*/
    /*-webkit-flex-direction: column;*/
    /*justify-content: space-around;*/
    /*-webkit-justify-content: space-around;*/
    align-items: center;
    /*-webkit-align-items: center;*/
    font-size: 1.8rem;
    color: #adadad;
    display: block;
  }
  /*a:hover{*/
    /*color: #333;*/
    /*border-bottom: 0.2rem solid #333;*/
    /*height:4rem;*/
    /*line-height: 4rem;*/
    /*display: block;*/
  /*}*/
  .tab-bottom-item .active{
    color: #333;
    border-bottom: 0.2rem solid #333;
    height:4rem;
    line-height: 4rem;
    display: block;
  }
</style>
