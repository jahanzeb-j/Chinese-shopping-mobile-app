<template>
  <div class="themeDetail" @click="hiddenInput($event)">
    <div class="header" >
      <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
      <span class="orderTitle">
          <span class="fixWord">{{ editContentPic.name}}</span>
      </span>
        <span class="star">
            <img v-show="!isCollection" @click="addCollection" src="../../assets/images/collect_normal.png">
            <img v-show="isCollection" @click="deleteCollection" src="../../assets/images/collectionGoodsOk.png">
        </span>
      <span class="sharePic" @click="shareAccount">
          <img src="../../assets/images/share2x.png" alt="">
      </span>
    </div>
    <div class="loading" v-show="finishRender">
      <img src="../../assets/images/spinner2.png" alt="" class="onloading-img">
      <div class="onloading-words">加载中请稍后...</div>
    </div>
    <div class="editContentPic">
      <!-- <div  v-html=showPageDetail>
      
      </div> -->
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
                      <!-- <mt-button type="default" @click="tuwenEnterDetail2(item.commodityId)" class="yellowBtn" style="background: #F9BE00;font-size:1.8rem;  color: #fff; height:3.5rem;width:16.5rem;display: -webkit-inline-box;display: flex;justify-content: center; align-items: center;display: -webkit-flex;-webkit-justify-content: center; -webkit-align-items: center; border-radius: 5px">立即购买</mt-button> -->
                      <div type="default" @click="tuwenEnterDetail2(item.commodityId)" class="yellowBtn" style="background: #F9BE00;font-size:1.8rem;  color: #fff; height:3.5rem;line-height:3.5rem;width:16.5rem;     text-align: center; border-radius: 5px">立即购买</div>
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
      <span class="thumbs_up"  v-if="!isHideClick">
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
      <mt-loadmore :auto-fill="false" :bottom-method="getCommentData" :bottom-all-loaded="!lookmore" ref="loadmore">
        <div class="msgMain clearfix" v-for="(msgMasterItem,index) in msgMasterItems" >
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
              <span class="deleteMsg" v-if="user==msgMasterItem.userId" ref="detetep" @click="deleteMsg(index)">
                  <!--dkgolkr-->
                  <img src="../../assets/images/del-icon.png" alt="">
              </span>
            </div>
          </div>
          <div style="position:relative">
            <img src="../../assets/images/tri.png" alt="" class='saojiaoimg'  v-show="msgMasterItem.showSanJiao">
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
      </mt-loadmore>
    </div>
    <div class="checkMoreMsg clearfix">
      <span class="MoreMsgLine MoreMsgLine1"></span>
      <span>&lt;</span>
      <span @click="checkMore">{{lookmore?'查看更多评论':'没有更多了'}}</span>
      <span>&gt;</span>
      <span class="MoreMsgLine MoreMsgLine2"></span>
    </div>
    <span v-if="!lookmore" style="width: 100%;padding: 2.2rem;background: #f4f4f4;"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></span>
    <div class="circle" v-if="isCircle">
      <mt-spinner color="#000" type="fading-circle"></mt-spinner>
    </div>
    <div class="bottomInpt" v-show="isShowarea">
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
    <div class="showSharePic" v-show="showWeChatShareTitle">
      <img src="../../assets/images/guide1.png" alt="">
    </div>
    <div class="showSharePop" v-show="showWeChatShareTitle" @click="shutDownWeChat">
    </div>

    <!--收藏与取消收藏toster start-->
    <div class="appointment-alert" v-if="collectionAlert">
      <img src="../../assets/images/error.png" class="appointment-img"  v-if="collectionImg">
      <img src="../../assets/images/adopt.png" class="appointment-img"  v-if="!collectionImg">
      <div class="alert-words" v-if="collectionWords">取消收藏成功</div>
      <div class="alert-words" v-if="!collectionWords">收藏成功</div>
    </div>
    <!--收藏与取消收藏toster end-->
  </div>
