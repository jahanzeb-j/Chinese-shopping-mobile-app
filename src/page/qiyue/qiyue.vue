<template>
	<div class="body_cont">
		<template v-if="this.micromessenger== 0">
			<div class="zhuantiTop">
				<img @click="backReturn()" src="../../assets/images/goback.png" class="first" alt="" />
				<span>企业VIP会员专享福利包</span>
			</div>
		</template>
		<div class="qiyue">
			<img src="../../assets/images/qiyue/top.jpg" alt="" />
		</div>
		<div class="qiyue2">
			<img src="../../assets/images/qiyue/top2.jpg" alt="" />
		</div>
		<div class="qiyue_cont">
			<img src="../../assets/images/qiyue/right.png" alt=""  class="img1" />
			<img src="../../assets/images/qiyue/title.png" alt="" class="img2" />
			<img src="../../assets/images/qiyue/left.png" alt="" class="img3" />
		</div>
		<div class="qiyue_li">
			<ul>
				<li v-for="item in QYHYVIP_H5" @click="jumpUrl(item.commodityId)">
					<img :src="item.pcPic" alt="" />
					<p class="p1">
						<span>| 市场价:{{ item.hdpPromotionPrice}} </span>
						<span>| 销售价:{{ item.salesPrice}}  </span>
					</p>
					<p class="p2">会员到手价：¥<span>{{ item.memberPrice }}</span></p>
					<p class="p3">立即购买</p>
				</li>
			</ul>
		</div>
		<div class="qiyue_bottom">
			<div class="qiyue_bottom1">
				<img src="../../assets/images/qiyue/erweima.png" alt="" />
			</div>
			<div class="qiyue_bottom2">
				<img src="../../assets/images/qiyue/bottom.jpg" alt="" class="bottom-img1"/>
				<img src="../../assets/images/qiyue/url.png" alt="" class="bottom-img2" @click="tourl"/>
				<img src="../../assets/images/qiyue/return2@2x.png" alt="" class="bottom-img3" @click="backTop"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { api_get_no, _isLogin } from '../../util/api.js'
	import { WeChatShareMixin } from '../../util/WeChatShareMixin.js'
	import { alert_msg, _isWechat } from '../../util/index.js'
	export default {
		mixins: [WeChatShareMixin],
		props: {
			data: {},
		},
		data() {
			return {
				goods: [],
				QYHYVIP_H5: [],
				micromessenger: 0 //0表示微信,1表示非非微信
			}
		},
		beforeCreate() {
			//fix分享进来URL 参数
			if(window.location.href.indexOf('?') >-1 && window.location.href.indexOf('#')>1 ) {
				let whref=window.location.href.split('?')[0];
				let lastHref=window.location.href.split('#')[1];
				window.location.href=whref+'#'+lastHref
			}
			
		},
		mounted() {
			this.getData();
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if(isWeixin) {
				this.micromessenger = 0;
			} else {
				this.micromessenger = 1;
			};
			this.wechatShare();
		},
		methods: {
			getData() {
				var url = HOST_HDPCOMMODITY + '/hdp/theme/getQYHYVIP_H5';
				this.$resource(url).get().then((res) => {
					if(res.body.code == 200) {
						this.goods = res.body.respBody;
						this.QYHYVIP_H5 = this.goods.QYHYVIP_H5;

						this.QYHYVIP_H5.forEach(function(e, i) {
							e.pcPic = e.pic.split(',')[0];
						});
					}
				})
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
				if(_isWechat()) {
					// 微信分享
					let res = await _this.getSignature()
					let title = '企业VIP福利包免费领取'
					let desc = '企业VIP福利包免费领取 尽享超值会员商品每日300个会员激活码限量派发中'
					let imgUrl = 'https://wx2.sinaimg.cn/mw690/d38a49f8ly1fte5dye86vj23dn2yfe82.jpg'
					let link = 'http://m.haodanpin.com/#/qiyue'
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
				let title = '企业VIP福利包免费领取'
				let desc = '企业VIP福利包免费领取 尽享超值会员商品每日300个会员激活码限量派发中'
				let imgUrl = 'https://wx2.sinaimg.cn/mw690/d38a49f8ly1fte5dye86vj23dn2yfe82.jpg'
				let link = 'http://m.haodanpin.com/#/qiyue'
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
			jumpUrl(commodityId) {
				if(window.Android) {
					window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&qiyue=190')
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&qiyue=190'
				}
			},
			backReturn() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
			},
			backTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			tourl() {
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
			
		}
	}
</script>

<style scoped="scoped">
	.zhuantiTop {
		background: #fff;
		width: 100%;
		/*display: block;*/
		border-bottom: 1px solid #d6d6d6;
	}
	
	.zhuantiTop span {
		display: inline-block;
		/*height: 4.4rem;
  		line-height: 4.4rem;*/
		color: #252525;
		font-size: 1.8rem;
		padding: 1.2rem 0;
	}
	
	.zhuantiTop .first {
		width: 1.2rem;
		height: 2rem;
		display: inline-block;
		top: 1rem;
		position: absolute;
		left: 1.2rem;
	}
	
	.zhuanti_top {
		width: 100%;
		height: 30rem;
	}
	
	.zhuanti_top img {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.body_cont {
		width: 100%;
		background: #000000;
		/*overflow: hidden;*/
	}
	.qiyue {
<<<<<<< HEAD
		width: 100%;
		height: 24.05rem;
		margin-bottom: 1rem;
	}
	
	.qiyue img {
		width: 100%;
		height: 100%;
	}
	
	.qiyue2 {
		width: 100%;
		height: 100%;
	}
	
	.qiyue2 img {
		width: 100%;
	}
	
	.qiyue_cont {
		width: 100%;
		height: 3.85rem;
	}
	
	.qiyue_cont .img2 {
		width: 14.25rem;
		height: 2.3rem;
		position: relative;
		top: -1.7rem;
	}
	
	.qiyue_cont .img1,
	.qiyue_cont .img3 {
		width: 9rem;
		height: 5.65rem;
	}
	
	.qiyue_li {
		overflow: hidden;
		margin-top: 3rem;
		padding: 0 0.5rem;
	}
	
	.qiyue_li ul li {
		float: left;
		width: 16.9rem;
		margin-left: 1rem;
		margin-bottom: 0.8rem;
		position: relative;
	}
	
	.qiyue_li ul li .p3 {
		width: 3.4rem;
		height: 5.15rem;
		background: #C6000B;
		position: absolute;
		top: 15.5rem;
		left: 12rem;
		font-size: 1.2rem;
		font-family: MicrosoftYaHei;
		color: rgba(251, 251, 251, 1);
		padding-top: 1rem;
		line-height: 1.5rem;
		text-align: center;
	}
	
	.qiyue_li ul li img {
		width: 100%;
		height: 18.55rem;
		background: #fff;
	}
	
	.qiyue_li ul li p {
		font-family: MicrosoftYaHei;
		color: rgba(192, 166, 106, 1);
		text-align: left;
	}
	
	.qiyue_li ul li .p1 {
		font-size: 0.8rem;
		margin-top: 0.9rem;
		margin-bottom: 0.5rem;
	}
	
	.qiyue_li ul li .p2 {
		font-size: 1.1rem;
		font-family: MicrosoftYaHei;
	}
	
	.qiyue_li ul li .p2 span {
		font-size: 2rem;
		font-family: FuturaBT-Medium;
	}
	
	.qiyue_bottom {
		margin-top: 3rem;
		position: relative;
		/*overflow: hidden;*/
	}
	
	.qiyue_bottom1 {
		z-index: 100;
		position: relative;
	}
	
	.qiyue_bottom2 {
		position: absolute;
		width: 100%;
		top: 3rem;
	}
	.qiyue_bottom2 img {
		width: 100%;
	}
	
	.qiyue_bottom2 .bottom-img1 {
		position: absolute;
		left: 0;
	}
	
	.qiyue_bottom2 .bottom-img2 {
		position: absolute;
		left: 0rem;
		top: 14rem;
	}
	
	.qiyue_bottom2 .bottom-img3 {
		position: absolute;
		left: 13rem;
		top: 30rem;
		width: 11.5rem;
		height: 6.65rem;
	}
	.qiyue img{
		width: 100%;
		height: 100%;
	}
	.qiyue2{
		width: 100%;
		height: 100%;
	}
	.qiyue2 img{
		width: 100%;
	}
	.qiyue_cont{
		width: 100%;
		height: 3.85rem;
	}
	.qiyue_cont .img2{
		width:14.25rem;
		height:2.3rem;
		position: relative;
    		top: -1.7rem;
	}
	.qiyue_cont .img1,.qiyue_cont .img3{
		width: 9rem;
		height: 5.65rem;
	}
	.qiyue_li{
		overflow: hidden;
		margin-top: 3rem;
		/*padding: 0 0.5rem;*/
	}
	.qiyue_li ul li{
		float: left;
		width: 16.9rem;
		margin-left: 1.3rem;
		
	}
	.qiyue_li ul li img{
		width: 100%;
		height: 18.55rem;
	}
	.qiyue_li ul li  p{
		font-family:MicrosoftYaHei;
		color:rgba(192,166,106,1);
		text-align: left;
	}
	.qiyue_li ul li .p1{
		font-size:0.8rem;
		margin: 0.9rem 0;
	}
	.qiyue_li ul li .p2{
		font-size:1.1rem;
		font-family:MicrosoftYaHei;
	}
	.qiyue_li ul li .p2 span{
		font-size:2rem;
		font-family:FuturaBT-Medium;
	}
	/*.qiyue_bottom1{
		position: relative;
		z-index: 100;
		overflow: hidden;
	}*/
	
	.qiyue_bottom2 img{
		width: 100%;
		overflow: hidden;
		
	}
	.qiyue_bottom2 .bottom-img1{
		position: absolute;
		left: 0;
	}
	.qiyue_bottom2 .bottom-img2{
	 	position: absolute;
	    left: 0rem;
=======
		width: 100%;
		height: 24.05rem;
		margin-bottom: 1rem;
	}
	
	.qiyue img {
		width: 100%;
		height: 100%;
	}
	
	.qiyue2 {
		width: 100%;
		height: 100%;
	}
	
	.qiyue2 img {
		width: 100%;
	}
	
	.qiyue_cont {
		width: 100%;
		height: 3.85rem;
	}
	
	.qiyue_cont .img2 {
		width: 14.25rem;
		height: 2.3rem;
		position: relative;
		top: -1.7rem;
	}
	
	.qiyue_cont .img1,
	.qiyue_cont .img3 {
		width: 9rem;
		height: 5.65rem;
	}
	
	.qiyue_li {
		overflow: hidden;
		margin-top: 3rem;
		padding: 0 0.5rem;
	}
	
	.qiyue_li ul li {
		float: left;
		width: 16.9rem;
		margin-left: 1rem;
		margin-bottom: 0.8rem;
		position: relative;
	}
	
	.qiyue_li ul li .p3 {
		width: 3.4rem;
		height: 5.15rem;
		background: #C6000B;
		position: absolute;
		top: 15.5rem;
		left: 12rem;
		font-size: 1.2rem;
		font-family: MicrosoftYaHei;
		color: rgba(251, 251, 251, 1);
		padding-top: 1rem;
		line-height: 1.5rem;
		text-align: center;
	}
	
	.qiyue_li ul li img {
		width: 100%;
		height: 18.55rem;
		background: #fff;
	}
	
	.qiyue_li ul li p {
		font-family: MicrosoftYaHei;
		color: rgba(192, 166, 106, 1);
		text-align: left;
	}
	
	.qiyue_li ul li .p1 {
		font-size: 0.8rem;
		margin-top: 0.9rem;
		margin-bottom: 0.5rem;
	}
	
	.qiyue_li ul li .p2 {
		font-size: 1.1rem;
		font-family: MicrosoftYaHei;
	}
	
	.qiyue_li ul li .p2 span {
		font-size: 2rem;
		font-family: FuturaBT-Medium;
	}
	
	.qiyue_bottom {
		margin-top: 3rem;
		position: relative;
		/*overflow: hidden;*/
	}
	
	.qiyue_bottom1 {
		z-index: 100;
		position: relative;
	}
	
	.qiyue_bottom2 {
		position: absolute;
		width: 100%;
		top: 3rem;
	}
	.qiyue_bottom2 img {
		width: 100%;
	}
	
	.qiyue_bottom2 .bottom-img1 {
		position: absolute;
		left: 0;
	}
	
	.qiyue_bottom2 .bottom-img2 {
		position: absolute;
		left: 0rem;
		top: 14rem;
	}
	
	.qiyue_bottom2 .bottom-img3 {
		position: absolute;
		left: 13rem;
		top: 30rem;
		width: 11.5rem;
		height: 6.65rem;
	}
	.qiyue img{
		width: 100%;
		height: 100%;
	}
	.qiyue2{
		width: 100%;
		height: 100%;
	}
	.qiyue2 img{
		width: 100%;
	}
	.qiyue_cont{
		width: 100%;
		height: 3.85rem;
	}
	.qiyue_cont .img2{
		width:14.25rem;
		height:2.3rem;
		position: relative;
    		top: -1.7rem;
	}
	.qiyue_cont .img1,.qiyue_cont .img3{
		width: 9rem;
		height: 5.65rem;
	}
	.qiyue_li{
		overflow: hidden;
		margin-top: 3rem;
		/*padding: 0 0.5rem;*/
	}
	.qiyue_li ul li{
		float: left;
		width: 16.9rem;
		margin-left: 1.3rem;
		
	}
	.qiyue_li ul li img{
		width: 100%;
		height: 18.55rem;
	}
	.qiyue_li ul li  p{
		font-family:MicrosoftYaHei;
		color:rgba(192,166,106,1);
		text-align: left;
	}
	.qiyue_li ul li .p1{
		font-size:0.8rem;
		margin: 0.9rem 0;
	}
	.qiyue_li ul li .p2{
		font-size:1.1rem;
		font-family:MicrosoftYaHei;
	}
	.qiyue_li ul li .p2 span{
		font-size:2rem;
		font-family:FuturaBT-Medium;
	}
	.qiyue_bottom1{
		position: relative;
		z-index: 100;
		overflow: hidden;
	}
	
	.qiyue_bottom2 img{
		width: 100%;
		overflow: hidden;
		
	}
	.qiyue_bottom2 .bottom-img1{
		position: absolute;
		left: 0;
	}
	.qiyue_bottom2 .bottom-img2{
	 	position: absolute;
	    left: 0rem;
>>>>>>> ea4fb0c93c696cea45b57cbb10c41ed539c7d713
	    top: 14rem;
	}
</style>