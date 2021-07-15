<template>
	<div class="shopping">
		<div class="shopping-img">
			购物车<span>({{ newGoodsNum }})</span>
			<img @click="back()" src="../../assets/images/returnFront.png">
			<div class="phone_change1-line"></div>
		</div>
		
		<div v-if="this.isShow == 3">
			<div class="shopping_mon_dianbei"></div>
			<div class="shopping-line"></div>
			<section class="list">
				<ul class="list-ul">
					<li v-for="(checkb,index) in checkboxData" class="list-li" ref="xiaozhu" @touchstart="recordStart($event,index)" @click="deleteBack(index)" @touchmove="recordMove($event,index)" @touchend="recordEnd(index)" :key="index" v-if="checkb.isValid">
						<div class="register-protocol">
							<input v-if="checkb.isValid" type="checkbox" class="shopCh" name="Sex" :value="checkb.id" v-model='checkboxModel' />
							<div class="option" v-if="checkb.isValid" @click.stop=""></div>
							<!--<div class="failure-word" v-if="!checkb.isValid">失效</div>-->
						</div>
						<div class="con1" @click='ceshi($event,index)'>
						</div>
						<div class="con clearfix">
							<div class="shopping_pro"><img :src="checkb.imagePath"></div>
							<div class="shopping_word">
								<div class="shopping_word1"><span v-show="checkb.respBody" class="limitedTxt">秒杀</span>{{checkb.goodsName}}</div>
								<!--新功能中展示特价或者秒杀活动-->
								<!--<div class="shopping_word1"><span v-if="checkb.isPromotion == 1"  class="limitedTxt">秒杀</span>{{checkb.goodsName}}</div>
								<div class="shopping_word1">	<span v-if="checkb.isPromotion == 0" class="limitedTxt limitedTxt11"></span>{{checkb.goodsName}}</div>-->
								<div class="shopping_word2">{{checkb.goodsSpec}}</div>
								<!--<div class="shopping_word2" v-if="!checkb.goodsSpec"></div>-->
								<!-- <div class="shopping_word4" v-show="((checkb.purchaseQuanity >0 && cue === index  && checkb.purchaseQuanity<=(checkb.goodsNum)) ||( checkb.purchaseQuanity > 0  && goNext))">{{"该商品只可以购买"+checkb.purchaseQuanity}}{{checkb.unit}}</div> -->
								<div class="shopping_word4" v-show="( checkb.purchaseQuanity > 0 && checkb.purchaseQuanity<(checkb.goodsNum) && cue == index )">{{"限购"+checkb.purchaseQuanity}}{{checkb.unit}}</div>
								<div class="shopping_word4" v-show="( checkb.purchaseQuanity > 0 && goNext && checkb.purchaseQuanity<(checkb.goodsNum) )">{{"限购"+checkb.purchaseQuanity}}{{checkb.unit}}</div>
								<div class="shopping_limited" v-show="checkb.isdisabled">活动期间已买过此商品</div>
								<!--<div class="shopping_word4" v-if="((checkb.respBody != -1 && cue === index && checkb.respBody<=checkb.goodsNum) ||(checkb.respBody != -1 && goNext) && checkb.respBody == 0)">活动商品已售完</div>-->
								<!--<div class="shopping_word4" v-if="!goNext || cue != index || judge"></div>-->
								<!--1  秒杀/单品促销商品-->
								<div class="cuxiao" v-if="checkb.isPromotion==1 || checkb.preferentialType == 0">
									<div class="shopping_word3"><span class="sale">¥{{checkb.promotionPrice}}</span></div>
									<div class="shopping_wordSale"><span class="sale">¥{{checkb.price}}</span></div>
								</div>
								<!--<div class="shopping_wordSale" v-if ="checkb.preferentialType == 1"><span class="sale">¥{{checkb.price}}</span></div>-->
								<!--2  普通身份登录展示会员价和售价-->
								<template v-else-if=" userType == 0">
									<div class="shopping_word21">
										<span class="sale" v-if="checkb.preferentialPrice == 0" style="margin-top: 2rem; color:#DA5E54;">¥{{checkb.price}}</span>
										<span v-if="checkb.preferentialPrice != 0">¥{{ checkb.preferentialPrice}}</span>
										<img v-if="checkb.preferentialPrice != 0" src="../../assets/images/VIP-small 拷贝@2x.png" alt="" />
									</div>
									<div class="shopping_word3 shopping_word33" v-if="checkb.preferentialPrice != 0">
										<span class="sale">¥{{checkb.price}}</span>
									</div>
								</template>
								<!--3  会员身份登录展示的会员和售价-->
								<template v-else=" userType == 1">
									<div class="shopping_word21" v-if=" checkb.preferentialPrice != 0">
										<span>¥{{checkb.price}}</span>
									</div>
									<div class="shopping_word3">
										<span class="sale" v-if="checkb.preferentialPrice != 0">¥{{ checkb.preferentialPrice}}</span>
										<img v-if="checkb.preferentialPrice != 0" src="../../assets/images/VIP-1@2x.png" alt="" />
										<span class="sale sale1" v-if="checkb.preferentialPrice == 0" style="margin-top: 2rem;">¥{{checkb.price}}</span>
									</div>
								</template>
							</div>
							<div class=" option_box clearfix" v-if="checkb.isValid">
								<div class="goumai" style="color: red;" v-if="checkb.leftNo !=null">还能买{{checkb.leftNo}}件</div>
								<span @click="reduce(index)" class="car_minus"></span>
								<input v-model="checkb.goodsNum" id="input1" @input="getNumber(checkb.goodsTotalNum,index)" @blur="getNumberBlur(checkb.goodsTotalNum,index)" type="number" class="input1 maa" />
								<span v-if=" checkb.purchaseQuanity < 0 " @click="add(checkb.goodsTotalNum,index)" class="car_add"></span>
								<span v-if="checkb.purchaseQuanity >=0  && checkb.purchaseQuanity>(checkb.goodsNum)" @click="add(checkb.goodsTotalNum,index)" class="car_add"></span>
								<span v-if="checkb.purchaseQuanity >=0  && checkb.purchaseQuanity<=(checkb.goodsNum)" @click="cue1(index)" class="car_add"></span>
							</div>
							<!-- <div v-if="!checkb.isValid" class="lose">失效</div> -->
						</div>
						<div class="btn01" @click="addCollection()">移至收藏夹</div>
						<div class="btn" @click="delete110(index)">删除</div>
					</li>
				</ul>
				<mt-popup v-model="dialogVisible" position="center">
					<div class="deldiv">
						<p class="deloff">确认删除该商品?</p>
						<p class="delok">
							<span class="clear" @click="cleardiv">取消</span>
							<span class="clear clear2" @click="delete11()">确定</span>
						</p>
					</div>
				</mt-popup>
				<!--失效-->
				<ul style=" width: 100%; height: 1rem; background: #F4F4F4;"></ul>
				<div v-if="noTradingNums!=0">
					<div class="list-ul2">
						<span>失效商品{{noTradingNums}}件</span>
						<span @click="clearshopping">清空失效商品</span>
					</div>
					<div class="xian"></div>
					<ul class="list-ul">
						<li v-for="(checkb,index) in checkboxData2" class="list-li" ref="xiaozhu" @touchstart="recordStart($event,index)" @click="delete112(index)" @touchmove="recordMove($event,index)" @touchend="recordEnd(index)" :key="index" v-if="!checkb.isValid">
							<div class="register-protocol">
								<div class="failure-word" v-if="!checkb.isValid">失效</div>
							</div>
							<div class="con1" @click='ceshi($event,index)'>
							</div>
							<div class="con clearfix">
								<div class="shopping_pro"><img :src="checkb.imagePath"></div>
								<div class="shopping_word">
									<div class="shopping_word1 shopping_word11">
										{{checkb.goodsName}}
									</div>
									<div class="shopping_word2">{{checkb.goodsSpec}}</div>
									<span class="sale sales-price">¥{{checkb.price}}</span>
								</div>
								<div class="option_box clearfix">
									<span @click="reduce(index)" class="car_minus"></span>
									<input v-model="checkb.goodsNum" id="input1" @input="getNumber(checkb.goodsTotalNum,index)" @blur="getNumberBlur(checkb.goodsTotalNum,index)" type="number" class="input1 maa" />
									<span v-if=" checkb.purchaseQuanity < 0 " class="car_add"></span>
									<span v-if="checkb.purchaseQuanity >=0  && checkb.purchaseQuanity>(checkb.goodsNum)" class="car_add"></span>
									<span v-if="checkb.purchaseQuanity >=0  && checkb.purchaseQuanity<=(checkb.goodsNum)" class="car_add"></span>
								</div>
							</div>
							<div class="btn" @click="delete112(index)">删除</div>
						</li>
					</ul>
				</div>
			</section>
			<!--<div class="no_more" v-show="moreList" @click="getList('more')">点击加载更多</div>-->
			<!--<div class="no_more" v-show="!moreList && this.checkboxData.length>2"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>-->
			<div class="shopping_mon_dianbei2"></div>
			<div class="shopping_mon spopping_all" v-if="isModFlag">
				<div class="register-protocol2">
					<!-- <input type="checkbox" v-model="checkedAll" name="Sex" value="male"  /> -->
					<div class="option" :class="{checked:checkedAll}" @click="checkedAllFun"></div>
				</div>
				<div class="shopping_quanxuan">全选</div>
				<div class="shopping_jieshuan" @click="constructPostData" v-if="checkboxModel != 0">结算</div>
				<div class="shopping_jieshuan shopping_jieshuan01" @click="constructPostData" v-if="checkboxModel == 0">结算</div>
				<span class="shopping_money">元</span>
				<!--<div class="shopping_money">合计：<span>1809.00</span></div>-->
				<div class="shopping_money">合计：<span>{{male}}</span></div>
				<!--<div class="shopping_jieshuan" >结算</div>-->
			</div>
			<div class="shopping_mon" v-if="!isModFlag">
				<div class="register-protocol2">
					<div class="option" :class="{checked:checkedAll}" @click="checkedAllFun"></div>
				</div>
				<div class="shopping_quanxuan">全选</div>
				<div class="shopping_jieshuan" @click="constructPostData">结算</div>
				<span class="shopping_money">元</span>
				<div class="shopping_money">合计：<span>{{male}}</span></div>
			</div>
		</div>
		<div class="shopping_null" v-if="this.isShow == 2">
			<img src="../../assets/images/购物车为空@2x.png">
			<div class="shopping_nullWord" v-if="this.isfontnull == true">空空如也，去添加点什么吧</div>
			<div class="shopping_nullWord" v-if="this.isfont == false">登录后同步购物车中商品</div>
			<div class="shopping_nullGo" v-if="this.isdenglu == false" @click="nullGo()">登录</div>
		</div>
		<div class="hint" v-if="hintName">
			<div>{{hintName}}</div>
			<div>已超过限购数量！</div>
		</div>
		<!--  新品上架   -->
		<div class="f-sp" v-if="this.isShow != 3">
			<div class="fresh">
				<div class="fresh_heading">
					<h3>新品上架</h3>
					<!--<i class="iconfont icon-gengduo"></i>-->
					<!--<span v-if="item.title.titleLinkAddress != ''">MORE >></span>-->
				</div>
				<div class="fresh_goods">
					<div class="goods fl" v-for="(item,index) in newList" :key='index' @click="enterRecommendedGoodDetail(item)">
						<div class="fresh_goods_icon">
							<img :src="item.pic" alt="">
							<!--<p>{{item.subTitle}}</p>-->
							<div class="mask mask1" v-if='item.fullReduction != null && item.fullReduction != ""'>{{item.fullReduction}}</div>
							<div class="mask mask1" v-else-if='item.moneyOff != null && item.moneyOff != ""'>{{item.moneyOff}}</div>
							<div class="mask" v-else-if="item.subName != null && item.subName != ''">{{item.subName}}</div>
							<div class="mask" v-else>企业采购就在好单品</div>
						</div>
						<div class="fresh_goods_text">
							{{item.name}}
						</div>
						<div class="fresh_goods_m" v-if="item.isPromotion != 1 ">
							<!--<span>¥<b>{{item.promotionPrice}}</b></span>-->
							<span>¥<b>{{item.salesPrice}}</b></span>
						</div>
						<div class="fresh_goods_m" v-else>
							<span>¥<b>{{item.promotionPrice}}</b></span>
							<span style="text-decoration: line-through; color: #747474;">¥<b>{{item.orderPrice}}</b></span>
						</div>
					</div>
				</div>
				<!--<div class="border"></div>-->
			</div>
		</div>
		<div class="appointment-alert" v-if="collectionAlert">
			<img src="../../assets/images/error.png" class="appointment-img" v-if="collectionImg">
			<img src="../../assets/images/adopt.png" class="appointment-img" v-if="!collectionImg">
			<div class="alert-words" v-if="collectionWords">取消收藏成功</div>
			<div class="alert-words" v-if="!collectionWords">收藏成功</div>
		</div>
	</div>
