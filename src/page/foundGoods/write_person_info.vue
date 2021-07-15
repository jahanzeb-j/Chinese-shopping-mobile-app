<template>
    <div class="write_person_info">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">填写银行卡信息</span>
        </div>
        <div class="grayLine"></div>
        <div class="someInfo"  v-show="isDebitCard">
            <ul>
                <li>
                    <label for="">卡号:</label>
                    <span class="sp">12311213213212132</span>
                </li>
                <li class="diffLi">
                    <div class="diffLi_div">
                        <label for="">类型:</label>
                        <span class="sp">储蓄卡</span>
                    </div>
                    <div>
                        <span class="bankType">储蓄卡</span>
                    </div>
                </li>
                <li>
                    <label for="">手机:</label>
                    <input type="text" placeholder="请输入银行预留手机号" v-model="phoneNumber">
                </li>
                <li v-show="!isDebitCard">
                    <label for="">有效期:</label>
                    <input type="text">
                </li>
                <li v-show="!isDebitCard">
                    <label for="">CVV2:</label>
                    <input type="text" placeholder="卡背面签名栏后三位数">
                </li>
                <li>
                    <label for="">身份证:</label>
                    <input type="text" placeholder="请输入银行预留身份证号" v-model="IDCard">
                </li>

            </ul>
            <div class="protocol">
                <span>同意</span>
                <span class="yellow">《服务协议》</span>
            </div>
            <div class="next">
                <mt-button size="normal" class="nextBtn" @click="next" :disabled="isDisabled">下一步</mt-button>
            </div>
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

    .write_person_info{
        width:100%;
    }

    .write_person_info  .header{
        padding: 1.3rem 0;
    }

    .write_person_info  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .write_person_info  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .write_person_info .someInfo{
        text-align: left;
        padding: 0 0.8rem;
    }

    .write_person_info .someInfo label{
        font-size:1.4rem;
        color: #5C5C5C;
        font-weight: bold;
    }

    .write_person_info .someInfo input{
        font-size:1.4rem;
        color: #333;
    }

    .write_person_info .someInfo ul li{
        padding: 1.5rem 0;
        border-bottom: 1px solid #D8D9DB;
    }

    .write_person_info .someInfo ul li.diffLi{
        display: flex;
        justify-content: space-between;
    }

    .write_person_info .someInfo ul li span.sp{
        font-size:1.4rem;
        color: #333;
    }

    .write_person_info .someInfo ul .diffLi .diffLi_div span.sp{
        font-size:1.4rem;
        color: #333;
    }

    .write_person_info .someInfo ul li span.bankType{
        font-size:1.2rem;
        color: #5c5c5c;
    }

    .write_person_info .someInfo .next{
        width:100%;
        padding: 0 0.8rem;
    }

    .write_person_info .someInfo .next .nextBtn{
        width:100%;
        height:4rem;
        background: #F9BE00;
        font-size:1.5rem;
        color: #fff;
    }

    .write_person_info .someInfo .protocol{
        width:100%;
        display: flex;
        justify-content: center;
        font-size:1.1rem;
        margin: 2.5rem 0 1rem 0;
    }

    .write_person_info .someInfo .protocol .yellow{
        color: #F9BE00;
    }

</style>

<script>
    export default{
        name: 'write_person_info',
        data(){
            return{
                isDebitCard:true,
                phoneNumber: '',
                IDCard: '',
                isDisabled:true
            }
        },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //点击下一步
            next(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'verification_pay_sms';
            }
        },
      mounted(){

      },
        watch: {
            //监测账号是否输入
            phoneNumber: function () {
                if( this.phoneNumber !="" && this.IDCard !="" ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            },

            //监测姓名是否输入
            IDCard: function () {
                if( this.phoneNumber !="" && this.IDCard !="" ){
                    this.isDisabled = false
                }else {
                    this.isDisabled = true
                }
            },
        }
    }
</script>
