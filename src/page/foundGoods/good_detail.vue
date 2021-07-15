<template>
	<div class="good_detail" v-bind:class="{over:this.popupVisible1 || this.popupVisible2 || this.popupSale || this.popupParameter}">
		<div class="header">
			<img @click="returnBack" class="returnPic" src="../../assets/images/returnFront1.png">
			<span class="good" @click="clickGood" :class="{ activeGood: isActive }" >
		        商品
		    </span>
			<span class="detail" @click="clickDetail" :class="{ activeGood: !isActive }" > 
		        详情
		    </span>
			<!--<span class="sharePic">
		        <img v-show="!isCollection" @click="addCollection" src="../../assets/images/collect_normal.png">
		        <img v-show="isCollection" @click="deleteCollection" src="../../assets/images/collectionGoodsOk.png">
		        <img @click="shareAccount" src="../../assets/images/share2x.png">
		    </span>-->
		    
		    <!--修改商品信息头部-->
		    <span class="sharePic">
		        <span class="sousuo"><img @click="searchNo()" src="../../assets/images/search-icon1.png" alt=""></span>
		        <span class="returnHome"><img @click="backHome()" src="../../assets/images/returnHome.png"></span>
		        <!--<img @click="shareAccount" src="../../assets/images/share2x.png">-->
		    </span>
		    
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="bdsharebuttonbox" data-tag="share_1">
				<div class="shareList">
					<ul class="shareList_ul">
						<li class="li1">
							<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
						</li>
						<li class="li2">
							<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
						</li>
						<li class="li3">
							<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
						</li>
						<li class="li4">
							<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
						</li>
					</ul>
					<div class="cancel" @click="shutDown"><img src="../../assets/images/shutDown.png" alt=""></div>
				</div>
			</div>
		</mt-popup>
		<div class="goodTab" ref="largePic" id="product" name="product">
			<div class="goodPic" id="goodPic">
				<div class="goodPicSon">
					<mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
						<mt-swipe-item v-for="(pic,index) in pics">
							<img :src='pic' alt="" v-if="index==0 && defaultFirst" @click="enlargePic">
							<img src='' alt="" class="checkLastPic" @click="enlargePic" :data-original='pic'>
						</mt-swipe-item>
					</mt-swipe>
					<span class="lunboBottom">
		               	<span class="lunboNum1">
		                   {{lunboPicIndex}}
		                </span>
						<span class="lunboNum2">
		                    /
		                </span>
						<span class="lunboNum1">
		                    {{ lunboPicToal }}
		                </span>
					</span>					
					<div style="position: absolute;overflow: hidden;bottom: 0rem; width: 100%;"><img src="../../assets/images/touying@2x.png" alt="" /></div>					
				</div>
			</div>
			
			<!-- 限时购 -->
			<div class="limitedBanner clearfix" v-show="showLimited" @click="jumpLimit(2)">
				<div class="bannerL"><span class="bannerTxt">限时秒杀</span><span>抢购中</span></div>
				<div class="bannerR">离结束还剩
					<last-time :lastTime="timeStamp" :handle="timeEndEvent" endTimeWord=" "></last-time>
				</div>
			</div>
			<!-- 秒杀预告 -->
			<div class="advanceBanner clearfix" @click="jumpLimit(1)" v-show="advanceShow">
				<div class="bannerL"><span class="bannerTxt">秒杀预告</span><span class="bannerPrice">￥{{advancdPromotionPrice}}</span></div>
				<div class="bannerR"><span>{{promotionBeginTime}}开抢</span><i class="leftIcon"></i></div>
			</div>
			<div class="isLargePicWrap" v-if="isLargePic">
				<mt-swipe :auto="0">
					<mt-swipe-item v-for="pic in pics">
						<img :src=pic alt="">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="isBigPopWrap" v-if="isBigPop" @click="clickPop">
			</div>
			<!--价格部分-->
			<div class="goodTitle">
				<!--标题-->
				<div class="titleName">{{ goodDetail.name }}</div>
				<!--副标题-->
				<div  class="subName" v-if="goodDetail.subName != null">{{ goodDetail.subName }}</div>
				<!--价格显示-->
				<div v-if='goodDetail.isPromotion' class="originalSale">
					<span class="span1">￥{{ goodDetail.promotionPrice }}</span>
					<span class="span2">￥{{ goodDetail.salesPrice}}</span>
				</div>
				<div v-if='!goodDetail.isPromotion'  class="originalSale">
					<span class="span1">￥{{ goodDetail.salesPrice }}</span>
					<span class="span2" v-if=" goodDetail.selfStaffPrice != null && goodDetail.selfStaffPrice != ''">￥{{ goodDetail.selfStaffPrice }}
						<span class="VIP" style=" color: #fff;"><img src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /></span>
					</span>
				</div>
				<!--市场价-->
				<div class="marketPrice">
					<span v-if="goodDetail.selfExternalName == '' || goodDetail.hdpPromotionPrice != ''">市场价</span>
					<span v-else>{{ goodDetail.selfExternalName }}</span>
					<span v-if="goodDetail.hdpPromotionPrice != null ">￥{{ goodDetail.hdpPromotionPrice}} </span>
					<span v-else>￥{{ goodDetail.selfExternalPrice }} </span>
					<div class="fr">月销 <span>{{ goodDetail.salesNum }}</span></div>
				</div>
				<!--注册会员-->
				<div  v-if="this.userType != 1" class="isUser">
					<span class="user_span1"><img class='img1' src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /></span>
					<span class="user_span2">完善个人信息，免费体验好单品会员</span>
					<span @click="goLogin()"> <img class='img2' src="../../assets/images/返回@2x.png" alt="" /> </span>
				</div>
				<!--<ul>
					
					<li  class="li3 clearfix clearfix2" v-if="this.userType == 0" style="margin: 1.3rem auto;">
						<span><img src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /></span>
						<span>完善个人信息，免费体验好单品会员</span>
						<span @click="goLogin()"> <img src="../../assets/images/返回@2x.png" alt="" /> </span>
					</li>
				</ul>-->
				<div class="promotionManMinus" v-if='promotionActivity !=null'>
					<div class="div1" @click="chooseWhichSale">
						<div class="left" v-for="(item,index) in promotionActivity" :key="index">
							<div>
								<span class="icon" v-if="(item.saleType==1 || item.saleType==2) && item.salesLable == '单品促销'">
		                            促销
		                        </span>
								<span class="icon" v-if="(item.saleType==1 || item.saleType==2) && item.salesLable == '限时秒杀'">
		                            秒杀
		                        </span>
								<span v-if="item.staticPurchaseQuantity >0 " class="word">
		                           限购{{item.staticPurchaseQuantity}}件
		                        </span>
								<span v-if="item.saleType==1 && item.staticPurchaseQuantity <=0 && item.salesLable == '单品促销'" class="word">
		                           促销活动期间每件打{{ item.discount }}折
		                        </span>
								<span v-if="item.saleType==2 && item.staticPurchaseQuantity <=0 && item.salesLable == '单品促销' " class="word">
		                           促销活动期间每件优惠{{ item.lessCash }}元
		                        </span>
								<span v-if="item.saleType==1 && item.staticPurchaseQuantity <=0 && item.salesLable == '限时秒杀'" class="word">
		                           秒杀活动期间每件打{{ item.discount }}折
		                        </span>
								<span v-if="item.saleType==2 && item.staticPurchaseQuantity <=0 && item.salesLable == '限时秒杀' " class="word">
		                           秒杀活动期间每件优惠{{ item.lessCash }}元
		                        </span>
							</div>
							<div>
								<span class="icon" v-if="item.saleType==3 || item.saleType==4 || item.saleType==5 || item.saleType==6 ">
		                            满减
		                        </span>
								<span v-if="item.saleType==3" class="word">
		                            订单满{{ item.howYuan }}元减{{ item.fullLessCash }}元
		                        </span>
								<span v-if="item.saleType==4" class="word">
		                            订单满{{ item.howYuan}}元打{{ item.fullDiscount }}折
		                        </span>
								<span v-if="item.saleType==5" class="word">
		                            订单满{{ item.howPiece }}件减{{ item.fullLessCash }}元
		                        </span>
								<span v-if="item.saleType==6" class="word">
		                            订单满{{ item.howPiece }}件打{{ item.fullDiscount }}折
		                        </span>
							</div>
							<div class="right" v-if="index==0">
								<img src="../../assets/images/rightThreeDot.png" alt="">
							</div>
						</div>
					</div>
				</div>				
				<!--产品参数-->
				<!--<div class="parameters" @click="popupParameter = true">
					<div class="left">产品参数</div>
					<div class="right">
						<img src="../../assets/images/rightThreeDot.png">
					</div>
				</div>-->
			</div>
			
			<div class="grayLine" v-if="ispinlun"></div>
			<!--    用户评论    -->
			<div class="goodComment" v-if="ispinlun">
				<div class="head">
					<p class="head-left">
						<span class="comments">用户评价</span>
						<span class="commentNum"> ({{detailNum.total}})</span>
					</p>
					<p class="header-right" v-if="userType == 0 && detailNum.total != 0">
						<span class="checMore2" @click="checkMore">查看更多
						<img src="../../assets/images/choose.png" alt="" /></span>
					</p>
					<p class="header-right" v-else >
						<span  class="checMore2 checMore22" @click="checkMore">查看更多 
						<img src="../../assets/images/返回2 拷贝 7.png" alt="" /></span>
					</p>
				</div>
				<div class="xian"></div>
				<ul>
					<li v-for="item in list">
						<div class="first1">
							<div class="timex">
								<span class="goodCommenterPic" v-if="item.userImg !=null ">
				                    <img :src="item.userImg" alt=""  >
				                </span>
				                <span class="goodCommenterPic" v-if="item.userImg ==null ">
				                    <img src="../../assets/images/default_icon@2x.png" alt="" />
				                </span>
								<span class="goodCommentName" v-if="item.nickname != null">
				                    {{item.nickname}}
				                </span>
				                <span class="goodCommentName" v-if="item.nickname == null">
				                    暂无用户名
				                </span>
				                <span class="imgV" v-if="userType == 1">
				                		<img src="../../assets/images/v@2x.png"/>
				                </span>
							</div>
							<div class="time">
								{{item.createTime}}
							</div>
						</div>
						<div class="first2">
							{{item.commentContent}}
						</div>
					</li>
				</ul>
			</div>
			<!--<div v-if="detailNum.total != 0" class="checMore" @click="checkMore">
				查看更多
			</div>-->
			<!--<div v-if="detailNum.total == 0" class="checMore">
				<img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem">
			</div>-->
			
			<!--<div class="checMore checMore1">商品详情</div>-->						
		</div>
		<div class="grayLine"></div>
		<div class="detailTab" id="productDetail" name="productDetail">
			<!--图文详情-->					
			<div class="checMore checMore1" v-if="this.userType == 0  || userType == null"><img src="../../assets/images/详情@2x.png" alt="" /></div>
			<div class="checMore checMore1"  v-else ><img src="../../assets/images/详情2@2x.png" alt="" /></div>
						
			<!--产品参数-->
				<div class="parameterBody">
					<div class="proParamContent" >
						<div v-if="!noPicParams">
							<ul class="proParamContent_ul">
								<li v-for="proParameter in proParameters" :class="{ 'longLi': proParameter.typeid }" v-show="proParameter.units">
									<span class="name">{{ proParameter.name }} </span>
									<span class="nameContent" >{{ proParameter.units}}</span>
									<!--<div class="div1">
										<span class="longSpan" v-show="proParameter.typeid" v-for="sub in proParameter.detail">
											<span v-if="sub.checked =='checked'">
												{{ sub.detail }}
											</span>
										</span>
									</div>-->
								</li>
							</ul>
						</div>
						<div v-if="noPicParams" class="cryBaby">
							<div class="div1">
								<div class="noPicParams">
									<img src="../../assets/images/ren@2x.png" alt="">
								</div>
								<div class="paramWord">
									暂无产品参数
								</div>
							</div>
						</div>
					</div>
				</div>
								
				<!--产品参数-->
				<div class="proParamContent" v-show="!isPicParam">
					<div v-if =' !noPicParams'>
						<ul class="proParamContent_ul" >
							<li v-for="proParameter in proParameters" :class="{ 'longLi': proParameter.typeid }"
								v-if="proParameter.detail != '' || proParameter.userdata!='' || proParameter.detail != null || proParameter.userdata != null">
								<span class="name">{{ proParameter.name }}</span>
								<span class="nameContent" v-if="!proParameter.typeid">{{ proParameter.userdata }} </span>
								<div class="div1">
									<span class="longSpan" v-show="proParameter.typeid" v-for="sub in proParameter.detail">
			                            <span v-if="sub.checked =='checked'">
			                                {{ sub.detail }}
			                            </span>
									</span>
								</div>
							</li>
						</ul>
						<div class="bottomImg">
							<img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem">
						</div>
					</div>
					<div v-if= noPicParams class="cryBaby">
						<div class="div1">
							<div class="noPicParams">
								<img src="../../assets/images/ren@2x.png" alt="">
							</div>
							<div class="paramWord">
								暂无产品参数
							</div>
						</div>
					</div>
				</div>
				
				<div class="picParamContent" v-show="isPicParam">
			        <div class="picAll" v-if='!noPicParams0 '>
			          <ul>
			            <li v-html="PicTextDetail">
			            </li>
			          </ul>
			          	<!--<div class="bottomImg">-->
			            		<!--<img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem">-->
			            <!--</div>-->
			        </div>
			        <div v-if=noPicParams0 class="cryBaby">
		            <div class="div1">
			            <div class="noPicParams">
			                <img src="../../assets/images/noSearch.png" alt="">
			            </div>
		            </div>
			    </div>
				
			</div>
		</div>
		
		<div class="grayLine bottomLine"></div>
		<!-- 推荐模块 开始 -->
		<div class="recommended">
			<div class="recommendedTitle" v-if="this.userType == 0  || userType == null">
				<img src="../../assets/images/推荐@2x.png">
			</div>
			<div class="recommendedTitle" v-else >
				<img src="../../assets/images/推荐1@2x.png">
			</div>
			<!--修改商品推荐-->
			<div class="fresh_goods" >
		        <div class="goods fl" v-for='(item,index) in recommendGoods' :key='index' @click="enterRecommendedGoodDetail(item)">
					<div class="fresh_goods_icon">
						<img :src="item.pic" alt="">
						<!--<p>{{item.subTitle}}</p>-->
						<div class="mask mask1" v-if="item.fullReduction != null && item.fullReduction != ''">{{ item.fullReduction }}</div>
						<div class="mask mask1" v-else-if="item.moneyOff != null && item.moneyOff != ''">{{ item.moneyOff }}</div>
						<div class="mask" v-else-if="item.subName!= null && item.subName!= ''">{{item.subName}}</div>
						<div class="mask" v-else>企业采购就在好单品</div>
					</div>
					<div class="fresh_goods_text">
						{{item.name}}
					</div>
					<div class="fresh_goods_m" v-if="item.isPromotion !=0 ">
						<span>¥<b>{{item.promotionPrice}}</b></span>
						<span style="text-decoration: line-through; color: #747474;">¥<b>{{item.salesPrice}}</b></span>
					</div>					
					<div class="fresh_goods_m" v-else-if="userType == 0 || userType == null">
						<span>¥<b>{{item.salesPrice}}</b></span>
					</div>
					<div class="fresh_goods_m" v-else="userType == 1">
						<span style="color: #C1AA72;">¥<b>{{item.salesPrice}}</b></span>
					</div>
				</div>
 			</div>			
		</div>
		
		<!--  底部页面的收藏，客服，购物车部分   -->
		<div class="goods_trade" v-if="isTrade === 0">商品已经下架啦~</div>
		<div class="detailBottomTab">
			
			<ul>
				<li class="li2" :class="{ active: isExhibition }">	
					<span class="sharePic pic">
				        <img v-show="!isCollection" @click="addCollection" src="../../assets/images/collect_normal@2x.png">
				        <img v-show="isCollection && userType != 1" @click="deleteCollection" src="../../assets/images/collectionGoodsOk.png">		
				        <img v-show="isCollection && userType == 1" @click="deleteCollection" src="../../assets/images/collect_selecetd@2x.png">	
				    </span>
					<span>收藏</span>				
				</li>
				
				
				<li class="li1" @click="enterService">
					<span class="pic"><img src="../../assets/images/serviceIcon.png" alt=""></span>
					<span>客服</span>
				</li>
				<!--<li class="li2" :class="{ active: isExhibition }" @click="enterExhibition">
					<span class="pic"><img src="../../assets/images/zhantingIcon.png" alt=""></span>
					<span>展厅</span>
				</li>-->				
				<li class="li2" :class="{ active: isExhibition }" v-if="isHaveGood" @click="picAddCar" >	
					<span class="sharePic pic pic1">
				        <img src="../../assets/images/shopping01.png">			        
				    </span>
					<span>购物车</span>				
				</li>
				
				<li class="li3" @click="addShoppingCart()" v-show="isHaveGood">
					加入购物车
				</li>
				<li class="li4" @click="buyNow" v-show=" isHaveGood && userType != 1">
					立即购买
				</li>
				<li class="li4 li44" @click="buyNow"  v-show=" isHaveGood && userType == 1" style=" background:rgba(193,170,114,1); color: #fff;">
					立即购买
				</li>
				<li class="li5" v-show="!isHaveGood" @click="releasePurchase">
					暂无货，发布采购需求
				</li>
				<!--<li class="li6" v-show="isTrade==0">
		          	此商品已下架
		        </li>-->
			</ul>
		</div>
		<mt-popup v-model="popupVisible1" position="bottom">
			<!--商品规格-->
			<div class="buyWhat">
				<div class="top">
					<div class="topPic">
						<span class="pic"><img :src=pics[0] alt=""></span>
					</div>
					<ul class="topWord">
						<li class="li1">
							<span class="price">
                    				<span class="priceNum" v-if=!goodDetail.isPromotion>￥{{ goodDetail.salesPrice }}</span>
                    				<span class="priceNum">{{ goodDetail.promotionPrice }}</span>
								<strong v-if="goodDetail.isPromotion">
									<!--参加秒杀活动的售价-->
									<span class="originalPrice"  style="color: #666666; text-decoration: line-through;">￥{{ goodDetail.salesPrice }}</span>
								</strong>	
								
								<template v-if="!goodDetail.isPromotion && goodDetail.selfStaffPrice != '' && goodDetail.selfStaffPrice != null">
									<strong class="clearfixVIP">
										<span class="originalPrice" >￥{{ goodDetail.selfStaffPrice }}</span>
										<span class="VIP" style=" color: #fff;"><img src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /></span>
									</strong>	
								</template>
								
							</span>
							<div class="showDownCart" @click="showDownCart1">
								<img src="../../assets/images/shutDownCart.png" alt="">
							</div>
						</li>
						<li class="li3">
							<span class="stock">
		                    		库存
			                    <span class="stockNum">
			                        {{ storeNum }}
			                    </span> 件
							</span>
						</li>
						<li class="li2">
							<span>
			                    <span v-show="showChoosePinPai">
			                        请选择品种
			                    </span>
								<span >
			                        已选择:
				                    <span v-show="!showChoosePinPai">
				                        {{ transmitCartStandard }}
				                    </span>
								</span>
							</span>
						</li>
					</ul>
				</div>
				<div class="center">
					<div class="variety">
						<p class="variety_p">品种</p>
						<ul class="variety_ul"   v-if="userType != 1"   @touchmove.stop>
							<li @click="chooseStandarNowBuy(item,index)" v-for="(item,index) in items1" :class="{ 'active': index === selected }" 
								v-if=" item.Standard == ''">
								默认规格
							</li>
							<li @click="chooseStandarNowBuy(item,index)" v-for="(item,index) in items1" :class="{ 'active': index === selected }" 
								v-if="item.Standard !=''">
								{{ item.Standard }}
							</li>
						</ul>
						<ul class="variety_ul"  v-if="userType == 1"  @touchmove.stop>
							<li @click="chooseStandarNowBuy(item,index)" v-for="(item,index) in items1" :class="{ 'active1': index === selected }" 
								v-if=" item.Standard == ''">
								默认规格
							</li>
							<li @click="chooseStandarNowBuy(item,index)" v-for="(item,index) in items1" :class="{ 'active1': index === selected }" 
								v-if=" item.Standard != ''">
								{{ item.Standard }}
							</li>
						</ul>
					</div>
					<div class="quantity">
						<div class="quantityNum">数量</div>
						<div v-if='maxNum != 0'>可购{{maxNum}}件</div>
						<div class="quantityCalculate">
							<button class="minus" @click="minus" :disabled="isDisabled"></button>
							<input type="text" pattern="[0-9]*" class="num"  v-model="num" @input="checkNumIsZero" @focus="numInputFocus" >
							<button class="add" @click="add" :disabled="addIsDisabled"></button>
						</div>
					</div>
				</div>
				<!--<mt-button v-show="isNumInputBlur" type="default" class="numInputComplete" @click="numInputComplete">完成</mt-button>-->
				<mt-button v-show=" userType != 1 " type="default" class="sure" @click="sureOrderBuyNow">确定</mt-button>
				<mt-button v-show=" userType == 1" type="default" class="sure sure11" @click="sureOrderBuyNow">确定</mt-button>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisible2" position="bottom">
			<!--选择商品规格-->
			<div class="buyWhat">
				<div class="top">
					<div class="topPic">
						<span class="pic"><img :src=pics[0] alt=""></span>
					</div>
					<ul class="topWord">
						<li class="li1">
							<span class="price">
								<span class="priceNum" v-if=!goodDetail.isPromotion>￥{{ goodDetail.salesPrice }}</span>
							<!--<span class="price" v-if=" goodDetail.salesPrice != null"><span class="priceNum">￥{{ goodDetail.salesPrice }}</span></span>-->
								<span class="priceNum">{{ goodDetail.promotionPrice }}</span>
								
								<strong v-if="goodDetail.isPromotion">
									<!--参加秒杀活动的优惠价-->
									<span class="originalPrice"  style="color: #666666; text-decoration: line-through;">￥{{ goodDetail.salesPrice }}</span>
								</strong>	
								<template v-if="!goodDetail.isPromotion && goodDetail.selfStaffPrice != '' && goodDetail.selfStaffPrice != null">
									<strong class="clearfixVIP">
										<span class="originalPrice" >￥{{ goodDetail.selfStaffPrice }}</span>
										<span class="VIP" style=" color: #fff;"><img src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /></span>
									</strong>	
								</template>
							</span>
							<div class="showDownCart" @click="showDownCart2">
								<img src="../../assets/images/shutDownCart.png" alt="">
							</div>
						</li>
						<li class="li3">
							<span class="stock">库存<span class="stockNum"> {{ storeNum }} </span> 件 </span>
						</li>
						<li class="li2">
							<span >
			                    <span v-show="showChoosePinPai">
			                        请选择品种
			                    </span>
								<span >
									已选择:
				                    <span v-show="!showChoosePinPai">
				                        {{ transmitCartStandard }}
				                    </span>
								</span>
							</span>
						</li>
					</ul>
				</div>
				<div class="center">
					<div class="variety" >
						<p class="variety_p">品种</p>
						<ul class="variety_ul" v-if="userType != 1">
							<li @click="chooseStandardCard(item,index)" v-for="(item,index) in items1" :key="index" :class="{ 'active': index === selected }" 
								v-if="item.Standard == '' ">
								默认规格
							</li>
							<li @click="chooseStandardCard(item,index)" v-for="(item,index) in items1" :key="index" :class="{ 'active': index === selected }" 
								v-if="item.Standard != ''">
								{{ item.Standard }}
							</li>
						</ul>
						<ul class="variety_ul" v-if="userType == 1">
							<li @click="chooseStandardCard(item,index)" v-for="(item,index) in items1" :key="index" :class="{ 'active1': index === selected }" 
								v-if="item.Standard == ''">
								默认规格
							</li>
							<li @click="chooseStandardCard(item,index)" v-for="(item,index) in items1" :key="index" :class="{ 'active1': index === selected }" 
								v-if="item.Standard != ''">
								{{ item.Standard }}
							</li>
						</ul>
					</div>
					<div class="quantity">
						<div class="quantityNum">数量</div>
						<div v-if='maxNum != 0'>可购{{maxNum}}件</div>
						<div class="quantityCalculate">
							<button class="minus" @click="minus" :disabled="isDisabled"></button>
							<input type="text" pattern="[0-9]*" class="num" v-model="num" @input="checkNumIsZero" @focus="numInputFocus">
							<button class="add" @click="add" :disabled="addIsDisabled"></button>
						</div>
					</div>
				</div>
				<!--<mt-button v-show="isNumInputBlur" type="default" class="numInputComplete" @click="numInputComplete">完成</mt-button>-->
				<mt-button v-show=" userType != 1" type="default" class="sure" @click="sureOrderAddCart">确定</mt-button>
				<mt-button v-show=" userType == 1" type="default" class="sure sure11" @click="sureOrderAddCart">确定</mt-button>
			</div>
		</mt-popup>
		<mt-popup v-model="popupSale" position="bottom">
			<div class="buyWhat sale_pop" v-if=promotionActivity>
				<div class="sale_div1">
					<ul class="div1_ul" v-for="(item,index) in promotionActivity" :key="index">
						<li class="li1">
							<span class="icon" v-if="(item.saleType==1 || item.saleType==2) && item.salesLable == '单品促销'">
                              促销
                          </span>
							<span class="icon" v-if="(item.saleType==1 || item.saleType==2) && item.salesLable == '限时秒杀'">
                              秒杀
                          </span>
							<span v-if="item.saleType==1">
                              每件打{{ item.discount }}折
                          </span>
							<span v-if="item.saleType==2">
                              每件优惠{{ item.lessCash }}元
                          </span>
							<span class="icon" v-if="item.saleType==3 || item.saleType==4 || item.saleType==5 || item.saleType==6 ">
                              满减
                          </span>
							<span v-if="item.saleType==3">
                              订单满{{ item.howYuan }}元减{{ item.fullLessCash }}元
                          </span>
							<span v-if="item.saleType==4">
                             订单满{{ item.howYuan }}元打{{ item.fullDiscount }}折
                          </span>
							<span v-if="item.saleType==5">
                             订单满{{ item.howPiece }}件减{{ item.fullLessCash }}元
                          </span>
							<span v-if="item.saleType==6">
                              订单满{{ item.howPiece }}件打{{ item.fullDiscount }}折
                          </span>
						</li>
						<li class="li2" v-if="item.saleType==1" :class="{saleFirst: index == 1 || promotionActivity.length == 1}">
							该商品活动期间每件商品
							<span>{{ item.discount }}</span>折销售；
							<span v-if="item.staticPurchaseQuantity > 0 ">
                              活动期间每位用户限购
                               <span>{{item.staticPurchaseQuantity}}</span>件
							</span>
						</li>
						<li class="li2" v-if="item.saleType==2" :class="{saleFirst: index == 1 || promotionActivity.length == 1}">
							该商品活动期间每件商品减
							<span>{{ item.lessCash }}</span>元 ；
							<span v-if="item.staticPurchaseQuantity > 0">
                              活动期间每位用户限购
                               <span>{{item.staticPurchaseQuantity}}</span>件
							</span>
						</li>
						<li class="li2" v-if="item.saleType==3" :class="{saleFirst: index == 1 || promotionActivity.length == 1}">
							该商品参与满单促销活动，订单满
							<span>{{ item.howYuan }}</span>元 减{{ item.fullLessCash }}元
						</li>
						<li class="li2" v-if="item.saleType==4" :class="{saleFirst: index == 1 || promotionActivity.length == 1}">
							该商品参与满单促销活动，订单满
							<span>{{ item.howYuan }}</span>元 打{{ item.fullDiscount }}折
						</li>
						<li class="li2" v-if="item.saleType==5" :class="{saleFirst: index == 1 || promotionActivity.length == 1}">
							该商品参与满单促销活动，订单满
							<span>{{ item.howPiece }}</span>件 减{{ item.fullLessCash }}元
						</li>
						<li class="li2" v-if="item.saleType==6" :class="{saleFirst: index == 1 ||  promotionActivity.length == 1}">
							该商品参与满单促销活动，订单满
							<span>{{ item.howPiece }}</span>件 打{{ item.fullDiscount }}折
						</li>
					</ul>
				</div>
				<mt-button type="default" class="sure" @click="shutDownPopSale">完成</mt-button>
			</div>
		</mt-popup>
		<!-- 产品参数弹出框 -->
		<!--<mt-popup v-model="popupParameter" position="bottom">
			<div class="parameterHead">产品参数
				<img src="../../assets/images/close.png" class="close" @click="popupParameter = false" alt="">
			</div>
			<div class="parameterBody">
				<div class="proParamContent">
					<div v-if='!noPicParams'>
						<ul class="proParamContent_ul">
							<li v-for="proParameter in proParameters" :class="{ 'longLi': proParameter.typeid }">
								<span class="name">{{ proParameter.name }}...</span>
								<span class="nameContent" v-show="!proParameter.typeid">{{ proParameter.userdata }}</span>
								<div class="div1">
									<span class="longSpan" v-show="proParameter.typeid" v-for="sub in proParameter.detail">
                        <span v-if="sub.checked =='checked'">
                            {{ sub.detail }}
                        </span>
									</span>
								</div>
							</li>
						</ul>
					</div>
					<div v-if='noPicParams' class="cryBaby">
						<div class="div1">
							<div class="noPicParams">
								<img src="../../assets/images/noSearch.png" alt="">
							</div>
							<div class="paramWord">
								暂无产品参数
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <mt-button type="default" class="sureBtn" @click="popupParameter = false">确定</mt-button> -->
		<!--</mt-popup>-->
				
		<!--取消右侧固定的购物车，更换为回到顶部按钮-->
		<!--<div class="picAddCar" v-show="isHaveGood" @click="picAddCar" :class="{ 'active': isFinishAdd, 'initPicAddCarClass': initPicAddCar }">
			<img src="../../assets/images/gouwuche_nor@2x.png" alt="">
		</div>-->
		
		<!--添加回到顶部功能-->
		<div class="picAddCar" @click="backtop" :class="{ 'active': isFinishAdd, 'initPicAddCarClass': initPicAddCar }" >
			<img src="../../assets/images/icon_zhiding@2x.png" alt="">
		</div>
		
		
		<div class="rotateToCart" v-show="showRotatePic" :class="{ 'active': isClickAddCart ,'initRotateToCartClass':initRotateToCart }">
			<img src="../../assets/images/addRotate.png" alt="">
		</div>
		<div class="showSharePic" v-show="showWeChatShareTitle">
			<img src="../../assets/images/guide1.png" alt="">
		</div>
		<div class="showSharePop" v-show="showWeChatShareTitle" @click="shutDownWeChat">
		</div>
		<!--收藏与取消收藏toster start-->
		<div class="appointment-alert" v-if="collectionAlert">
			<img src="../../assets/images/error.png" class="appointment-img" v-if="collectionImg">
			<img src="../../assets/images/adopt.png" class="appointment-img" v-if="!collectionImg">
			<div class="alert-words" v-if="collectionWords">取消收藏成功</div>
			<div class="alert-words" v-if="!collectionWords">收藏成功</div>
		</div>
		<!--收藏与取消收藏toster end-->
		<!-- <activityBox></activityBox> -->
	</div>
