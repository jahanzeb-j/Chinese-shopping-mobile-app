// searchall.vue
<template>
  <div class="w1190 H_srarch_wrap">
    <h1 class="logo fl">
      <a href=""><img src="../assets/images/logo-pc.png" alt="" /></a>
    </h1>
    <div class="H_srarch fr">
      <input type="text" placeholder="苹果"  maxlength="100" v-model="searchName"
             v-on:keyup.13="searchNo()"  v-if="searchName == ''"/>
      <input type="text" placeholder="苹果"  maxlength="100" v-model="searchName"
             v-on:keyup.13="setStoreValue()"  v-if="searchName != ''"/>
      <div class="cancel2" v-if="searchName == ''" @click="searchNo()"><i></i></div>
      <div class="cancel2" v-if="searchName != ''" @click="setStoreValue()"><i></i></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:'searchAll',
      data(){
        return {
            searchName:''
        }
      },
    methods: {
        //搜索内容为空时提示
        searchNo(){
            alert("请输入搜索内容！")
        },
      // 跳转到列表页
      setStoreValue: function () {
          window.localStorage.setItem("searchName", this.searchName);
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'serachlist';

      }
    }
  }
</script>
<style scoped>
*:focus { outline: none; }
.H_srarch_wrap {
  clear: both;
  height: 105px;
  overflow: hidden;
}
.H_srarch_wrap .logo {
  margin-top: 18px;
}
.H_srarch_wrap .logo img {
  width: 160px;
  height: 70px;
}
.H_srarch {
  position: relative;
  margin-top: 30px;
  width: 550px;
  height: 40px;
  text-align: left;
  background: url("../assets/images/search_wrap-pc.png") no-repeat;
}
.H_srarch input {
  margin-left: 30px;
  width: 430px;
  height: 39px;
  line-height: 39px;
  background-color: transparent;
}
.H_srarch i {
  position: absolute;
  top: 0;
  right: -5px;
  width: 106px;
  height: 48px;
  background: url("../assets/images/search_btn-pc.png") no-repeat;
  cursor: pointer;
}
</style>
