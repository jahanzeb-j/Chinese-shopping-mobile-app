<template>
    <div id="box">
        <div class="nav" v-show="showHead">
            <img  src="../../assets/images/returnFront.png" @click="back">
            限时购
        </div>
        <div class="banner">
            <img src="../../assets/images/banner.png"/>
        </div>
        <div class="tapHead" v-show=" commingSoon && onKilling ">
            <div class="navList" @click="switchStatus(2)" :class="{active:status == 2}">
                <i class="iconfont icon-xianshimiaosha"></i><span class="timeTxt">限时秒杀</span><span class="triDown" v-show="this.status == 2"></span>
            </div>
            <div class="navList" @click="switchStatus(1)" :class="{active:status == 1}">
                <i class="iconfont icon-xianshiyugao"></i><span class="timeTxt">秒杀预告</span><span class="triDown" v-show="this.status == 1"></span>
            </div>
        </div>
        
        <div class="tapHead" v-show=" !commingSoon && onKilling ">
            <div class="single active"><i class="iconfont icon-xianshimiaosha"></i><span style="margin-left:0.7rem;">限时秒杀</span><span class="triDown"></span></div>
        </div>
        <div class="tapHead" v-show="!onKilling && commingSoon ">
            <div class="single active"><i class="iconfont icon-xianshiyugao"></i><span style="margin-left:0.7rem;">秒杀预告</span><span class="triDown"></span></div>
        </div>
        <div class="time" v-show=" (!commingSoon && onKilling ) || ( commingSoon && onKilling && status == 2)  ">
            <!-- <h3>距结束 <lastTime :lastTime="122004573"></lastTime><span class="clock">08</span> :<span class="clock">03</span> :<span class="clock second">00</span> </h3> -->
            <h3 id='killList'>距结束 <lastTime :lastTime="cutDown" endTimeWord=" " :handle="timeEndEvent"></lastTime></h3>
        </div>
        <div class="time advanceTime" v-show="(!onKilling && commingSoon) || (  commingSoon && onKilling && status == 1)">
            <h3>{{advanceTime.substring(0,6)}}<span class="advanceClock">{{advanceTime.substring(6,8)}}</span>点开抢</h3>
        </div>
        <div class="finish" v-show="!commingSoon && !onKilling">
            <div class="tapHead">
                <div class="single active"><i class="iconfont icon-xianshiyugao"></i><span>已结束</span><span class="triDown"></span></div>
            </div>
            <div class="emptyBox">
                <h4 class="title">来晚一步，已经抢光啦！</h4>
                <strong class="goHome" @click="goHomeHandle">去商城逛逛</strong>
            </div>
        </div>
        
        <div class="tapBody" 
           v-infinite-scroll="getAdvanceList"
            infinite-scroll-disabled="lastPage"
            infinite-scroll-distance="50"
        >
            <div class="tapTimeLimitList" v-show="List.length !=0  "  
            >
                <div class="timeLimitGoods" @click="jumpDetail(item.commodityId)" v-for="(item ,index) in List " :key="index">
                    <div class="leftImg fl">
                        <img :src="item.pic" alt="">
                        <span class="soldOut" v-show="item.surplus <= 0">
                            <img src="../../assets/images/qiangguang.png"/>
                        </span>
                    </div>
                    <div class="rightText fl">
                        <p class="p1">{{item.name.substring(0,26)}}</p>
                        <p class="p2">
                            <span class="span1">限时价</span>
                            <span class="span2">¥{{item.promotionPrice}}</span>
                            <span class="span3">¥{{item.salesPrice}}</span>
                        </p>
                        <p class="p3">
                            <span class="span4" v-show="item.surplus > 0">
                                <strong class="progress" :style={width:item.percent} :class="{progress1:item.percentShow}">
                                    <strong class="progressTxt">仅剩{{item.surplus}}件 </strong>
                                </strong>
                            </span>
                            <span class="span5" v-show="item.surplus > 0">马上抢</span>
                            <span class="span4" v-show="item.surplus <= 0">剩0件</span>
                            <span class="span5 soldOutTxt" v-show="item.surplus <= 0">抢光了</span>
                        </p>
                    </div>
                </div>
                <!-- <div class="timeLimitGoods">
                    <div class="leftImg fl">
                        <img src="" alt="">
                        <span class="soldOut">
                            <img src="../../assets/images/qiangguang.png"/>
                        </span>
                    </div>
                    <div class="rightText fl">
                        <p class="p1">商品名称最多22个字商品名称最多22个字商品名商品名称最多22个字商品名称最多22个字商品名</p>
                        <p class="p2">
                            <span class="span1">限时价</span>
                            <span class="span2">¥13.00</span>
                            <span class="span3">原价 : ¥19.00</span>
                        </p>
                        <p class="p3">
                            
                        </p>
                    </div>
                </div> -->
            </div>
            <div class="tapTimeLimitList advanceList" v-show="advanceList.length !=0 && status == 1"
            
            >
                <div class="timeLimitGoods" @click="jumpDetail(item.commodityId)" v-for="(item,index) in advanceList" :key='index'>
                    <div class="leftImg fl">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="rightText fr">
                        <p class="p1">{{item.name.substring(0,26)}}</p>
                        <p class="p2">
                            <span class="span1">限时价</span>
                            <span class="span2">¥{{item.promotionPrice}}</span>
                            <span class="span3">¥{{item.salesPrice}}</span>
                        </p>
                        <p class="p3">
                            <span class="span4">限量{{item.promotionStockNums}}件</span>
                            <span class="span5">去看看</span>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
        <!--热卖商品-->
        <div id="hotSaleGoods" v-show="lastPage == true">
            <div class="hotSaleTitle">
                热卖商品
            </div>
            <div class="hotSaleBody">
                <ul>
                    <li v-for="( item ,index) in hotList " :key="index" @click="jumpDetail(item.commodityId)">
                        <div class="hotSaleGoods">
                            <a href="javascript:void(0)" class="hotImg">
                                <img :src="item.picUrl" alt="">
                            </a>
                            <div class="hotSaleText">
                                <p class="p_p1">{{item.name.substring(0,24)}}</p>
                                <p class="p_p2">
                                    <span class="hotSaleMoney">¥{{item.price}}</span>
                                    <span class="hotSaleNumber">已售{{item.salesVolume}}件</span>
                                </p>
                            </div>
                        </div>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import lastTime from  '../../component/lastTime'
