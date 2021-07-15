<template>
  <div class="tplLoginPwd">
    <div class="tplLogin-img clearfix">
      绑定好单品账号
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="tplLogin-line"></div>
    <div class="register-input">
      <input type="password" placeholder="设置登录密码 （6-20位字母数字组合）" class="register-input-psd" minlength="8" maxlength="16" @focus="verifica()" v-model="loginpwd" >
    </div>
    <div class="register-protocol" >
      <span class="register-protocol-agree">点击绑定手机号，表示您已同意</span><span class="register-protocol-aa" @click="protocol()">《网库好单品用户使用协议》</span>
    </div>
    <div class="login-btn" @click="Login()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">完成</div>
    <div class="login-btn" v-show="!AlertChange" @click="Login1()">完成</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  export default {
    name: 'tplLoginPwd',
    data () {
      return {
        loginpwd:'',
        loginAlert:false,
        AlertChange:false,
        checked:true,
        loginCode:'',
        jumpPage:'',
        mobileCode:'',
        mobile:'',
        loginBack:'',
        loginUrl:''
      }
    },
    watch: {
      loginpwd: function () {
        if(this.loginpwd !="" ){
          this.AlertChange = true;
        }else{
          this.AlertChange = false;
        }
      },
      verification: function () {
        if(this.loginpwd !=""){
          this.AlertChange = true;
        }else{
          this.AlertChange = false;
        }
      },
    },
    mounted(){

    },
    methods:{
      Login: function () {
            //注册接口
            let url = HOST_HDPUSER+'/weixin/registerUser';
            this.mobile= window.localStorage.getItem('mobile');
            this.mobileCode= window.localStorage.getItem('mobileCode');
            this.authCode= window.localStorage.getItem('authCode');
            this.$resource(url).get({mobile:this.mobile,mobileCode:this.mobileCode,passWord:this.loginpwd,authCode:this.authCode}).then((response) => {
            	console.log(response)
                // console.log("ddd");
                // console.log(response);
                if(response.body.code == -100){
                    Toast({
                        message: response.body.message,
                        duration: 3000,
                        className:"toast"
                    });
                }
                else if(response.body.code == 500){
                    Toast({
                      message: "系统内部错误，请直接通过账号密码登录",
                      duration: 3000,
                      className:"toast"
                    });
                    setTimeout("window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'",3000)
                }
                else if (response.body.code == 200) {
                  window.localStorage.setItem('passWord',this.loginpwd);
                  window.localStorage.setItem('loginCode',response.body.respBody.loginCode);
                  window.localStorage.setItem('userId',response.body.respBody.userId);
                  window.localStorage.setItem('account',response.body.respBody.account);
                  window.localStorage.setItem('userName',response.body.respBody.userName);
                  window.localStorage.setItem('mobile',response.body.respBody.mobile);
                  this.loginUrl= window.localStorage.getItem('loginUrl');
                  this.loginBack= window.localStorage.getItem('loginBack');
                  let loginBack = this.loginBack;
                  if(loginBack=="001"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'publish_purchase?releaseBack=001&'+this.loginUrl
                  }else if(loginBack=="002"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?'+this.loginUrl
                  }else if(loginBack=="003"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'themeIndex?'+this.loginUrl
                  }
                  else if(loginBack=="004"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?'+this.loginUrl
                  }
                  else if(loginBack=="005"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex?'+this.loginUrl
                  }
                  else if(loginBack=="010"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.loginUrl
                  }
                  else if(loginBack=="011"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                  }
                  else if(loginBack=="012"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                  }
                  else if(loginBack=="013"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                  }
                  //主题留言
                  else if(loginBack=="100"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.loginUrl
                  }
                  //预约展厅
                  else if(loginBack=="110"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?'+this.loginUrl
                  }
                  //详情购物车登录
                  else if(loginBack=="120"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shopping=2&'+this.loginUrl
                  }
                  //找货购物车登录
                  else if(loginBack=="130"){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shoppingBack=004&'+this.loginUrl
                  }
                  else if(loginBack==undefined){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?'+this.loginUrl
                  }
                }
            })
            //验证码检查接口
        },
      Login1:function(event){
        if (this.loginpwd.length == ''){
          Toast({
            message: '请输入密码',
            duration: 3000,
            className: "toast"
          });
        }
      },
      verifica: function () {
        let reg = /^1[3|4|5|7|8|9][0-9]{9}$/; //验证规则
        let flag = reg.test(this.admin); //true
      },
      protocol: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol'
        window.localStorage.setItem('jumpPage',1);
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+'tplLogin'
      },
    }
  }
</script>
<style>
  .toast {
    position: fixed;
    /*max-width: 80%;*/
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    width: 60%;
    /*padding:0 10rem;*/
    height: 5.1rem!important;
    line-height: 4.1rem!important;
  }
  .mint-toast-text {
    font-size: 1.2rem !important;
    display: block;
    text-align: center;
    width:100%;
    font-size: 1.2rem;
    text-align: center;
    /*margin-top:1.3rem;*/
  }
</style>
<style scoped>
  .tplLoginPwd{
    width:100%;
    height:100%;
    background:#fff;
  }
  .tplLogin-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .tplLogin-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .tplLogin-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .register-input{
    width:95.7%;
    margin-left: 2.15%;
    margin-top:2rem;
    position:relative;
  }
  .register-input input{
    width:100%;
    height:5.4rem;
    padding-left:1rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    -ms-flex-pack: justify;
    -webkit-flex-pack: justify;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -ms-flex-align: center;
    -webkit-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
  }
  .register-protocol{
    text-align: left;
    margin-left: 1.8rem;
    margin-top: 1.2rem;
    color: #cd141c;
    font-size: 1.1rem;
  }
  .register-input-psd{
    border-bottom:1px solid #acacac;
    /*background: url("../../assets/images/手机-icon.png") no-repeat 10px;*/
    width: 1.1rem;
    height: 1.5rem;
  }
  .register-protocol-aa{
    font-size: 1.1rem;
    color: #cd141c;
  }
  .register-protocol-agree{
    font-size: 1.1rem;
    color: #333;
    margin: 0 0.5rem 0 0;
  }
  .login-btn{
    width:95.7%;
    height:4.3rem;
    background:#f9be00;
    font-size:1.7rem;
    color:#fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.3rem;
    margin-left:2.15%;
    margin-top:3.5rem;
    border-radius: 0.2rem;
  }
</style>
