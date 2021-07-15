<template>
	<div id="zongzi">
		<template v-if="this.micromessenger== 0">
			<div class="zongziTop">
				<img @click="back()" src="../../assets/images/goback.png" class="first" alt="" />
				<span>香飘万粽 端阳传情</span>
				<!--<img src="../../assets/images/newFindGood.png" class="last" alt="" />-->
			</div>
		</template>
		<div class="zongziCont">
			<div class="zong_top">
				<img src="../../assets/images/zongzi/banner.jpg" alt="">
			</div>
			<!--平价购大牌-->
			<div class="zong_goods">
				<div class="zong_box">
					<div class="goods_img">
						<img src="../../assets/images/zongzi/title1.png" alt="">
					</div>
					<div class="goods_list">
						<ul>
							<li v-for="item in PJGDP" @click="jumpUrl(item.commodityId)">
								<div class="list_box">
									<img class='listImg' v-lazy="item.pcPic" />
								</div>
								<p class="listSubTitle">{{item.name}}</p>
								<div class="priceBox">
									<span class="originalPrice">¥ {{ item.salesPrice }}</span>
									<span class="salePrice">市场价:¥{{ item.hdpPromotionPrice }}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--真理想品质-->
			<div class="zong_goods  goods_all">
				<div class="zong_box zong_box2">
					<div class="goods_img">
						<img src="../../assets/images/zongzi/title2.png" alt="">
					</div>
					<div class="goods_list">
						<ul>
							<li v-for="item in ZLXPZ" @click="jumpUrl(item.commodityId)">
								<div class="list_box">
									<img class='listImg' v-lazy="item.pcPic" />
								</div>
								<p class="listSubTitle">{{item.name}}</p>
								<div class="priceBox">
									<span class="originalPrice">¥ {{ item.salesPrice }} </span>
									<span class="salePrice">市场价:¥{{ item.hdpPromotionPrice }}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--对比-->
			<div class="zong_brand">
				<div class="brand_img">
					<img src="../../assets/images/zongzi/duibi.png" alt="">
				</div>
				<div class="brand_goods">
					<ul>
						<template v-for="item in TZPXZP">
							<li @click="jumpUrl(item.commodityId)">
								<img v-lazy="item.pcPic" alt="">
							</li>
							<li v-if="item.commodityId == '130733345'" @click="jumpUrl(item.commodityId)">
								<img v-lazy="item.pcPic" alt="">
							</li>
						</template>
					</ul>
				</div>
			</div>
			<!--真理想品质-->
			<div class="zong_goods  goods_all1">
				<div class="zong_box zong_box3">
					<div class="goods_img">
						<img src="../../assets/images/zongzi/title3.png" alt="">
					</div>
					<div class="goods_list">
						<ul>
							<li v-for="item in ZXTJ" @click="jumpUrl(item.commodityId)">
								<div class="list_box">
									<img class='listImg' v-lazy="item.pcPic" />
								</div>
								<p class="listSubTitle">{{item.name}}</p>
								<div class="priceBox">
									<span class="originalPrice">¥{{ item.salesPrice}}</span>
									<span class="salePrice">市场价:¥{{ item.hdpPromotionPrice }}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer">
				<img src="../../assets/images/zongzi/footer.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
