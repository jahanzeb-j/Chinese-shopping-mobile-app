<template>
	<div style="height:100%">
		<!-- 头部 -->
		<div class="order_all_img clearfix">
			<span>{{categoryName}}</span>
			<img @click="back()" class="returnLogo" src="../../assets/images/returnFront.png">
			<img @click="backHome" class="returnHome" src="../../assets/images/returnHome.png">
		</div>
		<!-- tab -->
		<div class="top-tab">
			<transition :duration="10000" appear>
				<div class="list-box" ref="tabList">
					<div class="list">
						<div class="list-item" :class="{active:activeIndex == index}" v-for="(item,index) in tabList" :key="index" @click="chooseTab(index,$event)">
							<span>{{item.categoryName}}</span>
						</div>
					</div>
				</div>
			</transition>
		</div>
		<!-- 商品列表 -->
		<!-- <div class="goods"> -->
		<div class="_goods-box" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="20">
			<div class="sp-inner" v-for="(item,index) in goodsList" :key="index">
				<router-link class="sp-img" :to="{path:'good_detail',
                    query:{
                            commodityId:item.commodityId,
                            categoryIndex:$route.query.categoryIndex,
                            categoryId:$route.query.categoryId,
                            activeIndex:$route.query.activeIndex
                        }
                    }">
					<div class="img-wrap">
						<!-- <div v-for="type1 in item.fullSingleActivity">
                            <div class="all_reduce" v-if="type1.saleType == 3">订单满{{type1.howYuan}}减{{type1.fullLessCash}}</div>
                            <div class="all_reduce" v-if="type1.saleType == 4">满{{ type1.howYuan}}打{{ type1.fullDiscount }}折</div>
                            <div class="all_reduce" v-if="type1.saleType == 5">满{{ type1.howPiece }}件减{{ type1.fullLessCash }}</div>
                            <div class="all_reduce" v-if="type1.saleType == 6">满{{ type1.howPiece }}件打{{ type1.fullDiscount }}</div>
                        </div> -->
						<img :src="item.pic" alt="">
					</div>
					<div class="mask mask1" v-if="item.fullReduction != null">{{ item.fullReduction }}</div>
					<div class="mask mask1" v-else-if="item.moneyOff != null">{{ item.moneyOff }}</div>
					<p class="item-text item-text1 mask"  v-else-if="item.subTitle != '' && item.subTitle != null">{{item.subTitle}}</p>
					<p class="item-text item-text1 mask" v-else>企业采购就在好单品</p>
					<p class="item-text">{{item.name}}</p>
					<div class="sale-msg">
						<span class="sale-price">¥<b>{{item.salesPrice}}</b></span>
						<span class="sales-num">已售{{item.salesNum}}件</span>
					</div>

				</router-link>
			</div>
		</div>
		<!-- </div> -->

		<div class="sp-bottom" v-show="!noResult">
			<img src="../../assets/images/end-3x.png" style="vertical-align: middle;height: 1.3rem">
		</div>
		<!-- 无数据情况 -->
		<div class="noResult" v-show="noResult">
			<div class="zw">暂无搜索结果,您可以发布采购，发布找货</div>
			<div class="fb" @click="toPurchase">发布采购</div>
		</div>
		<quick-bar></quick-bar>
	</div>
