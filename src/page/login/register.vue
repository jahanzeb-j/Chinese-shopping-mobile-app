<template>
    <div class="register" @click = "blurDelete()">

      <div class="register-img clearfix">
        注册
        <img @click="back()" src="../../assets/images/returnFront.png" >
      </div>
      <div class="register-line"></div>
      <!--<div class="register-input">-->
        <div  class="register-input">



          <!--<div class="login-btn-time" v-show="!fetchCodeMsg" v-model="timerCodeMsg">60</div>-->
          <div class="around-input">
              <input type="tel"  @focus="focusDelete1()" @blur="telBlur" placeholder="手机号" class="register-input-admin" v-model="admin">
              <span v-show="clearNum1" @click="clearNumber1()"><img class="login-admin1"  src="../../assets/images/clearNumber.png" ></span>
          </div>
          <div class="around-input">
              <input type="tel" @blur = "verifica()" @focus = "focusDelete2()" placeholder="验证码" class="register-input-admin" v-model="verification">
              <span v-show="clearNum2" @click="clearNumber2()" class="clearNumber2"><img class="login-admin2"  src="../../assets/images/clearNumber.png" ></span>
              <strong class="login-btn-time" v-show="!stop && ifRegister && !frequently" @click='startTimer'>获取验证码</strong>
              <strong class="login-btn-time" v-show="!stop && ifRegister && frequently" @click='startTimer1'>获取验证码</strong>
              <strong class="login-btn-time" v-show="!stop && !ifRegister" @click='tiShi'>获取验证码</strong>
              <strong class="login-btn-time1" v-show="stop" >{{timer}}s</strong>
          </div>
          <div class="around-input">
              <input type="password" @blur = "verifica()" @focus = "focusDelete3();" v-if="!isPsd1" placeholder="密码（6-20位字母数字组合）" class="register-input-psd" minlength="8" maxlength="16" v-model="loginpwd" >
              <input type="text" @blur = "verifica()" @focus = "focusDelete3();" v-if="isPsd1" placeholder="密码（6-20位字母数字组合）" class="register-input-psd" minlength="8" maxlength="16" v-model="loginpwd" >
              <span v-show="clearNum3" @click="clearNumber3()" class="clearNumber3"><img class="login-admin3"  src="../../assets/images/clearNumber.png" ></span>
              <span v-show="showPw1"  @click="showPword1()" class="showPwd1"><img class="password-img1"   src="../../assets/images/showPassword.png" ></span>
              <span v-show="!showPw1" @click="showPword2()" class="showPwd2"><img class="password-img1"   src="../../assets/images/hidePassword.png" ></span>
          </div>
        </div>
      <!--</div>-->
        <div class="register-protocol" >
          <!--<input type="checkbox" id="checkbox" name="Sex" value="male" v-model="checked"/>-->
          <!--<div class="option"></div>-->
          <img  src="../../assets/images/agree.png" >
          <span class="register-protocol-agree">注册代表你已经同意</span><span class="register-protocol-aa" @click="protocol()">用户协议</span>
        </div>
      <div class="login-btn" @click="Login()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">注册</div>
      <div class="login-btn" v-show="!AlertChange" @click="Login1()">注册</div>
    </div>