import { InfiniteScroll } from 'mint-ui';
export default {
    name:'limitTimeBuy',
    props:{
        showHead:{
            type: Boolean,
            default: true,
        },
        // promotionStatus:{
        //     type:[Number,String],
        //     default:0
        // }
            
        
    },
    data() {
        return {
            status:0,
            List:[],  //秒杀商品
            hotList:[] , //热卖商品
            advanceList:[] ,//预告商品
            advanceTime:'', //预告时间
            cutDown:0  ,//倒计时时间戳
            commingSoon:'',
            onKilling:'',
            lastPage:'',
            pageNum:1
           

        }
    },
    components:{
        lastTime
    },
    created(){
        // this.status=this.$route.query.status
        // console.log(this.status)
    },
    mounted(){
        this.status=this.$route.query.status
        // console.log(this.status)
        this.getStatus()
        // this.getAdvanceList(this.status)
        console.log('111')
        this.getHotList()

        
    },
    methods: {
        getStatus(){
            let data={
                pageNum:1,
                pageSize:10,
                salesLable:1,
                status:-1
            }
            let url=HOST_HDPUSER+"/salespromotion/findPromotionCommodityList"
            this.$api_get_no({
                url:url,
                data:data
            }).then(res =>{
                // console.log(res)
                this.commingSoon=res.respBody.comingSoon
                this.onKilling=res.respBody.onKilling
                
            })
        },
        switchStatus(status){
            // console.log(status)
            this.List=[]
            this.advanceList=[]
            this.status=status || this.status
            if(status != undefined){
                this.pageNum=1
                this.lastPage=false
            }else{
                this.status=true
            }
        },
        getAdvanceList(){
            // console.log(this.status)
            let data={
                pageNum:this.pageNum,
                pageSize:10,
                salesLable:1,
                status:this.status
                // status:2
            }
            let url=HOST_HDPUSER+"/salespromotion/findPromotionCommodityList"
            this.$api_get_no({
                url:url,
                data:data
            }).then(res=>{
                console.log(res)
                if(res.code ==200){
                    
                    if( res.respBody.comingSoon){
                        // this.advanceList=res.respBody.comingSoon //预告商品
                        if(res.respBody.comingSoon.length > 0){
                            let advanceTime = this.parseTime(res.respBody.comingSoon[0].promotionBeginTime)  
                            // advanceTime = (new Date(advanceTime)).getTime();
                            advanceTime = Date.parse(new Date(advanceTime))
                            
                            this.advanceTime=this.format(advanceTime)
                            let countDown=res.respBody.comingSoon[0].countdown
                            if(countDown == 0){
                                this.timeEndEvent() //如果预告时间到了重新获取
                            }
                            res.respBody.comingSoon.forEach(e=>{
                                e.pic=e.pic.split(",")[0]
                            })
                            
                            
                        }
                        if(this.pageNum == 1){
                          this.advanceList=res.respBody.comingSoon //第一页只赋值
                        }else{
                            
                            this.advanceList=this.advanceList.concat(res.respBody.comingSoon) //
                        }
                        
                        
                    }
                    if(res.respBody.onKilling){
                        // this.List=res.respBody.onKilling  //秒杀商品
                      
                        if(res.respBody.onKilling.length >0){
                            res.respBody.onKilling.forEach(e=>{
                                e.percent=(e.surplus /e.promotionStockNums )* 100
                                e.percent=(e.percent.toFixed(2))+"%"
                                e.percentShow=parseInt(e.percent) > parseInt('98.00%')
                                
                                e.pic=e.pic.split(",")[0]
                                this.cutDown=e.countdown
                                console.log(this.cutDown)
                            })
                        }
                        if(this.pageNum == 1){
                            this.List=res.respBody.onKilling
                        }else{
                            
                            this.List=this.List.concat(res.respBody.onKilling)
                        }
                        
                    }
                    if(res.respBody.onKilling.length < 10 || res.respBody.comingSoon.length < 10){
                        
                        this.lastPage=true
                        return
                    }
                    if(res.respBody.onKilling.length == 10){
                        this.lastPage=false
                    }
                    if(res.respBody.comingSoon.length == 10){
                        this.lastPage=false
                    }
                    this.pageNum++
                    
                    
                }
            })
        },
        jumpDetail(id){
            if(window.Android){
                window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+id)
            }else{
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+id
            }
            // this.$router.push({path:'good_detail',query:{commodityId:id}}) //跳转商品详情
        },
        getHotList(){
            let url=HOST_HDPCOMMODITY+'/commodityFront/getOrderHotProductList'
            this.$api_get_no({
                url:url
            }).then(res=>{
                // if(res.status == 200){
                if(res.code == 200){
                    let hotList=res.respBody
                    hotList.forEach(e=>{
                        
                        e.picUrl=e.pic.split(",")[0]
                        if( e.promotionPrice != null ){
                            e.price = e.promotionPrice
                        }else{
                            e.price = e.salePrice
                        }
                        
                    
                    })
                
                    this.hotList=hotList
                
                }
                else{
                    this.hotList=[]
                }
                
                
            })
        },
        format(shijianchuo){
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            if(m < 10){
                m='0'+m
            }
            if(d<10){
                d='0'+d
            }
            if(h<10){
                h='0'+h
            }
            // return y+'年'+m+'月'+d+'日 '+h+'点'+mm+'分'+s+'秒';
            return m+'月'+d+'日'+h;
        },
        back(){
            this.$router.go(-1)
        },
        goHomeHandle(){
            this.$router.push({path:"found_index"})
        },
        timeEndEvent(){
            this.getAdvanceList() //倒计时结束事件
        },
        parseTime(startTime) { 
            
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式   解决ios手机不兼容---格式的问题
            startTime = startTime.replace(/\-/g, "/")
            return startTime
        }
    }
}
</script>
<style>
#killList span{
    font-weight: bold;
}
#killList .clock{
    width:2.2rem;
    height:2.2rem;
    font-size:1.4rem;
    line-height: 2.2rem;
    border:0.05rem solid #E6E6E6;
    display: inline-block;
    color:#333;
    border-radius: 0.1rem ; 
    /* padding:0.4rem 0.3rem 0.45rem; */
}
#killList .second{
    color:#333333;
    background:#FFD85A
}
</style>
<style scoped>
.no_more{
    width:100%;
    height:3.6rem;
    line-height: 2.6rem;
    background:#f4f4f4;
    font-size:1.2rem;
    color:#555555;
    letter-spacing: 2px;
  }
