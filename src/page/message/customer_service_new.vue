<template>
	<div class="customer_service">
		<div class="header-box">
			<div class="header-left" @click="toMessageIndex">
				<img src="../../assets/images/message/black-icon@2x.png">
			</div>
			<div class="header-title">好单品客服</div>
		</div>
		<img src="../../assets/images/message/Group@2x.png" alt=""  class="barcode"/>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toMessageIndex: function() {
				if(this.$route.query.commodityId) {
					window.history.go(-1)
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex';
				}

			},
		}
	}
</script>

<style scoped="scoped">
	.customer_service {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #f4f4f4;
	}
	
	.header-box {
		width: 100%;
		height: 4.4rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		background: #fff;
		border-bottom: 1px solid #d3d3d3;
	}
	
	.header-left {
		width: 4.4rem;
		height: 4.4rem;
		position: relative;
	}
	
	.header-left img {
		width: 1.95rem;
		height: 2.1rem;
		position: absolute;
		top: 1.08rem;
		left: 1.45rem;
	}
	
	.header-title {
		width: calc(100% - 8.8rem);
		font-size: 1.7rem;
		font-family: PingFangSC-Regular;
		line-height: 4.4rem;
		color: #333;
		text-align: center;
		position: absolute;
		top: 0;
		left: 4.4rem;
	}
	.barcode{
		width: 100%;
		height: 100%;
	}
</style>