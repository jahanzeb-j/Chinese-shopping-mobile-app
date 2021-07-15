<template>
	<div class="myIndex">
		<!--未登录/普通会员登录/-->
		<div @click="personal()" class="myIndex_orange clearfix" v-if='this.userType != 1'>
			<div class="myIndex_logo" v-if="this.imgHead==''|| this.imgHead==null"><img src="../../assets/images/tab/touxiang.png"></div>
			<div class="myIndex_logo" v-if="this.imgHead!=''&& this.imgHead!='null'"><img :src="imgHead"></div>
			<div class="myIndex_name">{{nickName}}</div>
			<div class="login_" v-if="isShow">登录/注册</div>
			<div class="setAccountBox">
				<span class="personLogo"></span><span class="setAccountLogo" @click.stop="account"></span>
			</div>
		</div>
		<!--会员过期-->
		<div @click="personal()" class="myIndex_orange  clearfix"  v-if='this.userType==1 && this.time !=1' >
			<div class="myIndex_logo" v-if="this.imgHead==''||this.imgHead==null"><img src="../../assets/images/tab/touxiang.png"></div>
			<div class="myIndex_logo" v-if="this.imgHead!=''&& this.imgHead!='null'"><img :src="imgHead"></div>
			<div class="myIndex_name">{{nickName}}</div>
			<!--<div class="overdue" v-if="isShow1">
			        会员过期，马上续费
			        <img src="../../assets/images/tab/fanhui2.png" alt="">
			    </div>-->
			<div class="setAccountBox">
				<span class="personLogo"></span><span class="setAccountLogo" @click.stop="account"></span>
			</div>
		</div>
		<!--员工会员登录-->
		<div @click="personal()" class="myIndex_orange  myIndex_orange1 clearfix" v-if='this.userType==1 && this.time==1'>
			<div class="myIndex_logo" v-if="this.imgHead==''|| this.imgHead==null"><img src="../../assets/images/tab/touxiang.png"></div>
			<div class="myIndex_logo" v-if="this.imgHead!=''&& this.imgHead!='null'"><img :src="imgHead"></div>
			<div class="myIndex_name myIndex_name1">{{nickName}}</div>
			<div class="overdue overdue1" v-if='companyName!="" || companyName!=null'>
				{{companyName}}
				<!--会员有效期至{{expireTime}}
        			<img src="../../assets/images/tab/fanhui1.png" alt="">-->
			</div>
			<div class="overdue overdue2" v-if='companyName!="" || companyName!=null'>
				<!--{{companyName}}-->
				会员有效期至{{expireTime}}
				<img src="../../assets/images/tab/fanhui1.png" alt="">
			</div>
			<div class="vip">
				<img src="../../assets/images/tab/v@3x1.png" alt="">
			</div>
			<div class="setAccountBox">
				<span class="personLogo1"></span><span class="setAccountLogo1" @click.stop="account"></span>
			</div>
		</div>
		<div class="consummate" v-if='this.userType!=1' @click="membershipLink">
			<div>
				完善个人信息 , 免费成为
				<span> 好单品会员</span>
				<img src="../../assets/images/tab/login_go.png" alt="">
			</div>
		</div>
		<!--普通会员-->
		<div class="myIndex_action clearfix" @click="order()" v-if='this.userType!=1'>
			<div class="myIndex_action_my myIndex_action_my_active">
				我的订单
			</div>
			<div class="myIndex_action_lookAll">去看看</div><img src="../../assets/images/tab/icon_go.png" alt="">
			<div class="clearfix_box"></div>
		</div>
		<div class="clearfix_box"></div>
		<!--员工会员-->
		<div class="myIndex_action myIndex_action1 clearfix" @click="order()" v-if='this.userType==1'>
			<div class="myIndex_action_my myIndex_action_my_active">
				我的订单
			</div>
			<div class="myIndex_action_lookAll">去看看</div><img src="../../assets/images/tab/icon_go.png" alt="">
			<!--<div class="economize" v-if="this.time==0 && this.count!=0 && this.discount!=0">已消费<span>{{count}}</span>单,共节省<span>{{discount}}</span>元</div>
      				<div class="economize" v-if="this.time==1 && this.discount!=0">会员卡曾为你节省<span>{{discount}}</span>元</div>-->
			<!--<div class="clearfix_box"></div>-->
		</div>
		<div class="clearfix_box"></div>
		<div class="myIndex_banner clearfix navBanner">
			<div class="myIndex_banner_one" @click="dzf()">
				<div class="bubble" v-if="waitingPayNum !=0 ">{{waitingPayNum}}</div>
				<div><img src="../../assets/images/wait_icon.png"></div>
				<!--<div><i class="iconfont icon-haodanpinicon-2"></i></div>-->
				待付款
			</div>
			<div class="myIndex_banner_one" @click="dfh()">
				<div class="bubble" v-if="waitingSendGoodsNum !=0">{{waitingSendGoodsNum}}</div>
				<div><img src="../../assets/images/wfh_icon.png"></div>
				<!--<div><i class="iconfont icon-haodanpinicon-3"></i></div>-->
				待发货
			</div>
			<div class="myIndex_banner_one" @click="dsh()">
				<div class="bubble" v-if="waitingReceiveNum != 0">{{waitingReceiveNum}}</div>
				<div><img src="../../assets/images/dsh_icon.png"></div>
				<!--<div><i class="iconfont icon-haodanpinicon-1"></i></div>-->
				待收货
			</div>
			<div class="myIndex_banner_one" @click="assess()">
				<div class="bubble" v-if="finishedNum !=0">{{finishedNum}}</div>
				<div><img src="../../assets/images/dpj_icon.png"></div>
				<!--<div><i class="iconfont icon-haodanpinicon-"></i></div>-->
				待评价
			</div>
			<div class="myIndex_banner_one">
				<!-- <div class="bubble" v-if="refundNum !=0">{{refundNum}}</div> -->
				<div><img src="../../assets/images/thh_icon.png" @click="afterSellService_list()"></div>
				<!--<div><i class="iconfont icon-haodanpinicon-4" @click="afterSellService_list()"></i></div>-->
				退/换货
			</div>
		</div>
		<div v-if="!isPic" style="width:100%;height:1rem;background:#F4F4F4;"></div>
		<div class="myIndex_line" v-if="isPic">
			<img :src="advimg" alt="">
		</div>
		<!--  <div class="activityBanner">
      <a href="http://zt.99114.com/yw/2017zt/cs/dacuyd/index.html" style="display:block;width:100%;"><img src="../../assets/images/activityBanner.png" /></a>
    </div> -->
		<!--<div class="myIndex_flow" @click="shopping()">
      <div class="myIndex_action_my">我的预约</div>
      <div class="myIndex_action_look"></div>
    </div>-->
		<div class="myIndex_flow" @click="collection()">
			<div class="myIndex_action_my">我的收藏</div>
			<div class="myIndex_action_look"></div>
		</div>
		<div class="clearfix_box"></div>
		<div class="myIndex_flow" @click="address()">
			<div class="myIndex_action_my">地址管理</div>
			<div class="myIndex_action_look"></div>
		</div>
		<div class="clearfix_box"></div>
		<div class="myIndex_flow" @click="information()">
			<div class="myIndex_action_my">我的消息</div>
			<div class="myIndex_action_look"></div>
		</div>
		<div class="clearfix_box"></div>
		<!--<div class="myIndex_flow">
      <div class="myIndex_action_my">下载好单品APP</div>
      <div class="myIndex_action_look"></div>
    </div> -->
		<!-- <div class="myIndex_flow" @click="account()">
      <div class="myIndex_action_my">账号管理</div>
      <div class="myIndex_action_look"></div>
    </div> -->
		<div class="myIndex_line2"></div>
		<div>
			<!-- <div class="myIndex_goBack" @click="outLogin()"><span class="loginOut">退出登录</span></div> -->
		</div>
		<!-- <div class="myIndex_line3"></div> -->
		<!-- <bottomTab></bottomTab> -->
		<div class="pop_up" v-if='popShow' @click="popHide">
			<img @click="popHide" class='pop_guanbi' src="../../assets/images/huiyuan/guanbi@2x.png" alt="">
			<div class="pop_box">
				<img class="pop_pop" src="../../assets/images/huiyuan/pop.png" alt="">
				<img @click="popUp" class="popUp" :src="imgUrl" alt="">
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	import { Toast } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { SS } from '../../util/ls.js'
	import { api_get } from '../../util/api.js'
	import { formatDate } from '../../util/index.js'
	//  window.onbeforeunload=function(){
	//    window.localStorage.clear();
	//  }
	// import bottomTab  from  '../../component/bottomTab.vue'
	export default {
		name: 'myIndex',
		data() {
			return {
				nickName: '',
				account1: '',
				loginCode: '',
				check: 2,
				imgHead: '',
				showImgHead: "",
				allData: '',
				finishedNum: "",
				refundNum: "",
				waitingPayNum: "",
				waitingReceiveNum: "",
				waitingSendGoodsNum: "",
				userType: '',
				isShow: '',
				//订单量
				count: '',
				//省钱
				discount: '',
				//会员日期
				expireTime: '',
				imgUrl: '/static/img/up.png',
				popShow: false,
				//广告位
				advimg: '',
				isFirstLogin: '',
				time: 0,
				pop: 0,
				terminal: '',
				isPic: false,
				popNumber: '',
				companyName: '' //公司名称
			}
		},
		components: {
			// bottomTab
		},
		// created(){
		//    this.imgHead=window.localStorage.getItem("imgHead")
		//    if(this.imgHead !=''){
		//      this.showImgHead=1
		//    }
		// },
		mounted() {
			this.firstLogin();
			this.advShow()
		},
		methods: {
			//弹窗控制
			popUp: function() {
				this.imgUrl = '/static/img/down.png'
			},
			popHide: function() {
				this.popShow = false;
				window.localStorage.setItem('popNumber', 1)
			},
			firstLogin: function() {
				//判断是否登录
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode');
				this.userId = window.localStorage.getItem('userId');
				if(this.loginCode != "" && this.loginCode != null) {
					this.isShow = false;
					this.$resource(url).get({
						loginCode: this.loginCode
					}).then((response) => {
						if(response.status == 200) {
							if(response.data.code < 0) {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
							} else {
								this.admin223();
								this.getOrderNum()
							}
						}
					})
				} else {
					this.isShow = true;
					//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
				}
			},
			// 获取订单数量
			getOrderNum() {
				api_get({
					url: HOST_ORDERS + '/order/front/getOrderNums',
					data: {
						loginCode: window.localStorage.getItem('loginCode')
					}
				}).then(res => {
					if(res.code == 200) {
						let respBody = res.respBody
						for(var k in respBody) {
							if(respBody[k] && respBody[k] > 99) {
								respBody[k] = '99+'
							}
						}
						this.count = respBody.count;
						this.discount = respBody.discount;
						this.finishedNum = respBody.finishedNum;
						this.refundNum = respBody.refundNum;
						this.waitingPayNum = respBody.waitingPayNum;
						this.waitingReceiveNum = respBody.waitingReceiveNum;
						this.waitingSendGoodsNum = respBody.waitingSendGoodsNum;
					}
				})
			},
			// 获取个人信息
			admin223() {
				let url = HOST_HDPUSER + '/hdp/user/app/judgeLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.isFirstLogin = window.localStorage.getItem('isFirstLogin')
				this.isDptMember = window.localStorage.getItem('isDptMember ')
				this.pop = window.localStorage.getItem('pop')
				this.popNumber = window.localStorage.getItem('popNumber')
				this.$resource(url).get({
					loginCode: this.loginCode
				}).then((response) => {
					console.log(response)
					if(response.body.code == 200) {
						this.check = 1
						//昵称
						if(response.body.respBody.nickName != "" && response.body.respBody.nickName != null) {
							this.nickName = response.body.respBody.nickName;
						} else if(response.body.respBody.userName != "" && response.body.respBody.userName != null) {
							this.nickName = response.body.respBody.userName
						} else {
							this.nickName = "昵 称"
						}
						//头像
						if(response.body.respBody.headimg != null && response.body.respBody.headimg != 'undefined') {
							this.imgHead = response.body.respBody.headimg;
						} else {
							this.imgHead = '';
						}
						window.localStorage.setItem('imgHead', this.headimg);
						//会员类型
						if(response.body.respBody.userType == 0) {
							this.userType = 0;
						} else if(response.body.respBody.userType == 1) {
							this.userType = 1;
						}
						//是否是第一次登录(普通会员)
						if(this.pop != 1) {
							if(response.body.respBody.userType == 0 && this.isFirstLogin == 1) {
								this.$router.push({
									path: 'membership'
								})
							}
						}
						if(response.body.respBody.userType == 1 && this.isFirstLogin == 1 && this.isDptMember == 1 && this.popNumber != 1) {
							this.popShow = true;
						}
						//会员日期/时间格式
						this.expireTime = this.format(response.body.respBody.expireTime);
						var date = new Date()
						// console.log(this.format(date))
						// console.log(this.expireTime)
						if(this.format(date) <= this.expireTime) {
							this.time = 1;
						}
						// console.log(this.time )
						this.companyName = response.body.respBody.companyName;
					} else {
						this.isShow = true;
						this.nickName = '昵 称'
					}
				})
			},
			//注册会员跳转
			membershipLink: function() {
				if(this.loginCode != "" && this.loginCode != null) {
					this.$router.push({
						path: 'membership'
					})
				} else {
					this.$router.push({
						path: 'login'
					})
				}
			},
			//时间格式转换
			format(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + m + '-' + d;

			},
			//获取广告位
			advShow() {
				let url = 'http://hdptheme-api.99114.cn/advertising/getAdvertisingByType?type=0'
				this.$resource(url).get().then((response) => {
					if(response.body.code == 200) {
						this.terminal = response.body.respBody[0].terminal.split('-');
						for(var i = 0; i < this.terminal.length; i++) {
							if(this.terminal[i] == '1512364783356251') {
								this.advimg = response.body.respBody[0].advertisingPic;
								this.isPic = true;
							}
						}

					}
				})
			},
			reload1: function() {
				window.location.reload()
				return
			},
			personal: function() {
				var code = window.localStorage.getItem('loginCode');
				if(code != '' && code != undefined && code != null) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'personal';
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
				}
			},
			account: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'account'
			},
			address: function() {
				if(this.nickName) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'address?myIndex=523'
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
				}
			},
			information: function() {
				if(this.nickName) {
					this.$router.push({
						path: 'shopping'
					})
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
				}
			},
			shopping: function() {
				//            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shoppingBack=001'
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?messageIndex=001'
			},
			collection: function() {
				//            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?shoppingBack=001'
				// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection'
				if(this.nickName) {
					this.$router.push({
						path: 'collection'
					})
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login'
				}

			},
			order: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=0'
			},
			assess: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=4'
			},
			dfh: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=2'
			},
			dsh: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=3'
			},
			dzf: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=1'
			},
			outLogin: function() {
				MessageBox.confirm('确定要退出登录吗？').then(action => {
					window.localStorage.clear();
					//while( Vue.http.interceptors.length >7){
					//  Vue.http.interceptors.pop();
					//}
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=003'
				});
			},
			afterSellService_list: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'afterSellService_list'
			}
		}
	}
