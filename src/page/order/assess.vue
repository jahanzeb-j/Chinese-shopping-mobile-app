
<template>
    <div class="assess">
      <div class="assess_img clearfix">
        评价
        <img @click="back()" src="../../assets/images/returnFront.png" >
      </div>
      <div class="assess_line"></div>
      <div v-if="this.assessed == 1">
      <div v-for="(checkb1,index1) in goodAssess">
        <div class="goods clearfix" >
          <div class="goods_img floatL"><img :src="checkb1.imgUrl" ></div>
          <div class="goods_name floatL">
            <div class="goods_word">{{checkb1.pdName}}</div>
            <div class="goods_nature">
              <span>{{checkb1.pdSpce}}</span>
              <!--<span>{{checkb1.pdSpce[0].name}}</span><span class="goods_nature1">{{checkb1.pdSpce[0].value}}</span><span>{{checkb1.pdSpce[1].name}}</span><span class="goods_nature1">{{checkb1.pdSpce[1].value}}</span>-->
            </div>
          </div>
          <div class="goods_detail floatR">
            <div class="order_male">¥{{checkb1.pdPrice}}</div>
            <div class="order_detailNumber">×{{checkb1.pdQuantity}}</div>
          </div>
        </div>
        <div class="assess_heart floatL"><span>商品评价</span></div>
        <div class="content">
          <div id="starttwo" class="block clearfix">
            <div  class="star_score">
              <p style="left: 0px;top:0; width:3.8rem; z-index: 5;display: none" id="star1" @click="getStar1(index1)"></p>
              <p style="left: 0px;top:0; width: 7.6rem; z-index: 4;display: none" id="star2" @click="getStar2(index1)"></p>
              <p style="left: 0px;top:0; width: 11.4rem; z-index: 3;display: none" id="star3" @click="getStar3(index1)"></p>
              <p style="left: 0px;top:0; width: 15.2rem; z-index: 2;display: none" id="star4" @click="getStar4(index1)"></p>
              <p style="left: 0px;top:0; width: 19.2rem; z-index: 1;display: none" id="star5" @click="getStar5(index1)"></p>
              <p style="left: 0px;top:0; width: 3.8rem; z-index: 5;display: block" id="star6" @click="getStar1(index1)"></p>
              <p style="left: 0px;top:0; width: 7.6rem; z-index: 4;display: block" id="star7" @click="getStar2(index1)"></p>
              <p style="left: 0px;top:0; width: 11.4rem; z-index: 3;display: block" id="star8" @click="getStar3(index1)"></p>
              <p style="left: 0px;top:0; width: 15.2rem; z-index: 2;display: block" id="star9" @click="getStar4(index1)"></p>
              <p style="left: 0px;top:0; width: 19.2rem; z-index: 1;display: block" id="star10" @click="getStar5(index1)"></p>
            </div>
          </div>
        </div>
        <div class="assess_flow4">
          <textarea type="text" placeholder="最多填写300个字的描述作为商品的评价" class="myIndex_action_my admin2"></textarea>
        </div>
        <div class="container">
            <div class="z_photo">
              <div class="z_file" v-if="(!isWeChat && !isIos)|| isIos" v-show="index2==4" @click="showNotPic('z_photo',index1)">
                <img src="../../assets/images/addImage.png" alt="">
              </div>
              <div class="z_file" v-if="isIos" v-show="index2<4" id='file'>
                <input type="file" name="file" class="file1" value="" accept="image/*" multiple @change="imgChange('z_photo','z_file',index1);" />
              </div>
              <div class="z_file" v-if="!isIos" v-show="index2<4" id="fileBox" ref="camera_box" >
              </div>

              <!-- <div class="z_file" v-if="isWeChat && !isIos" @click="upWeChatPic(index1)">
                <img src="../../assets/images/addImage.png" alt="">
              </div> -->
              <div v-if="isWeChat && !isIos" class="weChatDiv">
              </div>
            </div>
        </div>
      <div class="assess_line1"></div>
      </div>
      <div class="login-btn" @click="submit()">提交</div>
      </div>

      <div v-if="this.assessed == 3">
        <div v-for="(checkb1,index1) in evaluationShowArr">
          <div v-for="item in checkb1.goodsDetail" class="goods clearfix" >
            <div class="goods_img floatL"><img :src="item.imgUrl" ></div>
            <div class="goods_name floatL">
              <div class="goods_word">{{item.pdName}}</div>
              <div class="goods_nature">
                <span>{{item.pdSpce}}</span>
              </div>
            </div>
            <div class="goods_detail floatR">
              <div class="order_male">¥{{item.pdPrice}}</div>
              <div class="order_detailNumber">×{{item.pdQuantity}}</div>
            </div>
          </div>
          <div class="assess_heart">
            商品评价
          </div>
          <div class="content">
            <div class="block clearfix">
              <div class="star_commentStar">
                <img v-show="checkb1.commentStar == 1" src="../../assets/images/oneStar.png">
                <img v-show="checkb1.commentStar == 2" src="../../assets/images/twoStar.png">
                <img v-show="checkb1.commentStar == 3" src="../../assets/images/threeStar.png">
                <img v-show="checkb1.commentStar == 4" src="../../assets/images/fourStar.png">
                <img v-show="checkb1.commentStar == 5" src="../../assets/images/fiveStar.png">
              </div>
            </div>
          </div>
          <div class="assess_flow4">
            <div>{{checkb1.commentContent}}</div>
          </div>
          <div class="container">
            <!--    照片添加    -->
            <div class="z_photo">
              <span v-for="item in checkb1.pics" class="z_addImg">
                <img :src="item">
              </span>
            </div>
          </div>
          <div class="assess_line1"></div>
        </div>
      </div>

    </div>