.nav {
    width: 100%;
    height: 4.4rem;
    line-height: 4.4rem;
    color: #333333 ;
    font-family: "Microsoft YaHei";
    text-align: center;
    font-size: 1.7rem;
    border-bottom: 1px solid #d6d6d6;
    position: relative;
}
.nav img{
    width: 1.2rem;
    height: 2rem;
    position: absolute;
    left:0.8rem;
    top:1.25rem;
  
}
.banner{
    width:100%;
    height: 16.2rem;
}
.banner img{
    width:100%;
    height: 100%;
}
.tapHead {
    height: 4.8rem;
    font-size:1.6rem;
    line-height: 4.8rem;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    flex-direction:row;
}
.tapHead .navList{
    width:50%;
    position: relative;
    background:rgba(243,224,197,1);
    color:rgba(153,153,153,1);
}
.tapHead .single{
    width:100%;
    position: relative;
}
.tapHead .active{
    color:#FFFFFF ;
    background:#f59017;
}
.tapHead .triDown{
    width: 0;
    height: 0;
    border-left: 0.7rem solid transparent;
    border-right: 0.7rem solid transparent;
    border-top: 0.7rem solid #f59017;
    position: absolute;
    left:50%;
    bottom:-0.65rem;
    margin-left: -0.35rem;
}
.iconfont{
    font-size: 1.6rem;
}
.tapHead .timeTxt{
    margin-left: 0.65rem;
}

