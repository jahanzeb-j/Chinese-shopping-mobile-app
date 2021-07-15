<template>
    <div class="setPassword" @click = "blurDelete()">
      <div class="setPassword-img clearfix">
        重置密码
        <img @click="back()" src="../../assets/images/returnFront.png" >
      </div>
      <div class="setPassword-line"></div>
      <!--<div class="setPassword-input">-->
        <div class="setPassword-input">
          <!--<div class="login-btn-time" @click="verificationTime()" v-bind:class="{ active1: verificationTime }">获取验证码</div>-->
          <div class="login-btn-time" v-show="!stop && ifRegister && !frequently" @click=startTimer>获取验证码</div>
          <div class="login-btn-time" v-show="!stop && ifRegister && frequently" @click=startTimer1>获取验证码</div>
          <div class="login-btn-time" v-show="!stop && !ifRegister" @click=tiShi>获取验证码</div>
          <div class="login-btn-time1" v-show="stop" >{{timer}}s</div>
          <img class="login-admin" v-if="clearNumber" @click="clearNumber1()" src="../../assets/images/clearNumber.png" >
          <img class="login-verification" v-if="clearNumber3" @click="clearNumber2()" src="../../assets/images/clearNumber.png" >

          <input type="text"  @focus = "focusDelete1()" placeholder="手机号" class="setPassword-input-admin" v-model="admin">
          <input type="text"  @focus = "focusDelete2();verifica()" placeholder="请输入验证码" class="setPassword-input-admin" v-model="verification">

        </div>
      <!--</div>-->
      <div class="login-btn1" @click="setPassword()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">下一步</div>
      <div class="login-btn"  v-show="!AlertChange" @click="Login1()" >下一步</div>
    </div>
</template>
<style scoped>

  .login-admin{
    position: absolute;
    top: 1.7rem;
    right: 0.8rem;
    width: 2rem;
    height: 2rem;
  }
  .login-verification{
    position: absolute;
    top: 7.2rem;
    right: 10rem;
    width: 2rem;
    height: 2rem;
  }
  .setPassword{
    width:100%;
    height:100%;
    background:#fff;
  }
  .setPassword-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .setPassword-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .setPassword-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .setPassword-input{
    width:92%;
    margin-left: 4%;
    position:relative;
  }
  .setPassword-input input{
    width:100%;
    height:5.5rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    background-color:transparent;
    FILTER: alpha(opacity=0); /*androd*/
    appearance:none;  /*下拉框去掉右侧图标*/
    -moz-appearance:none;
    -webkit-appearance:none;

  }
  .setPassword-input-admin{
    /*background: url("../../assets/images/密码-icon.png") no-repeat 10px ;*/
    border-bottom:1px solid #acacac;
    width: 1.1rem;
    height: 1.5rem;
  }
  .setPassword-input-psd{
    border-bottom:1px solid #acacac;
    /*background: url("../../assets/images/手机-icon.png") no-repeat 10px;*/
    width: 1.1rem;
    height: 1.5rem;
  }
  .active{
    background:#f9be00;
  }
  .login-btn {
    width: 92%;
    height: 4.4rem;
    background: #d8d8d8;
    font-size: 1.7rem;
    color: #fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.4rem;
    margin-left: 4%;
    margin-top: 3.5rem;
    border-radius: 0.2rem;
  }
  .login-btn1 {
    width: 92%;
    height: 4.4rem;
    background: #f9be00;
    font-size: 1.7rem;
    color: #fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.4rem;
    margin-left: 4%;
    margin-top: 3.5rem;
    border-radius: 0.2rem;
  }
  /*.login-btn-time {*/
    /*!*padding: 0 0.5rem;*!*/
    /*height: 2.5rem;*/
    /*float: right;*/
    /*border: 1px solid #f9be00;*/
    /*background: #fff;*/
    /*border-radius: 0.4rem;*/
    /*color: #f9be00;*/
    /*line-height: 2.5rem;*/
    /*font-size: 1.4rem;*/
    /*position: absolute;*/
    /*right: 0;*/
    /*top:1rem;*/
    /*width: 8rem;*/
    /*text-align: center;*/
  /*}*/
  .login-btn-time{
    /*padding: 0 1rem;*/
    height: 3rem;
    float: right;
    /*border: 0.1rem solid #f9be00;*/
    /*background:#fff;*/
    border-radius: 0.4rem;
    color: #f9be00;
    line-height: 3rem;
    font-size: 1.4rem;
    position: absolute;
    right: 0;
    width: 8rem;
    text-align: center;
    top:6.8rem;
  }
  .login-btn-time1{
    /*padding: 0 1rem;*/
    height: 3rem;
    width: 6rem;
    float: right;
    /*border: 1px solid #acacac;*/
    /*background:#fff;*/
    border-radius: 0.4rem;
    color: #acacac;
    line-height: 3rem;
    font-size: 1.4rem;
    position: absolute;
    right: 0;
    text-align: center;
    margin-top: 6.8rem;
    width: 8rem;
    text-align: center;
  }
