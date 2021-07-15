<template>
  <div>
    <index :showSearch="show"></index>
  </div>
</template>
<script type="text/ecmascript-6">
  import Index from '../foundGoods/index.vue'
  
  
  export default{
    data(){
      return {
        show: 'hide',
      }
    },
    components: {
      Index, 
    }
  }
</script>
<style scoped>
  
  .loading{
    font-size: 2rem;
    color: #000;
  }
  .f-header1{
    /*height: 5.04rem;*/
    width: 100%;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  .foundIndex {
    background: #fff;
    position: relative;
  }

  .f-header-wrap, .f-search-wrap {
    padding-left: 10px;
    padding-right: 10px;

  }

  .sidebar {
    /*background: rgba(0, 0, 0, .3);*/
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
  }

  .zIindex {
    z-index: 100 !important;
  }

  .sidebar-inner {
    background: #fff;
    width: 12rem;
    height: 100%;
  }

  .addLv {
    width: 26rem !important;
  }

  .sidebar-header {
    height: 4.9rem;
    /*background: #333333;*/
  }

  .sidebar-header-icon {
    float: left;
    height: 3.2rem;
    width: 4rem;
    margin-top: 1.5rem;
  }

  .sidebar-header-text {
    color: #FABE2D;
    text-align: left;
    line-height: 4.9rem;
    font-size: 1.6rem;
    padding-left: 2rem;
  }

  .sidebar-l1 {
    width: 12rem;
  }

  .sidebar-l2 {
    width: 14rem;
    background: #fff;
  }

  #sidebarContent {
    height: 90%;
    background: #fff;
  }

  .sidebar-l1, .sidebar-l2 {
    float: left;
    height: 100%;
    overflow: auto;
  }

  .sidebar-l1 li {
    height: 4.4rem;
    line-height: 4.4rem;
    width: 12rem;
    border-bottom: 1px solid #D7D7D7;
    position: relative;
    font-size: 1.6rem;
    overflow: hidden;
  }

  .sidebar-l1 li:last-child, .sidebar-l2 li:last-child {
    border-bottom: none;
  }

  .sidebar-l2 li {
    height: 4.4rem;
    line-height: 4.4rem;
    width: 12rem;
    margin: 0 auto;
    border-bottom: 1px solid #adadad;
    font-size: 1.6rem;
    overflow: hidden;
  }

  .pointer {
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: block;
    background: #D6D6D6;
    transform: rotate(45deg);
    top: 50%;
    right: -0.5rem;
    margin-top: -0.5rem;
  }

  .blank {
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    width: 600rem;
    z-index: -1;
  }

  

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-44rem);
  }
</style>
