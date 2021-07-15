<template>
	<div class="newProducts">
		<div class="tapNav">
			<div>
				<router-link to="/" repalce>
					<img class="navLeft" src="../assets/images/tab/zhaohuo_nor@2x.png" alt="">
				</router-link>
			</div>
			新品上架
			<div class="navRight">
				<img @click="to_search" class="search" src="../assets/images/tab/newFindGood.png" alt="">
				<img @click="to_shopping" class="shopping" src="../assets/images/tab/icon_gouwu_nor@3x.png" alt="">
			</div>
		</div>
		<div class="banner">
			<img src="../assets/images/new/banner.jpg" alt="">
		</div>
		<div class="newGoods">
			<div class="goodsTitle" @click="clickbody0">
				新品热销
			</div>
			<div class="goods">
				<ul>
					<div class="one">
						<img src="../assets/images/new/0.png" alt="">
					</div>
					<div class="two">
						<img src="../assets/images/new/1.png" alt="">
					</div>
					<div class="three">
						<img src="../assets/images/new/2.png" alt="">
					</div>
					<div class="four">
						<img src="../assets/images/new/3.png" alt="">
					</div>
					<li v-for="(item,index) in goods" @click="jumpUrl(item.commodityId)" :key="index">
						<div class="leftImg">
							<img class="goodsImg" :src="item.picPc" alt="">
						</div>
						<div class="rightText">
							<p class="p1">{{ item.commodityName }}</p>
							<p class="p2">{{ item.subName }}</p>
							<p class="p3">
								<span class="span1"> ¥{{ item.salePrice }}</span>
								<span class="span2"> ¥{{ item.memberPrice }}</span>
								<span class="span3">
                                    <img src="../assets/images/new/vip.png" alt="">
                                </span>
							</p>
							<p class="p4">
								立即抢购
							</p>
						</div>
					</li>
				</ul>
				
			</div>
		</div>
		<div style="width:100%;height:1rem;background:#F4F4F4;"></div>
		<div class="allgoods" >
			<div class="allgoodsTitle" @click="clickbody">
				全部新品
			</div>
			<div class="allgoodsNav" :class="navBarFixed == true ? 'navBarWrap' :''">
				<div class="r_title">
					<div @click="priceText()" :class="{active1:isPriceText}">新品
					</div>
					<div @click="sellSort()" :class="{active1:isSellActive}" id="allClassbtn">{{ categoryName1 }}
						<div class="allClass" v-if="showdiv" id="allClass">
							<ul>
								<li class="firstli" style="color:rgba(235,84,77,1); border: 1px solid #EB544D;" @click="getliall()">全部</li>
								<li v-for="(item,index) in newgoods" @click="jumpLi(item.categoryId, item.categoryName)" :class="{ active1: index==selectItem }">
									{{ item.categoryName }}
									<span>{{ item.commodityCount }}</span>
								</li>
							</ul>
						</div>
					</div>
					<div @click="priceSort()" :class="{active1:isPriceActive}" style="position: relative;">价格
						<img v-if="isPriceActive && !priceDown" style="width:0.85rem; position: absolute;top: 1.5rem;left: 8rem;" src="../assets/images/shang_sel@2x.png" alt="">
						<img v-if="!isPriceActive || priceDown" style="width:0.85rem; position: absolute;top: 1.5rem;left: 8rem;" src="../assets/images/shang_nor@2x.png" alt="">
						<img v-if="isPriceActive || !priceDown" style="width:0.85rem; position: absolute;top: 2.2rem;left: 8rem;" src="../assets/images/xia_nor@2x.png" alt="">
						<img v-if="isPriceActive && priceDown" style="width:0.85rem; position: absolute;top: 2.2rem;left: 8rem;" src="../assets/images/xia_sel@2x.png" alt="">
					</div>
				</div>
			</div>
			<div class="allgoodsUl">
				<ul>
					<li v-for="(item,index) in newgoodsproduct" @click="jumpUrl(item.commodityId)" :key="index">
						<div class="goods_Img">
							<img :src="item.picPc" alt="">
						</div>
						<p class="sales" v-if="item.subName != null">{{ item.subName }}</p>
						<p class="sales" v-else>源头好货源，正品优价</p>
						<p class="goods_text">{{ item.commodityName }}</p>
						<p class="price">
							<span class="span1"> ¥{{ item.salePrice }}</span>
							<span class="span2"> ¥{{ item.memberPrice }}</span>
							<span class="span3">
	                            <img src="../assets/images/new/vip.png" alt="">
	                        </span>
						</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="bottomImg" id="return-top">
			<img src="../assets/images/new/Group 6@2x.png" />
		</div>
	</div>
