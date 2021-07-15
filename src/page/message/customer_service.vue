<template>
  <div class="customer_service" id="boxcontainer">
    <div class="header-box">
      <div class="header-left" @click="toMessageIndex">
        <img src="../../assets/images/goback.png">
      </div>
      <div class="header-title">在线客服</div>
    </div>
    <mt-loadmore :top-method="loadTop"  ref="loadmore">
      <div class="center_msg_box" id="msgBox" ref="msgBox">
      </div>
    </mt-loadmore>
    <div style="clear:both;margin-bottom:5.8rem"></div>
    <!--底部输入框-->
    <div class="msg_input_box">
      <!--<div class="speaking_box"></div>-->
      <input type="text" class="msg_input" id="saytext" name="saytext" ref="pushmsg" v-on:keyup.13="sendMsg">
      <div class="expression_box" ></div>
      <div class="camera_box" @click="upWeChatPic" v-if="(!isIos && isWeChat)" id="fileBox" ref="camera_box"></div>
      <div class="camera_box" v-if="(isIos) ||( !isIos && !isWeChat) " ref="wcl">
        <input type="file" name="file" id="file" value="" accept="image/*" multiple @change="imgChange" />
      </div>

    </div>
    <textarea class="input"  ></textarea>
    <!--保存id-->
    <div class="id_box">
      <input type="text"   v-model="serviceId">
      <input type="text"   v-model="userId" id="userId">
      <input type="text" v-model="commodityId" id="commodityId" >
    </div>
    <div class='comfirm'>
        <span class='sendMsg' @click='sendMsg' >发送</span>
    </div>
  </div>

</template>
<script>
  export default{
    data() {
      return {
        serviceId:'',
        userId:'',
        commodityId:'',
        size:4,
        start:2,
        timestamp: '',
        nonceStr: '',
        weixinSignature: '',
        isWeChat: '',
        localIds: '',
        serverId: '',
        picBase: '',
        isIos: ''
      };
    },
    mounted(){
      this.getcommodityId();
      this.initHistory();
      this.checkIsIosOrAndroid()

    },
    methods:{
      loadTop(){
        this.getMoreMsg()
        this.$refs.loadmore.onTopLoaded();
      },
      initHistory:function () {
        WKYYIMManager.prototype.initMsgIndex();
        WKYYIMManager.prototype.initQQface();
        WKYYIMManager.prototype.getHistoryMessage(0,4);
      },
      getMoreMsg:function(){
        WKYYIMManager.prototype.getHistoryMessage(this.start,this.size);
        this.start=this.start+this.size;
      },
//
//        获取历史消息
//      getHistoryMSG:function(){
//        WKYYIMManager.prototype.getHistoryMessage(0,2)
//      },
//    获取从商品详情页带过来的商品id
      getcommodityId:function(){
        if (this.$route.query.commodityId){
          let commodityId=this.$route.query.commodityId;
          this.commodityId=commodityId
          window.localStorage.setItem('WangDeCommodityId',commodityId)
          let id=document.getElementById('commodityId')
          id.value=commodityId
          this.commodityId=commodityId
          let currentUserId=window.localStorage.getItem('userId');
          let getServiceUrl=HOST_HDBMESSAGE+"/msg/getService?userId="+currentUserId+"&commodityId="+commodityId;;
          this.$resource(getServiceUrl).get({ }).then((response) =>{
            console.log("更新用户商品值");
          });
        }else{
          window.localStorage.removeItem('WangDeCommodityId')
        }
      },
      sendMsg:function(){
        let _this=this
        this.$nextTick(()=>{
          let push=this.$refs.pushmsg
          let pushmsg=this.$refs.pushmsg.value;
          let to=window.localStorage.getItem("serviceId");
          let re=/^\s\s*\s$/
          if (!re.test(pushmsg)&&pushmsg.length!=0){
            MsgManager.getInstance().sendMessage(pushmsg,to,"2");
            push.value=''
          }else{
            alert('消息不能为空！')
          };
        })
      },
      toMessageIndex:function(){
        if (this.$route.query.commodityId){
          window.history.go(-1)
        }else {
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex';
        }

      },

      //判断是IOS还是Android
      checkIsIosOrAndroid(){
        var u = navigator.userAgent
        if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
          this.isIos = false
          this.checkIsWeChat()
        }else {//是IOS
          this.isIos = true
        }
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


      //微信中点击上传图片
      upWeChatPic(){},

      //普通浏览器中上传图片
      //在浏览器中打开手机相册
      imgChange() {
        var _this = this
        let serviceId=window.localStorage.getItem('serviceId')
        MsgManager.getInstance().sendPic(serviceId)
      },
    }
  }
