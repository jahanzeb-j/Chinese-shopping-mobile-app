<template>
	<div>
		<div class="f-swiper" v-for="(item ,index ) in swiperData" :key="index" v-show="item.disabled == 1 && item.list.length > 0">
			<!--品牌特惠-->
			<div class="recommended hdp_goods">
				<div class="preferential_icon" @click="jumpUrl(item.contentLinkUrl,item.contentOperationType)">
					<img :src="item.contentImgUrl">
				</div>
				<div id="wrapper1">
					<div id="scroller1">
						<ul class="ul2">
							<li v-for="(item2, index2) in item.list" :key="index2" @click="jumpGoodsUrl(item2.contentLinkAddress,item2.commodityId)">
								<div class="goods_icon">
									<img :src="item2.pic" class="recommendedPic" alt="">
								</div>
								<div class="goods_text">
									{{item2.name}}
								</div>
								<div class="goods_m">
									<span class="span1" v-if="item2.promotionPrice != null  "><span>¥<b>{{item2.promotionPrice}}</b></span></span>
									<span class="span1" v-if="item2.promotionPrice == null  "><span>¥<b>{{item2.salePrice}}</b></span></span>
									<span class="span2" v-if='item2.salePrice != null && item2.promotionPrice !=null'><span>¥<b>{{item2.salePrice}}</b></span></span>
									<!-- <span class="span1">¥126.00</span>
                  <span class="span2">320</span> -->
								</div>
							</li>

						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="border"></div>
	</div>

</template>
<script>
	export default {
		name: 'FSwiper',
		props: {
			data: {},
		},
		data() {
			return {
				swiperData: [],
			}
		},
		watch: {
			data: function(newVal, oldVal) {
				this.swiperData = newVal
				// console.log(this.swiperData)

			}
		},
		methods: {
			jumpUrl(url, type) {
				// console.log(url, type);
				return;
				if(url != '无跳转' && url != '') {
					if(type == 1) {
						//链接类型
						if(window.Android) {
							window.Android.intent(url)

						} else {
							window.location.href = url
						}
					} else {
						if(window.Android) {
							window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url)

						} else {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url
						}
					}
				}

			},
			jumpGoodsUrl(url, id) {
				if(window.Android) {
					window.Android.intent(url)

				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + id + '&found_index=1'
				}
			}

		}
	}
</script>
<style scoped>
	.border {
		width: 37.45rem;
		height: 1rem;
		background: rgba(244, 244, 244, 1);
	}
	
	.coupon {
		width: 100%;
		margin: 0 1rem;
		height: 6rem;
	}
	
	.coupon img {
		height: 100%;
	}
	/*品牌特惠*/
	
	.preferential {
		height: 27.4rem;
	}
	
	.preferential_icon {
		width: 37.5rem;
		height: 15rem;
	}
	
	.preferential_icon img {
		width: 100%;
		height: 100%
	}
	
	.hdp_goods {
		width: 37.45rem;
		height: 16.35rem;
		/*margin-top:2rem;*/
		overflow: hidden;
	}
	
	.hdp_goods ul {
		height: 100%;
		flex-direction: row;
	}
	
	.hdp_goods li {
		height: 100%;
		float: left;
		text-align: left;
	}
	
	.hdp_goods .goods_icon {
		width: 12.5rem;
		height: 12.5rem;
		line-height: 9rem;
		border-radius: 0.5rem;
		margin-left: 1rem;
		margin-top: 1rem;
	}
	
	.hdp_goods .goods_icon img {
		width: 100%;
		height: 100%;
		background: #f4f4f4;
		border-radius: 0.25rem;
	}
	
	.hdp_goods .goods_text {
		width: 12rem;
		height: 3.1rem;
		line-height: 1.5rem;
		font-size: 1.2rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		/* overflow: hidden; */
		margin-top: 0.7rem;
		margin-left: 0.8rem;
		margin-bottom: 0.6rem;
		text-align: left;
		overflow: hidden;
		/*text-overflow:ellipsis;
  white-space: nowrap; */
	}
	
	.hdp_goods .goods_m {
		margin-bottom: 2.35rem;
		margin-left: 2rem;
	}
	
	.hdp_goods .goods_m .span1 {
		display: inline-block;
		/*width:4.75rem;*/
		height: 1rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Regular;
		color: #ED0000;
		/*letter-spacing:-1px;*/
		margin-left: -1.2rem;
	}
	
	.hdp_goods .goods_m .span2 {
		display: inline-block;
		margin-left: 0.5rem;
		height: 1rem;
		font-size: 1.3rem;
		font-family: PingFangSC-Regular;
		color: rgba(235, 84, 77, 1);
		/*width:1.9rem;*/
		border: none;
		height: 0.8rem;
		/* font-size:1rem;
  font-family:PingFangSC-Light;
  color:rgba(179,179,179,1); */
		margin-left: 0.25rem;
	}
	
	.border {
		height: 1rem;
		background: rgba(244, 244, 244, 1);
	}
	
	.recommended {
		width: 100%;
		height: 35.9rem;
		background-color: #ffffff;
		overflow: hidden;
	}
	
	#wrapper1 {
		width: 100%;
		height: 21.9rem;
		background: #fff;
		position: relative;
		z-index: 1;
		top: 0;
		left: 0;
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
	}
	
	#scroller1 {
		width: auto;
		/* height: 19.1rem; */
		position: absolute;
		z-index: 11;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
		-ms-text-size-adjust: none;
		-o-text-size-adjust: none;
		text-size-adjust: none;
	}
	
	#scroller1 ul {
		/* height: 19.1rem; */
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-around;
		-webkit-justify-content: space-around;
	}
	
	#scroller1 ul li {
		display: block;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
	}
	
	#scroller1 ul li img {
		width: 100%;
		height: 100%;
		left: 0;
	}
	
	 ::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>