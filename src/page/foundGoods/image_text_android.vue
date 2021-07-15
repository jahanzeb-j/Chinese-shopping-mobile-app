<template>
    <div class="good_detail">
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
                        <li v-html='PicTextDetail'>
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
        padding-top: 5rem;
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
        padding: 0rem 0 8rem 1.5rem;
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
                PicTextDetail: ''
            }
        },
        created(){
        },
        mounted(){
            this.getImgText()

        },
        methods: {
            //请求图文详情
            getImgText(){
                let url = HOST_HDPCOMMODITY + '/commodityFront/getCommodityPicDetail'
                this.$resource (url ).get({ commodityId: this.$route.query.commodityId }).then((response) => {
                    if( response.status == 200 ){
                        this.PicTextDetail = response.body.detail
                        if( JSON.parse( response.body.attriDetail) == null ){
                            this.proParameters = []
                        }else {
                            var attriDetail = JSON.parse( response.body.attriDetail )
                            for( var i = 0; i < attriDetail.length; i++ ){
                                if( attriDetail[i].name == "基本参数" ){
                                    this.proParameters = attriDetail[i].attribute
                                }
                            }
                        }
                    }
                })

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




