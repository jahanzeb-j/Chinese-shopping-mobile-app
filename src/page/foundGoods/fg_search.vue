﻿<template>
	<div class="p-background">
		<div class="p-search-box">
			<div class="p-search">
				<!--<div class="cancel1" @click="back1" v-if="searchBack==3"><img style="height: 2rem;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></div>-->
				<!--<router-link to="/found_index" >
          			<div class="cancel1" @click="back" v-if="searchBack==1"><img style="height: 2rem;;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></div>
        			</router-link>-->
				<!--<router-link to="/found_index" v-if="resultView">-->
					<!--<img style="height: 1.5rem;" src="../../assets/images/returnFront1.png" alt="">-->
				<!--</router-link>-->
				<!--<div class="cancel2" @click="search()"><img style="height: 2rem;margin-top: 0.1rem;" src="../../assets/images/search-icon1.png" alt=""></div>-->
				<form action="javascript:return true" id="search_from" >
					<input type="text" placeholder="搜索好单品" maxlength="100" @focus="focusHistory" autofocus="autofocus" id="search" class="custom-input"  ref="input1" v-model="searchName" v-on:keyup.13="search()">
				</form>
				<div class="cancel2 cancel21" @click="searchNo()" v-if="this.searchName =='' "><img  src="../../assets/images/newFindGood1.png" alt=""></div>
				<div class="cancel2 cancel21" @click="search()" v-if="this.searchName !='' "><img  src="../../assets/images/newFindGood1.png" alt=""></div>
				<div class="cancel2 cance22" @click="clearSearch()" v-if="this.searchName !='' "><img  src="../../assets/images/clearNumber.png" alt=""></div>
				<p class="quxiao" @click="reList()">取消</p>
			</div>
			<div class="r-title1"></div>
		</div>
		<div class="p-search-bottom"></div>
		<div v-if='historyList.length == 0 && !isShowHistory' class='noSearch'>
			<div class="renpic" >
				<img src="../../assets/images/new/icon@2x.png" alt="" />
			</div>
			<p class="nullno">还没有任何搜索记录，快去搜索一下吧~</p>
		</div>
		
		<div v-else-if='!isShowHistory' class="history">
			<div class="title">
				<div class="ls">历史记录</div>
				<img class="qc" @click="clear1" src="../../assets/images/delete_icon@2x.png" alt="" />
			</div>
			<ul class="icon historylen">
				<li @click="search(item)" v-for="(item,index) in historyList">{{item}}</li>
			</ul>
		</div>
		<div class="noResult" v-if="isResult == 3 && isShowHistory">
			<!--<div class="ren_null"><img src="../../assets/images/ren@2x.png" alt="" /></div>-->
			<div class="zw">抱歉未找到，告诉我您的需求吧～</div>
			<!--<div class="fb" @click="checkLogin"><img src="../../assets/images/按钮bg@2x.png" alt="" /></div>-->
			<div class="fb" @click="checkLogin">发布采购</div>
		</div>
		<div class="hasResult" v-if="isResult == 1 && isShowHistory">
			<div class="r-title-box">
				<div class="r-title">
					<span @click="priceText()" :class="{active:isPriceText}">综合
			            <!--<img v-if="isPriceText && !textDown" style="width: 1.2rem;margin-bottom:0.15rem;" src="../../assets/images/up-yellow.png" alt="">
			            <img v-if="isPriceText &&  textDown" style="width: 1.2rem;margin-bottom:0.15rem;" src="../../assets/images/down-yellow.png" alt="">-->
		          	</span>
					<span @click="sellSort()" :class="{active:isSellActive}">销量
						<span class="active_img">
							<!--<img v-if="isSellActive && sellDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_sel@2x.png" alt="">
				            <img v-if="isSellActive && !sellDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_nor@2x.png" alt="">
				            <img v-if="isSellActive && sellDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_nor@2x.png" alt="">
				            <img v-if="isSellActive && !sellDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_sel@2x.png" alt="">-->
						</span>
			        	</span>
					<span @click="priceSort()" :class="{active:isPriceActive}">价格
						<span class="active_img">
							<img v-if="isPriceActive && priceDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_sel@2x.png" alt="">       
							<img v-if="isPriceActive && !priceDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_nor@2x.png" alt="">       
							<img v-if="isPriceActive && priceDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_nor@2x.png" alt="">
							<img v-if="isPriceActive && !priceDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_sel@2x.png" alt="">
						</span>		         		
		          	</span>
					<span @click="newPort()" :class="{active:isNewPort}">新品
						<span class="active_img">
				            <!--<img v-if="isNewPort && portDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_sel@2x.png" alt="">
				            <img v-if="isNewPort && !portDown" style="width:0.85rem; position: absolute;top: 1.1rem;" src="../../assets/images/shang_nor@2x.png" alt="">
				            <img v-if="isNewPort && portDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_nor@2x.png" alt="">
				            <img v-if="isNewPort && !portDown" style="width:0.85rem; position: absolute;top: 1.8rem;" src="../../assets/images/xia_sel@2x.png" alt="">-->
			            </span>
		            </span>
				</div>
			</div>
			<div class="r-title-bottom"></div>
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="lastPage" infinite-scroll-distance="10">
				<div class="list clearfix" v-for="(item,index) in list" @click="jumpDetail(item.commodityId)" :key="index">
					<div class="pic"><img :src="item.pic"></div>
					<!--<div class="pic"><img v-bind:src="item.pic"></div>-->
					<div class="text">
						<p class="p1"><span v-if="item.purchaseQuantityShow" class="limit-deadline">限时秒杀</span>{{item.name}}</p>
						<p class="p_p1">{{ item.subName }}</p>
						<div>
							<div v-for="(type,index2) in item.fullSingleActivity" :key="index2">
								<div v-if="type.saleType == 3">
									<p class="p2 all_reduce">满减</p>
									<p class="p2 sub-title">满{{type.howYuan}}减{{type.fullLessCash}}</p>
								</div>
								<div v-if="type.saleType == 4">
									<p class="p2 all_reduce">满减</p>
									<p class="p2 sub-title">满{{ type.howYuan}}打{{ type.fullDiscount }}折</p>
								</div>
								<div v-if="type.saleType == 5">
									<p class="p2 all_reduce">满减</p>
									<p class="p2 sub-title">满{{ type.howPiece }}件减{{ type.fullLessCash }}</p>
								</div>
								<div v-if="type.saleType == 6">
									<p class="p2 all_reduce">满减</p>
									<p class="p2 sub-title">满{{ type.howPiece }}件打{{ type.fullDiscount }}折</p>
								</div>
							</div>
						</div>
						<!--<p v-if="item.isPromotion == 0"><span>¥<b>{{item.salesPrice?item.salesPrice:0}}</b>元</span>/{{item.unit}} <span class="cj">已成交{{item.salesNum?item.salesNum:0}}笔</span></p>
              <p v-if="item.isPromotion == 1"><span>¥<b>{{item.promotionPrice?item.promotionPrice:0}}</b>元</span>/{{item.unit}} <span class="cj">已成交{{item.salesNum?item.salesNum:0}}笔</span></p>-->
						<p class="p_p2">
							<span class="cj_1" style="color: #EB544D; font-size: 1.5rem;">¥ {{item.salesPrice}} </span>
							<span class="cj_1" style="color: #C1AA72; font-size: 1.2rem;" v-if="item.vipPrice != null ">¥{{item.vipPrice}}
								<span class="guanli" ><img src="../../assets/images/VIP-small 拷贝@2x.png" alt="" /><!--<span class="wenzi">会员管理</span>--></span> 
							</span>
							<span class="cj" v-if="item.salesNum != 0 ">已成交{{item.salesNum}}笔</span>
						</p>
						<!--<p><span>{{ item.onShelfName }}</span></p>-->
					</div>
				</div>
				<div class="sp-bottom" v-if="!lastPage">加载更多</div>
				<div v-show="lastPage" class="sp-bottom"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
				<!--已售完商品展示-->
				<template v-for="(item,index) in goodListPrice" v-if="isTrade == ''">
					<div class="list clearfix text_shouwan">
						<div class="pic pic_null">
							<img src="../../assets/images/addImage.png" alt="" />
							<p class="pic_shouwan">已售完</p>
						</div>
						<div class="text">
							<!--<p class="p1"><span class="limit-deadline">限时秒杀</span></p>-->
							<p class="p1">{{ item.name }}</p>
							<p class="p_p1">这是副标题</p>
							<div>
								<div>
									<!--<p class="p2 all_reduce" >满减</p>
		                  			<p class="p2 sub-title">满减</p>-->
								</div>
							</div>
							<!--<p><span>¥<b>ddd </b>元</span>/ ffff <span class="cj">已成交ffff笔</span></p>-->
							<!--<p><span>¥<b>90</b>元</span>/ 规格<span class="cj">已成交{{item.salesNum}}笔</span></p>-->
						</div>
					</div>
					<!-- <div class="sp-bottom" v-if="loading">加载中...</div> -->
				</template>
			</div>
		</div>
		<!--当无任何搜索的商品时候显示热卖推荐模块-->
		<div v-if="isResult != 1 && isShowHistory">
			<div class="recommended">
				<div class="recommendedTitle">
					<p class="remai">热卖推荐</p>
				</div>
				<div class="fresh_goods" >
			       <div class="goods fl" v-for='(item,index) in hotList' :key='index' @click="jumpGoodsDetail(item.contentLinkAddress,item.commodityId)">
						<div class="fresh_goods_icon">
							<img :src="item.pic" alt="">
							<!--<p>{{item.subTitle}}</p>-->
							<div class="mask mask1" v-if="item.fullReduction != null">{{item.fullReduction}}</div>
							<div class="mask mask1" v-else-if="item.moneyOff != null">{{item.moneyOff}}</div>
							<div class="mask" v-else-if="item.subName != '' && item.subName != null">{{item.subName}}</div>
							<div class="mask" v-else>企业采购就在好单品</div>
						</div>
						<div class="fresh_goods_text">
							{{item.name}}
						</div>
						<div class="fresh_goods_m" v-if="item.isPromotion != 0 ">
							<!--<span>¥<b>{{item.promotionPrice}}</b></span>-->
							<span>¥<b>{{item.salesPrice}}</b></span>
						</div>
						<div class="fresh_goods_m" v-else>
							<span>¥<b>{{item.promotionPrice}}</b></span>
							<span style="text-decoration: line-through; color: #747474;">¥<b>{{item.salesPrice}}</b></span>
						</div>
					</div>
     			</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	import { router } from '../../router/index.js'
	import { Toast, MessageBox } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	export default {
		data() {
			return {
				issalesNum:true,
				vipPrice:'',
				isShowHistory: 2,
				isResult: 2,
				isPriceText: false,
				resultView: false,
				isPriceActive: false,
				isSellActive: false,
				isNewPort: false,
				priceDown: false,
				sellDown: false,
				textDown: false,
				portDown: false,
				searchName: '',
				list: [],
				historyList: [],
				currNum: 1,
				loading: false,
				mShow: false,
				more: true,
				listShow: '',
				name: '',
				id: '',
				searchBack: 2,
				saveName: '',
				showBackground: '加载更多',
				fullLess: '',
				howYuan: '',
				fullLessCash: '',
				lastPage: "",
				recommendGoods: '',
				goodListPrice: [],
				orderNumBy: 1,
				categoryId: '',
				pageSize: 10,
				title: '',
				salePrice: '',
				timeSort: [],
				time1: '',
				hotList: [],
				isTrade: '',
				fullReduction: false,
				sortPrice: '',
				promationPrice: '',
				onShelfName:'',
				moneyOff:'',
				commodityId:''
			}
		},
		watch: {
			searchName(val, oldVal) {
				this.currNum = 1
			}
		},
		mounted() {
			var adminId = document.getElementById("search");
			adminId.focus();
			this.$nextTick(() => {
				let body = document.getElementsByTagName('body')[0]
				body.scrollTop = 0
			})
			this.historyList = this.getStorage()
			this.listShow = window.localStorage.getItem('hello');
			var name = this.$route.query.name
			var id = this.$route.query.id
			var found_index = this.$route.query.found_index;
			this.name = name
			this.id = id
			var acd = this.$route.query.acd
			this.isShowHistory = false;
			if(id) {
				this.search(name, id)
				this.isShowHistory = true;
			}
			if(acd == 123) {
				this.searchName = this.$route.query.saveName
				this.search();
				this.searchBack = 3
			}
			if(acd == 231) {
				this.searchBack = 1
//				this.search();
	//        	$(".p-background").css({"background": "#fff","height": "100%"})
			}
			if(found_index == 1) {
				this.searchBack = 1
			}
			if(acd == 321 || acd == 4321) {
				this.searchBack = 1
			}
			if(this.listShow == 'world') {
				this.listShow = this.getStorage("hello");
	//        	this.search( this.getStorage("search_goods")[0],id);
			}
			if(this.$route.query.releaseBack == "003") {
				this.isShowHistory = true
				this.isResult = 3
				this.searchBack = 3
			}
			$("#search").keypress(function(e){ if(e.keyCode === 13) { 
				var keycode = e.keyCode;  
                var searchName = $(this).val(); 
				if(keycode=='13') {  
                    e.preventDefault();    
                    //请求搜索接口  
//                  this.search();  
                }  
			} })
			
		},
		methods: {
			//	热卖商品接口
			getOrderHotList() {
				var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/getOrderHotList';
				var params = {
					currNum: 1,
					pageSize: 10
				}
				this.$resource(url).get(params).then((res) => {
					if(res.body.code == 200) {
						this.hotList = res.body.respBody;
						for(var i = 0; i < this.hotList.length; i++) {
							this.fullReduction = this.hotList[i].fullReduction;
							this.title = this.hotList[i].name;
							this.subName = this.hotList[i].subName;
							this.salesPrice = this.hotList[i].salesPrice;
							this.pic = this.hotList[i].pic;
							this.vipPrice = this.hotList[i].vipPrice;
							this.promotionPrice = this.hotList[i].promotionPrice;
						}
					}
				})
			},
			jumpGoodsDetail(url,id){
		          //跳转商品		          
		        if(window.Android){
		            window.Android.intent(url)
		        }else{
		            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+id+'&found_index=1'
		        }
		    },
			clearSearch() {
				this.searchName = '';
				$("#search").focus();
			},
			reList() {
				this.searchName = '';
				var acd = this.$route.query.acd;
				if(acd == 231){
					this.isShowHistory = false;
					$("#search").focus();
					this.$router.go(-1)
				}else if(acd == 123){
					this.isShowHistory = false;		
					$("#search").focus();
					this.$router.go(-3)
				}else if(acd == 'newProducts'){
					this.$router.replace({path: 'newProducts'})
				}else{
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index';
				}
			},
			searchNo() {
				Toast({
					message: '请输入搜索内容',
					duration: 3000,
					className: "toast"
				});
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "fg_search?acd=231"								
			},
			focusHistory() {
				$(".p-background").css({
					"background": "#fff",
					"height": "100%"
				})
				// this.searchName = "";
				this.isResult = 2;
				this.isShowHistory = false;
			},
			//判断是否登录
			checkLogin() {
				let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId')
				if(this.loginCode != "" && this.loginCode != null) {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "publish_purchase?releaseBack=003"
				} else {
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=001"
				}
			},
			
			showList() {
				// this.isShowHistory = false
				this.isShowHistory = true
				this.isResult = 1
				this.resultView = true
			},
			showNoData() {
				// this.isShowHistory = false
				this.isShowHistory = true
				this.isResult = 3
				this.resultView = true
			},
			// 价格排序
			priceSort() {
				this.currNum = 1;
				this.isPriceActive = true
				this.isSellActive = false
				this.isPriceText = false;
				this.isNewPort = false;
				this.priceDown = !this.priceDown;
				if (this.priceDown) {
			        let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:3,
			       		pageSize: 10,
			        }
			        var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			        this.$resource(url).get(params).then((response) =>{
			        		if(response.body.code == 200) {
			        			this.list = response.body.respBody;
			        		}
			        })
			        window.localStorage.setItem('oNumBy',3)
			        this.loadMore(3)
		        } else {
		          	let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:4,
			       		pageSize: 10,
			        }
		          	var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			        this.$resource(url).get(params).then((response) =>{
			        		if(response.body.code == 200) {
			        			this.list = response.body.respBody;
			        		}
			        })
			        window.localStorage.setItem('oNumBy',4)
			        this.loadMore(4)
		        }
			},
			// 销量
			sellSort() {
				this.currNum = 1;
				this.isSellActive = true
				this.isPriceActive = false
				this.isPriceText = false;
				this.isNewPort = false;
				this.sellDown = !this.sellDown;
				if (this.sellDown) {
			        let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:2,
			       		pageSize: 10,
			        }
			        var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			        this.$resource(url).get(params).then((response) => {
						this.loading = false
						if(response.body.code == 200 && response.body.respBody.length > 0) {
							this.list = response.body.respBody
						}	
					})
			        window.localStorage.setItem('oNumBy',2)
					this.loadMore(2);
		        } else {
		          	let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:6,
			       		pageSize: 10,
			        }
		          	var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			       	 this.$resource(url).get(params).then((response) => {
						this.loading = false
						if(response.body.code == 200 && response.body.respBody.length > 0) {
							this.list = response.body.respBody
						}	
					})
			       	window.localStorage.setItem('oNumBy',6)
					this.loadMore(6);
		        }
			},
			// 综合
			priceText() {
				this.currNum = 1;
				this.isPriceText = true;
				this.isPriceActive = false;
				this.isSellActive = false;
				this.isNewPort = false;
				this.textDown = !this.textDown;
				let params ={
		       		name: this.searchName,
		       		currNum: this.currNum,
		       		orderNumBy:1,
		       		pageSize: 10,
		        }
		        var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
		        this.$resource(url).get(params).then((response) =>{
		        		if(response.body.code == 200) {
		        			this.list = response.body.respBody;
		        		}
		        })
		        	window.localStorage.setItem('oNumBy',1)
		        this.loadMore(1)
			},
			// 新品
			newPort() {
				this.currNum = 1;
				this.isPriceText = false;
				this.isPriceActive = false;
				this.isSellActive = false;
				this.isNewPort = false;
				this.isNewPort = true;
				this.portDown = !this.portDown;
				if (this.portDown) {
			        let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:5,
			       		pageSize: 10,
			        }
			        var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			        this.$resource(url).get(params).then((response) =>{
			        		if(response.body.code == 200) {
			        			this.list = response.body.respBody;
			        		}
			        })
			        window.localStorage.setItem('oNumBy',5)
			        this.loadMore(5)
		        } else {
		          	let params ={
			       		name: this.searchName,
			       		currNum: this.currNum,
			       		orderNumBy:1,
			       		pageSize: 10,
			        }
		          	var url = HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList'
			        this.$resource(url).get(params).then((response) =>{
			        		if(response.body.code == 200) {
			        			this.list = response.body.respBody;
			        		}
			        })
			        window.localStorage.setItem('oNumBy',1)
			        this.loadMore(1)
		        }
				
			},
			setStorage(str) {
				let arr = this.getStorage();
				if(!str) {
					return
				}
				if(arr) {
					arr.unshift(str)
					var n = []; //一个新的临时数组
					for(let i = 0; i < arr.length; i++) {
						//如果当前数组的第i已经保存进了临时数组，那么跳过，
						//否则把当前项push到临时数组里面
						if(n.indexOf(arr[i]) == -1) n.push(arr[i]);
					}
					arr = n;
					if(arr.length > 6) {
						arr.pop()
					}
				} else {
					arr = []
					arr.unshift(str)
				}
				window.localStorage.setItem('search_goods', JSON.stringify(arr))
			},
			getStorage() {
				return JSON.parse(window.localStorage.getItem('search_goods')) || []
			},
			clear1() {
				localStorage.removeItem("search_goods");
				this.historyList = [];
				$("#search").focus();
//				MessageBox
//				.confirm('确认清空历史记录?')
//				.then(action => {
//					localStorage.removeItem("search_goods");
//					this.historyList = []
//				});
			},
			search(item, id) {
				if(this.$route.query.acd == 231) {
					this.searchBack = 3
				}
				if(!id && item) {
					this.searchName = item
					this.currNum = 1
					var params = {
						name: this.searchName,
						currNum: this.currNum,
						pageSize: 10,
					};
					this.name = params.name
					this.id = params.categoryId
					router.push({
						path: 'fg_search',
						query: {
							acd: 231,
							id: this.id,
							name: this.name
						}
					})
				} else if(id && item) {
					this.searchName = item
					var params = {
						categoryId: id,
						currNum: this.currNum,
						pageSize: 10,
					};
				} else if(!id && !item) {
					this.currNum = 1
					var params = {
						name: this.searchName,
						currNum: this.currNum,
						pageSize: 10,
					};
				}		
				this.$resource(HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList').get(params).then((response) => {
					if(response.body.code == 200) {
						this.setStorage(this.searchName)
						this.historyList = this.getStorage();
						if(response.body.code == 200 && response.body.respBody.length > 0) {
							if(response.body.respBody.length < this.pageSize) {
								this.lastPage = true
							} else {
								this.lastPage = false
							}
							let temp = response.body.respBody;
							temp.forEach((e, i) => {
								let fullSingleActivity = JSON.parse(e.fullSingleActivity)
								if(fullSingleActivity != null) {
									fullSingleActivity.forEach(ele => {
										if(ele.promotionType == 2) {
											this.howYuan = ele.howYuan
											this.fullLessCash = ele.fullLessCash
										}
									})
									e.purchaseQuantityShow = fullSingleActivity.some(ele2 => ele2.hasOwnProperty('salesLable') && ele2.salesLable == '限时秒杀')
								} else {
									e.purchaseQuantityShow = false
								}
							})
							this.list = temp;
							if(this.list.length > 5) {
								this.mShow = true
								this.more = true
								if(this.more) {
									$(".p-background").css({
										"background": "#fff",
										"height": "100%"
									})
								}
							} else {
								this.mShow = true
								this.more = false
								//this.lastPage=true
								if(!this.more) {
									$(".p-background").css({
										"background": "#f4f4f4",
										"height": "100%"
									})
								}
							}
							for(let i = 0; i < this.list.length; i++) {
								this.title = this.list[i].name;
								this.pic = this.list[i].pic;
								this.salesPrice = this.list[i].salesPrice;
								this.selfEnterprisePrice = this.list[i].selfEnterprisePrice
								this.isTrade = this.list[i].isTrade;
//								if(this.list[i].pic.indexOf(',') != -1) {
//									this.list[i].pic = this.list[i].pic.substring(0, this.list[i].pic.indexOf(','));
//								}
//								if(this.list[i].salesPrice.indexOf('-') != -1) {
//									this.list[i].salesPrice = this.list[i].salesPrice.substr(0, this.list[i].salesPrice.indexOf('-'))
//								}
//								if(this.list[i].promotionPrice) {
//									if(this.list[i].promotionPrice.indexOf('-') != -1) {
//										this.list[i].promotionPrice = this.list[i].promotionPrice.substr(0, this.list[i].promotionPrice.indexOf('-'))
//									}
//								}
							}
							this.sellDown = false
							this.showList()
						} else {
							this.showNoData()
						}
					}
				}, (error) => {
					Toast({
						message: '当前网络不畅，请检查网络设置',
						duration: 3000,
						className: "toast"
					});
				});
				this.$refs.input1.blur();
				this.getOrderHotList();
			},
			loadMore() {
				var orderNumBy = window.localStorage.getItem('oNumBy')
				let params = {
					name: this.searchName,
					currNum: this.currNum,
					pageSize: this.pageSize,	
					orderNumBy:orderNumBy,
				};
				this.currNum = this.currNum + 1;
				console.log(params)
				this.loading = true
				this.mShow = false
				this.$resource(HOST_HDPCOMMODITY + '/hdp/commodityH5/searchCommodityRankList').get(params).then((response) => {
					console.log(response)
					this.loading = false
					if(response.body.code == 200 && response.body.respBody.length > 0) {
						this.list = this.list.concat(response.body.respBody)
						if(response.body.respBody.length < this.pageSize) {
							this.lastPage = true
						} else {
							this.lastPage = false
						}
						this.mShow = true
						this.more = true
						if(this.more) {
							$(".p-background").css({
								"background": "#fff",
								"height": "100%"
							})
						}
						for(let i = 0; i < this.list.length; i++) {						
//							this.title = this.list[i].name;
//							this.pic = this.list[i].pic;
//							this.salesPrice = this.list[i].salesPrice;
//							this.isTrade = this.list[i].isTrade;
														
							if(this.list[i].pic.indexOf(',') != -1) {
								this.list[i].pic = this.list[i].pic.substring(0, this.list[i].pic.indexOf(','))
							}
//							if(this.list[i].salesPrice.indexOf('-') != -1) {
//								//  this.list[i].salesPrice = this.list[i].salesPrice.substr(this.list[i].salesPrice.indexOf('-')+1)
//								this.list[i].salesPrice = this.list[i].salesPrice.substr(0, this.list[i].salesPrice.indexOf('-'))
//							}
							if(this.list[i].promotionPrice) {
								if(this.list[i].promotionPrice.indexOf('-') != -1) {
									this.list[i].promotionPrice = this.list[i].promotionPrice.substr(0, this.list[i].promotionPrice.indexOf('-'))
								}
							}
						}
					} else {
						this.mShow = true
						this.more = false
						this.lastPage = true
						if(!this.more) {
							$(".p-background").css({
								"background": "#f4f4f4",
								"height": "100%"
							})
						}
					}
				})
				
			},
			jumpDetail(id) {
				if(this.$route.query.acd == 231) {
					router.push({
						path: 'good_detail',
						query: {
							commodityId: id,
							fg_search: 1,
							id: this.id,
							name: this.name,
							acd: 123,
							saveName: this.searchName
						}
					})
				} else {
					router.push({
						path: 'good_detail',
						query: {
							commodityId: id,
							fg_search: 1,
							id: this.id,
							name: this.name,
							acd: 4321
						}
					})
				}
			},
			enterRecommendedGoodDetail(item) {
				// 记录向前跳转的行为
				localStorage.setItem('scrollBehavior', '01')
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + item.commodityId + '&recommendedGood=1'
			},
		}
	}