</script>
<style>
  
  /*中间消息样式开始*/
  .showtime{
    width:100%;
    height:1.6rem;
    font-size:1.2rem;
    line-height: 1.6rem;
    text-align: center;
    color:#b9b9b9;
    margin-bottom: 0.8rem;
  }
  .noshow{
    opacity: 0;
  }
  #facebox{
    position: fixed !important;
    bottom: 4.8rem;
    width: 100%;
    height: 13.6rem;
    background: #f4f4f4;
    padding-top: 1rem;
    overflow-y: scroll;
  }
  #facebox table{
    width:100%;
  }
  #facebox table td{
    margin-right: .5rem;
  }
  #facebox table td img{
    width:3rem;
  }
  .center_msg_box{
    width:100%;
    margin-top:7rem;
    max-height: calc(100% - 11rem);
    overflow: auto;
  }
  .msg_box_other{
    width:100%;
    padding:3px 5px;
    margin-bottom:2.2rem;
    position: relative;
  }
  .msg_box_other_right{
    width:100%;
    padding:3px 5px;
    margin-bottom:2.2rem;
    position: relative;
  }
  .msg_box_other_right .qqFaceIm{
    width: 3rem
  }
  .new_left_img,.new_left_saojian,.new_left_words,.new_left_words2{
    float: left;
  }
  .new_left_img{
    width:4.3rem;
    height:4.3rem;
    border-radius: 1rem;
    margin-left:0.8rem;
  }
  .new_left_saojian{
    width: 0;
    height: 0;
    border-top: 0.7rem solid transparent;
    border-right: 1.4rem solid #fff;
    border-bottom: 0.7rem solid transparent;
    margin-top: 0.9rem;
    margin-left: 0.8rem;
  }
  .new_left_words2{

    border-radius: 0.3rem;
    margin-right:-0.2rem;
    max-width: 23.75rem;

  }
  .new_left_words{
    padding: 0.7rem 0.6rem;
    border-radius: 0.3rem;
    height: 4.3rem;
    max-width: 23.75rem;
    font-size:1.6rem;
    color:#252525;
    text-align: left;
    background:#fff;
    margin-right:-0.2rem;
  }
  .new_right_img,.new_right_saojian,.new_right_words,.new_right_words2{
    float: right;
    word-break:break-word;
  }
  .new_right_words2{
    max-width: 23.75rem;
    margin-top:0.6rem;


  }
  .new_right_img{
    width:4.3rem;
    height:4.3rem;
    border-radius: 1rem;
    margin-right:0.8rem;
  }
  .new_right_saojian{
    right:5.4rem;
    width: 0;
    height: 0;
    border-top: 0.7rem solid transparent;
    border-left: 1.4rem solid #f9be00;
    border-bottom: 0.7rem solid transparent;
    margin-top:0.9rem;
    margin-left:-0.2rem;
    margin-right:0.8rem;
  }
  .new_right_words{
    border-radius: .3rem;
    max-width: 23.75rem;
    background: #f9be00;
    line-height: 4.2rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    min-height: 4.2rem;
    padding: 0 1.5rem;
  }
  .clear{
    clear:both;
  }
  /*中间消息样式结束*/

