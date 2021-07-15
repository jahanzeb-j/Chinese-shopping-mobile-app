<template>
    <div class="good_detail">
        <mt-popup
            v-model="popupVisible"
            position="bottom">
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
        <div class="detailTab">
            <div class="detailTabHead">
                <div></div>
                <span class="picParam" :class="{ activeDetailPic: isActiveDetailPic }" @click="checkPicParam">图文详情</span>
                <span class="proParam" :class="{ activeDetailPic: !isActiveDetailPic }" @click="checkProParam">产品参数</span>
                <div></div>
            </div>
            <div class="picParamContent" v-show="isPicParam">
                <div class="picAll">
                    <ul>
                        <li v-html='goodDetail.detail'>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="proParamContent" v-show="!isPicParam">
                <ul class="proParamContent_ul">
                    <li v-for="proParameter in proParameters" :class="{ 'longLi': proParameter.typeid }">
                        <span class="name">{{ proParameter.name }}</span>
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
        </div>
        <mt-popup
            v-model="popupVisible1"
            position="bottom">
            <div class="buyWhat">
                <div class="top">
                    <div class="topPic">
                        <span class="pic"><img :src=pics[0] alt=""></span>
                    </div>
                    <ul class="topWord">
                        <li class="li1">
                            <span>{{ goodDetail.name }}</span>
                            <div class="showDownCart" @click="showDownCart1">
                                <img src="../../assets/images/shutDownCart.png" alt="">
                            </div>
                        </li>
                        <li class="li2">
                            <span class="price">
                                ￥
                                <span class="priceNum">{{ goodDetail.salesPrice }}</span>
                                元
                            </span>
                            <span class="stock">
                                库存
                                <span class="stockNum">
                                   {{ storeNum }}
                                </span>
                                件
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="center">
                    <div class="variety">
                        <p class="variety_p">品种</p>
                        <ul class="variety_ul">
                            <li @click="chooseStandarNowBuy(item,index)" v-for="(item,index) in items1" :class="{ 'active': index === selected }" >
                                {{ item.Standard }}
                            </li>
                        </ul>
                    </div>
                    <div class="quantity">
                        <div class="quantityNum">数量</div>
                        <div class="quantityCalculate">
                            <button class="minus" @click="minus" :disabled="isDisabled"></button>
                            <input class="num"  v-model="num" @input="checkNumIsZero">
                            <button class="add" @click="add" :disabled="addIsDisabled"></button>
                        </div>
                    </div>
                </div>
                <mt-button type="default" class="sure" @click="sureOrderBuyNow">确定</mt-button>
            </div>
        </mt-popup>
        <mt-popup
            v-model="popupVisible2"
            position="bottom">
            <div class="buyWhat">
                <div class="top">
                    <div class="topPic">
                        <span class="pic"><img :src=pics[0] alt=""></span>
                    </div>
                    <ul class="topWord">
                        <li class="li1">
                            <span>{{ goodDetail.name }}</span>
                            <div class="showDownCart" @click="showDownCart2">
                                <img src="../../assets/images/shutDownCart.png" alt="">
                            </div>
                        </li>
                        <li class="li2">
                            <span class="price">
                                ￥
                                <span class="priceNum">{{ goodDetail.salesPrice }}</span>
                                元
                            </span>
                            <span class="stock">
                                库存
                                <span class="stockNum">
                                    {{ storeNum }}
                                </span>
                                件
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="center">
                    <div class="variety">
                        <p class="variety_p">品种</p>
                        <ul class="variety_ul">
                            <li @click="chooseStandardCard(item,index)" v-for="(item,index) in items1" :class="{ 'active': index === selected }" >
                                {{ item.Standard }}
                            </li>
                        </ul>
                    </div>
                    <div class="quantity">
                        <div class="quantityNum">数量</div>
                        <div class="quantityCalculate">
                            <button class="minus" @click="minus" :disabled="isDisabled"></button>
                            <input class="num"  v-model="num" @input="checkNumIsZero">
                            <button class="add" @click="add" :disabled="addIsDisabled"></button>
                        </div>
                    </div>
                </div>
                <mt-button type="default" class="sure" @click="sureOrderAddCart">确定</mt-button>
            </div>
        </mt-popup>
        <div class="picAddCar" @click="picAddCar" :class="{ 'active': isFinishAdd, 'initPicAddCarClass': initPicAddCar }">
            <img src="../../assets/images/flyCart.png" alt="">
        </div>
        <div class="rotateToCart" v-show="showRotatePic" :class="{ 'active': isClickAddCart ,'initRotateToCartClass':initRotateToCart }">
            <img src="../../assets/images/addRotate.png" alt="">
        </div>
        <div class="showSharePic" v-show="showWeChatShareTitle">
            <img src="../../assets/images/guide1.png" alt="">
        </div>
        <div class="showSharePop"  v-show="showWeChatShareTitle" @click="shutDownWeChat">
        </div>
    </div>
</template>

<style>
    .addIndex{
        position: absolute;
        z-index: 99999;
        border-radius: 6%;
    }
    .v-modal{
        opacity:0.3 !important;
    }
    .mint-toast{
        z-index: 99999!important;
    }

    .mint-popup .mint-popup-bottom{
        opacity:0.8 !important;
        background: #000;
    }
    .mint-button{
        border: 0 !important;
    }

    .mint-indicator-wrapper{
        z-index: 9999;
    }