</template>
<style scoped>	
	.navBarWrap{
		position:fixed;
	    top:4.4rem;
	    z-index:999;
	}
	.goods_Img img {
		width: 100%;
		height: 100%;
		background: rgba(244,244,244,1);
	}
	
	.tapNav {
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		background: #fff;
		font-size: 1.8rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		border-bottom:0.05rem solid rgba(226,226,226,1);
		position: fixed;
		z-index: 1;
	}
	
	.navLeft {
		position: absolute;
		left: 1.5rem;
		top: 1.1rem;
		width: 2.3rem;
		height: 2.2rem;
	}
	
	.navRight {
		position: absolute;
		right: 1.5rem;
		top: 0.4rem;
	}
	
	.navRight .search {
		width: 2rem;
		height: 2.2rem;
		margin-right: 1.8rem;
	}
	
	.navRight .shopping {
		width: 2.2rem;
		height: 2.2rem;
	}
	
	.banner {
		width: 100%;
		height: 21rem;
		/*background: #ccc;*/
	}
	
	.banner img {
		width: 100%;
		height: 16.6rem;
		margin-top: 4.4rem;
	}
	
	.goodsTitle {
		width: 100%;
		height: 5.3rem;
		line-height: 5.3rem;
		font-size: 1.6rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		border-bottom: 1px solid #E2E2E2;
	}
	
	.goods {
		position: relative;
	}
	
	.goods .one {
		position: absolute;
		width: 3rem;
		height: 3rem;
		top: 1rem;
		left: 1rem;
	}
	
	.goods .one img {
		width: 2.6rem;
    		height: 2.9rem;
	}
	
	.goods .two {
		position: absolute;
		width: 3rem;
		height: 3rem;
		top: 16rem;
		left: 1rem;
	}
	
	.goods .two img {
		width: 2.6rem;
    		height: 2.9rem;
	}
	
	.goods .three {
		position: absolute;
		width: 3rem;
		height: 3rem;
		top: 30rem;
		left: 1rem;
	}
	
	.goods .three img {
		width: 2.6rem;
    		height: 2.9rem;
	}
	.goods .four {
		position: absolute;
		width: 3rem;
		height: 3rem;
		top: 44rem;
		left: 1rem;
	}
	.goods .four img {
		width: 2.6rem;
    		height: 2.9rem;
	}
	.goods li {
		height: 14.2rem;
		width: 100%;
		border-bottom: 1px solid #E2E2E2;
	}
	
	.goods .leftImg {
		float: left;
		width: 15.8rem;
	}
	
	.goods .leftImg .goodsImg {
		width: 10.5rem;
		height: 11rem;
		margin-top: 1.6rem;
		margin-left: 2.6rem;
		/*background: #ccc;*/
	}
	
	.rightText {
		text-align: left;
		float: left;
	}
	
	.rightText .p1 {
		width: 20rem;
		height: 2rem;
		line-height: 2rem;
		overflow: hidden;
		font-size: 1.6rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		margin-top: 1rem;
	}
	
	.rightText .p2 {
		width: 20rem;
		height: 2rem;
		line-height: 2rem;
		overflow: hidden;
		font-size: 1.2rem;
		font-family: PingFangSC-Light;
		color: rgba(127, 127, 127, 1);
	}
	
	.rightText .p3 {
		margin-top: 1rem;
	}
	
	.rightText .p3 .span1 {
		font-size: 1.8rem;
		font-family: PingFangSC-Regular;
		color: rgba(235, 84, 77, 1);
	}
	
	.rightText .p3 .span2 {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(127, 127, 127, 1);
	}
	
	.rightText .p3 .span3 {
		width: 2rem;
		height: 1rem;
	}
	.rightText .p3 .span3 img{
		width: 100%;
	}
	.rightText .p4 {
		margin-top: 2rem;
		width: 10rem;
		height: 2.8rem;
		line-height: 2.8rem;
		background: linear-gradient(-90deg, rgba(255, 218, 66, 1), rgba(255, 233, 91, 1));
		border-radius: 0.25rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		text-align: center;
	}
	
	.allgoodsTitle {
		width: 100%;
		height: 5.5rem;
		line-height: 5.5rem;
		text-align: center;
		font-size: 1.6rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
	}
	
	.allgoodsNav {
		height: 4rem;
		line-height: 4rem;
		width: 100%;
		border-bottom: 1px solid #E2E2E2;
		border-top: 1px solid #E2E2E2;
		margin-top: -0.05rem;
	}
	
	.r_title>div {
		float: left;
		height: 100%;
		line-height: 4rem;
		width: 33.333%;
		text-align: center;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		border-bottom: 1px solid #f3f4f3;
    		z-index: 666;
    		background: #fff;
	}
	
	.r_title>.active1 {
		color: #EB544D;
	}
	
	.allgoodsUl {
		padding-top: 1rem;
		padding-bottom: 5rem;
	}
	
	.allgoodsUl ul {
		overflow: hidden;
	}
	
	.allgoodsUl li {
		float: left;
		width: 17rem;
		margin-left: 1rem;
		text-align: left;
		margin-bottom: 1.5rem;
	}
	
	.goods_Img {
		width: 100%;
		height: 17rem;
		/*background: #ccc;*/
	}
	
	.sales {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		text-align: left;
		overflow: hidden;
		font-size: 1.2rem;
		font-family: PingFangSC-Light;
		color: rgba(159, 138, 96, 1);
		background: rgba(241, 236, 226, 1);
		padding-left: 1.35rem;
	}
	
	.goods_text {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		overflow: hidden;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
	}
	
	.price .span1 {
		font-size: 1.5rem;
		font-family: PingFangSC-Light;
		color: rgba(235, 84, 77, 1);
	}
	
	.price .span2 {
		font-size: 1.2rem;
		font-family: PingFangSC-Light;
		color: rgba(193, 170, 114, 1);
	}
	
	.price .span3 {
		width: 2rem;
		height: 1rem;
	}
	
	.allClass {
		position: absolute;
		left: 0;
		width: 100%;
		/*height: 15rem;*/
		padding-top: 2rem;
		padding-left: 3rem;
		background: #fff;
		box-shadow:0rem 0.05rem 0.25rem 0.05rem rgba(0,0,0,0.03);
	}
	
	.allClass li {
		float: left;
		height: 3rem;
		line-height: 3rem;
		width: auto;
		margin-right: 2rem;
		padding: 0 1rem;
		border: 1px solid #B2B2B2;
		box-sizing: border-box;
		margin-bottom: 2rem;
		color: #444;
		border-radius: 0.1rem;
	}
	
	.allClass li:active {
		color: #EB544D;
		border: 1px solid #EB544D;
	}
	
	.bottomImg {
		position: fixed;
		width: 4.4rem;
		height: 4.35rem;
		right: 1.35rem;
		bottom: 2.85rem;
	}
	
	.bottomImg img {
		width: 100%;
	}
	.allClass li:active{
		color:rgba(235,84,77,1);
		/*background: #EB544D;*/
	}
	.firstli{
		color:rgba(235,84,77,1);
		border: 1px solid #EB544D;
	}
