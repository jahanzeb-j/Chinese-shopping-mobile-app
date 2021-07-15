<template>
  <div class="setPassword">
    <div class="setPassword-img clearfix">
      重置密码
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="setPassword-line"></div>
      <div class="setPassword-input">
        <div class="login-btn-time" v-show="!stop && !ifRegister" @click=startTimer>获取验证码</div>
        <div class="login-btn-time1" v-show="stop" >{{timer}}s</div>
        <div class="setPassword-input-admin">{{admin}}</div>
        <!-- <input type="text" placeholder="请输入验证码" class="setPassword-input-admin" v-model="verification" @focus="verifica"> -->
        <input type="text" placeholder="请输入验证码" class="setPassword-input-admin" v-model="verification" >
        <img class="login-admin" v-if="clearNum" @click="clearNumber1()" src="../../assets/images/clearNumber.png" >
      </div>
    <div class="login-btn1" @click="setPassword()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">下一步</div>
    <div class="login-btn"  v-show="!AlertChange" @click="Login1()" >下一步</div>
  </div>
</template>
<style scoped>

  .login-admin{
    position: absolute;
    top: 7.3rem;
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
  .setPassword-input .setPassword-input-admin{
    width:100%;
    height:5.5rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    text-align: left;
    line-height: 5.5rem;
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
    margin-top: 2.5rem;
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
    margin-top: 2.5rem;
    border-radius: 0.2rem;
  }
  .login-btn-time{
    height: 2.5rem;
    float: right;
    /*border: 1px solid #f9be00;*/
    /*background: #fff;*/
    border-radius: 0.4rem;
    color: #f9be00;
    line-height: 2.5rem;
    font-size: 1.4rem;
    position: absolute;
    right: 0;
    top:7rem;
    width: 8rem;
    text-align: center;
  }
  .login-btn-time1{
    height: 2.5rem;
    float: right;
    /*border: 1px solid #d8d8d8;*/
    /*background: #f4f4f4;*/
    border-radius: 0.4rem;
    color: #858585;
    line-height: 2.5rem;
    font-size: 1.4rem;
    position: absolute;
    right: 0;
    top:7rem;
    width: 8rem;
    text-align: center;
  }
</style>
<script>
  import { Toast } from 'mint-ui'
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
        clearNum:false,
      }
    },
    watch: {
      verification: function () {
        if(this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.verification !=""){
          this.clearNum = true;
        }else{
          this.clearNum = false;
        }
      }
    },
    mounted () {
      this.getIphone()

    },
    //回显手机号

    methods:{
      clearNumber1: function () {
        this.verification = ''
      },
      getIphone: function () {
        this.admin= window.localStorage.getItem('mobile').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
      Login1:function(event){
//        if(this.admin.length != 11 && this.admin.length != '') {
//          Toast({
//            message: '请输入正确手机号',
//            duration: 3000,
//            className: "toast"
//          });
//        }else if (this.admin.length == ''){
//          Toast({
//            message: '请输入手机号',
//            duration: 3000,
//            className: "toast"
//          });
//        }else
      if (this.verification.length == ''){
          Toast({
            message: '请输入验证码',
            duration: 3000,
            className: "toast"
          });
        }
//        window.localStorage.setItem('token',tokens);
      },
//      verifica: function () {
//        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
//        let flag = reg.test(this.admin); //true
//        if(this.admin == ""){
//          Toast({
//            message: '请输入手机号',
//            duration: 3000,
//            className: "toast"
//          });
//        }
//        else if(!flag){
//          Toast({
//            message: '请输入正确手机号',
//            duration: 3000,
//            className: "toast"
//          });
//        }
//
//      },
      setPassword: function () {

        //验证码检查接口
        let url = HOST_HDPUSER+'/user/verifyCode';
//        let param = this.pageParams.page ? this.pageParams.page : null;
        this.loginCode= window.localStorage.getItem('loginCode');
//          if(this.loginCode == ""){
        this.$resource(url).get({phonenum:window.localStorage.getItem('mobile'),code:this.verification}).then((response) => {
          if (response.status == 200) {
//          console.log(response.code)
          if(response.data.code == 200){
            window.localStorage.setItem('codeForget',this.verification);
            window.localStorage.setItem('numberForget',window.localStorage.getItem('mobile'));
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'setPassword'
          }else{
            Toast({
              message: response.data.message,
              duration: 3000,
              className:"toast"
            });
          }

//          this.checkboxData = response.body
        }
      })
//          }

        //验证码检查接口


//        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'setPassword'
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"account"
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

        this.admin = window.localStorage.getItem('mobile')
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
        
//          }


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
