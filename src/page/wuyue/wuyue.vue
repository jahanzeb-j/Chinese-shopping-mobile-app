<template>
	<div id="wuyue_box">
		<template v-if="this.micromessenger== 0">
			<div class="zongziTop">
				<img @click="backReturn()" src="../../assets/images/goback.png" class="first" alt="" />
				<span>中秋月圆 品牌荟聚</span>
				<img @click="backReturn()" src="../../assets/images/returnHome.png" class="last" alt="" />
			</div>
		</template>
		<div class="top_img">
			<img src="../../assets/images/duanwuB/ZT_banner.png" alt="" />
		</div>
		<!--特价区-->
		<div class="special_offer">
			<div class="offer_goods" v-for="item in midAutumnTjq" @click="jumpUrl(item.commodityId)">
				<div class="offer_goods_img">
					<img :src="item.picPc" alt="">
				</div>
				<p class="offer_goods_title">{{item.name}}</p>
				<p class="offer_goods_pirce">
					<span class="offer_goods_span1">集采价:</span>
					<span class="offer_goods_span2">{{item.memberPrice}}</span>
					<span class="offer_goods_unit">元/提</span>
					<span class="offer_goods_submit">立即购买</span>
				</p>
			</div>
		</div>
		<!--会员专享-->
		<div class="member_vip_title">
			<img src="../../assets/images/duanwuB/title1.png" alt="">
		</div>
		<div class="member_vip">
			<div class="offer_goods" v-for="item in list1" @click="jumpUrl(item.commodityId)">
				<div class="offer_goods_img">
					<img :src="item.picPc" alt="">
				</div>
				<p class="offer_goods_title">{{item.name}}</p>
				<p class="offer_goods_pirce">
					<span class="offer_goods_span1">集采价:</span>
					<span class="offer_goods_span2">{{item.memberPrice}}</span>
					<span class="offer_goods_unit">元/盒</span>
					<span class="offer_goods_submit">立即购买</span>
				</p>
			</div>
			<div class="member_vip_goods">
				<img class='left_img' src="../../assets/images/duanwuB/left_1.png" alt="">
			</div>
			<div class="member_vip_goods" v-for="item in list2" @click="jumpUrl(item.commodityId)">
				<div class="vip_goods_img">
					<img :src="item.picPc" alt="">
				</div>
				<p class="vip_goods_title">{{item.name}}</p>
				<p class="vip_goods_pirce">
					<span class="vip_goods_span1">集采价:</span>
					<span class="vip_goods_span2">{{item.memberPrice}}</span>
					<span class="vip_goods_unit">元/盒</span>
					<span class="vip_goods_submit">立即购买</span>
				</p>
			</div>
			<div class="member_vip_goods">
				<img class='left_img' src="../../assets/images/duanwuB/left_2.png" alt="">
			</div>
			<div class="member_vip_goods" v-for="item in list3" @click="jumpUrl(item.commodityId)">
				<div class="vip_goods_img">
					<img :src="item.picPc" alt="">
				</div>
				<p class="vip_goods_title">{{item.name}}</p>
				<p class="vip_goods_pirce">
					<span class="vip_goods_span1">集采价:</span>
					<span class="vip_goods_span2">{{item.memberPrice}}</span>
					<span class="vip_goods_unit">元/盒</span>
					<span class="vip_goods_submit">立即购买</span>
				</p>
			</div>
		</div>
		<!--精品推荐-->
		<div class="member_vip_title">
			<img src="../../assets/images/duanwuB/title2.png" alt="">
		</div>
		<div class="special_offer">
			<div class="offer_goods" v-for="item in midAutumnJptj" @click="jumpUrl(item.commodityId)">
				<div class="offer_goods_img">
					<img :src="item.picPc" alt="">
				</div>
				<p class="offer_goods_title">{{item.name}}</p>
				<p class="offer_goods_pirce">
					<span class="offer_goods_span1">集采价:</span>
					<span class="offer_goods_span2">{{item.memberPrice}}</span>
					<span class="offer_goods_unit">元/盒</span>
					<span class="offer_goods_submit">立即购买</span>
				</p>
			</div>
		</div>
		<!--优选单品-->
		<div class="member_vip_title">
			<img src="../../assets/images/duanwuB/title3.png" alt="">
		</div>
		<div class="special_offer">
			<div class="offer_goods">
				<a href="http://m.99114.com/46288796/pd84650361.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/1.png" alt="">
					</div>
					<p class="offer_goods_title">立宝红谷米黄小米400g*8 礼盒装</p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">60</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
			<div class="offer_goods">
				<a href="http://m.99114.com/index/49820053/pd84793954.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/2.png" alt="">
					</div>
					<p class="offer_goods_title">桓龙湖美酒集结号500ml*4 礼盒装 </p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">148</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
			<div class="offer_goods">
				<a href="http://m.99114.com/48870841/pd82650053.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/3.png" alt="">
					</div>
					<p class="offer_goods_title">平和特产鹏鹏佳蜜柚酥1000g</p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">59</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
			<div class="offer_goods">
				<a href="http://m.99114.com/index/47898913/pd83194658.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/4.png" alt="">
					</div>
					<p class="offer_goods_title">福建宝峰特色食品杨枝甘柚饮料250ml*12瓶</p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">60</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
			<div class="offer_goods">
				<a href="http://m.99114.com/index/50643549/pd86706395.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/5.png" alt="">
					</div>
					<p class="offer_goods_title">高家窖知府家酒10年款460ml*4瓶</p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">420</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
			<div class="offer_goods">
				<a href="http://m.99114.com/index/45640228/pd89244343.html" target='_blank'>
					<div class="offer_goods_img">
						<img src="../../assets/images/duanwuB/6.png" alt="">
					</div>
					<p class="offer_goods_title">耕者良品有机杂粮组合3830g真空包装</p>
					<p class="offer_goods_pirce">
						<span class="offer_goods_span1">集采价:</span>
						<span class="offer_goods_span2">168</span>
						<span class="offer_goods_unit">元/盒</span>
						<span class="offer_goods_submit">立即购买</span>
					</p>
				</a>
			</div>
		</div>
		<!--会员注册-->
		<div class="flooer">
			<img class="flooer_img" src="../../assets/images/duanwuB/flooer.jpg" alt="">
			<img @click="back"  class="flooer_img1" src="../../assets/images/duanwuB/link_top.png" alt="">
		</div>
	</div>
