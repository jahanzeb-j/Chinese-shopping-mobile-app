webpackJsonp([6],{N6O3:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("ZoQJ");e.default={data:function(){return{text:"下载好单品APP",willShow:!1,touchUrl:HREF,downloadUrl:"/#/guide",getAppUrl:"",wechat:!0,deviceType:"",openAppUrl:""}},mounted:function(){var t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,e=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;this.$refs.mask.style.height=e+"px",this.$refs.mask.style.width=t+"px",this.deviceType=Object(i.c)(),"Android"===this.deviceType?(this.getAppUrl=HOST_APPMANAGE+"/version/getHdpAndriodUrl",this.openAppUrl="goodproduct://splash.app"):"iOS"===this.deviceType&&(this.getAppUrl=HOST_APPMANAGE+"/version/getHdpIOSUrl",this.openAppUrl="https://itunes.apple.com/us/app/Hao-Dan-Pin/id1118815448?l=zh&ls=1&mt=8"),this.isWeixin(),this.wechat||this.openApp(this.openAppUrl)},methods:{isWeixin:function(){"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?this.wechat=!0:this.wechat=!1,this.getAppDownloadUrl()},down:function(){"iOS"===this.deviceType?this.openApp(this.openAppUrl):this.willShow=this.wechat},maskClick:function(){this.willShow=!1},getAppDownloadUrl:function(){var t=this;this.$api_get_no({url:this.getAppUrl}).then(function(e){t.downloadUrl=e.respBody})},openApp:function(t){var e=document.createElement("iframe");e.setAttribute("src",t),e.style.display="none",e.onload=function(){setTimeout(function(){e.remove()},90)},document.body.appendChild(e)}}}},PJDv:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"g-bd",attrs:{id:"g-bd"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),t.wechat||"iOS"===this.deviceType?t._e():n("a",{staticClass:"btn",attrs:{href:t.downloadUrl,download:"网库好单品.apk"},domProps:{textContent:t._s(t.text)}}),t._v(" "),t.wechat||"iOS"!==this.deviceType?t._e():n("a",{staticClass:"btn",attrs:{href:t.downloadUrl},domProps:{textContent:t._s(t.text)}}),t._v(" "),t.wechat?n("div",{staticClass:"btn",domProps:{textContent:t._s(t.text)},on:{click:t.down}}):t._e(),t._v(" "),n("div",{staticClass:"browser"},[n("a",{attrs:{href:t.touchUrl}},[t._v("\n                使用触屏版浏览>>\n            ")])])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.willShow,expression:"willShow"}],ref:"mask",staticClass:"mask",on:{click:function(e){t.maskClick()}}})])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-row"},[i("img",{attrs:{src:n("o3cl")}}),t._v(" "),i("img",{attrs:{src:n("ngSU")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"g-row"},[i("img",{attrs:{src:n("r0pN")}}),t._v(" "),i("img",{attrs:{src:n("UNN7")}})])}]}},UNN7:function(t,e,n){t.exports=n.p+"static/img/guide4.ee3b1a7.jpg"},cI9S:function(t,e,n){n("sFhl");var i=n("VU/8")(n("N6O3"),n("PJDv"),"data-v-21144c57",null);t.exports=i.exports},f6h3:function(t,e,n){e=t.exports=n("FZ+f")(),e.push([t.i,'\n.header[data-v-21144c57] {\n    width: 100%;\n}\n.header img[data-v-21144c57] {\n    width: 100%;\n}\n.g-bd[data-v-21144c57] {\n    width: 100%;\n    position: relative;\n}\n.g-row[data-v-21144c57] {\n    width: 100%;\n}\n.g-row img[data-v-21144c57] {\n    width: 100%;\n    vertical-align: text-bottom;\n}\n.btn[data-v-21144c57] {\n    position: absolute;\n    width: 18.2rem;\n    height: 5rem;\n    left: 9.85rem;\n    bottom: 25.375rem;\n    background: #000;\n    line-height: 5rem;\n    text-align: center;\n    font-size: 2rem;\n    color: #fff;\n    font-family: "Microsoft YaHei";\n    border-radius: 8px;\n}\n.browser[data-v-21144c57] {\n    position: absolute;\n    width: 13rem;\n    left: 50%;\n    margin-left: -6.5rem;\n    bottom: 22.6rem;\n}\n.browser a[data-v-21144c57] {\n    display: block;\n    color: #000;\n    font-family: "Microsoft YaHei";\n    /*font-weight: bold;*/\n    font-size: 1.4rem;\n    /*font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";*/\n}\n.mask[data-v-21144c57] {\n    position: absolute;\n    top: 0rem;\n    background: rgba(0, 0, 0, 0.8) url('+n("tYHh")+") no-repeat 2rem 2rem;\n    background-size: 33rem 12rem;\n}\n",""])},ngSU:function(t,e,n){t.exports=n.p+"static/img/guide2.a220e20.jpg"},o3cl:function(t,e,n){t.exports=n.p+"static/img/guide1.5fd6995.jpg"},r0pN:function(t,e,n){t.exports=n.p+"static/img/guide3.d38fdde.jpg"},sFhl:function(t,e,n){var i=n("f6h3");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("5d03fb62",i,!0)},tYHh:function(t,e,n){t.exports=n.p+"static/img/icon.cf1434e.png"}});