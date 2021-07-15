<template>
  <div class="third_party">

    <div class="third_party-img clearfix">
      绑定手机号
      <img @click="back()" src="../../assets/images/returnFront.png" >
    </div>
    <div class="third_party-line"></div>
    <div class="third_party-input">
      <div class="third_party-input">
        <div class="login-btn-time" >获取验证码</div>
        <input type="text" placeholder="手机号/用户名" class="third_party-input-admin" v-model="admin">
        <input type="text" placeholder="请输入验证码" class="third_party-input-admin" v-model="verification">
        <input type="password" placeholder="密码" class="third_party-input-psd" minlength="8" maxlength="16" @blur="verification()" v-model="loginpwd" v-if="isPsd">
      </div>
    </div>
    <div class="login-btn" @click="Login()" v-bind:class="{ active: AlertChange }">确定</div>
  </div>
</template>
<style scoped>
  .third_party-line{
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
    margin-top:5rem;
    border-radius: 0.2rem;
  }
  .login-btn-time{
    /*padding: 0 1rem;*/
    height: 3rem;
    float: right;
    border: 0.1rem solid #f9be00;
    background:#fff;
    border-radius: 0.4rem;
    color: #f9be00;
    line-height: 3rem;
    font-size: 1.4rem;
    position: absolute;
    right: 0;
    width: 8rem;
    text-align: center;
  }
  .third_party{
    width:100%;
    height:100%;
    background:#fff;
  }
  .third_party-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .third_party-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .third_party-protocol{
    text-align: left;
    margin-left: 2rem;
    margin-top: 1.2rem;
    color: #cd141c;
    font-size: 1.1rem;
    height: 3rem;
    line-height: 3rem;
    /*background: url("../../assets/images/protocal.png") ;*/
  }
  .third_party-protocol .option{
    width: 1.5rem;
    height: 1.5rem;
    background-size: cover;
    background: url("../../assets/images/tuoyuan.png") no-repeat;
    background-size: cover;
    display: inline-block;
    float: left;
    margin-left: 2.4rem;
    margin-top: 0.7rem;
  }
  .third_party-protocol input[type="checkbox"] {  /*为了保险起见，把原生样式隐藏掉*/
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
  .third_party-protocol .third_party-protocol-aa{
    font-size: 1.1rem;
    color: #cd141c;
  }
  .third_party-protocol .third_party-protocol-agree{
    font-size: 1.1rem;
    color: #333;
    margin: 0 0.5rem 0 0;
  }
  .third_party-protocol img {
    width: 1.5rem;
    height: 1.5rem;
    float: left;
  }
  .third_party-input{
    width:92%;
    margin-left: 4%;
    margin-top:2rem;
    position:relative;

  }
  .third_party-input input{
    width:100%;
    height:4.4rem;
    padding-left:1.4rem;
    font-size: 1.4rem;
    -webkit-box-shadow:0;
    -webkit-appearance:none;
    outline:none;
    box-sizing: border-box;
  }
  .third_party-input-admin{
    /*background: url("../../assets/images/密码-icon.png") no-repeat 10px ;*/
    border-bottom:0.1rem solid #acacac;
    width: 1.1rem;
    height: 1.5rem;
  }
  .third_party-input-psd{
    border-bottom:0.1rem solid #acacac;
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
  //  import buttonLogin  from  '../../component/buttonLogin.vue'
  export default {
//    components: {
//      buttonLogin
//    },
    name: 'third_party',
    data () {
      return {
        isText:false,
        isPsd:true,
        loginpwd:'',
        admin:'',
        loginAlert:false,
        AlertChange:false,
        verification:''
      }
    },
    watch: {
      loginpwd: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//             this.verification();
        }else{
          this.AlertChange = false;
        }
      },
      admin: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
      },
      verification: function () {
        if(this.loginpwd !="" && this.admin !="" && this.verification !=""){
          this.AlertChange = true;
//          this.verification();
        }else{
          this.AlertChange = false;
        }
      }
    },
    mounted(){

    },
    methods:{
      protocol: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol'
      },
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
      }
    }
  }
</script>

