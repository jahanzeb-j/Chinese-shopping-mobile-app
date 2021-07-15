<template>
	<div class="change_address">
		<div class="header">
			<span class="return" @click="returnBack">
            		<img src="../../assets/images/address_new/black-icon@2x.png">
            </span>
			<span class="orderTitle">选择收货地址</span>
			<span class="admin" @click="admin">管理</span>
		</div>
		<!--<div class="grayLine"></div>-->
		<div class="personInfo" v-for="(item,index) in addressList" :class="{ 'active': index === selected}">
			<div @click="chooseThisAddress(item)">
				<div class="personInfoCont">
					<span class="name">{{ item.linkman }}</span>
					<span class="phone">{{ item.mobile }}</span>
					<!--<span class="default" v-show=item.isDefault>默认</span>-->
					<img class="moren" src="../../assets/images/moren.png" alt="" v-if='item.isDefault == 1' @click="chooseDefault(index)" />
				</div>
				<div class="personAddressInfo">
					<span class="p-location">
                    {{ item.areaname }}-{{item.street}}
                </span>
				</div>
			</div>

			<div class="guanli" @click="edit(index)">
				<img src="../../assets/images/address_new/guanli_copy@2x.png" alt="" />
			</div>
		</div>
	</div>
</template>
<style scoped>
	img {
		width: 100%;
		height: 100%;
	}
	
	span {
		display: inline-block;
	}
	
	.grayLine {
		width: 100%;
		height: 1rem;
		background: #f4f4f4;
	}
	
	.change_address {
		width: 100%;
	}
	
	.change_address .header {
		width: 100%;
		/* position: relative; */
		display: block;
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		height: 4.4rem;
		line-height: 4.4rem;
		border-bottom: 1px solid #d6d6d6;
		background: rgba(250, 250, 250, 1);
	}
	
	.change_address .header .orderTitle {
		font-size: 1.8rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		margin-left: 5rem;
	}
	
	.change_address .header .return {
		float: left;
		width: 1.95rem;
		height: 2.1rem;
		margin-top: 0.5rem;
		position: absolute;
		left: 1.2rem;
	}
	
	.change_address .header .admin {
		float: right;
		font-size: 1.6rem;
		font-family: PingFangSC-Light;
		color: #333;
		margin-right: 1.5rem;
	}
	
	.change_address .personInfo {
		width: 35.95rem;
		border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
		padding-top: 1.3rem;
		padding-bottom: 1.45rem;
		margin-left: 1.55rem;
		position: relative;
	}
	
	.change_address .personInfo.active {
		background: #DCDCDC;
	}
	
	.change_address .personInfo .personInfoCont {
		text-align: left;
		margin-bottom: 0.5rem;
		position: relative;
	}
	
	.change_address .personInfo .personInfoCont .name {
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		/* margin: 0 2.25rem 0 0; */
		margin-right: 2.25rem;
		width: 5rem;
	}
	
	.change_address .personInfo .personInfoCont .phone {
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
	}
	
	.change_address .personInfo .personInfoCont .default {
		font-size: 1.2rem;
		color: #fff;
		padding: 0.25rem 0.5rem;
		background: #F9BE00;
		margin-left: 1rem;
	}
	
	.change_address .personInfo .personAddressInfo {
		text-align: left;
	}
	
	.change_address .personInfo .personAddressInfo .p-location {
		width: 23.5rem;
		line-height: 1.65rem;
		font-size: 1.2rem;
		font-family: PingFangSC-Regular;
		color: rgba(127, 127, 127, 1);
		margin-left: 7.4rem;
	}
	
	.change_address .personInfo .personAddressInfo .rightri {
		width: 2rem;
		height: 2rem;
		float: right;
		margin-top: -1.5rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.change_address .personInfo .personAddressInfo .rightri .rightriSp {
		width: 0.6rem;
		height: 1rem;
	}
	
	.moren {
		width: 3.45rem;
		height: 1.75rem;
		position: absolute;
		left: 0rem;
		top: 2rem;
	}
	
	.guanli {
		width: 1.8rem;
		height: 1.8rem;
		position: absolute;
		top: 2.6rem;
		right: 1.4rem;
	}
</style>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	export default {
		name: 'change_address',
		data() {
			return {
				selected: '',
				addressList: [],
				userId: '',
				loginCode: '',
				urlRemain: '',
				addressData: {},
			}
		},
		created() {
			this.getAddressList()
		},
		methods: {
			//请求地址列表的数据
			getAddressList() {
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length)
				let url = HOST_HDPUSER + '/address/getUserTradeAddress'
				this.userId = window.localStorage.getItem('userId');
				this.loginCode = window.localStorage.getItem('loginCode');
				this.$resource(url).get({
					userId: this.userId
				}).then((response) => {
					if(response.status == 200) {
						if(response.body.code == 200) {
							this.addressList = response.body.respBody
							console.log(this.addressList)
							for(var i = 0; i < this.addressList.length; i++) {
								this.areaname = this.addressList[i].areaname;
								this.mobile = this.addressList[i].mobile;
							}
						} else if(response.body.code == -1) {
							let url = HOST_HDPUSER + '/user/isLogin';
							this.loginCode = window.localStorage.getItem('loginCode')
							this.userId = window.localStorage.getItem('userId')
							this.$resource(url).get({
								loginCode: this.loginCode
							}).then((response) => {
								if(response.status == 200) {
									if(response.data.code < 0) {
										window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
										window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
									}
								}
							})
						} else {
							Toast({
								message: response.body.message,
								position: 'center',
								duration: 3000
							});
						}
						if(response.body.code == null) {
							if(response.body.respBody == null || response.body.respBody.length == 0) {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address';
							}
						} else if(response.body.code == 200) {
							this.addressList = response.body.respBody
						} else {
							Toast({
								message: response.body.message,
								position: 'center',
								duration: 3000
							});
						}
					}
				})
			},
			//管理收货地址
			admin() {
				let change_address = this.$route.query.change_address
				if(Object.prototype.toString.call(change_address) == '[object Array]') {
					change_address = change_address[0]
				}
				if(change_address == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'address?' + this.urlRemain
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'address?' + this.urlRemain + "&change_address=1";
				}
			},
			edit(index) {
				console.log('ooooooo')
				window.localStorage.setItem('addrId', this.addressList[index].id);
				window.localStorage.setItem('addrType', this.addressList[index].addrType);
				window.localStorage.setItem('linkman', this.addressList[index].linkman);
				window.localStorage.setItem('mobile', this.addressList[index].mobile);
				window.localStorage.setItem('areaname', this.addressList[index].areaname);
				window.localStorage.setItem('areacode', this.addressList[index].areacode);
				window.localStorage.setItem('street', this.addressList[index].street);
				window.localStorage.setItem('isDefault', this.addressList[index].isDefault);
				//				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"edit_address"

				this.$router.push({
					path: 'edit_address',
					query: this.$route.query
				})
			},
			//返回
			returnBack() {
				let change_address = this.$route.query.change_address
				if(change_address == 1 && this.addressList.length > 0) {
					let f_param = this.urlRemain.indexOf('change_address');
					this.urlRemain = this.urlRemain.slice(0, f_param - 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain;
				} else if(change_address == 1 && this.addressList.length == 0) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address?' + this.urlRemain;
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain;
				}
			},
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
					console.log(data)
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
			//选择这个地址为临时收货地址
			chooseThisAddress(item) {
				this.addressData = {
					areaname: item.areaname,
					areacode: item.areacode,
					linkman: item.linkman,
					mobile: item.mobile,
					isDefault: item.isDefault,
					street: item.street,
				}
				window.localStorage.setItem('addressData', JSON.stringify(this.addressData))
				if(this.$route.query.change_address == null || this.$route.query.change_address == undefined) {
					this.urlRemain = this.urlRemain + '&change_address=1'
				}
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain;
			}
		}
	}
</script>