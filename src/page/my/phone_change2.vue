
<template>
  <div class="phone_change2">
    <div class="phone_change2-img clearfix">
      验证身份
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="phone_change2-line"></div>
    <div class="phone_change2-flow clearfix">
      <div class="phone_change2-flow1">1 确认身份</div>
      <div class="phone_change2-flow2">2 绑定新手机</div>
    </div>
    <div class="phone_change2-input">
      <div class="divInput1">
        <input type="tel" placeholder="请输入手机号" class="phone_change2-input-admin" v-model="admin">
      </div>
      <div class="divInput2 clearfix">
        <input type="tel" placeholder="请输入验证码" class="phone_change2-input-admin" v-model="verification">
        <div class="login-btn-time" v-show="!stop && ifRegister" @click='startTimer'>获取验证码</div>
        <div class="login-btn-time" v-show="!stop && !ifRegister">获取验证码</div>
        <div class="login-btn-time1" v-show="stop" >{{timer}}s</div>
      </div>
      <img class="login-admin" v-if="clearNum" @click="clearNumber1()" src="../../assets/images/clearNumber.png" >
      <img class="login-verification" v-if="clearNum1" @click="clearNumber2()" src="../../assets/images/clearNumber.png" >
    </div>
    <div class="login-btn1" @click="phone_change2()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">确定</div>
    <div class="login-btn"  v-show="!AlertChange" >确定</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Toast } from 'mint-ui';
  import { encrypt } from 'util'
  import { api_get,api_post } from '../../util/api.js'
  export default {
    name: 'phone_change2',
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
        userId:'',
        OldPhoneNum:'',
        code1:'',
        code:'',
        clearNum:false,
        clearNum1:false,

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
            if(response.data.code == 200){
              this.ifRegister = true;
            }else{
              Toast({
                message: "此手机号已被注册，请更换手机",
                duration: 3000,
                className:"toast"
              });
              this.ifRegister = false;
            }

//          this.checkboxData = response.body
          }
        })
//          }
        }else{
          this.ifRegister = false;
        }
        if(this.admin !="" && this.verification !=""){
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
        if(this.admin !="" && this.verification !=""){
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
    methods:{
      clearNumber1: function () {
        this.admin = ''
      },
      clearNumber2: function () {
        this.verification = ''
      },
      phone_change2: function () {
        //验证码检查接口
        let id=window.localStorage.getItem('userId')
        let oldMobile=window.localStorage.getItem('oldMobile')
         api_post({
            url:HOST_HDPUSER+'/hdp/user/app/updateBindMobile',
            data:{
                'code':this.verification,
                'id':id,
                'newMobile':this.admin,
                'oldMobile':oldMobile,
            }
          }).then( res =>{

            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
          })
//        
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "account"
      },
//       newPhone: function () {
//         //新手机接口
//         let url = HOST_HDPUSER+'/user/updateBindMoblie';
//         this.userId= window.localStorage.getItem('userId');
//         this.OldPhoneNum= window.localStorage.getItem('OldPhoneNum');
//         this.code1= window.localStorage.getItem('code1');
//         this.code = this.code1+","+this.verification
//         //添加header
//       //   Vue.http.interceptors.push((request, next)  =>{
//       //     request.headers.set('loginCode', this.loginCode);
//       //   next((response) => {
//       //     console.log(response.status)
//       //   return response
//       // });
//       // });
//         //添加header
//         this.$resource(url).save({phoneNum:this.admin,userId:this.userId,code:this.code,oldPhoneNum:this.OldPhoneNum}).then((response) => {
//           if (response.status == 200) {
//           if(response.data.code == 200){
//             localStorage.removeItem("OldPhoneNum");
//             localStorage.removeItem("code1");
//             window.localStorage.setItem('mobile',this.admin);
//             window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'account'

//           }else{
//             Toast({
//               message: response.data.message,
//               duration: 3000,
//               className:"toast"
//             });
//           }

// //          this.checkboxData = response.body
//         }
//       })
// //          }

//         //新手机接口
//       },
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

          // this.admin = window.localStorage.getItem('mobile')
          // let key,paramEncrypt  = encrypt('2016091011111990', '1234567890123456', this.admin)
          
          // Vue.http.interceptors.push((request, next) => {
          //     request.headers.set('digest', paramEncrypt);
          //     next((response) => {
          //         return response
          //     });
          // });
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
<style scoped>
  .login-admin{
    position: absolute;
    top: 1.7rem;
    right: .8rem;
    width:2rem;
    height:2rem;
  }
  .login-verification{
    position: absolute;
    top: 7.2rem;
    right: 10.8rem;
    width:2rem;
    height:2rem;
  }
  .phone_change2{
    width:100%;
    height:100%;
    background:#fff;
  }

  .phone_change2-img{
    width:100%;
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }

  .phone_change2-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }

  .phone_change2-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }

  .phone_change2-flow{
    width:92%;
    margin-left: 4%;
  }

  .phone_change2-flow1{
    float: left;
    height:4.4rem;
    line-height: 4.4rem;
    width: 48%;
    margin-left: 4%;
    border-bottom: 1px solid #d6d6d6;
    font-size: 1.6rem;
  }

  .phone_change2-flow2{
    float: left;
    height:4.4rem;
    line-height: 4.4rem;
    width: 48%;
    border-bottom: 1px solid #f9be00;
    font-size: 1.6rem;
    color: #f9be00;
  }

  .phone_change2-input{
    width:92%;
    margin-left: 4%;
    position:relative;

  }

  .phone_change2-input .divInput1{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
    border-bottom:1px solid #acacac;
  }

  .phone_change2-input .divInput2{
    border-bottom:1px solid #acacac;
  }

  .phone_change2-input input{
    width:60%;
    height:3.5rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
    line-height: 3.5rem;
    float: left;
    margin-top:1rem;
  }

  .phone_change2-input-admin{
    width: 1.1rem;
    height: 1.5rem;
  }

  .phone_change2-input-psd{
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
    height: 5.5rem;
    float: right;
    /*border: 0.1rem solid #f9be00;*/
    /*background:#fff;*/
    border-radius: 0.4rem;
    color: #f9be00;
    background: #fff;
    line-height: 5.5rem;
    font-size: 1.4rem;
    width: 10rem;
    text-align: center;
  }
  .login-btn-time1{
    height: 5.5rem;
    float: right;
    /*border: 0.1rem solid #d8d8d8;*/
    /*background:#f4f4f4;*/
    border-radius: 0.4rem;
    color: #858585;
    line-height: 5.5rem;
    font-size: 1.4rem;
    width: 10rem;
    text-align: center;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
