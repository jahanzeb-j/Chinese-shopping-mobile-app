<template>
	<div class="add_address">
		<div class="add_address-img clearfix">
			添加地址
			<img @click="back()" src="../../assets/images/address_new/black-icon@2x.png">
		</div>
		<!--<div class="add_address-line"></div>-->
		<!--<div class="myIndex_flow0">
			提示：将按照此地址寄送您的商品，请确保地址准确
		</div>-->
		<div class="beijing">
			<div class="myIndex_flow">
				<span class="myIndex_action_my22">收货人：</span>
				<input type="text" id="name" placeholder="姓名" maxlength="30" class="myIndex_action_my" v-model="admin">
			</div>
			<div class="myIndex_flow">
				<span class="myIndex_action_my22">手机号：</span>
				<input type="text" id="number" placeholder="联系方式" maxlength="30" class="myIndex_action_my" v-model="number">
			</div>
			<div class="myIndex_flow" v-if="!clickAddress">
				<div class="myIndex_action_my22 myIndex_action_my220">
					所在地址:
				</div>
				<div class="myIndex_action_look2">
					<b id='default' contenteditable="true" v-if="showfont">省-市-区</b>
					<span class="sp1" v-show="addressShow">
		            {{ finishProvince +'-' }}{{ finishCity}}
		            <span v-if="finishDistrict">{{'-'+finishDistrict}}</span>
					</span>
					<span><img src="../../assets/images/icon_go.png"></span>
				</div>
			</div>
			<div class="myIndex_flow" v-if="clickAddress" @click="chooseAddress">
				<div class="myIndex_action_my22 myIndex_action_my220">
					所在地址:
				</div>
				<div class="myIndex_action_look2" >
					<b id='default' contenteditable="true" v-if="showfont">省-市-区</b>
					<span class="sp1" v-show="addressShow">
              		{{ finishProvince +'-'}}{{ finishCity}}		
		            <span v-if="finishDistrict">{{'-'+finishDistrict}}</span>
					</span>
					<span><img src="../../assets/images/icon_go.png"></span>
				</div>
			</div>
			<div class="myIndex_flow4">
				<span class="myIndex_action_my01">
				详细地址:
			</span>
				<textarea type="text" class="myIndex_action_my" id="street" placeholder="如道路、门牌号、小区等" v-model="street"></textarea>
			</div>
			<div class="register-protocol">
				<input type="checkbox" name="Sex" value="male" v-model='checked' />
				<div class="option"></div>
				<span class="register-protocol-agree">设为默认地址</span></div>
			<div class="login-btn active" v-show="AlertChange">
				<span class="clear" @click="quxiao">取消</span>
				<span class="clearok" @click="getLi()">保存</span>
			</div>
			<!--<div class="login-btn active"  v-show="!AlertChange1">保存1</div>-->
			<div class="login-btn" v-show="!AlertChange">
				<span class="clear" @click="quxiao">取消</span>
				<span class="clearok" @click="name22()">保存</span>
			</div>
			<div class="popup" v-show="address" @click="shutDown"></div>
			<div class="alertWindow" v-show="address">
				<div class="title">
					<span style="position: relative;">选择所在地区</span>
					<span style="position: relative; left: 23rem;" @click="submint">确定</span>
				</div>
				<ul class="alertWindow_ul">
					<li class="li1" v-for="(province,index) in provinces" @click="chooseProvince(province)" v-if="showProvince">
						<span>
                     {{ province[1] }}
                  </span>
					</li>
					<li class="li1" v-for="(city,index) in CityList" v-if="showCity" @click="chooseCity(city)">
						<span>
                     {{ city[1] }}
                  </span>
					</li>
					<li class="li1" v-for="(district,index) in districtList" v-if="showDistrict" @click="chooseDistrict(district)">
						<span>
                     {{ district[1] }}
                  </span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.myIndex_flow0 {
		text-align: left;
		padding: 0 4%;
		height: 4rem;
		line-height: 4rem;
		border-bottom: 1px solid #d6d6d6;
		color: #cd141c;
		font-size: 1.2rem;
	}
	
	.login-btn {
		width: 100%;
		height: 4.9rem;
		background: #d8d8d8;
		font-size: 1.7rem;
		color: #fff;
		letter-spacing: 0.2rem;
		line-height: 4.9rem;
		position: fixed;
		bottom: 0;
	}
	
	.clear {
		width: 50%;
		text-align: center;
		background: #fff;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(102, 102, 102, 1);
		float: left;
	}
	
	.clearok {
		width: 50%;
		text-align: center;
		float: right;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		background: rgba(255, 216, 90, 1);
	}
	
	.active {
		background: #f9be00;
	}
	
	.add_address {
		width: 100%;
		height: 100%;
		background: #f3f4f3;
		overflow: scroll;
	}
	
	.beijing {
		background: #fff;
		/*height: 30rem;*/
	}
	
	.add_address-img {
		width: 100%;
		/*position:relative;*/
		display: block;
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		height: 4.4rem;
		line-height: 4.4rem;
		background: rgba(250, 250, 250, 1);
		box-shadow: 0rem 0.05rem 0rem 0rem rgba(226, 226, 226, 1);
	}
	
	.add_address-img img {
		width: 1.95rem;
		height: 2.1rem;
		margin-top: 1rem;
		position: absolute;
		left: 1.2rem;
		/*margin-left: -28rem;*/
	}
	
	.add_address-line {
		height: 1rem;
		background: #f4f4f4;
		width: 100%;
		border-top: 1px solid #d8d8d8;
	}
	
	.myIndex_flow {
		width:36rem;
		height: 5.2rem;
		line-height: 5.2rem;
		/*padding: 3rem 0;*/
		margin-left: 1.45rem;
    		border-bottom: 0.05rem solid rgba(226,226,226,1);
		/*padding-left: 1.45rem;*/
	}
	
	.myIndex_flow4 {
		width: 96%;
		margin-left: 1.5rem;
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
		/*border-top: 0.05rem solid rgba(226, 226, 226, 1);*/
		overflow: hidden;
	}
	
	.myIndex_action_my01 {
		position: relative;
		top: 1.6rem;
		left: -15rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		/*width: 40%;*/
		/*line-height: 5rem;*/
		color: #333;
	}
	
	.myIndex_flow4 textarea {
		outline: none;
		resize: none;
		border-color: #fff;
		/*line-height: 1.6rem;*/
		height: 7.45rem;
		width: 72%;
		/*margin: 1rem 0;*/
		font-size: 1.4rem;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin-left: 1.45rem;
		padding-top: 0;
		padding-left: 6.5rem;
		/*border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
		border-top: 0.05rem solid rgba(226, 226, 226, 1);*/
	}
	
	.myIndex_action_my {
		font-size: 1.4rem;
	    font-family: PingFangSC-Regular;
	    color: rgba(51, 51, 51, 1);
	    float: left;
	    padding: 1.63rem 0;
	    margin-top: -0.08rem;
	    padding-left: 2.3rem;
	}
	.myIndex_flow:last-child{
		border: 0;
	}
	.myIndex_action_my22 {
		color: #333;
	    font-size: 1.4rem;
	    float: left;
	     height: 5.2rem; 
	     line-height: 5.2rem; 
	    text-align: left;
	    font-family: PingFangSC-Light;
	    /* border-bottom: 0.05rem solid #e2e2e2; */
	}
	
	.myIndex_action_my220 {
		border: none;
	}
	
	.myIndex_action_look2 img {
		width: 0.7rem;
		margin-top: 2.1rem;
		float: right;
		margin-right: 4%;
	}
	
	.myIndex_action_look2 span {
		font-size: 1.2rem;
		margin-right: 1rem;
		color: #252525;
		font-size: 1.4rem;
		float: right;
	}
	
	.myIndex_action_look2 .sp1 {
		float: left;
		/*margin-top: 2rem;*/
		padding-left: 2rem;
		/*height: 2rem;*/
		/*line-height: 5.2rem;*/
	}
	
	.myIndex_action_look3 span {
		float: right;
		font-size: 1.5rem;
		margin-right: 4%;
		color: #333;
		font-size: 1.4rem;
	}
	
	.myIndex_action_look4 span {
		float: right;
		width: 4.5rem;
		height: 2rem;
		line-height: 2rem;
		border-radius: 0.4rem;
		margin-top: 2rem;
		margin-right: 4%;
		font-size: 1.4rem;
	}
	/*.active{*/
	/*color: #f9be00;*/
	/*border: 1px solid #f9be00;*/
	/*}*/
	
	.register-protocol {
		text-align: left;
	    margin-left: 35%;
	    color: #666;
	    font-size: 1.4rem;
	    font-family: PingFangSC-Light;
	    /* background: url(../../assets/images/protocal.png); */
	    padding-top: 1.5rem;
	    padding-bottom: 1.45rem;
	}
	
	.register-protocol .option {
		width: 1.5rem;
		height: 1.5rem;
		background-size: cover;
		background: url("../../assets/images/nocc.png") no-repeat;
		background-size: cover;
		display: inline-block;
		float: left;
		/*margin-top: 0.7rem;*/
	}
	
	.register-protocol input[type="checkbox"] {
		/*为了保险起见，把原生样式隐藏掉*/
		display: inline-block;
		width: 0.5rem;
		height: 1rem;
		/*margin-right: 15px ;*/
		opacity: 0;
	}
	
	input[type="checkbox"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url("../../assets/images/protocal.png") no-repeat;
		background-size: cover;
	}
	
	input::-webkit-input-placeholder {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(153, 153, 153, 1);
	}
	
	.register-protocol span {
		font-family: PingFangSC-Light;
		color: #666666;
		/*padding-left: 1rem;*/
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
	/*.activeW{*/
	/*border: 1px solid #d6d6d6;*/
	/*color: #bebebe;*/
	/*}*/
	
	.area {
		width: 100%;
		text-align: left;
		height: 70px;
		padding: 10px 24px;
	}
	
	.area select {
		height: 100%;
		width: 30%;
		font-size: 25px;
	}
	
	.popup {
		width: 100%;
		height: 100rem;
		background: #000000;
		position: fixed;
		top: 0;
		z-index: 11;
		opacity: 0.5;
	}
	
	.alertWindow {
		width: 100%;
		height: 30rem;
		position: fixed;
		bottom: 0;
		z-index: 22;
		background: #fff;
		overflow: auto;
	}
	
	.alertWindow .alertWindow_ul {
		text-align: left;
		font-size: 1.2rem;
		margin-top: 6rem;
	}
	
	.alertWindow .title {
		height: 5.4rem;
		line-height: 7.4rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		text-align: left;
		position: fixed;
		width: 100%;
		background: #fff;
		padding-left: 1.1rem;
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
	}
	
	.alertWindow .alertWindow_ul li {
		/*border-top: 1px solid #ccc;*/
		height: 5rem;
		line-height: 5rem;
	}
	
	.alertWindow .alertWindow_ul li span {
		margin-left: 1rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
	}
	
	#street::-webkit-input-placeholder {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(153, 153, 153, 1);
	}
	#default{
		font-size:1.4rem;
		font-family:PingFangSC-Light;
		color:rgba(153,153,153,1);
	    position: relative;
	    top: 2rem;
	    left: -8.5rem;
	}