</template>
<style>
  .editContentPic img{
    display:block;
    width:100%;
  }
  
</style>
<style scoped>
.themeDetail  .header .orderTitle .fixWord{
    width: 17rem;
    overflow: hidden;
    line-height: 2rem
}

.themeDetail  .header .star{
    margin-right: -4rem;
    width: 1.75rem;
    height: 1.65rem;
}

.themeDetail  .header .star img{
    margin-bottom: 3px;
}
.editContentPic{
    margin:5.1rem 0 1rem 0;
}
.buyList .buyList_ul .li1 .buyList_center2{
    line-height: 1.5rem;
}
.masterPic img{
    border-radius: 50%;
}
.onloading-img{
  width:2.5rem;
  height:2.5rem;
  vertical-align: middle;
  animation-name:loadingimg;
  animation-duration:1.5s;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
}

@keyframes loadingimg{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);;
  }
}

.onloading-words{
  display:inline-block;
  text-align: center;
  margin-top:20px;
  font-size:1.2rem;
  color:#858585;
  margin-left:3px;
}

</style>

<style scoped lang="less">
@import url('./theme_detail.less');
</style>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import Vue from 'vue';
  import { _getUrlParam } from '../../util/index';

  export default{
    name: 'theme_detail',
    data(){
      return{
        page_url: HOST_HDPTHEME+ '/theme/getListByCondition',
        allLoaded:false,
        popupVisible: false,
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
        lookmore:true,
        isCancel:false,
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
        showWeChatShareTitle: false,
        name: '',
        imgUrl: '',
        finishRender: true,
        timer: '',
        isCollection: false,   //是否收藏
        collectionId: '',
        //        收藏与取消收藏相
        collectionAlert:false,
        collectionImg:false,
        collectionWords:false,
        showPageDetailData:[],
        editContentPicHtml:''
      }
    },
    created(){
      window._bd_share_main && window._bd_share_main.init(),
        this.getSignature()
    },
    mounted(){
    
        this.setId()
        this.getThemeDetailData()
        this.getCommentData()
        this.getReadNum()
        window._bd_share_main && window._bd_share_main.init(),
        this.getnicheng()
        this.requestThumbTheme()
        this.initWeChatShare()
        this.watchImgHeight()
        this.getSignature()

        this.checkIsCollection()
        window.addEventListener('scroll',this.scroll);
        localStorage.setItem('isNeedRefreshThemeIndex',true)
    },
    destroyed(){
      clearInterval(this.timer);
    },
    methods: {
      scroll(){
        let screenH = window.screen.availHeight;
        let scrollTop = document.body.scrollTop / 2;
        let documentH = document.body.scrollHeight / 2;
        if(screenH + scrollTop >= documentH){
          this.getCommentData();
        }
      },
      checkLogin(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            if (response.status == 200) {
              if(response.data.code<0){
                let id = this.$route.query.id
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf
                    ('/') + 1) + "login?loginBack=100&id="+id;
                this.isShowarea=false
              }else{
                this.isShowarea=true
              }
            }
          })
        }else{
          let id = this.$route.query.id
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') +
              1) + "login?loginBack=100&id="+id;
        }
      },
      //监听
      watchImgHeight(){
        var _this = this
        this.timer = setInterval(function () {
          let editContentPic = document.getElementsByClassName('editContentPic')[0]
          if( editContentPic.offsetHeight > 0 ){
            _this.finishRender = false
            clearInterval(this.timer)
            var productBuy = $('.productBuy')
            var bodyWidth = document.getElementsByTagName('body')[0]
            for( var i = 0; i< productBuy.length; i++ ){
              var imgs = productBuy.eq(i).siblings('img')
              var p =  productBuy.eq(i).siblings('p')
              if( imgs.length > 0 ){
                for( var j = 0; j <  imgs.length; j++ ){
                  imgs[j].style.width = bodyWidth.offsetWidth + 'px'
                }
              }
              for( var j = 0; j < p.length; j++ ){
                if( p[j].innerHTML == '<br>' ){
                  p[j].style.display = 'none'
                }
              }
            }
          }
        },200)
      },

      //获取昵称
      getnicheng:function(){
        let nicheng=window.localStorage.getItem('niCheng');
        if (nicheng){
          this.nicheng=nicheng
        }else{
          this.nicheng='昵称'
        }
      },
      setId:function(){
        window.localStorage.setItem('externalId',this.$route.query.id )
        this.user=window.localStorage.getItem('userId')
      },

        //请求主题详情页的数据
       getThemeDetailData(){
        let url = HOST_HDPTHEME + '/theme/getThemeById'
        let id = this.$route.query.id
        this.loginCode = window.localStorage.getItem('loginCode')
        this.$resource(url).get({ id:id }).then((response) =>{
          if( response.status == 200 ){
            if( response.body.code == 200 ){
              let graphicDetails = response.body.respBody.graphicDetails
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
              this.imgUrl = response.body.respBody.listPic
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
                this.$resource(url).get({ commodityIds:this.productId, version: 'v1.2' }).then((response) =>{
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
              this.initWeChatShare()
            }
          }
        })
      },
       checkMore(){
        this.getCommentData()
      },
        //判断是否收藏过
       checkIsCollection(){
            this.loginCode = window.localStorage.getItem('loginCode')
            
            let url = HOST_HDBMESSAGE + '/collection/userCollectionExist'
            let userId = window.localStorage.getItem('userId')
            let externalId = this.$route.query.id
            this.$resource( url,{
              headers:{
                'loginCode':this.loginCode
              }} ).get({ userId: userId, collectionType: 3, externalId: externalId }).then((response) => {
                if( response.body.code == '0000' ){
                    if( response.body.respBody == ''|| response.body.respBody == null ){
                        this.isCollection = false
                    }else{
                        this.isCollection = true
                        this.collectionId = response.body.respBody
                    }
                }
            })
        },

        //收藏主题
       addCollection() {
            let url = HOST_HDBMESSAGE + '/collection/addUserCollection'
            
            let userId = window.localStorage.getItem('userId')
            let externalId = this.$route.query.id
            this.loginCode = window.localStorage.getItem('loginCode')
            if(this.loginCode) {
               Vue.http.headers.common.loginCode = this.loginCode
            } else {
                Vue.http.headers.common={}
            }
           
            _getUrlParam(this);
            this.$resource( url )
            .get({ userId: userId, collectionType: 3, externalId:externalId }).then((response) => {
            
                if( response.body.code == '0000' ){
                    let _this=this
                    this.isCollection = true
                    this.collectionId = response.body.respBody
                    _this.collectionAlert=true;
                    _this.collectionImg=false;
                    _this.collectionWords=false
                    setTimeout(function(){
                       _this.collectionAlert=false;
                       _this.collectionImg=true;
                       _this.collectionWords=true
                     },2000)
                }else if( response.body.code == -1 ){
                    let url = HOST_HDPUSER+'/user/isLogin';
                    this.loginCode= window.localStorage.getItem('loginCode')
                    this.userId= window.localStorage.getItem('userId')
                    this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                        if (response.status == 200) {
                            if(response.data.code<0){

                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
                                + `login?loginBack=100&`
                                + this.urlRemain
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
            })
        },

        //取消主题收藏
       deleteCollection(){
            this.loginCode = window.localStorage.getItem('loginCode')
            
            let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
            this.$resource( url ,{
              headers:{
                'loginCode':this.loginCode
              }}).get({ id: this.collectionId }).then((response) => {
                if( response.body.code == '0000' ){
                    let _this=this
                    this.isCollection = false
                    _this.collectionAlert=true;
                    _this.collectionImg=true;
                    _this.collectionWords=true
                 setTimeout(function(){
                    _this.collectionAlert=false;
                    _this.collectionImg=false;
                    _this.collectionWords=false
                 },2000)


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
                        message: response.body.message,
                        position: 'center',
                        duration: 3000
                    });
                }
            })
        },

        //获取商品留言
      getCommentData(index){
        let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
        this.size +=8
        this.$resource (url ).get({ 'externalId': this.$route.query.id,'size':this.size}).then((response) => {
          if( response.status == 200 ){
            this.msgMasterItems = response.body.list

            // console.log(this.msgMaster.total)
            if (this.msgMaster.total > this.size){
              this.lookmore= true
            } else {
              this.lookmore= false
            }
            for( let  i = 0; i < this.msgMasterItems.length; i++ ){
//                                 this.msgMasterItems[i].createTime=this.msgMasterItems[i].replace(/\-/g, "\/")
              if (this.msgMasterItems[i].child.length==0){
                this.msgMasterItems[i].showSanJiao=false

              }else{
                this.msgMasterItems[i].showSanJiao=true

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
//                        this.getWeXinShare()
          }
        })
      },

      //返回
      returnBack(){
        var categoryId = this.$route.query.categoryId
        var theme_list = this.$route.query.theme_list
        var found_index = this.$route.query.found_index
        var found_index = this.$route.query.found_index
        let collection = this.$route.query.collection
        if( theme_list == 1 && found_index != 1 && categoryId && categoryId !=='undefined'){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_list?categoryId='+categoryId
        }
        else if(  found_index == 1 ){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index'
        }
        else if( collection == 3 ){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection_theme';
        }
        else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'themeIndex'
        }

      },

      //使用微信右上角分享功能，初始化微信的分享
      initWeChatShare(){
        var _this = this
        wx.ready(function(){
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          })
          //分享到微信朋友圈
          wx.onMenuShareTimeline({
            title:  _this.name+'-网库优选',
            link: window.location.href,
            imgUrl: _this.imgUrl,
            success: function () {
              _this.getShareInterface()
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          //分享到微信好友
          wx.onMenuShareAppMessage({
            title:  _this.name+'-网库优选',
            link: window.location.href,
            imgUrl: _this.imgUrl,
            success: function () {
              _this.getShareInterface()
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          //分享到QQ
          wx.onMenuShareQQ({
            title:  _this.name+'-网库优选',
            link: window.location.href,
            imgUrl: _this.imgUrl,
            success: function () {
              _this.getShareInterface()
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
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

      shareNow(){
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
        var _this = this
        _this.popupVisible = true
        window._bd_share_config={
          "common":{
            "bdSnsKey":{},
            "bdText":_this.name+'-网库优选',
            "bdMini":"1",
            "bdMiniList":false,
            "bdPic":_this.imgUrl,
            "bdStyle":"1",
            "bdSize":"16"
          },
          "share":{},
          "image":{
            "viewList":["tsina","tqq","qzone","weixin","sqq"],
            "viewText":"分享到：",
            "viewSize":"16"
          },
          "selectShare":{
            "bdContainerClass":null,
            "bdSelectMiniList":["tsina","tqq","qzone","weixin","sqq"]
          }
        };
      },

      //在微信中打开分享
      getWeXinShare(){
        var _this = this
        _this.showWeChatShareTitle = true
        window._bd_share_config={
        };
        wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
        //分享到微信朋友圈
        wx.onMenuShareTimeline({
          title:  _this.name+'-网库优选',
          link: window.location.href,
          imgUrl: _this.imgUrl,
          success: function () {
            _this.showWeChatShareTitle = false
            _this.getShareInterface()
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到微信好友
        wx.onMenuShareAppMessage({
          title:  _this.name+'-网库优选',
          link: window.location.href,
          imgUrl: _this.imgUrl,
          success: function () {
            _this.showWeChatShareTitle = false
            _this.getShareInterface()
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享到QQ
        wx.onMenuShareQQ({
          title:  _this.name+'-网库优选',
          link: window.location.href,
          imgUrl: _this.imgUrl,
          success: function () {
            _this.showWeChatShareTitle = false
            _this.getShareInterface()
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },

      shutDown(){
        this.$nextTick(()=>{
          this.popupVisible = false
        })
      },

      //关闭在微信中的分享
      shutDownWeChat(){
        this.showWeChatShareTitle = false
      },

      deleteMsg(index){
        this.isCancel=true
        window.localStorage.setItem('pinlunid',this.msgMasterItems[index].id)
        window.localStorage.setItem('themeid',this.msgMasterItems[index].userId)
      },

      deleteMsgChild:function(item){
        this.isCancel=true
        window.localStorage.setItem('erjiid',item.id)
        window.localStorage.setItem('erjiid2',item.userId)

      },

      //进入商品详情页
      enterGoodDetail(commodityId){
        var theme_list = this.$route.query.theme_list
        var categoryId = this.$route.query.categoryId
        var params = window.location.href
        var index1 = params.indexOf('?')
        var urlRemain = params.slice( index1,params.length +1 )
        var found_index = this.$route.query.found_index
        if( theme_list == 1 ){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+this.$route.query.id+'&theme_detail=1'+'&categoryId='+this.$route.query.categoryId+'&theme_list=1'
        }else if( found_index == 1 ){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?'+urlRemain+'&commodityId='+commodityId+'&theme_detail=1'
        }else {
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+this.$route.query.id+'&theme_detail=1'
        }
      },

      //点击图文详情的跳转
      tuwenEnterDetail(commodityId){
        // var id = this.$route.query.id
        // var commodityId = []
        // commodityId.push( this.commodityId[1] )
        // commodityId.push( this.commodityId[2] )
        // var lists = document.getElementsByClassName('editorLi')
        // var commodityIds = this.commodityId
        // //使用闭包
        // console.log(this.commodityId)
        // for(let i=0;i<lists.length; i++) {
        //   if (lists[i].tagName == "LI") {
        //     lists[i].onclick = (function (i) {
        //       return function () {
                
        //         window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId[i]+'&id='+id+'&theme_detail=1'
        //       }
        //     })(i);
        //   }
        // }
      },
      tuwenEnterDetail2(commodityId){
        let id = this.$route.query.id
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+commodityId+'&id='+id+'&theme_detail=1'
      },

      //点赞
      thumbTheme(){
        let url = HOST_HDPTHEME + '/themeStatistics/savaThemeStatistics'
        let id = this.$route.query.id
        this.params = {
          themeId: id,
          type: 2,
          loginCode: this.loginCode,
          userId: window.localStorage.getItem('userId')
        }
        this.$resource(url).get(this.params ).then((response) =>{
          console.log(response)
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
              this.isYellow = true
              this.isHideClick = false
            }else if(  response.body.code == -1 ){
              let url = HOST_HDPUSER+'/user/isLogin';
              this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                console.log(response)
                if (response.status == 200) {
                  if(response.data.code<0){
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=010"+'&id='+this.$route.query.id
                    //                                        window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail');
                  }else if(response.data.code=200){
                    
                  }
                }
              })
            }
          }
        })
      },

      //请求点赞接口判断点赞大拇指的颜色
      requestThumbTheme(){
        let url = HOST_HDPTHEME + '/themeStatistics/isFabulous'
        let id = this.$route.query.id
        this.params = {
          themeId: id,
          userId: window.localStorage.getItem('userId')
        }
        this.$resource(url).get(this.params ).then((response) =>{

            if( response.body.code == 1){
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
          type: 1,
          loginCode: this.loginCode,
          userId: window.localStorage.getItem('userId')
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
          type: 3,
          loginCode: this.loginCode,
          userId: window.localStorage.getItem('userId')
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

//           点击留言的时候
      releaseTheme2(index){
        this.pid = this.msgMasterItems[index].id
        this.type=1;
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            if (response.status == 200) {
              if(response.data.code<0){
                let id = this.$route.query.id
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf
                    ('/') + 1) + "login?loginBack=100&id="+id;
                this.isShowarea=false
              }else{
                this.isShowarea=true
              }
            }
          })
        }else{
          let id = this.$route.query.id
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') +
              1) + "login?loginBack=100&id="+id;
        }
      },

      //点击评论的时候
      releaseTheme(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.type=0;
          this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            if (response.status == 200) {
              if(response.data.code<0){
                let id = this.$route.query.id
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf
                    ('/') + 1) + "login?loginBack=100&id="+id;
                this.isShowarea=false
              }else{
                this.isShowarea=true
              }
            }
          })
        }else{
          let id = this.$route.query.id
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') +
              1) + "login?loginBack=100&id="+id;
        }




//        let url = HOST_HDPUSER+'/user/isLogin';
//        this.loginCode= window.localStorage.getItem('loginCode')
//        this.userId= window.localStorage.getItem('userId')
//        if(this.loginCode != "" && this.loginCode != null){
//          this.type=0;
//          if(this.isShowarea==true){
//            this.isShowarea=false
//          }else{
//            this.isShowarea=true
//          }
//        }
//        else{
//          let id = this.$route.query.id
//          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=100&id="+id;
//        }

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
        if(this.type==0){
//                  留言
          this.isShowarea=false
          let _this=this
          let url=HOST_HDBMESSAGE+'/comment/saveComment'
          let useid=window.localStorage.getItem('userId')
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
              userId: useid
            }
          ]

          if (_this.releaseThemeMsg!=''){
            this.$resource(url).save({},body).then((response) => {
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
          this.isShowarea=false
          let _this=this
          let url=HOST_HDBMESSAGE+'/comment/saveComment'
          let useid=window.localStorage.getItem('userId')
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
              pid:this.pid,
              userId: useid
            }
          ]
          if (_this.releaseThemeMsg!=''){
            this.$resource(url).save({},body).then((response) => {
              if (response.status==200){
                _this.getCommentData()
                _this.releaseThemeMsg=''
              }
            })
          }else{
            alert('内容不能为空！')
          }
        }


      },

      //关闭分享
      shutDown(){
        this.popupVisible = false
      },
//          取消按钮
      toCancel:function(){
        this.isCancel=false;
        this.diff=false
      },
      toSure:function(){
        this.isCancel=false
        let token=window.localStorage.getItem('loginCode');
        let url=window.HOST_HDBMESSAGE+'/comment/deleteComment'
        let uId=window.localStorage.getItem('userId')
        let thisid=window.localStorage.getItem('pinlunid')
        let curId=window.localStorage.getItem('themeid')
        let erjiid=window.localStorage.getItem('erjiid')
        let erjiid2=window.localStorage.getItem('erjiid2')

        if (uId==curId){
          this.$resource(url).get({'commentId':thisid,'userToken':token}).then((response) => {
            if (response.status==200){
              this.SystemMsg=response.body
              this.getCommentData()
              this.diff=false
            }
          })
        };
        if (uId==erjiid2&&erjiid){
          this.$resource(url).get({'commentId':erjiid,'userToken':token}).then((response) => {
            if (response.status==200){
              this.SystemMsg=response.body
              this.getCommentData()
              this.diff=false
            }
          })
          window.localStorage.removeItem('erjiid')
        }




//        if (uId==curId){
//
//          if (erjiid){
//
//            this.$resource(url).get({'commentId':erjiid,'userToken':token}).then((response) => {
//              if (response.status==200){
//                this.SystemMsg=response.body
//                this.getCommentData()
//                this.diff=false
//              }
//            })
//            window.localStorage.removeItem('erjiid')
//          }else{
//            this.$resource(url).get({'commentId':thisid,'userToken':token}).then((response) => {
//              if (response.status==200){
//                this.SystemMsg=response.body
//                this.getCommentData()
//                this.diff=false
//              }
//            })
//          }
//        }
      },
    }
  }
</script>