</style>
<style scoped>
  .comfirm{
      position: fixed;
      bottom: 0;
      text-align: right;
      width: 100%;
      border-top: 1px solid #d6d6d6;
      background: white;

  }
  .comfirm span{
    padding: 1rem 2.5rem;
    display: inline-block;
    background: #f4bc56;
    border-radius: 10px;
    margin: .5rem 1.5rem .8rem 0;
    font-size: 1.5rem;
    border-top: 1px solid #d6d6d6;
  }
  .customer_service{
    width:100%;
    height:100%;
    overflow: auto;
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
    border-bottom:1px solid #d3d3d3 ;
  }
  .header-left{
    width:4.4rem;
    height:4.4rem;
    position:relative;
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
    left: 4.4rem;
  }
  /*头部样式结束*/
  .msg_box{
    width:100%;
    margin-top:4.4rem;
    border:none;

  }
  .msg_line1,.msg_line2{
    width:100%;
    float: left;
    margin-bottom:3.6rem;
  }
  .msg_line1{
    margin-top:1.7rem;
    margin-bottom:1.7rem;
    font-size:1.2rem;
    color:#868686;
  }
  .ling1_left,.line1_right{
    float: left;
    width:18.1rem;
  }
  .ling1_left{
    text-align: right;
    margin-right:0.5rem;
  }
  .line1_right{
    text-align: left;
    margin-left:0.5rem;
  }
  .line2_left,.line2_right{
    float: left;
  }
  .line2_left{
    margin-left:0.8rem;
    width:4rem;
    height:4rem;
    background:url("../../assets/images/logo.png") no-repeat;
    background-size: 100%;
    border-radius: 1rem;
  }
  .line2_right{
    margin-left:1.5rem;
    position:relative;
    max-width: 23.75rem;
    border-radius: 6px;
    border:1px solid #d8d8d8;
  }
  .leftsanjiao{
    position:absolute;
    top:0.8rem;
    left:-0.7rem;
    width: 0;
    height: 0;
    border-top: 0.7rem solid transparent;
    border-right: 1.4rem solid #fff;
    border-bottom: 0.7rem solid transparent;
  }
  .msg_words{
    padding: 0.8rem;
    top:0;
    left:0.7rem;
    background:#fff;
    border-radius: 6px;
    font-size: 1.6rem;
    color:#252525;
    line-height: 2.9rem;
    text-align: left;
  }
  /*用户消息样式开始*/
  .usermsg{
    width:100%;
    position:relative;
    margin-bottom:3.6rem;
    color:#252525;
    font-size:1.2rem;
    overflow: auto;
  }
  .user_words,.user_logo{
    float: right;
  }
  .user_logo{
    margin-right:0.8rem;
    width:4.3rem;
    height:4.3rem;
    background:url("../../assets/images/weixinBig.png") no-repeat;
    background-size: 100%;
    border-radius: 1rem;
  }
  .rightsanjiao{
    position:absolute;
    top:1rem;
    right:5.4rem;
    width: 0;
    height: 0;
    border-top: 0.7rem solid transparent;
    border-left: 1.4rem solid #f9be00;
    border-bottom: 0.7rem solid transparent;
  }
  .user_words{
    padding: 0.8rem;
    left:0.7rem;
    background:#f9be00;
    border-radius: 6px;
    font-size: 1.6rem;
    color:#252525;
    line-height: 2.2rem;
    text-align: left;
    margin-right:1.4rem;
    max-width: 23.75rem;
  }
  .usermsgmore{
    width:100%;
    font-size:1.2rem;
    color:#f9be00;
    margin-bottom: 1.5rem;
    margin-top:0.6rem;
    position: fixed;
    top:5.1rem;
  }

  /*用户消息样式结束*/
  /*底部输入框样式开始*/
  .msg_input_box{
    position:fixed;
    bottom:0;
    width:100%;
    z-index: 1;
    height:4.9rem;
    border-top:1px solid #cdcdcd;
    background:#fff;
    transition: .3s;
  }
  .msg_input_box input{
    float: left;
  }
  .msg_input_box div {
    width:2.8rem;
    height:2.8rem;
  }
  .expression_box,.camera_box{

    float: left;
    margin-top:1.1rem;
  }
  .speaking_box{
    background:url("../../assets/images/speaking.png") no-repeat;
    margin-left:0.8rem;

  }
  .expression_box{
    background:url("../../assets/images/expression.png") no-repeat;
    margin-left:0.6rem;
    background-size:100%;
  }
  .msg_input_box .camera_box{
    background:url("../../assets/images/camera.png") no-repeat;
    width:2.8rem;
    height:2.1rem;
    margin-top:1.25rem;
    margin-left:0.6rem;
    background-size:100%;
  }
  .msg_input{
    width:28.8rem;
    height:3.6rem;
    border:1px solid #868686;
    border-radius: 10px;
    margin-top:0.6rem;
    margin-left:0.6rem;
    padding-left:0.8rem;
    font-size: 1.4rem;
  }
  .id_box{
    display:none;
  }
  /*底部输入框样式结束*/
  .input{

    width:96%;
    height:30rem;
    position:fixed;
    bottom:0;
    left:2%;
    border:1px solid red;
    z-index:1000;
    display: none;
  }

  #file{
    opacity:0;
    width:100%;
    height:100%;
  }
  .qqFaceIm{
    width: 2rem
  }

</style>
