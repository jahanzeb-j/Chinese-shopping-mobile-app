<template>
	<div class="all" @click="allHide()">
		<collectionTab></collectionTab>
		<div class="edit" @click="goodsEdit()">编辑</div>
		<div class="phone_change1-line"></div>
		<!--<div class="noDate" v-if="none">暂无收藏哦，快去逛逛吧~</div>-->
		<div class="noDate" v-if="none">
			<img src="../../assets/images/ren@2x.png" alt="" style="width: 100%;" />
		</div>
		<p class="noDate_p" v-if="none">暂无收藏哦，快去逛逛吧~</p>
		<div v-show="loading">
			<div id="loading-icon">
				<mt-spinner type="fading-circle" color="#26a2ff" :size="60"></mt-spinner>
			</div>
			<div id="loading-text">加载中</div>
		</div>
		<div v-if="list.length" class="goods_list clearfix" v-for="(checkb,index) in list">
			<div class="goods_img" @click='ceshi($event,index,checkb.collectionId)'><img :src="checkb.collectionPics"></div>
			<div class="goods_text" @click='ceshi($event,index,checkb.collectionId)'>
				<div class="goods_detail1">{{checkb.collectionName.length>11?checkb.collectionName.slice(0,11)+'..':checkb.collectionName}}</div>
				<div class="goods_detail2">{{checkb.collectionRemark.length>14?checkb.collectionRemark.slice(0,11)+'..':checkb.collectionRemark}}</div>
				<!-- <div class="goods_detail3" v-if="checkb.isAppointment">可预约</div>
        <div class="goods_detail3" v-if="!checkb.isAppointment">不可预约</div>
        <div class="goods_detail4">{{checkb.newGoodsNum?null:0}}上新</div>
        <div class="goods_detail5">{{checkb.allGoodsNum}}商品</div> -->
			</div>
			<div class="goods_img1" @click="show1(index)"><img src="../../assets/images/moreDo.png"></div>
			<div class="goods_line1"></div>
			<div class="goods_line">
				<div></div>
			</div>
			<div class="goods_model" v-if="show == index">
			</div>
			<div class="goods_model_do" v-if="show == index">
				<div class="goods_img2"><img src="../../assets/images/collection_delect.png" @click.stop="delete1(index,checkb.id)">
					<div>取消收藏</div>
				</div>
				<div class="goods_img3"><img src="../../assets/images/collection_show.png" @click.stop="shareAccount(checkb.collectionId)">
					<div>分享</div>
				</div>
			</div>
		</div>
		<div class="showSharePic" v-show="showWeChatShareTitle">
			<img src="../../assets/images/guide1.png" alt="">
		</div>
		<div class="showSharePop" v-show="showWeChatShareTitle" @click="shutDownWeChat">
		</div>
		<shareAccount :popupVisible='popupVisible'></shareAccount>

	</div>

