<template>
  <div class="allType">
    <div class="return_money_apply" v-if="moneyApply==1">
      <div class="header">
        <span class="returnBack" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
        <span class="orderTitle">退款申请</span>
      </div>
      <div class="grayLine"></div>
      <div class="returnReason" @click="shutDownChooseReason">
        <span>申退原因 : </span>
        <div class="returnReasonDiv">
                    <span class="sp1" @click.stop="chooseReturnMoneyReason">
                        <input type="text" v-model="selectReason" readonly>
                        <img src="../../assets/images/topTri.png" alt="" class="img">
                    </span>
          <ul class="returnReasonUL">
            <li v-for="option in options" @click="clickLiChooseReason(option)">
              {{ option.label }}
            </li>
          </ul>
        </div>
      </div>
      <div class="return">
        <span class="returnWord">退款金额 : </span>
        <span class="returnNum">￥{{ refundMoney }}</span>
      </div>
      <div class="returnReasonArea">
        <div class="returnReasonAreaWord">
          退款说明 :
        </div>
        <div class="returnReasonAreaInput">
          <textarea v-model="enterReason" placeholder="货物发错了，我不想要了"></textarea>
        </div>
      </div>
      <div class="apply">
        <mt-button size="small" class="submitApply" @click="submitApplyRefundMoney" >提交申请</mt-button>
      </div>
    </div>

    <div class="return_good_apply" v-if="moneyApply==2">
      <div class="header">
        <span class="returnBack" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
        <span class="orderTitle">退货申请</span>
      </div>
      <div class="grayLine"></div>
      <div class="returnReason" @click="shutDownChooseReason">
        <span>申退原因 : </span>
        <div class="returnReasonDiv">
                    <span class="sp1" @click.stop="chooseReturnMoneyReason">
                        <input type="text" v-model="selectReason" readonly>
                        <img src="../../assets/images/topTri.png" alt="" class="img">
                    </span>
          <ul class="returnReasonUL">
            <li v-for="option in options" @click="clickLiChooseReason(option)">
              {{ option.label }}
            </li>
          </ul>
        </div>
      </div>
      <div class="return">
        <span class="returnWord">退款金额 : </span>
        <span class="returnNum">￥{{ refundMoney }}</span>
      </div>
      <div class="returnReasonArea">
        <div class="returnReasonAreaWord">
          退货说明 :
        </div>
        <div class="returnReasonAreaInput">
          <textarea v-model="enterReason" placeholder="请简要说明退货原因" ></textarea>
        </div>
      </div>
      <div class="grayLine"></div>
      <div class="container">
        <!--    照片添加    -->
        <div class="z_photo">
          <div class="z_file" v-if="(!isWeChat && !isIos) ||  isIos" v-show='!showAddPic' @click="showNotPic">
            <img src="../../assets/images/addImage.png" alt="">
          </div>
          <div class="z_file"  v-if="(!isWeChat && !isIos ) || isIos  " v-show="showAddPic">
            <input type="file" name="file" id="file" value="" accept="image/*" @change="imgChange('z_photo','z_file');" />
          </div>
          <div class="z_file" v-if="(showAddPic && !isIos)" id="fileBox" ref="camera_box" ></div>

          <div v-if="(isWeChat && !isIos)" class="weChatDiv">
          </div>
        </div>
      </div>
      <div class="apply">
        <mt-button size="small" class="submitApply" @click="submitApplyRefundGood" >提交申请</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  img{
    width:100%;
    height:100%;
  }

  span{
    display: inline-block;
  }

  .grayLine{
    width:100%;
    height:1rem;
    background: #f4f4f4;
  }

  .allType{
    width:100%;
    height:100%;
    background: #f4f4f4;
    overflow-x: hidden;
  }

  .allType  .header{
    padding: 1.3rem 0;
    background: #fff;
  }

  .allType  .header .orderTitle{
    font-size:1.6rem;
    color: #333;
  }

  .allType  .header .returnBack{
    float: left;
    margin-left:0.9rem;
    width:1rem;
    height:2rem;
  }

  .allType .returnReason{
    padding: 1.4rem 0.8rem;
    font-size:1.5rem;
    text-align: left;
    background: #fff;
    width:35.9rem;
    margin: 0 auto;
    position: relative;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .allType .returnReason .returnReasonDiv{
    font-size:1.5rem;
    color: #333;
  }

  .allType .returnReason .returnReasonDiv input{
    font-size:1.4rem;
  }

  .allType .returnReason .returnReasonDiv .sp1{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
  }

  .allType .returnReason .returnReasonDiv .sp1 .img{
    width:1rem;
    height:0.6rem;
  }

  .allType .returnReason .returnReasonUL{
    margin-right:6rem;
    height:0;
    overflow: hidden;
    width:100%;
  }

  .allType .returnReason .returnReasonUL li{
    line-height:2rem;
    border: 1px solid #D6D6D6;
    padding: 0.3rem 3rem;
  }

  .allType .returnReason select{
    width:26.2rem;
    font-size:1.2rem;
    border:0;
    padding: 1rem 0;
  }

  .allType .returnReason select option{
    height:10px;
  }

  .allType .return{
    font-size:1.5rem;
    display: flex;
    display: -webkit-flex;
    padding:2.4rem 0.8rem;
    width:35.9rem;
    margin: 0 auto;
  }

  .allType .return .returnNum{
    color: #cd141c;
  }

  .allType .returnReasonArea{
    text-align: left;
    font-size:1.5rem;
    height:15rem;
    background: #fff;
    width:35.9rem;
    margin: 0 auto;
    padding: 1.5rem 0.8rem;
  }

  .allType .returnReasonArea .returnReasonAreaWord{
    margin: 1.5rem 0 1.7rem 0;
    font-size:1.5rem;
  }

  .allType .returnReasonArea .returnReasonAreaInput textarea{
    width:100%;
    height:8.8rem;
    border: 0;
    font-size:1.2rem;
  }

  .allType .apply{
    margin: 2.5rem auto 0;
  }

  .allType .apply .submitApply{
    width:35.9rem;
    background: #F9BE00;
    font-size:1.7rem !important;;
    color:#fff;
    height:4.3rem !important;;
  }


  .allType .apply .submitApply.nextBtn1{
    background: #d6d6d6;
    width:35.9rem;
    font-size:1.7rem !important;
    color:#fff;
    height:4.3rem !important;
  }

  .assess_image{
    width:100%;
    height: 7.5rem;
    line-height: 7.5rem;
    font-size: 1.5rem;
    color: #868686;
    text-align: left;
    display: flex;
    display: -webkit-flex;
    background: #fff;
    padding: 1rem 0.8rem;
    align-items: center;
    -webkit-align-items: center;
    position: relative;
  }

  .assess_image img{
    width:5.5rem;
    height:5.5rem;
    margin-right: 1rem;
  }

  .container {
    width: 100%;
    height: 100%;
    overflow: auto;
    clear: both;
  }

  .z_photo {
    width: 100%;
    height: 10rem;
    padding: 0.3rem;
    overflow: auto;
    clear: both;
    margin: 1rem auto;
    float: left;
    background: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    align-items: center;
    -webkit-align-items: center;
  }

  .z_photo img {
    width: 5.5rem;
    height: 5.5rem;
  }

  .z_addImg {
    float: left;
    margin-right: 0.2rem;
    width:5.5rem;
    height:5.5rem;
    margin-left: 1rem;
  }

  .z_addImg img{
    width:5.5rem;
    height:5.5rem;
  }

  #file{
    width:5.5rem;
    height:5.5rem;
  }

  .z_file {
    width: 5rem;
    height: 5rem;
    background: url(../../assets/images/addImage.png) no-repeat left top;
    background-size: 100% 100%;
    float: left;
    margin-right: 0.5rem;
  }

  .z_file input::-webkit-file-upload-button {
    width: 1rem;
    height: 1rem;
    border: none;
    position: absolute;
    outline: 0;
    opacity: 0;
  }

  .z_file input#file {
    display: block;
    width: auto;
    border: 0;
    vertical-align: middle;
    color: #fff;
  }

