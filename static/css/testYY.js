function initYYIM() {
  //客服id
  _serivceId=$("#serviceId");
  //用户id
  _userId=$("#userId").val(window.localStorage.getItem('userId'));
  WangDeCommodityId=window.localStorage.getItem('WangDeCommodityId');
  if (_userId.val()){
    initHDPSDK()
  }
}
function  initHDPSDK() {
   YYIMChat.initSDK('wk_hdp_test','wangku2017');//测试环境是wk_hdp，正式环境是wk_hdp_test！！！！！！！！！！！！！
  WKYYIMManager.getInstance().init(_userId.val());
  YYIMChat.init({
    onOpened :  WKYYIMManager.getInstance().onOpened, // 登录成功
    onClosed : WKYYIMManager.getInstance().onClosed, // 连接关闭
    onAuthError : WKYYIMManager.getInstance().onAuthError, // 认证失败
    onStatusChanged :  WKYYIMManager.getInstance().onStatusChanged, //连接状态改变
    onConnectError :  WKYYIMManager.getInstance().onConnectError, // 连接错误
    onReceipts :  MsgManager.getInstance().onReceipts, // 接收到消息回执
    onTextMessage :  MsgManager.getInstance().onTextMessage, // 接收到文本(表情)消息
    onPictureMessage :  MsgManager.getInstance().onPictureMessage, // 接收到图片
    onAudoMessage : MsgManager.getInstance().onAudoMessage, //接收到语音消息
  });
}


/**
 * 主模块
 * @constructor
 */
function WKYYIMManager(){}

WKYYIMManager.getInstance = function () {
  if(!this._instance){
    this._instance = new WKYYIMManager();
  }
  return this._instance;
};
WKYYIMManager.prototype.init = function (userId) {
  WKYYIMManager.getInstance().login(userId);
};
WKYYIMManager.prototype.initYYIM = function () {
  initYYIM();
};

WKYYIMManager.prototype.login = function (userId){
  $.ajax({
    type: "GET",
    async: true,
    data: {userId:userId},
    url: HOST_HDBMESSAGE+"/msg/getUserToken",
    dataType: "text",
    jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
    success: function (data) {
      YYIMChat.login(userId,data);
      var getServiceUrl=HOST_HDBMESSAGE+"/msg/getService?userId="+userId+"";
      if(WangDeCommodityId){
        getServiceUrl = getServiceUrl+"&commodityId="+WangDeCommodityId;
      }
      $.get(getServiceUrl, function(result){
        $("#serviceId").val(result);
        window.localStorage.setItem("serviceId",result);
      });
    },
    error: function () {
      console.log("获取用户token失败");
      return false;
    }
  });
}
WKYYIMManager.prototype.getHistoryMessage = function (start,size) {
  YYIMChat.getHistoryMessage({
    id:_serivceId.val(),
    chatType:"chat",
    start:start,
    num:size,
    success:function (args) {
      console.log('000',args.count)
      console.log('111',JSON.stringify(args))
      console.log('222',start)
      var fileBox = document.getElementById("fileBox");
      if (fileBox&&!document.getElementById("file")){
        var inputOther=document.createElement('input')
        inputOther.type='file'
        inputOther.accept="image/*"
        inputOther.id="file"
        inputOther.name="file"
        inputOther.className='noshow'
        fileBox.appendChild(inputOther)
        inputOther.addEventListener('change',function () {
          let serviceId = window.localStorage.getItem('serviceId')
          MsgManager.getInstance().sendPic(serviceId)
        });
      }
      for(var c=0;c<args.result.length;c++){
        var showtime= args.result[0].dateline
        var newtime=new Date(showtime)
        let year=newtime.getFullYear();
        let month=newtime.getMonth()+1;
        let day=newtime.getDate()
        let  hours=newtime.getHours()
        let minutes=newtime.getMinutes()
        let seconds=newtime.getSeconds()
        if (month<10){
          month='0'+month;
        }
        if (day<10){
          day='0'+day
        }
        if (hours<10){
          hours='0'+hours
        }
        if (minutes<10){
          minutes='0'+minutes
        }
        if (seconds<10){
          seconds='0'+seconds
        }
        var b=this.lastTimeUser=year +'-'+month+'-'+day+' '+ hours+':'+minutes+':'+seconds
      }

      var imgHead=window.localStorage.getItem('imgHead')
      if (start>=args.count){
        return
      }
      if (start==0&&size ==2){
        for (let i=0;i<args.result.length;i++){
          if(args.result[i].contentType==8){
            window.localStorage.setItem('lastContent',"图片")
          }else{
            window.localStorage.setItem('lastContent',args.result[i].body.content)
          }
          window.localStorage.setItem('lastTimeUser',args.result[i].dateline)
          break;
        }
        let time=new Date(parseInt(window.localStorage.getItem('lastTimeUser')))
        var lastContent=window.localStorage.getItem('lastContent')
        $("#msg_lastContent").text(lastContent);
        if (window.localStorage.getItem('lastTimeUser')){

          let year=time.getFullYear();
          let month=time.getMonth()+1;
          let day=time.getDate()
          let  hours=time.getHours()
          let minutes=time.getMinutes()
          let seconds=time.getSeconds()
          if (month<10){
            month='0'+month;
          }
          if (day<10){
            day='0'+day
          }
          if (hours<10){
            hours='0'+hours
          }
          if (minutes<10){
            minutes='0'+minutes
          }
          if (seconds<10){
            seconds='0'+seconds
          }
          var a=this.lastTimeUser=year +'-'+month+'-'+day+' '+ hours+':'+minutes+':'+seconds
          $("#msg_lastContent_time").text(a);
        }
        let history=args.result
        if($(".center_msg_box > div").size()>=3){

          return;
        }
        putMsg(history,b)
      }else{
        let history=args.result
        putMsg(history,b)
      }
    }
  });
}