</style>
<script>
  import { Toast } from 'mint-ui';
  import { encrypt } from 'util'
  import Vue from 'vue'
  export default {
    name: 'setPassword',
    data () {
      return {
        timer: 60,       //默认倒数30秒
        stop : false,   //默认是停止的，但界面加载之后会变成false
        Interval:null,
        ifRegister:false,
        isText:false,
        isPsd:true,
        loginpwd:'',
        admin:'',
        verification:'',
        loginAlert:false,
        AlertChange:false,
        numberTime:0,
        frequently:false,
        newTime1:'',
        newTime2:'',
        newTime3:'',
        newTime4:'',
        clearNumber:false,
        clearNumber3:false,
        acb1:'',
        acb2:'',
      }
    },
    mounted(){

    },
    watch: {

      admin: function () {
        if(this.admin.length == 11){
          let url = HOST_HDPUSER+'/user/verifyPhoneNum';
//        let param = this.pageParams.page ? this.pageParams.page : null;
          this.loginCode= window.localStorage.getItem('loginCode');
//          if(this.loginCode == ""){
          this.$resource(url).get({phoneNum:this.admin}).then((response) => {
            if (response.status == 200) {
          console.log(response)
            if(response.data.code == 100){
              this.ifRegister = true;
            }else if(response.data.code == 200){
              Toast({
                message: '该用户不是网库用户',
                duration: 3000,
                className: "toast"
              });
            }
            else{

            }

//          this.checkboxData = response.body
          }
        })
//          }
        }
        if(this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//             this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.admin !=""){
          this.clearNumber = true;
        }else{
          this.clearNumber = false;
        }
      },
      verification: function () {
        if(this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.verification !=""){
          this.clearNumber3 = true;
        }else{
          this.clearNumber3 = false;
        }
      }
    },
    methods:{
      //获取焦点执行函数
      focusDelete1: function () {
        this.acd1 = 1
        if(this.admin){
          this.clearNumber = true
        }

      },
      focusDelete2: function () {
        this.acd2 = 2
        if(this.verification){
          this.clearNumber3 = true
        }
      },
      //失去焦点执行函数
      blurDelete: function () {
        this.clearNumber = false
        this.clearNumber3 = false
        if(this.acd1 == 1 && this.admin){
          this.clearNumber = true
        }
        if(this.acd2 == 2 && this.verification){
          this.clearNumber3 = true
        }
        this.acd1 = ''
        this.acd2 = ''
      },
      clearNumber1: function () {
        this.admin = ''
      },
      clearNumber2: function () {
        this.verification = ''
      },
      Login1:function(event){
        if(this.admin.length != 11 && this.admin.length != '') {
          Toast({
            message: '请输入正确手机号',
            duration: 3000,
            className: "toast"
          });
        }else if (this.admin.length == ''){
          Toast({
            message: '请输入手机号',
            duration: 3000,
            className: "toast"
          });
        }else if (this.verification.length == ''){
          Toast({
            message: '请输入验证码',
            duration: 3000,
            className: "toast"
          });
        }
//        window.localStorage.setItem('token',tokens);
      },
      verifica: function () {
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
        let flag = reg.test(this.admin); //true
        if(this.admin == ""){
          Toast({
            message: '请输入手机号',
            duration: 3000,
            className: "toast"
          });
        }
        else if(!flag){
          Toast({
            message: '请输入正确手机号',
            duration: 3000,
            className: "toast"
          });
        }

      },
      setPassword: function () {

        //验证码检查接口
        let url = HOST_HDPUSER+'/user/verifyCode';
//        let param = this.pageParams.page ? this.pageParams.page : null;
        this.loginCode= window.localStorage.getItem('loginCode');
//          if(this.loginCode == ""){
        this.$resource(url).get({phonenum:this.admin,code:this.verification}).then((response) => {
          if (response.status == 200) {
//          console.log(response.code)
          if(response.data.code == 200){
            window.localStorage.setItem('codeForget',this.verification);
            window.localStorage.setItem('numberForget',this.admin);
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'setPasswordForget'
          }else{
            Toast({
              message: response.data.message,
              duration: 3000,
              className:"toast"
            });
          }

        }
      })
//          }

        //验证码检查接口


//        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'setPassword'
      },
      back: function () {
        var loginBack = this.$route.query.onLine
        if(loginBack==1){
          window.history.go(-3)
        }else{
          window.history.back();
        }
//        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"login"



//        var loginBack = this.$route.query.loginBack
//        if(loginBack=="001"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=001'
//        }else if(loginBack=="002"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=002'
//        }else if(loginBack=="003"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) +'login?loginBack=003'
//        }
//        else if(loginBack=="004"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=004'
//        }
//        else if(loginBack=="005"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=005'
//        }
//        else if(loginBack=="010"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=010'
//        }
//        else if(loginBack=="011"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=011'
//        }
//        else if(loginBack=="013"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=013'
//        }
//        else if(loginBack=="100"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=100'
//        }
//        else if(loginBack=="013"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=013'
//        }
//        else if(loginBack=="110"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=110'
//        }
//        else if(loginBack=="120"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=120'
//        }
//        else if(loginBack=="130"){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=130'
//        }
//        else if(loginBack==undefined){
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?'
//        }
      },
      update () {
        if(this.timer <= 0)
        {

          this.timer = 60;
          clearInterval(this.Interval);
          this.stop = false
        }
        else{
          this.timer--;
        }

      },
      startTimer () {
        let _this = this
        _this.numberTime++
        console.log(_this.numberTime)
        if(_this.numberTime == 1){
          _this.newTime1 =  new Date();
        }
        if(_this.numberTime == 2){
          _this.newTime2 =  new Date();
          if(_this.newTime1.getTime()+300000< _this.newTime2.getTime()){
            _this.frequently = false
            _this.numberTime = 0
          }else{
//              _this.frequently = true
          }

        }
        if(_this.numberTime == 3){
          _this.newTime3 =  new Date();
          if(_this.newTime1.getTime()+300000< _this.newTime3.getTime()){
            _this.frequently = false
            _this.numberTime = 0
          }else{
//            _this.frequently = true
          }
          _this.frequently = true
        }
        if(_this.numberTime == 4){
          _this.frequently = true
//          _this.numberTime = 0
        }




        //如果是false就开始倒计时，如果是true就停止倒计时
        this.stop = true
        if(this.stop == true)
        {
          this.Interval = setInterval(this.update,1000);
        }
        else
        {
          clearInterval(this.Interval);
        }

        this.timer = this.timer


        let key,paramEncrypt  = encrypt('2016091011111990', '1234567890123456', this.admin)
        
        Vue.http.interceptors.push((request, next) => {
            request.headers.set('digest', paramEncrypt);
            next((response) => {
                return response
            });
        });
        this.$http.post(HOST_HDPUSER+'/user/getToken')
        .then(response => {  
            key = response.body.respBody
          })
        .then(_ => {
            let phone_timeStamp = `${this.admin}_${new Date().getTime()}`
            let paramAndPhone = encrypt(key, '1234567890123456', phone_timeStamp)

            this.$resource(HOST_HDPUSER+'/user/sendEncryptedMessage').get({phoneNum:encodeURI(paramAndPhone)}).then((response) => {
                if (response.status == 200) {
                  console.log(response)
                  if(response.data.code == 200){

                  }else{
                    Toast({
                      message: response.data.message,
                      duration: 3000,
                      className:"toast"
                    });
                  }
              }
            })
        })

        

        //发送验证码接口

        this.loginCode= window.localStorage.getItem('loginCode');
        
      },
      startTimer1 () {
        let _this = this
        let backTime =  new Date();
        if((_this.newTime3.getTime()-_this.newTime1.getTime())+(backTime-_this.newTime3.getTime()) > 300000){
          _this.frequently = false
          _this.numberTime = 0
          _this.startTimer()
        }else{
          Toast({
            message: '操作频繁，5分钟之内点击3次',
            duration: 3000,
            className: "toast"
          });
          _this.frequently = true
        }
//        this.startTimer()
      },
      tiShi: function () {
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
        let flag = reg.test(this.admin); //true
        if(this.admin == ""){
          Toast({
            message: '请输入手机号',
            duration: 3000,
            className: "toast"
          });
        }
        else if(!flag){
          Toast({
            message: '请输入正确手机号',
            duration: 3000,
            className: "toast"
          });
        }
      }
    }
  }
</script>
