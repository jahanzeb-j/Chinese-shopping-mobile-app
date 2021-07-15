<template>
  <div class="loading">
    <div class="onloading">
      <img src="../assets/images/spinner2.png" class="onloading-img">
      <div class="onloading-words">加载中请稍后...</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
      name:'loading'
  }
</script>
<style scoped>
  .loading{
    width:100%;
    height:100%;
  }
  /*加载中样式开始*/

  .onloading{
     width:100%;
     height:5rem;
     position:fixed;
     z-index:302;
     top:calc(50% - 2.5rem);
   }
  .onloading-words{
    display:inline-block;
    text-align: center;
    margin-top:20px;
    font-size:1.2rem;
    color:#858585;
    margin-left:3px;

  }
  .onloading-img{
    width:2.5rem;
    height:2.5rem;
    vertical-align: middle;
    animation-name:loadingimg;
    animation-duration:1.5s;
    animation-timing-function:linear;
    animation-iteration-count:infinite;
  }
  @keyframes loadingimg{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);;
    }
  }
  /*加载中样式结束*/
</style>
