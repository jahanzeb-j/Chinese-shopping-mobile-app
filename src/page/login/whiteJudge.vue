<template>
    <div class="whiteJudge"></div>
</template>
<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui';
    export default {
        data () {
            return{
                code:'',
                authCode:'',
                status:'',
                loginBack:'',
                loginUrl:''
            }
        },
        mounted () {
           this.judgeStatus();

        },
        methods: {
            judgeStatus:function () {
                let url  = window.location.href;
                let theRequest = new Object();
                if(url.indexOf("?") != -1) {
                    let str = url.substr(1);
                    let str1 = str.split("?");
                    let strs 
                    if(str1[2]){
                        strs = str1[2].split("&");
                    }else if(str1[1]){
                        strs = str1[1].split("&");
                    }
                    
                    for ( var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                    if(theRequest.status == 1){
                        let url = HOST_HDPUSER+'/user/isLogin';
                        var obj={
                              "loginCode":theRequest.code
                        };
                        this.$resource(url).get(obj).then((response) => {
                            window.localStorage.setItem('loginCode', theRequest.code);
                            window.localStorage.setItem('userId', response.body.respBody.userId);
                            window.localStorage.setItem('account', response.body.respBody.account);
                            window.localStorage.setItem('userName', response.body.respBody.account);
                            window.localStorage.setItem('mobile', response.body.respBody.mobile);
                            this.loginUrl= window.localStorage.getItem('loginUrl');
                            this.loginBack= window.localStorage.getItem('loginBack');
                            let loginBack = this.loginBack;
                            if(loginBack=="001"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?'+this.loginUrl
                            }else if(loginBack=="002"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?'+this.loginUrl
                            }else if(loginBack=="003"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'themeIndex?'+this.loginUrl
                            }
                            else if(loginBack=="004"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?'+this.loginUrl
                            }
                            else if(loginBack=="005"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex?'+this.loginUrl
                            }
                            else if(loginBack=="010"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.loginUrl
                            }
                            else if(loginBack=="011"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                            }
                            else if(loginBack=="012"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                            }
                            else if(loginBack=="013"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+this.loginUrl
                            }
                            //主题留言
                            else if(loginBack=="100"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.loginUrl
                            }
                            //预约展厅
                            else if(loginBack=="110"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?'+this.loginUrl
                            }
                            //详情购物车登录
                            else if(loginBack=="120"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shopping=2&'+this.loginUrl
                            }
                            //找货购物车登录
                            else if(loginBack=="130"){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shoppingBack=004&'+this.loginUrl
                            }
                            else if(loginBack==undefined){
                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?'+this.loginUrl
                          	}else{
                          	 window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
							
                          }
                        })
                    }
                    else if(theRequest.status == 0 ){
                        window.localStorage.setItem('authCode',theRequest.code);
                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'tplLogin'
                    }
                    else if (theRequest.status == -1 || theRequest.status == -2){
                        Toast({
                          message: "微信登录失败，请通过账号密码直接登录",
                          duration: 3000,
                          className:"toast"
                        });
                        setTimeout("window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'",3000)
                    }

                }
            }
        }
    }
</script>
<style>
  .toast {
    position: fixed;
    /*max-width: 80%;*/
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    width: 60%;
    /*padding:0 10rem;*/
    height: 5.1rem!important;
    line-height: 4.1rem!important;
  }
  .mint-toast-text {
    font-size: 1.2rem !important;
    display: block;
    text-align: center;
    width:100%;
    font-size: 1.2rem;
    text-align: center;
    /*margin-top:1.3rem;*/
  }
</style>
<style scoped>
    .whiteJudge {
        width:100%;
        height:100%;
        color: #000;
    }
</style>
