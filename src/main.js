// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import('./globalBasicData.js')
import VueResource from 'vue-resource'
// import mintUi from 'mint-ui'
import {router} from './router/index.js'
import "mint-ui/lib/style.css"
import './assets/js/rem.js'
import {alert_msg} from './util/index.js'
import { api_get, api_post ,api_get_no, _isLogin,api_post_no} from './util/api.js'
Vue.use(VueResource);
// Vue.use(mintUi);
// 单独注册，减小打包体积
import { InfiniteScroll,Toast ,Swipe, SwipeItem,Loadmore ,MessageBox ,Header ,Spinner ,Button ,Popup,Indicator,  } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Header.name, Header);
Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(MessageBox.name, MessageBox);
Vue.use(InfiniteScroll);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/img/nullImg.png',
  loading: 'static/img/nullImg.png',
  attempt: 1
})

/* eslint-disable no-new */
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
Vue.prototype.$alert_msg = alert_msg
Vue.prototype.$api_get = api_get
Vue.prototype.$api_get_no = api_get_no
Vue.prototype.$api_post = api_post
Vue.prototype.$api_post_no = api_post_no
// 防止ios手机缩放
document.addEventListener('touchstart',function (event) { 
  if(event.touches.length>1){ 
    event.preventDefault(); 
  } 
}) 
var lastTouchEnd=0; 
document.addEventListener('touchend',function (event) { 
  var _now=(new Date()).getTime(); 
  if(_now-lastTouchEnd<=500){ 
    event.preventDefault(); 
  } 
  lastTouchEnd=_now; 
},false)

Vue.http.interceptors.push((request, next) => {  
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值  
  let loginCode=localStorage.getItem('loginCode')
  if (loginCode) {  
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行  
    request.headers.set('loginCode', loginCode)
  }  
  if(request.method == 'POST' || request.method == 'post'){
    request.headers.set('content-Type', 'application/json;charset=UTF-8')
  }
  next((response) => {  
    return response
  })
})

let link = window.location.href
if(link.indexOf('hashPath') > -1){
  if(link.indexOf('?') > -1){
    window.location.href = 'http://' + window.location.host + '/#/' + link.split('hashPath=')[1].split('#')[0]
  }else{
    // 防止问号丢失的情况，应该不会出现
    let host = 'http://' + window.location.host + '/#/'
    let path = link.split('hashPath=')[1].split('&')[0]
    let query = link.split('hashPath=')[1].split('&').shift().join('&')
    window.location.href = host + path + '?' + query
  }
  
}
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  render: h => h(App),
  components: { App }
})
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
