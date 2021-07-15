<template>
  <div class="exhibition-details">
    <div class="header-box">
      <div class="header-left" @click="toLookindex">
        <img src="../../assets/images/goback.png">
      </div>
      <div class="header-title header-title-other">{{getdate.name}}</div>
      <div class="shareAccount" @click="shareAccount">
        <img src="../../assets/images/share2x.png">
      </div>
      <div class="collect">
        <img src="../../assets/images/collect_normal.png" v-if="!isCollection"   @click="addCollection">
        <img src="../../assets/images/collectionGoodsOk.png" v-if="isCollection"  @click="deleteCollection">
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
    <div class="f-carousel" style="position:relative">
      <mt-swipe :auto="4000" @change="handleChange">
        <mt-swipe-item v-for="(item,index) in exhibitionInfo">
          <img :src=item >
        </mt-swipe-item>
      </mt-swipe>
      <div class="sliderLength">{{curIndex}}<span style="font-size:0.9rem ">/</span> {{sliderLength}}</div>
    </div>
    <div class="exhibition-words">
      <div class="exhibition-name">{{getdate.name}}</div>
      <!--<div class="appointment-btn" @click="clickyuyue">预约</div>-->
      <div class="appointment-btn" v-if="showMessage" @click="clickAppointment">预约</div>
      <div class="appointment-btned" v-if="!showMessage" @click="clickAppointmented">已预约</div>

      <!--<div class="appointment-btn">预约</div>-->
      <div class="appointment-item">
        <div class="appointment-item-left">{{getdate.commodityCount}}个商品</div>
        <div class="appointment-item-middle">{{getdate.positionDetail}}</div>
        <div class="appointment-item-right">{{getdate.distanceStr}}</div>
      </div>
    </div>
    <div class="exhibition-position">
      <div class="exhibition-position-logo"></div>
      <div class="exhibition-position-words">{{getdate.position}}</div>
      <div class="call-phone" @click="clickphone">
        <img src="../../assets/images/phone.png" alt="">
      </div>
    </div>
    <div class="exhibition-tell" v-if="isShowThree">{{showThree}}</div>
    <div class="exhibition-tell" v-else>{{getdate.introduce}}</div>
    <div class="show-open"  v-if="isShowOpenIcon" @click="showOpenWords"><img src="../../assets/images/open_icon.png" alt=""></div>
    <div class="show-open" v-if="isShowCloseIcon" @click="showCloseWords"><img src="../../assets/images/close_icon.png" alt=""></div>
    <div class="goods-details">
      <div class="goods-box" v-for="(item2,index) in getCommity">
        <div class="goods-img-box" @click='toShoping(index)'>
          <img :src="item2.pic" >
        </div>
        <div style="clear: both"></div>
        <div class="goods-name">{{item2.name}}</div>
        <div class="money-box"><span class="money-icon">￥</span><span class="money-num">{{item2.salePrice}}</span></div>
      </div>

    </div>


    <!--1.3预约布局开始-->
    <div class="appointment-box3" style="bottom:-100%;" @click="hideImg">
      <div class="header-box-other">
        <div class="header-left" @click="goHidden('click')">
          <img src="../../assets/images/goback.png">
        </div>
        <div class="header-title">预约展厅</div>
      </div>
      <div class="appointment-word-box">
        <div class="appointment-fill-div">
          <input type="text" class="appointment-fill " v-model="appointmentName" placeholder="来访者姓名" @focus="appointmentFocus('name')"  >
          <img src="../../assets/images/clearNumber.png" alt="" @click="clearModel('appointmentName')" v-if="clearNameImg">
        </div>
        <div class="appointment-fill-div">
          <input type="text" class="appointment-fill diffnum" v-model="appointmentNum" placeholder="手机号码" @focus="appointmentFocus('num')">
          <img src="../../assets/images/clearNumber.png" alt="" @click="clearModel('appointmentNum')" v-if="clearNumberImg">
        </div>
        <div class="lookTime"  @click="comeIn">
          <div class="lookTime-words">看货时间</div>
          <input type="text" v-model="looktime" class="looktime-input" disabled="disabled">
          <img src="../../assets/images/choose.png" alt="">
        </div>
        <div class="lookTime" @click="popupVisible2 = true">
          <div class="lookTime-words">来访人数</div>
          <input type="text" v-model="visit" class="looktime-input" disabled="disabled">
          <img src="../../assets/images/choose.png" alt="">
        </div>
      </div>
      <div class="gantan">
        <img src="../../assets/images/gantan.png" alt="">
        <div>预约成功后，将会有客服人员联系您！</div>
      </div>
      <div class="appointment-sub" @click="appointmentSure">提交</div>
      <!--预约提示框开始-->
      <div class="appointment-alert" v-if="appointmentAlert">
        <img src="../../assets/images/error.png" class="appointment-img"  v-if="appointmentImg">
        <img src="../../assets/images/adopt.png" class="appointment-img"  v-if="!appointmentImg">
        <div class="alert-words" v-if="appointmentWords">{{telePhoneAlert}}</div>
        <div class="alert-words" v-if="!appointmentWords">预约提交成功</div>
      </div>
      <!--预约人为空时提示-->
      <div class="appointment-alert" v-if="appointmentUser">
        <div class="alert-words" style="line-height:6rem">请填写来访者姓名</div>
      </div>
      <!--看货时间提示-->
      <div class="appointment-alert" v-if="showappointmentTimer">
        <div class="alert-words" style="line-height:6rem">请选择看货时间</div>
      </div>
      <!--来访人数提示-->
      <div class="appointment-alert" v-if="showappointmentVistor">
        <div class="alert-words" style="line-height:6rem">请选择来访人数</div>
      </div>
      <!--预约提示框结束-->
    </div>
    <!--1.3预约布局结束-->
    <!--已预约信息展示布局开始-->
    <div class="appointmented-cover" v-if="ShowAppointmentedCover"></div>
    <div class="appointmented-box" v-if="ShowAppointmentedCover">
      <div class="appointmented-title">预约信息</div>
      <div class="appointmented-name-box">
        <div class="appointmented-name">{{getdate.name.length>11?getdate.name.slice(0,11)+'..':getdate.name}}</div>
        <div class="zhanting-address">{{getdate.position}}</div>
      </div>
      <div class="look-box">
        <div class="look-title">看货时间</div>
        <div class="look-time">{{appointmentDate}}&nbsp;{{appointmentWeek}}</div>

      </div>
      <div class="appointment-msg">
        <div class="appointment-msg-left">来访姓名</div>
        <div class="appointment-msg-right">{{appointmentDiff.appointmentName}}</div>
      </div>
      <div style="clear:both"></div>
      <div class="appointment-msg">
        <div class="appointment-msg-left">手机号码</div>
        <!--<div class="appointment-msg-right">{{yuyuephone}}</div>-->
        <div class="appointment-msg-right">{{appointmentDiff.telephone}}</div>
      </div>
      <div style="clear:both"></div>
      <div class="appointment-msg" >
        <div class="appointment-msg-left">来访人数</div>
        <div class="appointment-msg-right">{{appointmentDiff.appointmentCount}}人</div>
      </div>
      <div style="clear:both"></div>
      <div class="konw-btn" @click="clickKnow">知道了</div>
      <div class="bottom-msg" @click="clickAppointment">修改预约信息</div>
    </div>
    <!--已预约信息展示布局结束-->

    <!--滑动选择日期布局开始-->
    <div>
      <!--<mt-button type="primary" @click="popupVisible2 = true">primary</mt-button>-->
      <mt-popup
        v-model="popupVisible2"
        :visible.sync="popupVisible2"
        position="bottom">
        <div class="popupHeader" @click="wangchen">完成</div>
        <div class="popupCon" ref="popupCon">
          <div id="popupSelect">{{popupSelect}}</div>
          <ul id="popupConUl" style="transform: translateY(9rem)">
            <li v-for="item in popupConList">{{item}}</li>
          </ul>
        </div>
      </mt-popup>
    </div>
    <!--滑动选择日期布局结束-->

    <div class="no_more"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
    <!--拨打电话-->
    <div class="phone_cover" v-show="showCoverphone" @click="closehnum"></div>
    <div class="phonenum_box"  ref="pnum" style="bottom:-14.2rem" v-show="showphonenum">
      <a href="tel:" ref="phone" v-if="getdate.telephone">{{getdate.telephone}}</a>
      <a href="tel:" ref="phone2" v-if="getdate.phone">{{getdate.phone}}</a>
      <div class="no_sure" @click="closehnum" v-if="getdate.telephone||getdate.phone">取消</div>
    </div>
    <!--预约展厅-->
    <div class="phone_cover" v-show="showCover2"></div>
    <div class="zhanting_box" v-show="showzhantingbox">
      <div class="zhangting_body">
        <div class="ztb_title">预约展厅</div>
        <div class="ztb_words">
          <div class="words_left">来访人</div>
          <!--<div class="words_right" ref="yuyuename">{{userName}}</div>-->
          <input type="text" class="words_right_input" ref="yuyuename"  placeholder="请输入您的姓名" maxlength="10">
        </div>
        <div class="ztb_words">
          <div class="words_left">联系电话</div>
          <input type="text" class="words_right_input" ref="yuyuePhone" v-model="userPhone"  maxlength="11">
        </div>
        <div class="ztb_words">
          <div class="words_left">看货时间</div>
          <!--<input class="words_input"  type="text" readonly="readonly"  id="beginTime"  ref="time"   v-model="newriqi" placeholder="请选择日期">-->
          <input class="words_input"  type="text" readonly="readonly"   ref="time" v-model="newriqi" placeholder="请选择日期" @click="setDate">
        </div>
        <div id="datePlugin"></div>
        <div class="renshu">
          <div class="renshu_left">来访人数</div>
          <div class="renshu_right" ref="putong_box">
            <div  @click="borderColor($event)">1</div>
            <div  @click="borderColor($event)">2</div>
            <div  @click="borderColor($event)">3</div>
            <div  @click="borderColor($event)">4</div>
            <div  @click="borderColor($event)">5</div>
            <div  @click="borderColor($event)">6</div>
            <div  @click="borderColor($event)">7</div>
            <div  @click="borderColor($event)">8</div>
            <div  @click="borderColor($event)">9</div>
            <div  @click="borderColor($event)">10</div>
            <div  @click="borderColor($event)" style="width:7.5rem; margin-bottom: 2rem">10人以上</div>
          </div>
          <div class="btn_box">
            <div class="btn_no" @click="closeyuyue">取消</div>
            <!--<div class="btn_ok" @click="yuyuesubmit">提交</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="date_box" v-show="isShowDateBox">
      <div class="date_title">请选择日期</div>
      <div style="margin-top:3.6rem">
        <div class="date_year_box" v-for="(year,index) in dateData" v-show="isShowYear">
          <div class="date_year"  @click="chooseYear(index)">{{year.a}}</div>
        </div>
      </div>
      <div style="margin-top:3.6rem" v-show="isShowMonth">
        <div class="date_year_box" v-for="(month,index) in monthData">
          <div class="date_year"  @click="choosemonth(index)">{{month.c}}</div>
        </div>
      </div>
      <div style="margin-top:3.6rem" v-show="isShowDay">
        <div class="date_year_box" v-for="(day,index) in dayData">
          <div class="date_year"  @click="chooseDay(index)">{{day.e}}</div>
        </div>
      </div>
    </div>
    <div class="showSharePic" v-show="showWeChatShareTitle">
      <img src="../../assets/images/guide1.png" alt="">
    </div>
    <div class="showSharePop" v-show="showWeChatShareTitle" @click="shutDownWeChat">
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

    <!--日历布局开始-->
    <!--<div class="hheader-right" @click="comeIn()" style="text-align: right;padding-right:15px">按周</div>-->
    <div class="showCalendar" ref="wcl" style="bottom:-36.1rem">
      <div v-show="showCalweek" style="background:#fff">
        <div class="calender-sure" @click="comeOut()">完成</div>
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
        <ul class="days">
          <li  v-for="day in days">
            <!--今天-->
            <div class="over-other-month" v-if="judgeDay(day)"></div>
            <span v-if="judgeDay(day)" class="other-month"ref="span1">{{ day.getDate() }}</span>

            <span v-else @click="pick(day,$event)" ref="span2">
                <!--今天-->
              <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="activerili" ref="currentday">{{ day.getDate()}}</span>
              <span v-else >{{ day.getDate() }}</span>

            </span>
          </li>
        </ul>
      </div>

    </div>
    <div class="home-cover" @click="comeOut()" v-show="showCover"></div>
    <!--日历布局结束-->

  </div>