</template>
<script>
import { WeChatShareMixin } from '../../util/WeChatShareMixin.js'
import { alert_msg, _isWechat,formatDate } from '../../util/index.js'
import Vue from 'vue'
	export default{
		mixins: [WeChatShareMixin],
		data(){
			return{
				micromessenger: 0 ,//0表示微信,1表示非非微信
				midAutumnHyzx:[],
				list1:[],
				list2:[],
				list3:[],
				midAutumnJptj:[],
				midAutumnTjq:[],
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
		mounted(){
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if (isWeixin) {
				this.micromessenger = 0;
			} else {
				this.micromessenger = 1;
			};
			this.getSlideshowAdvertisingList();
			this.wechatShare();
		},
		methods:{
			jumpUrl(commodityId) {
				if (window.Android) {
					window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&wuyue=159')
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&wuyue=159'
				}
			},
			back(){
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			backReturn(){
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
			},
			//获取商品
			getSlideshowAdvertisingList() {
				this.$api_get_no({
					url: HOST_HDPCOMMODITY + '/hdp/theme/midAutumn?terminalType=2',
				}).then(res => {
					console.log(res)
					if(res.code==200){
						this.midAutumnHyzx=res.respBody.midAutumnHyzx;
						this.midAutumnHyzx.forEach(function(item){
							item.picPc=item.pic.split(',')[0]
						});

						this.list1=this.midAutumnHyzx.slice(0,4);
						this.list2=this.midAutumnHyzx.slice(4,6);
						this.list3=this.midAutumnHyzx.slice(6,8);
						console.log(this.list1)

						this.midAutumnJptj=res.respBody.midAutumnJptj;
						this.midAutumnJptj.forEach(function(item){
							item.picPc=item.pic.split(',')[0]
						});
						this.midAutumnTjq=res.respBody.midAutumnTjq;
						this.midAutumnTjq.forEach(function(item){
							item.picPc=item.pic.split(',')[0]
						});
					}
				})
			},
			 // 微信分享
			async wechatShare(){
				let _this = this
				if(_isWechat()){
					// 微信分享
					let res = await _this.getSignature()
					let title = '中秋月圆 品牌荟聚'
					let desc = '中秋福利预售开启，香港美心、哈根达斯等品牌请您品鉴！'
					let imgUrl = 'http://wx3.sinaimg.cn/mw690/d38a49f8ly1fucg6gusnpj20go0hsae3.jpg'
					let link = 'http://m.haodanpin.com/#/wuyue'
					_this.initWeChatShare({
						title,
						desc,
						imgUrl,
						link,
						success: ()=>{
						
						}
					})
				}
			},
			//使用微信右上角分享功能，初始化微信的分享
			initWeChatShare(){
				let title = '中秋月圆 品牌荟聚'
				let desc = '中秋福利预售开启，香港美心、哈根达斯等品牌请您品鉴！'
				let imgUrl = 'http://wx3.sinaimg.cn/mw690/d38a49f8ly1fucg6gusnpj20go0hsae3.jpg'
				let link = 'http://m.haodanpin.com/#/wuyue'
				wx.ready(function () {
					wx.error(function (res) {
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					})
					//分享到微信朋友圈
					wx.onMenuShareTimeline({
						title:title,
						link: link,
						desc: desc,
						imgUrl: imgUrl,
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享到微信好友
					wx.onMenuShareAppMessage({
						title:title,
						link: link,
						desc: desc,
						imgUrl: imgUrl,
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享到QQ
					wx.onMenuShareQQ({
						title:title,
						link: link,
						desc: desc,
						imgUrl: imgUrl,
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
				});
			},
		},
	}
</script>
<style scoped="scoped">
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
	
	.zongziTop .last {
		width: 1.7rem;
		height: 1.75rem;
		position: absolute;
		right: 0.8rem;
		top: 1.1rem;
	}	
	
	#wuyue_box{
		width: 100%;
		background: #9c0209;
		overflow: hidden;
	}
	.top_img img{
		width: 100%;
		height: 31.9rem;
	}
	/*特价商品*/
	.special_offer{
		overflow: hidden;
	}
	.offer_goods{
		width:17.87rem;
		height:18.25rem;
		background:rgba(255,255,255,0.2);
		float: left;
		padding:0.7rem;
		box-sizing: border-box;
		text-align:left;
		margin-left: 0.6rem;
		margin-bottom:0.2rem;
	}
	.offer_goods_img{
		width:16.44rem;
		height:12.35rem;
		background:#fff;
	}
	.offer_goods_img img{
		width:100%;
		height:100%;
	}
	.offer_goods_title{
		font-size: 1rem;
		font-family: MicrosoftYaHei;
		color: rgba(255,255,255,1);
		margin: 0.4rem 0;
		width: 100%;
		height: 2.3rem;
		line-height: 1.1rem;
		overflow: hidden;
	}
	.offer_goods_pirce span{
		display: inline-block;
	}
	.offer_goods_span1{
		font-size:0.8rem;
		font-family:MicrosoftYaHei;
		color:rgba(255,255,255,1);
	}
	.offer_goods_span2{
		font-size:1rem;
		font-family:MicrosoftYaHei;
		color:rgba(255,252,0,1);
	}
	.offer_goods_unit{
		font-size:0.8rem;
		font-family:MicrosoftYaHei;
		color:rgba(255,252,0,1);
	}
	.offer_goods_submit{
		width:6.44rem;
		height:1.65rem;
		line-height: 1.65rem;
		text-align: center;
		background:rgba(255,246,0,1);
		border-radius:0.5rem;
		font-size:0.8rem;
		font-family:MicrosoftYaHei;
		color:rgba(204,0,0,1);
		margin-left:0.6rem;
	}
	.member_vip{
		overflow: hidden;
	}
	.member_vip_title{
		width:100%;
		height: 7.15rem;
	}
	.member_vip_title img{
		width:100%;
		height: 7.15rem;
	}
	.member_vip_goods{
		width:11.95rem;
		height: 15rem;
		float: left;
		text-align: left;
		background:#fff;
		margin-left: 0.4rem;
		margin-bottom: 0.4rem;
	}
	.member_vip_goods .left_img{
		width:11.95rem;
		height: 15rem;
	} 
	.vip_goods_img{
		width:10.7rem;
		height: 10.7rem;
		background:#fff;
		margin-left:0.4rem;
		margin-top:0.4rem
	}
	.vip_goods_img img{
		width:10.7rem;
		height: 10.7rem;
		background:#fff;
	}
	.vip_goods_title{
		width: 99%;
		height: 2rem;
		line-height: 1rem;
		font-size: 0.8rem;
		font-family: MicrosoftYaHei;
		color: rgba(51,51,51,1);
		overflow: hidden;
		padding-left: 0.4rem;
	}
	.vip_goods_pirce{
		margin-top:0.3rem;
		margin-left: 0.2rem;
	}
	.vip_goods_pirce span{
		display: inline-block;
	}
	.vip_goods_span1{
		font-size:0.6rem;
		font-family:MicrosoftYaHei;
		color:rgba(85,85,85,1);
	}
	.vip_goods_span2{
		font-size:1rem;
		font-family:MicrosoftYaHei;
		color:rgba(221,0,21,1);
	}
	.vip_goods_unit{
		font-size:0.8rem;
		font-family:MicrosoftYaHei;
		color:rgba(221,0,21,1);
	}
	.vip_goods_submit{
		width:3.6rem;
		height:1.34rem;
		line-height: 1.34rem;
		background:rgba(204,0,0,1);
		border-radius:0.3rem;
		font-size:0.8rem;
		font-family:MicrosoftYaHei;
		color:rgba(255,246,0,1);
		text-align: center;
		margin-left:0.2rem;
	}
	.flooer {
		font-size: 0;
	}
	.flooer_img{
		width:100%;
		height:15.7rem;
	}
	.flooer .flooer_img1{
		width:100%;
		height:5.8rem;
	}
</style>