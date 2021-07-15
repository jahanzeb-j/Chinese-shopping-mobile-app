<template>
	<div class="login" >
		<div class="login-img" @click="back()">
			好单品商城
			<img src="../../assets/images/login_guanbi.png">
		</div>
		<div class="login-landing">
			<img src="../../assets/images/loginLogo.png" class="">
		</div>
		<div class="login-input">
			<div class="login-text">
				<!--<input type="text" @blur = "blurDelete()" @focus = "focusDelete1()" id="admin" placeholder="手机号/用户名" class="login-input-admin" v-model="admin">-->
				<input type="tel" @keyup="focusDelete1()" @blur="blurDelete()" id="admin" placeholder="请输入手机号" class="login-input-admin" v-model="admin">
				<img v-if="clearNumber" @click="clearNumber1()" src="../../assets/images/clearNumber.png">
			</div>
			<div class="login-password">
				<input type="tel" id="loginpwd" placeholder="请输入验证码" class="login-input-psd" minlength="8" maxlength="16" v-model="loginpwd">
				<div class="login_" v-if="showPassword" @click="verifying">{{masster}}</div>
				<div class="login_ login1_" v-if="!showPassword" @click="verifying">{{masster}}</div>
			</div>
			<div class="remind" v-if='isShow'>{{message}}</div>
			<div class="remind remind01" v-if='isShow1'>验证码输入错误</div>
		</div>
		<div class="login-btn login-btn1" @click="Login()" v-show="AlertChange" v-bind:class="{ active: AlertChange }">登录</div>
		<div class="login-btn " v-show="!AlertChange">登录</div>
		<div class="register-protocol">
			<!--<div class="icon">
				<img src="../../assets/images/gou.png" alt="">
			</div>-->
			注册代表同意<span class="register-protocol-aa" @click="protocol()">《好单品商城用户使用协议》</span>
		</div>
		<div class="login-three clearfix" v-if="showwei" >
			<!--<div class="login-three-left floatL"></div>-->
			<div @click="wechatLogin">微信登录</div>
			<!--<div></div>-->
			<img src="../../assets/images/xia.png" alt="" @click="wechatLogin">
			<!--<div class="login-three-right floatR"></div>-->
		</div>
		<!--<div>
			<div class="login-three-img clearfix" v-if="showwei">
				微信登录
				<div class="login-three-weixin" @click="wechatLogin">
					<img src="../../assets/images/wechatBig.png" class="">
				</div>
				<div class="login-three-qq"><img src="../../assets/images/qq.png" class=""></div>
        			<div class="login-three-xinlang"><img src="../../assets/images/weibo.png" class=""></div>
			</div>
		</div>-->
		<!--<div class="cover-tap"></div>-->
		<div class="loginBottom">
			<img src="../../assets/images/denglu/tishi.png" alt="" />
			<span>单品通用户可直接用手机号登录</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	import { router } from '../../router/index.js'
	import { Toast } from 'mint-ui';
	export default {
		name: 'login',
		data() {
			return {
				isText: false,
				isPsd: false,
				loginpwd: '',
				admin: '',
				loginAlert: false,
				AlertChange: false,
				loginCode: '',
				goodUrl: '',
				urlRemain: '',
				loginUrl: '',
				clearNumber: false,
				inputType: false,
				acb1: '',
				acb2: '',
				showPassword: true,
				masster: '获取验证码',
				stop: false,
				isShow: false,
				message: '',
				isTime: false,
				countdown: 60,
				no_exhibitionId: this.$route.query['exhibitionId'],
				no_userId: this.$route.query['userId'],
				state: this.$route.query['state'],
				showwei: true,
				isShow1:false
			}
		},
		watch: {
			loginpwd: function() {
				if(this.loginpwd != "" && this.admin != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
					this.isShow1 = false
				}
			},
			admin: function() {
				if(this.loginpwd != "" && this.admin != "" ) {
					console.log('zhe')
					this.AlertChange = true;
					this.clearNumber = true;
				} else {
					this.AlertChange = false;
					this.isShow = false;
				}
			},
		},
		mounted() {
			if(this.state == 1){
				this.showwei = false
			}else{
				this.showwei = true
			}
			window.localStorage.clear();
			if(this.$route.query.admin != '' && this.$route.query.admin != undefined) {
				this.admin = this.$route.query.admin;
				this.showPassword = true;
			}
			
			//fix分享进来URL 参数
			if(window.location.href.indexOf('?') != window.location.href.lastIndexOf('?')) {
				window.location.href = window.location.href.replace(/\?[\&?\w+\=\w+]+/, '')
			}
			
			if(this.$route.query.exhibitionId && this.$route.query.userId) {
				window.localStorage.setItem('scan-exhibitionId', this.$route.query.exhibitionId)
				window.localStorage.setItem('scan-userId', this.$route.query.userId)
			}
			
		},
		methods: {
			//获取验证码
			update: function() {
				if(this.countdown <= 0) {
					this.masster = '获取验证码';
					this.showPassword = true;
					// this.AlertChange = false;
					clearInterval(this.Interval);
					this.stop = false;
					this.countdown = 60;
				} else {
					this.countdown--;
					this.masster = this.countdown + '秒后获取';
					this.showPassword = false;
					// this.AlertChange = true;
				}
			},
			verifying: function() {
				if(this.countdown != 60) {
					this.isShow = true;
					this.message = '请稍后获取验证码';
					return;
				}
				if(this.admin == '' || this.admin == undefined || this.admin.length != 11) {
					this.isShow = true;
					this.message = '手机号格式错误';
					return;
				} else {
					this.isShow = false;
					this.stop = true;
					if(this.stop == true) {
						this.Interval = setInterval(this.update, 1000);
						this.isShow1 = false
					} else {
						clearInterval(this.Interval);
					}
					let data = {
						phoneNum: this.admin
					}
					let url = HOST_HDPUSER + "/user/sendMessage"
					this.$api_get_no({
						url: url,
						data: data
					}).then(res => {
						console.log(res)
						if(res.code == 200) {
							this.countdown = 60
						} else {}
					})
				}
			},
			//获取焦点执行函数
			focusDelete1: function() {				
				let myreg = /^1[3|4|5|7|8][0-9]{9}$/;
				if(myreg.test(this.admin)) {
					this.message = '';
					this.showPassword = true;
					this.isShow = false;
					this.clearNumber = true;
				}
				  else if(this.admin.length == 0){
				 	this.clearNumber = false;
				 	// this.showPassword = true;
//				 }else if(this.admin.length < 11 && this.admin.length > 0){
//				 	this.message = '';
//				 	this.isShow = false;
//				 	this.clearNumber = true;
//				 	// this.showPassword = true;
//				 	return;
//				 }else if(this.admin == '' && this.admin.length == 0){
//				 	this.message = '';
//				 	this.isShow = false;
//				 	this.clearNumber = false;
//				 	// this.showPassword = true;
//				 	return;
				 }
				else{
					this.message = '';
					this.isShow = false;
					this.clearNumber = true;
					this.showPassword = true;
				}
			},
			
			//失去焦点执行函数
			blurDelete: function() {
				this.message = '';
				this.isShow = false;
				if(this.admin.length == 11){
					this.clearNumber = true;
				}else{
					this.clearNumber = false;
				}
				
				if(this.acd1 == 1 && this.admin) {
					this.clearNumber = true
				}else if(this.admin.length < 11 && this.admin.length >0 ){
					this.clearNumber = true
					this.message = '手机号格式错误';
					this.isShow = true;
				}else{
					this.clearNumber = true
					this.message = '';
					this.isShow = false;
				}
				this.acd1 = ''
				this.acd2 = ''
			},
			
			clearNumber1: function() {
				this.admin = ''
				if(this.admin.length == 0){
					this.clearNumber = false;
				}else{
					this.clearNumber = true;
				}
			},
			//用户协议
			protocol: function() {
				window.localStorage.setItem('jumpPage', 3);
				window.localStorage.setItem('p_admin', this.admin);
				window.localStorage.setItem('p_verification', this.verification);
				window.localStorage.setItem('p_loginpwd', this.loginpwd);
				this.$router.push({
					path: 'protocol',
					query: {
						admin: this.admin
					}
				})
				// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'protocol?admin='+this.admin
			},
			//微信授权登录
			wechatLogin: function() {
				let ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == "micromessenger" || 1) {
					let url = window.location.href;
					let theRequest1 = new Object();
					if(url.indexOf("?") != -1) {
						let str = url.substr(1);
						let str1 = str.split("?");
						let strs
						if(str1[2]) {
							strs = str1[2].split("&");
							window.localStorage.setItem('loginUrl', str1[2]);
						} else if(str1[1]) {
							strs = str1[1].split("&");
							window.localStorage.setItem('loginUrl', str1[1]);
						}
						for(var i = 0; i < strs.length; i++) {
							theRequest1[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1])
						}
						let loginBack = theRequest1.loginBack;
						window.localStorage.setItem('loginBack', loginBack);
					}
					this.$router.go(-1)
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7187fa65b31924e&redirect_uri=http%3A%2F%2Fhdpuser-api.99114." + SETDOMAIN + "%2Fweixin%2FOAuth%3FurlParam%3DwhiteJudge&response_type=code&scope=snsapi_userinfo&state=WEIXIN&connect_redirect=1#wechat_redirect"
				} else {
					Toast({
						message: '请访问微信后再登录',
						duration: 2000,
						className: "toast"
					});
				}
			},
			//手机号验证码登录
			Login: function(event) {
				//      clearInterval(this.Interval);
				let url = HOST_HDPUSER + '/hdp/user/app/loginQr';
				this.$resource(url).get({
					'mobile': this.admin,
					'code': this.loginpwd,
					'loginType': "0",
					'exhibitionId': this.no_exhibitionId,
					'userId': this.no_userId,
				}).then((response) => {
					console.log(response);
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.lastIndexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					if(response.status == 200) {
						if(response.data.code == 200) {
							window.localStorage.setItem('loginCode', response.data.respBody.loginCode);
							window.localStorage.setItem('userId', response.data.respBody.id);
							window.localStorage.setItem('account', response.data.respBody.userName);
							window.localStorage.setItem('mobile', response.data.respBody.mobile);
							window.localStorage.setItem('userName', response.data.respBody.account);
							window.localStorage.setItem('userType', response.data.respBody.userType);
							window.localStorage.setItem('isFirstLogin', response.data.respBody.isFirstLogin);
							window.localStorage.setItem('isDptMember ', response.data.respBody.isDptMember);
							var loginBack = this.$route.query.loginBack
							var userId = response.data.respBody.userId
							//找货首页进入发布
							var loginBackUrl = "";
							// Toast({
							//   message: '登录成功',
							//   duration: 1000,
							//   className: "toast"
							// });
							// console.log('登录成功')
							this.$alert_msg('登录成功')
							loginBackUrl = this.$route.query.loginBackUrl;
							if(loginBack == "001") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex'
							} else if(loginBack == "002") {
								//              window.history.go(-1)
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
							} else if(loginBack == "066") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?' + this.urlRemain
							} else if(loginBack == "011") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
							} else if(loginBack == "003") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
							} else if(loginBack == "004") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping'
							} else if(loginBack == "005") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex'
							} else if(loginBack == "010") {
								var id = this.$route.query.id
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?id=' + id
							} else if(loginBack == "011") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
							} else if(loginBack == "012") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
							} else if(loginBack == "013") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
							}
							//主题留言
							else if(loginBack == "100") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.urlRemain
							}
							//预约展厅
							else if(loginBack == "110") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?' + this.urlRemain
							}
							//详情购物车登录
							else if(loginBack == "120") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?' + this.urlRemain + '&messageIndex=2'
							}
							//找货购物车登录
							else if(loginBack == "130") {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?shoppingBack=004'
							} else if(loginBack == undefined) {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
							} else {
								loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
							}
							//判断是否在微信中打开
							var ua = navigator.userAgent.toLowerCase();
							if(ua.match(/MicroMessenger/i) == "micromessenger") {
								//是在微信中打开
								//              var index1 = loginBackUrl.indexOf("#")+2
								//              var loginBackUrlAll = loginBackUrl.slice(index1,loginBackUrl.length+1)
								//              window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7187fa65b31924e&redirect_uri="+ encodeURIComponent(HOST_HDPUSER+"/weixin/userBaseInfo?loginCode="+response.data.respBody.loginCode+"&loginBack="+loginBackUrlAll) +"&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
								window.location.href = loginBackUrl
							} else {
								//不是在微信中打开
								window.location.href = loginBackUrl
							}
							
							
						} else {
							if(this.isShow){
								return
							}else{
								this.isShow1 = true
							}
						}
					} else {}
				});
				//        window.localStorage.setItem('token',tokens);
			},
			back: function() {
				var loginBack = this.$route.query.loginBack;
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('commodityId')
				this.urlRemain = urlParams.substring(index, urlParams.length);
				if(loginBack == "001") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index'
					
				} else if(loginBack == "002") {
					window.history.go(-3)
					//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index'
				} else if(loginBack == "003") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
				} else if(loginBack == "004") {
					//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex'
					window.history.go(-2)
				} else if(loginBack == "005") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex'
				} else if(loginBack == "010") {
					var id = this.$route.query.id
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?id=' + id
				} else if(loginBack == "011") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
					//          var commodityId = this.$route.query.commodityId
					//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId
				} else if(loginBack == "013") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
				}
				//主题留言
				else if(loginBack == "100") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.urlRemain
				}
				//预约展厅
				else if(loginBack == "066") {
					let urlParams = window.location.href; //获取url中"?"符后的字串
					let index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					loginBackUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details' + this.urlRemain
				} else if(loginBack == "110") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?' + this.urlRemain
				}
				//详情购物车登录
				else if(loginBack == "120") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('commodityId')
					this.urlRemain = urlParams.substring(index, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.urlRemain
				}
				//找货购物车登录
				else if(loginBack == "130") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index'
				} else if(loginBack == undefined) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
				}
				//        alert(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1));
				//        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
			},
			my: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex'
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
		width: 52%;
		/*padding:0 10rem;*/
		height: 5.1rem !important;
		line-height: 4.1rem !important;
	}
	
	.mint-toast-text {
		font-size: 1.2rem !important;
		display: block;
		text-align: center;
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		/*margin-top:1.3rem;*/
	}
	
	.mint-msgbox-confirm {
		color: #f9be00 !important;
		width: 50%;
	}