</template>
<script type="text/ecmascript-6">
  import 'mint-ui/lib/picker/style.css'
  import { Toast } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import {dateList} from "../../globalBasicData.js"
  // import('../../globalBasicData.js')
  
  import Vue from 'vue'
  export default{
    data(){
      return{
        showCover:false,
        showCover2:false,
        pnumbottom:'',
        showzhantingbox:false,
        pickerVisible:'',
        newriqi:'',
        getdate:[],
        getCommity:[],
        yuYueList:[],
        Appointment:[],
        appointmentId:0,
        userPhone:'',
        imgURL:[],
        localDate:[],
        exhibitionInfo:[],
        showphonenum:true,
        dateData:dateList,
        year:'',
        month:'',
        day:'',
        monthData:[],
        dayData:[],
        isShowYear:true,
        isShowMonth:false,
        isShowDay:false,
        isShowDateBox:false,
        showCoverDate:false,
        datetime:null,
        yuyueTime:null,
        time:null,
        timeother:null,
        timestamp: '',
        nonceStr: '',
        weixinSignature: '',
        popupVisible: false,
        showWeChatShareTitle: false,
        keywords:null,
        shareUrl:null,
        showThree:null,
        isShowOpenIcon:null,
        isShowCloseIcon:null,
        isShowThree:null,
        sliderLength:null,
        curIndex:1,
        appointmentName:null,
        appointmentNum:null,
        appointmentAlert:false,
        appointmentImg:false,
        appointmentWords:false,
        diffPhone:null,
        looktime:null,
        visit:null,
        appointmentUser:false,
        showappointmentTimer:false,
        showappointmentVistor:false,
        ShowAppointmentedCover:false,
        appointmentDate:null,
        appointmentWeek:null,
        firstYuyue:null,
        isCollection:false,
        collectionId:'',
//        是否预约变量开关
        appointmentDiff:null,

        hideImgName:null,
        hideImgNumber:null,


//        添加预约与已预约切换变量
        showMessage:null,
//      日历功能添加的数据开始
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        showCoverphone:false,
        newDate:"",
        dayCount:'',
        showCalweek:true,
        yuyuephone:null,
//        修改与提交预约信息切换变量
        xiuOrTi:null,
//      日历功能添加的数据结束
        //滑动选择人数开始
        popupVisible2: false,
        popupConList: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人以上'],
        startPageY: 0,
        endPageY: 0,
        popupSelect: '1人',
        //滑动选择人数结束
        telePhoneAlert:null,
        clearNameImg:false,
        clearNumberImg:false,
//        收藏与取消收藏相
        collectionAlert:false,
        collectionImg:false,
        collectionWords:false
      }
    },
    created(){
      window._bd_share_main && window._bd_share_main.init()
//      日历初始化

    },
    mounted () {

      window._bd_share_main && window._bd_share_main.init()
      //init plugin first 
      this.scrollSelect()
      this.initData()

      this.checkIsCollection()
      this.getuserMsg()
      this.getDate()
      this.getCommityDate()
      this.getNow()
//      this.getlocalData()
      this.getSignature()
      this.initWeChatShare()
//      this.diffNum()
//      this.appointmentcount()
      
      


    },
    methods: {
      //判断是否收藏过
      checkIsCollection(){
        this.loginCode = window.localStorage.getItem('loginCode')
        // Vue.http.interceptors.push((request, next)  =>{
        //   request.headers.set('loginCode', this.loginCode);
        //   next((response) => {
        //     return response
        //   });
        // });
        let url = HOST_HDBMESSAGE + '/collection/userCollectionExist'
        let userId = window.localStorage.getItem('userId')
        let externalId = window.localStorage.getItem('zhanTingId')
        this.$resource( url ).get({ userId: userId, collectionType: 2, externalId: externalId }).then((response) => {
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

      //收藏商品
      addCollection() {
        let url = HOST_HDBMESSAGE + '/collection/addUserCollection'
        let userId = window.localStorage.getItem('userId')
        let externalId = window.localStorage.getItem('zhanTingId')
        this.loginCode = window.localStorage.getItem('loginCode')
        if( this.loginCode != null ){
          Vue.http.interceptors.push((request, next)  =>{
            request.headers.set('loginCode', this.loginCode);
            next((response) => {
              return response
            });
          });
        }
        if (externalId && userId){

          this.$resource( url ).get({ userId: userId, collectionType: 2, externalId:externalId }).then((response) => {
            if( response.body.code == '0000' ){
              let _this=this
              _this.isCollection = true
              _this.collectionId = response.body.respBody
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
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=066"
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
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=066"
        }

      },
      //取消收藏
      deleteCollection(){
        this.loginCode = window.localStorage.getItem('loginCode')
        Vue.http.interceptors.push((request, next)  =>{
          request.headers.set('loginCode', this.loginCode);
          next((response) => {
            return response
          });
        });
        let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
        this.$resource( url ).get({ id: this.collectionId }).then((response) => {
          if( response.body.code == '0000' ){
              let _this=this
            _this.isCollection = false
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
                  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?exhibition_details=001";
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
      wangchen:function(){
        this.popupVisible2=false
        this.visit=document.getElementById('popupSelect').innerText
      },
      scrollSelect() {
        

          // this.$nextTick(()=>{
            
            let popupCon = this.$refs.popupCon;
            popupCon.addEventListener('touchstart', function(event) {
              let e = event || window.event;
              e.preventDefault();
              event.preventDefault()
              this.startPageY = e.targetTouches[0].pageY;
              this.popupConList = ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人以上'];
              popupCon.addEventListener('touchmove', function(e) {
                this.endPageY = e.targetTouches[0].pageY;
              })
            });
            
        popupCon.addEventListener('touchend', function(event) {
          const fontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize);
          let e = event || window.event;
          // e.preventDefault();
          let popupConUl = document.getElementById('popupConUl').style.transform;
          let translateYValue = Number(popupConUl.split('(')[1].split('rem)')[0]);
       
          if(this.startPageY - this.endPageY >= 3) {
            translateYValue -= (this.startPageY - this.endPageY) / fontSize;
            //document.body.scrollTop=88
          }
          if(this.endPageY - this.startPageY >= 3) {
           //document.body.scrollTop=1278
            translateYValue += (this.endPageY - this.startPageY) / fontSize;
          }
          if(translateYValue>=9){
            translateYValue = 9
          }else if(translateYValue < -30.6){
            translateYValue = -30.6
          }
          let popupSelectIndex = Math.floor( (Math.abs(translateYValue - 9)) / 4.4 );
          
          let newY = 9-popupSelectIndex*4.4

          
          document.getElementById('popupConUl').style.transform = 'translateY(' + newY + 'rem)';
          
          setTimeout(() => {
            document.getElementById('popupSelect').innerText = document.getElementById('popupConUl').childNodes[popupSelectIndex].innerText;
        },500);


        })
          // })

      },

//      日历添加的相关方法开始
      initData: function(cur) {

        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        if (date.getMonth()+1<10){
          let newmonth=date.getMonth()+1;
          let aa='0'+newmonth;
          this.currentMonth=aa.replace(/-/g,"/")


        }else{
          let aa=date.getMonth() + 1+'';
          this.wclInput=aa;
          this.currentMonth =aa.replace(/-/g,"/");
        }
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          this.days.push(d);
        }
        for (var i = 1; i <= 35 - this.currentWeek; i++) {
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
        this.wclmonth=this.currentYear+'/'+this.currentMonth;
        this.datemonth=this.currentYear+'-'+this.currentMonth;
        let month=this.currentYear+'/'+this.currentMonth;
        this.month=this.currentYear+'-'+this.currentMonth;
      },
      pick: function(date,event) {
        this.$nextTick(()=>{
          let child1=this.$refs.span1
          let child2=this.$refs.span2
          for(let i=0;i<child2.length;i++){
            child2[i].children[0].className=''
          }
          let evt = event || window.event;
          let target = evt.target || evt.srcElement;
          if(target.className!='activerili'){
            target.className='activerili'
          }else{
            target.className=''
          }
          this.showCover=true
        })
        this.showCover=false;
      },
      formatDate: function(year,month,day){
        var y = year;
        var m = month;
        if(m<10) m = "0" + m;
        var d = day;
        if(d<10) d = "0" + d;
        return y+"/"+m+"/"+d
      },
      comeIn:function(){
        this.$nextTick(()=>{
          let bot=this.$refs.wcl
          let botvalue=parseInt(bot.style.bottom)
          let timer=setInterval(function(){
            botvalue=botvalue+0.5
            bot.style.bottom=botvalue+'rem'
            if (botvalue>-0.1){
              clearInterval(timer)
              return
            }
          },1)
        })
        this.showCover=true
      },
      comeOut:function(){
        this.$nextTick(()=>{
          let _this=this
          let bot=_this.$refs.wcl
          this.dayCount=bot.getElementsByClassName('activerili')[0].innerHTML
          let botvalue=parseInt(bot.style.bottom)
          let timer=setInterval(function(){
            botvalue=botvalue-0.5;
            bot.style.bottom=botvalue+'rem'
            if (botvalue<-36){
              _this.showCover=false
              clearInterval(timer)
              return
            }
          },2)
          //月份++
          
          let v1=_this.wclmonth,v2=_this.datemonth;

          if(this.currentDay > _this.dayCount){
              if(this.currentMonth[0] === '0'){
                v1=this.currentYear+'/0'+ (Number(this.currentMonth[1])+1);
                v2=this.currentYear+'-0'+(Number(this.currentMonth[1])+1);
              }else{
                v1=this.currentYear+'/1'+ (Number(this.currentMonth[1])+1);
                v2=this.currentYear+'-1'+(Number(this.currentMonth[1])+1);
              }
              
          }
          if(parseInt(_this.dayCount)<10){
//       this.newDate传给后台数据
            _this.newDate=v1+'/'+'0'+_this.dayCount
            _this.looktime=v2+'-'+'0'+_this.dayCount
          }else{
            _this.newDate=v1+'/'+_this.dayCount
            _this.looktime=v2+'-'+_this.dayCount
          }
          window.localStorage.setItem('newDate',_this.newDate)


        })
      },

//      日历添加的相关方法结束


      hideAlert:function(show){
        let _this=this
        if(_this[show]){
          setTimeout(function(){
            _this[show]=false;
          },3000)
        }
      },
      judgeDay:function(day){
        return (day.getMonth()+1 < this.currentMonth)||(day.getMonth()+1 == this.currentMonth && day.getDate() < this.currentDay)
      },
//      点击我知道了
      clickKnow:function(){
        this.ShowAppointmentedCover=false
      },
//        滚动出预约页面
      clickAppointment:function(){
        if(!window.localStorage.getItem('userId')){
          this.$router.push({
            path:'login' , 
            query: { 
              id: this.$route.query.id,
              loginBack:'066' 
            }
          })
        }
        this.$nextTick(()=>{
          let appointmentBox=document.getElementsByClassName('appointment-box3')[0]
          let appointmentBootom=appointmentBox.style.bottom
          let appointmentBtn=parseInt(appointmentBootom)
          this.ShowAppointmentedCover=false;
          let timer=setInterval(function(){
            appointmentBtn=appointmentBtn+10
            appointmentBox.style.bottom=appointmentBtn+'%'
            if (appointmentBtn>-1){
              clearInterval(timer)
              return
            }
          },2)
        })
      },
//      点击已预约
      clickAppointmented:function(){
        this.xiuOrTi=true
        this.ShowAppointmentedCover=true;
        this.yuyuephone=window.localStorage.getItem('yuyuephone')
      },
//      影藏预约页面
      goHidden:function(click){
        if(click && this.showMessage){
          this.appointmentName =''
          this.appointmentNum=''
          this.looktime=''
          this.visit=''
        }


        this.$nextTick(()=>{
          let appointmentBox=document.getElementsByClassName('appointment-box3')[0]
          let appointmentBootom=appointmentBox.style.bottom
          let appointmentBtn=parseInt(appointmentBootom)
          let timer=setInterval(function(){
            if (appointmentBtn<=-100){
              clearInterval(timer)
              return
            }
            appointmentBtn=appointmentBtn-10
            appointmentBox.style.bottom=appointmentBtn+'%'
          },2)

        })
      },
      handleChange:function(index){
        this.curIndex=index+1
      },
      showOpenWords:function () {
        this.isShowOpenIcon=false;
        this.isShowCloseIcon=true;
        this.isShowThree=false;
      },
      showCloseWords:function(){
        this.isShowOpenIcon=true;
        this.isShowCloseIcon=false;
        this.isShowThree=true;
      },



      //使用微信右上角分享功能，初始化微信的分享
      initWeChatShare(){
        var _this = this
        _this.getSignature()
        wx.ready(function(){
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          })

          //分享到微信朋友圈
          wx.onMenuShareTimeline({
            title: _this.shareDetailName+'-网库优选',
            link: window.location.href,
            imgUrl: _this.shareUrl,
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          //分享到微信好友
          wx.onMenuShareAppMessage({
            title: _this.keywords+'-网库优选',
            link: window.location.href,
            imgUrl: _this.pics[0],
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          //分享到QQ
          wx.onMenuShareQQ({
            title: _this.shareDetailName+'-网库优选',
            link: window.location.href,
            imgUrl: _this.pics[0],
            success: function () {
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
//              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

      //点击分享
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
          "common":{
            "bdSnsKey":{},
            "bdText":"内容",
            "bdMini":"1",
            "bdMiniList":false,
            "bdPic":"",
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
        let _this=this
        _this.showWeChatShareTitle = true
        wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })

        //分享到微信朋友圈
        wx.onMenuShareTimeline({
          link: window.location.href,
          success: function () {
            // 用户确认分享后执行的回调函数
            _this.showWeChatShareTitle = false
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享到微信好友
        wx.onMenuShareAppMessage({
          link: window.location.href,
          success: function () {
            // 用户确认分享后执行的回调函数
            _this.showWeChatShareTitle = false
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享到QQ
        wx.onMenuShareQQ({
          link: window.location.href,
          success: function () {
            // 用户确认分享后执行的回调函数
            _this.showWeChatShareTitle = false
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

//        获取当前系统时间
      getNow:function(){
        let date=new Date()
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate()
        if (month<10){
          month='0'+month;
        }
        if (day<10){
          day='0'+day
        }
        this.newriqi=year+'-'+month+'-'+day
        this.datetime=this.newriqi.replace(/\-/g, "\/")

      },
      setDate:function(){
//        this.showCoverDate=true;
        this.isShowDateBox=true;
        this.showzhantingbox=false
        this.showCover=false
      },
      chooseYear:function(index){
        this.year=this.dateData[index].a
        this.monthData=this.dateData[index].b
        this.isShowYear=false
        this.isShowMonth=true

      },
      choosemonth:function(index){
        this.month=this.monthData[index].c
        this.dayData=this.monthData[index].d
        this.isShowMonth=false
        this.isShowDay=true

      },
      chooseDay:function(index){
        this.day=this.dayData[index].e
        if (this.year&&this.month&&this.day){
          this.newriqi=this.year.replace(/年/,'')+'-'+this.month.replace(/月/,'')+'-'+this.day.replace(/日/,'')
          this.yuyueTime=this.newriqi.replace(/\-/g, "\/")
          this.isShowDateBox=false
          this.isShowDay=false
          this.isShowYear=true
          this.showzhantingbox=true
          this.showCover=true
          let d1 = new Date(this.datetime);
          let d2 = new Date(this.yuyueTime);
          if (d1>d2){
            alert('请选择今天以后的日期！')
            this.newriqi= this.datetime.replace(/\//g, "\-")
          }
        }

      },

      getlocalData:function (){
        this.localDate=window.localStorage.getItem('ZTdata')
      },
      getuserMsg:function(){

        this.userPhone=window.localStorage.getItem('mobile')
      },
//        绑定电话号码
      setPhone:function(){
        this.$nextTick(()=>{
          let phone=this.$refs.phone
          let phone2=this.$refs.phone2
          if (phone){
            let phoneval=phone.innerHTML
            phone.href='tel:'+phoneval
          }
          if (phone2){
            let phoneval2=phone2.innerHTML
            phone2.href='tel:'+phoneval2
          }
        })
      },
//        获取后台数据1
      getDate:function(){
        let id = this.$route.query.id || window.localStorage.getItem('zhanTingId')
        let userId = window.localStorage.getItem('userId')
        let lng=window.localStorage.getItem('longitude')
        let lat=window.localStorage.getItem('latitude')
        let url=window.HOST_HDBITION+'/hdpExhibition/getHdpExhibitionInfoByExhibitionId'
        this.$resource(url).get({'longitude':lng,'latitude':lat,'exhibitionId':id,'userId':userId}).then((response) => {
          if (response.body.code==200){
            this.getdate=response.body.respBody[0]
            this.appointmentDiff=this.getdate.hdpExhibitionAppointment
            if (this.appointmentDiff!=null){

              let month=null;
              let day=null
              this.appointmentId = this.appointmentDiff.id
              if (new Date(this.appointmentDiff.appointmentTime).getMonth() + 1<10){
                month='0'+(new Date(this.appointmentDiff.appointmentTime).getMonth() + 1)
              }else{
                month=new Date(this.appointmentDiff.appointmentTime).getMonth() + 1
              }
              if ( new Date(this.appointmentDiff.appointmentTime).getDate()<10){
                day="0"+new Date(this.appointmentDiff.appointmentTime).getDate()
              }else{
                day=new Date(this.appointmentDiff.appointmentTime).getDate()
              }
              this.appointmentDiff.appointmentTime=new Date(this.appointmentDiff.appointmentTime) .getFullYear() + "-" + month + "-" +  day;

              let xingqi=new Date(this.appointmentDiff.appointmentTime).getDay()
              if(xingqi==0){
                this.appointmentWeek='周日'
              }
              if(xingqi==1){
                this.appointmentWeek='周一'
              }
              if(xingqi==2){
                this.appointmentWeek='周二'
              }
              if(xingqi==3){
                this.appointmentWeek='周三'
              }
              if(xingqi==4){
                this.appointmentWeek='周四'
              }
              if(xingqi==5){
                this.appointmentWeek='周五'
              }
              if(xingqi==6){
                this.appointmentWeek='周六'
              }
              this.appointmentDate=this.appointmentDiff.appointmentTime
              this.showMessage=false;
              this.looktime= this.appointmentDate
              this.appointmentName=this.appointmentDiff.appointmentName
              this.visit=this.appointmentDiff.appointmentCount
              this.appointmentNum=this.appointmentDiff.telephone
            }else{
              this.showMessage=true;
            }

            if(this.getdate.introduce && this.getdate.introduce.length>54){
              this.isShowOpenIcon=true
              this.isShowCloseIcon=false
              this.showThree=this.getdate.introduce.substring(0,54)
              this.isShowThree=true
            }
            this.keywords=this.getdate.name
            this.shareUrl=this.getdate.exhibitionImgUrl
            if (this.getdate.commodityCount==null){
              this.getdate.commodityCount=0
            }
            if (this.getdate.workshopImgUrl!=null){

              this.exhibitionInfo = this.getdate.workshopImgUrl.split(',');
              this.sliderLength=this.exhibitionInfo.length
            }

          }
        })



      },
       
////      陈列商品数据
      getCommityDate:function(){
//        let id=this.fenxiangId
        let id=null
        if (this.$route.query.id){
          id=this.$route.query.id
        }
        else{
          id=window.localStorage.getItem('zhanTingId')

        }
        let url=window.HOST_HDBITION+'/commodityInfo/getCommodityInfoListByExhibitionId'
        this.$resource(url).get({'exhibitionId':id}).then((response) => {
          if (response.body.code==200){
            this.getCommity=response.body.respBody


          }
        })

      },

      toShoping:function(index){
        let id=this.getCommity[index].id
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+id+'&exhibition_details=1';
      },
      toLookindex:function(){
        if (this.$route.query.to){
          window.history.go(-1)
        }else if(this.$route.query.collection){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'collection_exhibition';
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
        }
        

      },
      closeyuyue:function(){
        this.showCover2=false;
        this.showzhantingbox=false;
        this.showCover=false
      },
      borderColor:function(event){
        this.$nextTick(()=>{
          let putongbox=this.$refs.putong_box;
          let bordercolor=putongbox.getElementsByTagName('div')
          let evt = event || window.event;
          let target = evt.target || evt.srcElement;
          if(target.className!='rili'&&bordercolor.length){
            for(let i=0;i<bordercolor.length;i++){
              bordercolor[i].className='';
            }
            target.className = 'activerili'
          }else{
            target.className= ''
          }
        })
      },
      clickyuyue:function(){
        let url = HOST_HDPUSER+'/user/isLogin';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
        if(this.loginCode != "" && this.loginCode != null){
          this.showCover2=true;
          this.showzhantingbox=true;
        }
        else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=110"
        }



      },
//        提交预约信息1.3
      appointmentSure:function(){

        let _this = this;
        let isError;
        //        申明一个变量作为控制手机号码后面的弹框开关
        _this.isShowPhoneAfter=null

        if(_this.appointmentName==null){
          _this.appointmentUser=true
          _this.hideAlert('appointmentUser')
        }
        if (_this.appointmentName!=null){
          let reg = /^1[3|4|5|7|8][0-9]{9}$/;
          //this.$nextTick(()=>{
            if(!reg.test(_this.appointmentNum)){
              _this.appointmentAlert=true;
              _this.appointmentImg=true;
              _this.appointmentWords=true;
              _this.hideAlert('appointmentAlert')
            //              _this.isShowAfter=false

              _this.showappointmentTimer=false
                if (_this.appointmentNum==''||_this.appointmentNum==null){
                  _this.telePhoneAlert='请填写手机号码'
                }else{
                  _this.telePhoneAlert='手机号码不符合规范'
                }
                isError = true

            }
          //})
        }
        if(isError) return false;
        if (_this.appointmentName!=null&& _this.isShowAfter!=false&&_this.looktime==null){
          _this.showappointmentTimer=true
          _this.hideAlert('showappointmentTimer')
        } if(_this.appointmentName!=null&& _this.isShowAfter!=false&&_this.looktime!=null&&_this.visit==null){
          _this.showappointmentVistor=true
          _this.hideAlert('showappointmentVistor')
        }
        if (_this.appointmentName!=null&& _this.isShowAfter!=false&&_this.looktime!=null&&_this.visit!=null){
          _this.appointmentAlert=true;
          _this.appointmentImg=false;
          _this.appointmentWords=false;
          _this.hideAlert('appointmentAlert')
          _this.goHidden()
          let url= window.HOST_HDBITION+ (!this.showMessage?'/hdpExhibitionAppointment/updateHdpExhibitionAppointment':'/hdpExhibitionAppointment')
          let yuyuename=this.$refs.yuyuename.value

          let yuyuePhone=this.$refs.yuyuePhone.value
          let userId=window.localStorage.getItem('userId')
          let userName=window.localStorage.getItem('userName')
          let exhname=this.getdate.name
          let id=null

          if (this.$route.query.id){
            id=this.$route.query.id
          }
          else{
            id=window.localStorage.getItem('zhanTingId')

          }
          let curTime = new Date();
          let insertTime = curTime.getFullYear()+ '-'+(curTime.getMonth()+1)+'-'+curTime.getDate()
          let body={
            appointmentCount:parseInt(_this.visit),
            appointmentName:_this.appointmentName,
            appointmentTime:_this.looktime,
            telephone:_this.appointmentNum,
            customerId:userId,
            customerName: userName ,
            exhibitionId:id ,
            exhibitionName:exhname,
            exhibitionNumber:id,
            id:this.appointmentId,
            insertTime:insertTime,
            state:0
          }

          if(_this.xiuOrTi==null){
            /* _this.$resource(url).save({},body).then((response) => {
              if (response.body.code==200){
                window.localStorage.setItem('yuyuephone',this.appointmentNum)
                _this.Appointment=response.body.respBody
                _this.goHidden('clear')
                _this.getDate()
              }
            }) */
            _this.$api_post({
              url:url,
              data:body
            }).then( response =>{
              if (response.code==200){
                window.localStorage.setItem('yuyuephone',this.appointmentNum)
                _this.Appointment=response.respBody
                _this.goHidden('clear')
                _this.getDate()
              }
            })
          }else{
            /* _this.$resource(url).save({},body).then((response) => {
              if (response.body.code==200){
                window.localStorage.setItem('yuyuephone',this.appointmentNum)
                _this.Appointment=response.body.respBody
                _this.goHidden('clear')
                _this.getDate()
              }
            }) */
            _this.$api_post({
              url:url,
              data:body
            }).then( response =>{
              if (response.code==200){
                window.localStorage.setItem('yuyuephone',this.appointmentNum)
                _this.Appointment=response.respBody
                _this.goHidden('clear')
                _this.getDate()
              }
            })
          }




        }
      },

      clickphone:function(){
        this.showCoverphone=true
        this.$nextTick(()=>{
          let phone=this.$refs.phone
          let phone2=this.$refs.phone2
          if (phone&&phone2){
            let pnum=this.$refs.pnum;
            let pnumvalue=parseFloat(pnum.style.bottom);
            let timer=setInterval(function(){
              pnumvalue=pnumvalue+0.1
              pnum.style.bottom= pnumvalue+'rem'
              if (pnumvalue>-1){
                clearInterval(timer)
                return
              }
            },2)
          }
          if (phone||phone2){
            let pnum=this.$refs.pnum;
            let pnumvalue=parseFloat(pnum.style.bottom);
            let timer=setInterval(function(){
              pnumvalue=pnumvalue+0.1
              pnum.style.bottom= pnumvalue+'rem'
              if (pnumvalue>-5.4){
                clearInterval(timer)
                return
              }
            },2)
          }
          if (!phone&&!phone2){
            this.showphonenum=false
            this.showCoverphone=false
            alert('此展厅暂无联系电话！')

          }
          this.setPhone()
        })
      },
      closehnum:function(){
        this.$nextTick(()=>{
          let pnum=this.$refs.pnum;
          let pnumvalue=parseFloat(pnum.style.bottom);
          let timer=setInterval(function(){
            pnumvalue=pnumvalue-0.5
            pnum.style.bottom= pnumvalue+'rem'
            if (pnumvalue<-14){
              clearInterval(timer)
              return
            }
          },10)
        })
        this.showCoverphone=false;
      },
//      预约表单获得焦点事件
      appointmentFocus:function(a){
          if (a =='num'&&this.appointmentNum!=null&&this.appointmentNum!=''){
            this.clearNumberImg=true
            this.hideImgNumber=1
          }
          if (a =='name'&&this.appointmentName!=null&&this.appointmentName!=''){
            this.clearNameImg=true
            this.hideImgName=1
          }
      },
//      点击icon清除相关预约信息
      clearModel:function(a){
          if (a=='appointmentNum'){
            this.appointmentNum=''
            this.clearNumberImg=false
          }else{
            this.appointmentName=''
            this.clearNameImg=false
          }
      },
//      点击最外层的div，隐藏清楚预约信息的icon
      hideImg:function(){
        this.clearNumberImg=false
        this.clearNameImg=false
          if (this.hideImgName==1&&this.appointmentName){
            this.clearNameImg=true
          }
         if ( this.hideImgNumber==1&&this.appointmentNum){
            this.clearNumberImg=true
          }
        this.hideImgNumber=null
        this.hideImgName=null
      }

    },
    watch:{
      appointmentName:function(newValue, oldValue){
          if (newValue!=null&&newValue!=''){
              this.clearNameImg=true
          }else{
            this.clearNameImg=false
          }
      },
      appointmentNum:function(newValue, oldValue){
        if (newValue!=null&&newValue!=''){
          this.clearNumberImg=true
        }else{
          this.clearNumberImg=false
        }
      }
    }
  }
</script>




<style rel="stylesheet/scss" lang="scss" scoped>
  @mixin text-overflow($fontSize:1.5rem,$lineHeight:1.5rem){
    font-size:$fontSize;
    width:calc(100% - 3rem);
    margin-left:1.5rem;
    color:#666666;
    margin-top:1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: $lineHeight;
  }
  .exhibition-details{
    width:100%;
    height:100%;
    background:#f4f4f4;
  }
  /*头部样式开始*/
  .header-box{
    width:100%;
    height:4.4rem;
    position:fixed;
    top:0;
    left:0;
    z-index:1;
    background:#fff;
  }
  .header-box-other{
    width:100%;
    height:4.4rem;
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
    /*z-index:1;*/
    background:#fff;
  }
  .header-left{
    width:4.4rem;
    height:4.4rem;
    /*position:relative;*/
  }
  .header-right{
    width:4.4rem;
    height:4.4rem;
    position:absolute;
    top:0;
    right:0;
  }
  .header-right{
    width:2.2rem;
    height:1.6rem;
    position:absolute;
    right:16px;
    top:1.32rem;
  }

  .header-left img{
    width:1.05rem;
    height:1.9rem;
    position:absolute;
    top:1.25rem;
    left:16px;
  }
  .header-title {
    width: calc(100% - 8.8rem);
    font-size: 1.8rem;
    line-height: 4.4rem;
    color: #333;
    text-align: center;
    position: absolute;
    top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 4.4rem;
  }
  .header-title-other{
    width:19rem;
    left:calc(50% - 9.5rem);
  }
  /*头部样式结束*/
  .f-carousel{
    height: 21.1rem;
    margin-top:4.4rem;
    overflow: hidden;
  }
  .f-carousel img{
    display: inline-block;
    height: 100%;
    width:100%;

  }

  .cur-details-title{
    width:100%;
    text-align: left;
    color:#333;
    font-size:1.5rem;
    font-weight:600;
    margin-top: 1.4rem;
    margin-bottom: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height:1.5rem;
  }
  .cur-details-twoline {
    width: 100%;
    height: 1.2rem;
    margin-bottom: 1.5rem;
  }
  .cur-details-threeline{
    width:100%;
    height:1.2rem;
  }
  .cur-details-twoline div,.cur-details-threeline div{
    font-size:1.2rem;
    color:#5c5c5c;
    height:1.3rem;
    line-height: 1.3rem;
  }
  .cur-details-twoline div span,.cur-details-threeline div span {
    display: inline-block;
    margin-left: 0.85rem;
  }



  .jieshao div{
    width:96%;
    margin-left:2%;
    text-align: left;
  }

  .jieshao_words{
    font-size:1.2rem;
    color:#5c5c5c;
    line-height:2rem;
  }
  .goods_table{
    width:100%;
    background:#ffffff;
    margin-top:1rem;

  }
  .goods_title{
    width:100%;
    height:2.9rem;
    text-align: center;
    line-height:2.9rem;
    color:#333333;
    font-size:1.4rem;
    border-bottom:1px solid #d6d6d6;
  }
  .goods_body{
    width:96%;
    margin-left:2%;
    background:#fff;
    border-bottom: 1px solid #d6d6d6;
    margin-top:1rem;
    padding-bottom: 1rem;
  }
  .goods_body:nth-last-child(1) {
    border-bottom: 0;
  }
  .goodsbg,.goods_words{
    display:inline-block;
  }
  .goodsbg{
    float: left;
    width:10rem;
    height:10rem;
  }
  .goods_words{
    width:calc(100% - 11rem);
    margin-left:1rem;
    height:10rem;
    box-sizing: border-box;
  }
  .goods_name{
    text-align: left;
    width:100%;
    font-size:1.4rem;
    font-weight:600;
    color:#333;
    margin-top:0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height:1.4rem;
  }
  .goods_jianjie{
    width:100%;
    text-align: left;
    color:#adadad;
    font-size:1rem;
    margin-top:0.7rem;
    line-height:1rem;
    height:1rem;
    margin-bottom: 1.57rem;
  }
  .goods_price{
    width:100%;
    text-align: left;
    font-size:1.1rem;
  }
  .goods_btn{
    width:100%;
    margin-top:1rem;
  }


  .goods_btn  div{
    width:11rem;
    height:2.2rem;
    float: left;
    text-align: center;
    line-height: 2.1rem;
    font-size:1.2rem;
  }
  .words_right_input{
    display: inline-block;
    height:100%;
    font-size:1.4rem;
    color:#333333;
    text-align: left;
    float:left;
    margin-left:0.8rem;
  }
  .user_logo{
    width:4.4rem;
    height:4.4rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-top:1rem;
    float:left;
  }
  .user_name{
    display: inline-block;
    font-size:1.4rem;
    color:#333;
    font-weight: 600;
    line-height: 6.35rem;
    margin-left: 1rem;
  }
  .no_more{
    width:100%;
    height:3.6rem;
    line-height: 3.6rem;
    background:#f4f4f4;
    font-size:1.2rem;
    color: #d8d8d8;
    letter-spacing: 2px;
    margin-top:1rem;
  }
  .phone_cover{
    width:100%;
    height:100%;
    background:#333;
    opacity: 0.4;
    position:fixed;
    top:0;
    left:0;
    overflow: hidden;
    z-index: 2;
  }
  .phonenum_box{
    width:100%;
    height:14.1rem;
    position:fixed;
    z-index: 1010;
    overflow: auto;
  }
  .phonenum_box a{
    display: inline-block;
    width:100%;
    height: 4.4rem;
    line-height:4.4rem;
    color:#ff5200;
    text-align: center;
    font-size: 1.6rem;
    letter-spacing: 1px;
    border-bottom: 1px solid #d6d6d6;
    background:#ffffff;
  }
  .no_sure{
    width: 100%;
    height:4.4rem;
    background:#ffffff;
    font-size: 1.8rem;
    line-height: 4.4rem;
    color:#333;
    text-align: center;
  }
  .zhanting_box{
    width:31rem;
    height:34.5rem;
    position:absolute;
    top:calc(50% - 11.5rem);
    left:calc(50% - 15.5rem);
    background:#fff;
    z-index:3 ;
    border-radius: 5px;
    float:left;
    font-size: 1.6rem;
  }

  .ztb_title{
    width:100%;
    height:4.4rem;
    border-bottom:1px solid #d6d6d6;
    text-align: center;
    line-height: 4.4rem;
    color:#333333;
    font-size:1.6rem;
    font-weight:600
  }
  .ztb_words{
    width:94%;
    margin-left:3%;
    height:4.4rem;
    border-bottom:1px solid #d6d6d6;
    font-size:1.4rem;
    line-height: 4.4rem;
  }
  .ztb_words div{
    float: left;
    text-align: left;

  }
  .words_left{
    width:6.5rem;
    color:#9e9e9e;
    position: relative;
  }
  .words_right{
    color:#333333;
    margin-left:0.5rem;
  }
  .words_input{
    float: left;
    text-align: left;
    color:#333333;
    margin-left:1rem;
    font-size:1.4rem;
    height:4.4rem;

  }
  .renshu{
    width:94%;
    margin-left:3%;
    margin-top:1.5rem;
    font-size:1.4rem;
  }
  .renshu_left{
    float: left;
    width:6.5rem;
    color:#9e9e9e;
    text-align: left;
    font-size:1.4rem;
  }
  .renshu_right{
    float: left;
    width:calc(100% - 7.5rem);
    margin-left:1rem;
  }
  /*.renshu_right .active{*/
  /*border:1px solid #f9be00;*/
  /*color: #f9be00;*/
  /*}*/
  .renshu_right div{
    border:1px solid #333;
    float: left;
    width:3.3rem;
    height:2.0rem;
    margin-right:1rem;
    line-height: 2.0rem;
    margin-bottom:1.5rem;
    border-radius: 6%;
  }
  .btn_box{
    width:94%;
    margin-left:3%;
    margin-top:1.9rem;
    height:3rem;
  }
  .btn_box div{
    float: left;
    font-size: 1.6rem;
    width:13.1rem;
    height:3rem;
    line-height: 3rem;
    text-align: center;
    border-radius: 3px;
    letter-spacing: 2px;
  }
  .btn_no{
    border:1px solid #333;
    margin-right:0.5rem;
  }
  .btn_ok{
    background:#f9be00;
    color:#fff;
    border:1px solid #f9be00;
    margin-left:0.2rem;
  }
  .zujian{
    font-size: 1.6rem
  }
  /*选择日期样式开始*/
  .date_box{
    width:90%;
    height:26rem;
    position:fixed;
    left:5%;
    top:calc(50% - 10rem);
    z-index: 100;
    background:#fff;
    border-radius: 0.3rem;
    overflow: auto;
  }
  .date_title{
    width:89.9%;
    height:3.6rem;
    line-height: 3.6rem;
    color:#333333;
    font-size:1.4rem;
    text-align:left;
    padding-left:0.8rem;
    border-bottom:1px solid #858585;
    position:fixed;
    top:calc(50% - 10rem);
    left:5%;
    background:#ffffff;


  }
  .date_year_box{
    width:100%;
  }
  .date_year{
    width:100%;
    height:3rem;
    line-height:3rem;
    font-size:1.2rem;
    color:#858585;
    border-bottom:1px solid #858585;
    text-align: left;
    padding-left:0.8rem;
  }

  /*选择日期样式结束*/

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

<style>
  .mt_panel h3{
    display:none;
  }
  .mt_body ul .mt_note {
    font-size:1.2rem;
  }
  .mt_ok, .mt_cancel, .mt_setnow{
    display: inline-block;
    float: left;
    vertical-align: top;
    width: 6rem;
    height: 3rem;
    line-height: 3rem;
    box-sizing: border-box;
    font-size: 1.4rem;
    border: 1px solid #f9be00;
    color:#f9be00;
    margin-left:5rem;
    margin-right:5rem;
  }
  .mt_body ul li{
    height: 3rem;
    line-height: 3rem;
    color: #333;
    font-size: 1.2rem;

  }
  .mt_body li.selected{
    color:#f9be00;
  }

  /*滑动选择日期样式开始*/
  #dateshadow{
    position:fixed;
    z-index: 1000;
    opacity: 0.4;
  }
  #datePage{
    position:fixed;
    height:12rem;
    width:100%;
    font-size:1.3rem;
    top:calc(100% - 12rem)

  }
  .page{
    top:  0
  }
  #yearwrapper ul li,#monthwrapper ul li,#daywrapper ul li{
    font-size:1.2rem;
  }
  #setcancle ul li{
    height:2.6rem;
    line-height: 2.6rem;
    font-size:1.4rem;
    letter-spacing: 2px;

  }
  #datetitle{
    background:#f9be00;
  }
  #dateconfirm{
    background:#f9be00;
  }
  /*滑动选择日期样式结束*/


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

  /*1.3添加的样式开始*/
  .exhibition-words{
    width:100%;
    background:#fff;
    border-top:1px solid transparent;

  }
  .exhibition-name{
    width:28rem;
    font-size:1.5rem;
    color:#333333;
    text-align: left;
    padding-left:0.8rem;
    margin-top:2.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top:0.2rem;
    padding-bottom:0.2rem;
    line-height: 1.5rem;
  }
  .appointment-btn{
    width:4.5rem;
    height:2.9rem;
    background:#f9be00;
    font-size:1.3rem;
    color:#ffffff;
    text-align: center;
    line-height:2.9rem;
    border-radius: 0.5rem;
    letter-spacing: 1px;
    position:absolute;
    top:22.6rem;
    right:0.8rem;
  }
  .appointment-btned{
    width:4.5rem;
    height:2.9rem;
    font-size:1.3rem;
    color:#adadad;
    text-align: center;
    line-height:2.9rem;
    border-radius: 0.5rem;
    letter-spacing: 1px;
    position:absolute;
    top:22.6rem;
    right:0.8rem;
    border:1px solid #adadad;
  }
  .appointment-item{
    width:100%;
    margin-top:2.8rem;
    display: flex;
    padding-bottom:0.8rem;
    border-bottom:1px solid #d6d6d6;
  }
  .appointment-item  .appointment-item-middle {
    flex:2;
  }
  .appointment-item div{
    flex: 1;
    font-size:1.2rem;
    color:#858585;
  }
  .appointment-item-left{
    text-align: left;
    padding-left:0.8rem;
  }
  .appointment-item-middle{
    text-align: center;
  }
  .appointment-item-right{
    text-align: right;
    padding-right:0.8rem ;
  }
  .exhibition-position{
    width:100%;
    height:4.4rem;
    background:#ffffff;
  }
  .exhibition-position div{
    float: left;
  }
  .exhibition-position-logo{
    width:1.3rem;
    height:1.7rem;
    background:url("../../assets/images/location-icon.png") no-repeat;
    background-size: 100%;
    margin-left:0.8rem;
    margin-top:1.4rem;
  }
  .exhibition-position-words{
    font-size:1.3rem;
    color:#333333;
    margin-top:1.6rem;
    margin-left:0.9rem;
  }
  .exhibition-position .call-phone{
    float: right;
    width:5.2rem;
    height:2.5rem;
    border-left:1px solid #d6d6d6;
    margin-top:0.9rem;
  }
  .call-phone img{
    display: inline-block;
    width:1.8rem;
    height:2.4rem;
    margin-top:0.2rem;
  }
  .exhibition-tell{
    width:100%;
    background:#ffffff;
    margin-top:1rem;
    font-size: 1.3rem;
    color:#333333;
    padding:0.9rem 1.2rem;
    text-align: left;
    line-height: 1.8rem;

  }
  .show-open{
    width:100%;
    background:#ffffff;
  }
  .show-open img{
    display: inline-block;
    width:1.2rem;
    height:0.8rem;
    margin-top:0.6rem;
    margin-bottom:1.2rem;

  }

  .goods-details{
    width:100%;
    background:#ffffff;
    border-top:1px solid transparent;
    margin-top:1rem;
    font-size:0;
    text-align: left;

  }
  .goods-box{
    display:inline-block ;
    margin-left:0.8rem;
    margin-top:0.8rem;
    width:17.5rem;
  }
  .goods-img-box{
    width:100%;
    background:#f4f4f4;
    height:20rem;
    border-radius: 0.5rem;
    float: left;
  }
  .goods-img-box img{
    display: inline-block;
    width:14.5rem;
    height:16rem;
    margin-left: 1.5rem;
    margin-top:2rem;
  }
  .goods-name{
    width:100%;
    text-align: center;
    font-size: 1.3rem;
    color:#333333;
    margin-top:1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 2rem;
  }
  .money-box{
    font-size:0;
    margin-top:0.8rem;
    text-align: center;
    color:#bb2e28;
  }
  .money-icon{
    font-size: 1rem;
  }
  .money-num{
    font-size:1.3rem;
  }
  .money-float{
    font-size:1rem;
  }
  .shareAccount{
    width:1.55rem;
    height:1.65rem;
    position:absolute;
    right:1rem;
    bottom:1.3rem;

  }
  .shareAccount img{
    display: inline-block;
    width:100%;
    height:100%;
  }
  .collect{
    width:1.75rem;
    height:1.65rem;
    position: absolute;
    bottom: 1.3rem;
    right:5.05rem;
  }
  .collect img{
    display: inline-block;
    width:100%;
    height:100%;
  }
  .sliderLength{
    width:3.2rem;
    height:1.7rem;
    background:#ffffff;
    position:absolute;
    right:0.8rem;
    bottom:0.8rem;
    font-size:1.2rem;
    text-align: center;
    line-height: 1.7rem;
    border-radius: 0.3rem;

  }
  .appointment-box3{
    width:100%;
    height:100% ;
    position:fixed;
    left:0;
    background:#f4f4f4;
    z-index: 1011;
  }
  .appointment-word-box{
    width:100%;
    background:#ffffff;
    margin-top:1rem;
  }
  .appointment-fill{
    width:100%;
    text-align: left;
    height:5.4rem;
    padding-left:1.8rem;
    font-size:1.4rem;
    color:#333;
    border-bottom:1px solid #d6d6d6;
  }
  .appointment-sub{
    width:100%;
    height:4.4rem;
    background:#f9be00;
    font-size:1.6rem;
    color:#fff;
    letter-spacing: 2px;
    position:absolute;
    bottom:0;
    left:0;
    line-height: 4.4rem;
  }
  .appointment-alert{
    width:20.2rem;
    height:9.5rem;
    background:#000000;
    opacity: 0.5;
    border-radius: 0.5rem;
    position:fixed;
    top:calc(50% - 4.75rem);
    left:calc(50% - 10.1rem);
    z-index: 1001;
  }
  .appointment-img{
    display: inline-block;
    width:3rem;
    height:3rem;
    margin-top:1.4rem;
  }
  .alert-words{
    font-size:1.8rem;
    color:#fffefe;
    margin-top:1.5rem;
  }
  .lookTime{
    width:100%;
    font-size:1.4rem;
    color:#333333;
    overflow: hidden;
    position:relative;
    border-bottom:1px solid #d6d6d6;
  }
  .lookTime img{
    position:absolute;
    right:0.8rem;
    width:0.6rem;
    height:1rem;
    z-index: 1001;
    top:2.2rem;
  }
  .lookTime-words{
    width:7.5rem;
    font-size:1.4rem;
    color:#333333;
    padding-left:1.8rem;
    float:left;
    height:5.4rem;
    line-height: 5.4rem;
    text-align: left;
  }
  .looktime-input{
    display: inline-block;
    width:calc(100% - 7.5rem);
    height:5.4rem;
    font-size:1.4rem;
    color:#222;
    text-align: right;
    padding-right:2.4rem;
  }


  .mint-swipe-indicators{
    display: none;
  }
  .exhibition-tell-other{
  }
  /*1.3添加的样式结束*/

  /*日历相关的样式开始*/
  .weekdays {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: #666;
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    font-size: 1.6rem;
    background:#fff;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-radius: 0 0 3px 3px;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    font-size: 1.6rem;
    color: #333;
    position:relative;
    line-height: 4rem;
  }

  .activerili{
    display: inline-block;
    width:5.05rem;
    height:4.2rem;
    background: #f9be00;
    color: #fff;
    font-size:1.6rem;
    line-height: 3.2rem;
    position: absolute;
    left: 0;
    transition: .3s;
  }
  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }
  .showCalendar{
    width:100%;
    position:fixed;
    left:0;
    z-index:1013;
    border-radius: 3px;
  }
  .calender-sure{
    width:100%;
    height:5rem;
    line-height:5rem;
    font-size: 1.8rem;
    font-weight:500;
    letter-spacing: 1px;
    background:#fff;
    text-align: right;
    padding-right:1.6rem;
    color:#f9be00;
    border-bottom: 1px solid #d6d6d6;
  }
  .over-other-month{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:44px;
    z-index: 100;
  }
  .home-cover{
    position:fixed;
    top:0;
    left:0;
    z-index: 1011;
    width:100%;
    height:100%;
    background:#000;
    opacity: 0.6;
  }
  .title-img{
    position:absolute;
    top:40px;
    left:15px;
  }
  .title-img img{
    display: block;
    width:34px;
    height:27px;
    position:absolute;
    top:9px;
    left:0;
    vertical-align: middle;
  }
  .title-img div{
    font-size:1.5rem;
    color:#333;
    height:44px;
    width:34px;
    position:relative;
    line-height:44px;
  }
  .home-content-topname{
    padding-left:42px;
  }
  .home-body .home-content .creatClass{
    background:#f5f5f5;
    height:29px;
    line-height:29px;
  }



  /*日历相关的样式结束*/

  .gantan{
    width:100%;
    /*margin-top:1rem;*/
    font-size:0;
    color:#858585;
    background:#f4f4f4;
    margin-top:1rem;
  }
  .gantan img{
    display: inline-block;
    width:1.6rem;
    height:1.6rem;
    margin-right:0.25rem;
    vertical-align: top;
  }
  .gantan div{
    font-size: 1.4rem;
    display: inline-block;
    margin-left:0.25rem;
    padding-top:0.15rem ;
    line-height: 1.3rem;
  }
  .appointmented-cover{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:#333;
    opacity: 0.4;
    z-index: 1000;
  }
  .appointmented-box{
    height:44.4rem;
    width:28.8rem;
    position:fixed;
    left:calc(50% - 14.4rem);
    top:calc(50% - 22.2rem);
    background:#fff;
    border-radius: 0.5rem;
    z-index: 1001;
  }
  .appointmented-name,.zhanting-address,.look-title,.look-time{
    line-height: 2rem;
  }
  .appointmented-title{
    width:100%;
    height:5rem;
    border:1px solid #d6d6d6;
    color:#333;
    font-size:1.6rem;
    line-height: 5rem;
    text-align: center;
    border-radius: 0.5rem;
  }
  .appointmented-name-box{
    width:100%;
    height:6.8rem;
    font-size: 0;
    border-top:1px solid transparent;
     border-bottom: 1px solid #d6d6d6;
  }
  .appointmented-name{
    font-size:1.5rem;
    width:calc(100% - 3rem);
    margin-left:1.5rem;
    color:#666666;
    margin-top:1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5rem;
  }
  .zhanting-address{
    font-size:1.2rem;
    width:calc(100% - 3rem);
    margin-left:1.5rem;
    color:#666666;
    margin-top:1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5rem;

  }
  .look-box{
    width:calc(100% - 3rem);
    height:6.8rem;
    margin-left:1.5rem;
    border-bottom:1px solid #d6d6d6;
    font-size:0;

  }
  .look-title{
    font-size:1.5rem;
    color:#333;
    margin-top:1.3rem;
    border-bottom: 1px solid transparent;
    margin-bottom:1.5rem;
  }
  .look-time{
    display: inline-block;
    font-size:1.8rem;
    color:#858585;
    /*margin-top:1.5rem;*/
  }
  .appointment-msg{
    width:100%;
    margin-top:3rem;
    font-size:0;
    border-bottom: 1px solid transparent;
  }
  .appointment-msg div{
    float: left;
  }
  .appointment-msg-left{
    margin-left:2.5rem;
    color:#858585;
    font-size:1.5rem;
  }
  .appointment-msg-right{
    margin-left:8.6rem;
    font-size: 1.5rem;
    color:#333333;
  }
  .konw-btn{
    width:25.8rem;
    height:4.2rem;
    border:1px solid #ff5200;
    border-radius: 0.5rem;
    line-height:4.2rem ;
    font-size:1.7rem;
    color:#ff5200;
    margin-left:calc(50% - 12.9rem);
    margin-top:3rem;
  }
  .bottom-msg{
    font-size:1.4rem;
    color:#858585;
    width:100%;
    text-align: center;
    margin-top:2rem;
  }
  /*滑动选择人数样式开始*/
  .popupHeader{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    color: #f9be00;
    font-size: 1.8rem;
    text-align: right;
    padding-right: .8rem;
    background-color: #fff;
  }
  .popupCon{
    width: 100%;
    height: 22rem;
    color: #858585;
    font-size: 2rem;
    background-color: #f4f4f4;
    overflow: hidden;
    -webkit-overflow-scrolling:touch;
    overflow-scrolling: touch;
  }
  .popupCon ul{
    transition: 1s;
  }
  .popupCon li{
    line-height: 4.4rem;
  }
  #popupSelect{
    width: 100%;
    height: 4.4rem;
    line-height: 3.8rem;
    color: #333;
    background-color: #fff;
    border-top: .05rem solid #D6D6D6;
    border-bottom: .05rem solid #D6D6d6;
    position: fixed;
    top: 14rem;
    z-index: 999;
  }

  /*滑动选择人数样式结束*/
  .appointment-fill-div{
    position:relative;
  }
  .appointment-fill-div img{
    position: absolute;
    width:1.5rem;
    height:1.5rem;
    top:1.95rem;
    right:0.8rem;
  }
</style>
