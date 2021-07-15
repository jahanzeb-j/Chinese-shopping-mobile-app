<template>
  <div class="account">
    <div class="account-img clearfix">
      账号管理
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="account-line"></div>
    <div class="myIndex_flow" @click="phone_change1()">
      <div class="myIndex_action_my">更改绑定手机号</div>
      <!-- <div class="myIndex_action_look2"><img src="../../assets/images/icon_go.png" ><span>{{mobile}}</span></div> -->
      <div class="myIndex_action_look2"><img src="../../assets/images/icon_go.png" ></div>
    </div>
    <div class="myIndex_flow" @click="number_change()">
      <div class="myIndex_action_my">修改登录密码</div>
      <div class="myIndex_action_look2"><img src="../../assets/images/icon_go.png" ></div>
    </div>
    <div v-if="isShow" class="myIndex_goBack" @click="outLogin()"><span class="loginOut">退出登录</span></div>
    <div v-if="!isShow" class="myIndex_goBack_code " ><span class="loginOut">退出登录</span></div>
  </div>
</template>

<style scoped>
  .account{
    width:100%;
    height:100%;
    background:#fff;
  }
  .account-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .account-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .account-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .myIndex_flow{
    height: 5.5rem;
    line-height: 5.5rem;
    border-bottom: 1px solid #d6d6d6;
  }
  .myIndex_action_my{
    color: #333333;
    font-size: 1.4rem;
    float: left;
    height: 5.5rem;
    line-height: 5.5rem;
    margin-left:4%;
  }
  .myIndex_action_look1{
    float: right;
    margin-right:4%;
    height: 4rem;
  }
  .myIndex_action_look1 img{
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    margin-top: 1rem;
  }
  .myIndex_action_look2 img{
    width: 0.8rem;
    margin-top: 2rem;
    float: right;
    margin-right:4%;
  }
  .myIndex_action_look2 span{
    float: right;
    font-size: 1.2rem;
    margin-right: 1rem;
    color: #bebebe;
    font-size: 1.4rem;
  }
  .myIndex_action_look3 span{
    float: right;
    font-size: 1.2rem;
    margin-right: 1rem;
    color: #bebebe;
    font-size: 1.4rem;
  }
  .myIndex_action_look4 span{
    float: right;

    width: 4.5rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 0.4rem;
    margin-top: 2rem;
    margin-right: 4%;

    font-size: 1.4rem;
  }
  .active{
    color: #f9be00;
    border: 1px solid #f9be00;
  }
  /* 退出登录按钮 */
  .myIndex_goBack{
    width: 100%;
    color: #333333;
    text-align: center;
    letter-spacing: 0.2rem;
   
    height: 4.4rem;
    margin-top:3.5rem;
   
  }
  .myIndex_goBack_code .loginOut{
    display: inline-block;
    /* padding:0rem 1.5rem; */
    width:34.5rem;
    margin:0 auto;
    height:100%;
    font-size: 1.7rem;
    line-height: 4.4rem;
    border:1px solid #d6d6d6;
    border-radius: 0.25rem;
    background:#d6d6d6;
    margin-top:2rem;
  }
  .myIndex_goBack .loginOut{
    display: inline-block;
    /* padding:0rem 1.5rem; */
    width:34.5rem;
    margin:0 auto;
    height:100%;
    font-size: 1.7rem;
    line-height: 4.4rem;
    border:1px solid #d6d6d6;
    border-radius: 0.25rem;
    background:#FFD85A;
  }
</style>
<script>
  import { MessageBox } from 'mint-ui';
  export default{
    name: 'account',
    data () {
      return {
        AlertChange:false,
        mobile:'',
        loginCode1:'',
        isShow:false,
      }
    },
    mounted () {
      this.getLi()
      this.loginCode1=window.localStorage.getItem('loginCode');
      // console.log(this.loginCode1);
      if(this.loginCode1!=''&&this.loginCode1!=null&&this.loginCode1!=undefined){
        this.isShow=true;
      }
    },
    methods:{
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"myIndex"
      },
      getLi: function () {
        this.mobile= window.localStorage.getItem('mobile').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
      phone_change1: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"phone_change1"
      },
      number_change: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"forgetPassword1"
      },
      outLogin: function () {
        MessageBox.confirm('确定要退出登录吗？').then(action => {
          window.localStorage.clear();
          // window.location.reload();
          if(window.Android) {
              // console.log('anzhuo')
          		window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex")
          }else{
            // console.log('ios')
       		  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
						  // this.$router.go(-1)
          }
          window.location.reload();
        });
      },
    }

  }
</script>