</template>
<style>
	.fresh_goods .fresh_goods_m{
		color: #EB544D;
		/*font-family: PingFangSC-Light;*/
	}
	.goodTitle{
		/*margin-top: 1.5rem;*/
		padding:0 1.5rem;
		text-align:left;
	}
	.goodTitle .originalSale .span1{
		display:inline-block;
		font-size:1.8rem;
		font-family:PingFangSC-Light;
		color:rgba(218,94,84,1);
		line-height:1.8rem;
	}
	.goodTitle .originalSale .span2{
		display:inline-block;
		font-size:1.3rem;
		font-family:PingFangSC-Light;
		color:rgba(193,170,114,1);
		line-height:1.3rem;
	}
	.goodTitle .originalSale .VIP{
		width:2rem;
		height:1rem;
	}
	.goodTitle .isUser{
		margin:1rem 0rem;
		width:34.4rem;
		height:3.2rem;
		line-height: 3.2rem;
		background:rgba(250,248,240,1);
		border-radius:0.5rem;
		font-size:1.2rem;
		font-family:PingFangSC-Light;
		color:rgba(193,170,114,1);
		position: relative;
		overflow: hidden;
	}
	.goodTitle .isUser .user_span2{
		position: absolute;
    		left: 4rem;
	}
	.goodTitle .isUser .img1{
		width:2.4rem;
		height:1.25rem;
		/*margin: 1rem 0.5rem 0 0.8rem;*/
		position: absolute;
	    top: 1rem;
	    left: 1rem;
	    right: 1rem;
	}
	.goodTitle .isUser .img2{
		width:1rem;
		height:1rem;
		position: absolute;
	    left: 24rem;
	    top: 1.1rem;
	}
	.goodTitle .marketPrice{
		margin-top:1.2rem;
		height:1.15rem;
		font-size:1.2rem;
		font-family:PingFangSC-Light;
		color:rgba(153,153,153,1);
		line-height:1.25rem;
		margin-bottom: 1.2rem;
	}
	.goodTitle .marketPrice div{
		float: right;
	}
	.goodTitle .clearfix2{
		margin: 1.5rem auto;
	}
	.fresh_goods .fresh_goods_text{
		height: 1.6rem;
		font-size: 1.3rem;
		font-family: PingFang SC;
		font-weight: Light;
		margin-top: 1.5rem;
	}
	.addIndex {
		position: absolute;
		z-index: 99999;
		border-radius: 6%;
	}
	
	.v-modal {
		opacity: 0.3;
	}
	
	.mint-toast {
		/* z-index: 99999 !important;
      padding:20px !important; */
	}
	
	.mint-popup .mint-popup-bottom {
		opacity: 0.8 !important;
		background: #000;
	}
	
	.mint-button {
		border: 0 !important;
	}
	
	.mint-indicator-wrapper {
		z-index: 9999;
	}
	
	.mint-swipe-indicators {
		display: none !important;
		left: auto !important;
		right: 0.8rem !important;
	}
	
	.mint-spinner-snake {
		bottom: 48px !important;
		left: -1.2rem !important;
	}
	
	body .picAll img {
		display: block;
		width: 100%;
	}
	
	.detailToast {
		width: 11.5rem;
		/* !important */
		height: 5.4rem;
		display: flex;
		align-items: center;
		font-size: 1.5rem;
		border-radius: 0.5rem !important;
		top: 76% !important;
		opacity: 0.7;
		filter: alpha(opacity=70);
	}
