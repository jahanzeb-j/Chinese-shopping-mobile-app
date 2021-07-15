<template>
    <div class="wrap">
      <div class="bk"></div>
      <div class="content">
            <div class="inputBox telBox" >
                <input type="number" placeholder="手机号" class="tel" v-model="personTel" @blur="testTel"/>
                <span class="clearNumber" @click="clearNumberHandle" v-show="clearNumber"><img class="login-admin1"  src="../../assets/images/clearNumber.png" ></span>
            </div>  
            <div class="inputBox"> 
                <input class="code" placeholder="验证码" v-model="code" @blur="testCode"/>
                <span class="codeBtn" @click="getCode" v-show="!stop && !frequently ">获取验证码</span>
                <span class="codeBtn" @click="getCode1" v-show="!stop && frequently ">获取验证码</span>
                <span class="clearNumber1" @click="clearCodeHandle" v-show="clearCode"><img class="login-admin1"  src="../../assets/images/clearNumber.png" ></span>
                <span class="time" v-show="stop">{{timer}}s</span>
                
            </div>
            <div class="regiserBtn" :class="{registerActive:test}" @click="registerHandle">注册</div>
            <p class="agent">注册代表您已经同意<a @click="protocol" href="javascript:void(0)">用户协议</a></p>
      </div>
      
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'mint-ui';
import {MessageBox} from 'mint-ui'
import { encrypt } from 'util'
export default{
    data(){
        return{
            personTel:'',
            code:'',
            stop:false ,//倒计时
            timer:60 ,  //时间
            codeTime :0 ,//次数
            interval:'' ,//定时器
            numberTime:0,
            newTime1:'',
            newTime2:'',
            newTime3:'',
            frequently:false ,//是否频繁点击,
            test:false, //是否验证成功
            // ifRegister:false ,//是否已注册 未注册
            clearNumber:false,//清除手机号
            clearCode:false //清除验证码

        }
    },
    mounted(){

    },
    watch:{
        personTel(){
            if(this.personTel !="" && this.code !=""){
                this.test=true
            }else{
                this.test=false
            }
            if(this.personTel != ''){
                this.clearNumber=true
            }else{
                this.clearNumber=false
            }
           
        },
        code(){
            if(this.personTel !='' && this.code !=''){
                this.test=true
            }else{
                this.test=false
            }
            if(this.code !=''){
                this.clearCode=true
            }else{
                this.clearCode=false
            }
            
        }
    },
    methods:{
        clearNumberHandle(){
            this.personTel=''
        },
        clearCodeHandle(){
            this.code=''
        },
        protocol: function () {
            this.$router.push({path:"protocol",query:{actPage:1}})
            // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol?actPage=1'
        },
        testTel(){
            let reg = /^1[345789]\d{9}$/; //验证规则/^1[34578]\d{9}$/,,,/^1[3|4|5|7|8][0-9]{9}$/
            let flag = reg.test(this.personTel); //true
            this.clearNumber=false
            if(this.personTel == ""){
                Toast({
                    message: '请输入手机号',
                    duration: 1000,
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
        
        codeTimeMethod(){
            if(this.timer <= 0){
                    this.timer =60
                    clearInterval(this.interval)
                    this.stop=false
            }else{
              this.timer--;  
            }
            
        },
        getCode(){
            let reg = /^1[345789]\d{9}$/; //验证规则/^1[34578]\d{9}$/,,,/^1[3|4|5|7|8][0-9]{9}$/
            let flag = reg.test(this.personTel); //true
            if(this.personTel == ""){
                Toast({
                    message: '请输入手机号',
                    duration: 1000,
                    className: "toast"
                });
            }
            else if(!flag){
                Toast({
                    message: '请输入正确手机号',
                    duration: 1000,
                    className: "toast"
                });
            }else{
                this.getCodeMethod()
            }
        },
        getCode1(){
            
            let backTime =  new Date();
            if((this.newTime3.getTime()-this.newTime1.getTime())+(backTime-this.newTime3.getTime()) > 300000){
                
                this.frequently = false
                this.numberTime = 0
                this.stop=true
                this.getCodeMethod()
            }else{
                Toast({
                    message: '操作频繁，5分钟之内点击3次',
                    duration: 3000,
                    className: "toast"
                });
            }
            
        },
        getCodeMethod(){
            this.numberTime++
            
            if(this.numberTime == 1){
                this.newTime1 =  new Date();
                this.stop=true //开启倒计时
            }
            if(this.numberTime == 2){
                this.newTime2 =  new Date();
                this.stop=true //开启倒计时
                if(this.newTime1.getTime()+300000< this.newTime2.getTime()){
                    this.frequently = false
                    this.numberTime = 0
                }else{
                   
                }

            }
            if(this.numberTime >= 3){
                this.newTime3 =  new Date();
                
                if( this.newTime3.getTime()-this.newTime1.getTime() < 300000){
                    this.frequently = true
                    // this.numberTime = 0
                    this.stop=false
                    Toast({
                        message: '操作频繁，5分钟之内点击3次',
                        duration: 3000,
                        className: "toast"
                    });
                }else{
                    this.frequently = false
                    this.numberTime = 0
                    this.stop=true
                }
                
            }
            
            if(this.stop){
                this.sendMessage() 
               this.interval =setInterval(this.codeTimeMethod,1000)
            }else{
                clearInterval(this.interval)
                this.timer=60
            }

            
        },
        sendMessage(){
            let key,paramEncrypt  = encrypt('2016091011111990', '1234567890123456', this.personTel)
        
            Vue.http.interceptors.push((request, next) => {
                request.headers.set('digest', paramEncrypt);
                next((response) => {
                    return response
                });
            });
            
            this.$api_post_no({
                url:HOST_HDPUSER+'/user/getToken',

            }).then( response =>{
                
                key = response.respBody
            }).then( _ =>{
                let phone_timeStamp = `${this.personTel}_${new Date().getTime()}`
                let paramAndPhone = encrypt(key, '1234567890123456', phone_timeStamp)
                this.$api_get_no({
                    url:HOST_HDPUSER+'/user/sendEncryptedMessage',
                    data:{
                      phoneNum:encodeURI(paramAndPhone)  
                    }
                }).then( response =>{
                   
                    if(response.code == 200){

                    }else{
                        Toast({
                            message: response.message,
                            duration: 1000,
                            className:"toast"
                        });
                    }
                    
                })

            })
        },
        testCode(){
            let reg = /^1[345789]\d{9}$/; //验证规则/^1[34578]\d{9}$/,,,/^1[3|4|5|7|8][0-9]{9}$/
            let flag = reg.test(this.personTel); //true
            this.clearCode=false
            if(this.personTel == ""){
                Toast({
                    message: '请输入手机号',
                    duration: 1000,
                    className: "toast"
                });
            }
            else if(!flag){
                Toast({
                    message: '请输入正确手机号',
                    duration: 1000,
                    className: "toast"
                });
            }else if(this.code == ''){
                Toast({
                    message: '请输入验证码',
                    duration: 1000,
                    className: "toast"
                });

            }
        },
        registerHandle(){
            let url = HOST_HDPUSER+'/user/verifyCode';
          
          this.loginCode= window.localStorage.getItem('loginCode');
          
            
            this.$api_get_no({
                url:url,
                data:{
                    phonenum:this.personTel,
                    code:this.code,

                }
            }).then( response =>{
                
                if(response.code ==200){
                    
                    // let url = HOST_HDPUSER+'/user/registerUser';
                   this.loginCode= window.localStorage.getItem('loginCode');
                   this.$api_get_no({
                       url:HOST_HDPUSER+'/user/activityLogin',
                       data:{
                           phoneNum:this.personTel,
                           code:this.code,
                           type:135,
                           loginCode:1
                       }
                   }).then( response =>{
                       
                       if(response.code == 200){
                            this.$router.push({path:"successAct"})
                        }else{
                            Toast({
                                message: response.message,
                                duration: 1000,
                                className:"toast"
                            });
                        }
                       
                    })
                }else{
                    Toast({
                        message: response.message,
                        duration: 2000,
                        className:"toast"
                    });
                }
            })
        }
    }
}
</script>



<style scoped>
.wrap{
    width:100%;
    height: 100%;
    
}
.bk{
    height:20rem;
    background:url(../../assets/images/registerAct.png) no-repeat;
    background-size: cover;
}
.content{
    width:100%;
    padding:0 3rem;
    box-sizing: border-box;
}
.step{
    font-size: 1.4rem;
    height:4.7rem ;
    line-height:4.7rem;
    color:#707070;
    margin-bottom: 1.5rem;

}
.step span{
    float: left;
    position: relative;
    width:33%;

}
.step .step1{
    padding-right:2.1rem;
    background:url(../../assets/images/registerIcon.png) no-repeat right;
}
.step .active{
    color:#252525;
}
.inputBox{
    width:100%;
    font-size: 1.3rem;
    line-height:4.2rem;
    height: 4.2rem;
    color:#acacac;
    border-bottom:1px solid #d8d8d8;
    text-align: left;
    position: relative;
}
.telBox{
    margin-top:3rem;
}
.inputBox .tel{
    width:85%;
    font-size: 1.3rem;
    height: 4.2rem;
    line-height:4.2rem;
    float: left;
}
.inputBox .code{
    float:left;
    width:20rem;
    font-size: 1.3rem;
    height: 4.2rem;
    line-height:4.2rem;
}
.codeBtn{
    display: inline-block;
    height: 100%;
    color:#f9be00;
    float: right;
}
.clearNumber{
    float: left;
    width:15%;
    height: 100%;
}
.inputBox .login-admin1{
    position: absolute;
    top: 1.2rem;
    right: .8rem;
    width: 2rem;
    height: 2rem;
}
.clearNumber1{
    position: absolute;
    right: 7rem;
    top: 0;
    height: 100%;
    width:10%;
}
.regiserBtn{
    width:100%;
    height:4.3rem;
    font-size:1.5rem;
    color:#fff;
    line-height:4.3rem;
    background:#d8d8d8;
    border-radius: 0.4rem;
    margin-top:2.5rem;
}
.registerActive{
    background:#f35953;
}
.agent{
    font-size: 1.3rem;
    height:5.3rem;
    line-height:5.3rem;
    color:#adadad;
    background:url(../../assets/images/registerActLogo.png) no-repeat 6.5rem 2.2rem;
}
.agent a{
    color:#f9be00;
}
.time{
    display: inline-block;
    margin-left: 2rem;
    float: right;
    margin-right: 1rem;
}
</style>