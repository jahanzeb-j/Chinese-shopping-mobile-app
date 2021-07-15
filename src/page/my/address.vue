<template>
	<div class="address radio">
		<div class="address-img clearfix">
			地址管理
			<img @click="back()" src="../../assets/images/address_new/black-icon@2x.png">
		</div>
		<div v-show="sh" class="address_all">
			<div class="address_car">
				<img src="../../assets/images/address_new/address.png">
				<div @click="address()">还没有收货地址</div>
			</div>
			<div class="login-btn" @click="address()"> + 添加地址</div>
		</div>
		<div v-show="!sh" class="address_all">
			<div v-for="(checkb,index) in addressData">
				<div class="address_set clearfix">
					<div @click="edit(index)">
						<div class="address_name floatL">
							<p>{{checkb.linkman}}</p>
							<img class="moren" src="../../assets/images/moren.png" alt="" v-if='checkb.isDefault == 1' @click="chooseDefault(index)" />
						</div>
						<div class="address_number floatR">{{checkb.mobile}}</div>
						<div class="address_show floatL">{{checkb.areaname | addFilter}}{{checkb.street}}</div>
					</div>
					<div class="address_chice floatL">
						<!--<div class=" floatL">
							<input type="radio" name="gender" v-model='checkb.isDefault' :value='1' @click="chooseDefault(index)">
							<label for="male">
            					</label>
						</div>-->
						<!--<div class="address_moren floatL">设置默认地址</div>-->
						<!--<div class="address_delect floatR" @click="delete1(index)">删除</div>-->
						<img class="address_del" src="../../assets/images/delete_icon@2x.png" alt="" @click="delete10(index)" />
						<!--<div class="address_next floatR" @click="edit(index)">编辑</div>-->
					</div>
				</div>
			</div>
			<mt-popup v-model="dialogVisible" position="center">
				<div class="deldiv">
					<p class="deloff">确定删除该地址？</p>
					<p class="delok">
						<span class="clear" @click="cleardiv">取消</span>
						<span class="clear clear2" @click="delete1()">确定</span>
					</p>
				</div>
			</mt-popup>
			<div class="login-btn" @click="address()" v-show="!five"> <span class="add_add"> + </span>新增地址</div>
			<div class="login-btn" @click="address1()" v-show="five"> <span> + </span> 新增地址</div>
		</div>
	</div>

