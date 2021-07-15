<template>
	<div class="all" @click="allHide($event)">
		<collectionTab></collectionTab>
		<div class="edit" @click="goodsEdit()">编辑</div>
		<div class="phone_change1-line"></div>
		<div class="noDate" v-if="none">
			<img src="../../assets/images/ren@2x.png" alt="" style="width: 100%;" />
		</div>
		<p class="noDate_p" v-if="none">暂无收藏哦，快去逛逛吧~</p>
		<div  v-if="list.length" class='border01'></div>
		<div v-if="list.length" class="goods_list clearfix" v-for="(checkb,index) in list" @click='ceshi($event,index,checkb.collectionId)'>
			<div class="goods_img" :class="{ 'model': isA===index}"><img :src="checkb.collectionPics"></div>
			<div class="goods_text" :class="{ 'model': isA===index}">
				<div class="goods_detail1">{{checkb.collectionName.length>14?checkb.collectionName.slice(0,11)+'..':checkb.collectionName}}</div>
				<div class="goods_detail2">{{checkb.collectionRemark.length>14?checkb.collectionRemark.slice(0,11)+'..':checkb.collectionRemark}}</div>
				<div class="goods_detail3">
					<span>¥</span>{{checkb.price}}</div>
			</div>
			<div class="goods_img1" :class="{ 'model': isA===index}" @click="show1(index)"><img src="../../assets/images/moreDo.png"></div>
			<!--<div class="goods_line1"></div>
			<div class="goods_line">
				<div></div>
			</div>
			<div class="goods_model" v-if="show == index">
			</div>-->
			<div class="goods_model_do" v-if="show == index">
				<div class="goods_img2"><img src="../../assets/images/collection_delect.png" @click.stop="deleteIetm(index,checkb.id)">
					<div>取消收藏</div>
				</div>
				<div class="goods_img3"><img src="../../assets/images/collection_show.png" @click.stop="shareAccount(checkb.collectionId,checkb.collectionPics[0])">
					<div>分享</div>
				</div>
			</div>
		</div>
		<shareAccount :popupVisible='popupVisible'></shareAccount>
		<div class="checMore" v-if="moreList" @click="getList">查看更多</div>
		<div class="checMore" v-if="noMoreList">没有更多</div>
		<div v-show="loading">
			<div id="loading-icon">
				<mt-spinner type="fading-circle" color="#26a2ff" :size="60"></mt-spinner>
			</div>
			<div id="loading-text">加载中</div>
		</div>
		<div class="showSharePic" v-show="showWeChatShareTitle">
			<img src="../../assets/images/guide1.png" alt="">
		</div>
		<div class="showSharePop" v-show="showWeChatShareTitle" @click="shutDownWeChat">
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { MessageBox, Toast, Lazyload, Spinner } from 'mint-ui'
import shareAccount from '../../component/shareAccount'
import collectionTab from '../../component/collectionTab.vue'
export default {
	name: '',
	data() {
		return {
			show: null,
			list: [],
			deleteAfterList: [],
			popupVisible: 0,
			pageNumber: 1,
			pageNumberArr: [],
			moreList: false,
			noMoreList: false,
			loading: true,
			none: false,
			deleteAfterGetMore: false,
			deleteItemIndexArr: [],
			showWeChatShareTitle: false,
			isA: false,
			collectList: ''
		}
	},
	components: {
		collectionTab,
		shareAccount
	},
	activated() {
		// 不知道哪里的缓存，先在这个钩子里调用
		this.getList()
	},
	mounted() {
		this.getList()
	},
	methods: {
		//      收藏进详情页
		ceshi: function(event, index, commodityId) {
			window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + commodityId + "&collection=1"
		},
		stop: function() { },
		allHide: function(event) {
			if (this.show != -1) {
				//阻止页面的全部单机事件
				//        document.onclick = function(e){e.preventDefault();return false;}
				this.$nextTick(() => {
					let evt = event || window.event;
					let target = evt.target || evt.srcElement;
					if (target.className != 'goods_model') {
						this.show = -1;
						this.isA = -1
					}
				});
			}
		},
		show1: function(index) {
			event.stopPropagation(); //阻止事件冒泡到父元素的allHide()事件，阻止任何父事件处理程序被执行。
			this.show = index;
			this.isA = index;
		},
		goodsEdit() {
			window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "goods_edit"
		},
		getList() {
			if (this.deleteAfterGetMore) {
				this.pageNumber = Math.min.apply(null, this.pageNumberArr); //连续+跨页删除，需要做特殊处理
			}
			this.loading = true;
			this.noMoreList = false;
			this.moreList = false;
			let url = HOST_HDBMESSAGE + '/collection/findUserCollectionByType'
			this.userId = window.localStorage.getItem('userId')
			this.loginCode = window.localStorage.getItem('loginCode')
			if (this.loginCode != "") {
				//           Vue.http.interceptors.push((request, next) => {
				//             request.headers.set('loginCode', this.loginCode);
				//             next((response) => {
				// //            return response
				//             });
				//           });
				this.$resource(url).get({
					userId: this.userId,
					collectionType: 1,
					page: this.pageNumber
				}).then((response) => {
					if (response.status == 200) {
						let collectList = response.body.respBody;
						console.log(collectList)
						if (collectList.length == 0 && this.list.length == 0) {
							this.loading = false;
							this.none = true;
						}
						if ((0 < collectList.length && collectList.length < 10) || (collectList.length == 0 && this.list.length !== 0)) {
							this.loading = false;
							this.moreList = false;
							this.noMoreList = true;
						}
						if (collectList.length == 10) {
							this.loading = false;
							this.noMoreList = false;
							this.moreList = true;
						}
						for (let i = 0; i < collectList.length; i++) {
							if (collectList[i].collectionPics[0].indexOf(',') != -1) {
								collectList[i].collectionPics[0] = collectList[i].collectionPics[0].substr(0, collectList[i].collectionPics[0].indexOf(','))
							}
//							if (collectList[i].price.indexOf('-') != -1) {
//								collectList[i].price = collectList[i].price.substr(0, collectList[i].price.indexOf('-'))
//							}
						}
						if (this.deleteAfterGetMore) {
							if (this.pageNumber == 1) {
								this.list = [];
							} else {
								this.list = this.list.slice(0, (this.pageNumber - 1) * 10);
							}
							this.list = this.list.concat(collectList);
							for (var item in this.list) {
								this.deleteAfterList[item] = this.list[item]; //此处必须为数组深拷贝
							}
							for (var i = 0, len = this.deleteItemIndexArr.length; i < len; i++) {
								$('.goods_list').eq(this.deleteItemIndexArr[i]).animate({
									'height': '12rem'
								}, 0);
							}
							this.deleteAfterGetMore = false;
						} else {
							this.list = this.list.concat(collectList);
							for (var item in this.list) {
								this.deleteAfterList[item] = this.list[item]; //此处必须为数组深拷贝
							}
						}
						this.pageNumber++;
					}
				})
			}
		},
		deleteIetm(index, deleteId) { //先删除服务器存储，成功再执行UI删除
			let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
			this.loginCode = window.localStorage.getItem('loginCode')
			if (this.loginCode != "") {
				//添加header
				//         Vue.http.interceptors.push((request, next)  =>{
				//           request.headers.set('loginCode', this.loginCode);
				//           next((response) => {
				//             return response
				//           });
				//         });
				this.$resource(url).get({
					id: deleteId
				}).then((response) => {
					if (response.status == 200) {
						this.deleteAfterList.splice(index, 1);
						$('.goods_list').eq(index).animate({
							'height': 0
						}, 300); //DOM结构必须恢复高度
						this.deleteItemIndexArr.push(index);
						if ((index % 10) != 0) {
							this.pageNumber = Math.floor(index / 10) + 1;
						} else {
							this.pageNumber = index / 10;
						}
						this.pageNumberArr.push(this.pageNumber);
						this.deleteAfterGetMore = true;
					}
				})
			}
		},
		shareAccount(collectionId) {

			this.$nextTick(() => {
				//先判断是否是在微信中打开的
				var ua = navigator.userAgent.toLowerCase();
				this.show = -1
				this.isA = -1
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
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
		//请求分享商品的接口
		getShareCommodity() {
			let url = HOST_HDPCOMMODITY + '/commodityFront/addBrowseShareCommodity'
			this.$resource(url).get({
				sourceType: 0,
				version: 'v1.3',
				userId: window.localStorage.getItem('userId'),
				commodityId: this.$route.query.commodityId
			}).then((response) => {
				if (response.body.code == 200) { }
			})
		},
		//关闭在微信中的分享
		shutDownWeChat() {
			this.showWeChatShareTitle = false
		},
	}
}
</script>
<style>
.model {
	-webkit-filter: blur(3px);
	/* Chrome, Opera */
	-moz-filter: blur(3px);
	-ms-filter: blur(3px);
	filter: blur(3px);
	filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
}

.showSharePic {
	position: fixed;
	top: 0;
	z-index: 6666;
	right: 0;
}

.showSharePop {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 5555;
	background-color: #000000;
	opacity: 0.7;
}

#loading-icon {
	margin: 0.5rem auto;
	width: 3rem;
	height: 3rem;
}

#loading-text {
	font-size: 1.4rem;
	padding-bottom: 1rem;
}

.noDate {
	width: 10rem;
	height: 11rem;
	margin: 50% auto;
}

.noDate_p {
	font-size: 1.44rem;
	color: #b7b6b6;
	text-align: center;
	margin-top: -12.5rem;
}

.edit {
	height: 4rem;
	line-height: 4rem;
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
	border: 1px solid #e2e2e2;
}

.phone_change1-line {
	height: 4rem;
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
	width: 12rem;
	float: left;
	margin-left: 1rem;
	height: 12rem;
}

.goods_detail1 {
	font-size: 1.5rem;
	color: #333;
	margin-top: 1.9rem;
	text-align: left;
	width: 18rem;
	line-height: 2rem;
	overflow: hidden;
}

.goods_detail2 {
	font-size: 1.2rem;
	color: #adadad;
	margin-top: 1rem;
	text-align: left;
	width: 18rem;
}

.goods_detail3 {
	font-size: 1.5rem;
	color: #cc141c;
	/*margin-top: 1.8rem;*/
	text-align: left;
}

.goods_detail3 span {
	font-size: 1rem;
	color: #cc141c;
	margin-top: 3.8rem;
}

.goods_line {
	width: 100%;
	/*height: 1rem;*/
	float: right;
}

.goods_list:last-child .goods_line>div {
	display: none;
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

.goods_list:last-child div {
	border: 0;
}
.border01{
	width:100%;
	height:1rem;
	background:#f4f4f4;
}
.clearfix:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	overflow: hidden;
	visibility: visible
}

.checMore {
	padding: 1.7rem 0;
	font-size: 1.2rem;
	color: #adadad;
	background: #f4f4f4;
}
</style>