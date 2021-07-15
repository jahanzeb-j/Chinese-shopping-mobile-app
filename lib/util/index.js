import _getIterator from 'babel-runtime/core-js/get-iterator';
import CryptoJS from "crypto-js";

function _getUrlParam(ctx) {
  var urlParams = window.location.href;
  var index = urlParams.indexOf('?');
  ctx.urlRemain = urlParams.substring(index + 1, urlParams.length);
}

function setHttpInterceptors(Vue, loginCode) {
  var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


  loginCode = loginCode || window.localStorage.getItem('loginCode');

  if (reset) {
    Vue.http.interceptors = ["before", "method", "jsonp", "json", "form", "header", "cors"];
  }

  Vue.http.interceptors.push(function (request, next) {
    request.headers.set('loginCode', loginCode);
    next(function (response) {
      return response;
    });
  });
}

function replaceSpecifyAttr(Obj, attr) {
  var isAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return Obj.length;
}

function debounce(fn, delay) {
  var _this = this,
      _arguments = arguments;

  var timer = void 0;
  return function () {
    timer = null;
    timer = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, delay);
  };
}

function throttle(fn, delay) {
  var _this2 = this,
      _arguments2 = arguments;

  var prevTime = void 0,
      currentTime = void 0;

  return function () {
    currentTime = new Date().getTime();
    if (!prevTime) {
      prevTime = new Date().getTime();
      fn.apply(_this2, _arguments2);
    }
    if (currentTime - prevTime > delay) {
      prevTime = currentTime;
      fn.apply(_this2, _arguments2);
    }
  };
}

function encrypt(k, v, s) {
  var key = CryptoJS.enc.Utf8.parse(k);
  var iv = CryptoJS.enc.Utf8.parse(v);
  var srcs = CryptoJS.enc.Utf8.parse(s);

  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC });
  return encrypted.toString();
}

export var alert_msg = function alert_msg(param) {
  var str = '<div id="alertMsgBox" style="\n      width: 28rem;\n      height: 5rem;\n      background: #000;\n      opacity: 0.6;\n      position: fixed;\n      z-index:3000;\n      top: calc(50% - 2.5rem);\n      left: calc(50% - 14rem);\n      line-height: 5rem;\n      border-radius: 0.25rem;\n      text-align: center;\n      font-size: 1.4rem;\n      color: #fff;\n      font-family: Microsoft YaHei;">' + param + '</div>';
  var div = document.createElement("div");
  div.innerHTML = str;
  document.body.appendChild(div);
  setTimeout(function () {
    document.body.removeChild(div);
  }, 2000);
};

export var _setTitle = function _setTitle(t) {
  document.title = t;
  var i = document.createElement('iframe');

  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9);
  };
  document.body.appendChild(i);
};

export var _iOSOrAndroid = function _iOSOrAndroid() {
  var u = navigator.userAgent;
  if (u.match(/(iPhone)/i)) {
    return 'iOS';
  } else {
    return 'Android';
  }
};

export var _isWechat = function _isWechat() {
  var ua = navigator.userAgent.toLowerCase();
  var isWeixin = ua.indexOf('micromessenger') != -1;
  if (isWeixin) {
    return true;
  } else {
    return false;
  }
};

export var _isFix = function _isFix(str) {
  return str.replace(/(\S+)(\?\S+)(#\/\w+)/g, '$1$3');
};

export var _deviceType = function _deviceType() {
  var u = navigator.userAgent;
  var type = [{ type: 'weChat', sign: ['MicroMessenger'] }, { type: 'weiBo', sign: ['Weibo'] }, { type: 'MQQBrowser', sign: ['MQQBrowser'] }, { type: 'UCWEB', sign: ['UCWEB'] }, { type: 'iosBrowser', sign: ['iPhone', 'Version'] }, { type: 'iPadBrowser', sign: ['iPad', 'Version'] }, { type: 'androidApp', sign: ['Android', 'Version'] }, { type: 'iosApp', sign: ['iPhone'] }, { type: 'iPadApp', sign: ['iPad'] }, { type: 'androidBrowser', sign: ['Android'] }];
  var temp = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(type), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (value.sign.every(function (e) {
        return u.indexOf(e) > -1;
      })) {
        temp = value.type;
        return value.type;
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (temp === '') {
    return 'androidBrowser';
  }
};
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
export var formatDate = {
  format: function format(date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
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

  parse: function parse(dateString, pattern) {
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
};

export { _getUrlParam, setHttpInterceptors, replaceSpecifyAttr, throttle, debounce, encrypt };