</template>
<style scoped>
	.address_all {
		padding-bottom: 2rem;
	}
	/*单选*/
	
	.address_set label {
		width: 1.5rem;
		height: 1.5rem;
		background-size: cover;
		background: url("../../assets/images/nocc.png") no-repeat;
		background-size: cover;
		display: inline-block;
		float: left;
		margin-top: 1.2rem;
	}
	
	.address_set input[type=radio] {
		width: 1rem;
		height: 1rem;
		/*margin-right: 15px ;*/
		opacity: 0;
	}
	
	.address_set input[type=radio]:checked+label {
		background: url("../../assets/images/protocal.png") no-repeat;
		background-size: cover;
	}
	/*单选*/
	
	.radio {
		/*background: #F3F4F3;*/
	}
	
	.address {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.address-img {
		width: 100%;
		/*position:relative;*/
		display: block;
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		height: 4.4rem;
		line-height: 4.4rem;
		border-bottom: 1px solid #d6d6d6;
		background: rgba(250, 250, 250, 1);
	}
	
	.address-img img {
		width: 1.95rem;
		height: 2.1rem;
		margin-top: 1rem;
		position: absolute;
		left: 1.2rem;
		/*margin-left: -28rem;*/
	}
	
	.address_car {
		margin-top: 16.75rem;
		margin-bottom: 18.5rem;
	}
	
	.address_car img {
		width: 10.15remrem;
		height: 12.9rem;
	}
	
	.address_car div {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(153, 153, 153, 1);
		margin-top: 0.85rem;
	}
	
	.moren {
		width: 3.45rem;
		height: 1.75rem;
		margin-top: 0.5rem;
	}
	
	.login-btn {
		position: fixed;
		width: 34.5rem;
		height: 4.9rem;
		color: #333333;
		letter-spacing: 0.2rem;
		text-align: center;
		line-height: 4.9rem;
		margin-left: 4%;
		/*margin-top: 3.5rem;*/
		background: linear-gradient(180deg, rgba(255, 238, 147, 1), rgba(255, 216, 90, 1));
		/*box-shadow:0 0.5rem 0 #FFD85A;*/
		border-radius: 0.5rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		bottom: 1.65rem;
	}
	
	.phone_change1-line {
		height: 1rem;
		background: #f4f4f4;
		width: 100%;
		border-top: 1px solid #d8d8d8;
	}
	
	.address_set {
		/*padding: 0 4%;*/
		width: 35.95rem;
		margin-left: 1.55rem;
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
	}
	
	.address_name {
		width: 5rem;
		color: #333333;
		font-size: 1.4rem;
		margin-top: 1.4rem;
		margin-bottom: 1.4rem;
		margin-right: 2.25rem;
		text-align: left;
	}
	
	.address_name p {
		width: 100%;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
	}
	
	.address_number {
		color: #333333;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		margin-top: 1.4rem;
		margin-bottom: 0.6rem;
	}
	
	.address_show {
		/* display: block; */
		font-size: 1.2rem;
		font-family: PingFangSC-Regular;
		color: rgba(127, 127, 127, 1);
		margin-bottom: 1.5rem;
		width: 23.5rem;
		line-height: 1.65rem;
		text-align: left;
		overflow: hidden;
	}
	
	.address_chice {
		margin-top: -0.8rem;
		margin-left: 2.5rem;
	}
	
	.address_chice input {
		margin-top: 1rem;
	}
	
	.address_moren {
		color: #909090;
		font-size: 1.2rem;
	}
	
	.address_next {
		color: #494949;
		font-size: 1.2rem;
		width: 6rem;
		background: url("../../assets/images/edit.png") no-repeat 1rem center;
		text-align: right;
		background-size: 22%;
		padding-right: 1rem;
	}
	
	.address_delect {
		color: #494949;
		font-size: 1.2rem;
		width: 6rem;
		text-align: right;
		background: url("../../assets/images/delect.png") no-repeat 1rem center;
		background-size: 22%;
		padding-right: 1rem;
	}
	
	.address_del {
		width: 1.5rem;
		height: 1.5rem;
	}
	
	.floatL {
		float: left;
	}
	
	.floatR {
		float: left;
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
	
	.mint-popup {
		border-radius: 0.25rem;
	}
	
	.deldiv {
		width: 27.05rem;
		height: 13.5rem;
		background: rgba(255, 255, 255, 1);
		border-radius: 0.25rem;
	}
	
	.delok {
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		border-top: 0.05rem solid rgba(226, 226, 226, 1);
		font-size: 1.6rem;
		font-family: PingFangSC-Light;
	}
	
	.deloff {
		width: 100%;
		height: 8.95rem;
		line-height: 8.95rem;
		font-size: 1.6rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
	}
	
	.clear {
		clear: both;
		width: 49%;
		text-align: center;
		height: 100%;
		font-size: 1.6rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		border-left: 0.05rem solid rgba(226, 226, 226, 1);
	}
	
	.clear2 {
		color: #EB544D;
	}
	
	.clear:first-child {
		border-left: none;
	}
	
	.add_add {
		position: relative;
		top: -0.2rem;
		right: 0.5rem;
	}
</style>
<script>
	import Vue from 'vue'
	import { Toast } from 'mint-ui';
	import { api_get } from '../../util/api.js'
	export default {
		name: 'personal',
		data() {
			return {
				AlertChange: false,
				userId: '',
				sh: false,
				addressData: [],
				loginCode: "",
				urlRemain: '',
				five: false,
				TradeAddress: '',
				dialogVisible: false,
			}
		},
		filters: {
			addFilter: function(value) {
				if(!value) return ''
				return value.replace(/-/g, "");
			}
		},
		mounted() {
			this.getLi()

		},
		methods: {
			back: function() {
				// console.log( this.$route.query.myIndex)
				//        if(this.$route.query.myIndex == undefined ){
				//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"myIndex"
				//        }
				if(this.$route.query.change_address == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "change_address?" + this.urlRemain;
				}
				if(this.$route.query.myIndex == 523) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
				}

			},

			address: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "add_address?address=522&" + this.urlRemain;
			},

			address1: function() {
				Toast({
					message: '收货地址的条数不能超过5条',
					duration: 3000,
					className: "toast"
				});
			},

			edit: function(index) {
				window.localStorage.setItem('addrId', this.addressData[index].id);
				window.localStorage.setItem('addrType', this.addressData[index].addrType);
				window.localStorage.setItem('linkman', this.addressData[index].linkman);
				window.localStorage.setItem('mobile', this.addressData[index].mobile);
				window.localStorage.setItem('areaname', this.addressData[index].areaname);
				window.localStorage.setItem('areacode', this.addressData[index].areacode);
				window.localStorage.setItem('street', this.addressData[index].street);
				window.localStorage.setItem('isDefault', this.addressData[index].isDefault);
				// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"edit_address"
				this.$router.push({
					path: 'edit_address',
					query: this.$route.query
				})
			},

			getLi: function() {
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length)
				let url = HOST_HDPUSER + '/address/getUserTradeAddress';
				this.userId = window.localStorage.getItem('userId');
				this.loginCode = window.localStorage.getItem('loginCode')
				//添加header
				// Vue.http.interceptors.push((request, next)  =>{
				//   request.headers.set('loginCode', this.loginCode);
				//   next((response) => {
				//     return response
				//     });
				//   });
				this.$resource(url).get({
					userId: this.userId
				}).then((response) => {
					if(response.status == 200) {
						if(response.data.respBody != "") {
							this.addressData = response.data.respBody
							// console.log(this.addressData)
							let dsa = ''
							for(var i = 0; i < this.addressData.length; i++) {
								if(this.addressData[i].isDefault == 1) {
									dsa = this.addressData.splice(i, 1);
									this.addressData = dsa.concat(this.addressData);
									break;
								}
							}
							if(this.addressData.length >= 5) {
								this.five = true;
							} else {
								this.five = false;
							}
							this.sh = false;
						} else {
							this.sh = true;
						}
					}
				})
			},

			delete1: function() {
				var index = window.localStorage.getItem('index');
				api_get({
					url: HOST_HDPUSER + '/address/deleteAddress',
					data: {
						addressId: this.addressData[index].id,
						userId: this.userId,
					}
				}).then(res => {
					console.log(res)
					if(res.code == 200) {
						this.getLi();
					} else {
						Toast({
							message: res.message,
							position: 'center',
							duration: 3000
						});
					}
				})
				this.dialogVisible = false
			},
			delete10(index) {
				window.localStorage.setItem('index', index)
				this.dialogVisible = true
			},
			cleardiv() {
				this.dialogVisible = false
			},
			checke: function(index) {
				if(this.addressData[index].isDefault == 1) {
					this.checked = true;
				} else {
					this.checked = false;
				}
			},

			//选择默认地址
			chooseDefault(index) {
				// let url = HOST_HDPUSER+'/address/editAddressDefault';
				this.loginCode = window.localStorage.getItem('loginCode');
				api_get({
					url: HOST_HDPUSER + '/address/editAddressDefault',
					data: {
						addressId: this.addressData[index].id,
						userId: this.userId,
						isDefault: 1,
					}
				}).then(res => {
					// console.log(res)
					if(res.code == 200) {
						this.getLi();
					} else {
						Toast({
							message: res.message,
							position: 'center',
							duration: 3000
						});
					}
				})
			},
		}
	}
</script>