</style>
<style scoped>
	.quantityNum{
		position: relative;
    		left: 0.5rem;
    		font-size:1.5rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
	}
	.text-danger{
		background: red;
	}
	.active{
		/*background: yellow;*/
	}
	.picAll li:first-child{
		font-size: 1.2rem;
	    text-align: left;
	    line-height: 1.8rem;
	    color: #666;
	    font-family: PingFang SC;
	    text-align: center;
	    /*margin: 0 0.3rem;*/
	}
	
	.fr{
		color: #999999;
		font-size: 1.2rem;
	}
	
	/*添加样式*/
	.clearfix2{
	    width: 100%;
	    background: #faf8ef;
	    height: 3rem !important;
	    line-height: 3rem !important;
	    margin-bottom: 1rem;
	    border-radius: 0.4rem;
	    padding-left: 1rem;
	    overflow: hidden;
	}
	.clearfix2 span{
		float: left;
		color: #C1AA72;
		margin-right: 1rem;
		font-family: PingFangSC-Light;
		font-weight: Light;
	}
	
	.clearfix2 span:first-child{
		display: inline-block;
	    width: 2.8rem;
	    height: 1.5rem;
	    line-height: 1.5rem;
	    margin-top: 0.8rem;
	    text-align: center;
	    /* border: 1px solid red; */
	    background: #d9a470;
	    font-weight: 600;
	    color: #fff;	    
	}
	.clearfix11 .fl1{
		color: #b8b9b8;
	}
	/* 限时购banner */	
	.limitedBanner {
		width: 100%;
		font-size: 1.2rem;
		line-height: 3.5rem;
		height: 3.5rem;
		color: #f4f4f4;
		background: #e3724d;
	}
	
	.limitedBanner .bannerL {
		float: left;
		margin-left: 1.6rem;
	}
	
	.limitedBanner .bannerL .bannerTxt {
		font-size: 1.8rem;
		font-weight: bold;
		margin-right: 1rem;
	}
	
	.limitedBanner .bannerR {
		float: right;
		margin-right: 1.15rem;
	}
	/* 秒杀预告 */
	
	.advanceBanner {
		width: 100%;
		font-size: 1.7rem;
		line-height: 3.5rem;
		height: 3.5rem;
		color: #333333;
		background: #fff6ed;
	}
	
	.advanceBanner .bannerL {
		float: left;
		margin-left: 1.6rem;
	}
	
	.advanceBanner .bannerR {
		float: right;
		margin-right: 1.6rem;
		font-size: 1.2rem;
		color: #858585;
		position: relative;
	}
	
	.advanceBanner .bannerL .bannerTxt {
		font-weight: bold;
		margin-right: 1rem;
	}
	
	.advanceBanner .bannerL .bannerPrice {
		font-size: 1.2rem;
		color: #858585;
	}
	
	.advanceBanner .bannerR span {
		margin-right: 0.8rem;
		color: #858585;
	}
	
	.advanceBanner .leftIcon {
		width: 0.6rem;
		height: 1.2rem;
		position: absolute;
		right: 0;
		top: 1.3rem;
		background: url(../../assets/images/leftIcon.png) no-repeat;
		/* background-size；contain; */
	}
	/* 产品参数弹出框 开始 */
	
	.parameterHead {
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		text-align: center;
		font-size: 1.7rem;
		color: #333;
		border-bottom: 1px solid #d6d6d6;
	}
	
	.close {
		width: 1.2rem;
		height: 1.2rem;
		position: relative;
		top: 0.05rem;
		left: 13rem;
	}
	
	.parameterBody {
		width: 100%;
		padding: 0 0.6rem;
		
	}
	
	.parameterBody .proParamContent {
		min-height: 0px!important;
		padding: 0px!important;
	}
	
	.parameterBody .proParamContent_ul {
		padding-left: 0px!important;
	}
	
	.parameterBody .proParamContent_ul li:first-child {
		margin-top: 0px!important;
	}
	
	.sureBtn {
		width: 100%;
		height: 4.4rem!important;
		line-height: 4.4rem;
		background: #F9BE00;
		font-size: 1.7rem!important;
		color: #fff;
	}
	
	.proParamContent .cryBaby {
		min-height: 2rem!important;
		background-color: #fff;
	}
	
	.proParamContent .cryBaby .noPicParams {
		/*margin: 13.4rem 0 2rem 0;*/
	}
	
	.proParamContent .cryBaby .paramWord {
		font-size: 1.5rem!important;
		color: #999;
		/*margin-bottom: 13.4rem;*/
	}
	/* 产品参数弹出框 结束 */
	/* 为你推荐模块 开始 */
	
	.recommended {
		width: 100%;
		/*height: 23.7rem;*/
		background-color: #ffffff;
		padding-bottom: 5rem;
		overflow: hidden;
	}
	
	.recommendedTitle {
		width: 12rem;
		height: 1rem;
		margin: 1.5rem auto;
		/*padding-top: 1.5rem;
		padding-bottom: 1.5rem;*/
	}
	
	.recommendedTitle img {
		/*width: 15rem;
		height: 1.4rem;*/
		width: 100%;
	}
	
	.recommendedCon {
		display: inline-block;
		/*margin-left: 0.8rem;*/
	}
	
	.recommendedPic {
		background-color: #f4f4f4;
		/*border-radius: 0.5rem;*/
	}
	
	.recommendedName {
		width: 100%;
		white-space: nowrap;
		/*text-overflow: ellipsis;*/
		overflow: hidden;
		font-size: 1rem;
		color: #333;
		/*margin-top: 1rem;*/
		margin-bottom: 0.8rem;
		line-height: 1.3rem;
		text-align: left;
		font-weight: Light;
		font-family: PingFangSC-Light;
	}
	
	.recommendedPrice {
		font-size: 1rem;
		line-height: 1.5rem;
		color: #cc141c;
		text-align: left;
	}
	
	.recommendedPrice span {
		font-size: 1.3rem;
	}
	
	.dragDetailsTitle {
		width: 100%;
		background-color: #ffffff;
	}
	
	.dragDetailsTitle img {
		display: inline-block;
		width: 3rem;
		vertical-align: middle;
	}
	
	.dragDetailsTitle span {
		color: #858585;
		font-size: 1.5rem;
		padding: 1.5rem;
	}
	
	#wrapper1 {
		width: 100%;
		height: 19.4rem;
		background: #fff;
		position: relative;
		z-index: 1;
		top: 0;
		left: 0;
		/*overflow-x: auto;
		overflow-y: hidden;*/
		/*-webkit-overflow-scrolling: touch;*/
	}
	
	/*#scroller1{
		width: 100%;		
	}*/
	
	#scroller1 ul{
		width: 100%;	
		padding: 0 1.8rem;
	}
	#scroller1 ul li{
		width: 16rem;
	    margin-bottom: 8rem;
	    height: 19rem;
	    line-height: 2.1rem;
	    border-radius: 0.15rem ; 
	}
	
	#scroller1 ul li:nth-of-type(odd){
		float: left;
	}
	#scroller1 ul li:nth-of-type(even){
		float: right;
	}
	
	#scroller1 ul li .recommendedPic{
		width: 100%;
		height: 100%;
	}
	span {
		display: inline-block;
	}
	
	.good_detail {
		padding-top: 4.4rem;
		/*padding-bottom: 13rem;*/
		position: relative;
	}
	/* 禁止滚动 */
	img{
		width: 100%;
	}
	.over {
		/* height: 100%;       
        overflow-y: hidden;
        position: relative; */
		height: 100%;
		overflow: hidden;
		width: 100%;
		position: fixed;
	}
	
	.good_detail .picAddCar {
		width: 4.4rem;
		height: 4.4rem;
		position: fixed;
		bottom: 8.2rem;
		right: 1rem;
		z-index: 444;
	}
	
	.good_detail .rotateToCart {
		width: 3.8rem;
		height: 3.8rem;
		position: fixed;
		bottom: 5rem;
		left: 15rem;
		z-index: 555;
	}
	
	.good_detail .picAddCar.initPicAddCarClass {
		width: 4.4rem;
		height: 4.4rem;
		position: fixed;
		bottom: 8.2rem;
		right: 1rem;
		z-index: 444;
	}
	
	.good_detail .rotateToCart.initRotateToCartClass {
		width: 3.8rem;
		height: 3.8rem;
		position: fixed;
		bottom: 5rem;
		left: 15rem;
		z-index: 555;
	}
	
	@keyframes rotateToDisappear {
		from {
			opacity: 1;
			transform: translate(0px, 0px) rotate(0deg) scale(1)
		}
		to {
			opacity: 0;
			transform: translate(20rem, -4rem) rotate(360deg) scale(0)
		}
	}
	
	@keyframes finishAddCart {
		0% {
			transform: scale(1)
		}
		50% {
			transform: scale(1.5)
		}
		100% {
			transform: scale(1)
		}
	}
	
	.good_detail .header {
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		color: #333;
		font-size: 1.8rem;
		border-bottom: 1px solid #D6D6D6;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.good_detail .header .good,
	.good_detail .header .detail {
		width: 4.4rem;
		height: 4.25rem;
		font-size: 1.5rem;
		color: #333;
		border-bottom: 0.15rem solid #fff;
		margin: 0 3.75rem;
	}
	
	.good_detail .header .returnPic {
		width: 1.2rem;
		height: 2rem;
		position: fixed;
		top: 1.2rem;
		left: 0.8rem;
	}
	
	.good_detail .header .returnPic img {
		width: 1.2rem;
		height: 2rem;
	}
	
	.good_detail .header .sharePic {
		/*height: 4.4rem;*/
		position: absolute;
		display: block;
		width: 8rem;
		height: 4.4rem;
		line-height: 5rem;
		/*background: red;*/
		right: 0;
	}
	
	.good_detail .header .sharePic>span{
		/*padding-left: 1rem;*/
		width: 1.7rem;
	    height: 1.75rem;
        margin-left: 1rem;
	    /*position: absolute;*/
	}
	.good_detail .header .sharePic>span .returnHome{
		
		
	}
	.sharePic>span .sousuo{
		
	}
	/*.good_detail .header .sharePic img:last-child {
		margin-right: 1rem;
	}*/
	
	.good_detail .header .activeGood {
		font-weight: bolder;
		border-bottom: 0.15rem solid #F9BE00;
	}
	
	.bdsharebuttonbox {
		width: 100%;
		background: #333;
	}
	
	.bdsharebuttonbox .shareList {
		width: 100%;
		height: 22rem;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-around;
		-webkit-justify-content: space-around;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul .li1 {
		width: 7rem !important;
		height: 7rem !important;
		background: url('../../assets/images/weixinBig.png') no-repeat center center !important;
		background-size: 100% 100% !important;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul .li2 {
		width: 7rem !important;
		height: 7rem !important;
		background: url('../../assets/images/friendCircle.png') no-repeat center center !important;
		background-size: 100% 100% !important;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul .li3 {
		width: 7rem !important;
		height: 7rem !important;
		background: url('../../assets/images/qqBig.png') no-repeat center center !important;
		background-size: 100% 100% !important;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul .li4 {
		width: 7rem !important;
		height: 7rem !important;
		background: url('../../assets/images/weiboBig.png') no-repeat center center !important;
		background-size: 100% 100% !important;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul a {
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.bdsharebuttonbox .shareList {
		padding-top: 4rem;
	}
	
	.bdsharebuttonbox .shareList .shareList_ul li {
		width: 7rem;
		height: 7rem;
	}
	
	.bdsharebuttonbox .shareList .cancel {
		width: 4.5rem;
		height: 4.5rem;
		margin: 4.4rem auto;
	}
	
	.mint-popup {
		width: 100%;
		height: 36.5rem;
		position:absolute;
		bottom: 0;
    		right: 0;
	}
	
	.goodPic {
		width: 100%;
		height: 35rem;
		/*height: 25rem;*/
		position: relative;
		overflow: hidden;
	}
	
	.goodPic .goodPicSon {
		height: 100%;
		position: relative;
	}
	
	.goodPic .goodPicSon .continueLast {
		position: relative;
	}
	
	.goodPic img {
		width: 100%;
		height: 100%;
	}
	
	.goodPic .picWord {
		width: 0.5rem;
		font-size: 1.2rem;
		line-height: 1.6rem;
		margin-left: 3rem;
		margin-top: 20%;
	}
	
	.goodTitle ul {
		/*padding: 0.8rem 0.8rem 0;*/
		padding: 0 1.5rem;
	}
	
	.goodTitle ul li {
		text-align: left;
	    width: 100%;
	    /*height: 4.2rem;*/
	    /*line-height: 2.1rem;*/
        overflow: hidden;
	}
	.goodTitle .titleName{
		width:34.35rem;
		/*height:3.55rem;*/
		font-size:1.5rem;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
		line-height:2.1rem;
		text-align:left;   
		/*margin: 0 auto;*/
		margin-bottom:0.8rem;
		margin-top: 1.4rem;
	}
	.goodTitle .subName{
		/*margin-top:1.25rem;*/
		width:16.45rem;
		height:1.25rem;
		font-size:1.3rem;
		font-family:PingFangSC-Light;
		color:rgba(153,153,153,1);
		line-height:1.25rem;
		margin-bottom:1.5rem;
	}
	
	.goodTitle ul .li2 {
		font-size: 1.1rem;
		color: #f9b200;
	}
	
	.goodTitle ul .li3 {
		font-size: 1.2rem;
	    margin-top: 0.8rem;
	    line-height: 2.25rem;
	}
	
	.goodTitle ul .li3 .fl {
		color: #DA5E54; 
	}
	.goodTitle ul .clearfix11{
		margin-top: 0.3rem;
		margin-bottom: 1rem;
	}
	
	.goodTitle ul .clearfix11 .fr{
		color: #999999;
    		font-size: 1.2rem;
    		font-family:PingFangSC-Light;
	}
	.goodTitle ul .li3 .strong {
		font-size: 1.8rem;
		font-weight: normal;
		color: #DA5E54; 
	}
	/* 限时购 */
	
	.goodTitle ul .li3 .promotion {
		font-size: 0.95rem;
		height: 1.4rem;
		line-height: 1.4rem;
		color: #eb544d;
		padding: 0 0.2rem;
		border: 1px solid #eb544d;
		border-radius: 0.25rem;
	}
	
	.goodTitle ul .li4 {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		/*  padding: 1.5rem  0.8rem 0.8rem 0; */
		/*border-bottom: 1px solid #D6D6D6;*/
		margin-top: 0;
		font-size: 1.2rem;
		line-height: 2.75rem;
		height: 2.75rem;
		color: #858585;
	}
	.goodTitle .clearfixVIP{
		/*float: left;*/
		margin-left: 0.5rem;
		/*margin-top: -0.5rem;*/
		/*width: 12rem;*/
		color: #000;
	}
	
	
	.goodTitle .clearfixVIP span:last-child img{
	   width: 2rem;
	   height: 1rem;
	}
	
	.grayLine {
		width: 100%;
		height: 0.5rem;
		background: #f4f4f4;
	}
	
	.goodComment .head {
		text-align: left;
		font-size: 1.4rem;
		color: #adadad;
		/*padding: 1.25rem;*/
		padding: 1.25rem 1.5rem;
		width: 100%;
		overflow: hidden;
	}
	 .xian{
		width: 36.7rem;
	    height: 0.05rem;
	    background:rgba(226,226,226,1);
	    /*margin-left: 1rem;*/
	   position: absolute;
	   right:0;
	}
	.goodComment .head .comments {
		color: #333333;
	}
	
	.goodComment ul li {
		padding: 0 1.5rem 1.5rem 1.5rem;
		/*border-top: 1px solid #D6D6D6;*/
	}
	
	.goodComment ul li .first1 {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: 1.2rem;
		color: #858585;
		padding-bottom: 1rem;
	}
	
	.goodComment ul li .first1 .goodCommenterPic {
		width: 2.9rem;
		height: 2.9rem;
		/*border:1px solid red;*/
		border-radius: 50%;
		overflow: hidden;
		float: left;
		margin: 1rem 1rem 0 0;
	}
	
	.goodComment ul li .first1 .goodCommentName {
		margin-top: 1.8rem;
	    font-size: 1.4rem;
	    color: #333;
	    font-family:PingFangSC-Light;
	}
	
	.goodComment ul li .first1 .time {
		margin-top: 1.8rem;
	}
	
	.goodComment ul li .first2 {
		text-align: left;
	    font-size: 1.3rem;
	    font-family: PingFangSC-Light;
	    color: rgba(51,51,51,1);
	    margin-top: 0.75rem;
	}
	.goodComment ul li .first1 .timex .imgV{
		width: 1.55rem;
		height: 1.55rem;
		position: relative;
		top:0.4rem;
	}
	.timex .imgV img{
		width: 100%;
	}
	.checMore {
		width: 12rem;
		height: 2rem;
		line-height: 3rem;
		/*background: #f4f4f4;*/
		margin: 1.5rem auto;
	}
	.checMore img{
		width: 100%;
	}
	.checMore2{
		font-size: 1.2rem;
		/*color: #adadad;*/
	}
	
	
	.checMore22{
		font-size:1.3rem;
		font-family:PingFangSC-Light;
		color:rgba(193,170,114,1);
	}
	.head .head-left{
		float: left;		
	}
	.head .head-left .commentNum{
		color:#333 ;
	}
	.head .header-right{
		float: right;
		margin-right: 0rem;
	}	
	.head .header-right span img{
		width: 0.56rem;
    		height: 1.25rem;
    		position: relative;
    		top: 0.1rem;
	}
	
	.detailBottomTab {
		width: 100%;
		height: 4.9rem;
		position: fixed;
		bottom: 0;
		z-index: 333;
		background: #fff;
		border-top: 1px solid #d6d6d6;
	}
	
	.detailBottomTab ul {
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		align-items: center;
		-webkit-align-items: center;
	}
	
	.detailBottomTab ul li {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		align-items: center;
		-webkit-align-items: center;
		height: 100%;
	}
	
	.detailBottomTab ul li .pic {
		width: 2rem;
		height: 2rem;
	}
	
	.detailBottomTab ul li .pic1{
		width: 2.15rem;
	}
	.detailBottomTab ul li .pic1 img{
		
    		width: 100%;
	}
	.detailBottomTab ul li .pic img{
		width: 100%;
	}
	
	
	.detailBottomTab ul li{
		padding:0.5rem 0;
	}
	
	.detailBottomTab ul .li1 {
		width: 6.25rem;
		font-size: 1rem;
		color: #858585;
		border-right: 1px solid #D6D6d6;
		
	}
	
	.detailBottomTab ul .li2 {
		width: 6.25rem;
		font-size: 1rem;
		color: #858585;
		border-right: 1px solid #D6D6d6;
	}
	
	.detailBottomTab ul .li3 {
		width: 12.5rem;
		font-size: 1.4rem;
		color: #5c5c5c;
		/*background: #FAFAFA;*/
	}
	
	.detailBottomTab ul .li4 {
		background: #F9D86F;
		width: 12.5rem;
		font-size: 1.4rem;
		color: #333333;
		/*font-family: PingFangSC-Light;*/
	}
	
	.detailBottomTab ul .li5 {
		background: #F9BE00;
		width: 25rem;
		font-size: 1.7rem;
		color: #fff;
	}
	
	.detailBottomTab ul .li6 {
		background: #dddddd;
		width: 25rem;
		font-size: 1.7rem;
		color: #fff;
	}
	
	.buyWhat {
		width: 100%;
		padding-top: 1.5rem;
		padding-left: 1.5rem;
		height: 30.1rem;
		/* height:auto; */
	}
	
	.sale_pop {
		height: 30.1rem;
	}
	
	.sale_pop .sale_div1 {
		width: 100%;
		height: 86%;
		padding: 0 0.8rem;
		font-size: 1.4rem;
		color: #666666;
	}
	
	.sale_pop .sale_div1 .div1_ul {
		padding-top: 1.6rem;
	}
	
	.sale_pop .sale_div1 .div1_ul li {
		text-align: left;
	}
	
	.sale_pop .sale_div1 .div1_ul .li2 {
		margin: 1rem 0 0 3.7rem;
		padding-bottom: 1rem;
		line-height: 1.8rem;
		border-bottom: 1px solid #D6D6D6;
	}
	
	.sale_pop .sale_div1 .div1_ul .li2.saleFirst {
		border: 0;
	}
	
	.buyWhat .top {
		display: flex;
		display: -webkit-flex;
		padding: 0 0.8rem 1rem 0rem;
		border-bottom: 1px solid #D6D6D6;
		position: relative;
	}
	
	.buyWhat .top .showDownCart {
		width: 1.3rem;
		height: 1.3rem;
		position: absolute;
		right: 0.8rem;
		top: 0;
	}
	
	.buyWhat .top .topPic {
		width: 10rem;
		height: 10.5rem;
		background: #F4F4F4;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
		/*margin-right: 1.25rem;
		margin-left: 0.7rem;*/
	}
	
	.buyWhat .top .topPic .pic {
		width: 10rem;
		height: 10.5rem;
	}
	
	.mint-button {
		margin: 0 !important;
	}
	
	.buyWhat .top .topWord {
		margin-left: 2.05rem;
	}
	
	.buyWhat .top .topWord .li1 {
		font-size: 1.2rem;
		/*width: 27.6rem;*/
		text-align: left;
		/*line-height: 1.7rem;*/
		color: #323232;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-top: 5rem;
	}
	
	.buyWhat .top .topWord .li1 .originalPrice {
		font-size: 1.2rem;
		color: #C1AA72;
		font-family:DIN-Regular;
	}
	
	.buyWhat .top .topWord .li2 {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size:1.3rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		text-align: left;
	}
	
	.buyWhat .top .topWord .li1 .price {
		/*font-size: 1rem;*/
		/*color: #CD141A;*/
		display: inline-block;
    		/*margin-left: 1rem;*/
	}
	.clearfixVIP{
		margin-left: -0.5rem;
	}
	.buyWhat .top .topWord .li1 .price .clearfixVIP .VIP{
		
	}
	
	.buyWhat .top .topWord .li1 .priceNum {
		font-size: 1.6rem;
		color: #EB544D;
		font-family:DIN-Regular;
	}
	
	.buyWhat .top .topWord .li1 .priceNum .limitedPrice2 {
		text-decoration: line-through;
		color: #adadad;
	}
	
	.buyWhat .top .topWord .li1 .stock {
		font-size: 1rem;
		color: #969696;
	}
	
	.buyWhat .top .topWord .li3 {
		text-align: left;
		font-size:1.3rem;
			font-family:PingFangSC-Light;
			color:rgba(127,127,127,1);
		margin: 0.6rem 0;
	}
	
	.buyWhat .center {
		text-align: left;
		padding: 1.5rem 0.8rem 4.6rem 0rem;
		max-height: 22.65rem;
		overflow: auto;
	}
	
	.buyWhat .center .variety {
		margin-bottom: 1.5rem;
	}
	
	.buyWhat .center .variety .variety_p {
		font-size:1.5rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
	}
	
	.buyWhat .center .variety .variety_ul {
		width: 36rem;
		/* overflow: hidden; */
		/* height:12rem ; */
		overflow: auto;
	}
	
	.buyWhat .center .variety .variety_ul li {
		/*padding: 0.75rem 1rem;*/
		border: 1px solid #D6D6D6;
	    margin: 1rem 2rem 0 0;
	    height: 3.23rem;
	    font-size: 1.3rem;
	    line-height: 3.23rem;
	    color: #323232;
	    padding: 0 1.05rem;
	    float: left;
	    font-family: PingFangSC-Light;
	}
	
	.buyWhat .center .variety .variety_ul li.active {
		/*background: #f9be00;*/
		color: #EB544D;
		border: 1px solid #EB544D;
	}
	.buyWhat .center .variety .variety_ul li.unactive {
		/*background: #fff;*/
		color: #000;
		border: 1px solid #D6D6D6;
	}
	.buyWhat .center .variety .variety_ul li.active1{
		color: #C1AA72;
		border: 1px solid #C1AA72;
	}
	.buyWhat .center .quantity {
		height: 2.5rem;
		line-height: 2.5rem;
		font-size: 1.1rem;
		color: #8D8D8D;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-bottom: 6.65rem;
	}
	
	.buyWhat .center .quantity .quantityCalculate {
		display: flex;
		display: -webkit-flex;
		position: relative;
	    right: 5rem;
	    width: 9rem;
	    top:3rem;
	    right: 25.5rem;
	}
	
	.buyWhat .center .quantity .quantityCalculate .minus {
		height: 3.23rem;
		width: 4.75rem;
		border:0.05rem solid rgba(204,204,204,1);
		border-right: none;
		border-radius: 0.2rem 0 0 0.2rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
		font-size: 1.1rem;
		background: #fff url("../../assets/images/Group 2@2x.png") no-repeat center;
		/*background-size: 56% 56%;*/
		position: absolute;
		right: 4.68rem;
	}
	
	.buyWhat .center .quantity .quantityCalculate .add {
		height: 3.23rem;
		width: 4.75rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
		border: 0.05rem solid #7F7F7F;
		border-radius: 0rem 0.15rem 0.15rem 0rem;
		font-size: 1.1rem;
		background: #fff url("../../assets/images/Group 2@2x 2.png") no-repeat center;
		/*background-size: 56% 56%;*/
		position: absolute;
    		right: -6.5rem;
	}
	
	.buyWhat .center .quantity .quantityCalculate .num {
		height: 3.23rem;
		width: 6.6rem;
		border-top: 0.05rem solid #7F7F7F;
		border-bottom: 0.05rem solid #7F7F7F;
		border-left: 0.05rem solid #7F7F7F;
		border-radius: 0;
		background: #fff;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		-webkit-align-items: center;
		text-align: center;
		font-size: 1.4rem;
		position: absolute;
    		right: -2rem;
	}
	
	.buyWhat .sure {
		width: 100%;
		background: #F9D86F;
		color: #333333;
		font-size: 1.6rem!important;
		height: 4.4rem!important;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.buyWhat .sure11{
		background: #C1AA72;
	} 
	.buyWhat .sure .mint-button-text {
		font-size: 1.7rem!important;
	}
	
	.detailTab {
		/*line-height: 1.5rem;*/
		font-size: .5rem;
	}
	
	.detailTab .picParamContent {
		/*min-height: 51rem;*/
		background: #f4f4f4;
	}
	.detailTab .picParamContent .picAll img {
		width: 100%;
	}
	
	.detailTab .picParamContent .picAll ul {
		padding: 1.5rem 0;
		background: #fff;
	}
	
	.detailTab .detailTabHead {
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		position: fixed;
		z-index: 333;
		top: 5rem;
		background: #fff;
		width: 100%;
	}
	
	.detailTab .detailTabHead .picParam {
		color: #414141;
		font-size: 1.4rem;
		width: 8.8rem;
		padding: 1.25rem 0;
	}
	
	.detailTab .detailTabHead .proParam {
		color: #414141;
		font-size: 1.4rem;
		width: 8.8rem;
		padding: 1.25rem 0;
	}
	
	.detailTab .detailTabHead .activeDetailPic {
		color: #f9be00;
		border-bottom: 3px solid #f9be00;
	}
	
	.proParamContent {
		padding: 0rem 0 5rem 0rem;
		text-align: left;
		font-size: 1.2rem;
		background: #f4f4f4;
		min-height: 51rem;
	}
	
	.proParamContent .proParamContent_ul {
		padding-left: 1.5rem;
		background: #fff;
	}
	
	.proParamContent .proParamContent_ul li {
		/*margin-top: 2rem;*/
		height: 3rem;
		line-height: 3rem;
		text-align: left;
		display: flex;
		display: -webkit-flex;
		padding-left: 0.8rem;
		font-size: 1.3rem;
		border-bottom: 1px dotted #cecfce;
		color: #333333;
	}
	
	.proParamContent .name {
		color: #858585;
		width: 14rem;
		/*margin-right: 3.5rem;*/
		/*line-height: 1.5rem;*/
	}
	
	.proParamContent .nameContent {
		color: #333333;
		width: 22rem;
		/*line-height: 1.5rem;*/
		overflow: hidden;
	}
	
	.proParamContent .proParamContent_ul li .longSpan {
		line-height: 2rem;
	}
	
	.proParamContent .proParamContent_ul .longLi .name {
		color: #858585;
		width: 14rem;
		/*line-height: 1.5rem;*/
		/*padding-left: 0.5rem;*/
	}
	
	.proParamContent .proParamContent_ul .longLi .div1 {
		/*width: 22rem;*/
		
	}
	
	.isBigPopWrap {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 888;
		background: #333;
	}
	
	.isLargePicWrap img {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 999;
		width: 90%;
		height: 60%;
		margin-top: -50%;
		margin-left: -45%;
	}
	
	.bottomLine {
		padding-bottom: 0;
	}
	
	.showSharePic {
		position: fixed;
		top: 0;
		z-index: 6666;
		right: 0;
	}
	
	.showSharePop {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 5555;
		background-color: #000000;
		opacity: 0.7;
	}
	
	.promotionManMinus {
		width: 100%;
		/*padding: 0.6rem 0.8rem 0.7rem;*/
		font-size: 1.15rem;
		line-height: 2.8rem;
		border-top: 1px solid #D6D6D6;
		margin-bottom: 1.2rem;
    		padding-top: 1.2rem;
	}
	
	.promotionManMinus .div1 {
		/* margin-bottom: 1.4rem; */
		
		text-align: left;
	}
	
	.promotionManMinus .div1 .left {
		/* margin-bottom: 1.4rem; */
	}
	
	.promotionManMinus .div1 .left .word {
		font-size: 1.4rem;
    		color: #666;
    		font-family:PingFangSC-Light;
	}
	
	.promotionManMinus .div1 .right {
		float: right;
		margin-top: -3rem;
	}
	
	.promotionManMinus .div1 .right img,
	.parameters .right img {
		width: 1.8rem;
		height: 0.4rem;
	}
	
	.promotionManMinus .div2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.icon {
		color: #eb544d;
		border: 1px solid #eb544d;
		font-size: 1.2rem;
		line-height: 1.4rem;
		padding: 0.2rem;
		margin-right: 0.5rem;
		border-radius: 0.4rem;
	}
	
	.bottomImg {
		width: 100%;
		height: 3rem;
		background: #f4f4f4;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		color: #ADADAD;
	}
	
	.bottomImg .line {
		width: 3rem;
		height: 1px;
		border-top: 1px solid #ADADAD;
	}
	
	.bottomImg .word {
		margin: 0 1.1rem;
	}
	
	.noPicParams {
		/*width: 13.2rem;
		height: 13.1rem;*/
		/*margin: 17.5rem 0 2rem 0;*/
	}
	
	.cryBaby {
		width: 100%;
		/*min-height: 51rem;*/
		display: flex;
		justify-content: center;
	}
	
	.cryBaby .div1 .paramWord {
		display: flex;
		justify-content: center;
		font-size: 1.2rem;
	}
	
	.parameters {
		width: 100%;
		height: 4.4rem;
		font-size: 1.5rem;
		text-align: left;
		text-indent: 0.75rem;
		color: #333333;
		font-weight: bold;
		background-color: #f4f4f4;
	}
	
	.parameters .left {
		width: 100%;
		height: 100%;
		line-height: 4.4rem;
		background-color: #ffffff;
	}
	
	.parameters .right {
		float: right;
		margin: -3.3rem 0.8rem 0px;
	}
	
	.lunboBottom {
		width: 3.2rem;
		height: 1.7rem;
		border: 1px solid #d6d6d6;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: absolute;
		right: 1.5rem;
		bottom: 1.5rem;
		background: #fff;
	}
	
	.lunboBottom .lunboNum1 {
		font-size: 1.2rem;
	}
	
	.lunboBottom .lunboNum1 {
		font-size: 0.9rem;
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
	
	.fresh_goods .fresh_goods_icon div{
		bottom: -0.3rem;
	}
	
	
	.mint-swipe-indicators{
		display: none !important;
	}
	.goods_trade{
		width:100%;
		height:4rem;
		line-height: 4rem;
		text-align:center;
		background:rgba(0,0,0,0.7);
		font-size:1.4rem;
		color:#fff;
		position: fixed;
    	bottom: 4.9rem;
	}
	
</style>
<script type="text/ecmascript-6">
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Lazyload } from 'mint-ui';
	import { WeChatShareMixin } from '../../util/WeChatShareMixin.js'
	import { alert_msg, _isWechat, formatDate } from '../../util/index.js'
	import Vue from 'vue'
	
	import { api_get, api_post, _isLogin } from '../../util/api.js'
	import lastTime from '../../component/lastTime'
	
	export default {
		name: 'good_detail',
		components: {
			lastTime
		},
		mixins: [WeChatShareMixin],
		data() {
			return {
				ispinlun:true,
				userType:'',
				hdpPromotionPrice:'',
				PicTextDetailKey:[],
				PicTextDetailvalue:[],
				showFlag:false,
				salesNum:'',
				areaName:'',
				commodityId:'',
				selfEnterprisePrice:'',
				selfStaffPrice:'',
				salesPrice:'',
				list: [],
				detailNum: [],
				popupVisible: false,
				popupVisible1: false,
				popupVisible2: false,
				popupSale: false,
				popupParameter: false, //产品参数弹出框
				isCollection: false, //是否收藏
				isNumInputBlur: false, //立即购买 & 加入购物车 => 键盘输入数量
				selected:'',
				num: 1,
				isDisabled: true,
				isMe: true,
				isActive: true,
				active: false,
				isPicParam: true,
				isActiveDetailPic: true,
				isHaveGood: true,
				showRotatePic: false,
				isFinishAdd: false,
				isClickAddCart: false,
				initPicAddCar: false,
				initRotateToCart: false,
				isLargePic: false,
				isBigPop: false,
				items1: [],
				page_url: HOST_HDPCOMMODITY,
				goodDetail: '',
				goodPrice:[],
				addIsDisabled: false,
				continueSlide: false,
				contineIndex: 0,
				storeNum: '', //总库存
				surplus: '', //
				transmitCartStandard: '',
				isClickStandcard: 0,
				proParameters: [],
				proParameterss: [],
				startX: '',
				endX: '',
				startY: '',
				endY: '',
				storeNum: '',
				pics: '',
				pdSpce: '',
				addCartParams: {
					goodsId: '',
					goodsNum: '',
					goodsSpec: ''
				},
				orderParams: {
					actualMoney: '',
					costFreight: '',
					goods: [{
						imgUrl: '',
						pdBn: '',
						pdId: '',
						pdName: '',
						pdPrice: '',
						pdQuantity: '',
						pdSpce: '',
						siteId: '',
						supId: '',
						pdUnit: ''
					}]
				},
				jsonOrderParams: '',
				loginCode: '',
				userId: '',
				key: '',
				onePrice: '',
				backParams: 0,
				makeOrde: 0,
				commodityId: '',
				urlRemain: '',
				startX1: '',
				endX1: '',
				startX2: '',
				endX2: '',
				start1X: '',
				end1X: '',
				bodyStartY: '',
				bodyEndY: '',
				totalMoney: '',
				weixinSignature: '',
				nonceStr: '',
				timestamp: '',
				showWeChatShareTitle: false,
				showPinPai: '',
				showChoosePinPai: '',
				shareDetailName: '',
				PicTextDetail: '',
				limitedNum: '',
				promotionActivity: '',
				noPicParams: '',
				noPicParams0: '',
				collectionId: '',
				recommendGoods: '',
				lunboPicToal: '',
				lunboPicIndex: '',
				defaultFirst: true,
				isSaleFirst: '',
				isExhibition: '',
				deliveryPrice: '',
				// 收藏与取消收藏相
				collectionAlert: false,
				collectionImg: false,
				collectionWords: false,
				isTrade:"" ,//是否上架
				/* logoBoxShow:"" */
				showLimited: false, //是否显示限时秒杀
				timeStamp: "",
				limitedQuanity: 0,
				toast: Toast({
					message: '...',
					duration: 10
				}),
				promotionBeginTime: '', //预告开始时间
				advancdPromotionPrice: '', //预告优惠价
				advanceShow: false, //是否限时预告
				promotionStatus: false, //点前状态 
				maxNum: '', //最大购买数量
				selfExternalPrice:'',
				selfExternalName:'',
				hdpPromotionPrice:'',
				shoppingIndex:'',
				subName:'',
				name:'',
				activecss:true,
				unactivecss:false,
				externalId:'',
				selected:0,
				
			}
		},
		beforeCreate() {
			//fix分享进来URL 参数

			if(window.location.href.indexOf('?') != window.location.href.lastIndexOf('?')) {
				window.location.href = window.location.href.replace(/\?[\&?\w+\=\w+]+/, '')
			}
			if(this.$route.query.exhibitionId && this.$route.query.exhibitionName) {
				localStorage.setItem('scan-ExhibitionTime', new Date().getTime())
				localStorage.setItem('scan-exhibitionId', this.$route.query.exhibitionId)
				localStorage.setItem('scan-exhibitionName', this.$route.query.exhibitionName)
			}
			if(!this.$route.query.found_index) {
				//   this.$route.query.found_index=1
			}
		},
		created() {
			window._bd_share_main && window._bd_share_main.init();
		    // this.getSignature();
		},
		mounted() {
			
			// var script = document.createElement('script')
			// script.src = 'https://s19.cnzz.com/z_stat.php?id=1273200538&web_id=1273200538'
			// script.language = 'JavaScript'
			// document.body.appendChild(script);
			
			
			//fix分享进来URL 参数
			if(window.location.href.indexOf('?') != window.location.href.lastIndexOf('?')) {
				window.location.href = window.location.href.replace(/\?[\&?\w+\=\w+]+/, '')
			}
			if(this.$route.query.exhibitionId && this.$route.query.userId) {
				window.localStorage.setItem('scan-exhibitionId', this.$route.query.exhibitionId)
				window.localStorage.setItem('scan-userId', this.$route.query.userId)
			}
		   	this.userId = window.localStorage.getItem("userId")
		   	this.getGoodDetailData().then(_ => {
		    		this.getDeliveryPrice();
		    		for(var i=0; i<this.items1.length; i++){
		    			this.Standard = this.items1[i].Standard;
		    		}
		    		if(this.Standard == ''){
		    			this.transmitCartStandard = '默认规格'
		    		}else{
		    			this.transmitCartStandard = this.Standard;
		    		}
		    		
		   	});
		   	this.getCommentData();
		   	//   this.getSignature()
		   	this.getParameters(); //获取产品参数
		   	this.checkIsCollection();
		   	this.getRecommendGood();
		   	this.getBrowseCommodity();
		   	this.userType = window.localStorage.getItem('userType');
		   	console.log('userType:',this.userType)
		   	
			//   this.getPrice();
			// 默认返回顶部
		   	document.body.scrollTop = 0
		   	document.documentElement.scrollTop = 0
		},
		methods: {
			// 获取个人信息
			admin223 () {
				let url = HOST_HDPUSER + '/hdp/user/app/judgeLogin';
				this.loginCode= window.localStorage.getItem('loginCode');
				this.$resource(url).get({loginCode:this.loginCode}).then((res) => {
				this.userId=res.body.respBody.id;
				this.userType =res.body.respBody.userType;
				console.log(this.userType)
				window.localStorage.setItem("userId",this.userId);
				window.localStorage.setItem("userType",this.userType);
				})
			},
			goLogin(){
				_czc.push(["_trackEvent", "商品详情页", "进入开通会员", this.name, this.$route.query.commodityId]);
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId');
				if(this.loginCode == "" && this.loginCode == null) {	
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=001"					
				}else{					
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "membership"			
				}
			},
			//	余茂言添加 点击小房子返回首页
			backHome () {
				_czc.push(["_trackEvent", "商品详情页", "回主页"]);
//		        this.$router.push({path:'found_index'});
		        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "found_index"
		    },
			
			searchNo(){
				_czc.push(["_trackEvent", "商品详情页", "搜索"]);
//		        Toast({
//		          message: '请输入搜索内容',
//		          duration: 3000,
//		          className: "toast"
//		        });
//		        
//		        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "fg_search?acd=231"
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'fg_search?' + this.urlRemain;
		        
		        
		    },
		    backtop(){
		        document.body.scrollTop = 0
		        document.documentElement.scrollTop = 0
		    },
		   
			// 立即购买 & 加入购物车 => 键盘输入数量
			numInputFocus() {
				this.isNumInputBlur = true;
				this.showPinPai = this.showPinPai ? false : true;
			},
			prevent(e) {
				if(this.popupVisible1 || this.popupVisible2 || this.popupSale || this.popupParameter) {
					e.preventDefault()
					return false
				} else {}
			},
			numInputFocusnputComplete() {
				this.isNumInputBlur = false;
				this.showPinPai = this.showPinPai ? false : true;
			},
			numInputComplete() {
				this.isNumInputBlur = false;
				this.showPinPai = this.showPinPai ? false : true;
			},
			//请求模版运费
			getDeliveryPrice() {
				let url = HOST_ORDERS + '/order/front/getAreaTemplatePrice'
				// Vue.http.interceptors.push((request, next) => {
				//     request.headers.set('Content-Type', 'application/json');
				//     next((response) => {
				//         return response
				//     });
				// });
				
				var params = {
					userId: this.userId,
					templateId: this.goodDetail.templateId
				}
				this.$resource(url).get(params).then((response) => {
//					console.log(response)
					if(response.body.code == 200) {
						this.deliveryPrice = response.body.entity;
					}
				})
			},
			//请求浏览商品的接口
			getBrowseCommodity() {
				let url = HOST_HDPCOMMODITY + '/commodityFront/addBrowseShareCommodity'
				this.$resource(url).get({
					sourceType: 1,
					version: 'v1.3',
					userId: this.userId,
					commodityId: this.$route.query.commodityId
				}).then((response) => {
					if(response.body.code == 200) {}
				})
			},
			//请求分享商品的接口
			getShareCommodity() {
				let url = HOST_HDPCOMMODITY + '/commodityFront/addBrowseShareCommodity'
				this.$resource(url).get({
					sourceType: 0,
					version: 'v1.3',
					userId: this.userId,
					commodityId: this.$route.query.commodityId
				}).then((response) => {
					if(response.body.code == 200) {}
				})
			},
			//判断是否收藏过
			checkIsCollection() {
				this.loginCode = window.localStorage.getItem('loginCode')
				//   Vue.http.interceptors.push((request, next) => {
				//       request.headers.set('loginCode', this.loginCode);
				//       next((response) => {
				//           return response
				//       });
				//   });
				let url = HOST_HDBMESSAGE + '/collection/userCollectionExist'
				let userId = window.localStorage.getItem('userId')
				let externalId = this.$route.query.commodityId
				this.$resource(url).get({
					userId: userId,
					collectionType: 1,
					externalId: externalId
				}).then((response) => {
					if(response.body.code == '0000') {
						if(response.body.respBody == '' || response.body.respBody == null) {
							this.isCollection = false
						} else {
							this.isCollection = true
							this.collectionId = response.body.respBody
						}
					}
				})
			},
			//懒加载商品的图片
			handleChange(index) {
				this.$nextTick(() => {
					this.defaultFirst = false
					var images = document.images;
					var realImages = [];
					for(let i = 0, len = images.length; i < len; i++) {
						if(images[i].classList.contains('checkLastPic')) {
							realImages.push(images[i])
						}
					}
					var obj = realImages[index];
					if(obj.dataset) {
						this.imageLoaded(obj, obj.dataset.original);
					} else {
						this.imageLoaded(obj, obj.getAttribute('data-original'));
					}
					this.lunboPicIndex = index + 1
				})
			},
			//把占位图改为真实的图片
			imageLoaded(obj, src) {
				var img = new Image();
				img.onload = function() {
					obj.src = src;
				};
				img.src = src;
			},
			//收藏商品
			addCollection() {
				_czc.push(["_trackEvent", "商品详情页", "加入收藏", this.name, this.$route.query.commodityId]);
				let url = HOST_HDBMESSAGE + '/collection/addUserCollection'
				let userId = window.localStorage.getItem('userId');
				console.log(userId)
				let externalId = this.$route.query.commodityId;
				console.log(externalId)
				this._getUrlParam()
				this.loginCode = window.localStorage.getItem('loginCode')
				// setHttpInterceptors(Vue, this.loginCode)
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
					externalId: externalId
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
									window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
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
				})
			},
			//取消收藏
			deleteCollection() {
				_czc.push(["_trackEvent", "商品详情页", "取消收藏", this.name, this.$route.query.commodityId]);
				this.loginCode = window.localStorage.getItem('loginCode')
				//   Vue.http.interceptors.push((request, next) => {
				//       request.headers.set('loginCode', this.loginCode);
				//       next((response) => {
				//           return response
				//       });
				//   });
				let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
				this.$resource(url).get({
					id: this.collectionId
				}).then((response) => {
					if(response.body.code == '0000') {
						let _this = this
						_this.isCollection = false
						_this.collectionAlert = true;
						_this.collectionImg = true;
						_this.collectionWords = true
						setTimeout(function() {
							_this.collectionAlert = false;
							_this.collectionImg = false;
							_this.collectionWords = false
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
									window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
									window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
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
				})
			},
			//初始化顶部的轮播图
			initCarouselPic() {
				this.$nextTick(() => {
//					console.log(document.getElementsByClassName('checMore1')[0])
					var _this = this
					var mintSwipeItem = document.getElementsByClassName('mint-swipe-item')
					var productDetail = document.getElementsByClassName('checMore1')[0].offsetTop
					
					if(mintSwipeItem.length >= 1) {
						var lastIndex = _this.pics.length - 1
						var checkLastPic = document.getElementsByClassName('checkLastPic')[lastIndex]
						checkLastPic.addEventListener('touchstart', function(event) {
							let e = event || window.event;
							_this.startX = e.targetTouches[0].pageX
						})
						checkLastPic.addEventListener('touchmove', function(event) {
							let e = event || window.event;
							_this.endX = e.targetTouches[0].pageX
							_this.endY = e.targetTouches[0].pageY
							let X = _this.startX - _this.endX
							if(X > 300) {
								_this.isActive = false;
								var checMore = document.getElementsByClassName('checMore')[0].offsetHeight
								var productDetail = document.getElementById('productDetail').offsetTop
								document.getElementsByTagName('body')[0].scrollTop = productDetail - 300;
							}
						})
						var detailTab = document.getElementsByClassName('detailTab')[0]
						detailTab.addEventListener('touchstart', function(e) {
							_this.startX1 = e.targetTouches[0].pageX
						})
						detailTab.addEventListener('touchmove', function(e) {
							_this.endX1 = e.targetTouches[0].pageX
							if(_this.endX1 - _this.startX1 > 300) {}
						})
						let productDetailEle = document.getElementById('productDetail');
						productDetailEle.addEventListener('touchstart', function(event) {
							let e = event || window.event;
							_this.start1X = e.targetTouches[0].pageX
						})
						productDetailEle.addEventListener('touchmove', function(event) {
							let e = event || window.event;
							_this.end1X = e.targetTouches[0].pageX
							let X = _this.start1X - _this.end1X
							if(X < -300) {
								document.getElementsByTagName('body')[0].scrollTop = 0;
								_this.isActive = true
							//  _this.startX = 0
							//  _this.endX = 0
							}
						})
					} else {}
					// 监听body滚动 继续拖拽 跳转详情
					var bodyDom = document.getElementsByTagName('body')[0];
					bodyDom.addEventListener('touchstart', function(e) {
						_this.bodyStartY = e.targetTouches[0].pageY;
					});
					bodyDom.addEventListener('touchmove', function(e) {
						_this.bodyEndY = e.targetTouches[0].pageY;
						if(document.body.scrollTop > (productDetail + 400)) {
							_this.isActive = false
						} else if(document.body.scrollTop < (productDetail + 400)) {
							_this.isActive = true
						}
					});
				})
			},
			//选择促销的方式
			chooseWhichSale() {
				this.popupSale = true
			},
			//点击促销的弹窗
			shutDownPopSale() {
				this.popupSale = false
			},
			//点击放大图片
			enlargePic() {
				this.isLargePic = true
				this.isBigPop = true
			},
			//点击遮罩层后放大的图片消失
			clickPop() {
				this.isLargePic = false
				this.isBigPop = false
			},
			_getUrlParam() {
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.lastIndexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length);
			},
			reload() {
				window.location.reload()
			},
			
			//获取商品详情的数据
			getGoodDetailData() {
				let _this = this
				this.$nextTick(() => {
					let bodyDom = document.getElementsByTagName('body')[0]
					bodyDom.scrollTop = 0
				})
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?');
				this.urlRemain = urlParams.substring(index + 1, urlParams.length);
//				console.log(this.urlRemain)
				var urllist = this.urlRemain.split('&')[0];
				var urllist01 = urllist.split('=')[1]
				window.localStorage.setItem('externalId',urllist01)
			
				this.loginCode = localStorage.getItem('loginCode');
				let url = this.page_url + '/hdp/commodityH5/getCommodityDetailH5';
				return this.$resource(url).get({
					commodityId: this.$route.query.commodityId,
				}).then((response) => {
					if(response.body.code == 200) {
						this.goodDetail = response.body.respBody;	
						console.log(this.goodDetail)
						this.name = this.goodDetail.name;
						this.salesPrice = this.goodDetail.salesPrice;
						this.selfEnterprisePrice = this.goodDetail.selfEnterprisePrice;
						this.subName = this.goodDetail.subName;
						this.selfStaffPrice = this.goodDetail.selfStaffPrice; //好单品会员价/员工价
						this.hdpPromotionPrice = this.goodDetail.hdpPromotionPrice;    // 好单品市场价
						this.isTrade=this.goodDetail.isTrade;//0 下架 ，1 :上架
						this.isExhibition = this.goodDetail.isExhibition
						this.promotionActivity = JSON.parse(this.goodDetail.fullSingleActivity);
						this.promotionPrice = this.goodDetail.promotionPrice;
						this.shareDetailName = response.body.name;
						window.localStorage.setItem('salesNum', this.goodDetail.salesNum);
						this.pics = this.goodDetail.pic.split(',');
						
						if(this.lunboPicIndex == '') {
							this.lunboPicIndex = 1
						}
						this.lunboPicToal = this.pics.length
						// 去掉里边的制表符
						let standard = this.goodDetail.standard.replace(/\t+/g, "")
						standard = JSON.parse(standard)
						this.storeNum = standard.storeNum
						if(this.storeNum == 0) {
							this.isHaveGood = false //库存为0
						}
						var priceInterval = standard.priceInterval
						// this.items1 = JSON.parse(JSON.parse(priceInterval)[0].data);
            console.log(typeof JSON.parse(priceInterval)[0].data, 'priceInterval------')
						this.items1 = typeof JSON.parse(priceInterval)[0].data === "string" ? JSON.parse(JSON.parse(priceInterval)[0].data) : JSON.parse(priceInterval)[0].data ;
						for(var i = 0; i < this.items1.length; i++) {
							
							if(this.items1.length == 1) {
								if(this.items1[0].Standard == '') {
									this.showPinPai = false;
									this
									this.transmitCartStandard = this.items1.Standard
								} else {
									this.showPinPai = true
								}
							} else {
								this.showPinPai = true
							}
						}
						this.orderParams = {
							actualMoney: '',
							costFreight: this.goodDetail.transport,
							goods: [{
								imgUrl: this.goodDetail.pic,
								pdBn: '',
								pdName: this.goodDetail.name,
								pdPrice: '',
								pdQuantity: '',
								pdSpce: standard.priceInterval,
								siteId: this.goodDetail.siteId,
								supId: '',
								pdUnit: this.goodDetail.unit
							}]
						}
						if(response.body.isTrade == 0) {
							this.isHaveGood = false //已下架
						}
						this.initCarouselPic()
						//   this.initWeChatShare()
						this.wechatShare();
						this.backTop()
						//判断是否登录 如果当前登录 调取限购接口获取活动库存
						_isLogin().then(res => {
							if(res.loginStatus) {
								this.checkProductPurchase1()
							}
						})
						//限时购活动 限时秒杀的商品信息
						if(this.promotionActivity && this.promotionActivity != null) {
							// 获取倒计时
							let lastTime = ''
							this.promotionActivity.forEach(e => {
								// console.log(e)
								lastTime = e.countdown
								if(e.salesLable == '限时秒杀') {
									this.showLimited = true
									this.promotionStatus = true
								} else {
									this.showLimited = false
								}
							})
							this.timeStamp = lastTime //倒计时
						}
						if(!this.promotionStatus || this.promotionActivity == null) {
							this.getAdvanceDetail() //获取预告商品
						}
						// if(this.promotionActivity == null){
						//     this.getAdvanceDetail() //获取秒杀预告信息
						// }
					} else {
						Toast({
							message: '商品数据获取失败',
							position: 'center',
							duration: 2500
						});
						setTimeout(() => {
							history.go(-1)
						}, 2500)
					}
				})
			},
			format(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return m + '月' + d + '日' + h + '点';
			},
			parseTime(startTime) {
				// console.log(startTime) 
				//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式   解决ios手机不兼容---格式的问题
				startTime = startTime.replace(/\-/g, "/")
				return startTime
			},
			//获取即将开始的商品信息
			getAdvanceDetail() {
				let url = HOST_HDPUSER + "/salespromotion/getSalePromotionByProductIdsAndStatus"
				this.$api_get_no({
					url: url,
					data: {
						productIds: this.$route.query.commodityId,
						status: 1
					}
				}).then(res => {
					// console.log(res)
					if(res.code == 200) {
						if(res.respBody.length != 0) {
							let promotionBeginTime = this.parseTime(res.respBody[0].promotionBeginTime)
							// promotionBeginTime = (new Date(promotionBeginTime)).getTime();
							promotionBeginTime = Date.parse(new Date(promotionBeginTime))
							this.promotionBeginTime = this.format(promotionBeginTime) //预告开始时间
							this.advancdPromotionPrice = res.respBody[0].promotionPrice
							this.advanceShow = res.respBody.length != 0
							let countDown = res.respBody[0].countdown
							if(countDown == 0) {
								this.timeEndEvent() //预告时间到了，获取商品详情
							}
						}
					}
				})
			},
			// 返回页面顶部的方法
			backTop() {
				let scrollBehavior = localStorage.getItem('scrollBehavior')
				if(scrollBehavior == '01') {
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
				}
				localStorage.setItem('scrollBehavior', '')
			},
			// 微信分享
			async wechatShare(){
				let _this = this
				if(_isWechat()){
					// 微信分享
					window._bd_share_config = {}
					let res = await _this.getSignature();
					let link = window.location.href
					_this.initWeChatShare({
						title: _this.goodDetail.name,
						desc: '发现一款不错的商品，赶快来看看吧',
						imgUrl: _this.pics[0],
						link: link,
						success: ()=>{
							// 成功的回调，如果没有可以不写
							_this.showWeChatShareTitle = false
							_this.getShareCommodity()
						}
					})
				}
			},
            	//使用微信右上角分享功能，初始化微信的分享
			initWeChatShare(){
                let link1 = window.location.href
				let title = this.goodDetail.name;
				let desc = '发现一款不错的商品，赶快来看看吧';
				let imgUrl = this.pics[0];
				let link = link1;
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
			//获取商品评论数据
			getCommentData() {
				let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
				if(this.$route.query.commodityId) {
					this.$resource(url).get({
						externalId: this.$route.query.commodityId,
						externalType: 1,
						size: 1
					}).then((response) => {
						if(response.status == 200) {
							this.detailNum = response.body
							this.list = response.body.list
							
						}
					})
				}
			},
			//获取商品评论数据
			getCommentData() {
				let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
				if(this.$route.query.commodityId) {
					this.$resource(url).get({
						externalId: this.$route.query.commodityId,
						externalType: 1,
						size: 1
					}).then((response) => {
						console.log(response, 'resp-------')
						if(response.status == 200) {
							this.detailNum = response.body;
							console.log(this.detailNum)
							this.list = response.body.list.reverse()
							
							for(var i=0; i<this.list.length; i++){
								var img = this.list[i].userImg;
								console.log(img)
							}
							if(this.list.length == 0){
								this.ispinlun = false;
							}else{
								this.ispinlun = true;
							}
						}
					})
				}
			},
			//获取推荐的商品
			getRecommendGood() {
				let url = HOST_HDPCOMMODITY + '/hdp/commodityH5/getCommodityDetailRecommendList'
				this.$resource(url).get({
					currNum: 1,
					pageSize: 8,
					version: 'v1.3',
					type: 0,
					commodityId: this.$route.query.commodityId
				}).then((response) => {
					if(response.body.code == 200) {
						this.recommendGoods = response.body.respBody;
						console.log(this.recommendGoods)
						let len = this.recommendGoods
						for(let i = 0; i < len.length; i++) {
							len[i].pic = len[i].pic.split(',')[0]
							this.fullReduction =  len[i].fullReduction;
							this.subName =  len[i].subName;		
							this.moneyOff = len[i].moneyOff;
							this.salesPrice =  len[i].salesPrice;
						}
//						console.log(this.fullReduction )
					}
				})
			},
			//点击推荐的商品进入推荐商品的详情页
			enterRecommendedGoodDetail(item) {
				_czc.push(["_trackEvent", "商品详情页", "点击推荐中商品", this.name, this.$route.query.commodityId]);
				// 记录向前跳转的行为
				localStorage.setItem('scrollBehavior', '01')
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + item.commodityId + '&recommendedGood=1'
				window.location.reload()
			},
			//更多推荐跳转列表页
			recommendedMore() {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'recommendedMoreList?commodityId=' + this.$route.query.commodityId;
			},
			//点击商品
			clickGood() {
				document.getElementsByTagName('body')[0].scrollTop = 0;
				document.documentElement.scrollTop = 0
				document.body.scrollTop = 0
				this.isMe = true
				this.isActive = true
				this.startX = 0
				this.endX = 0
			},
			//点击详情
			clickDetail() {
				this.isMe = false;
				this.isActive = false;
				this.loginCode = localStorage.getItem('loginCode');
				var checMore = document.getElementsByClassName('checMore')[0].offsetHeight
				var productDetail = document.getElementById('productDetail').offsetTop
				document.getElementsByTagName('body')[0].scrollTop = productDetail - 150;
				// 兼容各种浏览器，尤其是chrome61
				document.documentElement.scrollTop = productDetail - 150
				document.body.scrolslTop = productDetail - 150
			},
			//获取基本参数
			getParameters() {
				let url = HOST_HDPCOMMODITY + '/commodityFront/getCommodityPicDetail'
				this.$resource(url).get({
					commodityId: this.$route.query.commodityId
				}).then((response) => {
					if(response.status == 200) {
						if(response.body.attriDetail == null) {
							this.noPicParams = true
						} else {
							this.noPicParams = false
							var attriDetail = JSON.parse(response.body.attriDetail);
							for(var i = 0; i < attriDetail.length; i++) {
								if(attriDetail[i].name == "基本参数") {
									this.proParameters = attriDetail[i].attribute;
								}								
							};
							for(var j = 0; j < this.proParameters.length; j++){
								if(this.proParameters[j].detail.length!=0){
									for(var w=0;w<this.proParameters[j].detail.length;w++){
										if(this.proParameters[j].detail[w].checked=='checked'){
											this.proParameters[j].units=this.proParameters[j].detail[w].detail;
										}
									}
								}
							}
							
						};
						this.PicTextDetail = response.body.detail;
					}
				})
			},
			//向右滑动图文详情，进入商品页
			detailStart() {
				this.clickGood()
			},
			returnBack() {
				_czc.push(["_trackEvent", "商品详情页", "返回上一级", this.name, this.$route.query.commodityId]);
				localStorage.setItem("hello", "world");
				var theme_detail = this.$route.query.theme_detail;
				var theme_list = this.$route.query.theme_list;
				var fg_search = this.$route.query.fg_search;
				var found_index = this.$route.query.found_index;
				var exhibition_details = this.$route.query.exhibition_details;
				var shopping = this.$route.query.shopping;
				var order_details = this.$route.query.order_details;
				var order_all = this.$route.query.order_all;
				var shoppingBack = this.$route.query.shoppingBack;
				let recommendedGood = this.$route.query.recommendedGood;
				let collection = this.$route.query.collection;
				let enterCount = this.$route.query.enterCount;
				let categoryIndex = this.$route.query.categoryIndex;
				let zongziIndex=this.$route.query.zongzi;
				let wuyueIndex=this.$route.query.wuyue;
				let messageIndex = this.$route.query.messageIndex;
				let qiyueIndex = this.$route.query.qiyue;
				let newProductsIndex = this.$route.query.newProducts;
				
				
				if(zongziIndex==159){
	                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"DaunWu"
	                return;
	            }
				if(wuyueIndex==159){
	                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"wuyue"
	                return;
	            }
				
				if(messageIndex == 180){
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"messageIndex"
					return;
				}
				if(qiyueIndex == 190){
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"qiyue"
					return;
				}
				
				if(newProductsIndex == 200){
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"newProducts"
					return;
				}
				
				if(enterCount && enterCount == 1) {
					enterCount = 2
				} else {
					enterCount = 1
				}
				
				if(theme_detail == 1 && found_index != 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.urlRemain;
				} else
				if(theme_detail == 1 && found_index == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.urlRemain + '&found_index=1';
				} else
				if(theme_list == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?' + this.urlRemain;
				} else
				if(fg_search == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'fg_search?' + this.urlRemain;
					
				} else
				if(found_index == 1 && shoppingBack != 1 && shopping != 1 && theme_detail != 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index';
				} else
				if(exhibition_details == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details';
				} else if(enterCount == 2) {
					this.$router.push({
						path: 'found_index'
					})
				} else
				if(shopping == 1 && shoppingBack != 1 && enterCount == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + this.urlRemain;
				} else
				if(shopping == 1 && shoppingBack == "001") {
//					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + this.urlRemain;
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) +  "messageIndex"
				} else
					//              fubo添加
					if(found_index == 1 && shoppingBack == 1 && theme_detail != 1) {
						var urlParams = window.location.href
						var index1 = urlParams.indexOf('?')
						var index2 = urlParams.indexOf('Back')
						var finishUrl = urlParams.slice(index1 + 1, index2 + 17)
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + finishUrl;
					} else
				if(order_details == 1) {
					var urlParams = window.location.href
					var idDetailIndex = urlParams.indexOf('idDetail')
					var params = urlParams.slice(idDetailIndex, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_details?' + params;
				} else
				if(order_all == 1) {
					var activeIndex = this.$route.query.activeIndex
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?activeIndex=' + activeIndex;
				} else
				if(recommendedGood == 1) {
					//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index';
					this.$router.go(-1)
				} else if(collection == 1) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection';
				} else if(collection == 2) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection_exhibition';
				} else if(collection == 3) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection_theme';
				} else if(categoryIndex != undefined) {
					var urlParams = window.location.href
					var categoryIndex1 = urlParams.indexOf("categoryIndex")
					var categoryParams = urlParams.slice(categoryIndex1, urlParams.length)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'ClassifySecond??' + categoryParams; //返回分类页面
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index';
				}
				
				
			},
			shareAccount() {
				this.$nextTick(() => {
					//先判断是否是在微信中打开的
					var ua = navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i) == "micromessenger") {
						//是在微信中打开
						//   this.getWeXinShare()
						this.showWeChatShareTitle = true
						window._bd_share_config = {};
					} else {
						//不是在微信中打开
						this.getNotWeXinShare()
					}
				})
			},
			//在浏览器中打开分享
			getNotWeXinShare() {
				var _this = this
				_this.popupVisible = true
				if(_this.promotionType == 1){
					
				}
				window._bd_share_config = {
					"common": {
						"bdSnsKey": {},
						"bdText": '售价：' + this.goodDetail.salesPrice + '元/' + this.goodDetail.unit + ', ' + _this.shareDetailName + '-网库好单品',
						"bdMini": "1",
						"bdMiniList": false,
						"bdPic": _this.pics[0],
						"bdStyle": "0",
						"bdSize": "32",
						"bdPic ": ""
					},
					"share": {},
					"image": {
						"viewList": ["qzone", "tsina", "sqq", "weixin"],
						"viewText": "分享到：",
						"viewSize": "32"
					},
					"selectShare": {
						"bdContainerClass": null,
						"bdSelectMiniList": ["qzone", "tsina", "sqq", "weixin"]
					}
				}
				window._bd_share_main && window._bd_share_main.init();
			},
			//关闭在微信中的分享
			shutDownWeChat() {
				this.showWeChatShareTitle = false
			},
			shutDown() {
				this.$nextTick(() => {
					this.popupVisible = false
				})
			},
			//查看更多评论
			checkMore() {
				_czc.push(["_trackEvent", "商品详情页", "查看全部评论", this.name, this.$route.query.commodityId]);
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'find_assess?commodityId=' + this.$route.query.commodityId;
			},
			//点击购物车的时候的选择规格
			chooseStandardCard(item, index) {
				this.showChoosePinPai = false
				this.num = 1
				this.addIsDisabled = false
				this.isDisabled = false
				this.isClickStandcard = 1
				this.selected = index
				this.pdSpce = item
				this.storeNum = item.Number
				this.goodDetail.salesPrice = item.salePrice
				this.goodDetail.promotionPrice = item.promotionPrice
				this.goodDetail.selfStaffPrice = item.selfStaffPrice
				this.onePrice = item.salePrice
				this.totalMoney = this.onePrice * this.num
				if(this.pdSpce.Standard == ''){
					this.transmitCartStandard = '默认规格'
				}else{
					this.transmitCartStandard = this.pdSpce.Standard
				}
				
			},
			//点击购物车的确定
			sureOrderAddCart() {
				if(this.storeNum == 0) {
					/* this.toast = Toast({
					    message: '暂无库存',
					    position: 'center',
					    duration: 3000,
					    className: "detailToast"
					}); */
					alert_msg('暂无库存')
					
				} else {
					if(this.items1.length == 1) {
						if(this.items1[0].Standard === '') {
							this.addCartParams = {
								goodsId: this.$route.query.commodityId,
								goodsNum: this.num,
								goodsSpec: ''
							}
							this.requestShoppingCar()
						} else {
							if(this.transmitCartStandard == '') {
								/* this.toast = Toast({
								    message: '请选择产品属性',
								    position: 'center',
								    duration: 2000,
								    className: "detailToast"
								}); */
								alert_msg('请选择产品属性')
							} else {
								this.addCartParams = {
									goodsId: this.$route.query.commodityId,
									goodsNum: this.num,
									goodsSpec: this.transmitCartStandard
								}
								this.requestShoppingCar()
							}
						}
					} else {
						if(this.transmitCartStandard == '') {
							/*  this.toast = Toast({
							     message: '请选择产品属性',
							     position: 'center',
							     duration: 2000,
							     className: "detailToast"
							 }); */
							alert_msg('请选择产品属性')
						} else {
							this.addCartParams = {
								goodsId: this.$route.query.commodityId,
								goodsNum: this.num,
								goodsSpec: this.transmitCartStandard
							}
							this.requestShoppingCar()
						}
					}
				}
				/*  setTimeout(() => {
				   this.toast.close()
				 }, 2000) */
			},
			//真正去请求加入购物车的接口
			requestShoppingCar() {
				let url = HOST_HDPSHOPCAR + '/addGoods'
				api_post({
					url: HOST_HDPSHOPCAR + '/addGoods',
					data: this.addCartParams
				}).then(res => {
					if(res.code == '0000') {
						//扫码进入详情页 
						this.popupVisible2 = false
						//   this.showRotatePic = true
						this.isFinishAdd = true
						this.isClickAddCart = true
						alert_msg('加入购物车成功！')
					} else if(res.code == -1111) {
						let url = HOST_HDPUSER + '/user/isLogin';
						this.loginCode = window.localStorage.getItem('loginCode')
						this.userId = window.localStorage.getItem('userId')
						this.$resource(url).get({
							loginCode: this.loginCode
						}).then((response) => {
							if(response.status == 200) {
								if(response.data.code < 0) {
									window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
									window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
								}
							}
						})
					} else {
						Toast({
							message: res.message,
							position: 'center',
							duration: 3000
						});
					}
				})
			},
			//点击立即购买的时候选择规格
			// chooseStandarNowBuy(item, index) {
			// 	console.log('111')
			// 	this.showChoosePinPai = false
			// 	this.num = 1
			// 	this.addIsDisabled = false
			// 	this.isDisabled = false
			// 	this.isClickStandcard = 1
			// 	this.selected = index 
			// 	this.pdSpce = item
			// 	this.storeNum = item.Number
			// 	if(this.pdSpce.Standard == ''){
			// 		this.transmitCartStandard = '默认规格'
			// 	}else{
			// 		this.transmitCartStandard = this.pdSpce.Standard
			// 	}
			// 	// 先判断有没有促销价
			// 	let price = this.pdSpce.promotionPrice || this.pdSpce.salePrice
			// 	// console.log(price)
			// 	this.orderParams = [{
			// 		imgUrl: this.goodDetail.pic,
			// 		pdBn: this.pdSpce.id,
			// 		pdName: this.goodDetail.name,
			// 		pdPrice: price,
			// 		pdQuantity: '',
			// 		pdSpce: this.transmitCartStandard,
			// 		siteId: this.goodDetail.siteId,
			// 		supId: '',
			// 		pdUnit: this.goodDetail.unit,
			// 		version: 'v1.2'
			// 	}]
			// 	this.goodDetail.salesPrice = price
			// 	this.goodDetail.salesPrice = item.salePrice
			// 	this.goodDetail.selfStaffPrice = item.selfStaffPrice
			// 	this.onePrice = price
			// 	this.totalMoney = this.onePrice * this.num
			// },
			//真正发出请求去创建预定义订单的方法
			requestAddPreOrder() {
				let _this = this
				this._getUrlParam()
				let userId = window.localStorage.getItem('userId')
				let productId = this.$route.query.commodityId
				let url = HOST_HDPUSER + '/salespromotion/checkProductsPurchase'
				this.loginCode = window.localStorage.getItem('loginCode')
				// setHttpInterceptors(Vue, this.loginCode)
				this.$resource(url).get({
					userId: userId,
					productIds: productId,
					version: 'v1.2'
				}).then((response) => {
					// console.log(response)
					if(response.body.code == 200) {
						if(response.body.respBody != null && response.body.respBody[0].purchaseQuantity == 0) {
							//   this.num = 0
							//   this.toast = Toast({
							//       message: '活动期间秒杀商品限购0件',
							//       position: 'center',
							//       duration: 3000,
							//       className: "detailToast"
							//   });
							alert_msg('还能购买0件，如未支付请去个人中心支付')
							/*  setTimeout(() => {
                            this.toast.close()
                        }, 2000) */
						} else {
							let url = HOST_HDPORDERS + '/hdp/app/order/addPreOrder'
							Indicator.open({
                                // text: '加载中...',
                                spinnerType: 'triple-bounce'
                             });
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
									localStorage.removeItem('scan-ExhibitionTime');
								}
							}
							if(this.items1.length==1){
								this.orderParams[0].pdBn=this.items1[0].id;
								console.log(this.orderParams[0].pdBn)
							}
							this.orderParams[0].exhibitionId = exhibitionId;
							this.orderParams[0].exhibitionName = exhibitionName;
							this.orderParams[0].templateId = this.goodDetail.templateId;
							console.log(this.orderParams)
							api_post({
								url: HOST_HDPORDERS + '/hdp/app/order/addPreOrder',
								data: this.orderParams
							}).then(res => {
								console.log(res)
								if(res.respBody.code == 200) {
									Indicator.close();
									this.key = res.respBody.entity
									//请求收货地址
									let url = HOST_HDPUSER + '/user/pc/getDefaultTradeAddress'
									this.userId = window.localStorage.getItem('userId');
									this.$resource(url).get({
										userId: this.userId
									}).then((response) => {
										console.log(response);
										if(response.status == 200) {
											if(response.body.code == 200) {
												Indicator.close();
												if(response.body.respBody == null) {
													let currentUrl = window.location.href
													let index1 = currentUrl.indexOf('?')
													currentUrl = currentUrl.slice(index1 + 1)
													window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address?' + currentUrl + '&key=' + this.key + '&userId=' + this.userId;
												} else {
													var theme_detail = this.$route.query.theme_detail
													var theme_list = this.$route.query.theme_list
													var fg_search = this.$route.query.fg_search
													var found_index = this.$route.query.found_index
													var exhibition_details = this.$route.query.exhibition_details
													var shopping = this.$route.query.shopping
													var order_all = this.$route.query.order_all
													var order_details = this.$route.query.order_details;
													if(theme_detail == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(theme_list == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(fg_search == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(found_index == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(exhibition_details == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(shopping == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(order_all == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
													if(order_details == 1) {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													} else {
														window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?' + this.urlRemain + '&key=' + this.key;
													}
												}
											} else if(response.body.code == -1) {
												let url = HOST_HDPUSER + '/user/isLogin';
												this.loginCode = window.localStorage.getItem('loginCode')
												this.userId = window.localStorage.getItem('userId')
												this.$resource(url).get({
													loginCode: this.loginCode
												}).then((response) => {
													if(response.status == 200) {
														if(response.data.code < 0) {
															window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
															window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
														}
													}
												})
											} else {
//												Indicator.close();
												this.$alert_msg(response.body.message)
												// Toast({
												//     message: response.body.message,
												//     position: 'center',
												//     duration: 3000
												// });
											}
										}
									})
								} else if(res.code == -1) {
//									Indicator.close();
									let url = HOST_HDPUSER + '/user/isLogin';
									this.loginCode = window.localStorage.getItem('loginCode')
									this.userId = window.localStorage.getItem('userId')
									this.$resource(url).get({
										loginCode: this.loginCode
									}).then((response) => {
										if(response.status == 200) {
											if(response.data.code < 0) {
												window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
												window.localStorage.setItem('goodUrl', window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
											}
										}
									})
								} else if(res.code == -5) {
									//新用户专享
									Indicator.close();
									this.$alert_msg(res.msg)
									// Toast({
									//     message: res.msg,
									//     position: 'center',
									//     duration: 3000
									// });
								} else {
									Indicator.close();
									this.$alert_msg(res.msg)
									// Toast({
									//     message: res.msg,
									//     position: 'center',
									//     duration: 3000
									// });
								}
							})
						}
					}
				})
			},
			//点击立即购买的时候选择规格
			chooseStandarNowBuy(item, index) {
				console.log('222')
				this.showChoosePinPai = false
				this.num = 1
				this.addIsDisabled = false
				this.isDisabled = false
				this.isClickStandcard = 1
				this.selected = index;
				this.pdSpce = item
				this.storeNum = item.Number
				this.transmitCartStandard = this.pdSpce.Standard
				let price = this.pdSpce.promotionPrice || this.pdSpce.salePrice
				this.orderParams = [{
					imgUrl: this.goodDetail.pic,
					pdBn: this.pdSpce.id,
					pdName: this.goodDetail.name,
					pdPrice: price,
					pdQuantity: '',
					pdSpce: this.transmitCartStandard,
					siteId: this.goodDetail.siteId,
					supId: '',
					pdUnit: this.goodDetail.unit,
					version: 'v1.2'
				}]
				this.goodDetail.salesPrice = item.salePrice
				this.goodDetail.promotionPrice = item.promotionPrice
				this.goodDetail.selfStaffPrice = item.selfStaffPrice
				this.onePrice = price
				this.totalMoney = this.onePrice * this.num
			},
			//立即购买的确定下订单
			sureOrderBuyNow() {
				/* if( this.num == 0 || this.num == '' ){
				  /* this.toast = Toast({
				    message:'购买数量不能小于1',
				    position: 'center',
				    duration: 3000,
				    className: "detailToast"
				  }); 
				  alert_msg('购买数量不能小于1')
				} */
				if(this.storeNum == 0) {
					/* this.toast = Toast({
					  message:'暂无库存',
					  position: 'center',
					  duration: 3000,
					  className: "detailToast"
					}); */
					alert_msg('暂无库存')
				} else {
					this.commodityId = this.$route.query.commodityId
					this.loginCode = window.localStorage.getItem('loginCode')
					this.userId = window.localStorage.getItem('userId')
					let url = HOST_HDPUSER + '/user/isLogin';
					this.$resource(url).get({
						loginCode: this.loginCode
					}).then((response) => {
						console.log(response)
						if(response.status == 200) {
							if(response.data.code < 0) {
								window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011" + "&commodityId=" + this.$route.query.commodityId
							} else {
								if(this.items1.length == 1) {
									if(this.items1[0].Standard === '') {
										if(this.totalMoney == '' || this.totalMoney == null) {
											this.totalMoney = this.goodDetail.salesPrice
										} else {
											this.totalMoney = this.totalMoney
										}
										let price = this.items1[0].promotionPrice || this.items1[0].salePrice
										this.orderParams = [{
											imgUrl: this.goodDetail.pic,
											pdBn: this.pdSpce.id,
											pdName: this.goodDetail.name,
											pdPrice: price,
											pdQuantity: this.num,
											pdSpce: '',
											pdId: this.$route.query.commodityId,
											pdUnit: this.goodDetail.unit,
											version: 'v1.2'
										}]
										this.requestAddPreOrder()
									} else {
										if(this.transmitCartStandard == '') {
											/* this.toast = Toast({
											  message: '请选择产品属性',
											  position: 'center',
											  duration:3000,
											  className: "detailToast"
											}); */
											alert_msg('请选择产品属性')
										} else {
											let price = this.pdSpce.promotionPrice || this.pdSpce.salePrice
											this.orderParams = [{
												imgUrl: this.goodDetail.pic,
												pdBn: this.pdSpce.id,
												pdName: this.goodDetail.name,
												pdPrice: price,
												pdQuantity: this.num,
												pdSpce: this.transmitCartStandard,
												pdId: this.$route.query.commodityId,
												pdUnit: this.goodDetail.unit,
												version: 'v1.2'
											}]
											this.requestAddPreOrder()
										}
									}
								} else {
									if(this.transmitCartStandard == '') {
										/* this.toast = Toast({
										  message: '请选择产品属性',
										  position: 'center',
										  duration: 3000,
										  className: "detailToast"
										}); */
										alert_msg('请选择产品属性')
									} else {
										let price = this.pdSpce.promotionPrice || this.pdSpce.salePrice
										this.orderParams = [{
											imgUrl: this.goodDetail.pic,
											pdBn: this.pdSpce.id,
											pdName: this.goodDetail.name,
											pdPrice: price,
											pdQuantity: this.num,
											pdSpce: this.transmitCartStandard,
											pdId: this.$route.query.commodityId,
											pdUnit: this.goodDetail.unit,
											version: 'v1.2'
										}]
										this.requestAddPreOrder()
									}
								}
							}
						}
					})
				}
				/* setTimeout(() => {
				  this.toast.close()
				}, 2000) */
			},
			//立即购买
			buyNow() {
				if(this.isTrade==0){
					return;
				}
				_czc.push(["_trackEvent", "商品详情页", "立即购买", this.name, this.$route.query.commodityId]);
				this.num = 1
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId')
				var exhibitionId = window.localStorage.getItem('scan-exhibitionId');
				this.$resource(url).get({
					loginCode: this.loginCode,
					exhibitionId:exhibitionId
				}).then((response) => {
					console.log(response)
					if(response.status == 200) {
						if(response.data.code < 0) {							
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011&" + this.urlRemain;		
						} else {
							this.popupVisible1 = true
							this.addIsDisabled = false
//							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "order_page";
//							console.log(window.location.href)
						}
					}
				})
			},
			checkProductPurchase1() {
				let userId = window.localStorage.getItem('userId')
				let productId = this.$route.query.commodityId
				let url = HOST_HDPUSER + '/salespromotion/checkProductsPurchase'
				this.$resource(url).get({
					userId: userId,
					productIds: productId,
					version: 'v1.2'
				}).then((response) => {
					if(response.body.code == 200) {
						this.limitedNum = response.body.respBody //限购
						if(this.limitedNum != null && this.limitedNum[0].surplus < this.storeNum) {
							this.storeNum = this.limitedNum[0].surplus //总库存 和 活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].surplus == 0) {
							this.isHaveGood = false //活动库存为0
							return
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity == -1) {
							this.maxNum = this.limitedNum[0].surplus //不限购  就等于活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity > 0 && this.limitedNum[0].purchaseQuantity < this.limitedNum[0].surplus) {
							this.maxNum = this.limitedNum[0].purchaseQuantity //限购数量和活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity > 0 && this.limitedNum[0].purchaseQuantity > this.limitedNum[0].surplus) {
							this.maxNum = this.limitedNum[0].surplus //限购数量和活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity == 0) {
							this.maxNum = 0 //限购数量位0  不显示 可购数量
						}
					}
				})
			},
			//检查商品是否限购
			checkProductPurchase() {
				let userId = window.localStorage.getItem('userId')
				let productId = this.$route.query.commodityId
				let url = HOST_HDPUSER + '/salespromotion/checkProductsPurchase'
				this.$resource(url).get({
					userId: userId,
					productIds: productId,
					version: 'v1.2'
				}).then((response) => {
					if(response.body.code == 200) {
						this.limitedNum = response.body.respBody //限购
						if(this.limitedNum != null && this.limitedNum[0].surplus < this.storeNum) {
							this.storeNum = this.limitedNum[0].surplus //总库存 和 活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].surplus == 0) {
							this.isHaveGood = false
							return
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity == -1) {
							this.maxNum = this.limitedNum[0].surplus //不限购  就等于活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity > 0 && this.limitedNum[0].purchaseQuantity < this.limitedNum[0].surplus) {
							this.maxNum = this.limitedNum[0].purchaseQuantity //限购数量和活动库存
						}
						if(this.limitedNum != null && this.limitedNum[0].purchaseQuantity > 0 && this.limitedNum[0].purchaseQuantity > this.limitedNum[0].surplus) {
							this.maxNum = this.limitedNum[0].surplus //限购数量和活动库存
						}
						if(this.limitedNum == null || this.limitedNum[0].purchaseQuantity == -1) {
							//不限购  或 参加活动 但不限购 有活动库存
							if(this.num >= 1) {
								this.isDisabled = false
							}
							//   if(this.num >= this.limitedNum[0].surplus){
							//       this.addIsDisabled = true
							//       this.isDisabled = false
							//       alert_msg('活动库存为'+this.limitedNum[0].surplus)
							//   }
							if(this.num >= this.storeNum) {
								this.addIsDisabled = true
								this.isDisabled = false
								/*  this.toast = Toast({
								     message: '库存为' + this.storeNum,
								     position: 'center',
								     duration: 3000,
								     className: "detailToast"
								 }); */
								alert_msg('库存为' + this.storeNum)
							} else {
								this.num++;
							}
						} else {
							//限购
							if(this.num >= this.storeNum) {
								this.addIsDisabled = true
								this.isDisabled = false
								/* this.toast = Toast({
								    message: '库存为' + this.storeNum,
								    position: 'center',
								    duration: 3000,
								    className: "detailToast"
								}); */
								alert_msg('库存为' + this.storeNum)
							} else if(this.num >= this.limitedNum[0].surplus) {
								if(this.limitedNum[0].purchaseQuantity == 0) {
									//   this.num=0
									this.isDisabled = true
								} else {
									this.isDisabled = false
								}
								this.addIsDisabled = true
								//   this.toast = Toast({
								//       message: '活动期间秒杀商品限购'+this.limitedNum.purchaseQuantity+'件',
								//       position: 'center',
								//       duration: 3000,
								//       className: "detailToast"
								//   });
								alert_msg('还能购买' + this.limitedNum[0].surplus + '件，如未支付请到个人中心支付')
								//  this.num = this.limitedNum[0].purchaseQuantity
							} else if(this.num >= this.limitedNum[0].purchaseQuantity) {
								if(this.limitedNum[0].purchaseQuantity == 0) {
									//   this.num=0
									this.isDisabled = true
								} else {
									this.isDisabled = false
								}
								this.addIsDisabled = true
								//   this.toast = Toast({
								//       message: '活动期间秒杀商品限购'+this.limitedNum.purchaseQuantity+'件',
								//       position: 'center',
								//       duration: 3000,
								//       className: "detailToast"
								//   });
								alert_msg('还能购买' + this.limitedNum[0].purchaseQuantity + '件，如未支付请到个人中心支付')
								//  this.num = this.limitedNum[0].purchaseQuantity
							} else {
								this.num++;
								this.isDisabled = false
							}
						}
						/*  setTimeout(() => {
                        this.toast.close()
                    }, 2000) */
						this.totalMoney = this.goodDetail.salesPrice * this.num
					}
				})
			},
			//增加
			add() {
				if(this.items1.length == 1) {
					if(this.items1[0].Standard === '') {
						this.checkProductPurchase()
					} else {
						if(this.transmitCartStandard == '') {
							/* this.toast = Toast({
							    message: '请选择产品属性',
							    position: 'center',
							    duration: 2000,
							    className: "detailToast"
							}); */
							alert_msg('请选择产品属性')
						} else {
							this.checkProductPurchase()
						}
					}
				} else {
					if(this.transmitCartStandard == '') {
						/* this.toast = Toast({
						    message: '请选择产品属性',
						    position: 'center',
						    duration: 2000,
						    className: "detailToast"
						}); */
						alert_msg('请选择产品属性')
					} else {
						this.checkProductPurchase()
					}
				}
				/*  setTimeout(() => {
				     this.toast.close()
				 }, 2000) */
			},
			//减少
			minus() {
				if(this.items1.length == 1) {
					if(this.items1[0].Standard === '') {
						if(this.num > 1) {
							this.num--;
							if(this.num < this.storeNum) {
								this.addIsDisabled = false
							}
						} else {
							this.isDisabled = true
						}
						this.totalMoney = this.goodDetail.salesPrice * this.num
					} else {
						if(this.transmitCartStandard == '') {
							/* this.toast = Toast({
							    message: '请选择产品属性',
							    position: 'center',
							    duration: 2000,
							    className: "detailToast"
							}); */
							alert_msg('请选择产品属性')
						} else {
							if(this.num > 1) {
								this.num--;
								if(this.num < this.storeNum) {
									this.addIsDisabled = false
								}
							} else {
								this.isDisabled = true
							}
							this.totalMoney = this.onePrice * this.num
						}
					}
				} else {
					if(this.transmitCartStandard == '') {
						/* this.toast = Toast({
						    message: '请选择产品属性',
						    position: 'center',
						    duration: 2000,
						    className: "detailToast"
						}); */
						alert_msg('请选择产品属性')
					} else {
						if(this.num > 1) {
							this.num--;
							if(this.num < this.storeNum) {
								this.addIsDisabled = false
							}
						} else {
							this.isDisabled = true
						}
						this.totalMoney = this.onePrice * this.num
					}
				}
				/*  setTimeout(() => {
				     this.toast.close()
				 }, 2000) */
			},
			//判断input输入的数字是否为0
			checkNumIsZero() {
				let userId = window.localStorage.getItem('userId')
				let productId = this.$route.query.commodityId
				let url = HOST_HDPUSER + '/salespromotion/checkProductsPurchase'
				this.$resource(url).get({
					userId: userId,
					productIds: productId,
					version: "v1.2"
				}).then((response) => {
					if(response.body.code == 200) {
						this.limitedNum = response.body.respBody
						if(this.limitedNum == null || this.limitedNum[0].purchaseQuantity == -1) {
							//不限购 或者参加活动 但不限购
							if(this.num > this.storeNum) {
								/* this.toast = Toast({
								    message: '库存为' + this.storeNum,
								    position: 'center',
								    duration: 2000,
								    className: "detailToast"
								}); */
								alert_msg('库存为' + this.storeNum)
								this.num = this.storeNum
								this.addIsDisabled = true
								this.isDisabled = false
							}
							if(this.num > this.limitedNum[0].surplus) {
								/* this.toast = Toast({
								    message: '库存为' + this.storeNum,
								    position: 'center',
								    duration: 2000,
								    className: "detailToast"
								}); */
								alert_msg('库存为' + this.limitedNum[0].surplus)
								this.num = this.limitedNum[0].surplus
								this.addIsDisabled = true
								this.isDisabled = false
							} else {
								this.addIsDisabled = false
							}
							//判断输入的不是数字或者小于0的时候
							if(isNaN(this.num) === true) {
								this.num = 1
							}
							if(this.num === '-' || this.num === '+') {
								this.num = 1
							}
						} else {
							if(this.num >= this.limitedNum[0].surplus && this.limitedNum[0].surplus <= this.limitedNum[0].purchaseQuantity) {
								//   this.toast = Toast({
								//       message: '活动期间秒杀商品限购'+this.limitedNum.purchaseQuantity+'件',
								//       position: 'center',
								//       duration: 3000,
								//       className: "detailToast"
								//   });
								alert_msg('还能购买' + this.limitedNum[0].surplus + '件')
								this.num = this.limitedNum[0].surplus
								this.addIsDisabled = true
								this.isDisabled = false
							} else if(this.num >= this.limitedNum[0].purchaseQuantity && this.limitedNum[0].surplus > this.limitedNum[0].purchaseQuantity) {
								//   this.toast = Toast({
								//       message: '活动期间秒杀商品限购'+this.limitedNum.purchaseQuantity+'件',
								//       position: 'center',
								//       duration: 3000,
								//       className: "detailToast"
								//   });
								alert_msg('还能购买' + this.limitedNum[0].purchaseQuantity + '件')
								this.num = this.limitedNum[0].purchaseQuantity
								this.addIsDisabled = true
								this.isDisabled = false
							} else {
								this.addIsDisabled = false
								this.isDisabled = false
							}
							//判断输入的不是数字或者小于0的时候
							if(isNaN(this.num) === true) {
								this.num = 1
							}
							if(this.num === '-' || this.num === '+') {
								this.num = 1
							}
						}
						/* setTimeout(() => {
						    this.toast.close()
						}, 2000) */
						this.totalMoney = this.num * this.onePrice
					}
				})
			},
			//关闭商品规格
			showDownCart1() {
				this.popupVisible1 = false
			},
			//关闭商品规格
			showDownCart2() {
				this.popupVisible2 = false
				this.showRotatePic = false
			},
			//进入展厅
			enterExhibition() {
				if(this.isExhibition) return;
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'goodsparent?' + this.urlRemain;
			},
			//进入客服
			enterService() {
				_czc.push(["_trackEvent", "商品详情页", "点击客服"]);
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId')
				var urlParams = window.location.href; //获取url中"?"符后的字串
				var index = urlParams.indexOf('?')
				this.urlRemain = urlParams.substring(index + 1, urlParams.length)
				let url = HOST_HDPUSER + '/user/isLogin';
				this.$resource(url).get({
					loginCode: this.loginCode
				}).then((response) => {
					if(response.status == 200) {
						if(response.data.code < 0) {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=013" + '&' + this.urlRemain;
						} else {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'customer_service_new?commodityId=' + this.$route.query.commodityId;
						}
					}
				})
			},
			//发布采购需求
			releasePurchase() {
				this.loginCode = window.localStorage.getItem('loginCode')
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId')
				this.$resource(url).get({
					loginCode: this.loginCode
				}).then((response) => {
					if(response.status == 200) {
						if(response.data.code < 0) {
							//   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=013" + '&' + this.urlRemain + '&releaseBack=002'
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?" + '&' + this.urlRemain + '&releaseBack=002' //获取展厅id
						} else {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'publish_purchase?releaseBack=004'
						}
					}
				})
			},
			//加入购物车
			addShoppingCart() {
				if(this.isTrade==0){
					return;
				}
				_czc.push(["_trackEvent", "商品详情页2", "加入购物车2", "测试商品2", "1122211"]);
//				var _czc = _czc || [];
			    _czc.push(["_trackEvent", "商品详情页", "加入购物车", this.name, this.$route.query.commodityId]);
			    // console.log(_czc)
			   	
				var _this = this
				// setTimeout(function () {
				//     var model = document.getElementsByClassName('v-modal')[0]
				//     model.addEventListener('click', function () {
				//         _this.showRotatePic = false
				//     })
				// }, 500)
				
				_this.num = 1
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId')
				this.$resource(url).get({
					loginCode: _this.loginCode
				}).then((response) => {
					if(response.status == 200) {
						if(response.data.code < 0) {
							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011&" + _this.urlRemain;
//							window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) +  "messageIndex"
						} else {
							_this.popupVisible2 = true
							_this.addIsDisabled = false
							_this.initPicAddCar = true
							_this.initRotateToCart = true
							_this.isFinishAdd = false
							_this.isClickAddCart = false
						}
					}
				})
			},
			//点击购物车图片，进入购物车
			picAddCar() {
				_czc.push(["_trackEvent", "商品详情页", "进入购物车"]);
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId');
				if(this.loginCode != "" && this.loginCode != null) {					
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex?modFlag='+'99'									
				} else {
					var carUrl1 = window.location.href;
					var index1 = carUrl1.indexOf('?')
					var urlRemain1 = carUrl1.slice(index1 + 1, carUrl1.length + 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=120" + '&' + urlRemain1
				}				
			},
			closeHandle() {
				this.logoBoxShow = false;
			},
			jumpLimit(status) {
				this.$router.push({
					path: 'limitTimeBuy',
					query: {
						status: status
					}
				})
			},
			timeEndEvent() {
				this.getGoodDetailData()
			}
		},
		watch: {
			$route(val, oldVal) {
				// 如果从猜你喜欢返回的话，因为路径没变，所以页面没有刷新，所以手动刷新一下
				//   document.body.scrollTop = 0
				//   document.documentElement.scrollTop = 0
				
				var _czc = _czc || [];
				//绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
//				_czc.push(["_setAccount", "1273200538"]);
				// _czc.push(["_trackPageview", "/#/good_detail?commodityId=this.$route.query.commodityId&found_index=1"]);
//				_czc.push(["_trackEvent", "H5好单品商品详情", "点击"]);
//				_czc.push(["_trackEvent", "商品详情页", "加入购物车", "测试商品", "1122211"]);
				// _czc.push(["_setCustomVar", "是否登录", "是、否", "-1"]);
				if(window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
				
				window.location.reload()
				let e = localStorage.getItem('loginCode')
			}
			
		}
	}
</script>