</script>
<style scoped>
	html,
	body {
		overflow: hidden;
		overflow-y: auto;
	}
	
	[v-cloak] {
		display: none;
	}
	
	.activityBanner {
		padding: 1.2rem 1.4rem;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.activityBanner img {
		width: 100%;
	}
	
	.myIndex {
		background-color: #fff;
	}
	
	.myIndex_banner_one .bubble {
		position: absolute;
		top: 1rem;
		left: 4.1rem;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 1rem;
		background: #eb544d;
		margin-top: 0;
		color: #fff;
		font-size: 1rem;
		text-align: center;
		line-height: 1.5rem;
	}
	
	.myIndex {
		/*padding-bottom: 4rem;*/
	}
	
	.myIndex_all {
		/*width:100%;*/
		/*padding:0 4%;*/
	}
	
	.myIndex_orange {
		width: 100%;
		height: 13rem;
		background: #FAFAFA;
		/*background: url(../../assets/images/myBk.png) no-repeat;*/
		background-size: cover;
	}
	
	.myIndex_orange1 {
		background: linear-gradient(to right, #F09840, #E5B05A);
	}
	
	.myIndex_orange .myIndex_logo {
		float: left;
		margin: 4rem 0 0 2rem;
		position: relative;
	}
	
	.myIndex_orange .myIndex_logo img {
		width: 7rem;
		height: 7rem;
		border-radius: 3.5rem;
		/* margin-top: 4.5rem; */
		/*border: 0.1rem solid #000;*/
	}
	
	.login_ {
		width: 8rem;
		height: 2rem;
		position: absolute;
		top: 5.5rem;
		left: 10rem;
		font-size: 1.6rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		/*font-weight: 700;*/
	}
	
	.myIndex_orange .myIndex_name {
		/*color: #fff;*/
		font-size: 1.6rem;
		font-family: PingFangSC-Regular;
		/* margin-top: 1.2rem; */
		float: left;
		margin: 5.5rem 0 0 1.7rem;
		color: #333333;
	}
	
	.myIndex_orange .myIndex_name1 {
		color: #fff;
	}
	
	.setAccountBox {
		float: right;
		margin: 1.6rem 1.6rem 0 0;
	}
	
	.personLogo {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url(../../assets/images/edit2.png) no-repeat;
		/*background:url(../../assets/images/edit3.png) no-repeat;*/
		background-size: contain;
		margin-right: 2rem;
	}
	
	.setAccountLogo {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url(../../assets/images/set.png) no-repeat;
		/*background:url(../../assets/images/set1.png) no-repeat;*/
		background-size: contain;
	}
	
	.personLogo1 {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url(../../assets/images/tab/edit2.png) no-repeat;
		/*background:url(../../assets/images/edit3.png) no-repeat;*/
		background-size: contain;
		margin-right: 2rem;
	}
	
	.setAccountLogo1 {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background: url(../../assets/images/tab/set.png) no-repeat;
		/*background:url(../../assets/images/set1.png) no-repeat;*/
		background-size: contain;
	}
	
	.myIndex_action {
		position: relative;
		height: 5.5rem;
		/*border-bottom: 0.1rem solid #d6d6d6;*/
	}
	
	.clearfix_box {
		width: 36rem;
		height: 0.05rem;
		background: rgba(226, 226, 226, 1);
		position: absolute;
		right: 0;
		overflow: hidden;
	}
	
	.myIndex_action1 {
		height: 6rem;
	}
	
	.myIndex_action img {
		position: absolute;
		width: 0.7rem;
		height: 1.2rem;
		top: 2.2rem;
		right: 1.5rem;
	}
	
	.myIndex_action_my {
		color: #666666;
		font-size: 1.5rem;
		float: left;
		height: 5.5rem;
		line-height: 5.5rem;
		margin-left: 4%;
	}
	
	.myIndex_action_my_active {
		color: #333;
		font-size: 1.7rem;
	}
	
	.myIndex_action_look {
		color: #acacac;
		font-size: 1.5rem;
		float: right;
		margin-right: 4%;
		height: 5.5rem;
		line-height: 5.5rem;
		background: url("../../assets/images/tab/icon_go.png") no-repeat center right;
		padding-right: 1.5rem;
		background-size: 50%;
	}
	
	.myIndex_action_lookAll {
		color: #acacac;
		font-size: 1.3rem;
		float: right;
		margin-right: 4%;
		height: 5.5rem;
		line-height: 5.5rem;
		/*background: url("../../assets/images/tab/icon_go.png") no-repeat center right;*/
		padding-right: 1.5rem;
		background-size: 7%;
	}
	
	.myIndex_banner_one {
		width: 20%;
		float: left;
		font-size: 1.2rem;
		color: #252525;
		position: relative;
	}
	
	.myIndex_banner_one div {
		/*margin-bottom: 0.8rem;*/
		margin-top: 1.7rem;
		height: 3rem;
	}
	
	.myIndex_banner_one div i {
		width: 2.2rem;
		font-size: 2.2rem;
	}
	
	.myIndex_banner_one img {
		width: 2.2rem;
	}
	
	.navBanner {
		padding-bottom: 1rem;
	}
	
	.myIndex_line {
		height: 8rem;
		padding: 1rem 0rem;
		background: #F4F4F4;
	}
	
	.myIndex_line img {
		height: 100%;
		width: 100%;
		background: #fff;
	}
	
	.myIndex_line2 {
		height: 2.5rem;
		background: #fff;
	}
	
	.myIndex_line3 {
		height: 5rem;
		background: #f4f4f4;
	}
	
	.myIndex_flow {
		height: 5.5rem;
		line-height: 5.5rem;
		/*border-bottom: 1px solid #d6d6d6;*/
	}
	
	.myIndex_goBack {
		width: 100%;
		color: #868686;
		text-align: center;
		letter-spacing: 0.2rem;
		font-size: 1.3rem;
		height: 3.4rem;
		margin-bottom: 6rem;
		/* border-bottom: 1px solid #d6d6d6;
    border-top: 1px solid #d6d6d6; */
	}
	
	.myIndex_goBack .loginOut {
		display: inline-block;
		padding: 0rem 5.5rem;
		height: 100%;
		line-height: 3.4rem;
		border: 1px solid #d6d6d6;
		border-radius: 0.5rem;
	}
	
	.mint-msgbox-message,
	.mint-msgbox-message,
	.mint-msgbox-btns,
	.mint-msgbox-btn {
		line-height: 5.5rem !important;
		height: 5.5rem !important;
	}
	
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
	
	.consummate {
		height: 3rem;
		line-height: 3rem;
		text-align: left;
		padding-left: 2rem;
		background: #FBF8EF;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: #C5AA69;
	}
	
	.consummate span {
		color: #EB8F77;
	}
	/*会员过期*/
	
	.overdue {
		/*width:13rem;*/
		height: 1.3rem;
		font-size: 1.3rem;
		font-family: PingFangSC-Light;
		color: rgba(235, 84, 77, 1);
		position: absolute;
		top: 8rem;
		left: 10.5rem;
	}
	
	.overdue1 {
		max-width: 20.5rem;
		height: 1.6rem;
		line-height: 1.6rem;
		border-radius: 4px;
		text-align: left;
		color: #936F2C;
		padding: 0 0.5rem;
		background: linear-gradient(to right, #F7D273, #FAEB98);
		overflow: hidden;
	}
	
	.overdue2 {
		color: #fff;
		font-size: 1rem;
		font-family: PingFangSC-Light;
		top: 10.5rem;
		left: 24rem;
	}
	
	.overdue2 img {
		width: 0.5rem;
	}
	
	.economize {
		font-size: 1.2rem;
		font-family: PingFangSC-Light;
		color: #999;
		position: absolute;
		height: 2.5rem;
		bottom: 0;
		left: 1.5rem;
	}
	
	.economize span {
		color: #EB544D;
	}
	
	.vip {
		position: absolute;
		top: 8.5rem;
		left: 7rem;
	}
	
	.vip img {
		width: 2rem;
		height: 2rem;
	}
	/*//弹窗*/
	
	.pop_up {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		position: absolute;
		top: 0;
	}
	
	.pop_up .pop_guanbi {
		width: 3rem;
		height: 3rem;
		position: absolute;
		top: 2rem;
		right: 3rem;
	}
	
	.pop_up .pop_box {
		width: 30rem;
		position: absolute;
		top: 16rem;
		left: 3.8rem;
	}
	
	.pop_up .pop_box img {
		width: 100%;
	}
	
	.pop_up .pop_box .popUp {
		width: 15rem;
		height: 4rem;
		position: absolute;
		top: 22rem;
		right: 7.5rem;
	}
</style>