.time {
    width: 100%;
    height: 4.5rem;
    color: #333;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    background: #fff;
    line-height: 4.5rem;
}
.time .clock{
    width:2.2rem;
    height:2.2rem;
    font-size:1.4rem;
    line-height: 2.2rem;
    border:0.05rem solid #E6E6E6;
    display: inline-block;
    color:#333;
    border-radius: 0.1rem ; 
    /* padding:0.4rem 0.3rem 0.45rem; */
}
.time .second{
    color:#FFD85A;
}

.tapBody {
    background: #f4f4f4;
    padding-bottom: 1rem;
    padding-top:1rem;
    overflow-y:scroll;
}



.timeLimitGoods {
    /*padding:1.5rem 1.8rem;*/
    height: 15.2rem;
    box-sizing: border-box;
    background: #fff;
    width:100%;
}

.timeLimitGoods .leftImg {
    width: 11.5rem;
    height: 11.5rem;
    background: rgba(244,244,244,1);
    margin: 1.5rem 2.4rem 1.5rem 1.8rem;
    position: relative;
}
.timeLimitGoods .leftImg .soldOut{
    position: absolute;
    width:8rem;
    height:8rem ;
    left:1.75rem;
    top:1.65rem;
    background:#000;
    opacity: .5;
    border-radius:50%;
}
.timeLimitGoods .soldOut strong{
    display: block;
}
.timeLimitGoods .leftImg img{
    width:100%;
    height: 100%;
    border-radius:0.4rem;
    
}
.timeLimitGoods .rightText {
    padding: 2.1rem 1.5rem 1.3rem 0rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
    width:20.3rem;
}
.tapTimeLimitList div:last-of-type  .rightText {
    border-bottom: none;
}
.timeLimitGoods .rightText .p1 {
    
    width: 19.7rem;
    font-size: 1.4rem;
    line-height: 1.9rem;
    /* height: 3.25rem; */
    /* overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    /* autoprefixer: off */
    /* -webkit-box-orient: vertical; */
    /* autoprefixer: on 
    white-space: normal;
    word-break: break-all; */
}

.timeLimitGoods .rightText .p2 {
    width: 20rem;
    font-size: 1.2rem;
    line-height: 2.25rem;
    margin-top:1.85rem;
  
}
.timeLimitGoods .p2 .span1 {
    color: #333;
}
.timeLimitGoods .p2 .span2 {
    font-size: 1.4rem;
    color: #eb544d;
    margin-left: 0.6rem;
}

.timeLimitGoods .p2 .span3 {
    /* float: right; */
    color: #858585;
    margin-left:1.55rem;
    text-decoration: line-through;
}
.timeLimitGoods .p3{
    height: 2.8rem;
    line-height:2.8rem;
    margin-top:1.1rem;
}
.timeLimitGoods .p3 .span4 {
    display: inline-block;
    width: 9rem;
    height: 1.6rem;
    font-size:1rem;
    line-height: 1.6rem;
    text-align: center;
    color: #f48f18;
    border: 0.05rem solid #f48f18;
    border-radius: 0.8rem;
    position: relative;
    z-index:3;
}

