<template>
    <div class="tab-bottom">
        <div class="tab-bottom-item">
            <router-link  to="/found_index" repalce>
                <span>
                    <img src="../assets/images/tab/zhaohuo_nor@2x.png" alt="" class="img1" >
                    <img src="../assets/images/tab/zhaohuo_sel@2x1.png" alt="" class="img1 img-active" >
                </span>
                <span class="sp1 songti">首页</span>
            </router-link>
        </div>
        <div class="tab-bottom-item" >
            <router-link  to="/classifyIndex" repalce>
                <span>
                    <img src="../assets/images/tab/fenlei_nor@2x1.png" alt="" class="img2">
                    <img src="../assets/images/tab/fenlei_sel@2x1.png" alt="" class="img-active" >
                </span>
                <span class="sp2 songti">分类</span>
            </router-link>
        </div>
        <!--<div class="tab-bottom-item img3box"  >
            <router-link  to="/themeIndex" repalce >
                <span>
                    <img src="../assets/images/tab/texuan_sel@2x.png" alt="" class="img3" :class="{active1: defaultActive}">
                    <img src="../assets/images/tab/texuan_normal@2x1.png" alt="" class="img-active msg img3" :class="{active2: defaultActive}">
                </span>
                <span class="sp3 songti">单品特选</span>
            </router-link>
        </div>-->
        <div class="tab-bottom-item">
            <router-link  to="/messageIndex" repalce>
                <span>
                    <img src="../assets/images/tab/icon_gouwu_nor@3x.png" alt="" class="img4" style="width:2.15rem; height: 2.15rem;">
                    <img src="../assets/images/tab/icon_gouwudai_sel@3x.png" alt="" class="img-active" style="width:2.15rem; height: 2.15rem;">
                </span>
                <span class="songti">购物车</span>
            </router-link>
        </div>
        <div class="tab-bottom-item" >
            <router-link  to="/myIndex" repalce>
                <span>
                    <img src="../assets/images/tab/wo_nor@2x1.png" alt="" class="img5" >
                    <img src="../assets/images/tab/wo_nor@2x.png" alt="" class="img-active" >
                </span>
                <span class="songti">我的</span>
            </router-link>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { _isLogin } from "../util/api.js";
export default {
  name: "bottomTab",
  data() {
    return {
      isActive: true,
      loginCode: "",
      defaultActive: false,
      loginCode: ""
    };
  },
  created() {
    this.checkDefaultUrl();
  },
  methods: {
    //判断默认进来的页面
    checkDefaultUrl() {
      let hash = window.location.hash;
      hash = hash.split("/")[1];
      if (hash == "") {
        this.defaultActive = true;
      }
    }
  }
};
</script>
<style scoped>
.tab-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
  /* border-top:1px solid #d6d6d6;; */
  z-index: 1301;
  background: #fafafa;
  margin-top: 5rem;
  /* background: url(../assets/images/tab/tab_bg@2x.png)
        background-size:100% 5rem; */
}
.tab-bg {
  position: absolute;
  bottom: 0.3rem;
  width: 100%;
  height: 6.6rem;
  z-index: -1;
}
.tab-bg img {
  width: 100%;
  height: 6.6rem;
}
.tab-bottom-item {
  text-align: center;
  color: #333333;
  font-size: 1rem;
  width: 25%;
  float: left;
  background-color: #fafafa;
  border-top: 1px solid #e2e2e2;
}
.tab-bottom-item img {
  display: block;
  width: 2.2rem;
  height: 2.2rem;
}
.tab-bottom-item span {
  display: block;
  color: #7f7f7f;
  font-family: PingFang SC, Microsoft JhengHei;
  font-size: 0.9rem;
  /*color:#eb3223;*/
}
.tab-bottom-item .img1 {
  width: 2.2rem;
  height: 2.2rem;
}
.tab-bottom-item .active img1 {
  /* width: 1.9rem; */
  height: 2.4rem;
}
.tab-bottom-item .img3 {
  /* bottom: 2rem; */
  /* margin-bottom: 1.2rem; */
  /*width: 5.55rem;
        height: 5.7rem;
        position: fixed;
        bottom: 1.3rem;*/
  /* left: -0.4rem; */
  /*left: calc(49% - 2.4rem);
        border: 0.4rem solid #fff;
        border-radius: 50%;*/
  /* bottom: 2rem; */
  /* margin-bottom: 1.2rem; */
  /*width: 4.55rem;
        height: 4.7rem;
        position: fixed;
        bottom: 2.1rem;*/
  /* left: -0.4rem; */
  /*left: calc(50% - 2.2rem);*/
  /* border: 0.4rem solid #fff; */
  /*border-radius: 50%;*/
}
/* .tab-bottom-item .msg{ */
/* width:4.5rem;
        height: 4.5rem;
        position: fixed;
        bottom: 1.8rem;
        left:calc(50% - 2.2rem); */
/* } */
/* .tab-bottom-item .img4{
        width: 2.2rem;
        height: 1.9rem;
    } */
/* .tab-bottom-item .img5{
        width: 1.9rem;
        height: 1.9rem;
    } */
.tab-bottom-item .img-active {
  display: none;
}
a {
  height: 4.9rem;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.7rem;
}
/*.tab-bottom img{
        position: fixed;
        bottom: 2rem;
    }*/
.tab-bottom-item .active img {
  display: none;
}
/* .tab-bottom-item .active .img3{
        display: none;
    } */
.tab-bottom-item .active .img-active {
  display: block;
}
.tab-bottom-item .active .img {
  display: block;
  position: fixed;
  bottom: 0rem;
  left: calc(50% - 2.2rem);
}
.tab-bottom-item .active1 {
  display: none;
}
.tab-bottom-item .active2 {
  display: block;
  position: fixed;
  bottom: 0;
  left: calc(50% - 2.2rem);
}
.tab-bottom-item .active .bigPic {
  display: block;
  position: absolute;
}
.tab-bottom-item .sp3 {
  position: fixed;
  bottom: 0.5rem;
  left: calc(50% - 1.9rem);
  z-index: 111;
}
.tab-bottom-item .themeBackClass {
  display: block;
  position: absolute;
}
/*.img3box{
        width:7.3rem;
        height:8rem;
        bottom:0;
    }*/
.img3box img {
  /* width:7.3rem;
        height:8rem; */
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -3.7rem;
  width: 7.6rem;
  height: 7.6rem;
}
.img3box a {
  height: 100%;
}
.router-link-exact-active .songti {
  color: #ffaa39;
  /*color:#eb3223;*/
}
</style>