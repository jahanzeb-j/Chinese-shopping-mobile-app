<template>
  <div class="newCode">
    <div class="newCode-img clearfix">
      设置新密码
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="newCode-line"></div>
      <div class="newCode-input">
        <input type="password" v-if="!isPsd1" placeholder="新密码（密码为6-20位字母数字组合）" id="admin"  class="newCode-input-admin" v-model="admin">
        <input type="text" v-if="isPsd1" placeholder="新密码（密码为6-20位字母数字组合）" id="admin"  class="newCode-input-admin" v-model="admin">
        <input type="password" v-if="!isPsd2" placeholder="确认新密码" class="newCode-input-admin" v-model="verification" @focus="adminTest" >
        <input type="text" v-if="isPsd2" placeholder="确认新密码" class="newCode-input-admin" v-model="verification" @focus="adminTest" >
        <img class="login-admin" v-if="clearNum" @click="clearNumber1()" src="../../assets/images/clearNumber.png" >
        <img class="login-verification" v-if="clearNum1" @click="clearNumber2()" src="../../assets/images/clearNumber.png" >
        <img class="password-img1" v-if="showPw1" @click="showPword1()" src="../../assets/images/showPassword.png" >
        <img class="password-img1" v-if="!showPw1" @click="showPword2()" src="../../assets/images/hidePassword.png" >
        <img class="password-img2" v-if="showPw2" @click="showPword3()" src="../../assets/images/showPassword.png" >
        <img class="password-img2" v-if="!showPw2" @click="showPword4()" src="../../assets/images/hidePassword.png" >
      </div>
    <div class="login-btn1" @click="newCode()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">确定</div>
    <div class="login-btn"  v-show="!AlertChange" @click="Login1()" >确定</div>
  </div>
</template>
<style scoped>
  .password-img1{
    position: absolute;
    top: 1.7rem;
    right: 0.8rem;
    width: 2.4rem;
    height: 1.8rem;
  }
  .password-img2{
    position: absolute;
    top: 7.2rem;
    right: 0.8rem;
    width: 2.4rem;
    height: 1.8rem;
  }
  .login-admin{
    position: absolute;
    top: 1.7rem;
    right: 4.8rem;
    width: 2rem;
    height: 2rem;
  }
  .login-verification{
    position: absolute;
    top: 7.2rem;
    right: 4.8rem;
    width: 2rem;
    height: 2rem;
  }
  .newCode{
    width:100%;
    height:100%;
    background:#fff;
  }
  .newCode-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .newCode-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .newCode-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .newCode-input{
    width:92%;
    margin-left: 4%;
    position:relative;

  }
  .newCode-input input{
    width:100%;
    height:5.5rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
  }
  .newCode-input-admin{
    /*background: url("../../assets/images/密码-icon.png") no-repeat 10px ;*/
    border-bottom:1px solid #acacac;
    width: 1.1rem;
    height: 1.5rem;
  }
  .newCode-input-psd{
    border-bottom:1px solid #acacac;
    /*background: url("../../assets/images/手机-icon.png") no-repeat 10px;*/
    width: 1.1rem;
    height: 1.5rem;
  }
  .active{
    background:#f9be00;
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
    margin-top:5rem;
    border-radius: 0.2rem;
  }
  .login-btn1{
    width:92%;
    height:4.4rem;
    background:#f9be00;
    font-size:1.7rem;
    color:#fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.4rem;
    margin-left:4%;
    margin-top:5rem;
    border-radius: 0.2rem;
  }
</style>
<script>
  import Vue from 'vue'
  import { Toast } from 'mint-ui';
  export default {
    name: 'newCode',
    data () {
      return {
        isText:false,
        isPsd:true,
        loginpwd:'',
        admin:'',
        verification:'',
        loginAlert:false,
        AlertChange:false,
        codeForget:'',
        numberForget:'',
        userId:'',
        account:'',
        clearNum:false,
        clearNum1:false,
        showPw1:false,
        showPw2:false,
        isPsd1:false,
        isPsd2:false
      }
    },
    watch: {

      admin: function () {
        if(this.admin !="" && this.verification !="" && this.admin == this.verification){
          this.AlertChange = true;
//             this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.admin !=""){
          this.clearNum = true;
        }else{
          this.clearNum = false;
        }
      },
      verification: function () {
        if(this.admin !="" && this.verification !="" && this.admin == this.verification){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
        if(this.verification !=""){
          this.clearNum1 = true;
        }else{
          this.clearNum1 = false;
        }
      }
    },
    mounted(){

    },
    methods:{
      showPword1: function () {
        this.isPsd1 = false
        this.showPw1 = !this.showPw1
      },
      showPword2: function () {
        this.isPsd1 = true
        this.showPw1 = !this.showPw1
      },
      showPword3: function () {
        this.isPsd2 = false
        this.showPw2 = !this.showPw2
      },
      showPword4: function () {
        this.isPsd2 = true
        this.showPw2 = !this.showPw2
      },
      clearNumber1: function () {
        this.admin = ''
      },
      clearNumber2: function () {
        this.verification = ''
      },
        adminTest:function(){
        let reg = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/; //验证规则
        let flag = reg.test(this.admin); //true
        if(this.admin == ""){
          var adminId = document.getElementById("admin");
          adminId.focus();
          Toast({
            message: '请输入密码',
            duration: 3000,
            className: "toast"
          });
        } else if(!flag){
          var adminId = document.getElementById("admin");
          adminId.focus();
          Toast({
            message: '请输入正确格式密码',
            duration: 3000,
            className: "toast"
          });
        }
      },
      onePass: function () {
        if(this.admin != this.verification){
          Toast({
            message: '两次输入新密码不统一',
            duration: 3000,
            className: "toast"
          });
        }
      },
      Login1:function(event){
        this.onePass();
        if(this.admin.length ==  '') {
          Toast({
            message: '请输入新密码',
            duration: 3000,
            className: "toast"
          });
        }
//        else if (this.admin.length == ''){
//          Toast({
//            message: '请输入新密码',
//            duration: 3000,
//            className: "toast"
//          });
//        }
        else if (this.verification.length == ''){
          Toast({
            message: '请输入确认新密码',
            duration: 3000,
            className: "toast"
          });
        }
//        window.localStorage.setItem('token',tokens);
      },
      newCode: function () {
        //修改密码接口
        let url = HOST_HDPUSER+'/user/updatePassword';
        this.loginCode= window.localStorage.getItem('loginCode');
        this.userId= window.localStorage.getItem('userId');
        this.account= window.localStorage.getItem('account');
        this.codeForget= window.localStorage.getItem('codeForget');
        this.numberForget= window.localStorage.getItem('numberForget');
        //添加header
      //   console.log(this.loginCode)
      //   Vue.http.interceptors.push((request, next)  =>{
      //     request.headers.set('loginCode', this.loginCode);
      //   next((response) => {
      //     console.log(response.status)
      //   return response
      // });
      // });
        //添加header
        this.$resource(url).save({account:this.account,code:this.codeForget,userId:parseInt(this.userId),phoneNum:this.numberForget,password:this.verification}).then((response) => {
          if (response.status == 200) {
          if(response.data.code == 200){
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"login"
            Toast({
              message: "修改密码成功",
              duration: 3000,
              className:"toast"
            });
          }else{
            Toast({
              message: "修改密码不成功",
              duration: 3000,
              className:"toast"
            });
          }
        }
      })
        //修改密码接口
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"forgetPassword1"
      }
    }
  }
</script>