</template>
<style scoped>
	@import url('../../component/found_goods/good.css');
	.shopping{
		background: rgb(244, 244, 244);
	}
	.btn01{
		position: absolute;
		top: 0;
		right: -7rem;
		text-align: center;
		background: #FAB64B;
		color: #fff;
		width: 7rem;
		font-size: 1.4rem;
		height: 12.5rem;
		padding: 4rem 1rem;
    		line-height: 2.1rem;
	}
	.deldiv{
		width:27.05rem;
		height:13.5rem;
		background:rgba(255,255,255,1);
		border-radius:0.25rem;
	}
	.delok{
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		border-top:0.05rem solid rgba(226,226,226,1);
		font-size:1.6rem;
		font-family:PingFangSC-Light;
	}
	.deloff{
		width: 100%;
		height: 8.95rem;
		line-height: 8.95rem;
		font-size:1.6rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
	}
	
	.shopping_bottom {
		/*position: absolute;*/
		margin-bottom: 0;
		width: 100%;
		height: 5rem;
	}
	
	.guanggao {
		width: 100%;
		height: 10rem;
		line-height: 10rem;
		background: gainsboro;
	}
	/*新品上架*/
	
	.f-sp {
		/*border-top: 1px solid red;*/
		/*margin-top: 2rem;*/
		background: #fff;
	}
	.fresh{
		background: #fff;
	}
	.fresh_heading h3 {
		font-size: 1.6rem;
		font-family: PingFangSC-Regular;
		color: #333;
		/*float: left;*/
		/*margin-left:1rem;*/
	}
	
	.fresh_heading span {
		display: inline-block;
		float: right;
		font-size: 1.2rem;
		margin-right: 1rem;
		color: #DCBE86;
	}
	
	.fresh_goods {
		padding-bottom: 5rem;
	}
	
	.fresh_goods .fresh_goods_icon img {
		width: 17.2rem;
		height: 17.2rem;
		background: rgba(244, 244, 244, 1);
	}
	
	.fresh_goods .fresh_goods_m {
		color: #EB544D;
		font-family: PingFangSC-Light;
	}
	
	.hint div {
		height: 1.7rem;
		overflow: hidden;
	}
	
	.lose {
		min-width: 3.8rem;
		height: 1.7rem;
		text-align: center;
		line-height: 1.7rem;
		background: #acacac;
		color: #fff;
		float: right;
		border-radius: 0.2rem;
		margin-bottom: 0.5rem;
	}
	
	.hint {
		font-size: 1.5rem;
		line-height: 1.7rem;
		background: #000;
		opacity: 0.5;
		color: #fff;
		border-radius: 1rem;
		width: 80%;
		height: 8rem;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -4rem;
		margin-left: -40%;
		z-index: 22;
		overflow: auto;
		padding: 2rem 4.7rem;
	}
	
	.no_more {
		width: 100%;
		height: 3.6rem;
		line-height: 3.6rem;
		/*background:#f4f4f4;*/
		font-size: 1.2rem;
		color: #555555;
		letter-spacing: 2px;
	}
	
	.shopping_null {
		/*height: 100%;*/
		background: #f4f4f4;
		height: 30.2rem;
		background: rgba(244, 244, 244, 1);
	}
	
	.shopping_nullGo {
		border: 1px solid #f9be00;
		color: #333333;
		font-size: 1.5rem;
		width: 10rem;
		height: 3rem;
		line-height: 3rem;
		margin-top: 2rem;
		/*margin-left: 35%;*/
		/*margin-right: 10rem;*/
		background: rgba(255, 216, 90, 1);
		border-radius: 4.25rem;
		margin: 1rem auto;
	}
	
	.shopping_null img {
		margin-top: 8.5rem;
	}
	
	.shopping_nullWord {
		color: #999;
		font-size: 1.5rem;
		margin-top: 2.1rem;
		margin-bottom: 4.1rem;
	}
	
	.con1 {
		width: 92%;
		height: 11.5rem;
		float: left;
		background: red;
		position: absolute;
		opacity: 0;
	}
	/*滑动   */
	
	.list-ul {
		overflow: hidden
	}
	
	.list {
		/*border-bottom: 1px solid #fcfcfc;*/
	}
	
	.list-ul2 {
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		background: #FFFFFF;
		text-align: left;
		overflow: hidden;
	}
	
	.xian {
		width: 36.3rem;
		height: 0.05rem;
		background: rgba(226, 226, 226, 1);
		margin-left: 1.2rem;
	}
	
	.list-ul2 span:first-child {
		/*width:7.85rem;*/
		height: 1.3rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(51, 51, 51, 1);
		line-height: 4.4rem;
		margin-left: 1.2rem;
		float: left;
	}
	
	.list-ul2 span:last-child {
		/*width:8.3rem;*/
		height: 1.3rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(235, 84, 77, 1);
		line-height: 4.4rem;
		float: right;
		margin-right: 0.8rem;
	}
	
	.list-li {
		/*line-height: 12.5rem;*/
		border-bottom: 1px solid #d6d6d6;
		position: relative;
		padding: 0 1.2rem;
		color: #666;
		background: #f2f2f2;
		-webkit-transform: translateX(0rem);
		background: #fff;
		/*-webkit-transition-property: all;*/
		/*-webkit-transition-duration: 0.5s;*/
		/*-webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);*/
		padding-top: 1rem;
		padding-left: 2rem;
	}
	
	.btn {
		position: absolute;
		top: 0;
		right: -14rem;
		text-align: center;
		background: #EB544D;
		color: #fff;
		width: 7rem;
		font-size: 1.4rem;
		height: 12.5rem;
		line-height: 12.5rem;
	}
	
	.con {
		/*width: 11.5rem;*/
		height: 11.5rem;
	}
	
	.shopping_pro {
		width: 10.5rem;
		height: 10.5rem;
		/*background: url("../../assets/images/car.png") no-repeat center center;*/
		background-size: 100%;
		float: left;
		margin-left: 1.5rem;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.shopping_pro img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		vertical-align: middle;
		background: #f4f4f4;
	}
	
	.shopping_word {
		display: inline-block;
		width: 13.5rem;
		float: left;
		text-align: left;
		margin-left: 1.5rem;
	}
	
	.shopping_word1 {
		color: #333333;
		font-size: 1.3rem;
		margin-top: .2rem;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 1.5rem;
		height: 3rem;
		width: 140%;
		font-family: PingFangSC-Light;
		font-weight: Light;
	}
	
	.shopping_word11 {
		color: #ADADAD;
	}
	
	.shopping_word1 .limitedTxt {
		color: #fff;
		font-weight: bold;
		display: inline-block;
		background: #EB544D;
		border-radius: 0.2rem;
		font-size: 1rem;
		padding: 0 0.2rem;
	}
	
	.shopping_word2 {
		width: 11rem;
		color: #a2a2a2;
		font-size: 1.2rem;
		height: 1.2rem;
		margin-top: 0.6rem;
		margin-bottom: 1.66rem;
		overflow: hidden;
	}
	
	.shopping_limited {
		color: #cc141c;
		font-size: 1.2rem;
		height: 1.4rem;
	}
	
	.shopping_word4 {
		color: #cc141c;
		font-size: 1.4rem;
		margin-top: 0.5rem;
		height: 1.4rem;
		position: absolute;
		top: 5.5rem;
	}
	
	.shopping_word3 .sale {
		padding-right: 0.3rem;
		color: #DA5E54;
		font-family: PingFang SC;
		font-size: 1.5rem;
		font-weight: Regular;
		margin-top: 0.4rem;
	}
	
	.shopping_word3 img {
		width: 2.4rem;
		height: 1.25rem;
		position: relative;
		/*top:-0.5rem;*/
	}
	
	.shopping_word3 .yuan {
		color: #cc141c;
		font-size: 1.2rem;
	}
	
	.shopping_word21 span {
		display: inline-block;
		margin-right: 0.5rem;
		color: #999999;
		font-size: 1.2rem;
	}
	
	.shopping_word21 img {
		width: 2rem;
		height: 1rem;
	}
	
	.shopping_word3 {
		float: left;
	}
	
	.cuxiao {
		/*width: 8.5rem;*/
		height: 2rem;
		/*background: red;*/
		margin-top: 2rem;
	}
	
	.shopping_wordSale .sale {
		color: #a2a2a2;
		font-size: 1.2rem;
		font-weight: Light;
		text-decoration: line-through;
	}
	
	.shopping_wordSale .yuan {
		color: #a2a2a2;
		font-size: 1rem;
	}
	
	.shopping_wordSale {
		float: left;
		color: #a2a2a2;
		font-size: 1.2rem;
		line-height: 1.6rem;
		margin-left: 0.5rem;
		margin-top: 0.8rem;
	}
	
	.option_box {
		display: inline-block;
		margin-top: 7.6rem;
		position: absolute;
		right: 1rem;
	}
	
	.option_box>span {
		border: 1px solid #ccc;
		width: 2.5rem;
		height: 2.5rem;
		text-align: center;
		line-height: 2.5rem;
		float: left;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
		background: #fff url("../../assets/images/shopping-cart_subtract.png") no-repeat center;
	}
	
	.option_box>span:first-of-type {
		border-top-left-radius: 0.2rem;
		border-bottom-left-radius: 0.2rem;
		font-size: 1.7rem;
		background: #fff url("../../assets/images/shopping-cart_subtract.png") no-repeat center;
	}
	
	.option_box>.car_add {
		border-top-right-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
		font-size: 1.7rem;
		background: #fff url("../../assets/images/add.png") no-repeat center;
		background-size: 56% 56%;
	}
	
	.option_box>input {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		width: 4.2rem;
		height: 2.5rem;
		text-align: center;
		line-height: 2.5rem;
		float: left;
		display: flex;
		display: -webkit-flex;
		font-size: 1.4rem;
	}
	/*滑动   */
	
	.shopping {
		width: 100%;
		height: 100%;
	}
	
	.shopping-img {
		position: fixed;
		top: 0;
		z-index: 1111;
		background: #fff;
		width: 100%;
		/*position:relative;*/
		display: block;
		color: #252525;
		font-size: 1.8rem;
		height: 4.4rem;
		line-height: 4.4rem;
		background: #fff;
		border-bottom: 1px solid #E2E2E2;
	}
	
	.shopping-img img {
		width: 1.2rem;
		height: 2rem;
		margin-top: 1rem;
		position: absolute;
		left: 1.2rem;
		/*margin-left: -28rem;*/
	}
	
	.shopping-line {
		height: 0.8rem;
		background: #f4f4f4;
		width: 100%;
		/*border-top: 1px solid #d8d8d8;*/
	}
	
	.shopping_mon {
		position: fixed;
		bottom: 5rem;
		left: 0;
		width: 100%;
		border-top: 1px solid #cecece;
		z-index: 33;
		background: #fff;
		display: block;
	}
	
	.shopping_mon1 {
		width: 100%;
		height: 4.9rem;
		padding: 0 0 0 4%;
		margin-bottom: 5rem;
	}
	
	.shopping_mon_dianbei {
		height: 4.4rem;
		width: 100%;
		background:rgba(244,244,244,1);
	}
	.shopping_mon_dianbei2{
		height: 5rem;
		width: 100%;
		background:rgba(244,244,244,1);
		padding-bottom: 3rem;
	}
	.shopping_money {
		height: 4.9rem;
		line-height: 4.9rem;
		color: #5c5c5c;
		font-size: 1.2rem;
		float: right;
	}
	.mint-popup{
		border-radius: 0.25rem;
	}
	.shopping_money span {
		height: 4.9rem;
		line-height: 4.9rem;
		color: #DA5E54;
		font-size: 1.6rem;
		float: right;
		font-family: PingFang SC;
		font-weight: Regular;
	}
	
	.shopping_quanxuan {
		height: 4.9rem;
		line-height: 4.9rem;
		color: #5c5c5c;
		font-size: 1.4rem;
		float: left;
	}
	
	.shopping_jieshuan {
		font-size: 1.7rem;
		color: #333333;
		background: #F9D86F;
		/*background: #cc141c;*/
		width: 30%;
		float: right;
		height: 4.9rem;
		line-height: 4.9rem;
		margin-left: 1rem;
		font-weight: Light;
		font-family: PingFangSC-Light;
	}
	
	.shopping_jieshuan01 {
		background: #CCCCCC;
		color: #FFFFFF;
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
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
		visibility: visible
	}
	
	.register-protocol {
		text-align: left;
		margin-top: 1.2rem;
		color: #cd141c;
		font-size: 1.1rem;
		height: 3rem;
		line-height: 3rem;
		float: left;
		z-index: 222;
		position: absolute;
		left: 1rem;
		/*background: url("../../assets/images/protocal.png") ;*/
	}
	
	.register-protocol .option {
		width: 2rem;
		height: 2rem;
		background-size: cover;
		background: url("../../assets/images/nocc.png") no-repeat;
		background-size: cover;
		display: inline-block;
		float: left;
		margin-top: 3.7rem;
		/*border:2px solid #D6D6D6;*/
		border-radius: 50%;
	}
	
	.failure-word {
		/*min-width: 3.4rem;*/
		width: 3.25rem;
		height: 1.7rem;
		text-align: center;
		line-height: 1.7rem;
		background: #d6d6d6;
		color: #fff;
		float: left;
		border-radius: 2.2rem;
		margin-top: 3.7rem;
		margin-left: -0.8rem;
	}
	
	.register-protocol input[type="checkbox"] {
		/*为了保险起见，把原生样式隐藏掉*/
		display: inline-block;
		width: 4rem;
		height: 5rem;
		/*margin-right: 15px ;*/
		opacity: 0;
		margin-top: 3.5rem;
		position: absolute;
	}
	
	.register-protocol2 {
		/*text-align: left;*/
		margin-top: 1.2rem;
		color: #cd141c;
		font-size: 1.1rem;
		height: 3rem;
		line-height: 3rem;
		float: left;
		padding-right: 1rem;
		/*z-index: 222;*/
		/*background: url("../../assets/images/protocal.png") ;*/
	}
	
	.register-protocol2 .option {
		width: 1.8rem;
		height: 1.8rem;
		background-size: cover;
		background: url("../../assets/images/nocc.png") no-repeat;
		background-size: cover;
		display: inline-block;
		float: left;
		margin-top: 0.4rem;
		margin-left: 1rem;
	}
	
	.register-protocol2 .checked {
		background: url("../../assets/images/protocal.png");
		background-size: cover;
	}
	
	.register-protocol2 input[type="checkbox"] {
		/*为了保险起见，把原生样式隐藏掉*/
		/* display: inline-block ; */
		width: 3rem;
		height: 5rem;
		margin-left: -5rem;
		/* margin-right:1rem; */
		opacity: 0;
		/*margin-top: 0.7rem;*/
	}
	
	input[type="checkbox"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url("../../assets/images/protocal.png") no-repeat;
		background-size: cover;
	}
	
	.spopping_all {
		bottom: 0;
		z-index: 9999;
	}
	
	.sales-price {
		font-size: 1.5rem;
		color: #EB544D;
		line-height: 6rem;
	}
	.v-modal{
		opacity: 0.5 !important;
	}
	.clear{
		clear: both;
	    width: 49%;
	    text-align: center;
	    height: 100%;
	    font-size:1.6rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
	    border-left: 0.05rem solid rgba(226,226,226,1);
	}
	.clear2{
		color: #EB544D;
	}
	.clear:first-child{
		border-left: none;
	}
	.appointment-alert {
		width: 20.2rem;
		height: 9.5rem;
		background: #000000;
		opacity: 0.5;
		border-radius: 0.5rem;
		position: fixed;
		top: calc(50% - 4.75rem);
		left: calc(50% - 10.1rem);
		z-index: 1001;
	}
	.appointment-img {
		display: inline-block;
		width: 3rem;
		height: 3rem;
		margin-top: 1.4rem;
	}
	.alert-words {
		font-size: 1.8rem;
		color: #fffefe;
		margin-top: 1.5rem;
	}