</style>
<script>
	import Vue from 'vue'
	import { Toast } from 'mint-ui';
	export default {
		name: 'add_address',
		watch: {
			admin: function() {
				if(this.street != "" && this.admin != "" && this.number != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
				}
			},
			number: function() {
				if(this.street != "" && this.admin != "" && this.number != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
				}
			},
			street: function() {
				if(this.street != "" && this.admin != "" && this.number != "") {
					this.AlertChange = true;
				} else {
					this.AlertChange = false;
				}
			},
		},
		data() {
			return {
				AlertChange: false,
				AlertChange1: true,
				pendding: false,
				admin: '',
				number: '',
				street: '',
				userId: '',
				checked: false,
				zero: '',
				provinces: '',
				citys: '',
				districts: '',
				province: '',
				city: '',
				district: '',
				newProvince: '',
				newCity: '',
				newDistrict: '',
				areas: '',
				provinceId: '',
				cityId: '',
				districtId: '',
				TradeAddress: {

				},
				loginCode: '',
				address: false,
				showProvince: true,
				showCity: false,
				showDistrict: false,
				code: '',
				shutDownPop: 0,
				finishProvince: '',
				finishCity: '',
				finishDistrict: '',
				addressShow: false,
				urlRemain: '',
				clickAddress: true,
				allChice: false,
				CityList: '',
				districtList: '',
				sanya: '',
				showfont:true,
			}
		},
		created() {
			this.getAreaName()
			this.userId = window.localStorage.getItem('userId')

		},
		mounted() {
			this.userId = window.localStorage.getItem('userId')
			if(this.userId == null || this.userId == '') {
				this.userId = this.$route.query.userId
			}
			if(this.addressShow == false && this.finishDistrict == '' ){
				this.showfont = false
			}else{
				this.showfont = true
			}
			
		},
		methods: {
			verification: function() {
				//        if(this.admin == ''){
				//          Toast({
				//            message: '请填写收货人姓名',
				//            duration: 3000,
				//            className: "toast"
				//          });
				//        }
				let reg = /^1[3|4|5|7|8|9][0-9]{9}$/; //验证规则
				let flag = reg.test(this.number); //true
				if(this.number == "") {
					var number = document.getElementById("number");
					//          this.clickAddress = false
					Toast({
						message: '请输入手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(!flag) {
					var number = document.getElementById("number");
					this.AlertChange = false
					//          this.clickAddress = false
					Toast({
						message: '请输入正确手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(flag) {
					this.clickAddress = true
					this.street22();
				}
			},
			submint() {
				this.shutDown()
			},
			quxiao() {
				console.log('222')
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "address?myIndex=523";
			},
			name22: function() {
				// console.log('保存')
				if(this.admin == '') {
					var name1 = document.getElementById("name");
					Toast({
						message: '请填写收货人姓名',
						duration: 3000,
						className: "toast"
					});
				} else {
					this.verification();
				}
			},
			street22: function() {

				if(this.street == '') {
					var street = document.getElementById("street");
					Toast({
						message: '请填写详细地址',
						duration: 3000,
						className: "toast"
					});
				}
			},

			back: function() {
				// console.log(this.$route.query.address)
				if(this.$route.query.address == 522) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "address?myIndex=523";
				} else {
					// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"order_page"+this.urlRemain;
					window.history.back()
				}
				// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"myIndex"
			},
			name: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "name"
			},

			getLi: function() {
				if(this.pendding) {
					return false
				} else {
					this.pendding = true
				}
				//            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"myIndex"
			},
			name: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "name"
			},

			getLi: function() {
				if(this.pendding) {
					return false
				} else {
					this.pendding = true
				}
				if(this.checked == true) {
					this.zero = 1
				} else {
					this.zero = 0
				}
				let url = HOST_HDPUSER + '/address/saveAddress';
				// this.userId= window.localStorage.getItem('userId');
				this.loginCode = window.localStorage.getItem('loginCode');
				this.TradeAddress = {
					addrType: 1,
					areacode: this.code,
					areaname: this.finishProvince + '-' + this.finishCity + '-' + this.finishDistrict,
					isDefault: this.zero,
					linkman: this.admin,
					memberId: this.userId,
					mobile: this.number,
					street: this.street
				}
				console.log(this.TradeAddress)
				this.$api_post({
					url: url,
					data: this.TradeAddress
				}).then(response => {
					// console.log(response)
					// if (response.status == 200) {
					if(response.code == 200) {
						if(this.$route.query.address == 522 && this.$route.query.myIndex == 523) {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "address?myIndex=523";
						} else {
							if(this.$route.query.change_address == 1) {
								let currentUrl = window.location.href;
								let f_param = currentUrl.indexOf('?');
								let last_param = currentUrl.indexOf('change_address');
								this.urlRemain = currentUrl.slice(f_param + 1, last_param - 1)
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_page?" + this.urlRemain;
							} else {
								let currentUrl = window.location.href;
								let f_param = currentUrl.indexOf('?');
								this.urlRemain = currentUrl.slice(f_param + 1, currentUrl.length + 1)
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_page?" + this.urlRemain;
							}
						}
					} else if(response.code == -100) {
						Toast({
							message: response.message,
							duration: 3000,
							className: "toast"
						});
					}
					// }
					this.pendding = false
				})
			},

			//选择收货地址
			chooseAddress() {
				this.shutDownPop = 0
				this.addressShow = true
				this.address = true
				this.showProvince = true
			},

			//关闭地址遮罩层
			shutDown() {
				this.address = false
				this.showDistrict = false
			},

			//获取全国省市的名字
			getAreaName() {
				var listProvince = AreaMenu.getProvinceList()
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length)
				this.provinces = listProvince
			},

			//根据省选择市
			chooseProvince(province) {
				this.CityList = AreaMenu.getSubList(province[3] + "");
				this.newProvince = province[1]
				this.showProvince = false
				this.showCity = true
			},

			//根据市选择地区
			chooseCity(city) {
				this.districtList = AreaMenu.getSubList(city[3] + "");
				if(this.districtList.length == 0) {
					this.sanya = true
					this.shutDownPop = 1
					this.newCity = city[1]
					this.code = city[3]
					this.showCity = false
					this.showDistrict = false
					this.address = false
					this.finishProvince = this.newProvince
					this.finishCity = this.newCity
					this.finishDistrict = ""
					this.allchice = true
					this.choice = true
				} else {
					this.newCity = city[1]
					this.showProvince = false
					this.showCity = false
					this.showDistrict = true
				}
			},

			//选择县区
			chooseDistrict(district) {
				this.shutDownPop = 1
				this.code = district[3]
				this.showCity = false
				this.showDistrict = false
				this.address = false
				this.finishProvince = this.newProvince
				this.finishCity = this.newCity
				this.finishDistrict = district[1]
				this.allchice = true
			},
			hide: function(ele){
				if(ele.innerHTML == "<b id=\"default\">省-市-区</b>") {
					ele.innerHTML = "";
				}
			},
			show: function(ele){
				if(ele.innerHTML == "" || ele.innerHTML == "<br>") {
					ele.innerHTML =  "<b id=\"default\">省-市-区</b>";
				}
			}
		}

	}
</script>
