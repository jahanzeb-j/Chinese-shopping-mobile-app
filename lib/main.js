import _default18 from 'mint-ui/lib/infinite-scroll/style.css';
import _default17 from 'mint-ui/lib/infinite-scroll';
import _default16 from 'mint-ui/lib/message-box/style.css';
import _default15 from 'mint-ui/lib/message-box';
import _default14 from 'mint-ui/lib/popup/style.css';
import _default13 from 'mint-ui/lib/popup';
import _default12 from 'mint-ui/lib/button/style.css';
import _default11 from 'mint-ui/lib/button';
import _default10 from 'mint-ui/lib/spinner/style.css';
import _default9 from 'mint-ui/lib/spinner';
import _default8 from 'mint-ui/lib/header/style.css';
import _default7 from 'mint-ui/lib/header';
import _default6 from 'mint-ui/lib/loadmore/style.css';
import _default5 from 'mint-ui/lib/loadmore';
import _default4 from 'mint-ui/lib/swipe-item/style.css';
import _default3 from 'mint-ui/lib/swipe-item';
import _default2 from 'mint-ui/lib/swipe/style.css';
import _default from 'mint-ui/lib/swipe';

import Vue from 'vue';

import App from './App';
import('./globalBasicData.js');
import VueResource from 'vue-resource';

import { router } from './router/index.js';
import "mint-ui/lib/style.css";
import './assets/js/rem.js';
import { alert_msg } from './util/index.js';
import { api_get, api_post, api_get_no, _isLogin, api_post_no } from './util/api.js';
Vue.use(VueResource);

Vue.component(_default.name, _default);
Vue.component(_default3.name, _default3);
Vue.component(_default5.name, _default5);
Vue.component(_default7.name, _default7);
Vue.component(_default9.name, _default9);
Vue.component(_default11.name, _default11);
Vue.component(_default13.name, _default13);
Vue.component(_default15.name, _default15);
Vue.use(_default17);

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/img/nullImg.png',
  loading: 'static/img/nullImg.png',
  attempt: 1
});

Vue.directive('focus', {
  inserted: function inserted(el) {
    el.focus();
  }
});
Vue.prototype.$alert_msg = alert_msg;
Vue.prototype.$api_get = api_get;
Vue.prototype.$api_get_no = api_get_no;
Vue.prototype.$api_post = api_post;
Vue.prototype.$api_post_no = api_post_no;

document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var _now = new Date().getTime();
  if (_now - lastTouchEnd <= 500) {
    event.preventDefault();
  }
  lastTouchEnd = _now;
}, false);

Vue.http.interceptors.push(function (request, next) {
  var loginCode = localStorage.getItem('loginCode');
  if (loginCode) {
    request.headers.set('loginCode', loginCode);
  }
  if (request.method == 'POST' || request.method == 'post') {
    request.headers.set('content-Type', 'application/json;charset=UTF-8');
  }
  next(function (response) {
    return response;
  });
});

var link = window.location.href;
if (link.indexOf('hashPath') > -1) {
  if (link.indexOf('?') > -1) {
    window.location.href = 'http://' + window.location.host + '/#/' + link.split('hashPath=')[1].split('#')[0];
  } else {
    var host = 'http://' + window.location.host + '/#/';
    var path = link.split('hashPath=')[1].split('&')[0];
    var query = link.split('hashPath=')[1].split('&').shift().join('&');
    window.location.href = host + path + '?' + query;
  }
}
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  render: function render(h) {
    return h(App);
  },
  components: { App: App }
});