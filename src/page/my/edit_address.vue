<template>
	<div class="add_address">
		<div class="add_address-img clearfix">
			编辑地址
			<img @click="back()" src="../../assets/images/address_new/black-icon@2x.png">
		</div>
		<!--<div class="add_address-line"></div>
    <div class="myIndex_flow0">
      提示：将按照此地址寄送您的商品，请确保地址准确
    </div>-->
		<div class="beijing">
			<div class="myIndex_flow">
				<span class="myIndex_action_my22">收货人：</span>
				<input type="text" placeholder="收货人姓名" id="name" class="myIndex_action_my" v-model="admin" @blur="name22()">
			</div>
			<div class="myIndex_flow">
				<span class="myIndex_action_my22">手机号：</span>
				<input type="text" placeholder="收货人电话" class="myIndex_action_my" @blur="verification()" id="number" v-model="number">
			</div>
			<div class="myIndex_flow" @click="chooseAddress">
				<div class="myIndex_action_my22">收货地址</div>
				<div class="myIndex_action_look2">
					<img src="../../assets/images/icon_go.png">
					<span v-if="!choice">{{this.allName}}</span>
					<span v-if="choice">
          {{ finishProvince}}{{"-"+ finishCity}}
          <!--{{ "-"+finishDistrict }}-->
          <span v-if="finishDistrict">
            {{"-"+finishDistrict}}
          </span>
					</span>
				</div>
			</div>
			<div class="myIndex_flow4">
				<span class="myIndex_action_my01">
					详细地址:
				</span>
				<textarea type="text" placeholder="详细地址" class="myIndex_action_my" id="street" @blur="street22()" v-model="street"></textarea>
			</div>
			<div class="register-protocol">
				<input type="checkbox" name="Sex" value="male" v-model='checked' />
				<div class="option"></div>
				<span class="register-protocol-agree">设为默认地址</span>
			</div>
		</div>

		<div class="login-btn active" v-show="AlertChange">
			<span class="cleardel" @click="getdel()">取消</span>
			<span class="clearok" @click="getSave()">保存</span>
		</div>
		<div class="login-btn" v-show="!AlertChange">保存</div>
		<div class="popup" v-show="address" @click="shutDown"></div>
		<div class="alertWindow" v-show="address">
			<div class="title">选择所在地区</div>
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
</template>
<style scoped>
	.beijing{
		background: #fff;
	}
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
		/*width:92%;*/
		height: 4.4rem;
		background: #d8d8d8;
		font-size: 1.7rem;
		color: #fff;
		letter-spacing: 0.2rem;
		text-align: center;
		line-height: 4.4rem;
		/*margin-left:4%;*/
		margin-top: 5rem;
	}
	
	.clearok {
		width: 50%;
		float: left;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: #333333;
	}
	
	.cleardel {
		width: 50%;
		float: left;
		background: #fff;
		color: #666666;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
	}
	
	.active {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFD85A;
	}
	
	.add_address {
		width: 100%;
		height: 100%;
		background: #f3f4f3;
	}
	
	.add_address-img {
		width: 100%;
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		/*position:relative;*/
		display: block;
		color: #333;
		height: 4.4rem;
		line-height: 4.4rem;
		background: rgba(250, 250, 250, 1);
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
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
		width: 36rem;
		margin-left: 1.5rem;
		height: 5.5rem;
		line-height: 5.5rem;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.myIndex_flow4 {
		width: 36rem;
		height: 9.45rem;
		/*padding: 0 4%;*/
		border-bottom: 0.05rem solid rgba(226,226,226,1);
		margin-left: 1.55rem;
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
		margin-left: 0.8rem;
		padding-top: 0;
		padding-left: 8rem;
	}
	
	.myIndex_action_my {
		color: #333;
		font-size: 1.4rem;
		float: left;
		height: 5.2rem;
		/*line-height: 5.2rem;*/
		font-family:PingFangSC-Regular;
	}
	
	.myIndex_action_my22 {
		color: #333;
		font-size: 1.4rem;
		float: left;
		height: 5.2rem;
		line-height: 5.2rem;
		font-family:PingFangSC-Light;
		text-align: left;
		margin-right: 3rem;
	}
	
	.myIndex_action_look2 img {
		width: 0.7rem;
		margin-top: 2.1rem;
		float: right;
		margin-right: 4%;
	}
	
	.myIndex_action_look2 span {
		float: right;
		font-size: 1.2rem;
		margin-right: 10.4rem;
		color: #252525;
		font-size: 1.4rem;
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
		width: 100%;
		text-align: center;
		/*margin-left: 33%;*/
		margin-top: 1.5rem;
		/*height: 3rem;
		line-height: 3rem;*/
		padding-bottom: 1.45rem;
		/*background: url("../../assets/images/protocal.png") ;*/
	}
	
	.register-protocol .option {
		position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-size: cover;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFW…sHuiM5SWTcUlEFUsPbXQaOAVASM0CeM+HNvGHixqcAAwBFxGmXnftT9QAAAABJRU5ErkJggg==) no-repeat;
    background-size: cover;
    display: inline-block;
    /* float: left; */
    left: 33%;
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
	
	.register-protocol span {
		font-size:1.4rem;
		font-family:PingFangSC-Light;
		color: #666;
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
	
	.popup {
		width: 100%;
		height: 100rem;
		background: #7A7A7A;
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
		left: 0;
		/* margin-top: -19.5rem; */
		z-index: 22;
		background: #fff;
		overflow: auto;
	}
	
	.alertWindow .alertWindow_ul {
		text-align: left;
		padding-top: 6rem;
		/* margin-top: 4.2rem; */
	}
	
	.alertWindow .title {
		position: fixed;
		width: 100%;
		height: 5.4rem;
		line-height: 6.4rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: #333;
		text-align: left;
		background: #fff;
		padding-left: 1.1rem;
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
	}
	
	.alertWindow .alertWindow_ul li {
		/*border-top: 1px solid #eee;*/
		height: 3.7rem;
		line-height: 3.7rem;
		font-family: PingFangSC-Light;
	}
	
	.alertWindow .alertWindow_ul li span {
		margin-left: 1.5rem;
		font-size: 1.4rem;
		/*color:#5c5c5c;*/
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
				admin: '',
				number: '',
				street: '',
				userId: '',
				checked: true,
				zero: '',
				addrId: '',
				addressData: '',
				isDefault: '',
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

				areaCode: '',
				areaName: '',
				isDefault: '',
				linkman: '',
				memberId: '',
				mobile: '',
				street: '',

				loginCode: '',
				address: false,
				showProvince: true,
				showCity: false,
				showDistrict: false,
				code: '',
				shutDownPop: 0,
				choice: false,
				finishProvince: '',
				finishCity: '',
				finishDistrict: '',
				allName: '',
				CityList: '',
				districtList: '',
				sanya: ''
			}
		},
		mounted() {
			//      this.getList();
			this.getLi();
			this.getAreaName();
			//      this.chooseDistrict();
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
				let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
				let flag = reg.test(this.number); //true
				if(this.number == "") {
					var number = document.getElementById("number");
					number.focus();
					Toast({
						message: '请输入手机号',
						duration: 3000,
						className: "toast"
					});
				} else if(!flag) {
					var number = document.getElementById("number");
					this.AlertChange = false
					number.focus();
					Toast({
						message: '请输入正确手机号',
						duration: 3000,
						className: "toast"
					});
				}
			},
			name22: function() {

				if(this.admin == '') {
					var name1 = document.getElementById("name");
					name1.focus();
					Toast({
						message: '请填写收货人姓名',
						duration: 3000,
						className: "toast"
					});
				}
			},
			street22: function() {

				if(this.street == '') {
					var street = document.getElementById("street");
					street.focus();
					Toast({
						message: '请填写详细地址',
						duration: 3000,
						className: "toast"
					});
				}
			},
			back: function() {
				window.localStorage.removeItem('addrId');
				window.localStorage.removeItem('addrType');
				window.localStorage.removeItem('linkman');
				window.localStorage.removeItem('mobile');
				window.localStorage.removeItem('areaname');
				window.localStorage.removeItem('areacode');
				window.localStorage.removeItem('street');
				window.localStorage.removeItem('isDefault');
				if(this.$route.query.change_address == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "change_address?" + this.urlRemain;
				}else{
					this.$router.go(-1)
				}
			},
			name: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "name"
			},
			getLi: function() {
				this.userId = window.localStorage.getItem('userId');
				this.addrId = window.localStorage.getItem('addrId');
				this.addrType = window.localStorage.getItem('addrType');
				this.admin = window.localStorage.getItem('linkman');
				this.number = window.localStorage.getItem('mobile');
				this.allName = window.localStorage.getItem('areaname');
				this.code = window.localStorage.getItem('areacode');
				this.street = window.localStorage.getItem('street');
				this.isDefault = window.localStorage.getItem('isDefault');
				this.finishProvince = this.allName.slice(0, this.allName.indexOf("-"));
				this.finishCity = this.allName.slice(this.allName.indexOf("-") + 1, this.allName.lastIndexOf("-"));
				this.finishDistrict = this.allName.slice(this.allName.lastIndexOf("-") + 1);
				console.log(this.isDefault)
				if(this.isDefault == 0) {
					this.checked == false;
					this.zero = 0
				}
			},
			getSave: function() {
				if(this.checked == true) {
					this.zero = 1
				} else {
					this.zero = 0
				}
				let url = HOST_HDPUSER + '/address/saveAddress';
				this.userId = window.localStorage.getItem('userId');
				this.$api_post({
					url: url,
					data: {
						"addrType": 1,
						"linkman": this.admin,
						"mobile": this.number,
						"street": this.street,
						"areacode": this.code,
						"areaname": this.finishProvince + '-' + this.finishCity + '-' + this.finishDistrict,
						"memberId": this.userId,
						"isDefault": this.zero,
						"id": parseInt(this.addrId)
					}
				}).then(response => {
					console.log(response)
					if(response.code == 200) {
						// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"address?myIndex=523";
						this.$router.push({
							path: 'address',
							query: this.$route.query
						})
						localStorage.removeItem("addrId");
					}
				})

			},
			getdel() {
				this.$router.go(-1)
			},
			//选择收货地址
			chooseAddress() {
				this.shutDownPop = 0
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
				console.log(this.CityList)
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
				this.choice = true
			}
		}

	}
</script>