</style>
<script>
	import Vue from 'vue'
	import { router } from '../router/index.js'
	import { Toast, MessageBox } from 'mint-ui';
	import { alert_msg, _isWechat } from '../util/index.js'
	import { WeChatShareMixin } from '../util/WeChatShareMixin.js'
	export default {
		mixins: [WeChatShareMixin],
		data() {
			return {
				isPriceText: false,
				isSellActive: false,
				isPriceActive: false,
				priceDown: false,
				showdiv: false,
				isPriceActive0:false,
				goods: [], 
				newgoods: [],
				newgoodsproduct: [],
				newproduct: [],
				reorder: 'asc',
				categoryName1: '分类',
				selectItem:0,
				navBarFixed:true,
			}
		},
		created() {
			
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
//			$('.newProducts').click(function(){
//				this.showdiv = false
//			})
			$(function() {
				$('#return-top').hide();
				$(function() {
					$(window).scroll(function() {
						if($(window).scrollTop() > 300) {
							$('#return-top').fadeIn(300);
						} else {
							$('#return-top').fadeOut(200);
						}
					});
					$('#return-top').click(function() {
						$('body,html').animate({
							scrollTop: 0
						}, 300);
						return false;
					})
				})
			});
			
			// 事件监听滚动条
			window.addEventListener('scroll', this.watchScroll)
			this.getproductall();
			this.newproductall();
			this.wechatShare();
		},
		methods: {
			watchScroll () {
		        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;		        
		        //  当滚动超过 50 时，实现吸顶效果
		        if (scrollTop > 2252) {
		          this.navBarFixed = true;
		        } else {
		          this.navBarFixed = false;
		        }
		    },

			//获取不同分类商品
			jumpLi(categoryId, name) {
				// console.log(categoryId, name)
				this.categoryName1 = name;
				var url = HOST_HDPCOMMODITY + '/hdp/new/commodity/getAllNewCommodity?priceSort=' + this.reorder
				this.$resource(url).get().then((res) => {
					// console.log(res)
					if(res.body.code == 200) {
						var classList = res.body.respBody;
						// console.log(classList)
						for(var i = 0; i < classList.length; i++) {
							if(categoryId == classList[i].categoryId) {
								this.newgoodsproduct = classList[i].commoditys;
							}
						}
					}
				})
			},
			gitClass() {},
			getliall(){
				this.newproductall()
			},
			//获取所有新品商品
			newproductall() {
//				this.newgoodsproduct = [];
				var url = HOST_HDPCOMMODITY + '/hdp/new/commodity/getAllNewCommodity?priceSort=' + 'asc'
				this.$resource(url).get().then((res) => {
					if(res.body.code == 200) {
						this.newgoods = res.body.respBody;
						this.newgoodsproduct = [];
						for(var i = 0; i < this.newgoods.length; i++) {
							for(var j = 0; j < this.newgoods[i].commoditys.length; j++) {
								if(this.newgoods[i].commoditys[j].subName==null){
									this.newgoods[i].commoditys[j].subName='源头好货源，正品优价'
								};
								this.newgoodsproduct.push(this.newgoods[i].commoditys[j])
							}
						}
					}
				});
			},
			getproductall() {
				var url = HOST_HDPCOMMODITY + '/hdp/new/commodity/getNewCommodity?priceSort=asc&allComm=1';
				this.$resource(url).get().then((res) => {
					if(res.body.code == 200) {
						this.goods = res.body.respBody;
					}
				})
			},
			//点击新品
			priceText() {
				this.isPriceText = true;
				this.isSellActive = false;
				this.isPriceActive = false;
				this.categoryName1 = '分类';
				this.showdiv = false;
				this.newproductall();
			},
			//点击分类
			sellSort(event) {
				this.isSellActive = true
				this.isPriceText = false;
				this.isPriceActive = false;
				this.showdiv = !this.showdiv;
			},
			clickbody(){
				this.showdiv = false;
			},
			clickbody0(){
				this.showdiv = false;
			},
			//获取价格排序商品
			priceSort() {
				this.categoryName1 = '分类';
				this.isPriceText = false;
				this.isSellActive = false;
				this.isPriceActive = true;
				if(this.priceDown){
					this.priceDown = false;
				}else{
					this.priceDown = true;
				}
				this.showdiv = false;
				
				if(this.reorder == 'asc') {
					this.reorder = 'desc'
				} else {
					this.reorder = 'asc'
				}
				var url = HOST_HDPCOMMODITY + '/hdp/new/commodity/getAllNewCommodity?priceSort=' + this.reorder + '&allComm=1'
				this.$resource(url).get().then((res) => {
					// console.log(res)
					this.newgoodsproduct = [];
					if(res.body.code == 200) {
						this.newgoodsproduct = res.body.respBody[0].commoditys
					}
				})
			},
			to_search() {
				this.$router.replace({
					path: 'fg_search',
					query: {
						acd: 'newProducts'
					}
				});
			},
			to_shopping() {
				this.$router.replace({
					path: 'messageIndex',
					query: {
						shoppingBack: '1010'
					}
				});
			},
			jumpUrl(commodityId) {
				if(this.showdiv==true){
					this.showdiv=false;
					return;
				}
				if(window.Android) {
					window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&newProducts=200')
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&newProducts=200'
				}
			},
			// 微信分享
			async wechatShare(){
				let _this = this
				if(_isWechat()){
					// 微信分享
					let res = await _this.getSignature()
					let title = '新品上市！'
					let desc = '爆款热销 新品发布'
					let imgUrl = 'http://m.haodanpin.com/static/img/weChatShare.png'
					let link = 'http://m.haodanpin.com/#/newProducts'
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
				let title = '新品上市！'
				let desc = '爆款热销 新品发布'
				let imgUrl = 'http://m.haodanpin.com/static/img/weChatShare.png'
				let link = 'http://m.haodanpin.com/#/newProducts'
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
		}
	}
</script>