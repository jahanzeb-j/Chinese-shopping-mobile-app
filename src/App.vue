<template>
	<div id="app">
		<keep-alive :include="/index|classifyIndex|themeIndex|messageIndex/">
			<router-view></router-view>
		</keep-alive>
		<bottomTab v-show='isShowBottom'></bottomTab>

	</div>
</template>

<script>
import bottomTab from "./component/bottomTab.vue";

import getGlobalConfig from "./globalConfig";
import Vue from "vue";
export default {
  name: "app",
  beforeCreate() {
    getGlobalConfig();
    // 后端接口 数据fix
    const urlArray = ["moduleResources/moduleList"];

    Vue.http.interceptors.push((request, next) => {
      const isIncluded = urlArray.some(item => request.url.match(item));
      const urlFrg = SETDOMAIN == "com" ? "m." : "mtest.";

      if (isIncluded) {
        next(response => {
          response.body.forEach(item => {
            if (item.title && item.title.titleLinkAddress) {
              item.title.titleLinkAddress = item.title.titleLinkAddress.replace(
                /www./,
                urlFrg
              );
            }
            item.content.forEach(item => {
              item.contentLinkAddress = item.contentLinkAddress.replace(
                /www./,
                urlFrg
              );
            });
          });
          return response;
        });
      } else {
        next(response => {
          return response;
        });
      }
    });
  },
  data() {
    return {
      navPath: [
        "/found_index",
        "/messageIndex",
        "/themeIndex",
        "/classifyIndex",
        "/myIndex",
        "/lookIndex"
      ],
      showBox: true

      // isShowBottom: true,
    };
  },
  computed: {
    isShowBottom() {
      console.log(this.$route.path);
      return this.navPath.some(item => item == this.$route.path);
    }
  },
  components: {
    bottomTab
  },
  mounted() {
    // 初始化
    // console.log(!this.$route.query.v)
    // if(this.$route.query.v){
    //   var vConsole = new VConsole();

    // }

    const script = document.createElement("script");
    script.src =
      "https://s19.cnzz.com/z_stat.php?id=1273200538&web_id=1273200538";
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  watch: {
    // $route(val){
    //   this.isShowBottom = this.navPath.some(item => item == this.$route.path)
    // }
    $route() {
      var _czc = _czc || [];
      //绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
      // _czc.push(["_setAccount", "1273200538"]);
      // _czc.push(["_trackPageview", "/#/good_detail?commodityId=this.$route.query.commodityId&found_index=1"]);
      // _czc.push(["_trackEvent", "H5好单品商品详情", "点击"]);
      // _czc.push(["_setCustomVar", "是否登录", "是、否", "-1"]);
      if (window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        // window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    }
  }
};
</script>

<style>
#app {
  font-family: PingFang SC, Microsoft JhengHei, "Avenir", Helvetica, sans-serif,
    "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.wH1190 {
  width: 1190px;
  margin: 0 auto;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.floatL {
  float: left;
}

.floatR {
  float: right;
}
/* 保存中spin的样式 */

.mint-indicator-text {
  font-size: 40px !important;
}

.mint-spinner-fading-circle {
  width: 100px !important;
  height: 120px !important;
}
</style>