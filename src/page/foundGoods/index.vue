<template>
	<div class="foundIndex">
		<!--<div v-show="!loading">-->
		<div>
			<!-- <f-header v-on:showSidebarPT="showSidebarFn" class="f-header-wrap"></f-header> -->
			<div class="f-header1" v-show="showSearch!=='hide'"></div>
			<f-search class="f-search-wrap" v-show="showSearch!=='hide'"></f-search>
			<f-carousel :data="ModuleCarousel"></f-carousel>
			<f-advise :data="ModuleAdvise"></f-advise>
			<f-threeadv :data="ModuleAdv"></f-threeadv>
			<f-hdp :data="ModuleHDP"></f-hdp>
			<f-limitTime :data='ModuleLimit'></f-limitTime>
			<f-banner :data="banners"></f-banner>
			<f-banners :data='banners'></f-banners>
			<f-swiper :data='ModuleSwiper'></f-swiper>
			
			<f-sp :data="ModuleZC" :title="ModuleZCTitle"></f-sp>
			<!--<f-banner :data="ModuleBanner[1]"></f-banner> -->
			<!--<f-recommend :data="ModuleZC1" :showBottom="showSearch"></f-recommend> -->
			<quick-bar :purchase="true" shoppingBack="004" v-show="showSearch!=='hide'"></quick-bar>
			<div class="sidebar" v-if="showSearch!=='hide'" :class='{zIindex:isUp}'>
				<transition name="slide-fade">
					<div class="sidebar-inner" v-if="isShowSidebar" :class="{addLv:isAddLv}">
						<div class="sidebar-header">
							<div class="sidebar-header-icon" @click="hideSidebar">
								<img src="../../assets/images/return-yellow.png" alt="" style="height: 50%;">
							</div>
							<div class="sidebar-header-text">选择分类</div>
						</div>
						<div id="sidebarContent">
							<ul class="sidebar-l1">
								<li v-for="item in list" @click="checkList(item)">{{item.categoryName}}<i v-if="item.categoryName==checkedName" class="pointer"></i></li>
								<li></li>
							</ul>
							<ul class="sidebar-l2" v-if='isAddLv'>
								<li v-for="item in subList" @click="search(item)">{{item.categoryName}}</li>
								<li></li>
							</ul>
						</div>
					</div>
				</transition>
				<div class="blank" @click="hideSidebar">
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	import FHeader from '../../component/found_goods/header.vue'
	import FSearch from '../../component/found_goods/search.vue'
	import FCarousel from '../../component/found_goods/carousel.vue'
	import FAdvise from '../../component/found_goods/advise.vue'
	import FHdp from '../../component/found_goods/hdp.vue'
	import FBanner from '../../component/found_goods/banner.vue'
	import FBanners from '../../component/found_goods/banners.vue'
	import FThreeadv from '../../component/found_goods/three_adv.vue'
	import FSp from '../../component/found_goods/sp.vue'
	import FRecommend from '../../component/found_goods/recommend.vue'
	import BottomTab from '../../component/bottomTab.vue'
	import QuickBar from '../../component/QuickBar.vue'
	import FSwiper from '../../component/found_goods/swiper.vue'
	import FLimitTime from '../../component/found_goods/limitTime.vue'
	import { router } from '../../router/index.js'
	import { throttle } from '../../util/index.js'
	import { WeChatShareMixin } from '../../util/WeChatShareMixin.js'
	// import { WeChatShareMixinZT } from '../../util/WeChatShareMixinZT.js'
	import { alert_msg, _isWechat, _isFix } from '../../util/index.js'

	export default {
		mixins: [WeChatShareMixin],
		props: ['showSearch'],
		data() {
			return {
				isShowSidebar: false,
				isUp: false,
				checkedName: '',
				isAddLv: false,
				list: [],
				subList: [],
				ModuleCarousel: '',
				ModuleAdvise: {},
				ModuleBanner: [],
				banners: [],
				ModuleBanner1: {},
				ModuleSwiper: [],
				ModuleHDP: [],
				ModuleAdv: [],
				ModuleLimit: [],
				ModuleZC: [],
				ModuleZCTitle: '',
				ModuleZC1: [],
				globQuery: 0,
				imgPic: '',
				howYuan: '',
				fullLessCash: '',
				controlLoading: '',
				loading: true,

			}
		},
		activated() {

			//refresh data to fix a bug under 'keep-alive'
			// this.ModuleCarousel = Object.assign({},this.ModuleCarousel)
		},
    	beforeCreate() {
			//fix分享进来URL 参数
			let str=window.location.href;
			window.location.href=_isFix(str);
			
		},
		mounted() {
      
    //   //fix分享进来URL 参数
	// 		if(window.location.href.indexOf('?') != window.location.href.lastIndexOf('?')) {
	// 			window.location.href = window.location.href.replace(/\?[\&?\w+\=\w+]+/, '')
	// 		}
			async function getData() {
				this.getList()
				await this.getModule()
				setTimeout(function() {
					this.recordScrollPosition()
				}.bind(this), 500)

			}
			getData.call(this);
			this.getSingAdving();
			this.wechatShare();

		},
		methods: {
			recordScrollPosition() {
				let pos = localStorage.getItem('foundGood_position')

				// let scrollFunc = function(){
				//   document.body.scrollTop += 100 
				//   if(document.body.scrollTop < pos) requestAnimationFrame(scrollFunc);
				// }

				if(pos) {
					document.body.scrollTop = pos
				}
				//remain to optimized
				window.onhashchange = function(e) {
					if(location.hash.match('/found_index')) {
						return
					}
					window.onscroll = null
				}
				window.onscroll = throttle(function() {
					localStorage.setItem('foundGood_position', document.body.scrollTop)
				}, 10)
			},
			showSidebarFn() {
				this.isShowSidebar = true
				this.isUp = true
			},
			hideSidebar() {
				let that = this
				this.isShowSidebar = false
				setTimeout(fn, 200)

				function fn() {
					that.isUp = false
				}

				this.isAddLv = false
				this.checkedName = ''
			},
			checkList(item) {
				this.isAddLv = true
				this.checkedName = item.categoryName
				this.subList = item.childlist
			},
			getList() {
				this.$resource(HOST_HDPCOMMODITY + '/commodityFront/getCategoryList').get({}).then((response) => {
					if(response.status == 200) {
						this.list = response.body
					} else {
						Toast({
							message: 'code:' + response.status + ', 数据请求失败!',
							duration: 2000,
							className: "toast"
						});
					}
				})
			},
			getModule() {
				this.$nextTick(() => {
					let body = document.getElementsByTagName('body')[0]
					body.scrollTop = 0
				})
				this.$resource(HOST_HDPMOBILEVIEW + '/moduleResources/moduleList').
				get({
						'viewId': '1487662711775705',
						'flag': 1
					})
					.then((response) => {
						//  console.log(response)
						if(response.status == 200) {
							for(let i = 0; i < response.body.length; i++) {
								for(var j in response.body[i].title) {
									if(response.body[i].title[j] == null) {
										response.body[i].title[j] = '';
									}
								}
								if(response.body[i].viewDataId == 3) {
									//轮播图
									this.ModuleCarousel = response.body[i]

								}
								if(response.body[i].viewDataId == 8) {
									//icon编辑
									this.ModuleAdvise = response.body[i].content
									this.ModuleAdvise.forEach((e, i) => {
										// 1：链接 2：类目 3：主题编号  5：商品', 6：搜索词
										if(e.contentOperationType == 1) {
											e.contentLinkUrl = e.contentLinkAddress
										}
										if(e.contentOperationType == 3) {
											e.contentLinkUrl = 'theme_detail?id=' + e.contentExternalId + '&theme_list=1'
										}
										if(e.contentOperationType == 5) {
											e.contentLinkUrl = 'good_detail?commodityId=' + e.contentExternalId + '&found_index=1'
										}
										if(e.contentOperationType == 6) {
											// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
											// e.contentLinkUrl = M+'.haodanpin.'+SETDOMAIN+'/#/fg_search?acd=231&name='+e.searchWord+''
											// e.contentLinkUrl = 'fg_search?acd=231&name='+e.searchWord+''
											e.contentLinkUrl = 'fg_search?acd=231&name=' + e.searchWord + '&id=' + e.id + ''
										}
										if(e.contentOperationType == 2) {
											e.contentLinkUrl = 'classifySecond?categoryId=' + e.contentExternalId + ''
											// let url=HOST_HDPCOMMODITY+ '/category/getOneCategory'
											// this.$api_get_no({
											//   url:url,
											//   data:{
											//     id:e.contentExternalId
											//   }
											// }).then(res =>{
											//   console.log(res)

											// })

										}
									})
									this.ModuleAdvise.disabled = response.body[i].disabled
								}

								if(response.body[i].moduleId == '1515568011520822') {
									//广告位
									this.ModuleBanner = this.ModuleBanner.concat(response.body[i]);
									// console.log(this.ModuleBanner)
									this.ModuleBanner.forEach((e, i) => {
										if(e.content[0] != undefined) {
											e.contentImgUrl = e.content[0].contentImgUrl
											e.contentOperationType = e.content[0].contentOperationType
											// 1：链接 2：类目 3：主题编号  6：搜索词
											if(e.content[0].contentOperationType == 1) {
												e.contentLinkUrl = e.content[0].contentLinkAddress

											}
											if(e.content[0].contentOperationType == 3) {
												e.contentLinkUrl = 'theme_detail?id=' + e.content[0].contentExternalId + '&theme_list=1'
											}
											if(e.content[0].contentOperationType == 6) {
												// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
												e.contentLinkUrl = 'fg_search?acd=231&name=' + e.content[0].searchWord + '&id=' + e.content[0].id + ''
											}
											if(e.content[0].contentOperationType == 2) {
												e.contentLinkUrl = 'classifySecond?categoryId=' + e.content[0].contentExternalId + ''
											}
											if(e.content[0].contentOperationType == 5) {
												e.contentLinkUrl = 'good_detail?commodityId=' + e.content[0].contentCommodityId + ''
											}
										}

									})

								}
								if(response.body[i].moduleId == '1515554373374291') {
									//限时秒杀
									this.ModuleLimit = response.body[i]
									if(this.ModuleLimit.list.length > 0) {
										if(this.ModuleLimit.list[0].countdown == 0) {
											this.getModule()
										}
									}
								}
								if(response.body[i].moduleId == '1523442025864961') {
									//三图模块
									this.ModuleAdv = response.body[i].content;
									this.ModuleAdv.forEach((e, i) => {
										// 1：链接 2：类目 3：主题编号  6：搜索词
										if(e.contentOperationType == 1) {
											e.contentLinkUrl = e.contentLinkAddress
										}
										if(e.contentOperationType == 3) {
											e.contentLinkUrl = 'theme_detail?id=' + e.contentExternalId + '&theme_list=1'
										}
										if(e.contentOperationType == 6) {
											// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
											//  e.contentLinkUrl = 'fg_search?acd=231&name='+e.searchWord+''
											e.contentLinkUrl = 'fg_search?acd=231&name=' + e.searchWord + '&id=' + e.id + ''
										}
										if(e.contentOperationType == 2) {
											e.contentLinkUrl = 'classifySecond?categoryId=' + e.contentExternalId + ''
										}
										if(e.contentOperationType == 5) {
											e.contentLinkUrl = 'good_detail?commodityId=' + e.contentCommodityId + ''
										}
									})
									this.ModuleAdv.disabled = response.body[i].disabled
									this.ModuleAdv.titleContent = response.body[i].title.titleContent
								}

								if(response.body[i].moduleId == '1515554853389355') {
									//单品推荐
									this.ModuleHDP = response.body[i].content;
									this.ModuleHDP.forEach((e, i) => {
										// 1：链接 2：类目 3：主题编号  6：搜索词
										if(e.contentOperationType == 1) {
											e.contentLinkUrl = e.contentLinkAddress
										}
										if(e.contentOperationType == 3) {
											e.contentLinkUrl = 'theme_detail?id=' + e.contentExternalId + '&theme_list=1'
										}
										if(e.contentOperationType == 6) {
											// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
											//  e.contentLinkUrl = 'fg_search?acd=231&name='+e.searchWord+''
											e.contentLinkUrl = 'fg_search?acd=231&name=' + e.searchWord + '&id=' + e.id + ''
										}
										if(e.contentOperationType == 2) {
											e.contentLinkUrl = 'classifySecond?categoryId=' + e.contentExternalId + ''
										}
										if(e.contentOperationType == 5) {
											e.contentLinkUrl = 'good_detail?commodityId=' + e.contentCommodityId + ''
										}
									})
									this.ModuleHDP.disabled = response.body[i].disabled
									this.ModuleHDP.titleContent = response.body[i].title.titleContent
								}
								if(response.body[i].moduleId == '1515568051978959') {
									//滑屏
									// 1：链接 2：类目 3：主题编号  6：搜索词
									this.ModuleSwiper = this.ModuleSwiper.concat(response.body[i])

									this.ModuleSwiper.forEach((e, i) => {

										if(e.content.length > 0) {
											if(e.content[0].contentOperationType == 1) {
												e.contentLinkUrl = e.content[0].contentLinkAddress
											}
											if(e.content[0].contentOperationType == 3) {
												e.contentLinkUrl = 'theme_detail?id=' + e.content[0].contentExternalId + '&theme_list=1'
											}
											if(e.content[0].contentOperationType == 6) {
												// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
												e.contentLinkUrl = 'fg_search?acd=231&name=' + e.content[0].searchWord + '&id=' + e.content[0].id + ''
											}
											if(e.content[0].contentOperationType == 2) {
												e.contentLinkUrl = 'classifySecond?categoryId=' + e.content[0].contentExternalId + ''
											}
											e.contentImgUrl = e.content[0].contentImgUrl

										}
									})
								}
								if(response.body[i].moduleId == '1515568082009337') {
									//楼层  // 1：链接 2：类目 3：主题编号  6：搜索词
									this.ModuleZC.push(response.body[i])
									// console.log(this.ModuleZC)
									this.ModuleZC.forEach((e, i) => {
										if(e.title.titleOperationType == 3) {
											e.title.titlelinkUrl = 'theme_detail?id=' + e.title.titleExternalId + '&theme_list=1'
										} else {
											e.title.titlelinkUrl = e.title.titleLinkAddress
										}
									})

								}
								if(response.body[i].moduleId == '1515567926400417') {
									//猜你喜欢
									this.ModuleZC1 = response.body[i]
								}

							}
							this.ModuleSwiper.forEach((e, i) => {
								e.list.splice(0, 1)
							})
						}

						let imgs = document.images
						let _this = this
						for(let i = 0; i < imgs.length; i++) {
							if(imgs[i].complete) {
								_this.loading = false
							} else {
								_this.loading = true
							}
						}

					})

			},
			// 获取单图模块数据
			getSingAdving() {
				let url = HOST_HDPMOBILEVIEW + '/moduleResources/getModuleContentListByModuleId?moduleId=1515568011520822';
				this.$resource(url).get().then((response) => {
					// console.log(response);
					if(response.body.code == 200) {
						this.banners = response.body.respBody
						// console.log(this.banners)
						this.banners.forEach((e, i) => {
							if(e.content[0] != undefined) {
								e.contentImgUrl = e.content[0].contentImgUrl
								e.contentOperationType = e.content[0].contentOperationType
								// 1：链接 2：类目 3：主题编号  6：搜索词
								if(e.content[0].contentOperationType == 1) {
									e.contentLinkUrl = e.content[0].contentLinkAddress

								}
								if(e.content[0].contentOperationType == 3) {
									e.contentLinkUrl = 'theme_detail?id=' + e.content[0].contentExternalId + '&theme_list=1'
								}
								if(e.content[0].contentOperationType == 6) {
									// http://mtest.haodanpin.com:8001/#/fg_search?acd=231
									e.contentLinkUrl = 'fg_search?acd=231&name=' + e.content[0].searchWord + '&id=' + e.content[0].id + ''
									// console.log(e.contentLinkUrl)
								}
								if(e.content[0].contentOperationType == 2) {
									e.contentLinkUrl = 'classifySecond?categoryId=' + e.content[0].contentExternalId + ''
								}
								if(e.content[0].contentOperationType == 5) {
									e.contentLinkUrl = 'good_detail?commodityId=' + e.content[0].contentCommodityId + ''
								}
							}

						})

					}
				})
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
			async wechatShare(){
				let _this = this
				if(_isWechat()){
					// 微信分享
					let res = await _this.getSignature()
					let title = '好单品商城  网库精选'
					let desc = '免费领取会员权益 享受特权VIP采购'
					let imgUrl = 'http://m.haodanpin.com/static/img/weChatShare.png'
					let link = 'http://m.haodanpin.com/'
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
				let title = '好单品商城  网库精选'
				let desc = '免费领取会员权益 享受特权VIP采购'
				let imgUrl = 'http://m.haodanpin.com/static/img/weChatShare.png'
				let link = 'http://m.haodanpin.com/'
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
		components: {
			FHeader,
			FSearch,
			FCarousel,
			FAdvise,
			FHdp,
			FBanner,
			FBanners,
			FThreeadv,
			FSp,
			BottomTab,
			FRecommend,
			QuickBar,
			FSwiper,
			FLimitTime
		}
	}
</script>
<style scoped>
	.loading {
		font-size: 2rem;
		color: #000;
	}
	
	.f-header1 {
		height: 4.4rem;
		width: 100%;
	}
	
	 ::-webkit-scrollbar-track {
		background-color: transparent;
	}
	
	 ::-webkit-scrollbar-thumb {
		background-color: transparent;
	}
	
	.foundIndex {
		background: #fff;
		position: relative;
		padding-bottom: 6rem;
	}
	
	.f-header-wrap,
	.f-search-wrap {
		padding-left: 10px;
		padding-right: 10px;
	}
	
	.sidebar {
		/*background: rgba(0, 0, 0, .3);*/
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
		overflow: hidden;
	}
	
	.zIindex {
		z-index: 100 !important;
	}
	
	.sidebar-inner {
		background: #fff;
		width: 12rem;
		height: 100%;
	}
	
	.addLv {
		width: 26rem !important;
	}
	
	.sidebar-header {
		height: 4.9rem;
		/*background: #333333;*/
	}
	
	.sidebar-header-icon {
		float: left;
		height: 3.2rem;
		width: 4rem;
		margin-top: 1.5rem;
	}
	
	.sidebar-header-text {
		color: #FABE2D;
		text-align: left;
		line-height: 4.9rem;
		font-size: 1.6rem;
		padding-left: 2rem;
	}
	
	.sidebar-l1 {
		width: 12rem;
	}
	
	.sidebar-l2 {
		width: 14rem;
		background: #fff;
	}
	
	#sidebarContent {
		height: 90%;
		background: #fff;
	}
	
	.sidebar-l1,
	.sidebar-l2 {
		float: left;
		height: 100%;
		overflow: auto;
	}
	
	.sidebar-l1 li {
		height: 4.4rem;
		line-height: 4.4rem;
		width: 12rem;
		border-bottom: 1px solid #D7D7D7;
		position: relative;
		font-size: 1.6rem;
		overflow: hidden;
	}
	
	.sidebar-l1 li:last-child,
	.sidebar-l2 li:last-child {
		border-bottom: none;
	}
	
	.sidebar-l2 li {
		height: 4.4rem;
		line-height: 4.4rem;
		width: 12rem;
		margin: 0 auto;
		border-bottom: 1px solid #adadad;
		font-size: 1.6rem;
		overflow: hidden;
	}
	
	.pointer {
		position: absolute;
		width: 1rem;
		height: 1rem;
		display: block;
		background: #D6D6D6;
		transform: rotate(45deg);
		top: 50%;
		right: -0.5rem;
		margin-top: -0.5rem;
	}
	
	.blank {
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		width: 600rem;
		z-index: -1;
	}
	
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .3s ease;
	}
	
	.slide-fade-enter,
	.slide-fade-leave-active {
		transform: translateX(-44rem);
	}
</style>