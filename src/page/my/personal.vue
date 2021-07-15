<template>
	<div class="personal">
		<div class="personal-img clearfix">
			<div class="divImg2" @click="back1()">
				<img src="../../assets/images/returnFront.png">
			</div>
			<div class="divImg1">个人信息</div>
		</div>
		<div class="myIndex_flow myIndex_flow1">
			<div class="touxiang">
				<input id="upload" type="file" accept="image/*;" capture="camera">
				<img v-if="this.showImgHead==1" :src="headPicPath" class="img_wrap">
				<img v-if="this.showImgHead==3" src="../../assets/images/tab/touxiang.png" class="img_wrap">
				<div>点击修改头像</div>
			</div>
			<!--<div class="myIndex_action_look1">
          <img class="imgGo" src="../../assets/images/icon_go.png">
          <img  v-if="this.showImgHead==1" :src="headPicPath" class="img_wrap" >
          <img  v-if="this.showImgHead==3" src="../../assets/images/nullImg.png" class="img_wrap" >
        </div>-->
		</div>
		<div class="personal-line"></div>
		<div class="myIndex_flow">
			<div class="myIndex_action_my">用户名</div>
			<div class="myIndex_action_look3"><span>{{account}}</span></div>
		</div>
		<div class="myIndex_flow">
			<div class="myIndex_action_my">昵称</div>
			<div class="myIndex_action_look2">
				<!--<img src="../../assets/images/icon_go.png">-->
				<input @click="focus()" id="niCheng1" v-if="niCheng!='' && niCheng!='undefined'" placeholder="未设置" v-model="niCheng" type="text" maxlength="15">
				<input @click="focus1()" id="niCheng2" v-if="niCheng==''" placeholder="未设置" v-model="niCheng" type="text" maxlength="15">
			</div>
		</div>
		<div class="myIndex_flow" @click="sex1()">
			<div class="myIndex_action_my">性别</div>
			<div class="myIndex_action_look4">
				<label v-if='allShow==2'><input type="radio" v-model="gender" value="man"  @change='changes' class="active1"/>男</label>
				<label v-if='allShow==2'><input  type="radio" v-model="gender" value="woman" class="woman" @change='changes'/>女</label>
				<label v-if='allShow==1'><input type="radio" v-model="gender" value="man" class="man" @change='changes'/>男</label>
				<label v-if='allShow==1'><input type="radio" v-model="gender" value="woman"  @change='changes' class="active1"/>女</label>
				<!--<img src="../../assets/images/icon_go.png">-->
				<!--<mt-actionsheet
            :actions="actions1"
            v-model="sheetVisible">
          </mt-actionsheet>
          <div v-if="sex=='male'">男</div>
          <div v-if="sex=='female'">女</div>-->
			</div>
		</div>
		<div class="myIndex_flow">
			<div class="myIndex_action_my">出生日期</div>
			<div class="myIndex_action_look5">
				<!--<img src="../../assets/images/icon_go.png">-->
				<input id="birthday1" v-if="birthday != '' && birthday != null" placeholder="未设置" v-model="birthday" type="text" maxlength="15"  autocapitalize="on">
				<input id="birthday2" v-if="birthday == '' || birthday == null || !birthday" placeholder="填写格式为xxxx-xx-xx" v-model="birthday" type="tel" maxlength="15" autocapitalize="on">
			</div>
		</div>
		<div class="personal-line"></div>
		<div class="myIndex_flow">
			<div class="myIndex_action_my myIndex_action_my1">公司
				<img src="../../assets/images/huiyuan/time.png" alt="">
			</div>
			<div class="myIndex_action_look6">
				<!--<img src="../../assets/images/icon_go.png">-->
				<!--<div  id="birthday2" v-if="birthday == '' || birthday == 'null' || !birthday" v-model="birthday" >填写公司名称，免费成为<span>会员</span></div>-->
				<input id="birthday1" v-if="companyName!=''" placeholder="未设置" v-model="companyName" type="text" maxlength="15">
				<input id="birthday2" v-if="companyName==''" placeholder="填写公司名称，免费成为会员" v-model="companyName" type="text" maxlength="15">
			</div>
		</div>
		<div class="personal-line"></div>
		<div class="login-btn login-btn1" @click="save1()">取消</div>
		<div class="login-btn" @click="save()">保存</div>
	</div>
