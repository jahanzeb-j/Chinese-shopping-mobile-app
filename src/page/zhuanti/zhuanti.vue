<template>
	<div class="body_cont">
		<template v-if="this.micromessenger== 0">
			<div class="zhuantiTop">
				<img @click="backReturn()" src="../../assets/images/goback.png" class="first" alt="" />
				<span>6.18企业会员福利日</span>
			</div>
		</template>
		<div class="zhuanti_top">
			<img src="../../assets/images/ZT618/top@2x.png" alt="" />
		</div>
		<ul class="img_top">
			<li>
				<a href="#yuangong"><img src="../../assets/images/ZT618/link1.png" alt="" /></a>
			</li>
			<li>
				<a href="#liping"><img src="../../assets/images/ZT618/link2.png" alt="" /></a>
			</li>
			<li>
				<a href="#jieri"><img src="../../assets/images/ZT618/link3.png" alt="" /></a>
			</li>
		</ul>
		
		<!--企业会员专享-->
		<div class="zhuan_one" id="qiye">
			<div class="zhuan_img">
				<img src="../../assets/images/ZT618/1.png" alt="" />
			</div>
			<ul class="zhuanti_cont">
				<li v-for="item in JRFL_618" @click="jumpUrl(item.commodityId)">
					<img :src="item.pcPic" alt="" />
					<p class="font1">{{ item.name }}</p>
					<p class="font2">
						<span>¥{{ item.hdpPromotionPrice }}</span>
						<span>查看会员价</span>
					</p>
				</li>
			</ul>
		</div>
		<!--员工关怀-->
		<div class="zhuan_one" id="yuangong">
			<div class="zhuan_img">
				<img src="../../assets/images/ZT618/2.png" alt="" />
			</div>
			<ul class="zhuanti_cont">
				<li v-for="item in QYHYZXJ_618" @click="jumpUrl(item.commodityId)">
					<img :src="item.pcPic" alt="" />
					<p class="font1">{{ item.name }}</p>
					<p class="font2">
						<span>¥{{ item.hdpPromotionPrice }}</span>
						<span>查看会员价</span>
					</p>
				</li>
			</ul>
		</div>
		<!--企业礼品-->
		<div class="zhuan_one" id="liping">
			<div class="zhuan_img">
				<img src="../../assets/images/ZT618/3.png" alt="" />
			</div>
			<ul class="zhuanti_cont">
				<li v-for="item in QYLP_618" @click="jumpUrl(item.commodityId)">
					<img :src="item.pcPic" alt="" />
					<p class="font1">{{ item.name }}</p>
					<p class="font2">
						<span>¥{{ item.hdpPromotionPrice }}</span>
						<span>查看会员价</span>
					</p>
				</li>
			</ul>
		</div>
		<!--节日福利-->
		<div class="zhuan_one" id="jieri">
			<div class="zhuan_img">
				<img src="../../assets/images/ZT618/4.png" alt="" />
			</div>
			<ul class="zhuanti_cont">
				<li v-for="item in YGGH_618" @click="jumpUrl(item.commodityId)">
					<img :src="item.pcPic" alt="" />
					<p class="font1">{{ item.name }}</p>
					<p class="font2">
						<span>¥{{ item.hdpPromotionPrice }}</span>
						<span>查看会员价</span>
					</p>
				</li>
			</ul>
		</div>
		<div class="zhuanti_bottom">
			<img src="../../assets/images/ZT618/bottom.png" alt="" />
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
				JRFL_618: [],
				QYHYZXJ_618: [],
				QYLP_618: [],
				YGGH_618: [],
				micromessenger: 0 //0表示微信,1表示非非微信
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
			}
		},
		methods: {
			getData() {
				var url = HOST_HDPCOMMODITY + '/hdp/theme/getData';
				this.$resource(url).get().then((res) => {
					// console.log(res);
					if(res.body.code == 200) {
						this.goods = res.body.respBody;
						this.JRFL_618 = this.goods.JRFL_618;
						this.QYHYZXJ_618 = this.goods.QYHYZXJ_618;
						this.QYLP_618 = this.goods.QYLP_618;
						this.YGGH_618 = this.goods.YGGH_618;

						this.JRFL_618.forEach(function(e, i) {
							e.pcPic = e.pic.split(',')[0];
						});
						this.QYHYZXJ_618.forEach(function(e, i) {
							e.pcPic = e.pic.split(',')[0];
						});
						this.QYLP_618.forEach(function(e, i) {
							e.pcPic = e.pic.split(',')[0];
						});
						this.YGGH_618.forEach(function(e, i) {
							e.pcPic = e.pic.split(',')[0];
						});
					}
				})
			},
			jumpUrl(commodityId) {
				if(window.Android) {
					window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&zhuanti=180')
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId=" + commodityId + '&zhuanti=180'
				}
			},
			backReturn() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
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
	
	.img_top {
		position: absolute;
		top: 21rem;
	}
	
	.img_top li {
		float: left;
		width: 11rem;
		height: 6rem;
		margin-left: 1rem;
	}
	
	.img_top li a img {
		width: 100%;
	}
	
	.body_cont {
		background: #5620ec;
		width: 100%;
		overflow: hidden;
	}
	
	.zhuan_img {
		width: 27rem;
		height: 4rem;
		position: relative;
		left: 6rem;
		overflow: hidden;
		margin-bottom: 3rem;
		bottom: -1rem;
	}
	
	.zhuan_img img {
		width: 100%;
	}
	
	.zhuan_one {
		margin-bottom: 2rem;
	}
	
	.zhuan_one .zhuanti_cont li {
		float: left;
		width: 17rem;
		height: 19rem;
		margin-left: 1.1rem;
		position: relative;
		background: #fff;
		margin-bottom: 1rem;
	}
	
	.zhuan_one .zhuanti_cont li img {
		width: 100%;
		height: 14rem;
	}
	
	.zhuan_one .zhuanti_cont li .font1,
	.font2 {
		position: absolute;
		text-align: left;
		margin-left: 2rem;
		color: #2D2A2A;
		width: 13rem;
	}
	
	.font1 {
		bottom: 3rem;
		font-size: 1.1rem;
		height: 1.3rem;
		line-height: 1.3rem;
		font-family: MicrosoftYaHei;
		overflow: hidden;
	}
	
	.font2 {
		bottom: -0.5rem;
	}
	
	.font2 span:first-child {
		color: #FF0000;
		font-size: 1.4rem;
		font-family: Impact;
		font-weight: Regular;
	}
	
	.font2 span:last-child {
		display: inline-block;
		width: 5.55rem;
		height: 1.4rem;
		line-height: 1.4rem;
		background: rgba(255, 0, 0, 1);
		border-radius: 1rem;
		color: #fff;
		font-family: Adobe Heiti Std R;
		margin-left: 1.5rem;
		text-align: center;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}
	
	.zhuanti_bottom {
		width: 100%;
		height: 22rem;
		padding-top: 1rem;
		overflow: hidden;
	}
	
	.zhuanti_bottom img {
		width: 100%;
	}
</style>