</template>
<style scoped>
  /*星级bug*/
  .block .star_score{ float:left;}
  .star_score { background-image:url(../../assets/images/assess_no.png); width:19.4rem; height:1.8rem;  position:relative;background-size: 4.4rem 1.8rem; }
  .star_commentStar { width:19.4rem; height:1.8rem;  position:relative; float: left; margin-top:1.1rem;}
  .star_commentStar img{
    width:100%;
    height: 100%;
  }
  .star_score #star6, .star_score #star7, .star_score #star8, .star_score #star9, .star_score #star10{left:0;width: 19.4rem;height: 1.8rem;display: block;position: absolute}
  .star_score #star1, .star_score #star2, .star_score #star3, .star_score #star4, .star_score #star5{ background:url(../../assets/images/assess_yes.png);left:0;width: 19.4rem;height: 1.8rem;display: none;position: absolute;background-size: 4.4rem 1.8rem;}
  #starttwo .star_score { background:url(../../assets/images/assess_no.png);margin-top: 1.1rem;background-size: 4.4rem 1.8rem;}
  /*星级bug*/
  /* 星级回显 */
  .star_score img{}
  /* 星级回显 */
  /*上传图片*/
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

  .file1{
    width:5.5rem;
    height:5.5rem;
  }

  .z_file {
    width: 5rem;
    height: 5rem;
    background: url(../../assets/images/addImage.png) no-repeat left top;
    background-size: 100% 100%;
    float: left;
    margin-right: 0.2rem;
  }

  .z_file input::-webkit-file-upload-button {
    width: 1rem;
    height: 1rem;
    border: none;
    position: absolute;
    outline: 0;
    opacity: 0;
  }

  .z_file input.file1 {
    display: block;
    width: auto;
    border: 0;
    vertical-align: middle;
    color: #fff;
    width:5.5rem;
    height:5.5rem;
  }
  /*遮罩层*/

  .z_mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: none;
  }

  .z_alert {
    width: 16rem;
    height: 8rem;
    border-radius: 1.2rem;
    background: #fff;
    font-size: .24rem;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -8rem;
    margin-top: -4rem;
  }

  .z_alert p{
    height:3.5rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
  }

  .z_alert p:nth-child(2) span {
    display: inline-block;
    width: 49%;
    height: 3.5rem;
    line-height: 3.5rem;
    float: left;
    border-top: 1px solid #ddd;
  }

  .z_cancel {
    border-right: 1px solid #ddd;
  }
  /*上传图片*/
  .content {
    border-bottom:1px solid #d6d6d6;
  }
  .assess{
    width:100%;
    height:100%;
    background:#fff;
  }
  .login-btn{
    width:92%;
    height:4.4rem;
    background:#f9be00;
    font-size:1.7rem;
    color:#fff;
    letter-spacing: 0.2rem;
    text-align: center;
    line-height: 4.4rem;
    margin-left:4%;
    margin-top:5rem;
    border-radius: 0.2rem;
  }
  .assess_img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .assess_img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .assess_line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .assess_line1{

    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    /*border-top:1px solid #d8d8d8;*/
  }
  .goods{
    width: 100%;
    padding: 0.5rem 4%;
    background: #f4f4f4;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
  .goods_img img{
    width: 7.5rem;
    margin-right: 1.5rem;
  }
  .goods_word{
    width: 16rem;
    line-height: 1.5rem;
    text-align: left;
    font-size: 1.3rem;
    height: 3rem;
    margin-top: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .goods_nature {
    margin-top: 0.5rem;
    text-align: left;
  }
  .goods_nature span{
    color: #868686;
    font-size: 1.2rem;
  }
  .goods_nature .goods_nature1{
    margin: 0 2rem 0 0.5rem;
  }
  .order_male{
    line-height: 3rem;
    /*text-align: left;*/
    font-size: 1.4rem;
  }
  .order_detailNumber{
    color: #868686;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }
  .assess_heart{
    height: 4rem;
    line-height: 4rem;
    text-align: left;
    padding: 0 4%;
    font-size: 1.4rem;
    color: #333;
    float: left;
  }

  .assess_flow4{
    /*height: 9rem;*/
    padding:0 4%;
    /*border-bottom: 1px solid #d6d6d6;*/
  }
  .assess_flow4 textarea,.assess_flow4 div {
    outline: none;
    resize: none;
    border-color: #fff;
    line-height: 1rem;
    height: 11rem;
    width: 100%;
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: left;
    overflow: hidden;
    padding: 0.8rem 0;
  }
  .assess_image{
    height: 5.6rem;
    line-height: 5.6rem;
    margin: 0 4%;
    font-size: 1.5rem;
    color: #868686;
    text-align: left;
    margin-bottom: 2rem;
  }
  .assess_image img{
    margin-right: 1rem;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
<style>
  .z_addImg {
    float: left;
    margin-right: 0.2rem;
    width:5.5rem;
    height:5.5rem;
  }
  .z_addImg img{
    width:100%!important;
    height:100%!important;
  }
</style>
<script>
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'order_all',
    data () {
      return {
        loginCode:"",
        allList1:[],
        idDetail:'',
        typeDetail:'',
        admin2:'',
        goodAssess:'',
        evaluationShowArr: [],  //评价回显数组
        userId:'',
        assessed:2,
        star:'',
        imgArr:[],
        orderId: '',  //订单ID，
        timestamp: '',
        nonceStr: '',
        weixinSignature: '',
        isWeChat: '',
        localIds: '',
        serverId: '',
        index2:'',
        isIos: '',
      }
    },
    mounted () {
        this.allList();
        this.allList3();
        this.checkIsIosOrAndroid()

    },
    methods:{

      //判断是IOS还是Android
      checkIsIosOrAndroid(){
        let _this = this;
        var u = navigator.userAgent
      

        if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ||1){//是Android
          this.isIos = false
          this.checkIsWeChat()
        }else {//是IOS
          this.isIos = true
        }
      
        //动态添加input file
        setTimeout(()=>{
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
              _this.imgChange('z_photo','z_file',_this.index1)
            });
          }
        },100)
        
      },

//      上传图片
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
//            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
      upWeChatPic(index1){
        var _this = this
        var imgList = document.getElementsByClassName('weChatDiv')[index1].getElementsByClassName("z_addImg");
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
                if( _this.localIds.indexOf("wxlocalresource") != -1 ){
                  _this.localIds = _this.localIds.replace("wxlocalresource", "wxLocalResource");
                }
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
                      img.setAttribute("height", '100px');
                      var imgAdd = document.createElement("span");
                      imgAdd.appendChild(img);
                      imgAdd.setAttribute("class", "z_addImg");
                      var parentDiv = document.getElementsByClassName('weChatDiv')[index1]
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
      imgChange(obj1, obj2,index1=0) {
        var _this = this
        //获取点击的文本框
        var file = document.getElementsByClassName("file1")[index1];
        //存放图片的父级元素
        var imgContainer = document.getElementsByClassName(obj1)[index1];
        var imgList = imgContainer.getElementsByClassName("z_addImg");
        //获取的图片文件
        var fileList = file.files;
        //文本框的父级元素
        var input = document.getElementsByClassName(obj2)[0];
        //        var imgArr = [];
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
              _this.$api_post({
                url:url,
                data:{
                  fileStr: _this.picBase
                }
              }).then( response =>{
                 if( response.code == 200 ){
                  _this.picUrl = 'http://'+(HOST_IMGFILEPATH + response.filePath)
                  var img = document.createElement("img");
                  img.setAttribute("src", _this.picUrl);
                  img.setAttribute("width", '110px');
                  img.setAttribute("height", '100px');
                  var imgAdd = document.createElement("span");
                  imgAdd.setAttribute("class", "z_addImg");
                  imgAdd.appendChild(img);
                  imgContainer.appendChild(imgAdd);
                  if(_this.goodAssess[index1].imgArr == undefined) {
                    _this.$set(_this.goodAssess[index1], 'imgArr', []);
                  }
                  _this.goodAssess[index1].imgArr.push( _this.picUrl);

                  img.onload = function () {
                    if( imgList.length >= 4 ){
                      _this.index2 = 4
                    }
                    this.onclick = function () {
                      MessageBox.confirm('确定要删除该图片吗?').then(action => {
                        this.parentNode.remove()
                      if( imgList.length < 4 ){
                        _this.index2 = imgList.length
                      }
                    },function () {
                      })
                    }
                  }
                } 
              })
             /*  _this.$resource ( url ).save( fileStr ).then((response) => {
                if( response.body.code == 200 ){
                  _this.picUrl = 'http://'+(HOST_IMGFILEPATH + response.body.filePath)
                    //                imgArr.push( _this.picUrl );
                  var img = document.createElement("img");
                  img.setAttribute("src", _this.picUrl);
                  img.setAttribute("width", '110px');
                  img.setAttribute("height", '100px');
                  var imgAdd = document.createElement("span");
                  imgAdd.setAttribute("class", "z_addImg");
                  imgAdd.appendChild(img);
                  imgContainer.appendChild(imgAdd);
                  if(_this.goodAssess[index1].imgArr == undefined) {
                    _this.$set(_this.goodAssess[index1], 'imgArr', []);
                  }
                  _this.goodAssess[index1].imgArr.push( _this.picUrl);

                  img.onload = function () {
                    if( imgList.length >= 4 ){
                      _this.index2 = 4
                    }
                    this.onclick = function () {
                      MessageBox.confirm('确定要删除该图片吗?').then(action => {
                        this.parentNode.remove()
                      if( imgList.length < 4 ){
                        _this.index2 = imgList.length
                      }
                    },function () {
                      })
                    }
                  }
                }
              }) */
            }
          },300)
        };
      },

      //提示只能上传4张图片
      showNotPic(obj1,index1){
        var imgContainer = document.getElementsByClassName(obj1)[index1];
        var imgList = imgContainer.getElementsByClassName("z_addImg");
        if( imgList.length >= 4 ){
          Toast({
            message: '最多上传4张图片',
            duration: 2000,
            className: "toast"
          });
        }

      },