function putMsg(history,time) {
  var center_msg_box=document.getElementsByClassName('center_msg_box')[0]
  center_msg_box.scrollTop= center_msg_box.scrollHeight;
  let showTime=document.createElement("div")
  showTime.className='showtime'
  showTime.innerHTML=time
  if (center_msg_box){
    let first=center_msg_box.children[0]
    center_msg_box.insertBefore(showTime,first)
    center_msg_box.scrollTop= center_msg_box.scrollHeight;
  }else{
    center_msg_box.appendChild(showTime)
    center_msg_box.scrollTop= center_msg_box.scrollHeight;
  }

  for (let i=0;i<history.length;i++){
    if (history[i].fromId==$("#userId").val()){
      var msgbox=document.getElementById('msgBox')
      let first=msgbox.children[1]
      let msgboxotherright=document.createElement('div')
      msgboxotherright.className='msg_box_other_right'
      msgbox.insertBefore( msgboxotherright,first)
      let new_right_img=document.createElement('img')
      new_right_img.className='new_right_img'
      if (window.localStorage.getItem('imgHead')){
        new_right_img.src=window.localStorage.getItem('imgHead')
      }else{
        new_right_img.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
      }
      msgboxotherright.appendChild(new_right_img)
      let new_right_saojian=document.createElement('div')
      new_right_saojian.className='new_right_saojian'
      msgboxotherright.appendChild(new_right_saojian)


      if (history[i].contentType==8) {
        var newrightimg=document.createElement("img")
        newrightimg.className='new_right_words2'
        newrightimg.src=history[i].body.content.path
        msgboxotherright.appendChild( newrightimg)
      }else{
        let  new_right_words=document.createElement('div')
        new_right_words.className='new_right_words'
        new_right_words.innerHTML=$.emotionsToHtml(history[i].body.content)
        msgboxotherright.appendChild( new_right_words)
      }
      let  clear=document.createElement('div')
      clear.className='clear'
      msgboxotherright.appendChild(clear)
    }else{
      var msgbox=document.getElementById('msgBox')
      let first=msgbox.children[1]
      let msgBoxOther=document.createElement("div")
      msgBoxOther.className='msg_box_other'
      msgbox.insertBefore(msgBoxOther,first)
      let newleftImg=document.createElement("img")
      newleftImg.className='new_left_img'
      newleftImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
      msgBoxOther.appendChild(newleftImg)
      let newleftsaojian=document.createElement("div")
      newleftsaojian.className='new_left_saojian'
      msgBoxOther.appendChild( newleftsaojian)
      if (history[i].contentType==8){

        let newleftimg=document.createElement("img")
        newleftimg.className='new_left_words2'
        newleftimg.src=history[i].body.content.path
        msgBoxOther.appendChild( newleftimg)
      }else{
        let newleftwords=document.createElement("div")
        newleftwords.className='new_left_words'
        newleftwords.innerHTML=$.emotionsToHtml(history[i].body.content);
        msgBoxOther.appendChild( newleftwords)
      }
      let clear=document.createElement("div")
      clear.className='clear'
      msgBoxOther.appendChild(clear)
    }
  }

}


