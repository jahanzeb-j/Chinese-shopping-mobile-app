<template>
	<div class="tplLogin">
		<div class="tplLogin-img clearfix">
			绑定手机号
			<img @click="back()" src="../../assets/images/returnFront.png">
		</div>
		<!--<div class="tplLogin-line"></div>-->
		<div class="register-input">
			<div class="login-btn-time " v-show="!stop && ifRegister" @click='startTimer'>获取验证码</div>
			<div class="login-btn-time active" v-show="!stop && !ifRegister" @click='tiShi'>获取验证码</div>

			<div class="login-btn-time1" v-show="stop">{{massage}}</div>
			<input type="tel" placeholder="请输入手机号" class="register-input-admin" v-model="admin">
			<input type="tel" placeholder="请输入验证码" class="register-input-admin" v-model="verification" @focus="verifica()">
			<p v-if="yzmFlag" class="remind">{{this.tip}}</p>
		</div>
		<div class="login-btn" @click="Login()" v-show="AlertChange">绑定手机号</div>
		<div class="login-btn login-btn1" v-show="!AlertChange" @click="Login1()">绑定手机号</div>
		<div class="register-protocol">
			<div class="icon">
				<img src="../../assets/images/gou.png" alt="">
			</div>
			我同意
			<span class="register-protocol-aa" @click="protocol()">《好单品商城用户使用协议》</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				timer: 60, //默认倒数30秒
				stop: false, //默认是停止的，但界面加载之后会变成false
				Interval: null, //setInterval的对象
				admin: '',
				loginAlert: false,
				AlertChange: false,
				verification: '',
				checked: true,
				loginCode: '',
				phoneNumber: '',
				ifRegister: false,
				authCode: '',
				mobileCode: '',
				mobile: '',
				loginBack: '',
				loginUrl: '',
				massage: '',
				yzmFlag: false,
				tip: '',
				no_exhibitionId: this.$route.query['exhibitionId'],
				no_userId: this.$route.query['userId'],
				exhibitionId:'',
				userId:''
			}
		},
		watch: {
			verification: function() {
				if(this.admin != "" && this.verification != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
				}
			},
			checked: function() {
				if(this.admin != "" && this.verification != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
				}
			},
			timer: function() {
				this.timer;
			},
			admin: function() {
				let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
				let flag = reg.test(this.admin); //true
				if(flag) {
					//            console.log("aa")
					this.ifRegister = true;
				} else if(!flag) {
					//          console.log("bb")
					this.ifRegister = false;
				};
			},
		},
		mounted() {
			this.exhibitionId = window.localStorage.getItem('scan-exhibitionId');
			this.userId = window.localStorage.getItem('scan-userId')
			console.log(this.userId)
		},
		
		methods: {
			//手机号失去焦点
			// phoneBlur() {
			//   console.log('11')
			//   if (this.admin) {
			//     let reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
			//     let flag = reg.test(this.admin);
			//     console.log(flag);
			//     if (flag) {
			//       this.phonetrue = true;
			//       let data = {
			//         phoneNum: this.admin
			//       }
			//       let url = HOST_HDPUSER + "/user/verifyPhoneNum"
			//       this.$api_get_no({
			//         url: url,
			//         data: data
			//       }).then(res => {
			//         console.log(res)
			//         if (res.code == 100) {
			//           this.yzmFlag = true;
			//           this.tip = "手机号已注册，请登录";
			//         } else{
			//           this.yzmFlag = false;
			//         }
			//       })
			//     } else if (!flag) {
			//       this.yzmFlag = true;
			//       this.tip = "请您输入正确的手机号！";
			//       return
			//     }
			//   }
			// },
			Login1: function(event) {
				if(this.admin.length != 11 && this.admin.length != '') {
					Toast({
						message: '请输入正确手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(this.admin.length == '') {
					Toast({
						message: '请输入手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(this.verification.length == '') {
					Toast({
						message: '请输入验证码',
						duration: 3000,
						className: "toast"
					});
				}
			},
			verifica: function() {
				let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
				let flag = reg.test(this.admin); //true
				if(this.admin == "") {
					Toast({
						message: '请输入手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(!flag) {
					Toast({
						message: '请输入正确手机号',
						duration: 3000,
						className: "toast"
					});
				}
			},
			Login: function() {
				//注册接口
				let url = HOST_HDPUSER + '/weixin/mobileLogin';
				this.authCode = window.localStorage.getItem('authCode');
				console.log(this.authCode)
				console.log(this.exhibitionId);
				console.log(this.userId)
				this.$resource(url).get({
					mobile: this.admin,
					mobileCode: this.verification,
					authCode: this.authCode,
					loginCode: this.loginCode,
					exhibitionId:this.exhibitionId,
					userId:this.userId,
				}).then((response) => {
					console.log(response)
					if(response.body.code == -1) {
						window.localStorage.setItem('mobileCode', this.verification);
						window.localStorage.setItem('mobile', this.admin);
//						window.localStorage.setItem('exhibitionId', this.no_exhibitionId);
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'tplLoginPwd'
					} else if(response.body.code == -2) {
						Toast({
							message: response.body.message,
							duration: 3000,
							className: "toast"
						});
						setTimeout("window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'", 3000)
					} else if(response.body.code == 200) {

						window.localStorage.setItem('loginCode', response.body.respBody.loginCode);
						window.localStorage.setItem('userId', response.body.respBody.userId);
						window.localStorage.setItem('account', response.body.respBody.account);
						window.localStorage.setItem('userName', response.body.respBody.userName);
						window.localStorage.setItem('mobile', response.body.respBody.mobile);
						window.localStorage.setItem('userType', response.body.respBody.userType);
						window.localStorage.setItem('exhibitionId', this.no_exhibitionId);
						window.localStorage.setItem('userId', this.no_userId);
						this.loginUrl = window.localStorage.getItem('loginUrl');
						this.loginBack = window.localStorage.getItem('loginBack');
						let loginBack = this.loginBack;
						if(loginBack == "001") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?releaseBack=001&' + this.loginUrl
						} else if(loginBack == "002") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?' + this.loginUrl
						} else if(loginBack == "003") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?' + this.loginUrl
						} else if(loginBack == "004") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?' + this.loginUrl
						} else if(loginBack == "005") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex?' + this.loginUrl
						} else if(loginBack == "010") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.loginUrl
						} else if(loginBack == "011") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.loginUrl
						} else if(loginBack == "012") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.loginUrl
						} else if(loginBack == "013") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + this.loginUrl
						}
						//主题留言
						else if(loginBack == "100") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.loginUrl
						}
						//预约展厅
						else if(loginBack == "110") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?' + this.loginUrl
						}
						//详情购物车登录
						else if(loginBack == "120") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shopping=2&' + this.loginUrl
						}
						//找货购物车登录
						else if(loginBack == "130") {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shoppingBack=004&' + this.loginUrl
						} else if(loginBack == undefined) {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex?' + this.loginUrl
						}
					} else if(response.body.code == -100) {
						Toast({
							message: response.body.message,
							duration: 3000,
							className: "toast"
						});
					}
				})
			},
			update() {
				if(this.timer <= 0) {
					this.timer = 60;
					clearInterval(this.Interval);
					this.stop = false;
					this.massage = '获取验证码'
				} else {
					this.timer--
						this.massage = this.timer + '秒后重发';
				}
			},
			startTimer() {
				//如果是false就开始倒计时，如果是true就停止倒计时
				this.stop = true
				if(this.stop == true) {
					this.Interval = setInterval(this.update, 1000);
				} else {
					clearInterval(this.Interval);
				}
				this.timer = this.timer
				//发送验证码接口
				let url = HOST_HDPUSER + '/user/sendMessage';
				this.loginCode = window.localStorage.getItem('loginCode');
				this.$resource(url).get({
					phoneNum: this.admin
				}).then((response) => {
					if(response.status == 200) {
						// console.log(response.code)
						if(response.data.code == 200) {

						} else {
							Toast({
								message: response.data.message,
								duration: 30010,
								className: "toast"
							});
						}
						// this.checkboxData = response.body
					}
				})
			},
			back: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
			},
			tiShi: function() {
				let reg = /^1[3|4|5|6|7|8][0-9]{9}$/; //验证规则
				let flag = reg.test(this.admin); //true
				if(this.admin == "") {
					Toast({
						message: '请输入手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(!flag) {
					Toast({
						message: '请输入正确手机号',
						duration: 3000,
						className: "toast"
					});
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
		width: 100%;
		font-size: 1.2rem;
		text-align: center;
		/*margin-top:1.3rem;*/
	}
</style>
<style scoped>
	.tplLogin {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.tplLogin-img {
		width: 100%;
		/*position:relative;*/
		display: block;
		color: #252525;
		font-size: 1.8rem;
		height: 4.4rem;
		line-height: 4.4rem;
		border-bottom: 1px solid #E2E2E2;
		font-family: PingFangSC-Light;
	}
	
	.tplLogin-img img {
		width: 1.2rem;
		height: 2rem;
		margin-top: 1rem;
		position: absolute;
		left: 1.2rem;
		/*margin-left: -28rem;*/
	}
	
	.tplLogin-line {
		height: 1rem;
		background: #f4f4f4;
		width: 100%;
		border-top: 1px solid #d8d8d8;
	}
	
	.register-input {
		width: 100%;
		padding: 0 3rem;
		margin-top: 5rem;
		position: relative;
	}
	
	.login-btn-time {
		height: 3.2rem;
		float: right;
		border: 1px solid #f9be00;
		background: #fff;
		border-radius: 0.4rem;
		color: #f9be00;
		line-height: 3rem;
		font-size: 1.4rem;
		position: absolute;
		right: 3rem;
		width: 9rem;
		text-align: center;
		top: 5.8rem;
		right: 4rem;
	}
	
	.register-input input {
		width: 100%;
		height: 5rem;
		padding-left: 1rem;
		font-size: 1.4rem;
	}
	
	.register-input-admin {
		border-bottom: 1px solid #E2E2E2;
		width: 1.1rem;
		height: 1.5rem;
	}
	
	.register-input .login-btn-time1 {
		height: 3rem;
		float: right;
		border: 1px solid #acacac;
		background: #fff;
		border-radius: 0.4rem;
		color: #acacac;
		line-height: 3rem;
		font-size: 1.4rem;
		position: absolute;
		right: 3rem;
		width: 8rem;
		text-align: center;
		margin-top: 6.5rem;
	}
	
	.login-btn {
		width: 31.5rem;
		height: 4.4rem;
		background: #f9be00;
		font-size: 1.7rem;
		color: #333;
		letter-spacing: 0.2rem;
		text-align: center;
		line-height: 4.4rem;
		margin: 0 auto;
		margin-top: 3.5rem;
		border-radius: 0.2rem;
	}
	
	.active {
		color: #999;
		border-color: #B2B2B2;
	}
	
	.login-btn1 {
		background: #D6D6D6;
		color: #fff;
	}
	
	.register-protocol {
		margin-top: 1.5rem;
		margin-left: 3rem;
		color: rgba(153, 153, 153, 1);
		text-align: left;
		font-size: 1.3rem;
	}
	
	.register-protocol span {
		font-family: PingFangSC-Light;
		color: #FFD85A;
	}
	
	.register-protocol .icon {
		display: inline-block;
		width: 1.2rem;
		height: 1.2rem;
		;
	}
	
	.register-protocol .icon img {
		width: 100%;
		height: 100%;
	}
	
	.remind {
		position: absolute;
		bottom: -2rem;
		color: #EB544D;
		font-size: 1.2rem;
		font-family: PingFangSC-Regular;
		border-bottom: none;
		text-align: left;
		margin-top: 1rem;
	}
</style>