</style>

<script>
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui';
  import Vue from 'vue'
  import { Indicator } from 'mint-ui'
  import {api_post } from '../../util/api.js'
  import {alert_msg } from '../../util/index.js'
  import {router} from '../../router/index.js'
  export default{
    name: 'afterSellService_list',
    data(){
      return{
        enterReason:'',
        selectedGood: '',
        enterGoodReason: '',
        isTop:true,
        isClick: true,
        params: {},
        entity: '',
        options: [],
        orderItemId: '',
        refundMoney: '',
        refundType: '',
        loginCode: '',
        userId: '',
        imgParams: '',
        picBase: '',
        picUrl: '',
        refundGoodsImg: [],
        showAddPic: true,
        moneyApply: 3,
        timestamp: '',
        nonceStr: '',
        weixinSignature: '',
        isWeChat: '',
        localIds: '',
        serverId: '',
        isDisabled: true,
        isIos: '',
        selectReason: '',
        chooseReason: ''
      }
    },
    mounted(){
      this.getEchoRefund(),
        this.getReason(),
        this.checkIsIosOrAndroid()

    },
    methods: {
      //返回
      returnBack(){
        let history = this.$route.query.history || ''
        if(history == '01'){
          this.$router.go(-1)
        }else{
          this.$router.push({path:"afterSellService_list"})
        }
        
      },

      //请求退货的数据
      getReason(){
        (function(doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              if (clientWidth >= 640) {
//                    docEl.style.fontSize = '100px';
              } else {
//                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
              }
            };
//
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
//                document.getElementById('bdimgshare_1489225693190').style.display='none'
        let url = HOST_HDPORDERS + '/order/public/dictListByType/'
        this.$resource(url).get({ type: 'REFUND_REASON' }).then((response) => {
          // console.log( response )
          if( response.status == 200 ){
            if( response.body.code == 200 ){
              this.options = response.body.list
            }else {
              Toast({
                message: response.body.msg,
                position: 'center',
                duration: 3000
              })
            }
          }
        })
      },

      //点击选择退货
      chooseReturnMoneyReason(){
        var returnReasonUL = document.getElementsByClassName('returnReasonUL')[0]
        returnReasonUL.style.height = 'auto'
      },
      clickLiChooseReason(option){
        this.selectReason = option.value
        var returnReasonUL = document.getElementsByClassName('returnReasonUL')[0]
        returnReasonUL.style.height = '0'
      },

      //关闭原因
      shutDownChooseReason(){
        var returnReasonUL = document.getElementsByClassName('returnReasonUL')[0]
        returnReasonUL.style.height = '0'
      },

      //判断是IOS还是Android
      checkIsIosOrAndroid(){
        var u = navigator.userAgent
        var _this = this;
        if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
          this.isIos = false
          this.checkIsWeChat()
        }else {//是IOS
          this.isIos = true
        }
        //动态添加input file
        setTimeout(()=>{
          // console.log("777")
          var fileBox = document.getElementById("fileBox");
          if (fileBox&&!document.getElementById("file")){
            var inputOther=document.createElement('input')
            inputOther.type='file'
            inputOther.accept="image/*"
            inputOther.id="file"
            inputOther.name="file"
            inputOther.className='file1'
            $(inputOther).attr("multiple",'multiple')
            fileBox.appendChild(inputOther)
            inputOther.addEventListener('change',function () {
              // console.log("000")
              _this.imgChange('z_photo','z_file')
            });
          }
        },100)
      },

      //判断是否是从微信进入的
      checkIsWeChat(){
        this.$nextTick(()=>{
          //先判断是否是在微信中打开的
          var ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger") {
            //是在微信中打开
            this.isWeChat = true
            this.getSignature()
          } else {
            //不是在微信中打开
            this.isWeChat = false
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
              jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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

      //在微信中上传图片
      upWeChatPic(){
        var _this = this
        var imgList = document.getElementsByClassName("z_addImg");
        if( imgList.length >= 4 ){
          Toast({
            message: '最多上传4张图片',
            duration: 2000,
            className: "toast"
          });
        }else {
          wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在的接口，
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                _this.localIds = res.localIds ; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                wx.uploadImage({
                  localId: _this.localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    let url = HOST_HDPORDERS + '/order/public/uploadWeiXinWebFile'
                    _this.$resource( url ).get({ mediaId: serverId,ext: 'jpg' }).then((response) =>{
                      if( response.body.code == 200 ){
                        _this.picUrl = 'http://'+( HOST_IMGFILEPATH + response.body.entity )
                        var img = document.createElement("img");
                        img.setAttribute("src", _this.picUrl);
                        img.setAttribute("width", '110px');
                        img.setAttribute("height", '110px');
                        var imgAdd = document.createElement("span");
                        imgAdd.appendChild(img);
                        imgAdd.setAttribute("class", "z_addImg");
                        var parentDiv = document.getElementsByClassName('weChatDiv')[0]
                        parentDiv.appendChild(imgAdd);
                        img.onload = function () {
                          this.onclick = function () {
                            MessageBox.confirm('确定要删除该图片吗?').then(action => {
                              this.parentNode.remove()
                            },function () {
                            })
                          }
                        }
                      }
                    })
                  },
                  fail: function(res){
                    alert("上传失败，msg："+JSON.stringify(res));
                  }
                });
              }
            });
          });
        }
      },

      //在浏览器中打开手机相册
      imgChange(obj1, obj2) {
        // console.log("999")
        Indicator.open('加载中...');
        var imgList = document.getElementsByClassName("z_addImg");
        var _this = this
        //获取点击的文本框
        var file = document.getElementById("file");
        //存放图片的父级元素
        var imgContainer = document.getElementsByClassName(obj1)[0];
        //获取的图片文件
        var fileList = file.files;
        //文本框的父级元素
        var input = document.getElementsByClassName(obj2)[0];
        var imgArr = [];
        //遍历获取到得图片文件
        for (var i = 0; i < fileList.length; i++) {
          var imgUrl =file.files[i];
          if(imgUrl.type.indexOf('image') !== -1) {
            var reader = new FileReader();
            reader.onload = function (e) {
              var dataURL = e.target.result;
              _this.picBase = dataURL
            }
            reader.readAsDataURL(imgUrl);
          }
          setTimeout(function () {
            if( _this.picBase ){
              let url = HOST_UPIMAGES;
              /* var fileStr = {
                fileStr: _this.picBase
              } */
             /*  _this.$resource ( url ).save( fileStr ).then((response) => {
                if( response.body.code == 200 ){
                  Indicator.close();
                  _this.picUrl = 'http://'+(HOST_IMGFILEPATH + response.body.filePath)
                  imgArr.push( _this.picUrl );
                  var img = document.createElement("img");
                  img.setAttribute("src", _this.picUrl);
                  img.setAttribute("width", '110px');
                  img.setAttribute("height", '110px');
                  var imgAdd = document.createElement("span");
                  imgAdd.setAttribute("class", "z_addImg");
                  imgAdd.appendChild(img);
                  imgContainer.appendChild(imgAdd);
                  img.onload = function () {
                    if( imgList.length >= 4 ){
                      _this.showAddPic = false
                    }
                    this.onclick = function () {
                      MessageBox.confirm('确定要删除该图片吗?').then(action => {
                        this.parentNode.remove()
                        if( imgList.length < 4 ){
                          _this.showAddPic = true
                        }
                      },function () {
                      })
                    }
                  }
                }
              }) */
              api_post({
                url:url,
                data:{
                  fileStr: _this.picBase
                }
              }).then( response =>{
                // console.log(response)
                if( response.code == 200 ){
                  Indicator.close();
                  _this.picUrl = 'http://'+(HOST_IMGFILEPATH + response.filePath)
                  imgArr.push( _this.picUrl );
                  var img = document.createElement("img");
                  img.setAttribute("src", _this.picUrl);
                  img.setAttribute("width", '110px');
                  img.setAttribute("height", '110px');
                  var imgAdd = document.createElement("span");
                  imgAdd.setAttribute("class", "z_addImg");
                  imgAdd.appendChild(img);
                  imgContainer.appendChild(imgAdd);
                  img.onload = function () {
                    if( imgList.length >= 4 ){
                      _this.showAddPic = false
                    }
                    this.onclick = function () {
                      MessageBox.confirm('确定要删除该图片吗?').then(action => {
                        this.parentNode.remove()
                        if( imgList.length < 4 ){
                          _this.showAddPic = true
                        }
                      },function () {
                      })
                    }
                  }
                }
              })
            }
          },300)
        };
      },

      //提示只能上传4张图片
      showNotPic(){
        Toast({
          message: '最多上传4张图片',
          duration: 2000,
          className: "toast"
        });
      },

      //去退款
      submitApplyRefundMoney(){
        if(this.enterReason == ''){
           Toast({
                message: '请填写理由',
                position: 'center',
                duration: 1200
            })
           return false
        }

        let url = HOST_HDPORDERS + '/order/front/addRefund/'
        /* this.loginCode= window.localStorage.getItem('loginCode')
        Vue.http.interceptors.push((request, next)  =>{
          request.headers.set('loginCode', this.loginCode);
          next((response) => {
            return response
          });
        }); */
        /* this.params = {
          orderItemId: this.orderItemId,
          refundMoney: this.refundMoney,
          refundReason: this.selectReason,
          refundType: this.refundType,
          applyAccount: this.enterReason
        } */
        // console.log(typeof this.enterReason)
       /*  this.$resource(url).save({}, this.params ).then((response) => {
          if( response.body.code == 200 ){
            router.push({ path: 'afterSellService_list'})
          }else {
            Toast({
              message: response.body.msg,
              position: 'center',
              duration: 3000
            })
          }
        }) */
        api_post({
          url:url,
          data:{
            orderItemId: this.orderItemId,
            refundMoney: this.refundMoney,
            refundReason: this.selectReason,
            refundType: this.refundType,
            applyAccount: this.enterReason
          }
        }).then(response =>{
          // console.log(response)
          if( response.code == 200 ){
            alert_msg("提交申退成功！")
            router.push({ path: 'afterSellService_list'})
          }else {
            Toast({
              message: response.msg,
              position: 'center',
              duration: 3000
            })
          }
        })
      },

      //请求修改申退的时候的回显
      getEchoRefund(){
        this.refundType = this.$route.query.refundType
        if( this.refundType == 1 ){
          this.moneyApply = 1
        }else if( this.refundType == 2 ){
          this.moneyApply = 2
        }
        this.refundMoney = this.$route.query.refundMoney
        this.orderItemId = this.$route.query.orderItemId
//                let url = HOST_HDPORDERS + '/order/front/refundDetail/'
//                this.$resource (url ).get({ id: this.$route.query.refundCode }).then((response) => {
//                    console.log( response)
//                    if( response.status == 200 ){
//                        if( response.body.code == 200 ){
//                            this.entity = response.body.entity
//                            this.enterReason = response.body.entity.applyAccount
//                            this.selected =  response.body.entity.refundReason
//                            console.log(  this.selected )
//                        }else {
//                            Toast({
//                                message: response.body.msg,
//                                position: 'center',
//                                duration: 3000
//                            })
//                        }
//                    }
//
//                })
      },

      //去退货
      submitApplyRefundGood(){
        if(this.enterReason == ''){
           Toast({
                message: '请填写理由',
                position: 'center',
                duration: 1200
            })
           return false
        }

        let url = HOST_HDPORDERS + '/order/front/addRefund/'
        /* this.loginCode= window.localStorage.getItem('loginCode')
        Vue.http.interceptors.push((request, next)  =>{
          request.headers.set('loginCode', this.loginCode);
          next((response) => {
            return response
          });
        }); */
        var z_addImgs = document.getElementsByClassName('z_addImg')
        if(  z_addImgs.length > 0 ){
          for( var i = 0; i < z_addImgs.length; i++ ){
            this.refundGoodsImg.push(z_addImgs[i].getElementsByTagName('img')[0].src)
          }
        }
        if( this.refundGoodsImg.length > 1){
          this.refundGoodsImg = this.refundGoodsImg.join(',')
        }else if( this.refundGoodsImg.length == 1) {
          this.refundGoodsImg = this.refundGoodsImg[0]
        }else {
          this.refundGoodsImg = ''
        }
        this.params = {
          orderItemId: this.orderItemId,
          refundMoney: this.refundMoney,
          refundReason: this.selectReason,
          refundType: this.refundType,
          applyAccount: this.enterReason,
          refundGoodsImg: this.refundGoodsImg
        }

       /*  this.$resource(url).save({}, this.params ).then((response) => {
          if( response.body.code == 200 ){
            router.push({ path: 'afterSellService_list'})
          }else if( response.body.code == -1 ){
            let url = HOST_HDPUSER+'/user/isLogin';
            this.loginCode= window.localStorage.getItem('loginCode')
            this.userId= window.localStorage.getItem('userId')
            this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
              console.log( response )
              if (response.status == 200) {
                if(response.data.code<0){
                  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                  window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+this.$route.query.commodityId)
                }
              }
            })
          }else{
            Toast({
              message: response.body.msg,
              position: 'center',
              duration: 3000
            })
          }
        }) */
        api_post({
          url:url,
          data:{
            orderItemId: this.orderItemId,
            refundMoney: this.refundMoney,
            refundReason: this.selectReason,
            refundType: this.refundType,
            applyAccount: this.enterReason,
            refundGoodsImg: this.refundGoodsImg
          }
        }).then(response =>{
          // console.log(response)
          if( response.code == 200 ){
            alert_msg("提交申退成功！")
            router.push({ path: 'afterSellService_list'})
          }else if( response.code == -1 ){
            let url = HOST_HDPUSER+'/user/isLogin';
            this.loginCode= window.localStorage.getItem('loginCode')
            this.userId= window.localStorage.getItem('userId')
            this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
              // console.log( response )
              if (response.status == 200) {
                if(response.data.code<0){
                  window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login"
                  window.localStorage.setItem('goodUrl',window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId='+this.$route.query.commodityId)
                }
              }
            })
          }else{
            Toast({
              message: response.msg,
              position: 'center',
              duration: 3000
            })
          }

        })

      },

    },
    watch: {
      selectReason: function () {
        if( this.selectReason != ''&& this.enterReason != '' ){
          this.isDisabled = false
        }else {
          this.isDisabled = true
        }
      },
      enterReason: function () {
        if( this.enterReason != '' && this.selectReason != '' ){
          this.isDisabled = false
        }else {
          this.isDisabled = true
        }
      }
    }
  }
</script>
