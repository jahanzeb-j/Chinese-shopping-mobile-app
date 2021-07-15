<template>
  <div class="phone_change1">
    <div class="phone_change1-img clearfix">
      验证身份
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="phone_change1-line"></div>
    <div class="phone_change1-flow clearfix">
      <div class="phone_change1-flow1">1 确认身份</div>
      <div class="phone_change1-flow2">2 绑定新手机</div>
    </div>
      <div class="phone_change1-input">
        <div class="divInput1">
          <div type="text"  class="phone_change1-input-admin">{{admin}}</div>
        </div>
        <div class="divInput2 clearfix">
          <input type="tel" placeholder="请输入验证码" class="phone_change1-input-admin" v-model="verification">
          <div class="login-btn-time" v-show="!stop && ifRegister" @click='startTimer'>获取验证码</div>
          <div class="login-btn-time" v-show="!stop && !ifRegister" >获取验证码</div>
          <div class="login-btn-time1" v-show="stop" >{{timer}}s</div>
        </div>
        <img class="login-admin" v-if="clearNum" @click="clearNumber1()" src="../../assets/images/clearNumber.png" >
      </div>
    <!--</div>-->
    <div class="login-btn1" @click="phone_change1()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">下一步</div>
    <div class="login-btn"  v-show="!AlertChange" >下一步</div>
  </div>
</template>
<style scoped>
  .login-admin{
    position: absolute;
    top: 7.3rem;
    right: 11rem;
  }
  .phone_change1{
    width:100%;
    height:100%;
    background:#fff;
  }
  .phone_change1-img{
    width:100%;
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .phone_change1-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
  }
  .phone_change1-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .phone_change1-flow{
    width:92%;
    margin-left: 4%;
  }
  .phone_change1-flow1{
    float: left;
    height:4.4rem;
    line-height: 4.4rem;
    width: 48%;
    border-bottom: 1px solid #f9be00;
    font-size: 1.6rem;
    color: #f9be00;
  }
  .phone_change1-flow2{
    float: left;
    height:4.4rem;
    line-height: 4.4rem;
    width: 48%;
    margin-left: 4%;
    border-bottom: 1px solid #d6d6d6;
    font-size: 1.6rem;
    color: #acacac;
  }
  .phone_change1-input{
    width:92%;
    margin-left: 4%;
    position:relative;
    border-bottom:1px solid #acacac;
  }
  .divInput2{
    height:5.5rem;
  }
  .phone_change1-input .phone_change1-input-admin{
    width:60%;
    height:3.5rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    text-align: left;
    line-height: 3.5rem;
    float: left;
    margin-top:1rem;
  }
  .phone_change1-input-admin{
    width: 1.1rem;
    height: 1.5rem;
  }
  .phone_change1-input-psd{
    border-bottom:1px solid #acacac;
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
  .phone_change1-input .divInput1{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    border-bottom:1px solid #acacac;
  }

  .login-btn-time{
    height: 5.5rem;
    border-radius: 0.4rem;
    color: #f9be00;
    line-height: 5.5rem;
    font-size: 1.4rem;
    width: 10rem;
    text-align: center;
    float: right;
  }


  .login-btn-time1{
    height: 5.5rem;
    border-radius: 0.4rem;
    color: #858585;
    line-height: 5.5rem;
    font-size: 1.4rem;
    width: 10rem;
    text-align: center;
    float: right;
  }

  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
<script>
  import { Toast } from 'mint-ui';
  import { encrypt } from 'util'
  import Vue from 'vue'
  export default {
    name: 'phone_change1',
    data () {
      return {
        timer: 60,       //默认倒数30秒
        stop : false,   //默认是停止的，但界面加载之后会变成false
        Interval:null,
        ifRegister:true,
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
    mounted () {
      this.getIphone()

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
    methods:{
      clearNumber1: function () {
        this.verification = ''
      },
      //回显手机号
      getIphone: function () {
        this.admin= window.localStorage.getItem('mobile').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      },
      phone_change1: function () {
        //验证码检查接口
        let url = HOST_HDPUSER + '/hdp/user/app/login';
        this.$resource(url).get({
          'mobile': this.admin,
          'code': this.verification,
          'loginType': "0"
        }).then((res) => {
          console.log(res)
          if(res.body.code==200){
            window.localStorage.setItem('oldMobile',this.admin)
            window.localStorage.setItem('OldPhoneNum',window.localStorage.getItem('mobile'));
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'phone_change2'

          }else{
            Toast({
              message: res.data.message,
              duration: 3000,
              className:"toast"
            });
          }
        })
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "account"
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
        let data={
                phoneNum:this.admin
              }
        let url=HOST_HDPUSER+"/user/sendMessage"
        this.$api_get_no({
            url:url,
            data:data
        }).then(res =>{
            console.log(res)
            if(res.code == 200){
                this.countdown=60
            }else{

            }
        })

      }
    }
  }
</script>