WKYYIMManager.prototype.initMsgIndex = function(){
  //客服id
  _serivceId=$("#serviceId");
  WangDeCommodityId=window.localStorage.getItem('WangDeCommodityId');
  //用户id
  _userId=$("#userId").val(window.localStorage.getItem('userId'));
  if ($("#serviceId").val()==""){
    initHDPSDK();
  }
}

WKYYIMManager.prototype.initHistoryMessage = function (start,size) {
  YYIMChat.getHistoryMessage({
    id:_serivceId.val(),
    chatType:"chat",
    start:start,
    num:size,
    success:function (args) {


      for(var c=0;c<args.length;c++){

        var showtime= c[0].dateline
        var newtime=new Date(showtime)
        let year=time.getFullYear();
        let month=time.getMonth()+1;
        let day=time.getDate()
        let  hours=time.getHours()
        let minutes=time.getMinutes()
        let seconds=time.getSeconds()
        if (month<10){
          month='0'+month;
        }
        if (day<10){
          day='0'+day
        }
        if (hours<10){
          hours='0'+hours
        }
        if (minutes<10){
          minutes='0'+minutes
        }
        if (seconds<10){
          seconds='0'+seconds
        }
        var b=this.lastTimeUser=year +'-'+month+'-'+day+' '+ hours+':'+minutes+':'+seconds


      }
      var imgHead=window.localStorage.getItem('imgHead')
      // let imgSrc=window.
      if (size>=args.count){
        var moreMsg=document.getElementById('moreMsg')
        moreMsg.innerHTML='没有更多了哦！'
      }

      if (start==0&&size ==2){
        for (let i=0;i<args.result.length;i++){
          window.localStorage.setItem('lastContent',args.result[i].body.content)
          window.localStorage.setItem('lastTimeUser',args.result[i].dateline)
          break;
        }
        let time=new Date(parseInt(window.localStorage.getItem('lastTimeUser')))
        var lastContent=window.localStorage.getItem('lastContent')
        $("#msg_lastContent").text(lastContent);
        if (window.localStorage.getItem('lastTimeUser')){

          let year=time.getFullYear();
          let month=time.getMonth()+1;
          let day=time.getDate()
          let  hours=time.getHours()
          let minutes=time.getMinutes()
          let seconds=time.getSeconds()
          if (month<10){
            month='0'+month;
          }
          if (day<10){
            day='0'+day
          }
          if (hours<10){
            hours='0'+hours
          }
          if (minutes<10){
            minutes='0'+minutes
          }
          if (seconds<10){
            seconds='0'+seconds
          }
          var a=this.lastTimeUser=year +'-'+month+'-'+day+' '+ hours+':'+minutes+':'+seconds
          $("#msg_lastContent_time").text(a);
        }
      }
      let history=args.result
      for (let i=0;i<history.length;i++){
        if (history[i].fromId==$("#userId").val()){
          if (history[i].contentType==8){
            var isrc=history[i].body.content.path
            var imgHead=window.localStorage.getItem('imgHead')
            var center_msg_box=document.getElementsByClassName('center_msg_box')[0]
            // 创建用户消息最外层div
            var msgBoxOtherRight=document.createElement("div")
            msgBoxOtherRight.className='msg_box_other_right'
            center_msg_box.appendChild(msgBoxOtherRight)
            var newRightImg=document.createElement("img")
            newRightImg.className='new_right_img'
            if (window.localStorage.getItem('imgHead')){
              newRightImg.src=imgHead
            }else{
              newRightImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
            }
            msgBoxOtherRight.appendChild(newRightImg)
            var newrightsaojian=document.createElement("div")
            newrightsaojian.className='new_right_saojian'
            msgBoxOtherRight.appendChild( newrightsaojian)
            var newrightimg=document.createElement("img")
            newrightimg.className='new_right_words2'
            newrightimg.src=isrc
            msgBoxOtherRight.appendChild( newrightimg)
            var clear=document.createElement("div")
            clear.className='clear'
            msgBoxOtherRight.appendChild(clear)
            center_msg_box.scrollTop= center_msg_box.scrollHeight;
          }else{
            var msgbox=document.getElementById('msgBox')
            let first=msgbox.children[1]
            let msgboxotherright=document.createElement('div')
            msgboxotherright.className='msg_box_other_right'
            msgbox.insertBefore( msgboxotherright,first)
            let new_right_img=document.createElement('img')
            new_right_img.className='new_right_img'
            if (window.localStorage.getItem('imgHead')){
              new_right_img.src=imgHead
            }else{
              new_right_img.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
            }

            // new_right_img.src='http://img.99114.com/group1/M00/05/CE/wKgGS1iuqDGAXENcAAAW4Z_h1nw427.png'
            msgboxotherright.appendChild(new_right_img)
            let new_right_saojian=document.createElement('div')
            new_right_saojian.className='new_right_saojian'
            msgboxotherright.appendChild(new_right_saojian)

            let  new_right_words=document.createElement('div')
            new_right_words.className='new_right_words'
            new_right_words.innerHTML=$.emotionsToHtml(history[i].body.content)
            msgboxotherright.appendChild( new_right_words)
            let  clear=document.createElement('div')
            clear.className='clear'
            msgboxotherright.appendChild(clear)
          }
        }else{
          if (history[i].contentType==8){
            let center_msg_box=document.getElementsByClassName('center_msg_box')[0]
            center_msg_box.scrollTop= center_msg_box.scrollHeight;
            // 创建用户消息最外层div
            let msgBoxOther=document.createElement("div")
            msgBoxOther.className='msg_box_other'
            center_msg_box.appendChild(msgBoxOther)
            let newleftImg=document.createElement("img")
            newleftImg.className='new_left_img'
            newleftImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
            msgBoxOther.appendChild(newleftImg)
            let newleftsaojian=document.createElement("div")
            newleftsaojian.className='new_left_saojian'
            msgBoxOther.appendChild( newleftsaojian)
            let newleftimg=document.createElement("img")
            newleftimg.className='new_left_words2'
            newleftimg.src=history[i].body.content.path
            msgBoxOther.appendChild( newleftimg)
            let clear=document.createElement("div")
            clear.className='clear'
            msgBoxOther.appendChild(clear)
          }else{
            var msgbox=document.getElementById('msgBox')
            let first=msgbox.children[1]
            let msgBoxOther=document.createElement("div")
            msgBoxOther.className='msg_box_other'
            msgbox.insertBefore(msgBoxOther,first)
            let newleftImg=document.createElement("img")
            newleftImg.className='new_left_img'
            newleftImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
            msgBoxOther.appendChild(newleftImg)
            let newleftsaojian=document.createElement("div")
            newleftsaojian.className='new_left_saojian'
            msgBoxOther.appendChild( newleftsaojian)
            let newleftwords=document.createElement("div")
            newleftwords.className='new_left_words'
            newleftwords.innerHTML=$.emotionsToHtml(history[i].body.content);
            msgBoxOther.appendChild( newleftwords)
            let clear=document.createElement("div")
            clear.className='clear'
            msgBoxOther.appendChild(clear)
          }

        }
      }



    }
  });
}