</template>
<script>
	import QuickBar from '../../component/QuickBar'
	import { api_get_no, _isLogin } from '../../util/api.js'
	export default {
		name: 'ClassifySecond',
		data() {
			return {
				categoryId: '',
				categoryIndex: '',
				categoryName: '',
				activeIndex: 0,
				categoryList: [],
				tabList: [],
				pages: 1,
				pageSize: 10,
				goodsList: [],
				noResult: false,
				loading: false,
				storeData: {},
			}
		},
		components: {
			QuickBar
		},
		mounted() {
			this.categoryId = this.$route.query.categoryId
			this.activeIndex = this.$route.query.activeIndex || 0
			this.categoryIndex = this.$route.query.categoryIndex || 0
			this.getCategoryList()
			this.searchCommodityList()
			this.tabMove()
		},
		methods: {
			back() {
				let categoryIndex = this.$route.query.categoryIndex
				if(categoryIndex != undefined) {
					this.$router.push({
						path: "classifyIndex"
					})
				} else {
					this.$router.go(-1)
				}

			},
			backHome() {
				this.$router.push({
					path: 'found_index'
				})
			},
			// 获取类目
			getCategoryList() {
				api_get_no({
					url: HOST_HDPCOMMODITY + '/commodityFront/getCategoryList',
				}).then(res => {
					this.categoryList = res
					this.categoryName = this.categoryList[this.categoryIndex].categoryName
					this.tabList = this.categoryList[this.categoryIndex].childlist
				})
			},
			// 获取列表
			searchCommodityList() {
				// this.pages = num || this.pages
				api_get_no({
					url: HOST_HDPCOMMODITY + '/commodityFront/searchCommodityListPC',
					data: {
						categoryId: this.categoryId,
						currNum: this.pages,
						pageSize: this.pageSize,
						type: 1,
					},
				}).then(res => {
					if(res.code == 200) {
						let temp = res.respBody.list
						console.log(temp)
						temp.forEach(e => {
							e.pic = e.pic.split(',')[0]
							e.name = e.name.length > 22 ? e.name.slice(0, 22) : e.name
//							if(e.promotionPrice) {
//								e.salesPrice = e.promotionPrice.split('-')[0]
//							} else {
//								e.salesPrice = e.salesPrice.split('-')[0]
//							}
						})
						if(this.pages === 1) {
							this.goodsList = temp
						} else {
							let temp2 = this.goodsList.concat(temp);
							console.log(temp2.length)
							this.goodsList = temp2														
						}
						// 缓存ajax的结果
						this.storeData[this.categoryId] = this.goodsList
						// 不再进行滚动加载
						this.loading = temp.length < 10
						this.noResult = this.goodsList.length === 0
					}
				})
			},
			// 选择类目
			chooseTab(index, event) {
				this.activeIndex = index
				this.tabMove(event.x)
				this.categoryId = this.tabList[index].id
				// url更改
				this.$router.replace({
					path: 'ClassifySecond',
					query: {
						categoryIndex: this.categoryIndex,
						categoryId: this.categoryId,
						activeIndex: this.activeIndex
					}
				})
				// 数据初始化
				this.pages = 1
				this.loading = false
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
				// 如果缓存了数据直接读缓存不再发ajax
				if(this.storeData[this.categoryId]) {
					this.goodsList = this.storeData[this.categoryId]
					this.loading = this.goodsList.length < 10
					this.noResult = this.goodsList.length === 0
				} else {
					this.searchCommodityList()
				}
			},
			// tab栏滑动
			tabMove(x) {
				this.$nextTick(() => {
					// 如果有传入的值，是点击操作，如果没有是从上一个页面跳转过来的
					if(x) {
						let width = document.body.clientWidth || 750
						this.$refs.tabList.scrollLeft += (x - width / 2)
					} else {
						// 前三个tab不需要移动位置
						if(this.activeIndex > 2) {
							setTimeout(() => {
								let length = this.tabList.length
								let scrollWidth = this.$refs.tabList.scrollWidth
								this.$refs.tabList.scrollLeft = (this.activeIndex - 2) * scrollWidth / length
							}, 300);
						}

					}
				})
			},
			// 去采购
			async toPurchase() {
				let {
					loginStatus
				} = await _isLogin()
				if(loginStatus) {
					this.$router.push({
						path: 'publish_purchase',
						query: {
							releaseBack: '003'
						}
					})
				} else {
					this.$router.push({
						path: 'login',
						query: {
							loginBack: '001'
						}
					})
				}
			},
			// 滚动加载更多
			loadMore() {
				if(!this.loading) {
					this.pages += 1
					if(this.pages === 2){
						this.searchCommodityList()
//						return;
					}
					
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	html {
		font-family: PingFang SC, Microsoft JhengHei;
	}
	/* 头部 */
	
	.order_all_img {
		position: fixed;
		top: 0;
		z-index: 1111;
		background: #fff;
		width: 100%;
		display: block;
		color: #252525;
		font-size: 1.8rem;
		height: 4.4rem;
		line-height: 4.4rem;
		border-bottom: 1px solid #d6d6d6;
		.returnLogo {
			width: 1.2rem;
			height: 2rem;
			margin-top: 1rem;
			position: absolute;
			left: 1.2rem;
		}
		.returnHome {
			width: 1.7rem;
			height: 1.75rem;
			position: absolute;
			right: 0.8rem;
			top: 1.1rem;
		}
	}
	/* tab栏 */
	
	.top-tab {
		position: fixed;
		z-index: 20;
		top: 4rem;
		// margin-top:4rem;
		width: 100%;
		height: 3.6rem;
		overflow: hidden;
		border-bottom: 1px solid #d6d6d6;
		background-color: #fff;
		.list-box {
			// width:100%;
			margin-right: 1rem;
			overflow-x: scroll;
			// transition: all 1s;
			.list {
				// overflow-x: auto;
				width: max-content;
				// padding-right:6rem;
				.list-item {
					float: left;
					line-height: 3.5rem;
					margin: 0 1.7rem 0 1.7rem;
					padding: 0 0.3rem;
					box-sizing: border-box;
					font-size: 1.4rem;
				}
				.list-item:last-child {
					margin-right: 6rem;
				}
				.active {
					border-bottom: 0.2rem solid #eb544d;
					span {
						color: #eb544d;
					}
				}
			}
		}
	}
	
	// 商品列表
	.goods {
		height: 100%;
		// overflow: hidden;
		position: relative;
	}
	
	._goods-box {
		// margin-top:7.8rem;
		// position: absolute;
		padding: 8.8rem 0.75rem 0 0.75rem;
		width: 100%;
		overflow: hidden;
	}
	
	.sp-inner {
		width: 50%;
		/*height: 25rem;*/
		box-sizing: border-box;
		overflow: hidden;
		// border-bottom: 1px solid #E3E3E3;
		float: left;
		padding: 0 0.75rem;
		margin-bottom: 2rem;
	}
	
	//   .sp-inner .sp-img:first-child, .sp-inner .sp-img:last-child {
	//     width: 100%;
	//     float: left;
	//     box-sizing: border-box;
	//   }
	.sp-inner:last-child .sp-img:first-child,
	.sp-inner:last-child .sp-img:last-child {
		margin-bottom: 3rem;
	}
	
	.item-text {
		width: 100%;
	    text-align: left;
	    color: #333;
	    line-height: 2.5rem;
	    overflow: hidden;
	    /* margin-top: 0.9rem; */
	    margin-bottom: 0.6rem;
	    font-size: 1.3rem;
	    padding: 0 0.5rem;
	    height: 2rem;
	}
	
	.item-text1 {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		background:rgba(241,236,226,1);
		border-radius: 0.15rem ; 
		margin-top: 0;
	}
	.item-text11{
		background: #F7E2E3;
	}
	.sp-img {
		color: #989898;
	}
	
	.sale-msg {
		text-align: left;
		padding: 0 0.5rem;
		.sale-price {
			font-size: 1rem;
			color:#EB544D;
			font-family:PingFangSC-Light;
			b {
				font-size: 1.3rem;
				font-weight: 500;
				color: #cc141c;
			}
		}
		.sales-num {
			font-size: 0.9rem;
			padding-left: 0.7rem;
			color: #858585;
		}
	}
	
	//   .sp-img span {
	//     font-size: 1rem;
	//   }
	.sp-img .sub-title {
		font-size: 1rem;
		font-weight: normal;
		color: #8F8F8F;
		/*height: 1.5rem;*/
		/*line-height: 1.5rem;*/
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}
	
	.img-wrap {
		width: 100%;
		height: 17.2rem;
		border-radius: 0.5rem;
		// height: 100%;
		// padding: 1rem;
		position: relative;
		background-color: #f4f4f4;
	}
	
	.all_reduce {
		position: absolute;
		bottom: 1rem;
		left: 1.8rem;
		width: 13rem;
		text-align: center;
		height: 2rem;
		line-height: 2rem;
		background: #ed84c7;
		color: #fff;
	}
	
	.sp-img img {
		// width: 100%;
		width: 16.5rem;
		height: 17.2rem;
		/*border-radius: 0.5rem;*/
	}
	
	//   无数据
	.zw {
		margin-top: 7rem;
		font-size: 1.44rem;
		color: #b7b6b6;
	}
	
	.fb {
		border: 1px solid #e8ca3d;
		padding: 1.6rem 2.4rem;
		display: inline-block;
		margin-top: 8rem;
		font-size: 2rem;
		border-radius: .5rem;
		color: #e8ca3d;
	}
	
	.sp-bottom {
		height: 4.5rem;
		line-height: 4.4rem;
		font-size: 1.3rem;
		color: #5A5A5A;
		background-color: #f4f4f4;
		float: left;
		width: 100%;
	}
</style>