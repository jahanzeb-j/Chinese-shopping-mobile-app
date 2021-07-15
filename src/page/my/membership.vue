<template>
    <div class="membership">
        <div class="membership_img"  @click="back1()">
            <img  src="../../assets/images/huiyuan/shutDownCart.png" >
        </div>
        <div class="maxImg">
            <!--<img @click="back1()" class="membership_img" src="../../assets/images/huiyuan/shutDownCart.png" >-->
            <img src="../../assets/images/huiyuan/background.png"  >
            <div class="topImg">
                <img src="../../assets/images/huiyuan/2@2x.png" >
                <input class='input1' type="text" v-model="companyName" placeholder="输入所在公司名称 ，领取会员身份">
                <input class='input2' type="tel" v-model="invitationCode" placeholder="经纪人邀请码，请输入（选填）">
                <div class="point_out" @click="popUp">哪里有经纪人？ </div>
                <div class="receive" @click="receive">免费开通好单品企业会员</div>
            </div>
            <div class="register-protocol" @click="protocol">
                <div class="icon">
                    <img src="../../assets/images/gou.png" >
                </div>
                我同意<span class="register-protocol-aa" >《好单品商城用户使用协议》</span>
            </div>
        </div>
        <div class="pop" v-if="isShow">
            <div class="point_pop">
                <p class="pop_p1">如何获得好单品经纪人</p>
                <p class="pop_p2">微信关注公众号“好单品商城”</p>
                <p class="pop_p3">回复“经纪人”即可获取</p>
                <p class="pop_p4" @click="popDown">我知道了</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { api_get,api_post } from '../../util/api.js'
import { alert_msg} from '../../util/index.js'
    export default{
        data(){
            return{
               isShow:false, 
               loginCode:'',
               id:'',
               companyName:'',
               invitationCode:'',
            }
        },
        mounted(){
            this.loginCode=window.localStorage.getItem('loginCode');
            this.admin();
        },
        methods : {
           //获取用户信息
            admin:function(){
                let url = HOST_HDPUSER + '/hdp/user/app/judgeLogin';
                let data={
                  loginCode:this.loginCode
                };
                this.$api_get_no({
                  url:url,
                  data:data
                }).then(res =>{
                    console.log(res)
                    if(res.code == 200){
                        this.id=res.respBody.id;
                    }else{

                    }
                })
            },
            //领取会员
            receive:function(){
                api_post({
                    url:HOST_HDPUSER+'/hdp/user/app/upgradeMember',
                    data:{
                        'id':this.id,
                        'companyName':this.companyName,
                        'invitationCode ':this.invitationCode,
                        "loginCode": this.loginCode,
                    }
                }).then( res =>{
                    console.log(res)
                    if(res.code==200){
                        this.$router.push({path:'myIndex'})
                    }else{
                        alert_msg(res.message)
                    }
                })
            },
            back1: function () {
                console.log('11')
                window.localStorage.setItem('pop',1)
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"myIndex";
            },
             //好单品用户协议
            protocol: function () {
                window.localStorage.setItem('jumpPage',3);
                window.localStorage.setItem('p_admin', this.admin)
                window.localStorage.setItem('p_verification', this.verification)
                window.localStorage.setItem('p_loginpwd', this.loginpwd)
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol'
            },
            popUp:function(){
                this.isShow=true;
            },
            popDown:function(){
                this.isShow=false;
            }
        }
    }
</script>
<style scoped>
    *{
        font-family:PingFangSC-Light;
    }
    /*.membership_img{
        height: 4.4rem;
        line-height: 4.4rem;
        font-size:1.8rem;
        color:#333;
        text-align: center;
        position: relative;
    }
    .membership_img img{
        position: absolute;
        top:1.5rem;
        left:1.5rem;
    }*/
    .maxImg{
        width:100%;
        position: relative;
    }
    .maxImg img{
        width: 100%;
    }
    .maxImg .topImg{
        width: 100%;
        position: absolute;
        top: 4.2rem;
        /*left: -2.9rem;*/
        z-index: 999;
    }
    .maxImg .topImg img{
        width: 100%;
    }
    .maxImg .topImg input{
        width: 25rem;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.5rem;
        color: #BBB;
        background: rgba(244,244,244,1);
        position: absolute;
        left: 6.2rem;
        padding-left: 1rem;
    }
    .maxImg .topImg .input1{
        top: 31.5rem;
        color: #333;
    }
    .maxImg .topImg .input2{
        top: 37.5rem;
        color: #333;
    }
    .membership_img{
        position: absolute;
        top:1.5rem;
        left:1.5rem;
        width:2.5rem;
        height:2.5rem;
        z-index: 9;
    }
    .membership_img img{
        width:100%;
    }
    .topImg div{
        position: absolute;
        color:#96752D;
    }
    .topImg .point_out{
        font-size: 1rem;
        bottom: 12.5rem;
        right: 6rem;
    }
    .topImg .receive{
        width: 25rem;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.6rem;
        bottom: 7rem;
        left: 6.2rem;
        background:url('../../assets/images/huiyuan/bg@2x.png') no-repeat;
        background-size: 100%;
    }
    .register-protocol {
        margin-top:1.5rem;
        margin-left:3rem;
        color:rgba(153,153,153,1);
        text-align:left;
        font-size:1.3rem;
        position: absolute;
        bottom: 3rem;
        left: 4rem;
        z-index:999;
    }
    .register-protocol span{
        font-family:PingFangSC-Light;
        color:#FFD85A;
    }
    .register-protocol .icon{
        display: inline-block;
        width:1.2rem;
        height: 1.2rem;;
    }
    .register-protocol .icon img{
        width:100%;
        height:100%;
    }
    .membership .pop{
        width:100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        position: absolute;
        top: 0;
    }
    .pop .point_pop{
        width:28rem;
        height:17.35rem;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius: 0.5rem ; 
        position: absolute;
        top:25rem;
        left:5rem;
    }
    .point_pop .pop_p1{
        font-size:1.8rem;
        color:#333;
        margin-top:2.5rem;
    }
    .point_pop .pop_p2{
        font-size:1.5rem;
        color:#666;
        margin-top:2.5rem;
    }
    .point_pop .pop_p3{
        font-size:1.5rem;
        color:#666;
        margin-top:0.5rem;
        margin-bottom:2.5rem;
    }
    .point_pop .pop_p4{
        font-size:1.8rem;
        color:#9D7E3B;
        padding-top: 1.3rem;
        margin-top:0.5rem;
        border-top:1px solid #D6D6D6;
    }
    
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    color: #BBBBBB; 
    } 
    input:-moz-placeholder, textarea:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    color: #BBBBBB; 
    } 
    input::-moz-placeholder, textarea::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    color: #BBBBBB; 
    } 
    input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    color: #BBBBBB; 
    } 
</style>