</style>
<style scoped>
	.loginBottom{
		width: 100%;
		margin-top: 6rem;
	}
	.loginBottom img{
		width: 1.25rem;
		height: 1.25rem;
	}
	.loginBottom>span{
		height:1.5rem;
		font-size:1.2rem;
		font-family:PingFangSC-Regular;
		color:rgba(214,214,214,1);
		line-height:1.5rem;
	}
	
	.login-input div {
		width: 29rem;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.login-text img {
		position: absolute;
		top: 2.8rem;
		right: 1.5rem;
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.login-password {
		position: relative;
	}
	
	.login-password .login_ {
		width: 7.9rem;
		height: 2.6rem;
		line-height: 2.6rem;
		font-size: 1.4rem;
		color: #999;
		font-family: PingFangSC-Light;
		border: 1px solid #999;
		border-radius: 0.5rem;
		position: absolute;
		right: 0;
		bottom: 0.9rem;
		cursor: pointer;
	}
	
	.login-password .login1_ {
		color: #CCCCCC;
		border-color: #CCCCCC;
	}
	
	.login-password img {
		position: absolute;
		top: 1.5rem;
		right: 0.8rem;
		width: 2.4rem;
		height: 1.8rem;
	}
	
	.login-password .clear-img {
		position: absolute;
		top: 6.9rem;
		right: 5.8rem;
		width: 2rem;
		height: 2rem;
	}
	
	.login-password .password-img {
		position: absolute;
		top: 7rem;
		right: 0.8rem;
	}
	
	.login {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.login-img {
		width: 100%;
		height: 4.4rem;
		line-height: 4.5rem;
		text-align: center;
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		color: rgba(0, 0, 0, 1);
		position: relative;
		border: 1px solid #E2E2E2;
		margin-bottom: 5rem;
	}
	
	.login-img img {
		width: 1.5rem;
		height: 1.5rem;
		margin-top: 1.5rem;
		position: absolute;
		left: 1.5rem;
		/*margin-left: -28rem;*/
	}
	
	.login-landing {
		margin-top: 7rem;
		margin-bottom: 2rem;
	}
	
	.login-landing img {
		width: 6rem;
		height: 6rem;
	}
	
	.login-logoName {
		font-size: 1.2rem;
		color: #acacac;
		margin-top: 1rem;
		margin-bottom: 3rem;
	}
	
	.login-input {
		width: 29rem;
		margin-left: 4.25rem;
		position: relative;
	}
	
	.login-input input {
		width: 100%;
		height: 5.4rem;
		font-size: 1.4rem;
		-webkit-box-shadow: 0;
		-webkit-appearance: none;
		outline: none;
		box-sizing: border-box;
		display: flex;
		display: -webkit-flex;
		-ms-flex-pack: justify;
		-webkit-flex-pack: justify;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		-ms-flex-align: center;
		-webkit-flex-align: center;
		align-items: center;
		-webkit-align-items: center;
		padding-left: 0.8rem;
		padding-top: 1.5rem;
	}
	
	.login-input-admin {
		/*background: url("../../assets/images/password-icon.png") no-repeat 1rem ;*/
		/*border-bottom:1px solid #bababa;*/
		width: 1.1rem;
		height: 1.5rem;
		background-size: 4%;
	}
	
	.login-input-psd {
		/*border-bottom:1px solid #bababa;*/
		/*background: url("../../assets/images/phone1-icon.png") no-repeat 1rem;*/
		width: 1.1rem;
		height: 1.5rem;
		background-size: 4%;
	}
	
	.login-next {
		margin-top: 2rem;
		margin-bottom: 5rem;
		width: 100%;
	}
	
	.login-next .login-forget {
		font-size: 1.4rem;
		color: #5b5b5b;
		margin-left: 8.65%;
	}
	
	.login-next .login-register {
		font-size: 1.4rem;
		color: #5b5b5b;
		margin-right: 8.65%;
	}
	
	.login-btn {
		width: 29rem;
		height: 4rem;
		background: #E4E4E4;
		font-size: 1.5rem;
		color: #fff;
		letter-spacing: 0.2rem;
		text-align: center;
		line-height: 4.3rem;
		margin-left: 4.25rem;
		margin-top: 3rem;
		border-radius: 0.5rem;
	}
	
	.login-btn1 {
		background: #FFD85A;
		border-radius: 0.5rem;
		color: #333;
	}
	
	.active {
		/*background: #f9be00;*/
	}
	
	.login-alert {
		width: 50%;
		margin-left: 25%;
		color: #e4393c;
		font-size: 1.2rem;
		text-align: center;
		margin-top: 1.3rem;
	}
	
	.cover-tap {
		width: 100%;
		height: 4.9rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 2;
		left: 0;
	}
	.login-three{
		/*margin-top: 4.5rem;*/
	}
	.login-three div{
		/*color: #acacac;
		font-size: 1.2rem;
		margin-top: 6rem;
		width: 100%;
		margin-bottom: 3.5rem;*/
		font-size:1.4rem;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
		float: left;
		margin-left:40%
	}
	.login-three img{
		float: left;
		width:1rem;
		height:1.4rem;
		margin-left:0.5rem;
	}
	.login-three .login-three-left {
		border-bottom: 1px solid #acacac;
		width: 27%;
		margin-left: 8.65%;
		margin-top: 0.5rem;
	}
	
	.login-three .login-three-right {
		border-bottom: 1px solid #acacac;
		width: 27%;
		margin-top: 0.5rem;
		margin-right: 8.65%;
	}
	
	.login-three-img {
		/*margin-top:28px;*/
		display: inline-block;
		font-size:28px;
		font-family:PingFangSC-Regular;
		color:rgba(153,153,153,1);
	}
	
	/*.login-three-img div {
		width: 6rem;
		height: 6rem;
		margin-left: 5.1rem;
		float: left;
	}
	
	.login-three-img img {
		width: 6rem;
		height: 6rem;
	}
	
	.login-three-img .login-three-weixin {
		margin-left: 0;
	}
	*/
	.floatL {
		float: left;
	}
	
	.floatR {
		float: right;
	}
	
	.clearfix {
		zoom: 1;
	}
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
		visibility: visible
	}
	
	.register-protocol {
		margin-top: 1.5rem;
		margin-bottom:3rem;
		margin-left: 4.25rem;
		color: rgba(153, 153, 153, 1);
		text-align: left;
		font-size: 1.2rem;
	}
	
	.register-protocol span {
		font-family: PingFangSC-Light;
		color: #B1A07D;
	}
	
	.register-protocol .icon {
		display: inline-block;
		width: 1.2rem;
		height: 1.2rem;
	}
	
	.register-protocol .icon img {
		width: 100%;
		height: 100%;
	}
	
	.login-input .remind {
		color: #CC453A;
	    font-size: 1.2rem;
	    font-family: PingFangSC-Regular;
	    border-bottom: none;
	    text-align: left;
	    margin-top: 1rem;
	    float: left;
	    margin-right: 1.5rem;
	}
	.login-input .remind01{
		margin-left: 0.5rem;
	}
	input::-webkit-input-placeholder{
		color:#CCCCCC;
	}
</style>