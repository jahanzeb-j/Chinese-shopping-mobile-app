import Vue from 'vue'
import routes from './routes.js'
import VueRouter from 'vue-router'
// import { _isLogin } from '../util/api.js'


Vue.use(VueRouter)




export const router =  new VueRouter({
  linkActiveClass:"active",
  routes,// （缩写）相当于 routes: routes
})
// router.beforeEach(async (to, from, next) => {
//   // 处理二次分享的链接，把转换后的path再还原回来
//   let link = window.location.href
//   if(link.indexOf('hashPath') > -1){
//     if(link.indexOf('?') > -1){
//       window.location.href = 'http://' + window.location.host + '/#/' + link.split('hashPath=')[1].split('#')[0]
//     }else{
//       // 防止问号丢失的情况，应该不会出现
//       let host = 'http://' + window.location.host + '/#/'
//       let path = link.split('hashPath=')[1].split('&')[0]
//       let query = link.split('hashPath=')[1].split('&').shift().join('&')
//       window.location.href = host + path + '?' + query
//     }
    
//   }
//   next()
// })
// route1.beforeEach((to, from, next) => {
//   window._bd_share_config = {};
//   debugger
//               wx.error(function (res) {
//                   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//               })
//               //分享到微信朋友圈
//               wx.onMenuShareTimeline({
//                   title: '123' + '-网库优选',
//                   link: window.location.href,
//                   imgUrl: '',
//                   success: function () {
//                   },
//                   cancel: function () {
//                       // 用户取消分享后执行的回调函数
//                   }
//               });
//               //分享到微信好友
//               wx.onMenuShareAppMessage({
//                   title: '123' + '-网库优选',
//                   link: window.location.href,
//                   imgUrl: '',
//                   success: function () {
//                   },
//                   cancel: function () {
//                       // 用户取消分享后执行的回调函数
//                   }
//               });
//               //分享到QQ
//               wx.onMenuShareQQ({
//                   title: '123' + '-网库优选',
//                   link: window.location.href,
//                   imgUrl: '',
//                   success: function () {
//                   },
//                   cancel: function () {
//                       // 用户取消分享后执行的回调函数
//                   }
//               });
//   next()
// })

// export { router }