/**
 * 登录成功后调用
 */
WKYYIMManager.prototype.onOpened = function () {
  YYIMChat.setPresence(); //设置上线
}

WKYYIMManager.prototype.initQQface = function(){

  $('.expression_box').qqFace({
    //id : 'facebox',
    assign:'saytext',
    path:'http://static.99114.com/static/webImUI/images/expression/default/'	//表情存放的路径
  });
  $('.expression_box').click(function(){
    var s =$('.msg_input_box').css('bottom')
    if(s!='0px'){
      $('.msg_input_box').css('bottom','0rem')
      $('#facebox').hide()
    }else{
      $('.msg_input_box').css('bottom','18rem')
      $('#facebox').show()

    }
    

  })
  $(".sub_btn").click(function(){
    var str = $("#saytext").val();
    $("#show").html(replace_em(str));
    $('.msg_input_box').css('bottom','0')
  });
  $('.sendMsg').click(function(){
    $('.msg_input_box').css('bottom','0')
    $('#facebox').hide()
  })
  $('#saytext').click(function(){
        $('.msg_input_box').css('bottom','0')
        $('#facebox').hide()
        $('#boxcontainer').scrollTop( $('#boxcontainer')[0].scrollHeight );
      var target = this;
      setTimeout(function(){
        target.scrollIntoView(true)
        
      },100)
    
  })
  $('#boxcontainer').click(function(){
    var facebox = $('#facebox')[0]
    if(facebox){
      if($.contains(facebox,e.target)){
        return false
      }
    }
    if($('#facebox').css('display')=='block'){
      $('.msg_input_box').css('bottom','0')
      $('#facebox').hide()
    }
    
  })
  $(document).click(function(e){
    var facebox = $('#facebox')[0]
    if(facebox){
      if($.contains(facebox,e.target)){
        return false
      }
    }
    if($('#facebox').css('display')=='block'){
      $('.msg_input_box').css('bottom','0')
      $('#facebox').hide()
    }
    
  })

//查看结果
  function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../../src/assets/arclist/$1.gif" border="0" />');
    return str;
  }
}


