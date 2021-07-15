<template>
    <div class="themeDetail" @click="hiddenInput($event)">
        <div class="editContentPic">
            <div v-html="editContentPicHtml"></div>
            <div >
                <div class="productBuy" style="margin: 1rem 0 2.7rem 0" v-for="(item,index) in showPageDetailData" :key="index">
                    <ul class="productBuy_ul" style="width:96%;margin:0 auto">
                        <li class="editorLi" style="width:100%;">
                        <div class="productBuy_ul_div" style="width:100%;position: relative;">
                            <div class="pro clearfix" style="width:100%;height: 19.5rem; overflow: hidden; background: url(http://img3.99114.com/group1/M00/92/7B/wKgGTFjWMduABK39AAAnB_v7aTQ895.png) no-repeat left top;background-size: 100%;display: flex; justify-content: space-between;display: -webkit-flex; -webkit-justify-content: space-between;">
                            <div class="left" style=" margin: 2rem 0 0 1.2rem; width: 13rem;height: 13rem;">
                                <img :src='item.pic'  alt="" style="width: 13rem;height: 13rem;">
                            </div>
                            <div class="right" style="width: 56.3%;height:14.2rem;margin: 1.3rem 0.8rem 0 0;background: url(http://img3.99114.com/group1/M00/A9/2B/wKgGMFjWMmaAXJ8BAAPcL4MTtL8783.png) no-repeat left top;background-size: 100%;">
                                <ul class="right_ul">
                                <li class="li1" style=" margin: 2.5rem 0 2rem 0;display: flex; justify-content: center;display: -webkit-flex; -webkit-justify-content: center; padding: 0 0.5rem; line-height: 2.3rem;">
                                <strong class="str1" style="font-size:1.6rem;color: #333;font-weight: bolder;height: 4.9rem;overflow:hidden">{{item.title}}</strong>
                                </li>
                                <li class="li3" style=" white-space:nowrap;display: flex;justify-content: center;display: -webkit-flex;-webkit-justify-content: center">
                                    <span class="sp1" style="font-size:1.6rem;color: #cd141c;"></span><span style="color:#cd141c">售价￥ </span><strong class="str2" style=" font-size:2.5rem;color: #cd141c;font-weight: bolder;letter-spacing: -2px;">{{item.price}}</strong><span class="sp2" style="color:#868686;margin-left:0.6rem;">元起</span>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div class="btn" style="width: 16.5rem; margin: 0.8rem auto 0">
                            <mt-button type="default" @click="tuwenEnterDetail2(item.commodityId)" class="yellowBtn" style="background: #F9BE00;font-size:1.8rem;  color: #fff; height:3.5rem;width:16.5rem;display: -webkit-inline-box;display: flex;justify-content: center; align-items: center;display: -webkit-flex;-webkit-justify-content: center; -webkit-align-items: center; border-radius: 5px">立即购买</mt-button>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="buyList">
            <ul class="buyList_ul">
                <li class="li1" @click="enterGoodDetail(goodsItem.commodityId)" v-for="(goodsItem,index) in goodsItems">
                    <div class="buyList_top">
                        <img :src=goodsItem.pic alt="">
                    </div>
                    <div class="buyList_center1">
                        {{ goodsItem.name }}
                    </div>
                    <div class="buyList_center2">
                        ￥{{ goodsItem.orderPrice }}
                    </div>
                    <div class="btn buyList_center">
                        <mt-button type="default" class="yellowBtn1">立即购买</mt-button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="shareBtn" @click="shareNow">
            <mt-button type="default" class="redBtn">分享更多精彩</mt-button>
        </div>

        <div class="readTransmit">
            <span class="read">
                <span>阅读</span>
                <span class="readNum">{{readTranThumbNum.clicks}}</span>
            </span>
            <span class="transmit">
                <span>转发</span>
                <span class="transmitNum">{{readTranThumbNum.reprintf}}</span>
            </span>
            <span class="thumbs_up" @click="thumbTheme" v-if="isHideClick">
                <span class="img">
                    <img src="../../assets/images/thump_upGray.png" alt="">
                </span>
                <span class="thumbs_upNum">{{readTranThumbNum.fabulous }}</span>
            </span>
            <span class="thumbs_up" v-if="!isHideClick">
                <span class="img">
                    <img src="../../assets/images/thumbs_up.png" alt="">
                </span>
                <span class="thumbs_upNum">{{readTranThumbNum.fabulous }}</span>
            </span>

        </div>
        <div class="grayLine">
        </div>
        <div class="themeMessage">
            <header class="msgHead">
                <span class="msg">主题留言</span>
                <span class="release" @click.stop="releaseTheme">
                    <img src="../../assets/images/release.png" alt="">
                </span>
            </header>
            <div class="msgMain clearfix" v-for="(msgMasterItem,index) in msgMasterItems">
                <div class="msgInfo">
                    <div class="msgInfoDiv">
                        <div class="masterPic">
                            <img :src="msgMasterItem.userImg" alt="">
                        </div>
                        <div class="masterNameTime">
                            <div class="masterName"><span class="masterNameSp" >{{msgMasterItem.nickname}}</span></div>
                            <div class="masterTime">
                                <span class="floor">
                                    第<span class="floorNum">{{ index+1 }}</span>楼
                                </span>
                                <span v-if="msgMasterItem.createTimeStr == ''">
                                  <span class="hour">{{msgMasterItem.createTime }}</span>小时前
                                </span>
                                <span v-if="msgMasterItem.createTimeStr != ''" class="hour">{{msgMasterItem.createTimeStr }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="msgCont">
                    <div>
                        <strong class="msgContMaster">{{ msgMasterItem.commentContent }}</strong>
                        <span class="leaveMsg" @click.stop="releaseTheme2(index)">
                            <img src="../../assets/images/leaveMsg.png" alt="">
                            <input type="hidden" class="hiddenLeaveMsg">
                        </span>
                        <span class="deleteMsg" v-if="user==msgMasterItem.userId" ref="detetep" @click="deleteMsg(index)"><img src="../../assets/images/del-icon.png" alt=""></span>
                    </div>
                </div>
                <div style="position:relative">
                    <img src="../../assets/images/tri.png" alt="" class='saojiaoimg' v-show="showSanJiao">
                    <div class="msgChat" v-for="item in msgMasterItem.child">
                        <ul>
                            <!--<li class="clearfix msgChatLi" v-for="msgSonItem in msgMasterItem.child">-->
                            <li class="clearfix msgChatLi">
                                <div class="bgPic">
                                    <!--<img src="../../assets/images/tri.png" alt="">-->
                                </div>
                                <div style="overflow: hidden;border-bottom:1px solid #d8d8d8;">
                                    <div class="visitorName" >{{item.nickname}}:</div>
                                    <div class="visitorMsg">
                                        <div class="visitorMsgCont">
                                            {{item.commentContent}}
                                        </div>
                                        <div class="visitorMsgTime">
                                            {{item.createTime}}
                                        </div>
                                        <img class="erdel" src="../../assets/images/del-icon.png" alt="" v-if="user==item.userId" @click="deleteMsgChild(item)" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="lookmore != '没有更多了'" class="checkMoreMsg clearfix">
            <span class="MoreMsgLine MoreMsgLine1"></span>
            <span>&lt;</span>
            <span @click="checkMore">{{lookmore}}</span>
            <span>&gt;</span>
            <span class="MoreMsgLine MoreMsgLine2"></span>
        </div>
        <span v-if="lookmore == '没有更多了'" style="width: 100%;padding: 2.2rem;background: #f4f4f4;"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></span>
        <div class="circle" v-if="isCircle">
            <mt-spinner color="#000" type="fading-circle"></mt-spinner>
        </div>
        <div class="bottomInpt" v-if="isShowarea">
            <textarea rows="3" cols="20" v-model="releaseThemeMsg" ref="Msginput"  maxlength="400"  id="releaseThemeMsg"  v-on:keyup.13="enterMsg" class="enter_msg"> </textarea>
            <div class="msg_btn" @click="enterMsg">发送</div>
        </div>
        <div v-show="isCancel">
            <div class="alert-cover"></div>
            <div class="alert-box">
                <div class="delete_title">确定删除此条留言吗？</div>
                <div class="delete_alert">取消后留言不可恢复哦</div>
                <div class="btn_box">
                    <div class="btn_cancel" @click="toCancel">取消</div>
                    <div class="btn_sure" @click="toSure">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<style lang="less" scoped>
@import url('./theme_detail.less');
</style>

<script type="text/ecmascript-6">
    import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { BridgeMixin } from 'src/globalBasicData'
    export default{
        name: 'theme_detail',
        mixins: [BridgeMixin],
        data(){
            return{
                page_url: HOST_HDPTHEME+ '/theme/getListByCondition',
                closeOnClickModal: true,
                themeDetail: '',
                themeGoodDetail: '',
                goodsItems: '',
                goodsItemsId: [],
                productId: '',
                msgMasterItems: [],
                msgMaster:[],
                isCircle: false,
                isYellow: false,
                releaseThemeMsg: '',
                isShowReleaseThemeMsg: false,
                readTranThumbNum: '',
                isShowarea:false,
                forbiddenClick: 0,
                isHideClick: true,
                loginCode: '',
                transmit: '',
                params: {
                    themeId: '',
                    type: '',
                    loginCode: ''
                },
                comment:[],
                editContentPic:'',
                arr1:[],
                arr2: [],
                arr3: [],
                arr4: [],
                reprintf:0,
                goods: '',
                editorWord: '',
                editorWordIndex: '',
                showPageDetail: '',
                type:null,
                pid:null,
                user:'',
                size:0,
                lookmore:'查看更多评论',
                commodityId: [],
                showSanJiao:true,
                thumbed: '',
                theme_id: '',
                userId: '',
                arrayId: [],
                nicheng:'',
                weixinSignature: '',
                nonceStr: '',
                timestamp: '',
                isCancel: false,
                showPageDetailData:[],
                editContentPicHtml:''
            }
        },
        created(){
        },
        mounted(){
            let _this = this
            _this.getThemeDetailData()
                _this.getCommentData()
                _this.getReadNum()
                _this.getnicheng()
                // _this.savaThemeStatistics()
                _this.setupWebViewJavascriptBridge(function(bridge){
                    bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
                        let responseData = { 'Javascript Says':'Right back atcha!' }
                        themeDetailIos = data
                        _this.setId()
                        _this.requestThumbTheme()
                        responseCallback(responseData)
                    })
                })
        },
        methods: {

//            获取昵称
            getnicheng:function(){
                let nicheng=window.localStorage.getItem('niCheng');
                if (nicheng){
                    this.nicheng=nicheng
                }else{
                    this.nicheng='昵称'
                }
            },
            setId(){
                window.localStorage.setItem('externalId',this.$route.query.id )
                this.user = themeDetailIos.split(',')[1]
            },

            //请求主题详情页的数据
            getThemeDetailData(){
                let url = HOST_HDPTHEME + '/theme/getThemeById'
                let id = this.$route.query.id
                this.loginCode = window.localStorage.getItem('loginCode')
                this.$resource(url).get({ id:id }).then((response) =>{
                    if( response.status == 200 ){
                        if( response.body.code == 200 ){
                            var graphicDetails = response.body.respBody.graphicDetails
                            let graphicDetailsArr = graphicDetails.split('<br>')
                            let str = ''
                            let arr = []
                            // 处理富文本信息，上边为图片，下边为商品
                            graphicDetailsArr.forEach(e => {
                                if(e.indexOf('【') === -1){
                                str += e + '<br>'
                                }else{
                                arr.push(e.substring(e.indexOf('【') + 1, e.lastIndexOf('】')))
                                }
                            })
                            this.editContentPicHtml = str
                            arr = arr.map(e => JSON.parse('{' + e + '}'))
                            arr.forEach(e => {
                                this.commodityId.push(e.commodityId)
                                e.pic = e.pic.split(',')[0]
                            })
                            this.showPageDetailData = arr
                            
                            this.editContentPic= response.body.respBody
                            this.name = response.body.respBody.name
                            this.imgUrl = response.body.respBody.imgUrl
                            if( response.body.respBody.clicks == null ){
                                response.body.respBody.clicks = 0
                            }
                            if( response.body.respBody.fabulous  == null ){
                                response.body.respBody.fabulous  = 0
                            } if( response.body.respBody.reprintf  == null ){
                                response.body.respBody.reprintf  = 0
                            }
                            this.goodsItemsId = response.body.respBody.productId
                            if( (this.goodsItemsId.length == 1 && this.goodsItemsId[0].productId != null) || this.goodsItemsId.length > 1 ){
                                this.readTranThumbNum = response.body.respBody
                                for( var i = 0; i < this.goodsItemsId .length; i++ ){
                                    this.productId += this.goodsItemsId[i].productId+','
                                }
                                let url = HOST_HDPCOMMODITY + '/commodityFront/getThemeCommodityList'
                                this.$resource(url).get({ commodityIds:this.productId }).then((response) =>{
                                    if( response.status == 200 ){
                                        let len = response.body.length
                                        for( var i = 0; i < len; i++ ){
                                            response.body[i].pic = response.body[i].pic.split(',')[0]
                                        }
                                        this.goodsItems = response.body
                                    }else {
                                        Toast({
                                            message: response.body.msg,
                                            position: 'center',
                                            duration: 3000
                                        });
                                    }
                                })
                            }
                            setTimeout(this.tuwenEnterDetail,300)
                        }
                    }
                })
            },

            //获取商品留言
            getCommentData(index){
                let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
                this.size +=8
                this.$resource (url ).get({ 'externalId': this.$route.query.id,'size':this.size}).then((response) => {
                    if( response.status == 200 ){
                        this.msgMaster= response.body
                        this.msgMasterItems = response.body.list
                        

                        if (this.msgMasterItems.length <=this.size){
                            this.lookmore='没有更多了'
                        }else{
                            this.lookmore='查看更多评论'
                        }
                        var len = response.body.length
                        for( var i = 0; i < this.msgMasterItems.length; i++ ){
//                                 this.msgMasterItems[i].createTime=this.msgMasterItems[i].replace(/\-/g, "\/")
                            if (this.msgMasterItems[i].child.length==0){
                                this.showSanJiao=false

                            }else{
                                this.showSanJiao=true

                            }
                            var createTimeStr = this.msgMasterItems[i].createTime;
                            this.msgMasterItems[i].createTime= this.msgMasterItems[i].createTime.replace(/\-/g, "\/")
                            let releaseTime = new Date( this.msgMasterItems[i].createTime ).getTime()
                            this.msgMasterItems[i].createTime=parseInt(this.msgMasterItems[i].createTime)
                            let nowTime =new Date().getTime()
                            let hour = parseInt( ( (nowTime - releaseTime)/1000/60/60));
                            this.$set(this.msgMasterItems[i], 'createTimeStr', '');
                            if(hour > 24) {
                                this.$set(this.msgMasterItems[i], 'createTimeStr', createTimeStr);
                            } else {
                                this.msgMasterItems[i].createTime = hour;
                            }
                            if (this.msgMasterItems[i].nickname==null||this.msgMasterItems[i].nickname==''){
                                this.msgMasterItems[i].nickname='昵称'
                            }
                        }
                        Indicator.close()
                    }
                })
            },

            //返回
            returnBack(){
                var categoryId = this.$route.query.categoryId
                var theme_list = this.$route.query.theme_list
                if( theme_list == 1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_list?categoryId='+categoryId
                }else {
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'themeIndex'
                }
            },

            //点击分享的时候
            shareNow(){
                window.location.href = "next://";
               
            },

            checkMore(){
                this.getCommentData()
            },

            deleteMsg(index){
                window.location.href = "deletemsg://";
                if( this.user != '' ){
                    this.isCancel=true
                    window.localStorage.setItem('pinlunid',this.msgMasterItems[index].id)
                    window.localStorage.setItem('themeid',this.msgMasterItems[index].userId)
                }
            },

            //
            deleteMsgChild(item){
                window.location.href = "deleteMsgChild://";
                if( this.user != '(null)' ){
                    this.isCancel=true
                    window.localStorage.setItem( 'erjiid',item.id )
                    window.localStorage.setItem( 'erjiid2',item.userId )
                }
            },

            //进入商品详情页
            enterGoodDetail(commodityId){
                var theme_list = this.$route.query.theme_list
                var categoryId = this.$route.query.categoryId
                if( theme_list==1 ){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+this.$route.query.id+'&theme_detail=1'+'&categoryId='+this.$route.query.categoryId+'&theme_list=1'
                }else {
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+this.$route.query.id+'&theme_detail=1'
                }
            },

            //点击图文详情的跳转
            tuwenEnterDetail(){
                // var id = this.$route.query.id
                // var commodityId = []
                // commodityId.push( this.commodityId[1] )
                // commodityId.push( this.commodityId[2] )

                // var lists = document.getElementsByClassName('editorLi')
                // var commodityIds = this.commodityId
                // //使用闭包
                // for(var i=0;i<lists.length; i++) {
                //     if (lists[i].tagName == "LI") {
                //         lists[i].onclick = (function (i) {
                //             return function () {
                //                 window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId[i]+'&id='+id+'&theme_detail=1'
                //             }
                //         })(i);
                //     }
                // }
            },
            tuwenEnterDetail2(commodityId){
                let id = this.$route.query.id
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+id+'&theme_detail=1'
            },

            //点赞
            thumbTheme(){
                var _this = this
                WebViewJavascriptBridge.callHandler('thumbTheme', {'foo': 'bar'}, function(response) {
                    let thumbIos = response.split(',')
                    if( thumbIos[1] != '(null)' ){
                        _this.isHideClick = false
                        let url = HOST_HDPTHEME + '/themeStatistics/savaThemeStatistics'
                        let id = _this.$route.query.id
                       
                        _this.params = {
                            themeId: id,
                            type: 2,
                            loginCode: thumbIos[0],
                            userId: thumbIos[1]
                        }
                        _this.$resource(url).get( _this.params ).then((response) =>{
                            if( response.status == 200 ){
                                if( response.body.code == 200 ){
                                    if( response.body.respBody.clicks == null ){
                                        response.body.respBody.clicks = 0
                                    }
                                    if( response.body.respBody.fabulous  == null ){
                                        response.body.respBody.fabulous  = 0
                                    } if( response.body.respBody.reprintf  == null ){
                                        response.body.respBody.reprintf  = 0
                                    }
                                    _this.readTranThumbNum = response.body.respBody
                                    _this.isYellow = true
                                }
                            }
                        })
                    }
                })
            },

            //请求点赞接口判断点赞大拇指的颜色
            requestThumbTheme(){
                let url = HOST_HDPTHEME + '/themeStatistics/isFabulous'
                let id = this.$route.query.id
                let userCode = themeDetailIos.split(',')
                this.params = {
                    themeId: id,
                    userId: userCode[1]
                }
                this.$resource(url).get(this.params ).then((response) =>{
                    if( response.body.code == 1 ){
                        this.isHideClick = false
                    }else {
                        this.isHideClick = true
                    }
                })
            },

            //请求阅读量的数据
            getReadNum(){
                let url = HOST_HDPTHEME + '/themeStatistics/savaThemeStatistics'
                let id = this.$route.query.id
                this.params = {
                    themeId: id,
                    type: 1
                }
                this.$resource(url).get(this.params ).then((response) =>{
                    if( response.status == 200 ){
                        if( response.body.code == 200 ){
                            if( response.body.respBody.clicks == null ){
                                response.body.respBody.clicks = 0
                            }
                            if( response.body.respBody.fabulous  == null ){
                                response.body.respBody.fabulous  = 0
                            } if( response.body.respBody.reprintf  == null ){
                                response.body.respBody.reprintf  = 0
                            }
                            this.readTranThumbNum = response.body.respBody
                        }
                    }
                })
            },

            //请求分享的接口
            getShareInterface(){
                let url = HOST_HDPTHEME + '/themeStatistics/savaThemeStatistics'
                let id = this.$route.query.id
                this.params = {
                    themeId: id,
                    type: 3
                }
                this.$resource(url).get(this.params ).then((response) =>{
                    if( response.status == 200 ){
                        if( response.body.code == 200 ){
                            if( response.body.respBody.clicks == null ){
                                response.body.respBody.clicks = 0
                            }
                            if( response.body.respBody.fabulous  == null ){
                                response.body.respBody.fabulous  = 0
                            } if( response.body.respBody.reprintf  == null ){
                                response.body.respBody.reprintf  = 0
                            }
                            this.readTranThumbNum.reprintf = response.body.respBody.reprintf
                        }
                    }
                })
            },

            //点击留言的时候
            releaseTheme2(index){
                let _this = this
                WebViewJavascriptBridge.callHandler('releaseTheme2', {'foo': 'bar'}, function(response) {
                    let releaseTheme2Params = response.split(',')
                    if( releaseTheme2Params[1] != '(null)' ){
                        _this.pid = _this.msgMasterItems[index].id
                        _this.type=1;
                        if(_this.isShowarea==true){
                            _this.isShowarea=false
                        }else{
                            _this.isShowarea=true
                        }
                    }
                })
            },

            //点击评论的时候
            releaseTheme(){
                let _this = this
                WebViewJavascriptBridge.callHandler('releaseTheme', {'foo': 'bar'}, function(response) {
                    let releaseThemeParams = response.split(',')
                    if( releaseThemeParams[1] !=  '(null)' ){
                        _this.loginCode= response.split(',')[0]
                        _this.userId= response.split(',')[1]
                        _this.type=0;
                        if(_this.isShowarea==true){
                            _this.isShowarea=false
                        }else{
                            _this.isShowarea=true
                        }
                    }
                })
            },

            //点击其他地方的时候是input消失
            hiddenInput(event){
                var evt = event || window.event;
                var target = evt.target || evt.srcElement;
                if (target.className== 'enter_msg'){
                    this.isShowarea=true
                }else{
                    this.isShowarea=false
                }
            },

            //键盘的enter事件
            enterMsg(){
                var _this = this
                WebViewJavascriptBridge.callHandler('enterMsg', {'foo': 'bar'}, function(response) {
                    let enterMsgIos = response.split(',')
                    if( _this.type==0 ){
//                  留言
                        _this.isShowarea=false
                        let url=HOST_HDBMESSAGE+'/comment/saveComment'
                        let body=[
                            {
                                child: [{}],
                                commentContent: _this.releaseThemeMsg,
                                commentStar: 0,
                                createTime: "",
                                display: 0,
                                externalId:  _this.$route.query.id,
                                externalName: "",
                                externalType: 2,
                                pics: [],
                                pid: 0,
                                userId: enterMsgIos[1]
                            }
                        ]
                        if (_this.releaseThemeMsg!=''){
                            _this.$resource(url).save({},body).then((response) => {
                                if (response.status==200){
                                    _this.comment=response
                                    _this.getCommentData()
                                    _this.releaseThemeMsg=''
                                }
                            })
                        }else{
                            alert('内容不能为空哦！')
                        }
                    }
                    else{
//                  评论留言
                        _this.isShowarea=false
                        let url=HOST_HDBMESSAGE+'/comment/saveComment'
                        let body=[
                            {
                                child: [{}],
                                commentContent: _this.releaseThemeMsg,
                                commentStar: 0,
                                createTime: "",
                                display: 0,
                                externalId:  _this.$route.query.id,
                                externalName: "",
                                externalType: 2,
                                pics: [],
                                pid:_this.pid,
                                userId: enterMsgIos[1]
                            }
                        ]
                        if ( _this.releaseThemeMsg!='' ){
                            _this.$resource(url).save({},body).then((response) => {
                                if (response.status==200){
                                    _this.getCommentData()
                                    _this.releaseThemeMsg=''
                                }
                            })
                        }else{
                            alert('内容不能为空！')
                        }
                    }
                })
            },

            //取消删除
            toCancel(){
                this.isCancel=false;
                this.diff=false
            },

            toSure:function(){
                var _this = this
                WebViewJavascriptBridge.callHandler('toSure', {'foo': 'bar'}, function(response) {
                    let toSureIos = response.split(',')
                    if( toSureIos[1] !=  '(null)' ){
                        _this.isCancel=false
                        let url=window.HOST_HDBMESSAGE+'/comment/deleteComment'
                        let uId = toSureIos[1]
                        let thisid=window.localStorage.getItem('pinlunid')
                        let curId=window.localStorage.getItem('themeid')
                        let erjiid=window.localStorage.getItem('erjiid')
                        let erjiid2=window.localStorage.getItem('erjiid2')
                        if( uId==curId ){
                            _this.$resource(url).get({ 'commentId':thisid,'userToken':toSureIos[0] }).then((response) => {
                                if (response.status==200){
                                    _this.SystemMsg=response.body
                                    _this.getCommentData()
                                    _this.diff=false
                                }
                            })
                        }
                        if (uId==erjiid2&&erjiid){
                            _this.$resource(url).get({ 'commentId':erjiid,'userToken':toSureIos[0] }).then((response) => {
                                if (response.status==200){
                                    _this.SystemMsg=response.body
                                    _this.getCommentData()
                                    _this.diff=false
                                }
                            })
                            window.localStorage.removeItem('erjiid')
                        }
                    }
                })
            },
        }
    }
</script>
