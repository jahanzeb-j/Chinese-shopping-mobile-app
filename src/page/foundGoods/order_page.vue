<template>
	<div class="order_page">
		<div class="header">
			<span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
			<span class="orderTitle">确认订单</span>
		</div>
		<div class="haveAddress">
			<!--<div class="grayLine"></div>-->
			<div class="personInfo clearfix" @click="changeAddress">
				<div class="fr">
					<div class="personInfoCont">
						<span class="name">{{ defaultAddress.linkman }}</span>
						<span class="phone">
                            <span class="phone1">{{ phone1 }}</span>
						<span class="phone2">{{ phone2 }}</span>
						<span class="phone3">{{ phone3 }}</span>
						</span>
						<!--<span class="default" v-show=isDefault>默认</span>-->
					</div>

					<div class="personAddressInfo">
						<div class="fl addressLogo">
							<img src="../../assets/images/moren.png" />
							<!--<span class="addrssText">[地址]</span>-->
						</div>
						<span class="p-location">
                            {{ MyOrderAddress }}
                        </span>
						<span class="rightri">
                            <span class="rightriSp">
                                <img src="../../assets/images/rightri.png" alt="">
                            </span>
						</span>
					</div>
				</div>
			</div>
			<div class="orderBk"></div>
			<div class="grayLine"></div>
			<div class="goodPic" v-for="item in items">
				
				<div class="left">
					<span class="leftPic">
                        <img :src=item.imgUrl alt="">
                    </span>
				</div>
				<div class="right">
					<ul class="right_ul">
						<li class="li1">
							{{ item.pdName }}
						</li>
						<li class="li2">
							{{ }}
						</li>
						<li class="li3">
							<div class="li3_div1">
								<span class="sp1">
                                    <span class="sp1_num">￥{{ item.pdPrice}}</span>
								</span>
								<span class="sp2">
                                    <!--/{{item.pdUnit}}-->
                                </span>
								<span class="sp1_zhong" v-if="item.pdPrice != item.originPdPrice">
                                   <span class="sp1_yuan">
                                        ￥{{ item.originPdPrice}} /{{item.pdUnit}}
                                    <span class="sp1_num_yuan"></span>
								</span>
								</span>
								<span class="originalPrice">
                                </span>
							</div>
							<div class="li3_div2">
								<span class="sp3">
                                <span class="sp3_num">
                                    x{{ item.pdQuantity }}
                                </span>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="grayLine"></div>
			<div class="diffInvoice diffiIvoiceAll">
				<div class="invoice1">
					买家留言
				</div>
				<div class="invoice2">
					<span class="invoiceName liuyan">
                        <input placeholder="给商家留言30字以内" class="leaveMsg" v-model="leaveMsg" maxlength="30">
                        <span class="rightriSpan"><img src="../../assets/images/rightri.png" alt=""></span>
					</span>
				</div>
			</div>
			<div class="grayLine2"></div>
			<div class="invoice">
				<div class="invoice1">
					发票信息
				</div>
				<div class="invoice2" @click="openInvoice">
					<span class="invoiceEffect">
                        {{  using }}
                    </span>
					<span v-if="picked!=0">
                        -
                    </span>
					<span class="invoiceName" style="margin-top: 0.2rem;">
                        <span class="invoiceStyle">{{ companyName }}</span>
					<span></span>
					<span class="rightriSpan"><img src="../../assets/images/rightri.png" alt=""></span>
					</span>
				</div>
			</div>
			<mt-popup v-model="invoiceContent" position="bottom">
				<div class="invoicePop">
					<div class="div1">
						<span class="font1">发票信息</span>
						<!-- <span class="finish" @click="finish">完成</span> -->
					</div>
					<div class="div2">
						<span class="font1">发票类型</span>
						<span class="div2_1">仅支持纸质发票</span>
					</div>
					<div class="div3">
						<div class="div3_1 font1">
							发票抬头
						</div>
						<div class="div3_2">
							<span class="noInvoice">
                                <span class="spInput" :class="{ invoiceActive1:isInvoiceActive1,invoiceActive2:isInvoiceActive2 }">
                                    <input type="radio" name="picked" v-model="picked" value="0" @click="chooseInvoice">
                                </span>
							<label for="">不开</label>
							</span>
							<span class="self">
                                <span class="spInput" :class="{ personActive1:isPersonActive1,personActive2:isPersonActive2 }">
                                     <input type="radio" name="picked" v-model="picked" value="1" @click="choosePerson">
                                </span>
							<label for="">个人</label>
							</span>
							<span class="public">
                                <span class="spInput" :class="{ companyActive1:isCompanyActive1,companyActive2:isCompanyActive2 }">
                                    <input type="radio" name="picked" v-model="picked"  value="2" @click="chooseCompany">
                                </span>
							<label for="">单位</label>
							</span>
						</div>
						<div class="div3_3">
							<input placeholder="请输入公司名称" class="enterName" v-model="company" v-show="picked==2">
						</div>
						<div class="div3_4">
							<input placeholder="请输入纳税人识别号" class="enterName" v-model="taxerId" v-show="picked==1">
						</div>
					</div>
					<div class="div4" v-show="picked!=0">
						<div class="div4_1 font1">
							发票内容
						</div>
						<div class="div4_2">
							<span class="div4_2_1">
                                <span class="spInput" :class="{ workingActive1:isWorkingActive1,workingActive2:isWorkingActive2 }">
                                    <input type="radio" name="choose1" v-model="picked1" value="办公用品" @click="chooseWork">
                                </span>
							<label for="">办公用品</label>
							</span>
							<span class="div4_2_2">
                                <span class="spInput" :class="{ wasteActive1:isWasteActive1,wasteActive2:isWasteActive2 }">
                                    <input type="radio" name="choose1" v-model="picked1" value="耗材"  @click="chooseWaste">
                                </span>
							<label for="">耗材</label>
							</span>
							<span class="div4_2_3">
                                <span class="spInput" :class="{ detailActive1:isDetailActive1,detailActive2:isDetailActive2 }">
                                      <input type="radio" name="choose1" v-model="picked1" value="明细"  @click="chooseDetail">
                                </span>
							<label for="">明细</label>
							</span>
						</div>
					</div>

				</div>
				<mt-button class='sure' @click="finish">确定</mt-button>
			</mt-popup>

			<div class="grayLine"></div>
			<div class="invoiceAll diffiIvoiceAll">
				<div class="invoice1">
					商品总金额
				</div>
				<div class="invoice2">
					<span class="invoiceName redMoney">
                        <span>￥{{ productTotalAcount }}</span>
					</span>
				</div>
			</div>
			<div class="grayLine2"></div>
			<div class="invoiceAll diffiIvoiceAll">
				<div class="invoice1">
					运费
				</div>
				<div class="invoice2">
					<span class="invoiceName redMoney">
                      	<span>￥{{ transferCost }}</span>
					</span>
				</div>
			</div>
			<div class="grayLine2" v-if="fullSingleActivity != ''"></div>
			<div class="Topminus" v-if=fullSingleActivity>
				<div class="invoiceAll invoiceAll_coupon" v-for="item in fullSingleActivity">
					<div class="invoice1" v-if="item.saleType==3">
						满{{ item.howYuan }}元减{{ item.costItem }}元
						<span class="icon">
                            满减
                        </span>
					</div>
					<div class="invoice2" v-if="item.saleType==3">
						<span class="invoiceName redMoney">
                            -￥
                            <span>{{ item.costItem }}</span>
						</span>
					</div>
					<div class="invoice1" v-if="item.saleType==4">
						满{{ item.howYuan }}元打{{ item.fullDiscount}}折
						<span class="icon">
                            满减
                        </span>
					</div>
					<div class="invoice2" v-if="item.saleType==4">
						<span class="invoiceName redMoney">
                            -￥
                            <span>{{ item.costItem  }}</span>
						</span>
					</div>
					<div class="invoice1" v-if="item.saleType==5">
						满{{ item.howPiece }}件减{{ item.costItem }}元
						<span class="icon">
                            满减
                        </span>
					</div>
					<div class="invoice2" v-if="item.saleType==5">
						<span class="invoiceName redMoney">
                            -￥
                            <span>{{ item.costItem }}</span>
						</span>
					</div>
					<div class="invoice1" v-if="item.saleType==6">
						满{{ item.howPiece }}件打{{ item.fullDiscount }}折
						<span class="icon">
                            满减
                        </span>
					</div>
					<div class="invoice2" v-if="item.saleType==6">
						<span class="invoiceName redMoney">
                            -￥
                            <span>{{ item.costItem  }}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="bottomTotal">
				<!--<div class="grayLine1"></div>-->
				<ul class="bottomTotal_ul">
					<li class="buyNow" @click="buyNow">
						去支付
					</li>
					<li class="word">
						<span class="word1">付款:</span>
						<span class="word2">￥{{ orderTotalAcount }}</span>
						<!--<span class="word3">{{ orderTotalAcount }}</span>-->
						<span class="word2"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped>
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #5c5c5c;
	}
	
	 ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #5c5c5c;
	}
	
	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		color: #5c5c5c;
	}
	
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #5c5c5c;
	}
	
	.invoiceStyle {
		font-size: 1.3rem;
		font-family: PingFangSC-Light;
		color: rgba(127, 127, 127, 1);
	}
	
	.fold-enter-active {
		animation-name: fold-in;
		animation-duration: .5s;
	}
	
	.fold-leave-active {
		animation-name: fold-out;
		animation-duration: .5s;
	}
	
	@keyframes fold-in {
		0% {
			transform: translate3d(0, 100%, 0);
		}
		50% {
			transform: translate3d(0, 50%, 0);
		}
		100% {
			transform: translate3d(0, 0, 0);
		}
	}
	
	@keyframes fold-out {
		0% {
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0, 50%, 0);
		}
		100% {
			transform: translate3d(0, 100%, 0);
		}
	}
	
	img {
		width: 100%;
		height: 100%;
	}
	
	span {
		display: inline-block;
	}
	
	.order_page {
		width: 100%;
		overflow: hidden;
	}
	
	input[type='radio'] {
		border: none;
		outline: none;
		background: none;
		-webkit-appearance: radio;
	}
	
	.order_page .header {
		position: fixed;
		top: 0;
		width: 100%;
		background: #fff;
		height: 4.6rem;
		line-height: 4.6rem;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.order_page .header .orderTitle {
		font-size: 1.8rem;
		color: #333;
		margin-left: -1.7rem;
	}
	
	.order_page .header .return {
		float: left;
		margin-left: 1.3rem;
		width: 1rem;
		height: 2rem;
		padding-top: 0.75rem;
	}
	
	.order_page .header .return img {
		width: 1.2rem;
		height: 2rem;
	}
	
	.order_page .noAddress {
		width: 100%;
	}
	
	.order_page .noAddress .popup {
		width: 100%;
		height: 100rem;
		background: #7A7A7A;
		position: fixed;
		top: 0;
		z-index: 11;
		opacity: 0.5;
	}
	
	.order_page .noAddress .alertWindow {
		width: 75%;
		height: 16.8rem;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -8.6rem;
		margin-left: -37.5%;
		z-index: 22;
	}
	
	.order_page .noAddress .alertWindow {
		background: #fff;
		border-radius: 5%;
	}
	
	.order_page .noAddress .alertWindow_ul .li1 .title {
		font-size: 1.8rem;
		color: #000;
		margin: 3rem 0 1.5rem 0;
		font-weight: bolder;
	}
	
	.order_page .noAddress .alertWindow_ul .li2 {
		font-size: 1.5rem;
		color: #333;
		line-height: 2rem;
		width: 21rem;
		margin: 0 auto;
	}
	
	.order_page .noAddress .alertWindow_ul .li3 {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		height: 6rem;
		line-height: 6rem;
		border-top: 1px solid #D8D9DB;
		margin-top: 1rem;
	}
	
	.order_page .noAddress .alertWindow_ul .li3 .cancel {
		font-size: 1.8rem;
		color: #999;
		width: 50%;
		border-right: 1px solid #D8D9DB;
	}
	
	.order_page .noAddress .alertWindow_ul .li3 .addAddress {
		font-size: 1.8rem;
		color: #f9be00;
		width: 50%;
	}
	
	.grayLine {
		width: 100%;
		height: 1rem;
		background: #f4f4f4;
	}
	
	.grayLine2 {
		/*width:100%;
        height:1rem;
        background: #f4f4f4;*/
		width: 36.05rem;
		height: 0.05rem;
		background: #E2E2E2;
		position: relative;
		left: 1.45rem;
	}
	.grayLine1 {
		width: 100%;
		height: 1rem;
		background: #f4f4f4;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.haveAddress {
		width: 100%;
		padding-bottom: 6.4rem;
		padding-top: 4.6rem;
	}
	
	.haveAddress .personInfo {
		/*height:7.6rem;*/
		box-sizing: border-box;
		/*padding-left:0.8rem;*/
		padding: 1.6rem 0;
	}
	
	.haveAddress .personInfo .personInfoCont {
		text-align: left;
	}
	/* .haveAddress .personInfo .personInfoCont{
        text-align: left;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    } */
	
	.haveAddress .personInfo .personInfoCont .name {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: #333333;
		margin-right: 0.7rem;
		margin-bottom: 0.15rem;
		width: 4.5rem;
		margin-left: 0.1rem;
	}
	
	.haveAddress .personInfo .personInfoCont .phone {
		/*font-size:1.6rem;*/
		font-family: PingFangSC-Light;
		color: #333;
	}
	
	.haveAddress .personInfo .personInfoCont .phone span {
		margin-right: 0.2rem;
		font-size: 1.4rem;
	}
	
	.haveAddress .personInfo .personInfoCont .default {
		font-size: 1.2rem;
		color: #fff;
		padding: 0.25rem 0.5rem;
		background: #F9BE00;
		margin-left: 0.7rem;
	}
	
	.haveAddress .personInfo .personAddressInfo {
		/*width: 23.5rem;*/
		text-align: left;
		height: 3.2rem;
		line-height: 1.65rem;
		width: 100%;
		margin-top: 0.3rem;
		/*white-space: nowrap;
		text-overflow: ellipsis;*/
		overflow: hidden;
		/*  margin-left: 6.0rem; */
	}
	
	.haveAddress .personInfo .personAddressInfo .p_pic {
		width: 0.9rem;
		height: 1.2rem;
		margin: 0.2rem 0.5rem 0 0.1rem;
		float: left;
	}
	
	.haveAddress .personInfo .personAddressInfo .p-location {
		width: 23.5rem;
		font-size: 1.2rem;
		height: 3.2rem;
		line-height: 1.65rem;
		color: #7F7F7F;
		font-family: PingFangSC-Light;
		overflow: hidden;
		/*text-overflow: ellipsis;
		white-space: nowrap;*/
		padding-right: 0.8rem;
		/*  margin-left: 0.5rem; */
	}
	
	.haveAddress .personInfo .personAddressInfo .rightri {
		width: 2rem;
		height: 2rem;
		float: right;
		/* margin-top: -3rem; */
		display: -ms-flexbox;
		display: flex;
		display: -webkit-flex;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-justify-content: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-align-items: center;
		position: absolute;
		top: 7rem;
		right: 0rem;
	}
	
	.haveAddress .personInfo .personAddressInfo .rightri .rightriSp {
		width: 0.6rem;
		height: 1rem;
		margin-right: 1.3rem;
	}
	
	.haveAddress .goodPic {
		display: flex;
		display: -webkit-flex;
	    padding: 1.6rem;
	    border-bottom: 0.05rem solid rgba(226, 226, 226, 1);
	    margin-left: 1.6rem;
	    padding-left: 0;
	}
	
	.haveAddress .goodPic .left {
		width: 7.55rem;
		height: 7.55rem;
		background: #F0F0F0;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.haveAddress .goodPic .left .leftPic {
		width: 7.55rem;
		height: 7.55rem;
	}
	
	.haveAddress .goodPic .right .right_ul {
		text-align: left;
		/*padding: 1rem 0 0 1rem;*/
		padding-left: 1rem;
	}
	
	.haveAddress .goodPic .right .right_ul .li1 {
		font-size: 1.4rem;
		color: #333333;
		width: 24.4rem;
		font-family: PingFangSC-Light;
		line-height: 1.9rem;
	    height: 4rem;
	    overflow: hidden;
	}
	
	.li3_div2 {
		margin-top: 0.3rem;
		margin-right: -1.5rem;
	}
	
	.haveAddress .goodPic .right .right_ul .li2 {
		font-size: 1.3rem;
		color: #8F8F8F;
		margin: 0.8rem 0 1.8rem 0;
		text-align: right;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 {
		margin-top: 2.5rem;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp1 {
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: rgba(235, 84, 77, 1);
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp1 .sp1_num {
		/*font-size:1.6rem;
        color: #CC141C;*/
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp1_yuan {
		font-size: 1.2rem;
		color: #939393;
		margin-left: 1rem;
		text-decoration: line-through;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp1 .sp1_num_yuan {
		font-size: 1.6rem;
		color: #CC141C;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp2 {
		font-size: 1.2rem;
		color: #939393;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp2_yuan {
		font-size: 1.2rem;
		color: #939393;
	}
	
	.haveAddress .goodPic .right .right_ul .li3 .sp3 {
		font-size: 1.4rem;
		color: #333;
		font-family: PingFangSC-Light;
	}
	
	.haveAddress .invoice {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
		padding: 1.3rem 1.45rem;
		font-size: 1.3rem;
	}
	
	.haveAddress .invoiceAll {
		display: flex;
		justify-content: space-between;
		padding: 0.75rem 1.45rem;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
		color: #333;
	}
	
	.haveAddress .invoiceAll .invoice2 {
		color: #333;
		line-height: 1.5rem
	}
	
	.haveAddress .invoice .invoice1 {
		color: #333;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
	}
	
	.bottomTotal {
		width: 100%;
		position: fixed;
		bottom: 0;
		text-align: right;
		background: #fff;
		border: 0.05rem solid rgba(226, 226, 226, 1);
	}
	
	.bottomTotal .bottomTotal_ul {
		overflow: hidden;
	}
	
	.bottomTotal .bottomTotal_ul li {
		float: right;
		padding: 1.7rem 0;
	}
	
	.bottomTotal .bottomTotal_ul .buyNow {
		font-size: 1.7rem;
		color: #333333;
		background: #FFD85A;
		font-family: PingFangSC-Light;
		/* font-weight: bold; */
		float: right;
		padding-right: 3rem;
		padding-left: 3rem;
	}
	
	.bottomTotal .bottomTotal_ul .word {
		font-size: 1.6rem;
		font-weight: bolder;
		float: left;
		padding-left: 1.5rem;
		color: rgba(235, 84, 77, 1);
		font-family: PingFangSC-Light;
	}
	
	.bottomTotal .word .word1 {
		/*font-size:1.2rem;*/
		/*color: #6B6B6B;*/
	}
	
	.bottomTotal .word .word2 {
		/*font-size:1.2rem;*/
		color: #EB544D;
		/*font-family: PingFangSC;*/
	}
	
	.bottomTotal .word .word3 {
		font-size: 1.6rem;
		color: #CC141C;
		/*font-weight: bolder;*/
	}
	
	.mint-popup {
		width: 100%;
	}
	
	.invoicePop {
		width: 100%;
		font-size: 1.1rem;
		padding: 0 0.8rem;
	}
	
	.invoicePop .div1 {
		padding: 1.5rem 0;
		border-bottom: 1px solid #D8D9DB;
		position: relative;
	}
	
	.invoicePop .div1 .finish {
		font-size: 1.4rem;
		position: absolute;
		right: 0;
	}
	
	.invoicePop .div2 {
		padding: 1.5rem 0;
		border-bottom: 1px solid #D8D9DB;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
	
	.invoicePop .font1 {
		font-size: 1.5rem;
		color: #333333;
	}
	
	.invoicePop .div2 .div2_1 {
		font-size: 1.1rem;
		color: #5C5C5C;
	}
	
	.invoicePop .div3 {
		text-align: left;
		padding: 1.5rem 0;
		border-bottom: 1px solid #D8D9DB;
	}
	
	.invoicePop .div3 .div3_2 {
		margin: 1.5rem 0 1.6rem 0;
	}
	
	.invoicePop .div3 .div3_2 .noInvoice {
		margin: 0 5rem 0 1.3rem;
	}
	
	.invoicePop .div3 .div3_2 .spInput.invoiceActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .spInput.personActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .spInput.companyActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .spInput.invoiceActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .spInput.personActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .spInput.companyActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div3 .div3_2 .self {
		margin: 0 5rem 0 1.3rem;
	}
	
	.invoicePop .div3 .div3_2 .self .selfRadio {
		width: 1rem;
		height: 1rem;
	}
	
	input[type='radio'] {
		width: 1rem;
		height: 1rem;
		opacity: 0;
	}
	
	label {
		font-size: 1.2rem;
		color: #333333;
	}
	
	.invoicePop .div3 .enterName {
		padding: 0.9rem 0 0.9rem 1rem;
		font-size: 1.1rem;
		margin-left: 1.3rem;
		background: #F4F4F4;
		width: 86%;
		border-radius: 4px;
	}
	
	.invoicePop .div4 {
		text-align: left;
		padding: 1.5rem 0 2.1rem 0;
	}
	
	.invoicePop .div4 .div4_2 {
		margin-top: 1.5rem;
	}
	
	.invoicePop .div4 .div4_2 .div4_2_1 {
		margin: 0 3.8rem 0 1.3rem;
	}
	
	.invoicePop .div4 .div4_2 .div4_2_2 {
		margin-right: 4.8rem;
	}
	
	.invoicePop .div4 .div4_2 .spInput {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.workingActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.wasteActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.detailActive1 {
		background: url(../../assets/images/radio1.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.workingActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.wasteActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	.invoicePop .div4 .div4_2 .spInput.detailActive2 {
		background: url(../../assets/images/radio2.png) no-repeat center center;
		background-size: 100%;
	}
	
	input::-webkit-input-placeholder {
		color: #939393;
	}
	
	.leaveMsg {
		font-size: 1.3rem;
	}
	
	.diffInvoice {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
		padding: 0.75rem 1.45rem;
		font-size: 1.3rem;
	}
	
	.diffInvoice .invoice1 {
		color: #333;
		font-size: 1.4rem;
		font-family: PingFangSC-Light;
	}
	
	.diffInvoice input {
		width: 27rem;
		text-align: right;
		font-size: 1.3rem;
		font-family: PingFangSC-Light;
		color: #7F7F7F;
	}
	
	.rightriSpan {
		width: 0.6rem;
		height: 1rem;
		float: right;
		margin-left: 0.7rem;
	}
	
	.liuyan {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		color: #7F7F7F;
		font-size: 1.3rem;
		font-family: PingFangSC-Light;
	}
	
	.liuyan span {
		margin-left: 1rem;
	}
	
	.li3 .li3_div1 .originalPrice {
		font-size: 1.3rem;
		color: #939393;
		text-decoration: line-through
	}
	
	.Topminus .icon {
		width: 2.3rem;
		height: 1.3rem;
		font-size: 1rem;
		color: #FACB44;
		border: 1px solid #FACB44;
		border-radius: 2%;
	}
	
	.redMoney {
		color: #333333;
		font-size: 1.4rem;
		/*font-family: PingFangSC;*/
	}
	
	.invoiceAll_coupon {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.diffiIvoiceAll {
		padding-top: 1.4rem !important;
		padding-bottom: 1.4rem !important;
	}
	
	.sure {
		width: 100%;
		background: #F9BE00;
		color: #fff;
		font-size: 1.7rem!important;
		height: 4.4rem!important;
		margin: 0;
		padding: 0;
	}
	
	.orderBk {
		width: 100%;
		height: 0.2rem;
		background: url(../../assets/images/orderBk.png) no-repeat;
		background-size: contain;
	}
	
	.addressLogo {
		width: 3.45rem;
		height: 1.75rem;
		margin-top: 0.3rem;
		margin-right: 2.2rem;
	}
	
	.addressLogo img,
	.addrssText {
		display: block;
	}
	
	.addressLogo img {
		width: 100%;
		/*margin-left: 1.9rem;*/
	}
	
	.fr {
		margin-left: 1.4rem;
		float: none;
	}
</style>
<script>
	import { Toast } from 'mint-ui';
	import { api_get, api_post } from '../../util/api.js'
	import Vue from 'vue'
	export default {
		name: 'order_page',
		data() {
			return {
				transferCost: '',
				invoiceContent: false,
				getOrderParams: '',
				entity: '',
				items: '',
				person: '',
				picked: '',
				company: '',
				leaveMsg: '',
				userId: '',
				addressItems: '',
				defaultAddress: {},
				picked1: '',
				using: '',
				actualMoney: '',
				lastTime: '',
				orderCode: '',
				companyName: '不开发票',
				isShowCompany: true,
				phone1: '',
				phone2: '',
				phone3: '',
				salesNum: '',
				loginCode: '',
				commodityId: '',
				taxerId: '',
				Order: {
					invoiceContent: '',
					invoiceCorporation: '',
					invoiceHead: '',
					leaveMessage: '',
					orderType: 4,
					receiveAddress: '',
					receiveTel: '',
					receiveUsername: '',
					shipCityCode: '',
					shipProvinceCode: '',
					token: this.$route.query.key
				},
				urlRemain: '',
				change_address: '',
				isDefault: 1,
				totalMoney: '',
				isInvoiceActive1: true,
				isPersonActive1: true,
				isCompanyActive1: true,
				isWorkingActive1: true,
				isWasteActive1: true,
				isDetailActive1: true,
				isInvoiceActive2: '',
				isPersonActive2: '',
				isCompanyActive2: '',
				isWorkingActive2: '',
				isWasteActive2: '',
				isDetailActive2: '',
				productTotalAcount: '',
				orderTotalAcount: '',
				fullSingleActivity: [],
				MyOrderAddress: null,
				addIng: true, // 提交订单的时候加的状态，防止多次提交
			}
		},
		mounted() {
			this.getOrderDetail()
			if(this.$route.query.change_address == 1) {
				this.getAddressDefault()
				this.getPreOrderTotalAmount()
			} else {
				this.getAddressDefault().then(_ => {
					this.getPreOrderTotalAmount()
				})
			}
			localStorage.setItem('payRedirct', 1)
		},
		methods: {
			//请求默认收货地址
			getAddressDefault() {
				this.change_address = this.$route.query.change_address
				if(this.change_address == 1) {
					var addressData = JSON.parse(window.localStorage.getItem('addressData'));
					this.defaultAddress.linkman = addressData.linkman

					this.defaultAddress.areaname = addressData.areaname
					// this.defaultAddress.areaCode =addressData.areaName +'-'+ addressData.areaCode.substring(addressData.areaCode.lastIndexOf('-')+1)
					this.defaultAddress.areacode = addressData.areacode
					//                   展示用户订单地址
					this.MyOrderAddress = addressData.areaname + '-' + addressData.street
					//                   展示用户订单地址
					this.defaultAddress.mobile = addressData.mobile
					this.defaultAddress.street = addressData.street
					this.phone1 = addressData.mobile.substring(0, 3)
					this.phone2 = addressData.mobile.substring(3, 7)
					this.phone3 = addressData.mobile.substring(7, 12)
					this.isDefault = addressData.isDefault
				} else {
					let url = HOST_HDPUSER + '/address/getUserTradeAddress'
					this.loginCode = window.localStorage.getItem('loginCode')
					this.userId = window.localStorage.getItem('userId');
					return this.$resource(url).get({
						userId: this.userId
					}).then((response) => {
						if(response.status == 200) {
							var address = response.body.respBody[0];
							this.defaultAddress = address;
							this.phone1 = address.mobile.substring(0, 3)
							this.phone2 = address.mobile.substring(3, 7)
							this.phone3 = address.mobile.substring(7, 12)
							this.isDefault = address.isDefault
							this.MyOrderAddress = address.areaname + "-" + address.street
						}
						//                      
					})
				}
			},
			//获取订单的详情
			getOrderDetail() {
				this.isShowCompany = false
				this.isInvoiceActive1 = false
				this.isInvoiceActive2 = true
				this.isCompanyActive1 = true
				this.isPersonActive1 = true
				this.isPersonActive2 = false
				this.isCompanyActive2 = false
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length)
				this.loginCode = window.localStorage.getItem('loginCode')
				let url = HOST_HDPORDERS + '/order/front/getPreOrder/'
				this.salesNum = window.localStorage.getItem('salesNum')

				this.$resource(url).get({
					key: this.$route.query.key
				}).then((response) => {
					if(response.status == 200) {
						if(response.body.code == 200) {
							this.items = response.body.entity
							for(var i = 0; i < this.items.length; i++) {
								this.items[i].imgUrl = this.items[i].imgUrl.split(',')
								this.items[i].imgUrl = this.items[i].imgUrl[0]
								//                                this.actualMoney = this.items[i].pdQuantity*this.items[i].pdPrice
							}
							this.Order = {
								invoiceContent: '',
								invoiceCorporation: '',
								invoiceHead: '',
								leaveMessage: '',
								orderType: 4,
								receiveAddress: '',
								receiveTel: '',
								receiveUsername: '',
								shipCityCode: '',
								shipProvinceCode: '',
								token: this.$route.query.key
							}
						} else {
							Toast({
								message: response.body.msg,
								position: 'center',
								duration: 3000
							});
						}
					}
				})
			},
			//获取订单的总价格
			getPreOrderTotalAmount() {
				// this.loginCode = window.localStorage.getItem('loginCode')
				// let addressData =  JSON.parse( window.localStorage.getItem('addressData') )
				let url = HOST_HDPORDERS + '/order/front/getPreOrderTotalAmount/';
				let areaCode = this.defaultAddress.areacode.substring(0, 9);
				this.$resource(url).get({
					key: this.$route.query.key,
					version: 'v1.2',
					shipCode: areaCode,
					// userId
				}).then((response) => {
					if(response.body.code === 200) {
						let fullSingleArr = JSON.parse(response.body.entity.fullSingleActivity)
						if(fullSingleArr) {
							let bigestItem = fullSingleArr.reduce((curItem, nextItem) => {
								return curItem.costItem < nextItem.costItem ?
									nextItem :
									curItem
							})
							this.fullSingleActivity.push(bigestItem)
						}
						this.transferCost = response.body.entity.costFreight
						this.productTotalAcount = response.body.entity.productTotalAcount
						this.orderTotalAcount = response.body.entity.orderTotalAcount
					} else {
						Toast({
							message: response.body.msg,
							position: 'center',
							duration: 3000
						});
					}
				})
			},
			//返回
			returnBack() {
				var urlParams = window.location.href; //
				var index = urlParams.indexOf('key')
				var index1 = urlParams.indexOf('?')
				var params = urlParams.slice(index1 + 1, index - 1)
				var shopping = this.$route.query.shopping
				var found_index = this.$route.query.found_index
				if(found_index == 1 && shopping != 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + params + '&enterCount=1'
				} else if(shopping == 1 && found_index != 1) {
					var shoppingBackIndex = urlParams.indexOf('shoppingBack')
					var params1 = urlParams.slice(shoppingBackIndex, urlParams.length + 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?' + params1;
				} else if(found_index == 1 && shopping == 1) {
					var shoppingBackIndex = urlParams.indexOf('shoppingBack')
					var params1 = urlParams.slice(shoppingBackIndex, urlParams.length + 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?' + params1;
				} else if(this.$route.query.shoppingBack == "001") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?shoppingBack=001';
				} else if(this.$route.query.shoppingBack == "004") {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?shoppingBack=004';
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?' + params + '&enterCount=1'
				}
			},
			//取消添加收货地址
			cancel() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail';
			},
			//添加收货地址
			addAddress() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address';
			},
			//开发票
			openInvoice() {
				this.invoiceContent = true
			},
			//选择不开发票
			chooseInvoice() {
				this.picked = 0
				this.isShowCompany = false
				this.isInvoiceActive1 = false
				this.isInvoiceActive2 = true
				this.isCompanyActive1 = true
				this.isPersonActive1 = true
				this.isPersonActive2 = false
				this.isCompanyActive2 = false
			},
			//选个人
			choosePerson() {
				this.picked = 1
				this.isShowCompany = false
				this.isPersonActive1 = false
				this.isPersonActive2 = true
				this.isCompanyActive1 = true
				this.isInvoiceActive1 = true
				this.isCompanyActive2 = false
				this.isInvoiceActive2 = false
			},
			//选公司
			chooseCompany() {
				this.picked = 2
				this.isShowCompany = true
				this.isCompanyActive2 = true
				this.isCompanyActive1 = false
				this.isInvoiceActive1 = true
				this.isPersonActive1 = true
				this.isPersonActive2 = false
				this.isInvoiceActive2 = false
			},
			//选择办公
			chooseWork() {
				this.picked1 = 0
				this.isWorkingActive1 = false
				this.isWorkingActive2 = true
				this.isWasteActive1 = true
				this.isDetailActive1 = true
				this.isWasteActive2 = false
				this.isDetailActive2 = false
			},
			//选择耗材
			chooseWaste() {
				this.picked1 = 1
				this.isWasteActive1 = false
				this.isWasteActive2 = true
				this.isWorkingActive1 = true
				this.isDetailActive1 = true
				this.isWorkingActive2 = false
				this.isDetailActive2 = false
			},
			//选择明细
			chooseDetail() {
				this.picked1 = 2
				this.isDetailActive1 = false
				this.isDetailActive2 = true
				this.isWorkingActive1 = true
				this.isWasteActive1 = true
				this.isWorkingActive2 = false
				this.isWasteActive2 = false
			},
			//开发票点击完成
			finish() {
				this.invoiceContent = false
				this.using = this.picked1
				if(this.picked == 1) {
					this.using = '个人'
					this.companyName = this.taxerId
				} else if(this.picked == 0) {
					this.using = ''
					this.companyName = '不开发票'
				} else if(this.picked == 2) {
					this.companyName = this.company
				}
				if(this.picked1 === 0) {
					this.using = '办公用品'
				} else if(this.picked1 == 1) {
					this.using = '耗材'
				} else if(this.picked1 == 2) {
					this.using = '明细'
				} else if(this.picked1 === '') {
					this.using = ''
					this.companyName = '不开发票'
				}

				if(this.companyName === '' && this.taxerId === '') {
					this.using = ''
					this.companyName = '不开发票'
				}
			},
			//点击收货地址
			changeAddress() {
				if(this.change_address == 1) {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					var index = this.urlRemain.indexOf('change_address')
					this.urlRemain = this.urlRemain.substring(0, index - 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'change_address?' + this.urlRemain
				} else {
					var urlParams = window.location.href; //获取url中"?"符后的字串
					var index = urlParams.indexOf('?')
					this.urlRemain = urlParams.substring(index + 1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'change_address?' + this.urlRemain
				}
			},
			//立即支付
			buyNow() {
				if(!this.addIng) {
					return
				} else {
					this.addIng = false
				}
				//24小时内展厅扫码登录 记录id
				let scanTime = localStorage.getItem('scan-ExhibitionTime')
				let exhibitionId, exhibitionName
				if(scanTime) {
					if((new Date().getTime() - scanTime) / 1000 / 3600 < 24) {
						exhibitionId = localStorage.getItem('scan-exhibitionId');
						exhibitionName = localStorage.getItem('scan-exhibitionName');
					} else {
						localStorage.removeItem('scan-exhibitionId');
						localStorage.removeItem('scan-exhibitionName');
					}
				}
				if(this.picked == 0) {
					this.Order = {
						invoice_taxpayer: this.taxerId,
						shipCode: this.defaultAddress.areacode.substring(0, 9),
						orderType: 4,
						receiveAddress: this.MyOrderAddress,
						receiveTel: this.defaultAddress.mobile,
						receiveUsername: this.defaultAddress.linkman,
						shipCityCode: this.defaultAddress.areacode.substring(0, 9),
						shipProvinceCode: this.defaultAddress.areacode.substring(0, 6),
						token: this.$route.query.key,
						version: 'v1.2',
						terminalType: 2
					}
				} else {
					this.Order = {
						invoice_taxpayer: this.taxerId,
						shipCode: this.defaultAddress.areacode.substring(0, 9),
						invoiceContent: this.picked1,
						invoiceCorporation: this.company,
						invoiceHead: Number(this.picked),
						leaveMessage: this.leaveMsg,
						orderType: 4,
						receiveAddress: this.MyOrderAddress,
						receiveTel: this.defaultAddress.mobile,
						receiveUsername: this.defaultAddress.linkman,
						shipCityCode: this.defaultAddress.areacode.substring(0, 9),
						shipProvinceCode: this.defaultAddress.areacode.substring(0, 6),
						token: this.$route.query.key,
						version: 'v1.2',
						terminalType: 2
					}
				}
				api_post({
					url: HOST_HDPORDERS + '/order/front/addOrder/',
					data: this.Order
				}).then(res => {
					if(res.code == 200) {
						this.actualMoney = res.entity.actualMoney
						this.lastTime = res.entity.lastTime
						this.orderCode = res.entity.orderCode
						var urlParams = window.location.href; //获取url中"?"符后的字串
						var index = urlParams.indexOf('?')
						this.urlRemain = urlParams.substring(index + 1, urlParams.length)
						var shopping = this.$route.query.shopping
						localStorage.setItem('payParams', this.urlRemain + '&lastTime=' + this.lastTime + '&orderCode=' + this.orderCode + '&totalMoney1=' + this.actualMoney)
						if(shopping == 1) {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'first_pay?' + this.urlRemain + '&lastTime=' + this.lastTime + '&orderCode=' + this.orderCode + '&totalMoney1=' + this.actualMoney;
						} else {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'first_pay?' + this.urlRemain + '&lastTime=' + this.lastTime + '&orderCode=' + this.orderCode + '&totalMoney1=' + this.actualMoney;
						}
						// 购物车批量删除接口
						var deleteShoppingId = window.localStorage.getItem('deleteShoppingId')
						let url = HOST_HDPCAR + '/deleteGoodsList/' + deleteShoppingId;

						this.$resource(url).delete({}).then((response) => {
							if(response.status == 200) {
								if(response.body.code == 200) {}
							}
						})
					} else if(res.code == '-4') {
						Toast({
							message: res.msg,
							duration: 2000
						});
					} else if(res.code == '-5') {
						//未下过单的用户提示
						Toast({
							message: res.msg,
							duration: 2000
						});
					} else {
						Toast({
							message: res.msg,
							position: 'center',
							duration: 3000
						});
					}
					this.addIng = true
				})
			}
		}
	}
</script>