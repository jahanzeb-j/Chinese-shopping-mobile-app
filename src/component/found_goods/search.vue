<template>
  <div class="f-search">
    <div class="search_logo">
      <img src="../../assets/images/tab/logo2x.png" alt="">

    </div>
    <router-link to="/fg_search?acd=231">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="企业采购福利精选" class="custom-input">
    </router-link>
    <!--<div class="xiaoxi">
      <img src="../../assets/images/tab/xiaoxi@3x.png" alt="">
    </div>-->
  </div>
</template>
<script>
import { api_get_no } from '../../util/api.js'
export default {
  data () {
    return {
      CommodityCount: 0
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .f-search{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 20;
    background-color: #fff;
    padding: 0.7rem 1.5rem 0.7rem 9.5rem;

    /*padding:0.7rem 5rem .7rem 1.5rem ;*/
    /*flex-direction: row;*/
    /* -webkit-flex-direction: row; */
    /*justify-content: space-between;*/
    /* -webkit-justify-content: space-between; */
    /*align-items:center ;*/
    /* -webkit-align-items:center ; */
    /*height: 4.4rem;*/
    /* margin-bottom: .7rem; */
    /* margin-top: .1rem; */
    /*border-bottom: 1px solid #D6D6D6;*/
    /*display: flex;*/
    /* padding-bottom: 3.5rem; */
  }
  /*.f-search img{
    float: left;
  }*/

  .f-search .xiaoxi{
    position: absolute;
    width: 1.9rem;
    height: 1.9rem;
    top:1.5rem;
    right:1.5rem;
  }
  .f-search .xiaoxi img{
    width:100%;
  }
  .custom-input{
    width: 100%;
    height: 3rem;
    color:#fff;
    line-height: 3rem;
    border-radius: 1.5rem;
    background: #D9D9D9;
    background-repeat: no-repeat;
    background-position: 35% 45%;
    background-size: 4.5%;
    font-size: 1.4rem;
    padding-left:3.7rem;
  }
  .f-search .icon-sousuo{
    display: block;
    position: absolute;
    font-size: 1.7rem;
    top:1.5rem;
    left:11rem;
  }
  .search_logo{
    display: inline-block;
    position: absolute;
    /* font-size: 2rem; */
    width: 5.5rem;
    height: 1.9rem;
    left: 1.5rem;
    top: 1.3rem;
  }
  .search_logo img{
    width:100%;
  }
  input::-webkit-input-placeholder{
    /*text-align: center;*/
    font-size: 1.4rem;
  }
  input::-ms-input-placeholder{
    /*text-align: center;*/
    font-size: 1.4rem;
  }
  a{
    width: 100%;
    height: 100%;
    /* margin-bottom: .7rem; */
  }
  i{
    color:#fff;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{ 
    color:#fff; 
  }
  
  input:-moz-placeholder,textarea:-moz-placeholder{ 
    color:#fff;  
  }
  
  input::-moz-placeholder,textarea::-moz-placeholder{ 
    color:#fff; 
  } 
  input:-ms-input-placeholder,textarea:-ms-input-placeholder{ 
    color:#fff; 
  }
</style>