.timeLimitGoods .p3 .span5 {
    display: inline-block;
    width: 7rem;
    font-size:1.4rem;
    height: 2.8rem;
    line-height: 2.8rem;
    color: #fff;
    text-align: center;
    background: #f48f18;
    border-radius: 0.25rem;
    float: right;
    /* margin-left: 2rem; */
}
.timeLimitGoods .p3 .soldOutTxt{
    background:rgba(217,217,217,1);
    color:#fff;
}
/* 库存进度条 */
.timeLimitGoods .progressTxt{
    position: absolute;
     left: 0;
    /*top:0;
    position: relative; 
    width:100%;*/
    width:9rem;
    height: 100%;
    z-index: 2;
    line-height:1.4rem;
    border-radius: 0.8rem 0rem 0rem 0.8rem;
    text-align:center;
}
.timeLimitGoods .progress{
    /* position: absolute; */
    position: relative;
    display:block;
    /* left:0; */
    /* top:0; */
    height: 100%;
    background:#FDEEDC;
    border-radius: 0.8rem 0rem 0rem 0.8rem;
    
    z-index: 1;
}
.timeLimitGoods .progress1{
    border-radius: 0.8rem ;
}
/* 秒杀预告列表 */
.advanceList .p3 .span4{
    color:rgba(255,195,42,1);
    border:none;
    border-radius: 0;
    font-size:1.3rem;
    text-align: left;
}
.advanceList .timeLimitGoods .p3 .span5{
   background:rgba(249,205,93,1);
}
.time .advanceClock{
    display: inline-block;
    width: 2.2rem;
    height: 2.2rem;
    background:rgba(255,216,90,1);
    border-radius: 0.1rem ; 
    line-height: 2.2rem;

}
/*热卖商品*/

.hotSaleTitle {
    width: 100%;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.5rem;
    color: #333333;
}

.hotSaleBody {
    width:100%;
    box-sizing: border-box;
    padding:0 1.5rem ;
}
.hotSaleBody ul{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    flex-direction:row;
    justify-content: space-between;
    flex-wrap: wrap;

}
.hotSaleBody li {
   margin-bottom: 1rem;
   width: 17rem;
}

.hotSaleBody li .hotImg{
    display: block;
    width: 16.5rem;
    height: 16.5rem;
    background:rgba(244,244,244,1);
}

.hotSaleBody li img {
    width:100%;
    height:100%;
    border-radius:0.25rem;
}

.hotSaleBody li .hotSaleText {
    width: 100%;
    padding-top: 1rem;
    font-size: 1.3rem;
    color: #333;
    line-height: 1.8rem;
}

.hotSaleBody li .p_p1 {
    width: 15.65rem;
    height:3.6rem;
    text-align: left;
    /* overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    /* // eslint-disable-next-line */
    /* autoprefixer: off 
    -webkit-box-orient: vertical;
    /* autoprefixer: on 
    box-orient: vertical;
    white-space: normal;
    word-break: break-all;*/ 
}

.hotSaleBody li .p_p2 {
    text-align: left;
    font-size: 1rem;
    line-height: 2rem;
    overflow: hidden;
}

.hotSaleBody  .p_p2 .hotSaleMoney {
    /*width: 16.5rem;*/
    font-size: 1.5rem;
    color: #e02e24;
    float: left;
}

.hotSaleBody  .p_p2 .hotSaleNumber {
    /*width: 16.5rem;*/
    color: #858585;
    float: left;
    margin-left: 1rem;
    
}
.emptyBox{
    height: 19.45rem;
    width:100%;
}
.emptyBox .title{
    font-size:1.6rem;
    line-height:2rem;
    color:rgba(153,153,153,1);
    margin:4.9rem auto 4.35rem;
}
.emptyBox .goHome{
    width:11rem;
    font-size:1.4rem;
    height:3.6rem;
    line-height:3.6rem;
    color:rgba(255,169,58,1);
    border:1px solid #FFA93A ;
    border-radius: 0.5rem ; 
    display:inline-block;
}
</style>