/**
 * 退出登录
 */
WKYYIMManager.prototype.onClosed = function () {
  YYIMChat.logout();
}


/**
 * 认证失败
 */
WKYYIMManager.prototype.onAuthError = function () {
  YYIMChat.log('User AuthError');
}

/**
 * 链接状态改变
 */
WKYYIMManager.prototype.onStatusChanged = function (arg) {
  //YYIMChat.log('User StatusChanged');
  if (arg =="processing"){
    setTimeout(function(){
      WKYYIMManager.getInstance().getHistoryMessage(0,2);
    },2000)
  }
}

/**
 * 链接错误
 */
WKYYIMManager.prototype.onConnectError = function () {
  WKYYIMManager.getInstance().login(_userId.val());
}

/**
 * 好友模块
 * @constructor
 */
function RosterManager(){}

RosterManager.getInstance = function () {
  if(!this._instance){
    this._instance = new RosterManager();
  }
  return this._instance;
};

/**
 * 获取好友列表
 */
/*RosterManager.prototype.getRosterItems = function () {
 YYIMChat.getRosterItems({
 success: function(data){
 try{
 $("#userFriend").text("");
 data = JSON.parse(data);
 for(var i=0;i<data.length;i++){
 $("#userFriend").append(data[i].name+"---");
 }
 }catch(e){
 }
 }
 })
 }*/

/**
 * 消息模块
 * @constructor
 */
function MsgManager(){}

MsgManager.getInstance = function () {
  if(!this._instance){
    this._instance = new MsgManager();
  }
  return this._instance;
};


/**
 *发送接收回执
 * @param arg
 */
MsgManager.prototype.onReceipts = function (arg) {
  YYIMChat.sendReceiptsPacket(arg);

}



/**
 * 发送消息
 * @param arg
 */
