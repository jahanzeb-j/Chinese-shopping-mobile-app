webpackJsonp([7],{"3kfU":function(n,e){n.exports={render:function(){var n=this,e=n.$createElement;n._self._c;return n._m(0)},staticRenderFns:[function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"bk"}),n._v(" "),t("div",{staticClass:"successImg"}),n._v(" "),t("h3",{staticClass:"successTip"},[n._v("恭喜~ 签到成功啦！")]),n._v(" "),t("div",{staticClass:"banner"})])}]}},"5PDV":function(n,e,t){n.exports=t.p+"static/img/successAct.97159d0.png"},Psff:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("WjWA"),r=(t("ZoQJ"),t("I3G/"));t.n(r);e.default={data:function(){return{}},mounted:function(){this.wechatShare()},methods:{wechatShare:function(){new i.a("网库好单品123","","网库好单品12")}}}},QYE2:function(n,e,t){n.exports=t.p+"static/img/registerAct.65ba353.png"},S437:function(n,e,t){var i=t("p5u2");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("55d6547b",i,!0)},WjWA:function(n,e,t){"use strict";t.d(e,"a",function(){return c});var i=t("Zrlr"),r=t.n(i),a=t("wxAW"),o=t.n(a),c=function(){function n(){r()(this,n)}return o()(n,[{key:"getSignature",value:function(n,e,t,i,r){window.location.href.split("#")[0];i=i||window.location.href;var a=HOST_HDPUSER+"/weixin/getSignature",o=Math.random().toString(36).substr(2),c=(new Date).getTime().toString().substr(0,10);this.$api_get_no({url:a,data:{url:"http://m.haodanpin.com/",nonceStr:o,timestamp:c}}).then(function(n){if(200==n.code){console.log(n);var e=n.signature;wx.config({appId:"wxa7187fa65b31924e",timestamp:c,nonceStr:o,signature:e,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"]})}else console.log("获取签名失败")}),wx.ready(function(){wx.onMenuShareAppMessage({zttitle:n,desc:t,link:i,imgUrl:e,type:"link",success:function(){r()}}),wx.onMenuShareTimeline({zttitle:n,link:i,imgUrl:e,cancel:function(){}})})}},{key:"changeShareContent",value:function(n,e,t,i){i=i||window.location.href,wx.onMenuShareAppMessage({zttitle:n,desc:t,link:i,imgUrl:e,type:"link"}),wx.onMenuShareTimeline({zttitle:n,link:i,imgUrl:e,cancel:function(){}})}}]),n}()},Zrlr:function(n,e,t){"use strict";e.__esModule=!0,e.default=function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}},p5u2:function(n,e,t){e=n.exports=t("FZ+f")(),e.push([n.i,"\n.bk[data-v-222df1bd]{\n    width:100%;\n    height:20rem;\n    background:url("+t("QYE2")+") no-repeat;\n    background-size: contain;\n}\n.successImg[data-v-222df1bd]{\n  height:14.85rem ;\n  background:url("+t("5PDV")+") no-repeat center;\n  background-size: contain;\n}\n.successTip[data-v-222df1bd]{\n    font-size: 2.25rem;\n    height:5.85rem;\n    line-height:5.85rem;\n   \n    color:#fb2c2c;\n    text-align: center;\n    font-weight: bold;\n}\n.bannerTip[data-v-222df1bd]{\n    font-size:1.2rem;\n    height:4.8rem;\n    line-height:4.8rem;\n    color:#424242;\n    font-family: '\\6977\\4F53';\n}\n.banner[data-v-222df1bd]{\n    margin:0 3rem;\n    box-sizing: border-box;\n    background:#fb2c2c;\n    \n    height: 14.4rem;\n}\n",""])},wxAW:function(n,e,t){"use strict";e.__esModule=!0;var i=t("C4MV"),r=function(n){return n&&n.__esModule?n:{default:n}}(i);e.default=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,r.default)(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}()},y2Gm:function(n,e,t){t("S437");var i=t("VU/8")(t("Psff"),t("3kfU"),"data-v-222df1bd",null);n.exports=i.exports}});