import { api_get_no, _isLogin } from '../../util/api.js'
import { WeChatShareMixin } from '../../util/WeChatShareMixin.js'
import { alert_msg, _isWechat } from '../../util/index.js'
export default {
	// mixins: [WeChatShareMixin],
	props: {
		data: {},
	},
	data() {
		return {
			goods: [],
			PJGDP: [],
			ZLXPZ: [],
			TZPXZP: [],
			ZXTJ: [],
			ZXTJ1: [],
			ZXTJ2: [],
			micromessenger: 0 //0表示微信,1表示非非微信
		}
	},
	mounted() {
		this.getSingAdving();
		// this.wechatShare();

		var ua = navigator.userAgent.toLowerCase();
		var isWeixin = ua.indexOf('micromessenger') != -1;
		if (isWeixin) {
			this.micromessenger = 0;
		} else {
			this.micromessenger = 1;
		}
	},
	watch: {},
	methods: {
		// 获取数据
		getSingAdving() {
			let url = HOST_HDPCOMMODITY + '/hdp/theme/getH5Data';
			this.$resource(url).get().then((res) => {
				// console.log(res);
				if (res.body.code == 200) {
					this.goods = res.body.respBody;
					this.PJGDP = this.goods.PJGDP_APP;
					this.PJGDP.forEach(function(e, i) {
						e.pcPic = e.pic.split(',')[0]
					});
					this.ZLXPZ = this.goods.ZLXPZ_APP;
					this.ZLXPZ.forEach(function(e, i) {
						e.pcPic = e.pic.split(',')[0]
					});
					// pk
					this.TZPXZP = this.goods.TZPXZP_APP;
					this.TZPXZP.forEach(function(e, i) {
						e.pcPic= e.pic.split(',')[0]
					});
					this.ZXTJ = this.goods.ZXTJ_APP;
					this.ZXTJ.forEach(function(e, i) {
						e.pcPic = e.pic.split(',')[0]
					});
				}
			})
		},
		jumpUrl(commodityId) {
			if (window.Android) {
				window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&zongzi=159')
			} else {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&zongzi=159'
			}
		},
		back: function() {
			window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
		},

		getShangPinById(id, idArr, url1, ImgUrl, urlArr, ImgUrlArr) {
			idArr.push(id)
			urlArr.push(url1)
			ImgUrlArr.push(ImgUrl)
		},
		getZhuanChangById(id, arr, imgPic, url1, idArr, imgPicArr, url1Arr) {
			idArr.push(id)
			url1Arr.push(url1)
			imgPicArr.push(imgPic)
		},
		search(item) {
			router.push({
				path: 'fg_search',
				query: {
					id: item.id,
					name: item.categoryName,
					acd: 321
				}
			})
		},
		// 微信分享
		async wechatShare() {
			let _this = this
			if (_isWechat()) {
				// 微信分享
				let res = await this.getSignature()
				let title = '企业端午福利内部团购预售中'
				let desc = '七大老字号鲜粽品牌携手260个城市特产礼盒'
				let imgUrl = 'http://img.99114.com/group1/M00/5C/73/wKgGS1rwDwyAEB7sAAXKQVncUXA877.jpg'
				let link = 'http://m.haodanpin.com/#/DaunWu'
				_this.initWeChatShare({
					title,
					desc,
					imgUrl,
					link,
					success: () => {

					}
				})
			}
		},
		//使用微信右上角分享功能，初始化微信的分享
		initWeChatShare() {
			let title = '企业端午福利内部团购预售中'
			let desc = '七大老字号鲜粽品牌携手260个城市特产礼盒'
			let imgUrl = 'http://img.99114.com/group1/M00/5C/73/wKgGS1rwDwyAEB7sAAXKQVncUXA877.jpg'
			let link = 'http://m.haodanpin.com/#/DaunWu'
			wx.ready(function() {
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				})

				//分享到微信朋友圈
				wx.onMenuShareTimeline({
					title: title,
					link: link,
					desc: desc,
					imgUrl: imgUrl,
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});

				//分享到微信好友
				wx.onMenuShareAppMessage({
					title: title,
					link: link,
					desc: desc,
					imgUrl: imgUrl,
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});

				//分享到QQ
				wx.onMenuShareQQ({
					title: title,
					link: link,
					desc: desc,
					imgUrl: imgUrl,
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			});
		},
	}
}
</script>
<style scoped>
.topbox {
	width: 100%;
	height: 4.4rem;
	margin-top: -4.4rem;
}

.zong_top {
	width: 100%;
	/*height: 51rem;*/
}

.zong_top img {
	width: 100%;
	/*height: 51rem;*/
}

.zongziCont {
	/*position: absolute;
	    top: 0;
	    left: 0;*/
	background: #3BBD92;
}

.zongziTop {
	background: #fff;
	width: 100%;
	/*display: block;*/
	border-bottom: 1px solid #d6d6d6;
}