</style>
<style scoped>
    img{
        width:100%;
        height:100%;
    }

    span{
        display: inline-block;
    }

    .good_detail{
        padding-top:4rem;
    }

    .good_detail .picAddCar{
        width:4.4rem;
        height:4.4rem;
        position: fixed;
        bottom: 8.2rem;
        right: 1rem;
        z-index: 444;
    }

    .good_detail .rotateToCart{
        width: 3.8rem;
        height: 3.8rem;
        position: fixed;
        bottom: 5rem;
        left: 15rem;
        z-index: 555;
    }

    .good_detail .picAddCar.initPicAddCarClass{
        width:4.4rem;
        height:4.4rem;
        position: fixed;
        bottom: 8.2rem;
        right: 1rem;
        z-index: 444;
    }

    .good_detail .rotateToCart.initRotateToCartClass{
        width: 3.8rem;
        height: 3.8rem;
        position: fixed;
        bottom: 5rem;
        left: 15rem;
        z-index: 555;
    }

    .good_detail .picAddCar.active{
        animation: finishAddCart 4s ease 2s forwards;
    }

    .good_detail .rotateToCart.active{
        animation: rotateToDisappear 2s ease 1s forwards;
    }

    @keyframes rotateToDisappear{
        from {
            opacity:1;
            transform:  translate(0px, 0px) rotate(0deg) scale(1)
        }
        to {
            opacity:0;
            transform:  translate(20rem, -4rem) rotate(360deg) scale(0)
        }
    }

    @keyframes finishAddCart{
        0%{
            transform: scale(1)
        }
        50%{
            transform: scale(1.5)
        }
        100%{
            transform: scale(1)
        }
    }

    .good_detail .header{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding:1.4rem 0.8rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 444;
        background: #fff;
        align-items: center;
        -webkit-align-items: center;
        border-bottom:1px solid #d6d6d6;
    }

    .good_detail .goodTab{
        margin-top:5.1rem;
    }

    .good_detail .header .good{
        font-size:1.5rem;
        color:#5C5C5C;
    }

    .good_detail .header .detail{
        font-size:1.5rem;
        color:#5C5C5C;
    }

    .good_detail .header .returnPic{
        width:2.2rem;
        height:2.2rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .good_detail .header .returnPic img{
        width:1rem;
        height:2rem;
    }

    .good_detail .header .sharePic{
        width:2.2rem;
        height:2.2rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }

    .good_detail .header .sharePic img{
        width:2.2rem;
        height:1.6rem;
    }

    .good_detail .header .activeGood{
        font-weight:bolder;
        color: #333;
    }
    .bdsharebuttonbox{
        width:100%;
        background: #333;
    }

    .bdsharebuttonbox .shareList{
        width:100%;
        height:22rem;
    }

    .bdsharebuttonbox .shareList .shareList_ul{
        width:100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-around;
        -webkit-justify-content: space-around;
    }

    .bdsharebuttonbox .shareList .shareList_ul .li1{
        width:7rem !important;
        height:7rem !important;
        background: url('../../assets/images/weixinBig.png') no-repeat center center !important;
        background-size: 100% 100% !important;
    }

    .bdsharebuttonbox .shareList .shareList_ul .li2{
        width:7rem !important;
        height:7rem !important;
        background: url('../../assets/images/friendCircle.png') no-repeat center center !important;
        background-size: 100% 100% !important;
    }
    .bdsharebuttonbox .shareList .shareList_ul .li3{
        width:7rem !important;
        height:7rem !important;
        background: url('../../assets/images/qqBig.png') no-repeat center center !important;
        background-size: 100% 100% !important;
    }
    .bdsharebuttonbox .shareList .shareList_ul .li4{
        width:7rem !important;
        height:7rem !important;
        background: url('../../assets/images/weiboBig.png') no-repeat center center !important;
        background-size: 100% 100% !important;
    }

    .bdsharebuttonbox .shareList .shareList_ul a{
        width:100%;
        height:100%;
        opacity:0;
    }

    .bdsharebuttonbox .shareList{
        padding-top:4rem;
    }

    .bdsharebuttonbox .shareList .shareList_ul li{
        width:7rem;
        height:7rem;
    }

    .bdsharebuttonbox .shareList .cancel{
        width:4.5rem;
        height:4.5rem;
        margin: 4.4rem auto;
    }

    .mint-popup{
        width:100%;
    }

    .goodPic{
        width:100%;
        height:35rem;
        position: relative;
        overflow: hidden;
    }

    .goodPic .goodPicSon{
        height:100%;
    }

    .goodPic .goodPicSon .continueLast{
        position: relative;
    }

    .goodPic img{
        width:100%;
    }

    .goodPic .picWord{
        width: 0.5rem;
        font-size: 1.2rem;
        line-height: 1.6rem;
        margin-left: 3rem;
        margin-top: 20%;
    }

    .goodTitle ul{
        padding-left: 0.8rem;
        padding-top:1rem;
    }

    .goodTitle ul li{
        text-align: left;
    }

    .goodTitle ul .li1{
        font-size:1.4rem;
        color:#333333;
        margin: 0.3rem 0;
        line-height:2rem;
        height: 4rem;
        overflow:hidden;
    }

    .goodTitle ul .li2{
        font-size:1.1rem;
        color:#f9b200;
    }

    .goodTitle ul .li3{
        font-size:1.2rem;
        color: #cc141c;
        margin-top:1.5rem;
    }

    .goodTitle ul .li3 .strong{
        font-size:1.7rem;
        font-weight: bold;
    }

    .goodTitle ul .li4{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: 1.5rem  0.8rem 0.8rem 0;
        border-top:1px solid #D6D6D6;
        margin-top:1.5rem;
        font-size:1.2rem;
        color:#858585;
    }

    .grayLine{
        width:100%;
        height:1rem;
        background: #f4f4f4;
    }

    .goodComment .head{
        text-align: left;
        font-size:1.4rem;
        color:#adadad;
        padding: 1.25rem;
        border-bottom: 1px solid #D6D6D6;
    }

    .goodComment .head .comments{
        color:#333333;
    }

    .goodComment ul li{
        padding:0 0.8rem 1.6rem 0.8rem;
        border-bottom: 1px solid #D6D6D6;
    }

    .goodComment ul li .first1{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        font-size:1.2rem;
        color:#858585;
        padding-bottom:1rem;
    }

    .goodComment ul li .first1 .goodCommenterPic{
        width:3rem;
        height:3rem;
        border:1px solid red;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin: 1rem 1rem 0 0 ;
    }

    .goodComment ul li .first1 .goodCommentName{
        margin-top:1.8rem;
    }

    .goodComment ul li .first1 .time{
        margin-top:1.8rem;
    }

    .goodComment ul li .first2{
        font-size:1.2rem;
        color:#858585;
        text-align: left;
        line-height:1.8rem;
    }

    .checMore{
        padding:1.7rem 0;
        font-size:1.2rem;
        color:#adadad;
    }

    .detailBottomTab{
        width:100%;
        height:4.9rem;
        position: fixed;
        bottom:0;
        z-index: 333;
        background: #fff;
    }

    .detailBottomTab ul{
        width:100%;
        height:100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        align-items: center;
        -webkit-align-items: center;
    }

    .detailBottomTab ul li{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
        height:100%;
    }

    .detailBottomTab ul li .pic{
        width: 2.2rem;
        height:2.2rem;
    }

    .detailBottomTab ul .li1{
        width:6.25rem;
        font-size:1rem;
        color:#858585;
    }

    .detailBottomTab ul .li2{
        width:6.25rem;
        font-size:1rem;
        color:#858585;
    }

    .detailBottomTab ul .li3{
        width:12.5rem;
        font-size:1.7rem;
        color: #5c5c5c;
        background: #F4F4F4;
    }

    .detailBottomTab ul .li4{
        background: #F9BE00;
        width:12.5rem;
        font-size:1.7rem;
        color:#fff;
    }

    .detailBottomTab ul .li5{
        background: #F9BE00;
        width:25rem;
        font-size:1.7rem;
        color:#fff;
    }

    .buyWhat{
        padding-top:0.8rem;
    }

    .buyWhat .top{
        display: flex;
        display: -webkit-flex;
        padding: 0 0.8rem 1rem 0.8rem;
        border-bottom:1px solid #858585;
        position: relative;
    }

    .buyWhat .top .showDownCart{
        width:2rem;
        height:2rem;
    }

    .buyWhat .top .topPic{
        width:7.5rem;
        height:7.5rem;
        background: #F4F4F4;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        margin-right:1rem;
    }

    .buyWhat .top .topPic .pic{
        width:5.75rem;
        height:3.85rem;
    }

    .buyWhat .top .topWord{

    }

    .buyWhat .top .topWord  .li1{
        font-size:1.2rem;
        width:27.6rem;
        text-align: left;
        line-height: 1.7rem;
        color:#323232;
        height: 3rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }

    .buyWhat .top .topWord  .li1 span{
        width:23.7rem;
        line-height:1.7rem;
        height:3.3rem;
    }

    .buyWhat .top .topWord  .li2{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        margin-top: 2.3rem;
    }

    .buyWhat .top .topWord  .li2 .price{
        font-size:1rem;
        color: #CD141A;
    }

    .buyWhat .top .topWord  .li2 .priceNum{
        font-size:1.3rem;
        color: #CC141C;
        font-weight: bolder;
    }

    .buyWhat .top .topWord  .li2 .stock{
        font-size:1rem;
        color: #969696;
    }

    .buyWhat .center{
        text-align: left;
        padding: 1.5rem 0.8rem 4.6rem 0.8rem;
    }

    .buyWhat .center .variety{
        margin-bottom:1.5rem;
    }

    .buyWhat .center .variety .variety_p{
        font-size:1.2rem;
        color:#A3A3A3
    }

    .buyWhat .center .variety .variety_ul{
        width:36rem;
        overflow: hidden;
    }

    .buyWhat .center .variety .variety_ul li{
        padding:0.75rem 1rem;
        border:1px solid #D6D6D6;
        margin:1rem 1rem 0 0;
        font-size:1.2rem;
        color: #323232;
        float: left;
    }

    .buyWhat .center .variety .variety_ul li.active{
        background: #f9be00;
        color: #fff;
    }

    .buyWhat .center .quantity{
        font-size:1.1rem;
        color: #8D8D8D;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }

    .buyWhat .center .quantity .quantityCalculate{
        display: flex;
        display: -webkit-flex;
    }

    .buyWhat .center .quantity .quantityCalculate .minus{
        height:2.5rem;
        width:2.5rem;
        border: 1px solid #868686;
        border-radius: 0.2rem 0 0 0.2rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        font-size:1.1rem;
        background: #fff url("../../assets/images/shopping-cart_subtract.png") no-repeat center;
    }

    .buyWhat .center .quantity .quantityCalculate .add{
        height:2.5rem;
        width:2.5rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        border: 1px solid #868686;
        border-radius: 0.2rem 0 0 0.2rem;
        font-size:1.1rem;
        background: #fff url("../../assets/images/shopping-cart_add.png") no-repeat center;
        background-size: 65% 65%;
    }

    .buyWhat .center .quantity .quantityCalculate .num{
        height:2.5rem;
        width:4.3rem;
        border-top:1px solid #868686;
        border-bottom:1px solid #868686;
        background: #fff;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        text-align: center;
        font-size:1.4rem;
    }

    .buyWhat .sure{
        width:94%;
        background: #F9BE00;
        color: #fff;
        font-size:1.6rem;
        height:4.3rem!important;
    }

    .detailTab .picParamContent .picAll img{
        width:100%;
    }

    .detailTab .detailTabHead{
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        z-index: 333;
        background: #fff;
        width: 100%;
        position: fixed;
        top:0;
    }

    .detailTab .detailTabHead .picParam{
        color:#414141;
        font-size:1.4rem;
        width:8.8rem;
        padding: 1.25rem 0;
    }

    .detailTab .detailTabHead .proParam{
        color:#414141;
        font-size:1.4rem;
        width:8.8rem;
        padding: 1.25rem 0;
    }

    .detailTab .detailTabHead .activeDetailPic{
        color: #f9be00;
        border-bottom:3px solid #f9be00;
    }

    .detailTab .proParamContent{
        padding: 1rem 0 8rem 1.5rem;
        text-align: left;
        font-size:1.2rem;
    }

    .detailTab .proParamContent .proParamContent_ul li{
        margin-top:2rem;
        text-align: left;
        display: flex;
        display: -webkit-flex;
    }

    .detailTab .proParamContent .name{
        color:#858585;
        width:14rem;
        margin-right:3.5rem;
        line-height:1.5rem;
    }

    .detailTab .proParamContent .nameContent{
        color:#333333;
        width:22rem;
        line-height:1.5rem;
    }

    .detailTab .proParamContent .proParamContent_ul li .longSpan{
        line-height: 2rem;
    }

    .detailTab .proParamContent .proParamContent_ul .longLi .name{
        color:#858585;
        width:14rem;
        line-height:1.5rem;
    }

    .detailTab .proParamContent .proParamContent_ul .longLi .div1{
        width:22rem;
    }
    /*.isLargePicWrap{*/
    /*width:1000px;*/
    /*height:1000px;*/
    /*position: fixed;*/
    /*top:0;*/
    /*left:0;*/
    /*z-index: 666;*/
    /*}*/

    .isBigPopWrap{
        width:100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        z-index: 888;
        background: #333;
    }

    .isLargePicWrap img{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 999;
        width: 90%;
        height: 60%;
        margin-top: -50%;
        margin-left: -45%;
    }

    .bottomLine{
        margin-bottom:5.2rem;
    }

    .showSharePic{
        position: fixed;
        top:0;
        z-index: 6666;
        right:0;
    }

    .showSharePop{
        position: fixed;
        top:0;
        width:100%;
        height:100%;
        z-index: 5555;
        background-color:#000000;
        opacity:0.7;
    }

</style>

<script type="text/ecmascript-6">
    import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import Vue from 'vue'
    export default{
        name:'good_detail',
        data(){
            return{
                list:[],
                detailNum:[],
                popupVisible: false,
                popupVisible1: false,
                popupVisible2: false,
                selected:'',
                num:1,
                isDisabled:true,
                isActive:true,
                isPicParam:true,
                isActiveDetailPic:true,
                isHaveGood:true,
                showRotatePic: false,
                isFinishAdd:false,
                isClickAddCart: false,
                initPicAddCar:false,
                initRotateToCart: false,
                isLargePic:false,
                isBigPop: false,
                items1:[],
                page_url: HOST_HDPCOMMODITY,
                goodDetail: '',
                addIsDisabled: false,
                continueSlide: false,
                contineIndex: 0,
                storeNum: '',
                transmitCartStandard:'',
                isClickStandcard: 0,
                proParameters:[],
                startX: '',
                endX: '',
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
                    costFreight : '',
                    goods : [{
                        imgUrl: '',
                        pdBn : '',
                        pdId : '',
                        pdName : '',
                        pdPrice: '',
                        pdQuantity : '',
                        pdSpce : '',
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
                totalMoney: '',
                weixinSignature: '',
                nonceStr: '',
                timestamp: '',
                showWeChatShareTitle: false
            }
        },
        created(){
            window._bd_share_main && window._bd_share_main.init(),
                this.getSignature()

        },
        mounted(){

            this.getGoodDetailData(),
                this.getCommentData(),
            window._bd_share_main && window._bd_share_main.init()
        },
        methods: {
            //初始化顶部的轮播图
            initCarouselPic(){
                this.$nextTick(()=>{
                    var _this = this
                    var mintSwipeItem = document.getElementsByClassName('mint-swipe-item')
                    if( mintSwipeItem.length >= 1 ){
                        var lastIndex = _this.pics.length - 1
                        var checkLastPic = document.getElementsByClassName('checkLastPic')[lastIndex]
                        checkLastPic.addEventListener('touchstart',function (event) {
                            let e = event || window.event;
                            _this.startX = e.targetTouches[0].pageX
                        })
                        checkLastPic.addEventListener('touchmove',function (event) {
                            let e = event || window.event;
                            _this.endX = e.targetTouches[0].pageX
                            let X = _this.startX - _this.endX
                            if( X > 10 ){
                                _this.clickDetail()
                            }
                        })
                        var detailTab = document.getElementsByClassName('detailTab')[0]
                        detailTab.addEventListener('touchstart',function (e) {
                            _this.startX1 = e.targetTouches[0].pageX
                        })
                        detailTab.addEventListener('touchmove',function (e) {
                            _this.endX1 = e.targetTouches[0].pageX
                            if( _this.endX1 - _this.startX1 > 300 ){
                                _this.clickGood()
                            }
                        })
                    }else {
                    }
                })
            },

            //获取签名
            getSignature(){
                // 请求后台接口获取签名
                let url = HOST_HDPUSER + '/weixin/getSignature'
                let urlParam = window.location.href.split('#')[0]
                this.nonceStr = Math.random().toString(36).substr(2)
                this.timestamp = new Date().getTime().toString().substr(0,10);
                this.$resource(url).get({ url: urlParam,nonceStr:this.nonceStr, timestamp: this.timestamp }).then((response) =>{
                    if( response.body.code == 200 ){
                        this.weixinSignature = response.body.signature
                        wx.config({
//                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: 'wxa7187fa65b31924e', // 公众号的唯一标识
                            timestamp:this.timestamp, // 生成签名的时间戳
                            nonceStr: this.nonceStr, // 生成签名的随机串
                            signature: this.weixinSignature,// 签名
                            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    }else {
                        Toast({
                            message: response.body.msg,
                            position: 'center',
                            duration: 3000
                        });
                    }
                })
            },

            //点击放大图片
            enlargePic(){
                this.isLargePic = true
                this.isBigPop = true
            },

            //点击遮罩层后放大的图片消失
            clickPop(){
                this.isLargePic = false
                this.isBigPop = false
            },

            getGoodDetailData(){
                var urlParams = window.location.href; //获取url中"?"符后的字串
                var index = urlParams.indexOf('?')
                this.urlRemain = urlParams.substring(index+1,urlParams.length)
                this.loginCode = localStorage.getItem('loginCode')
                let url = this.page_url + '/commodityFront/getCommodityDetail'
                this.$resource (url ).get({ commodityId: this.$route.query.commodityId }).then((response) => {
                    
                    if( response.status == 200 ){
                        this.goodDetail = response.body
                        window.localStorage.setItem('salesNum',this.goodDetail.salesNum)
                        this.pics = response.body.pic.split(',')
                        if( JSON.parse( response.body.attriDetail) == null ){
                            this.proParameters = []
                        }else {
                            this.proParameters = JSON.parse( response.body.attriDetail)[0].attribute
                        }
                        this.storeNum = JSON.parse(response.body.standard).storeNum
                        if( this.storeNum == 0 ){
                            this.isHaveGood = false
                        }
                        var priceInterval = JSON.parse(response.body.standard).priceInterval
                        this.items1 = JSON.parse(priceInterval)[0].data
                        this.orderParams = {
                            actualMoney: '',
                            costFreight : this.goodDetail.transport,
                            goods : [{
                                imgUrl: this.goodDetail.pic,
                                pdBn : '',
                                pdName : this.goodDetail.name,
                                pdPrice: '',
                                pdQuantity : '',
                                pdSpce : JSON.parse(this.goodDetail.standard).priceInterval,
                                siteId: this.goodDetail.siteId,
                                supId: '',
                                pdUnit: this.goodDetail.unit
                            }]
                        }
                        if( response.body.isTrade == 0 ){
                            this.isHaveGood = false
                        }
                        this.initCarouselPic()
                    }
                })
            },

            //获取商品评论数据
            getCommentData(){
                let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
                if (this.$route.query.commodityId){
                    this.$resource (url ).get({ externalId: this.$route.query.commodityId ,externalType:1,size:2}).then((response) => {
                        if( response.status == 200 ){
//                    console.log('this.list',response.body.list);
                            this.detailNum=response.body
                            this.list=response.body.list
                        }
                    })
                }
            },

            //点击商品
            clickGood(){
                this.isMe = true
                this.isActive = true
                this.startX = 0
                this.endX = 0
            },

            //点击详情
            clickDetail(){
                this.isMe = false
                this.isActive = false
            },

            //查看图文详情
            checkPicParam(){
                this.isPicParam = true
                this.isActiveDetailPic = true
            },

            //查看产品参数
            checkProParam(){
                this.isPicParam = false
                this.isActiveDetailPic = false
            },

            //向右滑动图文详情，进入商品页
            detailStart(){
                this.clickGood()
            },

            returnBack(){
                localStorage.setItem("hello", "world");
                var theme_detail = this.$route.query.theme_detail
                var theme_list = this.$route.query.theme_list
                var fg_search = this.$route.query.fg_search
                var found_index = this.$route.query.found_index
                var exhibition_details = this.$route.query.exhibition_details
                var shopping = this.$route.query.shopping
                var order_details = this.$route.query.order_details
                var order_all = this.$route.query.order_all
                var shoppingBack = this.$route.query.shoppingBack
                var mallCart = this.$route.query.mallCart
                if( theme_detail == 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.urlRemain;
                }
                if( theme_list == 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?'+this.urlRemain;
                }
                if( fg_search == 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'fg_search?'+this.urlRemain;
                }
                if( found_index == 1 && shoppingBack != 1 && shopping != 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index';
                }
                if( exhibition_details == 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details';
                }
                if( shopping == 1 && shoppingBack != 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+this.urlRemain;
                }
//                if( shopping == 1 && shoppingBack == 1 ){
//
//                    var urlParams = window.location.href
//                    var index1 = urlParams.indexOf('?')
//                    var index2 = urlParams.indexOf('Back')
//                    var finishUrl = urlParams.slice( index1+1, index2+6)
//                    console.log(finishUrl)
//                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+finishUrl;
//                }
//              fubo添加
                if( found_index == 1 && shoppingBack == 1 ){
                    var urlParams = window.location.href
                    var index1 = urlParams.indexOf('?')
                    var index2 = urlParams.indexOf('Back')
                    var finishUrl = urlParams.slice( index1+1, index2+17)
                    
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+finishUrl;
                }
                //购物车进详情返回
//              if ( mallCart==1 ){
//                var urlParams = window.location.href
//                var index1 = urlParams.indexOf('?')
//                var index2 = urlParams.indexOf('Back')
//                var finishUrl = urlParams.slice( index1+1, index2+8)
//                console.log(finishUrl)
//                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+finishUrl;
//              }
//              fubo添加

                if( order_details == 1 ){
                    var urlParams = window.location.href
                    var idDetailIndex = urlParams.indexOf('idDetail')
                    var params = urlParams.slice(idDetailIndex,urlParams.length)
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_details?'+params;
                }
                if( order_all == 1 ){
                    var actionClass = this.$route.query.actionClass
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_all?actionClass='+actionClass;
                }
            },

            shareAccount(){
                this.$nextTick(()=>{
                    //先判断是否是在微信中打开的
                    var ua = navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i)=="micromessenger") {
                        //是在微信中打开
                        this.getWeXinShare()
                    } else {
                        //不是在微信中打开
                        this.getNotWeXinShare()
                    }
                })
            },

            //在浏览器中打开分享
            getNotWeXinShare(){
                this.popupVisible = true
                window._bd_share_config={
                    "common": {
                        "bdSnsKey":{},
                        "bdText": "",
                        "bdMini": "1",
                        "bdMiniList": false,
                        "bdPic":"",
                        "bdStyle":"0",
                        "bdSize":"32",
                        "bdPic ":""
                    },
                    "share":{},
                    "image":{
                        "viewList": ["qzone","tsina","sqq","weixin"],
                        "viewText":"分享到：",
                        "viewSize":"32"
                    },
                    "selectShare":{
                        "bdContainerClass":null,
                        "bdSelectMiniList":["qzone","tsina","sqq","weixin"]}
                }
            },

            //在微信中打开分享
            getWeXinShare(){
                var _this = this
                _this.showWeChatShareTitle = true
                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                })

                //分享到微信朋友圈
                wx.onMenuShareTimeline({
                    link: window.location.href,
                    success: function () {
                        _this.showWeChatShareTitle = false
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到微信好友
                wx.onMenuShareAppMessage({
                    link: window.location.href,
                    success: function () {
                        _this.showWeChatShareTitle = false
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到QQ
                wx.onMenuShareQQ({
                    link: window.location.href,
                    success: function () {
                        _this.showWeChatShareTitle = false
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            },

            //关闭在微信中的分享
            shutDownWeChat(){
                this.showWeChatShareTitle = false
            },

            shutDown(){
                this.$nextTick(()=>{
                    this.popupVisible = false
                })
            },

            //查看更多评论
            checkMore(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'find_assess?commodityId='+this.$route.query.commodityId;
            },

            //点击购物车的时候的选择规格
            chooseStandardCard(item,index){
                this.isClickStandcard = 1
                this.selected = index
                this.pdSpce = item
                this.storeNum = item.Number
                this.goodDetail.salesPrice = item.salePrice
                this.onePrice = item.salePrice
                this.totalMoney = this.onePrice * this.num
                this.transmitCartStandard = this.pdSpce.Standard
            },

            //点击购物车的确定
            sureOrderAddCart(){
                if( this.storeNum == 0 ){
                    Toast({
                        message:'暂无库存',
                        position: 'center',
                        duration: 3000
                    });
                }else {
                    if( this.items1.length == 1 ){
                        if( this.items1[0].Standard === '' ){
                            this.addCartParams = {
                                goodsId: this.$route.query.commodityId,
                                goodsNum: this.num,
                                goodsSpec: ''
                            }
                            this.requestShoppingCar()
                        }else {
                            if( this.transmitCartStandard == '' ){
                                Toast({
                                    message: '请选择产品属性',
                                    position: 'center',
                                    duration: 3000
                                });
                            }else {
                                this.addCartParams = {
                                    goodsId: this.$route.query.commodityId,
                                    goodsNum: this.num,
                                    goodsSpec:this.transmitCartStandard
                                }
                                this.requestShoppingCar()
                            }
                        }
                    }else {
                        if( this.transmitCartStandard == '' ){
                            Toast({
                                message: '请选择产品属性',
                                position: 'center',
                                duration: 3000
                            });
                        }else {
                            this.addCartParams = {
                                goodsId: this.$route.query.commodityId,
                                goodsNum: this.num,
                                goodsSpec:this.transmitCartStandard
                            }
                            this.requestShoppingCar()
                        }
                    }
                }
            },

            //真正去请求加入购物车的接口
            requestShoppingCar(){
                let url = HOST_HDPSHOPCAR + '/addGoods'
                // Vue.http.interceptors.push((request, next)  =>{
                //     request.headers.set('loginCode', this.loginCode);
                //     next((response) => {
                //         return response
                //     });
                // });
                this.$resource(url).save({ }, this.addCartParams ).then((response) => {
                    if( response.status == 200 ){
                        if( response.body.code == '0000' ){
                            this.popupVisible2 = false
                            this.showRotatePic = true
                            this.isFinishAdd = true
                            this.isClickAddCart = true
                        }else if( response.body.code == -1111 ){
                            let url = HOST_HDPUSER+'/user/isLogin';
                            this.loginCode= window.localStorage.getItem('loginCode')
                            this.userId= window.localStorage.getItem('userId')
                            this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                                if (response.status == 200) {
                                    if(response.data.code<0){
                                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                        window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
                                    }
                                }
                            })
                        }else{
                            Toast({
                                message: response.body.message,
                                position: 'center',
                                duration: 3000
                            });
                        }
                    }
                })
            },

            //点击立即购买的时候选择规格
            chooseStandarNowBuy(item,index){
                this.isClickStandcard = 1
                this.selected = index
                this.pdSpce = item
                this.storeNum =  item.Number
                this.transmitCartStandard = this.pdSpce.Standard
                this.orderParams = [{
                    imgUrl: this.goodDetail.pic,
                    pdBn : this.pdSpce.id,
                    pdName : this.goodDetail.name,
                    pdPrice: this.pdSpce.salePrice,
                    pdQuantity : '',
                    pdSpce :   this.transmitCartStandard,
                    siteId: this.goodDetail.siteId,
                    supId: '',
                    pdUnit: this.goodDetail.unit
                }]
                this.goodDetail.salesPrice = item.salePrice
                this.onePrice = item.salePrice
                this.totalMoney = this.onePrice * this.num
            },

            //立即购买的确定下订单
            sureOrderBuyNow(){
                if( this.storeNum == 0 ){
                    Toast({
                        message:'暂无库存',
                        position: 'center',
                        duration: 3000
                    });
                }else {
                    this.commodityId = this.$route.query.commodityId
                    this.loginCode= window.localStorage.getItem('loginCode')
                    this.userId= window.localStorage.getItem('userId')
                    let url = HOST_HDPUSER+'/user/isLogin';
                    this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                        if (response.status == 200) {
                            if(response.data.code<0){
                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011"+"&commodityId="+this.$route.query.commodityId
                            }else {
                                if( this.items1.length == 1 ){
                                    if( this.items1[0].Standard === '' ){
                                        this.totalMoney = this.goodDetail.salesPrice
                                        this.orderParams = [{
                                            imgUrl: this.goodDetail.pic,
                                            pdBn : this.pdSpce.id,
                                            pdName : this.goodDetail.name,
                                            pdPrice: this.items1[0].salePrice,
                                            pdQuantity : this.num,
                                            pdSpce :  '',
                                            pdId: this.$route.query.commodityId,
                                            pdUnit: this.goodDetail.unit
                                        }]
                                        this.requestAddPreOrder()
                                    }else {
                                        if( this.transmitCartStandard == '' ){
                                            Toast({
                                                message: '请选择产品属性',
                                                position: 'center',
                                                duration: 3000
                                            });
                                        }else {
                                            this.orderParams = [{
                                                imgUrl: this.goodDetail.pic,
                                                pdBn : this.pdSpce.id,
                                                pdName : this.goodDetail.name,
                                                pdPrice: this.pdSpce.salePrice,
                                                pdQuantity : this.num,
                                                pdSpce :  this.transmitCartStandard,
                                                pdId: this.$route.query.commodityId,
                                                pdUnit: this.goodDetail.unit
                                            }]
                                            this.requestAddPreOrder()
                                        }
                                    }
                                }else {
                                    if( this.transmitCartStandard == '' ){
                                        Toast({
                                            message: '请选择产品属性',
                                            position: 'center',
                                            duration: 3000
                                        });
                                    }else {
                                        this.orderParams = [{
                                            imgUrl: this.goodDetail.pic,
                                            pdBn : this.pdSpce.id,
                                            pdName : this.goodDetail.name,
                                            pdPrice: this.pdSpce.salePrice,
                                            pdQuantity : this.num,
                                            pdSpce :  this.transmitCartStandard,
                                            pdId: this.$route.query.commodityId,
                                            pdUnit: this.goodDetail.unit
                                        }]
                                        this.requestAddPreOrder()
                                    }
                                }
                            }
                        }
                    })
                }
            },

            //真正发出请求去创建预定义订单的方法
            requestAddPreOrder() {
                let url = HOST_HDPORDERS+ '/order/front/addPreOrder/'
                // Vue.http.interceptors.push((request, next)  =>{
                //     request.headers.set('loginCode', this.loginCode);
                //     next((response) => {
                //         return response
                //     });
                // });
                Indicator.open('加载中...');
                this.$resource ( url ).save({},this.orderParams ).then((response) => {
                    if( response.status == 200 ){
                        if( response.body.code == 200 ){
                            Indicator.close();
                            this.key = response.body.entity
                            //请求收货地址
                            let url = HOST_HDPUSER + '/address/getDefaultTradeAddress'
                            this.userId = window.localStorage.getItem('userId');
                            // Vue.http.interceptors.push((request, next)  =>{
                            //     request.headers.set('loginCode', this.loginCode);
                            //     next((response) => {
                            //         return response
                            //     });
                            // });
                            this.$resource(url).get({userId: this.userId}).then((response) => {
                                if( response.status == 200 ){
                                    if( response.body.code == 200 ){
                                        if( response.body.respBody == null ){
                                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_address?key='+ this.key
                                        }else {
                                            var theme_detail = this.$route.query.theme_detail
                                            var theme_list = this.$route.query.theme_list
                                            var fg_search = this.$route.query.fg_search
                                            var found_index = this.$route.query.found_index
                                            var exhibition_details = this.$route.query.exhibition_details
                                            var shopping = this.$route.query.shopping
                                            if( theme_detail == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
                                            if( theme_list == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
                                            if( fg_search == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
                                            if( found_index == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
                                            if( exhibition_details == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
                                            if( shopping == 1 ){
                                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?'+this.urlRemain+'&key='+this.key+'&totalMoney='+this.totalMoney;
                                            }
//                                              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'order_page?key='+ this.key+'&commodityId='+this.commodityId
                                        }
                                    }else if(  response.body.code == -1 ){
                                        let url = HOST_HDPUSER+'/user/isLogin';
                                        this.loginCode= window.localStorage.getItem('loginCode')
                                        this.userId= window.localStorage.getItem('userId')
                                        this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                                            if (response.status == 200) {
                                                if(response.data.code<0){
                                                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                                    window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
                                                }
                                            }
                                        })
                                    }else {
                                        Toast({
                                            message: response.body.message,
                                            position: 'center',
                                            duration: 3000
                                        });
                                    }
                                }
                            })
                        }else if( response.body.code == -1 ){
                            let url = HOST_HDPUSER+'/user/isLogin';
                            this.loginCode= window.localStorage.getItem('loginCode')
                            this.userId= window.localStorage.getItem('userId')
                            this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                                if (response.status == 200) {
                                    if(response.data.code<0){
                                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                                        window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail');
                                    }
                                }
                            })
                        }else {
                            Toast({
                                message: response.body.msg,
                                position: 'center',
                                duration: 3000
                            });
                        }
                    }
                })
            },

            //立即购买
            buyNow(){
                this.num = 1
                let url = HOST_HDPUSER+'/user/isLogin';
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                    if (response.status == 200) {
                        if(response.data.code<0){
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011&"+this.urlRemain;
                        }else {
                            this.popupVisible1 = true
                        }
                    }
                })
            },

            //增加
            add(){
                if( this.isClickStandcard == 1 ){
                    this.num++;
                    if( this.num >= 1 ){
                        this.isDisabled = false
                    }
                    if( this.num >= this.storeNum ){
                        this.addIsDisabled = true
                        Toast({
                            message: '库存为'+this.storeNum,
                            position: 'center',
                            duration: 3000
                        });
                    }
                    this.totalMoney = this.onePrice * this.num
                }else {
                    Toast({
                        message: '请选择商品属性',
                        position: 'center',
                        duration: 2000
                    });
                }
            },

            //减少
            minus(){
                if( this.num > 1 ){
                    this.num--;
                    if( this.num < this.storeNum ){
                        this.addIsDisabled = false
                    }
                }else {
                    this.isDisabled = true
                }
                this.totalMoney = this.onePrice * this.num
            },

            //判断input输入的数字是否为0
            checkNumIsZero(){
                if( this.num > this.storeNum ){
                    Toast({
                        message:'库存为'+this.storeNum,
                        position: 'center',
                        duration: 3000
                    });
                    this.num = this.storeNum
                    this.addIsDisabled = true
                }
                if( this.num < 1 ){
                    this.num = 1
                    this.addIsDisabled = false
                }
                this.totalMoney = this.num * this.onePrice
            },

            //关闭商品规格
            showDownCart1(){
                this.popupVisible1 = false
            },

            //关闭商品规格
            showDownCart2(){
                this.popupVisible2 = false
                this.showRotatePic = false
            },

            //进入展厅
            enterExhibition(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'goodsparent?'+this.urlRemain;
            },

            //进入客服
            enterService(){
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                var urlParams = window.location.href; //获取url中"?"符后的字串
                var index = urlParams.indexOf('?')
                this.urlRemain = urlParams.substring(index+1,urlParams.length)
                let url = HOST_HDPUSER+'/user/isLogin';
                this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                    if (response.status == 200) {
                        if(response.data.code<0){
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=013"+'&'+this.urlRemain;
                        }else {
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'customer_service?commodityId='+this.$route.query.commodityId ;
                        }
                    }
                })
            },

            //发布采购需求
            releasePurchase(){
                this.loginCode= window.localStorage.getItem('loginCode')
                let url = HOST_HDPUSER+'/user/isLogin';
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                    if (response.status == 200) {
                        if(response.data.code<0){
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) +"login?loginBack=013"+'&'+this.urlRemain+'&releaseBack=002'
                        }else {
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'publish_purchase?releaseBack=002'
                        }
                    }
                })
            },

            //加入购物车
            addShoppingCart(){
                var _this = this
                setTimeout(function () {
                    var model = document.getElementsByClassName('v-modal')[0]
                    model.addEventListener('click',function () {
                        _this.showRotatePic = false
                    })
                },300)
                _this.num =1
                let url = HOST_HDPUSER+'/user/isLogin';
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                this.$resource(url).get({loginCode:_this.loginCode}).then((response) => {
                    if (response.status == 200) {
                        if(response.data.code<0){
                            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=011&"+_this.urlRemain;
                        }else {
                            _this.popupVisible2 = true
                            _this.initPicAddCar = true
                            _this.initRotateToCart = true
                            _this.isFinishAdd = false
                            _this.isClickAddCart = false
                        }
                    }
                })
            },

            //点击购物车图片，进入购物车
            picAddCar(){
//              var carUrl = window.location.href;
//              var index = carUrl.indexOf('?')
//              var urlRemain = carUrl.slice(index+1, carUrl.length+1)
//              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+'shoppingBack=1'+'&'+urlRemain

                let url = HOST_HDPUSER+'/user/isLogin';
                this.loginCode= window.localStorage.getItem('loginCode')
                this.userId= window.localStorage.getItem('userId')
                if(this.loginCode != "" && this.loginCode != null){
                    var carUrl = window.location.href;
                    var index = carUrl.indexOf('?')
                    if(this.$route.query.shopping == 1){
                        var urlRemain = carUrl.slice(index+1, carUrl.length-10)
                    }else{
                        var urlRemain = carUrl.slice(index+1, carUrl.length+1)
                    }
                    if(this.$route.query.shoppingBack == 1){
                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+urlRemain
                    }else {
                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?'+'shoppingBack=1'+'&'+urlRemain
                    }
                }
                else{
                    var carUrl1 = window.location.href;
                    var index1 = carUrl1.indexOf('?')
                    var urlRemain1 = carUrl1.slice(index1+1, carUrl1.length+1)
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=120"+'&'+urlRemain1
                }
            }
        }
    }
</script>




