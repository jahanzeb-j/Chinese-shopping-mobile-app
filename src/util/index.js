import CryptoJS from "crypto-js";

//window.sessionStorage.setItem("isShowedBox",false)
function _getUrlParam(ctx){
        var urlParams = window.location.href //获取url中"?"符后的字串
        var index = urlParams.indexOf('?')
        ctx.urlRemain = urlParams.substring(index + 1, urlParams.length)
 }

// vue resource 拦截器
function setHttpInterceptors(Vue, loginCode ,reset = true){
  
	loginCode = loginCode || window.localStorage.getItem('loginCode')

	if(reset){
		Vue.http.interceptors = ["before", "method", "jsonp", "json", "form", "header", "cors"]
	}
    
	Vue.http.interceptors.push((request, next) => {
      request.headers.set('loginCode', loginCode);
      next((response) => {
          return response
      });
  });

}


function replaceSpecifyAttr(Obj, attr, isAll = false){
  return Obj.length
}

function debounce(fn,delay){
  let timer 
  return ()=>{
    timer = null
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}

function throttle(fn, delay){
  let prevTime ,currentTime

  return ()=>{
    currentTime = new Date().getTime()
    if(!prevTime){
      prevTime = new Date().getTime()
      fn.apply(this,arguments)
    }
    if(currentTime - prevTime > delay ){
      prevTime = currentTime
      fn.apply(this,arguments)
    }
  }
}


function encrypt(k,v,s){
   let key  = CryptoJS.enc.Utf8.parse(k);  //固定公钥
   let iv   = CryptoJS.enc.Utf8.parse(v);  //密钥默认偏移量
   let srcs = CryptoJS.enc.Utf8.parse(s);  //可变的key
   
   let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC}); 
   return encrypted.toString()
}
// 弹窗
export const alert_msg = function (param) {
  /*
  *param: 提示文字
  * 返回值不带问号，请注意
  */
  var str = `<div id="alertMsgBox" style="
      width: 28rem;
      height: 5rem;
      background: #000;
      opacity: 0.6;
      position: fixed;
      z-index:3000;
      top: calc(50% - 2.5rem);
      left: calc(50% - 14rem);
      line-height: 5rem;
      border-radius: 0.25rem;
      text-align: center;
      font-size: 1.4rem;
      color: #fff;
      font-family: Microsoft YaHei;">${param}</div>`
  var div = document.createElement("div");
  div.innerHTML = str;
  document.body.appendChild(div)
  setTimeout(function() {
      document.body.removeChild(div)
  }, 2000);
}

// 设置浏览器标题 //兼容ios微信
export const _setTitle = function(t) {
  document.title = t;
  let i = document.createElement('iframe');
  // i.src = '//m.baidu.com/favicon.ico';
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function(){
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
}

// 判断ios还是android环境
export const _iOSOrAndroid = () => {
  let u = navigator.userAgent
  if(u.match(/(iPhone)/i)){
    return 'iOS'
  }else{
    return 'Android'
  }
}

// 判断是否在微信内
export const _isWechat = () => { 
  // let ua = navigator.userAgerAgent;
  // return ua.indexOf('MiMicroMessenger') > -1
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
      return true;
  }else{
      return false;
  }
}

//正则匹配分享后的url
export const _isFix=(str)=>{
  return str.replace(/(\S+)(\?\S+)(#\/\w+)/g, '$1$3');
}

// 判断浏览器类型
export const _deviceType = () => {
  let u = navigator.userAgent
  let type = [
    {type:'weChat', sign: ['MicroMessenger']},
    {type:'weiBo', sign: ['Weibo']},
    {type:'MQQBrowser', sign: ['MQQBrowser']},
    {type:'UCWEB', sign: ['UCWEB']},
    {type:'iosBrowser', sign: ['iPhone','Version']},
    {type:'iPadBrowser', sign: ['iPad','Version']},
    {type:'androidApp', sign: ['Android', 'Version']},
    {type:'iosApp', sign: ['iPhone']},
    {type:'iPadApp', sign: ['iPad']},
    {type:'androidBrowser', sign: ['Android']},
  ]
  let temp = ''
  for (let value of type) {
    // console.log(value)
    if(value.sign.every(e => u.indexOf(e) > -1)){
      temp = value.type
      return value.type
      break
    }
  }
  // 如果什么都不是，先按照安卓处理
  if(temp === ''){
    return 'androidBrowser'
  }
}
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
export const formatDate = {
  //将系统时间转化为字符时间
  format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function($0) {
          switch ($0.charAt(0)) {
              case 'y':
                  return padding(date.getFullYear(), $0.length);
              case 'M':
                  return padding(date.getMonth() + 1, $0.length);
              case 'd':
                  return padding(date.getDate(), $0.length);
              case 'w':
                  return date.getDay() + 1;
              case 'h':
                  return padding(date.getHours(), $0.length);
              case 'm':
                  return padding(date.getMinutes(), $0.length);
              case 's':
                  return padding(date.getSeconds(), $0.length);
          }
      });
  },
  //转化字符时间为系统时间
  parse: function(dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
          var _date = new Date(1970, 0, 1);
          for (var i = 0; i < matchs1.length; i++) {
              var _int = parseInt(matchs2[i]);
              var sign = matchs1[i];
              switch (sign.charAt(0)) {
                  case 'y':
                      _date.setFullYear(_int);
                      break;
                  case 'M':
                      _date.setMonth(_int - 1);
                      break;
                  case 'd':
                      _date.setDate(_int);
                      break;
                  case 'h':
                      _date.setHours(_int);
                      break;
                  case 'm':
                      _date.setMinutes(_int);
                      break;
                  case 's':
                      _date.setSeconds(_int);
                      break;
              }
          }
          return _date;
      }
      return null;
  }
}


export {
	_getUrlParam,
	setHttpInterceptors,
  replaceSpecifyAttr,
  throttle,
  debounce,
  encrypt
}