//发送图片消息
MsgManager.prototype.sendPic = function (to) {
  YYIMChat.sendPic({
    fileInputId: "file", //文件域id
    to: to,        //对话人id
    type: "chat",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
    success: function (arg) {
      var isrc=arg.data.content.path
      window.localStorage.setItem('isrc',arg.data.content.path)
      var imgHead=window.localStorage.getItem('imgHead')
      var center_msg_box=document.getElementsByClassName('center_msg_box')[0]
      center_msg_box.scrollTop= center_msg_box.scrollHeight;
      // 创建用户消息最外层div
      var msgBoxOtherRight=document.createElement("div")
      msgBoxOtherRight.className='msg_box_other_right'
      center_msg_box.appendChild(msgBoxOtherRight)
      var newRightImg=document.createElement("img")
      newRightImg.className='new_right_img'
      if (window.localStorage.getItem('imgHead')){
        newRightImg.src=imgHead
      }else{
        newRightImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
      }
      msgBoxOtherRight.appendChild(newRightImg)
      var newrightsaojian=document.createElement("div")
      newrightsaojian.className='new_right_saojian'
      msgBoxOtherRight.appendChild( newrightsaojian)
      var newrightimg=document.createElement("img")
      newrightimg.className='new_right_words2'
      newrightimg.src=isrc
      msgBoxOtherRight.appendChild( newrightimg)
      var clear=document.createElement("div")
      clear.className='clear'
      msgBoxOtherRight.appendChild(clear)
      console.log('图片发送成功')


    } //成功回调函数

  });
}
MsgManager.prototype.sendMessage = function (content,to,contentType) {
  sendFlag=false;
  $.ajax({
    type : "POST",
    async:true,
    url :HOST_HDBMESSAGE+ "/msg/sendMsg",
    data:JSON.stringify({content:content,contentType:contentType,from:_userId.val(),to:to,service:_serivceId.val()}),
    contentType: "application/json", //必须有
    async:true,
    dataType : "text",
    success : function(data){
      var imgHead=window.localStorage.getItem('imgHead')
      var center_msg_box=document.getElementsByClassName('center_msg_box')[0]

      // 创建用户消息最外层div
      var msgBoxOtherRight=document.createElement("div")
      msgBoxOtherRight.className='msg_box_other_right'
      center_msg_box.appendChild(msgBoxOtherRight)
      var newRightImg=document.createElement("img")
      newRightImg.className='new_right_img'
      if (window.localStorage.getItem('imgHead')){
        newRightImg.src=imgHead
      }else{
        newRightImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
      }
      msgBoxOtherRight.appendChild(newRightImg)
      var newrightsaojian=document.createElement("div")
      newrightsaojian.className='new_right_saojian'
      msgBoxOtherRight.appendChild( newrightsaojian)
      var newrightwords=document.createElement("div")
      newrightwords.className='new_right_words'
      newrightwords.innerHTML=$.emotionsToHtml(content)
      msgBoxOtherRight.appendChild( newrightwords)
      var clear=document.createElement("div")
      clear.className='clear'
      msgBoxOtherRight.appendChild(clear)
      center_msg_box.scrollTo= center_msg_box.scrollHeight
      $('#boxcontainer').scrollTop( $('#boxcontainer')[0].scrollHeight );
      console.log("发送信息成功");
      sendFlag=true;
    },
    complete: function(){
      console.log("发送信息完成");
    },
    error:function(){
      console.log("发送信息失败");
    }
  });
}
/**
 * 接收到文本(表情)消息
 * @param arg
 */
MsgManager.prototype.onTextMessage = function (arg) {
  let center_msg_box=document.getElementsByClassName('center_msg_box')[0]
  center_msg_box.scrollTop= center_msg_box.scrollHeight;
  // 创建用户消息最外层div
  let msgBoxOther=document.createElement("div")
  msgBoxOther.className='msg_box_other'
  center_msg_box.appendChild(msgBoxOther)
  let newleftImg=document.createElement("img")
  newleftImg.className='new_left_img'
  newleftImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
  msgBoxOther.appendChild(newleftImg)
  let newleftsaojian=document.createElement("div")
  newleftsaojian.className='new_left_saojian'
  msgBoxOther.appendChild( newleftsaojian)
  let newleftwords=document.createElement("div")
  newleftwords.className='new_left_words'
  newleftwords.innerHTML=$.emotionsToHtml(arg.data.content)
  msgBoxOther.appendChild( newleftwords)
  let clear=document.createElement("div")
  clear.className='clear'
  msgBoxOther.appendChild(clear)

}

/**
 * 接收到图片
 * @param arg
 */
MsgManager.prototype.onPictureMessage = function (arg) {
  let center_msg_box=document.getElementsByClassName('center_msg_box')[0]

  // 创建用户消息最外层div
  let msgBoxOther=document.createElement("div")
  msgBoxOther.className='msg_box_other'
  center_msg_box.appendChild(msgBoxOther)
  let newleftImg=document.createElement("img")
  newleftImg.className='new_left_img'
  newleftImg.src='http://img.99114.com/group1/M00/A5/BF/wKgGMFjM1GWAQR9JAAAT_QRrDQc768.png'
  msgBoxOther.appendChild(newleftImg)
  let newleftsaojian=document.createElement("div")
  newleftsaojian.className='new_left_saojian'
  msgBoxOther.appendChild( newleftsaojian)
  let newleftimg=document.createElement("img")
  newleftimg.className='new_left_words2'
  newleftimg.src=arg.data.content.path
  msgBoxOther.appendChild( newleftimg)
  let clear=document.createElement("div")
  clear.className='clear'
  msgBoxOther.appendChild(clear)
  center_msg_box.scrollTop= center_msg_box.scrollHeight;
}
/**
 * 接收到语音
 * @param arg
 */
MsgManager.prototype.onAudoMessage = function (arg) {
  $("#userReceiveMsg").append("<audio src='' controls='controls'></audio>");
}