</template>
<style scoped>
	.login-btn {
		width: 50%;
		height: 5.4rem;
		background:#FFD85A;
		font-size: 1.7rem;
		color: #333;
		letter-spacing: 0.2rem;
		text-align: center;
		line-height: 5.4rem;
		/*margin-left: 4%;*/
		/*border-radius: 0.2rem;*/
		/*margin-top: 3.5rem;*/
		float: left;
		/*margin-top: 1.7rem;*/
	}
	
	.login-btn1 {
		background: #FAFAFA;
	}
	/*.myIndex_action_look4 div{
    float: right;
    margin-right: 1rem;
    color: #252525;
    font-size: 1.4rem;
  }*/
	/*.myIndex_action_look1 .imgGo{
    width: 0.7rem;
    margin-top: 2.1rem;
    float: right;
    margin-right: 0%;
    margin-left: 15%;
  }*/
	/*.myIndex_action_look4 img{
    width: 0.7rem;
    margin-top: 2.1rem;
    float: right;
    margin-right: 4%;
    margin-left: 0%;
  }*/
	
	.myIndex_action_look4 {
		float: left;
		margin-left: 6rem;
	}
	
	.myIndex_action_look4 label {
		font-size: 1.4rem;
		line-height: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(102, 102, 102, 1);
		margin-right: 9rem;
	}
	
	.myIndex_action_look4 input {
		width: 1.5rem;
		height: 1.5rem;
		/*border: 1px solid #666;*/
		border-radius: 50%;
		margin-right: 1rem;
	}
	
	.myIndex_action_look4 .man {
		background: url('../../assets/images/tab/all_icon.png') no-repeat -0.2rem;
	}
	
	.myIndex_action_look4 .woman {
		background: url('../../assets/images/tab/all_icon.png') no-repeat -0.2rem;
	}
	
	.personal-img .divImg1 {
		float: left;
		height: 4rem;
		margin-left: 11.5rem;
	}
	
	.personal-img .divImg2 {
		width: 4rem;
		float: left;
		height: 4rem;
	}
	
	.touxiang {
		height: 100%;
		/*position: relative;*/
	}
	
	.touxiang input {
		opacity: 0;
		width: 100%;
		height: 12.5rem;
		/*float: left;*/
		position: absolute;
		/*top: 5rem;*/
		left: 50%;
		margin-left: -19rem;
	}
	
	.touxiang img {
		width: 9rem;
		height: 9rem;
		margin-top: 2rem;
		border-radius: 50%;
	}
	
	.touxiang div {
		line-height: 0rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(153, 153, 153, 1);
	}
	
	.personal {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.active1{
		border: 1px solid #666;
	}
	.personal-img {
		width: 100%;
		/*position:relative;*/
		display: block;
		color: #252525;
		font-size: 1.8rem;
		height: 4.4rem;
		line-height: 4.4rem;
		border-bottom: 1px solid #E2E2E2;
	}
	
	.personal-img img {
		width: 1.2rem;
		height: 2rem;
		margin-top: 1rem;
		position: absolute;
		left: 1.2rem;
		/*margin-left: -28rem;*/
	}
	
	.personal-line {
		height: 1rem;
		background: #f4f4f4;
		width: 100%;
		/*border-top:1px solid #d8d8d8;*/
	}
	
	.myIndex_flow {
		height: 5.5rem;
		line-height: 5.5rem;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.myIndex_flow1 {
		height: 16rem;
	}
	
	.myIndex_action_my {
		color: #333;
		font-size: 1.5rem;
		float: left;
		height: 5.5rem;
		line-height: 5.5rem;
		margin-left: 4%;
	}
	
	.myIndex_action_my1 {
		position: relative;
	}
	
	.myIndex_action_my1 img {
		width: 4rem;
		height: 1.2rem;
		position: absolute;
		top: 0.9rem;
		left: 3rem;
	}
	
	.myIndex_action_look1 {
		height: 100%;
		line-height: 16.5rem;
	}
	
	.myIndex_action_look1 .img_wrap {
		width: 9rem;
		height: 9rem;
		border-radius: 50%;
		margin-top: 3rem;
		/*float: right;*/
	}
	
	.myIndex_action_look2 img {
		width: 0.7rem;
		margin-top: 2.1rem;
		float: right;
		margin-right: 4%;
	}
	
	.myIndex_action_look2 input {
		float: left;
		font-size: 1.4rem;
		color: #666;
		height: 5.5rem;
		margin-left: 6.4rem;
	}
	
	.myIndex_action_look3 span {
		float: left;
		font-size: 1.4rem;
		color: #333333;
		margin-left: 5rem;
	}
	
	.myIndex_action_look5 {
		float: left;
		margin-left: 3rem;
	}
	
	.myIndex_action_look5 input {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(102, 102, 102, 1);
	}
	
	.myIndex_action_look6 {
		float: left;
		margin-left: 5.8rem;
	}
	
	.myIndex_action_look6 input {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(102, 102, 102, 1);
		width: 24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.myIndex_action_look6 div {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(102, 102, 102, 1);
	}
	
	.myIndex_action_look6 div span {
		color: #EB544D;
	}
	/*.myIndex_action_look4 span{
    float: right;
    width: 4.5rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 0.4rem;
    margin-top: 2rem;
    margin-right: 4%;
    border: 1px solid #acacac;
    font-size: 1.4rem;
  }*/
	
	.active {
		color: #f9be00;
		border: 1px solid #f9be00 !important;
	}
	/*.activeW{*/
	/*border: 1px solid #d6d6d6;*/
	/*color: #bebebe;*/
	/*}*/
</style>
<script>
	import Vue from 'vue'
	import { Toast, Indicator } from 'mint-ui';
	import { Actionsheet } from 'mint-ui';
	import { api_get, api_post } from '../../util/api.js'
	Vue.component(Actionsheet.name, Actionsheet)
	export default {
		name: 'personal',
		data() {
			return {
				AlertChange: false,
				niCheng: '',
				birthday: '',
				sex: '',
				userId: '',
				account: '',
				loginCode: '',
				headPortrait: '',
				checkboxData: '',
				imgHead: '',
				headPicPath: '',
				showImgHead: 2,
				sheetVisible: false,
				actions1: [],
				androad: '',
				gender: '',
				allShow: 1,
				companyName: '',
				isNicheng: '',
			}
		},
		mounted() {
			// this.imgHead= window.localStorage.getItem('imgHead')
			this.admin22();
			this.getLi();
			this.getCamara();
		},
		methods: {
			getCamara: function() {
				var _this = this
				var demo_h5_upload_ops = {
					init: function() {
						this.eventBind();
					},
					eventBind: function() {
						var that = this;
						$("#upload").change(function() {
							var reader = new FileReader();
							reader.onload = function(e) {
								that.compress(this.result);
							};
							reader.readAsDataURL(this.files[0]);
						});
					},
					compress: function(res) {
						var that = this;
						var img = new Image(),
							maxH = 300;
						img.onload = function() {
							var cvs = document.createElement('canvas'),
								ctx = cvs.getContext('2d');
							if(img.height > maxH) {
								img.width *= maxH / img.height;
								img.height = maxH;
							}
							cvs.width = img.width;
							cvs.height = img.height;
							ctx.clearRect(0, 0, cvs.width, cvs.height);
							ctx.drawImage(img, 0, 0, img.width, img.height);
							var dataUrl = cvs.toDataURL('image/jpeg', 1);
							$(".img_wrap").attr("src", dataUrl);
							$(".img_wrap").show();
							// this.imgHead=dataUrl
							window.localStorage.setItem('dataUrl', dataUrl);
							console.log(dataUrl);
							// 上传略
							// that.upload( dataUrl );
						};
						img.src = res;
					},
				};
				$(document).ready(function() {
					demo_h5_upload_ops.init();
				});
			},
			getLi: function() {
				var u = navigator.userAgent
				if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) { //是Android
					this.androad = true
				} else { //是IOS
					this.androad = false
				}
				if(window.localStorage.getItem('niCheng') == "null") {
					this.niCheng = ''
				} else {
					this.niCheng = window.localStorage.getItem('niCheng');
				}
				this.userId = window.localStorage.getItem('userId');
			},
			//保存信息
			save: function() {
				console.log('储存');
				// let url = HOST_HDPUSER+'/user/updateMemberInfo';
				this.userId = window.localStorage.getItem('userId')
				this.account = window.localStorage.getItem('account')
				this.mobile = window.localStorage.getItem('mobile')
				this.loginCode = window.localStorage.getItem('loginCode')
				this.imgHead = window.localStorage.getItem('dataUrl')
				// if(this.imgHead == 'null'){
				//   this.imgHead = ''
				// }else{
				//   // this.imgHead= window.localStorage.getItem('imgHead');
				// }
				// window.localStorage.setItem('imgHead', this.imgHead);
				console.log(this.account)
				api_post({
					url: HOST_HDPUSER + '/hdp/user/app/update',
					data: {
						'birthday': this.birthday,
						'companyName': this.companyName,
						'expireTime': '',
						'headPic': this.imgHead, //头像
						"id": this.userId,
						'invitationCode ': '',
						'isFirstLogin': '2',
						"loginCode": this.loginCode,
						"nickName": this.niCheng,
						"sex": this.allShow,
						'userType': '',
						"userName ": this.account,
					}
				}).then(res => {
					console.log(res)
					if(res.code == 200) {
						Indicator.open({
							text: '保存中...',
							spinnerType: 'fading-circle'
						});
						// 这里加延时是因为图片服务器保存base64需要一定的时间，如果瞬间返回到myindex页面，获取的头像可能是暂无图片
						setTimeout(() => {
							Indicator.close();
							Toast({
								message: '保存成功！',
								duration: 500,
								className: "toast"
							});
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex";
						}, 1000);
					} else {
						Toast({
							message: '保存失败！',
							duration: 500,
							className: "toast"
						});
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex";
					}
				})
			},
			back1: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex";
			},
			sex1: function() {
				var _this = this
				_this.sheetVisible = true
				_this.actions1 = [{}, {}]
				_this.actions1[0].name = "男"
				_this.actions1[0].method = function() {
					_this.sex = 'male'
				}
				_this.actions1[1].name = "女"
				_this.actions1[1].method = function() {
					_this.sex = 'female'
				}
			},
			chice1: function(event) {
				this.sex = 'male'
				this.$nextTick(() => {
					let aa = this.$refs.aa
					let bb = this.$refs.bb
					/* if(aa.className=="active"){
					  bb.className="";
					}else{
					  aa.className="active";
					  bb.className="";
					} */
				})
				var event = event || window.event;
				var target = event.target || event.srcElement;
				/* if(target.className!='active'){
				  target.className="active"
				}else{
				  target.className="active"
				} */
			},
			chice2: function(event) {
				this.sex = 'female'
				//          this.sex = 'male'
				this.$nextTick(() => {
					let aa = this.$refs.aa
					let bb = this.$refs.bb
					/* if(bb.className=="active"){
					  aa.className="";
					}else{
					  bb.className="active";
					  aa.className="";
					} */
				})
				var event = event || window.event;
				var target = event.target || event.srcElement;
				/* if(target.className!='active'){
				  target.className="active"
				}else{
				  target.className="active"
				} */
			},
			//获取用户信息
			admin22: function() {
				this.account = window.localStorage.getItem('account');
				this.loginCode = window.localStorage.getItem('loginCode')
				api_get({
					url: HOST_HDPUSER + '/hdp/user/app/judgeLogin',
					data: {
						loginCode: this.loginCode
					}
				}).then(response => {
					// console.log(response)
					if(response.code == 200) {
						this.checkboxData = response.respBody;
						this.headPicPath = response.respBody.headimg;
						this.companyName = response.respBody.companyName;
						this.birthday = response.respBody.birthday;
						this.sex = response.respBody.sex;
						this.niCheng=response.respBody.nickName;
						if(response.respBody.userName!=''&&response.respBody.userName!=null){
							this.account=response.respBody.userName;
						}else{
							this.account=response.respBody.id;
						}
						if(this.headPicPath != null && this.headPicPath != 'undefined' && this.headPicPath != '') {
							this.showImgHead = 1
						} else {
							this.showImgHead = 3
						}
						if(this.sex == '女') {
							this.allShow = 2;
						} else {
							this.allShow = 1;
						}
					} else {
						this.showImgHead = 3
					}
				})
			},
			set_text_value_position: function(obj, spos) {
				// console.log(spos)
				var tobj = document.getElementById(obj);
				if(spos < 0)
					spos = tobj.value.length;
				if(tobj.setSelectionRange) { //兼容火狐,谷歌
					setTimeout(function() {
						tobj.setSelectionRange(spos, spos);
						tobj.focus();
					}, 0);
				} else if(tobj.createTextRange) { //兼容IE
					var rng = tobj.createTextRange();
					rng.move('character', spos);
					rng.select();
				}
			},
			focus: function() {
				function set_text_value_position(obj, spos) {
					var tobj = document.getElementById(obj);
					if(spos < 0)
						spos = tobj.value.length;
					if(tobj.setSelectionRange) { //兼容火狐,谷歌
						setTimeout(function() {
							tobj.setSelectionRange(spos, spos);
							tobj.focus();
						}, 0);
					} else if(tobj.createTextRange) { //兼容IE
						var rng = tobj.createTextRange();
						rng.move('character', spos);
						rng.select();
					}
				}
				//调用演示
				set_text_value_position('niCheng1', -1); //设置到末尾
				//          set_text_value_position('niCheng1', 0); //设置到开头
			},
			focus1: function() {
				function set_text_value_position(obj, spos) {
					var tobj = document.getElementById(obj);
					if(spos < 0)
						spos = tobj.value.length;
					if(tobj.setSelectionRange) { //兼容火狐,谷歌
						setTimeout(function() {
							tobj.setSelectionRange(spos, spos);
							tobj.focus();
						}, 0);
					} else if(tobj.createTextRange) { //兼容IE
						var rng = tobj.createTextRange();
						rng.move('character', spos);
						rng.select();
					}
				}
				//调用演示
				set_text_value_position('niCheng2', -1); //设置到末尾
				//          set_text_value_position('niCheng2', 0); //设置到开头
			},
			changes: function() {
				if(this.gender == 'man') {
					this.allShow = 1;
				} else if(this.gender == 'woman') {
					this.allShow = 2;
				}
			},
			save1: function() {
				this.$router.push({
					path: 'myIndex'
				})
			},
		},
	}
</script>