//      上传图片


      getStar1: function (index) {
        $(".star_score").eq(index).children('#star1').css({"display":"block"});
        $(".star_score").eq(index).children('#star2').css({"display":"none"});
        $(".star_score").eq(index).children('#star3').css({"display":"none"});
        $(".star_score").eq(index).children('#star4').css({"display":"none"});
        $(".star_score").eq(index).children('#star5').css({"display":"none"});
      },
      getStar2: function (index) {
        $(".star_score").eq(index).children('#star2').css({"display":"block"});
        $(".star_score").eq(index).children('#star1').css({"display":"none"});
        $(".star_score").eq(index).children('#star3').css({"display":"none"});
        $(".star_score").eq(index).children('#star4').css({"display":"none"});
        $(".star_score").eq(index).children('#star5').css({"display":"none"});
      },
      getStar3: function (index) {
        $(".star_score").eq(index).children('#star3').css({"display":"block"});
        $(".star_score").eq(index).children('#star1').css({"display":"none"});
        $(".star_score").eq(index).children('#star2').css({"display":"none"});
        $(".star_score").eq(index).children('#star4').css({"display":"none"});
        $(".star_score").eq(index).children('#star5').css({"display":"none"});
      },
      getStar4: function (index) {
        $(".star_score").eq(index).children('#star4').css({"display":"block"});
        $(".star_score").eq(index).children('#star1').css({"display":"none"});
        $(".star_score").eq(index).children('#star3').css({"display":"none"});
        $(".star_score").eq(index).children('#star2').css({"display":"none"});
        $(".star_score").eq(index).children('#star5').css({"display":"none"});
      },
      getStar5: function (index) {
        $(".star_score").eq(index).children('#star5').css({"display":"block"});
        $(".star_score").eq(index).children('#star1').css({"display":"none"});
        $(".star_score").eq(index).children('#star3').css({"display":"none"});
        $(".star_score").eq(index).children('#star4').css({"display":"none"});
        $(".star_score").eq(index).children('#star2').css({"display":"none"});
      },
      allList: function () {
        this.goodAssess = JSON.parse(window.localStorage.getItem('goodAssess'));
        this.orderId = this.goodAssess[0].orderId;
        console.log(this.goodAssess)
        if(this.goodAssess != ''){
          for(let i = 0;i<this.goodAssess.length; i++){
            //              this.goodAssess[i].pdSpce = eval(this.goodAssess[i].pdSpce);
          }
        }
        //        console.log(this.goodAssess)
      },
      allList3: function () {
        if(this.$route.query.assessName == 11){
          this.assessed = 3;
        }
        if(this.$route.query.assessName == 10){
          this.assessed = 1;
        }
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
        this.goodAssess = JSON.parse(window.localStorage.getItem('goodAssess'));
        /* 订单评价成功后  => 获取评价详情 */
        this.getCommentListByOrder()
        // this.$resource(getOrderDetailUrl).save({},{}).then((response) => {
        //   if(response.status == 200) {
        //     this.evaluationShowArr = response.body;
        //     console.log(this.evaluationShowArr)
        //     for(var i = 0,len = this.evaluationShowArr.length; i < len; i++) {
        //       this.$set(this.evaluationShowArr[i], 'goodsDetail', []);
        //       var obj = {
        //         imgUrl:this.goodAssess[i].imgUrl,
        //         pdName:this.goodAssess[i].pdName,
        //         pdSpce:this.goodAssess[i].pdSpce,
        //         pdPrice:this.goodAssess[i].pdPrice,
        //         pdQuantity:this.goodAssess[i].pdQuantity,
        //       };
        //       this.evaluationShowArr[i].goodsDetail.push(obj);
        //     }
        //   } else {
        //     alert('获取评价详情失败');
        //   }
        // })

      },
      back: function () {
       window.history.back();
      },
      // 提交
      submit: function () {
        this.userId= window.localStorage.getItem('userId');
        var star_score = $('.star_score');
        var admin2 = $('.admin2'); //获取文字评价
        for(let i = 0;i<this.goodAssess.length; i++){
          var starFlag = false;
          var starIndex = 0;
          for(var z = 0,leng = star_score.eq(i).children('p').length; z < leng; z ++) {
            if(star_score.eq(i).children('p').eq(z).css('display') == 'block') {
              starFlag = true;
              starIndex = z;
              break;
            }
          }
          var star = 0;
          if(starFlag) {
            var str = star_score.eq(i).children('p').eq(starIndex).attr('id');
            star = str.substring(str.length - 1);
          }
          this.$set(this.goodAssess[i], 'commentContent', admin2.eq(i).val());
          this.$set(this.goodAssess[i], 'commentStar', star);
          this.$set(this.goodAssess[i], 'externalId', this.goodAssess[i].pdId);
          this.$set(this.goodAssess[i], 'externalType', 1);
          this.$set(this.goodAssess[i], 'pics', this.goodAssess[i].imgArr);
          //          this.$set(this.goodAssess[i], 'pics', 11);
          this.$set(this.goodAssess[i], 'pid', 0);
          this.$set(this.goodAssess[i], 'userId', parseInt(this.userId));
          this.$set(this.goodAssess[i], 'orderId', this.goodAssess[i].orderId);
          //          delete  this.goodAssess[i].pdSpce;
          //          delete  this.goodAssess[i].imgUrl;
          //          delete  this.goodAssess[i].orderId;
          delete  this.goodAssess[i].packageId;
          delete  this.goodAssess[i].parentId;
          delete  this.goodAssess[i].pdBn;
          delete  this.goodAssess[i].pdId;
          //          delete  this.goodAssess[i].pdName;
          //          delete  this.goodAssess[i].pdPrice;
          //          delete  this.goodAssess[i].pdQuantity;
          delete  this.goodAssess[i].pdWeight;
          delete  this.goodAssess[i].refundId;
          delete  this.goodAssess[i].refundStatus;
          delete  this.goodAssess[i].refundType;
          delete  this.goodAssess[i].siteId;
          delete  this.goodAssess[i].siteIds;
          delete  this.goodAssess[i].supId;
          delete  this.goodAssess[i].id;
        }
        //        console.log(this.goodAssess)

        let url =HOST_HDBMESSAGE + '/comment/saveComment';
        this.loginCode= window.localStorage.getItem('loginCode')
        this.userId= window.localStorage.getItem('userId')
          // this.$resource(url).save(this.goodAssess).then((response) => {
          //   if (response.status == 200) {
          //     this.assessed = 3;
          //     /* 订单评价成功后  => 告知订单 */
          //     let telOrderUrl = HOST_HDPORDERS + '/order/front/evaluateOrder';
          //     this.$resource(telOrderUrl).get({'orderId':this.orderId}).then((response) => {
          //       if(response.body.code != 200) {
          //         alert('告知订单失败');
          //       }
          //     })
          //     this.getCommentListByOrder2()
          //   }
          // })
          this.$api_post({
            url:url,
            data:this.goodAssess
          }).then(res=>{
            this.assessed = 3;
              /* 订单评价成功后  => 告知订单 */
            let telOrderUrl = HOST_HDPORDERS + '/order/front/evaluateOrder';
            this.$resource(telOrderUrl).get({'orderId':this.orderId}).then((response) => {
              if(response.body.code == 200) {
                this.$alert_msg('评价成功');
                setTimeout(()=> {
                    window.location.href = HOST_HDPTEST + '/#/order_all?actionClass=4'
                }, 1000);
              }else{
                this.$alert_msg(response.data.msg)
              }
            })
            this.getCommentListByOrder()
          })
      },
      /* 订单评价成功后  => 获取评价详情 */
      getCommentListByOrder(){
        this.$api_post({
          url: HOST_HDBMESSAGE + '/comment/getCommentListByOrderId/' + this.orderId,
          data:{}
        }).then(res=>{
          let temp = res
          temp.forEach((e,i) => {
            if( this.goodAssess[i]){
              let obj = {
                imgUrl: this.goodAssess[i].imgUrl,
                pdName: this.goodAssess[i].pdName,
                pdSpce: this.goodAssess[i].pdSpce,
                pdPrice: this.goodAssess[i].pdPrice,
                pdQuantity: this.goodAssess[i].pdQuantity,
              }
              e.goodsDetail = [obj]
            }
            
          })
          this.evaluationShowArr = temp
        })
      }
    }
  }
</script>