.zongziTop span {
	display: inline-block;
	/*height: 4.4rem;
		line-height: 4.4rem;*/
		color: #252525;
		font-size: 1.8rem;
		padding: 1.2rem 0;
	}
	.zongziTop .first {
		width: 1.2rem;
		height: 2rem;
		display: inline-block;
		top: 1rem;
		position: absolute;
		left: 1.2rem;
	}
	/*.zongziTop .last {
		width: 1.7rem;
		height: 1.75rem;
		position: absolute;
		right: 0.8rem;
		top: 1.1rem;
	}*/	
	.zong_goods {
		/*height:97rem;*/
		padding: 0 0.5rem;
		background: #3BBD92;
		position: relative;
	}	
	.zong_goods .zong_box {
		overflow: hidden;
		width: 100%;
		background: #fff;
		border-radius: 0.4rem;
	}
	.zong_goods .zong_box2, .zong_goods .zong_box3{
		background: #F3FAE1;
	}
	.goods_all {
		padding-top: 4.6rem;		
	}
	.goods_all .goods_img {
		top: 2.1rem;
	}
	.goods_img {
		position: absolute;
		width: 19rem;
		/*height: 4rem;*/
		left: 9rem;
		top: -2.5rem;
	}
	
	.goods_img img {
		width: 100%;
		height: 100%;
	}
	.goods_list {
		overflow: hidden;
		padding-top: 4rem;
	}
	
	.goods_list li {
		width: 16.84rem;
		float: left;
		text-align: left;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: rgba(77, 77, 77, 1);
		margin: 0 0.7rem;
	}
	
	.goods_list li .list_box {
		width: 16.84rem;
		height: 16.85rem;
		border: 1px solid rgba(94, 184, 76, 1);
		/*background:rgba(94,184,76,1);*/
		border-radius: 0.5rem;
		text-align: center;
	}
	
	.goods_list .listImg {
		width: 16rem;
		height: 16rem;
		/*background: rgba(94, 184, 76, 1);*/
		border-radius: 0.5rem;
		margin-top: 0.4rem;
	}
	
	.goods_list li .listSubTitle {
		/*margin: 0.8rem 0rem;*/
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		overflow: hidden;
	}
	
	.goods_list li .priceBox {
		width: 100%;
		height: 1.4rem;
		color: #EA0032;
		font-size: 1.5rem;		
		margin-bottom: 1.5rem; 
		padding-left: 0.2rem;
		position: relative;
		/*overflow: hidden;*/
	}
	.goods_list li .priceBox .originalPrice{
		font-family: PingFangSC-Regular;
		position: absolute;
		font-weight:700;
		font-size: 1.6rem;	
		left:0;
		
	}
	.goods_list li .priceBox .salePrice {
		/*width: 10rem;*/
		/*height: 1.4rem;*/
		/*padding-left: 0.8rem;*/
		/*line-height: 1.4rem;*/
		font-size: 1.5rem;
		font-family: PingFangSC-Regular;
		text-align: center;
		/*margin-left: 2rem;*/
		/*border-radius: 0.7rem;*/
		/*background: rgba(94, 184, 76, 1);*/
		color: #6d6f6e;
		text-decoration: line-through;
		position: absolute;
		right: 0.4rem;
	}
	/*甜咸对比*/	
	.zong_brand {
		padding-top: 2rem;
		background: #3BBD92;
		overflow: hidden;
		padding-bottom: 3rem;
	}
	.zong_brand .brand_img {
		width: 29rem;
		height: 4rem;
		margin: 0 auto;
	}	
	.zong_brand .brand_img img {
		width: 100%;
		height: 100%;
	}
	.zong_brand .brand_goods {
		margin-top: 1rem;
		padding: 0 2.25rem;
		overflow: hidden;
	}
	
	.zong_brand .brand_goods li {
		width: 10rem;
		height: 10rem;
		float: left;
		/*background: rgba(94, 184, 76, 1);*/
		margin-right: 1rem;
		margin-bottom: 1rem;		
	}
		
	.zong_brand .brand_goods li img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px dotted #878887;
		padding: 5px;
		background: #5dcaa7;
	}
	
	.goods_all1 {
		padding-top: 0;
	}
	
	.footer {
		width: 100%;
		height: 13rem;
		position: relative;
	}
	
	.footer img {
		width: 100%;
		height: 17rem;
	color: #252525;
	font-size: 1.8rem;
	padding: 1.2rem 0;
}