</template>
<style scoped>
  .login-admin1{
    position: absolute;
    top: 1.7rem;
    right: .8rem;
    width: 2rem;
    height: 2rem;
  }
  .login-admin2{
    position: absolute;
    top: 2rem;
    /* // right: 10rem; */
    width: 2rem;
    height: 2rem;
  }
  .login-admin3{
    position: absolute;
    top: 2rem;
    /* right: rem; */
    width: 2rem;
    height: 2rem;
  }
  .password-img1{
    position: absolute;
    top: 2rem;
    right: 0.8rem;
    width: 3rem;
    height: 2rem;
  }
  .showPwd1{
    position: absolute;
    top: 0rem;
    right:0.8rem;

  }
  .showPwd2{
    position: absolute;
    top: 0rem;
    right:0.8rem;

  }
  .login-verification{
    position: absolute;
    top: 7.2rem;
    right: 4.8rem;
  }
  .register-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:0.1rem solid #d8d8d8;
  }
  .login-btn{
    width:92%;
    height:4.4rem;
    background:#d8d8d8;
    font-size:1.7rem;
    color:#fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.4rem;
    margin-left:4%;
    margin-top:3.5rem;
    border-radius: 0.2rem;
  }
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
    top: 0rem;
    right: 0;
    width: 8rem;
    text-align: center;
    margin-top: 1rem;
  }
  .register-input .login-btn-time1{
    height: 3rem;
    float: right;
    /*border: 0.1rem solid #d8d8d8;*/
    /*background:#f4f4f4;*/
    border-radius: 0.4rem;
    color: #858585;
    line-height: 3rem;
    font-size: 1.4rem;
    position: absolute;
    top: 0rem;
    right: 0;
    width: 8rem;
    text-align: center;
    margin-top: 1rem;
  }
  .register{
    width:100%;
    height:100%;
    background:#fff;
  }
  .register-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .register-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .register-protocol{
    text-align: center;
    margin-top: 1.2rem;
    color: #cd141c;
    font-size: 1.1rem;
    height: 3rem;
    line-height: 3rem;
    position:relative;
   /*  // display: flex;
    // justify-content: center;
    // align-items: center; */
    /*background: url("../../assets/images/protocal.png") ;*/
  }
  .register-protocol .option{
    width: 1.5rem;
    height: 1.5rem;
    background-size: cover;
    background: url("../../assets/images/nocc.png") no-repeat;
    background-size: cover;
    display: inline-block;
    float: left;
    margin-left: 2.4rem;
    margin-top: 0.7rem;
  }
  .register-protocol input[type="checkbox"] {  /*为了保险起见，把原生样式隐藏掉*/
    display: inline-block ;
    width: 0.2rem;
    height: 0.2rem;
    /*margin-right: 15px ;*/
    opacity: 0 ;

    }
  input[type="checkbox"]:checked+div {  /*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
    background: url("../../assets/images/protocal.png") no-repeat;
    background-size: cover;
    }
  .register-protocol .register-protocol-aa{
    font-size: 1.3rem;
    color: #F9BE00;
  }
  .register-protocol .register-protocol-agree{
    font-size: 1.3rem;
    color: #adadad;
    margin: 0 0.5rem 0 0.5rem;
  }
  .register-protocol img {
    width: 1.5rem;
    height: 1.5rem;
    float: left;
    position:absolute;
    left:8.5rem;
    top:0.8rem;
  }
  .register-input{
    width:92%;
    margin-left: 4%;
    position:relative;

  }
  .register-input input{
    width:85%;
    height:5.5rem;
   /*padding-left:1.4rem; */
    font-size: 1.4rem !important;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    /*line-height: 5.5rem;*/
    float:left;
  }
  .around-input{
    height:5.5rem;
    border-bottom:0.1rem solid #acacac;
    position:relative;
  }
  .around-input span{
    float:left;
    width:15%;
    height:100%;
  }
  .around-input .clearNumber2{
    position:absolute;
    right:8rem;
    top:0;
    height:100%;
  }
  .around-input .clearNumber3{
    position:absolute;
    right:8rem;
    top:0;
    height:100%;
  }
  .register-input-admin{
    /*background: url("../../assets/images/密码-icon.png") no-repeat 10px ;*/

    width: 1.1rem;
    height: 1.5rem;
  }
  .register-input-psd{
    /*border-bottom:0.1rem solid #acacac;*/
    /*background: url("../../assets/images/手机-icon.png") no-repeat 10px;*/
    width: 1.1rem;
    height: 1.5rem;
  }
  .active{
    background:#f9be00;
  }
  .active1{
    /*width: 60px;*/
    padding: 0 1rem;
    height: 3rem;
    float: right;
    border: 0.1rem solid #d8d8d8;
    background: #f4f4f4;
    border-radius: 0.4rem;
    color: #868686;
    line-height: 3rem;
    font-size: 1.4rem;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
  import { encrypt } from 'util'
  import Vue from 'vue'

  export default {
//    components: {
//      buttonLogin
//    },
    name: 'register',
    data () {
      return {
        timer: 60,       //默认倒数30秒
        stop : false,   //默认是停止的，但界面加载之后会变成false
        Interval:null,  //setInterval的对象
        loginpwd:'',
        admin:'',
        loginAlert:false,
        AlertChange:false,
        verification:'',
        checked:true,
        loginCode:'',
        phoneNumber:'',
        ifRegister:false,
        numberTime:0,
        frequently:false,
        newTime1:'',
        newTime2:'',
        newTime3:'',
        newTime4:'',
        clearNum1:false,
        clearNum2:false,
        clearNum3:false,
        showPw1:false,
        isPsd1:false,
        acb1:'',
        acb2:'',
        acb3:'',

      }
    },
    mounted(){
        this.admin = window.localStorage.getItem('p_admin')||''
        this.verification = window.localStorage.getItem('p_verification')||''
        this.loginpwd = window.localStorage.getItem('p_loginpwd')||''
    },
    watch: {
      loginpwd: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !="" && this.checked == true ){
          this.AlertChange = true;
//             this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.loginpwd !=""){
          this.clearNum3 = true;
        }else{
          this.clearNum3 = false;
        }
      },
      admin: function () {
        if(this.admin.length == 11){
          let url = HOST_HDPUSER+'/user/verifyPhoneNum';
            //        let param = this.pageParams.page ? this.pageParams.page : null;
          this.loginCode= window.localStorage.getItem('loginCode');

            this.$resource(url).get({phoneNum:this.admin}).then((response) => {
              if (response.status == 200) {

              if(response.data.code == 200){
                this.ifRegister = true;
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

        }
        if(this.loginpwd !="" && this.admin !="" && this.verification !="" && this.checked == true){
          this.AlertChange = true;
          //          this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.admin !=""){
          this.clearNum1 = true;
        }else{
          this.clearNum1 = false;
        }
      },
      verification: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !="" && this.checked == true){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.verification !=""){
          this.clearNum2 = true;
        }else{
          this.clearNum2 = false;
        }
      },

      checked: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !="" && this.checked == true){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
      },
      timer: function () {
        this.timer;
      },

    },
    methods:{
      //获取焦点执行函数
      focusDelete1: function () {
        this.acd1 = 1
        if(this.admin){
          this.clearNum1 = true
        }

      },
      focusDelete2: function () {
        this.acd2 = 2
        if(this.verification){
          this.clearNum2 = true
        }
      },
      focusDelete3: function () {
        this.acd3 = 3
        if(this.loginpwd){
          this.clearNum3 = true
        }
      },
      // 自动去掉手机号空格
      telBlur(){
        this.admin = this.admin.replace(/\s+/g, '')
        this.admin = this.admin.replace(/-/g, '')
        this.admin = this.admin.replace(/[^0-9]/ig,'')
      },
      //失去焦点执行函数
      blurDelete: function () {
        this.clearNum1 = false
        this.clearNum2 = false
        this.clearNum3 = false
        if(this.acd1 == 1 && this.admin){
          this.clearNum1 = true
        }
        if(this.acd2 == 2 && this.verification){
          this.clearNum2 = true
        }
        if(this.acd3 == 3 && this.loginpwd){
          this.clearNum3 = true
        }
        this.acd1 = ''
        this.acd2 = ''
        this.acd3 = ''
      },
      showPword1: function () {
        this.isPsd1 = false
        this.showPw1 = !this.showPw1
      },
      showPword2: function () {
        this.isPsd1 = true
        this.showPw1 = !this.showPw1
      },
      clearNumber1: function () {
        this.admin = ''
      },
      clearNumber2: function () {
        this.verification = ''
      },
      clearNumber3: function () {
        this.loginpwd = ''
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
        }else if (this.loginpwd.length == '' && this.verification.length != ''  && this.admin.length != ''){
          Toast({
            message: '请输入密码',
            duration: 3000,
            className: "toast"
          });
        }
        else if (this.verification.length == ''){
          Toast({
            message: '请输入验证码',
            duration: 3000,
            className: "toast"
          });
        }
//        window.localStorage.setItem('token',tokens);
      },
      verifica: function () {
        let reg = /^1[345789]\d{9}$/; //验证规则/^1[34578]\d{9}$/,,,/^1[3|4|5|7|8][0-9]{9}$/
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
        else if(this.verification == ""){
          Toast({
            message: '请输入验证码',
            duration: 3000,
            className: "toast"
          });
        }
      },
      protocol: function () {
        window.localStorage.setItem('p_admin', this.admin)
        window.localStorage.setItem('p_verification', this.verification)
        window.localStorage.setItem('p_loginpwd', this.loginpwd)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol'
      },
      back: function () {
        var backProtocal = this.$route.query.backProtocal
        if(backProtocal ==1){
          window.history.go(-3)
        }else{
          window.history.back();
        }
//        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+'login'

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
      Login: function () {
        //验证码检查接口
          let url = HOST_HDPUSER+'/user/verifyCode';
          //        let param = this.pageParams.page ? this.pageParams.page : null;
          this.loginCode= window.localStorage.getItem('loginCode');
          //          if(this.loginCode == ""){
          this.$resource(url).get({phonenum:this.admin,code:this.verification}).then((response) => {
            if (response.status == 200) {
              //          console.log(response.code)
            if(response.data.code == 200){
              //注册接口
              let url = HOST_HDPUSER+'/user/registerUser';
              this.loginCode= window.localStorage.getItem('loginCode');
              // this.$resource(url).save({phoneNum:this.admin,code:this.verification,password:this.loginpwd}).then((response) => {
              //   if(response.status != 200){
              //     Toast({
              //       message: "当前网络不畅，请检查网络设置",
              //       duration: 2000,
              //       className:"toast"
              //       });
              //   }
              //   if (response.status == 200) {
              //     if(response.data.code == 200){
              //       window.localStorage.setItem('loginCode',response.data.respBody.loginCode)
              //       window.localStorage.setItem('userId', response.data.respBody.userId)
              //       window.localStorage.setItem('account', response.data.respBody.account)
              //       window.localStorage.setItem('mobile', response.data.respBody.mobile)
              //       window.localStorage.setItem('userName', response.data.respBody.account)
              //       if(this.$route.query.loginBack == '011'){
              //         this.$router.push({path:'good_detail',query:{commodityId:this.$route.query.commodityId, found_index:1}})
              //       }else{
              //         this.$router.push({path:'found_index'})
              //       }

              //     }else{
              //       Toast({
              //         message: response.data.message,
              //         duration: 2000,
              //         className:"toast"
              //       });
              //     }
              //   }
              // })
              //注册接口
              this.$api_post_no({
                url:url,
                data:{
                  phoneNum:this.admin,
                  code:this.verification,
                  password:this.loginpwd,
                  channelType:133
                }
              }).then(response =>{
                  // console.log(response)
                  if(response.code == 200){
                    window.localStorage.setItem('loginCode',response.respBody.loginCode)
                    window.localStorage.setItem('userId', response.respBody.userId)
                    window.localStorage.setItem('account', response.respBody.account)
                    window.localStorage.setItem('mobile', response.respBody.mobile)
                    window.localStorage.setItem('userName', response.respBody.account)
                    if(this.$route.query.loginBack == '011'){
                      this.$router.push({path:'good_detail',query:{commodityId:this.$route.query.commodityId, found_index:1}})
                    }else{
                      this.$router.push({path:'found_index'})
                    }

                  }else{
                    Toast({
                      message: response.message,
                      duration: 2000,
                      className:"toast"
                    });
                  }

              })
            }else{
              Toast({
                message: response.data.message,
                duration: 2000,
                className:"toast"
              });
            }


          }
        })


        //验证码检查接口
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
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
        let flag = reg.test(this.admin)
        if(!flag){
          this.$alert_msg('手机号格式有误')
          return
        }
        let _this = this
        _this.numberTime++
        // console.log(_this.numberTime)
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

        let key,paramEncrypt  = encrypt('2016091011111990', '1234567890123456', this.admin)

        Vue.http.interceptors.push((request, next) => {
            request.headers.set('digest', paramEncrypt);
            next((response) => {
                return response
            });
        });
            this.$resource(HOST_HDPUSER+'/user/sendMessage').get({phoneNum:this.admin}).then((response) => {
                   console.log(response)
                  if(response.body.code == 200){
                  }else{
                    Toast({
                      message:'获取验证码失败',
                      duration: 3000,
                      className:"toast"
                    });
                  }
            })

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