</script>
<style scoped>	
	input::-webkit-input-placeholder{
        font-size:1.4rem;
		font-family:PingFangSC-Regular;
		color:rgba(179,179,179,1);
		/*padding: 0.5rem 0;*/
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        font-size:1.4rem;
		font-family:PingFangSC-Regular;
		color:rgba(179,179,179,1);
		/*padding: 0.6rem 0;*/
    }
	
	.fresh_goods_icon{
		height: 20rem;
	}
	.fresh_goods .fresh_goods_icon div{
		width: 17.3rem;
	}
	.fresh_goods .fresh_goods_text{
		height: 1.6rem;
	}
	 /*热卖推荐*/
	#search_from{
		width:30.5rem;
		height:3rem;
		background:rgba(244,244,244,1);
		border-radius:2rem;
		margin-left: 1.05rem;
	}
	.recommendedTitle .remai {
		color: #333333;
		font-family: PingFangSC-Light;
		font-size: 1.5rem;
	}
	/*搜索我结果*/
	
	.noResult {
		width: 100%;
		height: 11rem;
		background: rgba(244, 244, 244, 1);
		overflow: hidden;
	}
	
	.fromData {
		width: 31rem;
		margin-left: 1rem;
		/*height: 3.1rem;*/
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		/*background: red;*/
	}
	
	.p-search .cance22 {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		right:  7.4rem;
		top:1.7rem;
	}
	
	.p-search .quxiao {
		display: inline-block;
	    width: 3rem;
	    margin: 0 1.65rem;
	    font-size: 1.4rem;
	    font-family: PingFangSC-Light;
	    color: rgba(51,51,51,1);
	}
	
	.text .p1 {
		width: 19.65rem;
		height: 3.3rem;
		font-size: 1.4rem;
		font-family: PingFang SC;
		font-weight: Light;
		color: #333333;
		line-height: 2rem;
	}
	
	.text .p_p1 {
		width: 100%;
		height: 3rem;
		line-height: 2.5rem;
		text-align: left;
		padding-left: 1rem;
		font-family: PingFangSC-Light;
		font-size: 1.2rem;
		color: rgba(153, 153, 153, 1);
		overflow: hidden;
	}
	
	.sp-background {
		font-size: 30px;
	}
	
	input[type="search"] {
		-webkit-appearance: none;
	}
	
	input::-webkit-search-cancel-button {
		display: none;
	}
	
	.sp-background {
		height: 100%;
		width: 100%;
		background: #f4f4f4;
	}
	
	.noSearch {
		color: #858585;
		/*margin-top: 10rem;*/
		font-size: 1.34rem;
	}
	.noSearch .renpic{
		/*margin-bottom: 3rem;*/
	    width: 38rem;
	    height: 25rem;
	    /*margin: 3rem auto;*/
	}
	.noSearch .nullno{
		position: relative;
		bottom: 6rem;
	}
	.noSearch .renpic img{
		width: 100%;
	}
	.p-search-box {
		position: fixed;
		top: 0;
		height: 4.8rem;
		width: 100%;
		background: #fff;
		z-index: 222;
	}
	
	.p-search {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
		height: 2.8rem;
		margin-top: 1rem;
		/*padding: 0 .8rem;*/
		background: #fff;
	}
	
	.p-search-bottom {
		height: 4.8rem;
		width: 100%;
	}
	
	.cancel1 {
		width: 5rem;
		font-size: 1.4rem;
		padding: 0 0.5rem;
	}
	
	.cancel2 {
		font-size: 1.4rem;
		position: absolute;
		top: 1.8rem;
		width:1.3rem;
		height:1.4rem;
	}
	.cancel2 img{
		width: 100%;
	}
	.cancel21{
		left: 2.05rem;
	}
	
	.custom-input {
		width: 100%;
		font-size: 1.4rem;
		padding: 0.5rem;
		padding-left: 3.3rem;
		caret-color: #666666;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
	}
	
	.history,
	.row-line {
		/*margin-top: 1rem;*/
		padding: 0 1.2rem;
		border-top: 1px solid #DCDCDC;
		width: 100%;
		background: #fff;
	}
	
	.history {
		background: white;
		min-height: 9rem;
		border-top: none;
		overflow: hidden;
	}
	
	.history .title {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
		font-size: 1.4rem;
		font-family:PingFangSC-Light;
		color: #666;
		margin-top: 2rem;
		margin-bottom: 1.5rem;
	}
	.qc {
		/*border: 1px solid #ACACAC;*/
		width: 1.3rem;
   		height: 1.5rem;
   		margin-right: 0.6rem;
	}
	
	.icon {
		display: block;
		margin-left: 1rem;
	}
	
	.icon li {
		float: left;
		height: 3.5rem;
		line-height: 3.5rem;
		padding: 0 1rem;
		margin-right: 1.3rem;
		margin-bottom: 1rem;
		font-size: 1.4rem;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
		background:rgba(249,249,249,1);
		border-radius: 0.25rem;
		/*border: 1px solid #CCCCCC;*/
	}
	.icon li:hover{
		background:rgba(204,204,204,1);
	}
	.title .ls{
		font-size:1.5rem;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
	}
	.ren_null {
		width: 7rem;
		height: 11rem;
		margin: 2rem auto;
	}
	
	.ren_null img {
		width: 100%;
	}
	
	.zw {
		margin-top: 2.45rem;
		margin-bottom: 1.4rem;
		font-size:1.4rem;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
		text-align: center;
	}
	
	.fb {
		width:10.2rem;
		height:3.6rem;
		line-height: 3.6rem;
		border-radius:2rem;
		background:linear-gradient(#FFD739,#FFBB39);
		font-size:1.5rem;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
		margin: 0 auto;
		margin-bottom: 2.05rem;
	}
	
	
	
	/*.fb-tip {
		color: #B1B1B1;
		margin-top: .5rem;
	}*/
	
	.r-title-box {
		position: fixed;
		top: 4.8rem;
		width: 100%;
		z-index: 99;
	}
	
	.r-title {
		height: 3.2rem;
		border-bottom: 1px solid #DCDCDC;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		align-items: center;
		-webkit-align-items: center;
		font-size: 1.5rem;
		background: #fff;
		/*margin-bottom: 1rem;*/
	}
	
	.r-title-bottom {
		height: 3.2rem;
	}
	
	.r-title1 {
		height: 1rem;
		border-bottom: 1px solid #DCDCDC;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		align-items: center;
		-webkit-align-items: center;
		font-size: 1.5rem;
		background: #fff;
		/*margin-bottom: 1rem;*/
	}
	
	.r-title>span {
		width: 10rem;
		font-size:1.5rem;
		font-family:PingFangSC-Regular;
		color:rgba(102,102,102,1);
	}
	
	.active {
		color: #EB544D;
	}
	
	.list {
		min-height: 11.5rem;
		background: #fff;
		border-bottom: 1px solid #DCDCDC;
		padding-left: 0.8rem;
		padding-top: 0.5rem;
	}
	
	.list>div {
		float: left;
	}
	
	.list>div.text:last-child {}
	
	.pic {
		height: 11rem;
		padding: .2rem;
		width: 11rem;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.pic_null {
		position: relative;
		overflow: hidden;
	}
	
	.pic_null>img {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
	
	.pic_null .pic_shouwan {
		position: absolute;
		font-size: 2rem;
		width: 8rem;
		height: 8rem;
		line-height: 8rem;
		background: rgba(0, 0, 0, 1);
		opacity: 0.03rem;
		border-radius: 50%;
		top: 1.5rem;
		left: 1.5rem;
		font-family: PingFangSC-Regular;
		color: #FFFFFF;
	}
	
	.pic img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		vertical-align: middle;
	}
	
	.text {
		width: 67%;
		min-height: 11.5rem;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
	}
	
	.list p,
	.list b,
	.list span {
		font-size: 1.5rem;
		/*font-weight: 500;*/
	}
	
	.list .p1 {
		width: 100%;
		text-align: left;
		display: inline-block;
		padding-left: 1rem;
		height: 4rem;
		line-height: 2rem;
		overflow: hidden;
		/*margin-bottom:0.5rem;*/
	}
	
	.list .limit-deadline {
		color: #e4714d;
		font-size: 1.5rem;
		padding-right: 0.2rem;
	}
	
	.list .p {
		width: 100%;
		text-align: left;
		display: inline-block;
		padding-left: 1rem;
	}
	
	.list span {
		font-size: 1.2rem;
	}
	
	.list .all_reduce {
		font-size: 1.1rem;
		font-weight: normal;
		color: #666;
		height: 2.5rem;
		line-height: 2.5rem;
		float: left;
		width: 3rem;
		height: 1.6rem;
		line-height: 1.6rem;
		color: #f9be00;
		border: 1px solid #f9be00;
		border-radius: 0.3rem;
		margin-top: 0.5rem;
		margin-left: 1rem;
	}
	
	.list .sub-title {
		font-size: 1.2rem;
		font-weight: normal;
		color: #666;
		height: 2.5rem;
		line-height: 2.5rem;
		padding-left: 1rem;
		text-align: left;
		float: left;
		width: 80%;
	}
	
	.list span {
		color: #cc141c;
		font-weight: 500;
	}
	
	.text p:last-child {
		color: #989898;
		font-size: 1.2rem;
		text-align: left;
		padding-left: 1rem;
	}
	
	.list .cj {
		color: #999;
		display: inline-block;
		width: 10rem;
		font-size: 1rem;
		float: right;
		text-align: right;
	}
	.list .p_p2 .cj_1{
		font-size: 1.5rem;
		font-family: PingFangSC-Regular;
		/*font-weight: Light;*/
		position: relative;
		color: #C1AA72;
	}
	.list .p_p2 .cj_1>img{
		position: relative;
	    display: inline-block;
	    width: 3rem;
	}
	.list .p_p2 .cj_1 .guanli{
		position: relative;
	}
	.list .p_p2 .cj_1 .guanli img{
		display: inline-block;
		width: 1.8rem;
    		height: 0.8rem
	}
	/*.list .p_p2 .cj_1 .guanli .wenzi{
		width: 2rem;
	    font-size: 0.5rem;
	    position: absolute;
	    color: #96752D;
	    top: 0.4rem;
	    left: 0.5rem;
	}*/
	
	.sp-bottom {
		height: 4.4rem;
		line-height: 4.4rem;
		font-size: 1.3rem;
		color: #5A5A5A;
		background: #F4F4F4;
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
	/*热卖商品*/
	
	.recommended {
		width: 100%;
		/*height: 23.7rem;*/
		background-color: #ffffff;
		/*margin-bottom: 6rem;*/
		overflow: hidden;
	}
	
	.recommendedTitle {
		padding-top: 12rem;
		padding-bottom: 1.5rem;
	}
	
	#scroller1 ul {
		width: 100%;
		padding: 0 1.8rem;
	}
	
	#scroller1 ul li {
		width: 16rem;
		margin-bottom: 10rem;
		height: 18rem;
		line-height: 2.1rem;
	}
	
	#scroller1 ul li:nth-of-type(odd) {
		float: left;
	}
	
	#scroller1 ul li:nth-of-type(even) {
		float: right;
	}
	
	#scroller1 ul li .recommendedPic {
		width: 100%;
		height: 100%;
	}
	
	.recommendedTitle {
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}
	
	.recommendedTitle img {
		width: 15rem;
		height: 1.4rem;
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
		color: #9F8A60;
		margin-top: -1rem;
		margin-bottom: 0.8rem;
		height: 3.3rem;
		line-height: 3.3rem;
		text-align: left;
		background: rgba(241, 236, 226, 1);
		/*border-radius: 0.15rem;*/
		font-family: PingFangSC-Light;
		font-size: 1rem;
	}
	
	.recommendedName1 {
		background: none;
		height: 2.5rem;
		line-height: 3.5rem;
		color: #333;
		font-weight: Light;
	}
	
	.recommendedName11 {
		background: rgba(247, 226, 227, 1);
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
	
	.recommendedPrice .yuanjia {
		text-decoration: line-through;
		color: #cacbca;
	}
	
	@import url('../../component/found_goods/good.css');
</style>