</template>
<style scoped>
	.noDate {
		width: 10rem;
		height: 11rem;
		margin: 24% auto;	
	}	
	.edit {
		height: 4rem;
		line-height: 4rem;
		/*float: right;*/
		font-size: 1.4rem;
		color: #5c5c5c;
		position: fixed;
		top: 0;
		right: 1.3rem;
		z-index: 1111;
	}
	
	.goods_model {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
	}
	
	.goods_model_do {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/*background: #000;*/
		/*opacity: 0.5;*/
	}
	
	.all {
		background-color: #f4f4f4;
		height: 100%;
	}
	
	.goods_list {
		position: relative;
		background-color: #fff;
	}
	
	.phone_change1-line {
		height: 5rem;
		background: #f4f4f4;
		width: 100%;
		border-top: 1px solid #d8d8d8;
	}
	
	.goods_img {
		width: 12rem;
		height: 12rem;
		float: left;
	}
	
	.goods_img img {
		width: 100%;
		height: 100%;
	}
	
	.goods_img1 {
		float: right;
		width: 6rem;
		height: 0.6rem;
		padding: 1rem;
		margin-top: 2.2rem;
	}
	
	.goods_img1 img {
		width: 2.5rem;
		height: 0.5rem;
	}
	
	.goods_img2 {
		float: left;
		margin-top: 2.8rem;
		margin-left: 9.3rem;
	}
	
	.goods_img2 img {
		width: 5rem;
		height: 5rem;
	}
	
	.goods_img3 {
		float: left;
		margin-top: 2.8rem;
		margin-left: 9rem;
	}
	
	.goods_img3 div,
	.goods_img2 div {
		color: #fff;
		font-size: 1.2rem;
		margin-top: 1rem;
	}
	
	.goods_img3 img {
		width: 5rem;
		height: 5rem;
	}
	
	.goods_text {
		width: 18rem;
		float: left;
		margin-left: 1rem;
		height: 12rem;
	}
	
	.goods_detail1 {
		font-size: 1.5rem;
		color: #333;
		margin-top: 1.9rem;
		text-align: left;
		line-height: 1.8rem;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.goods_detail2 {
		font-size: 1.2rem;
		color: #adadad;
		margin-top: 1rem;
		text-align: left;
	}
	/*.goods_detail3{*/
	/*font-size: 1.5rem;*/
	/*color: #cc141c;*/
	/*margin-top: 1.8rem;*/
	/*text-align: left;*/
	/*width: 20rem;*/
	/*}*/
	/*.goods_detail3 span{*/
	/*font-size: 1rem;*/
	/*color: #cc141c;*/
	/*margin-top: 3.8rem;*/
	/*}*/
	
	.goods_text .goods_detail3 {
		font-size: 1rem;
		color: #5dadfe;
		margin-top: 3.8rem;
		text-align: left;
		min-width: 4rem;
		height: 1.6rem;
		text-align: center;
		line-height: 1.6rem;
		border: 1px solid #5dadfe;
		float: left;
		margin-right: .7rem;
	}
	
	.goods_text .goods_detail4 {
		font-size: 1rem;
		color: #34bf86;
		margin-top: 3.8rem;
		text-align: left;
		min-width: 4rem;
		height: 1.6rem;
		text-align: center;
		line-height: 1.6rem;
		border: 1px solid #34bf86;
		float: left;
		margin-right: .7rem;
	}
	
	.goods_text .goods_detail5 {
		font-size: 1rem;
		color: #e95b4d;
		margin-top: 3.8rem;
		text-align: left;
		min-width: 4rem;
		height: 1.6rem;
		text-align: center;
		line-height: 1.6rem;
		border: 1px solid #e95b4d;
		float: left;
		margin-right: .7rem;
	}
	
	.goods_line {
		width: 65%;
		height: 1rem;
		float: right;
	}
	
	.goods_line1 {
		width: 20%;
		height: 1rem;
		float: left;
	}
	
	.goods_line div {
		border-bottom: 0.1rem solid #d6d6d6;
		margin-top: 0.5rem;
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
	
	.noDate_p {
		font-size: 1.44rem;
		color: #b7b6b6;
		text-align: center;
		margin-top: -3.5rem;
	}
</style>
<script>
	import Vue from 'vue'
	import shareAccount from '../../component/shareAccount'
	import collectionTab from '../../component/collectionTab.vue'
	export default {
		name: 'collection_exhibition',
		data() {
			return {
				show: "",
				list: "",
				popupVisible: false,
				loading: true,
				none: false,
				showWeChatShareTitle: false
			}
		},
		components: {
			collectionTab,
			shareAccount
		},
		activated() {
			// this.getList()
		},
		mounted() {
			this.getList();
		},
		methods: {
			//      收藏进详情页
			ceshi: function(event, index, commodityId) {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?id=' + commodityId + "&collection=2"
			},
			allHide: function() {
				this.show = -1;
			},
			show1: function(index) {
				event.stopPropagation();
				this.show = index;
			},
			goodsEdit() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "exhibition_edit"
			},
			getList() {
				this.show = -1
				let url = HOST_HDBMESSAGE + '/collection/findUserCollectionByType'
				this.userId = window.localStorage.getItem('userId')
				this.loginCode = window.localStorage.getItem('loginCode')
				if(this.loginCode != "") {

					//添加header
					//           Vue.http.interceptors.push((request, next)  =>{
					//             request.headers.set('loginCode', this.loginCode);
					//           next((response) => {
					// //            return response
					//           });
					//         });
					//添加header
					this.$resource(url).get({
						userId: this.userId,
						collectionType: 2,
						page: 1
					}).then((response) => {
						//          console.log(response.body.list);
						if(response.status == 200) {
							//              if(response.data.respBody)
							this.list = response.data.respBody
							this.loading = false
							if(!this.list.length) {
								this.none = true;
							}
							for(let i = 0; i < this.list.length; i++) {
								if(this.list[i].collectionPics[0].indexOf(',') != -1) {
									this.list[i].collectionPics[0] = this.list[i].collectionPics[0].substring(0, this.list[i].collectionPics[0].indexOf(','))
									this.list[i].collectionPics = this.list[i].collectionPics[0]
									//                  this.list[i]["img"] = this.list[i].collectionPics[0]
								}
								if(this.list[i].price != null) {
									if(this.list[i].price.indexOf('-') != -1) {
										this.list[i].price = this.list[i].price.substr(0, this.list[i].price.indexOf('-'))
									}
								}
							}

						}
					})
				}
			},
			shareAccount(collectionId) {

				this.$nextTick(() => {
					//先判断是否是在微信中打开的
					var ua = navigator.userAgent.toLowerCase();
					this.show = -1
					if(ua.match(/MicroMessenger/i) == "micromessenger") {
						//是在微信中打开
						this.getWeXinShare(collectionId)
					} else {
						//不是在微信中打开
						this.getNotWeXinShare(collectionId)
					}

				})
			},

			//在浏览器中打开分享
			getNotWeXinShare() {
				var _this = this
				_this.popupVisible++

					window._bd_share_config = {
						"common": {
							"bdSnsKey": {},
							"bdText": _this.shareDetailName + '-网库优选',
							"bdMini": "1",
							"bdMiniList": false,
							"bdPic": '',
							"bdStyle": "0",
							"bdSize": "32",
							"bdPic ": ""
						},
						"share": {},
						"image": {
							"viewList": ["qzone", "tsina", "sqq", "weixin"],
							"viewText": "分享到：",
							"viewSize": "32"
						},
						"selectShare": {
							"bdContainerClass": null,
							"bdSelectMiniList": ["qzone", "tsina", "sqq", "weixin"]
						}
					}
			},

			//在微信中打开分享
			getWeXinShare(collectionId) {
				var _this = this
				_this.showWeChatShareTitle = true

				window._bd_share_config = {};
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				})
				//分享到微信朋友圈
				wx.onMenuShareTimeline({
					title: _this.shareDetailName + '-网库优选',
					link: window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + collectionId,
					imgUrl: '',
					success: function() {
						_this.showWeChatShareTitle = false
						_this.getShareCommodity()
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
				//分享到微信好友
				wx.onMenuShareAppMessage({
					title: _this.shareDetailName + '-网库优选',
					link: window.location.href,
					imgUrl: '',
					success: function() {
						_this.showWeChatShareTitle = false
						_this.getShareCommodity()
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
				//分享到QQ
				wx.onMenuShareQQ({
					title: _this.shareDetailName + '-网库优选',
					link: window.location.href,
					imgUrl: '',
					success: function() {
						_this.showWeChatShareTitle = false
						_this.getShareCommodity()
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			},
			delete1(index, deleteId) {
				event.stopPropagation();
				let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
				this.loginCode = window.localStorage.getItem('loginCode')
				if(this.loginCode != "") {
					//添加header
					//           Vue.http.interceptors.push((request, next)  =>{
					//             request.headers.set('loginCode', this.loginCode);
					//           next((response) => {
					// //            return response
					//           });
					//         });
					//添加header
					this.$resource(url).get({
						id: deleteId
					}).then((response) => {
						if(response.status == 200) {
							this.getList();
						}
					})
				}
			},
			//关闭在微信中的分享
			shutDownWeChat() {
				this.showWeChatShareTitle = false
			}
		}
	}
</script>