.zongziTop .first {
	width: 1.2rem;
	height: 2rem;
	display: inline-block;
	top: 1rem;
	position: absolute;
	left: 1.2rem;
}

.zong_goods {
	/*height:97rem;*/
	padding: 0 0.5rem;
	background: #3BBD92;
	position: relative;
}

.zong_goods .zong_box {
	overflow: hidden;
	width: 100%;
	background: #fff;
	border-radius: 0.4rem;
}

.zong_goods .zong_box2,
.zong_goods .zong_box3 {
	background: #F3FAE1;
}

.goods_all {
	padding-top: 4.6rem;
}

.goods_all .goods_img {
	top: 2.1rem;
}

.goods_img {
	position: absolute;
	width: 19rem;
	/*height: 4rem;*/
	left: 9rem;
	top: -2.5rem;
}

.goods_img img {
	width: 100%;
	height: 100%;
}

.goods_list {
	overflow: hidden;
	padding-top: 4rem;
}

.goods_list li {
	width: 16.84rem;
	float: left;
	text-align: left;
	font-size: 1.4rem;
	font-family: PingFangSC-Regular;
	color: rgba(77, 77, 77, 1);
	margin: 0 0.7rem;
}

.goods_list li .list_box {
	width: 16.84rem;
	height: 16.85rem;
	border: 1px solid rgba(94, 184, 76, 1);
	/*background:rgba(94,184,76,1);*/
	border-radius: 0.5rem;
	text-align: center;
}

.goods_list .listImg {
	width: 16rem;
	height: 16rem;
	/*background: rgba(94, 184, 76, 1);*/
	border-radius: 0.5rem;
	margin-top: 0.4rem;
}

.goods_list li .listSubTitle {
	/*margin: 0.8rem 0rem;*/
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	overflow: hidden;
}

.goods_list li .priceBox {
	width: 100%;
	height: 1.4rem;
	color: #EA0032;
	font-size: 1.5rem;
	margin-bottom: 1.5rem;
	padding-left: 0.2rem;
	position: relative;
	/*overflow: hidden;*/
}

.goods_list li .priceBox .originalPrice {
	font-family: PingFangSC-Regular;
	position: absolute;
	font-weight: 700;
	font-size: 1.6rem;
	left: 0;
}

.goods_list li .priceBox .salePrice {
	/*width: 10rem;*/
	/*height: 1.4rem;*/
	/*padding-left: 0.8rem;*/
	/*line-height: 1.4rem;*/
	font-size: 1.5rem;
	font-family: PingFangSC-Regular;
	text-align: center;
	/*margin-left: 2rem;*/
	/*border-radius: 0.7rem;*/
	/*background: rgba(94, 184, 76, 1);*/
	color: #6d6f6e;
	text-decoration: line-through;
	position: absolute;
	right: 0.4rem;
}



/*甜咸对比*/

.zong_brand {
	padding-top: 2rem;
	background: #3BBD92;
	overflow: hidden;
	padding-bottom: 3rem;
}

.zong_brand .brand_img {
	width: 29rem;
	height: 4rem;
	margin: 0 auto;
}

.zong_brand .brand_img img {
	width: 100%;
	height: 100%;
}

.zong_brand .brand_goods {
	margin-top: 1rem;
	padding: 0 2.25rem;
	overflow: hidden;
}

.zong_brand .brand_goods li {
	width: 10rem;
	height: 10rem;
	float: left;
	/*background: rgba(94, 184, 76, 1);*/
	margin-right: 1rem;
	margin-bottom: 1rem;
}

.zong_brand .brand_goods li img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 2px dotted #878887;
	padding: 5px;
	background: #5dcaa7;
}

.goods_all1 {
	padding-top: 0;
}

.footer {
	width: 100%;
	height: 13rem;
	position: relative;
}

.footer img {
	width: 100%;
	height: 17rem;
	position: absolute;
	top: -4rem;
	left: 0;
}
</style>