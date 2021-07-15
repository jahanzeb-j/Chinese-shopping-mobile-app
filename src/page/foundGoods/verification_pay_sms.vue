<template>
    <div class="verification_pay_sms">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">验证手机号</span>
        </div>
        <div class="grayLine"></div>
        <div class="sureMsg">
            绑定银行卡需要短信确认, 验证码已发送至手机:
            <span class="phone">17854389859</span>,
            请按提示操作。
        </div>
        <div class="verificationCode">
            <div class="left">
                <label for="">验证码:</label>
                <input type="text" placeholder="请输入6位验证码" v-model="verificationCode">
            </div>
            <div class="right">
                <mt-button size="normal" class="getVerificationCode" @click="getCode">获取验证码</mt-button>
            </div>
        </div>
        <div class="next">
            <mt-button size="normal" class="nextBtn" @click="makeSure" :disabled="isDisabled">确定</mt-button>
        </div>
    </div>
</template>

<style scoped>
    img{
        width:100%;
        height:100%;
    }

    span{
        display: inline-block;
    }

    .grayLine{
            width:100%;
            height:1rem;
            background: #f4f4f4;
        }

    .verification_pay_sms{
        width:100%;
    }

    .verification_pay_sms  .header{
        padding: 1.3rem 0;
    }

    .verification_pay_sms  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .verification_pay_sms  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .verification_pay_sms .next{
        width:100%;
        padding: 0 0.8rem;
        margin-top: 2.5rem;
    }

    .verification_pay_sms .next .nextBtn{
        width:100%;
        height:4rem;
        background: #F9BE00;
        font-size:1.5rem;
        color: #fff;
    }

    .verification_pay_sms .sureMsg{
        font-size:1.2rem;
        color:#333;
        padding:2.5rem 0.8rem;
        text-align: left;
        line-height: 1.8rem;
        letter-spacing: 1px;
        border-bottom:  1px solid #D8D9DB;
    }

    .verification_pay_sms .verificationCode{
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 0.8rem;
        border-bottom: 1px solid #D8D9DB;
    }

    label{
        font-size:1.2rem;
        color: #727272;
    }

    input{
        font-size:1.3rem;
        color: #727272;
        margin-left:1rem;
    }

    .verification_pay_sms .verificationCode .right{
        width:9rem;
        height:2.9rem;
    }

    .verification_pay_sms .verificationCode .right .getVerificationCode{
        width:100%;
        height:100%;
        border: 1px solid #f9be00;
        color: #f9be00;
        font-size:1.2rem;
    }

</style>

<script>
    export default{
        name: 'verification_pay_sms',
        data(){
          return{
              verificationCode:'',
              isDisabled:true
          }
        },
      mounted(){

      },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //获取验证码
            getCode(){
            },

            //确定
            makeSure(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'current_card';
            }
        },
        watch: {
            //监听短信验证码
            verificationCode: function () {
                if( this.verificationCode !="" ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            }
        }
    }
</script>