</style>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { api_get, api_post } from '../../util/api.js';
//	import { Message } from 'element-ui';
	export default {
		name: 'shopping',
		data() {
			return {
				bottomShow: 2,
				isfontnull: true,
				isfont: false,
				isdenglu: false,
				shoppingIndex: '',
				jiesuan_shoujia: false,
				//	新品上架
				titleContent: '',
				content: [],
				fullLess: '',
				howYuan: '',
				fullLessCash: '',
				howYuan1: '',
				fullLessCash1: '',
				deviceType: '',
				//      新品上架结束
				//  male:0,
				postData: [],
				loginpwd: '',
				admin: '',
				verification: '',
				loginAlert: false,
				AlertChange: false,
				count: '1',
				checked: "",
				loginCode: '',
				checkboxModel: [],
				deleteShoppingId: '',
				checkedAll: false,
				// checkboxModel2:'',
				checkboxData: [],
				deleId: [],
				choice: [],
				orderParams: '',
				orderParams1: [],
				goods: '',
				key: '',
				someNumber: 1,
				moreList: true,
				isShow: 2,
				maa: '',
				urlRemain: '',
				goNext: false,
				cue: '',
				hintName: '',
				judge: true,
				timeOutEvent: 0,
				productIds: [], //购物车商品id数组
				newGoodsNum: 0,
				newList: [],
				listArry: [],
				userType: '',
				isModFlag: false,
				checkboxData2: [],
				listArry2: [],
				isValid: true,
				noTradingNums: '',
				dialogVisible:false,
				externalId:'',
				dialogVisible01:false,
				// 收藏与取消收藏相
				collectionAlert: false,
				collectionImg: false,
				collectionWords: false,
        address: [],
        commodityId: ''
			}
		},
		mounted() {
			this.admin223();
			var modFlag = window.location.href.split('=')[1];
			if(modFlag == 99) {
				this.isModFlag = true;
			} else {
				this.isModFlag = false;
			}
			this.userType = window.localStorage.getItem('userType');
			this.getList();
			this.getNewlist();
			this.userId = window.localStorage.getItem('userId');
      let url = HOST_HDPUSER + '/address/getUserTradeAddress'
      this.$resource(url).get({
        userId: this.userId
      }).then(resp => {
        this.address = resp.data.respBody;
      })
			
		},
		computed: {
			male: function() {
				let sum = 0;
				this.deleId = [];
				this.choice = [];
				var usertype1 = window.localStorage.getItem('userType');
				for(let i = 0; i < this.checkboxModel.length; i++) {
					for(let j = 0; j < this.checkboxData.length; j++) {
						if(this.checkboxModel[i] == this.checkboxData[j].id) {
						  this.commodityId = this.checkboxData[j].goodsId;
							this.choice = this.choice.concat(this.checkboxData[j]);
							if(this.checkboxData[j].isValid != false && this.checkboxData[j].goodsNum < this.checkboxData[j].goodsTotalNum) {
								if(this.checkboxData[j].isPromotion) {
									sum += this.checkboxData[j].goodsNum * this.checkboxData[j].promotionPrice;
								} else if(usertype1 != 0) {
									if(this.checkboxData[j].preferentialPrice == 0) {
										sum += this.checkboxData[j].goodsNum * this.checkboxData[j].price;
									} else {
										sum += this.checkboxData[j].goodsNum * this.checkboxData[j].preferentialPrice;
									}
								} else {
									sum += this.checkboxData[j].goodsNum * this.checkboxData[j].price;
								}
								this.deleId.push(this.checkboxData[j].id)
								var ad = this.deleId.join(",");
							}
							if(this.checkboxData[j].isValid != false && this.checkboxData[j].goodsNum >= this.checkboxData[j].goodsTotalNum) {
								if(this.checkboxData[j].isPromotion) {
									sum += this.checkboxData[j].goodsNum * this.checkboxData[j].promotionPrice;
								} else if(usertype1 != 0) {
									sum += this.checkboxData[j].goodsNum * this.checkboxData[j].preferentialPrice
								} else {
									sum += this.checkboxData[j].goodsNum * this.checkboxData[j].price;
								}
								//                this.checkboxData[j].goodsNum = this.checkboxData[j].goodsTotalNum
								this.deleId.push(this.checkboxData[j].id)
								var ad = this.deleId.join(",");
							}
						}
					}
				}
				sum = sum.toFixed(2);
				return sum
			},
			// input1: function () {
			//   //限制最大值
			//   var text = document.getElementById("input1");
			//   text.onkeyup = function(){
			//     this.value=this.value.replace(/\.\\D/g,'');
			//     if(text.value>11){
			//       text.value = 11;
			//     }else if(text.value<1){
			//       text.value = 1;
			//     }
			//   }
			//   //限制最大值
			// },
		},
		methods: {
			// 获取个人信息
			admin223() {
				let url = HOST_HDPUSER + '/hdp/user/app/judgeLogin';
				this.loginCode = window.localStorage.getItem('loginCode');
				this.$resource(url).get({
					loginCode: this.loginCode
				}).then((res) => {
					this.userId = res.body.respBody.id;
					this.userType = res.body.respBody.userType;
					window.localStorage.setItem("userId", this.userId);
					window.localStorage.setItem("userType", this.userType);
				})
			},
			//	获取新品上架接口
			getNewlist() {
				let url = HOST_HDPCAR + '/hdp/h5/shopcarNew/getNewList'
				this.$resource(url).get({
					pageNum: this.someNumber,
				}).then((response) => {
					if(response.body.code == 200) {
						this.newList = response.body.respBody;
						this.pic = this.newList.pic;
						this.name = this.newList.name;
						for(var i = 0; i < this.newList.length; i++) {
							this.subName = this.newList[i].subName;
							this.fullReduction = this.newList[i].fullReduction;
						}
					}
				})
			},
			input1(index) {
				//限制最大值
				var text = document.getElementsByClassName("input1")[index - 1];
				text.onkeyup = function() {
					this.value = this.value.replace(/\.\\D/g, '');
					if(text.value > 11) {
						text.value = 11;
					} else if(text.value < 1) {
						text.value = 1;
					}
				}
				//限制最大值
			},
			//收藏商品
			addCollection() {
				let url = HOST_HDBMESSAGE + '/collection/addUserCollection'
				let userId = window.localStorage.getItem('userId');
				this.externalId  = window.localStorage.getItem('externalId');
				console.log(this.externalId)
				
//				let externalId = this.$route.query.commodityId
				this._getUrlParam()
				this.loginCode = window.localStorage.getItem('loginCode')
				//   setHttpInterceptors(Vue, this.loginCode)
				// Vue.http.interceptors = ["before", "method", "jsonp", "json", "form", "header", "cors"]
				// if (this.loginCode != null) {
				//   //reset interceptors
				//     Vue.http.interceptors.push((request, next) => {
				//         request.headers.set('loginCode', this.loginCode);
				//         next((response) => {
				//             return response
				//         });
				//     });
				// }
				this.$resource(url).get({
					userId: userId,
					collectionType: 1,
					externalId: this.externalId
				}).then((response) => {
					console.log(response)
					if(response.body.code == '0000') {
						let _this = this
						this.isCollection = true
						this.collectionId = response.body.respBody
						_this.collectionAlert = true;
						_this.collectionImg = false;
						_this.collectionWords = false
						setTimeout(() => {
							_this.collectionAlert = false;
							_this.collectionImg = true;
							_this.collectionWords = true
						}, 2000)
					} else if(response.body.code == -1) {
						let url = HOST_HDPUSER + '/user/isLogin';
						this.loginCode = window.localStorage.getItem('loginCode')
						this.userId = window.localStorage.getItem('userId')
						this.$resource(url).get({
							loginCode: this.loginCode
						}).then((response) => {
							if(response.status == 200) {
								if(response.data.code < 0) {
									window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'login?loginBack=011&' + this.urlRemain
									window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex');
								}
							}
						})
					} else {
						Toast({
							message: response.body.message,
							position: 'center',
							duration: 3000
						});
					}
				});
//				this.dialogVisible01 = false
			},
			_getUrlParam() {
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.lastIndexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length);
			},
			recordStart(event, index) {
				let _this = this
				_this.timeOutEvent = setTimeout(() => {
					_this.longPress(event, index)
				}, 800)
				_this.startX = event.touches[0].clientX;
			},
			recordMove(event, index) {
				clearTimeout(this.timeOutEvent);
				this.timeOutEvent = 0;
				this.endX = event.touches[0].clientX;
			},
			recordEnd(index) {
				clearTimeout(this.timeOutEvent);
				if((this.startX - this.endX) > 200) {
					document.getElementsByClassName('list-li')[index].style.right = 14 + 'rem'
				} else if((this.startX - this.endX) < -200) {
					document.getElementsByClassName('list-li')[index].style.right = 0 + 'rem'
				} else {}
			},
			longPress(event, index) {
				this.timeOutEvent = 0;
				let _this = this
				MessageBox({
					title: '提示',
					message: '确定执行此操作?',
					showCancelButton: true,
					showConfirmButton: true
				});
				MessageBox.confirm('确定执行此操作?').then(action => {
					let url = HOST_HDPCAR + '/deleteGoods/' + _this.checkboxData[index].id;
					_this.loginCode = window.localStorage.getItem('loginCode')
					//添加header
					// Vue.http.interceptors.push((request, next)  =>{
					//   request.headers.set('loginCode', _this.loginCode);
					//   next((response) => {
					//     return response
					//   })
					// })
					//添加header
					_this.$resource(url).delete({}).then((response) => {
						if(response.status == 200) {
							_this.getList('del')
						}
					})
				})
			},
			deleteBack(index) {
				document.getElementsByClassName('list-li')[index].style.right = 0 + 'rem'
			},
			//      购物车进详情页
			ceshi: function(event, index) {
			  this.commodityId = this.checkboxData[index].goodsId
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + this.checkboxData[index].goodsId + "&mallCart=1&shopping=1&shoppingBack=001"
				// this.checkboxData[index]
				// if(this.$route.query.shoppingBack=="1"){
				//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+this.checkboxData[index].goodsId+"&found_index=1&shoppingBack=1&mallCart=1&shopping=1"
				// }
				// else if(this.$route.query.shoppingBack=="001"){
				//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+this.checkboxData[index].goodsId+"&mallCart=1&shopping=1&shoppingBack=001"
				// }
				// else if(this.$route.query.shoppingBack=="004"){
				//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+this.checkboxData[index].goodsId+"&mallCart=1&shopping=1&shoppingBack=004"
				// }
			},
			getList(state) {
				var u = navigator.userAgent
				if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) { //是Android
					//          this.androad=true
				} else { //是IOS
					//          this.androad=false
				}
				let _this = this
				let url = HOST_HDPCAR + '/hdp/h5/shopcar/shopcarList';
				if(this.$route.query.logincodepc) {
					_this.loginCode = this.$route.query.logincodepc
					_this.userId = this.$route.query.userId;
					console.log(_this.userId)
					
					window.localStorage.setItem('loginCode', _this.loginCode)
					window.localStorage.setItem('userId', _this.userId)
				} else {
					_this.loginCode = window.localStorage.getItem('loginCode');
					if(_this.loginCode != null) {
						this.isdenglu = true;
						this.isfont = true;
						this.isfontnull = true;
					} else {
						this.isfontnull = false;
						this.isdenglu = false;
						this.isfont = false;
					}
				}
				//添加header
				// Vue.http.interceptors.push((request, next)  =>{
				//   request.headers.set('loginCode', _this.loginCode);
				//   next((response) => {
				//     return response
				//   })
				// })
				_this.someNumber = state === 'more' ? _this.someNumber + 1 : 1
				//添加header
				_this.$resource(url).get({
					pageNum: _this.someNumber,
					// version: "v1.2"
				}).then((response) => {
					if(response.status == 200) {
						if(response.body.code == 200) {
							_this.checkboxData = response.body.respBody;
							_this.noTradingNums = response.body.respBody.noTradingNums;
							_this.checkboxData2 = response.body.respBody;
							_this.listArry = _this.checkboxData.list;
							console.log(_this.listArry)
							if(state === 'more') {
								_this.checkboxData = _this.checkboxData.concat(response.body.respBody.list);
								_this.checkboxData2 = _this.checkboxData2.concat(response.body.respBody.list);
							} else {
								_this.checkboxData = [].concat(response.body.respBody.list);
								_this.checkboxData2 = [].concat(response.body.respBody.list);
							}
							// 是否显示加载更多
							_this.moreList = response.body.respBody.list.length === 10
							// 列表为空的时候显示去逛逛
							_this.isShow = _this.checkboxData == "" ? 1 : 3;
							this.productIds = []
							for(var i = 0; i < _this.checkboxData.length; i++) {
								_this.productIds.push(this.checkboxData[i].goodsId)
								// this.getLimitNumber(i, this.checkboxData[i].goodsId);
								_this.getLimitNumber1(i, this.checkboxData[i].goodsId);
								_this.newGoodsNum = _this.checkboxData.length;
								_this.price = _this.checkboxData[i].price;
								_this.promotionPrice = _this.checkboxData[i].promotionPrice;
							}
							this.getLimitProductsNumber(this.productIds.join(","))
						} else if(response.body.code == '-1111') {
							_this.$router.push({
								// path: '/messageIndex'
							})
						}
					}
				})
			},
			clearshopping() {
				this.checkboxData2 = []
			},
			// 获取限购数量接口
			getLimitNumber(i, id) {
				if(id != null) {
					let _this = this
					let url = HOST_HDPUSER + '/salespromotion/checkProductPurchase';
					_this.loginCode = window.localStorage.getItem('loginCode');
					_this.userId = window.localStorage.getItem('userId');
					//添加header
					_this.$resource(url).get({
						productId: id,
						userId: parseInt(_this.userId),
						version: "v1.2"
					}).then((response) => {
						if(response.status == 200) {
							if(response.data.code == 200) {
								let allNumner = response.data.respBody.purchaseQuantity + response.data.respBody.goodsName
								let disabled = response.data.respBody.purchaseQuantity == 0 ? true : false
								this.$set(_this.checkboxData[i], 'isdisabled', disabled);
								if(disabled) {
									//									this.$set(_this.checkboxData[i], 'isValid', false);
									this.$set(_this.checkboxData2[i], 'isValid', false);
								}
								this.$set(_this.checkboxData[i], 'respBody', response.data.respBody.purchaseQuantity);
							}
						}
					})
				}
				//            限购请求的接口
				//          获取限购数量接口
			},
			//  获取限购数量接口原始限购数量
			getLimitNumber1(i, id) {
				let _this = this
				let url = HOST_HDPUSER + '/salespromotion/getSalePromotionByProductIds';
				_this.loginCode = window.localStorage.getItem('loginCode');
				_this.userId = window.localStorage.getItem('userId');
				//添加header
				// Vue.http.interceptors.push((request, next)  =>{
				//   request.headers.set('loginCode', _this.loginCode);
				//   next((response) => {
				//     return response
				//   });
				// });
				//添加header
				_this.$resource(url).get({
					productIds: id
				}).then((response) => {
					if(response.status == 200) {
						if(response.data.code == 200) {
							for(let j = 0; j < response.data.respBody.length; j++) {
								if(response.data.respBody[j].commodityId == id) {
									this.$set(_this.checkboxData[i], 'respBody1', response.data.respBody[j].purchaseQuantity);
								}
							}
						}
					}
				})
				//            限购请求的接口
				//          获取限购数量接口
			},
			//批量获取购物车限购数量接口
			getLimitProductsNumber(productId) {
				let url = HOST_HDPUSER + '/salespromotion/checkProductsPurchase';
				this.loginCode = window.localStorage.getItem('loginCode');
				this.userId = window.localStorage.getItem('userId');
				this.$api_get({
					url: url,
					data: {
						productIds: productId,
						userId: parseInt(this.userId),
						version: "v1.2"
					}
				}).then(res => {
					if(res.code == 200) {
						let shopList = res.respBody;
						//shopList 位null  商品都不参加活动，不限购
						if(shopList != null) {
							shopList.forEach((e, i) => {
								if(e.salesLable == '限时秒杀') {
									this.$set(this.checkboxData[i], 'respBody', true) //重新构造购物车列表数据 显示秒杀
								} else {
									this.$set(this.checkboxData[i], 'respBody', false)
								}
								if(e.surplus != null && e.purchaseQuantity >= 0 && e.surplus < e.purchaseQuantity) {
									this.$set(this.checkboxData[i], 'purchaseQuanity', e.surplus) //活动库存
								} else if(e.surplus != null && e.purchaseQuantity == '-1') {
									this.$set(this.checkboxData[i], 'purchaseQuanity', e.surplus)
								} else {
									this.$set(this.checkboxData[i], 'purchaseQuanity', e.purchaseQuantity)
								}
								// this.$set(this.checkboxData[i],'surplus',shopList[i].surplus)
								let disabled = e.purchaseQuantity == 0 ? true : false //如果限购数量为0   则商品失效
								this.$set(this.checkboxData[i], 'isdisabled', disabled);
								//								this.$set(this.checkboxData2[i], 'isdisabled', disabled);
								if(disabled) {
									this.$set(this.checkboxData[i], 'isValid', false); //失效商品
									//									this.$set(this.checkboxData2[i], 'isValid', false); //失效商品
								}
								// console.log(e.purchaseQuanity > 0 && e.purchaseQuanity<=(e.goodsNum)  && this.goNext,'01')
							})
						} else {
							for(var i = 0; i < this.checkboxData.length; i++) {
								this.$set(this.checkboxData[i], 'respBody', false) //不限购
								this.$set(this.checkboxData[i], 'purchaseQuanity', -2)
							}
						}
					}
				})
			},
			shopping: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'phone_change2'
			},
			back: function() {
				console.log('11');
				if(this.$route.query.shoppingBack=='1010'){
					this.$router.replace({path: 'newProducts'})
				}else if(this.$route.query.shoppingBack == "001" && this.$route.query.mallCart != "1") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
				} else if(this.$route.query.shoppingBack == "1" && this.$route.query.mallCart != "1") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index1 = urlParams.indexOf('commodityId')
					let urlRemain = urlParams.slice(index1, urlParams.length + 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?" + urlRemain
				}
				//详情登录后购物车返回
				else if(this.$route.query.shopping == "2" && this.$route.query.mallCart != "1") {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?" + this.urlRemain
				} else if(this.$route.query.shoppingBack == "004" && this.$route.query.mallCart != "1") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
				} else if(this.$route.query.mallCart == "1") {
					window.history.go(-3)
				} else {
					this.$router.go(-1)
				}
			},
			nullGo: function() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=001"
			},
			getNumberBlur: function(maxNum, index) {
				this.maa = document.getElementsByClassName("maa")[index].value;
				if(this.maa == "") {
					this.checkboxData[index].goodsNum = 1
					this.maa = 1
				}
				this.$nextTick(() => {
					if(this.maa >= maxNum) {
						//            document.getElementsByClassName("maa")[index].value = allNumber
						this.checkboxData[index].goodsNum = maxNum
						this.maa = maxNum
					}
					let url = HOST_HDPCAR + "/updateGoodsNum?goodsId=" + this.checkboxData[index].goodsId + "&goodsSpec=" + this.checkboxData[index].goodsSpec + "&goodsNum=" + this.maa;;
					this.loginCode = window.localStorage.getItem('loginCode')
					//添加header
					var vm = this;
					vm.$http.put(url).then((response) => {
						if(response.status == 200) {
						}
						//        接口代码
					})
				})
			},
			getNumber: function(allNumber, index) {
				this.cue1(index);
				//判断输入的不是数字或者小于0的时候
				this.maa = document.getElementsByClassName("maa")[index].value;
				if(this.maa == "") {
					this.checkboxData[index].goodsNum = ''
					this.maa = ''
					document.getElementsByClassName("maa")[index].value = ''
				}
				if(this.maa != "") {
					this.checkboxData[index].goodsNum = this.maa
					document.getElementsByClassName("maa")[index].value = this.maa
				}
				if(this.maa == '-' || this.maa == '+') {
					this.checkboxData[index].goodsNum = ''
					this.maa = ''
				}
				this.$nextTick(() => {
					this.maa = document.getElementsByClassName("maa")[index].value;
					if(this.maa >= allNumber) {
						//            document.getElementsByClassName("maa")[index].value = allNumber
						this.checkboxData[index].goodsNum = allNumber
						this.maa = allNumber
					}
					//        接口代码
					let url = HOST_HDPCAR + "/updateGoodsNum?goodsId=" + this.checkboxData[index].goodsId + "&goodsSpec=" + this.checkboxData[index].goodsSpec + "&goodsNum=" + this.maa;;
					this.loginCode = window.localStorage.getItem('loginCode')
					//添加header
					//   Vue.http.interceptors.push((request, next)  =>{
					//     request.headers.set('loginCode', this.loginCode);
					//   next((response) => {
					//   return response
					// });
					// });
					//添加header
					var vm = this;
					vm.$http.put(url).then((response) => {
						if(response.status == 200) {}
					})
					//        接口代码
				})
			},
			getNumber1: function(index) {
				this.$nextTick(() => {
					// this.maa = document.getElementsByClassName("maa")[index].value;
					this.maa = this.checkboxData[index].goodsNum
					//        接口代码
					let url = HOST_HDPCAR + "/updateGoodsNum?goodsId=" + this.checkboxData[index].goodsId + "&goodsSpec=" + this.checkboxData[index].goodsSpec + "&goodsNum=" + this.maa;;
					this.loginCode = window.localStorage.getItem('loginCode')
					//添加header
					//   Vue.http.interceptors.push((request, next)  =>{
					//     request.headers.set('loginCode', this.loginCode);
					//   next((response) => {
					//   return response
					// });
					// });
					//添加header
					var vm = this;
					vm.$http.put(url).then((response) => {
						if(response.status == 200) {}
					})
					//        接口代码
				})
			},
			add: function(mostNumber, index) {
				this.judge = false
				this.goNext = false
				if(this.checkboxData[index].goodsNum >= mostNumber) {
					return
				}
				this.checkboxData[index].goodsNum++
				this.getNumber1(index)
			},
			reduce: function(index) {
				this.getLimitProductsNumber(this.productIds.join(","));
				// this.getLimitProductsNumber(this.checkboxData[index].goodsId);
				// this.getLimitNumber(index, this.checkboxData[index].goodsId);
				this.goNext = false
				this.judge = false
				if(this.checkboxData[index].goodsNum < 2) {
					// this.checkboxData[index].goodsNum = 1
					return
				}
				this.checkboxData[index].goodsNum--
				this.getNumber1(index)
			},
			//      提示限购数量函数
			cue1: function(index) {
				this.judge = false
				this.goNext = false
				var _this = this
				_this.cue = index
				setTimeout(function() {
					_this.cue = false
					_this.judge = true
				}, 2000)
			},
			delete110(index){
				window.localStorage.setItem('index',index)
				this.dialogVisible = true
			},
			cleardiv(){
				this.dialogVisible = false
			},
			delete11: function() {
				var index = window.localStorage.getItem('index');
				console.log(index)
				let url = HOST_HDPCAR + '/deleteGoods/' + this.checkboxData[index].id;
				this.loginCode = window.localStorage.getItem('loginCode')
				//添加header
				// Vue.http.interceptors.push((request, next)  =>{
				//   request.headers.set('loginCode', this.loginCode);
				//   next((response) => {
				//     return response
				//   });
				// });
				//添加header
				this.$resource(url).delete({}).then((response) => {
					if(response.status == 200) {
						//this.getList('del');
						
						location.reload()
					} else {}
				})
				this.dialogVisible = false
			},
			delete112: function(index) {
				let url = HOST_HDPCAR + '/deleteGoods/' + this.checkboxData2[index].id;
				this.loginCode = window.localStorage.getItem('loginCode')
				//添加header
				// Vue.http.interceptors.push((request, next)  =>{
				//   request.headers.set('loginCode', this.loginCode);
				//   next((response) => {
				//     return response
				//   });
				// });
				//添加header
				this.$resource(url).delete({}).then((response) => {
					if(response.status == 200) {
						//						this.getList('del');
						location.reload()
					} else {}
				})
			},
			checkedAllFun: function() {
				if(!this.checkedAll) {
					this.checkedAll = true
					this.checkboxModel = [];
					for(let i = 0; i < this.checkboxData.length; i++) {
						if(this.checkboxData[i].isValid != false) {
							this.checkboxModel.push(this.checkboxData[i].id)
						}
					}
				} else {
					this.checkedAll = []
					this.checkboxModel = []
				}
			},
			//创建订单函数结算
			constructPostData() {
				var _this = this
				this.goNext = false
				var acd = []
				for(var i = 0; i < this.choice.length; i++) {
					if(this.choice[i].respBody) {
						//存在限购 并且 限购 数量 不是 -1   参加活动限购
						if(this.choice[i].purchaseQuanity > 0 && this.choice[i].goodsNum > this.choice[i].purchaseQuanity) {
							this.goNext = true
							acd.push(this.choice[i].goodsName)
						} else {
							this.goNext = false
						}
					}
				}
				if(this.deleId == "") {
					Toast({
						message: '请选择商品',
						duration: 3000,
						className: "toast"
					});
				} else if(this.goNext) {
					this.hintName = acd[0]
					setTimeout(function() {
						_this.hintName = ""
						_this.goNext = false
					}, 2000)
				} else {
					this.orderParams1 = [];
					this.orderParams = [];
					this.goods = [];
					//展厅二维码 添加的商品 加参数
					for(var i = 0; i < this.choice.length; i++) {
						// 判断是否有促销价
						let price = this.choice[i].promotionPrice || this.choice[i].price
						this.orderParams[i] = [{
							imgUrl: this.choice[i].imagePath,
							pdBn: this.choice[i].goodsNo,
							pdName: this.choice[i].goodsName,
							pdPrice: price,
							pdQuantity: this.choice[i].goodsNum,
							pdSpce: this.choice[i].goodsSpec,
							siteId: this.choice[i].siteId,
							supId: this.choice[i].memberId,
							pdId: this.choice[i].goodsId,
							pdUnit: this.choice[i].unit,
							version: "v1.2"
						}]
						this.orderParams1 = this.orderParams1.concat(this.orderParams[i]);
					}
					api_post({
						url: HOST_ORDERS + '/hdp/app/order/addPreOrder',
						data: this.orderParams1
					}).then(res => {
						if(res.respBody.code == 200) {
							localStorage.setItem('deleteShoppingId', this.deleId)
							this.key = res.respBody.entity;
							window.localStorage.setItem('key', this.key)

              if(!this.address.length) {
                let currentUrl = window.location.href
                let index1 = currentUrl.indexOf('?')
                currentUrl = currentUrl.slice(index1 + 1)
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address?' + "commodityId=" + this.commodityId + '&key=' + this.key + '&userId=' + this.userId;
                return;
              }

							var urlParams = window.location.href; //获取url中"?"符后的字串
							var index = urlParams.indexOf('?')
							var urlRemain = urlParams.substring(index + 1, urlParams.length);
							console.log(this.$route.query.shoppingBack);
							if(this.$route.query.shoppingBack == "1") {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?key=' + this.key + '&totalMoney=' + this.male + '&shopping=1' + '&' + urlRemain;
							} else if(this.$route.query.shoppingBack == "001") {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?key=' + this.key + '&totalMoney=' + this.male + '&shoppingBack=001&shopping=1';
							} else if(this.$route.query.shoppingBack == "004") {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?key=' + this.key + '&totalMoney=' + this.male + '&shoppingBack=004&shopping=1';
							} else {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?key=' + this.key + '&totalMoney=' + this.male + '&shoppingBack=004&shopping=1&key1=123';
							}
						} else if(res.code == -1) {
							// window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "messageIndex"
							window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
						} else if(res.code == -5) {
							this.$alert_msg(res.msg)
						} else {
							Toast({
								message: res.msg,
								position: 'center',
								duration: 2000
							});
						}
					})
				}
			},
			enterRecommendedGoodDetail(item) {
				// 记录向前跳转的行为
				localStorage.setItem('scrollBehavior', '01')
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + item.commodityId + '&recommendedGood=1'
				//   window.location.reload()
			},
			//      创建订单函数
		},
		watch: {
			checkboxModel: function() {
				var sum = 0
				for(var i = 0; i < this.checkboxData.length; i++) {
					if(this.checkboxData[i].isValid != false) {
						sum += 1
					}
				}
				if(this.checkboxModel.length === sum) {
					this.checkedAll = true
				} else {
					this.checkedAll = false
				}
			}
		}
	}
	
</script>
