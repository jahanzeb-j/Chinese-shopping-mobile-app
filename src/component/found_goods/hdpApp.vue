<template>
  <div class="f-hdp">
    <div class="clearfix f-center" style="display: flex;display: -webkit-flex;justify-content: center;-webkit-justify-content: center;">
      <div v-if="titleContent == ''" class="hdp-header-img111" ></div>
      <img v-if="titleContent != ''" class="hdp-header-img1" src="../../assets/images/carefullyChoose1-3xLeft.png" alt="">
      <div v-if="titleContent != ''" class="hdp-header">{{titleContent}}</div>
      <img v-if="titleContent != ''" class="hdp-header-img2" src="../../assets/images/carefullyChoose1-3xRight.png" alt="">
    </div>
    <div id="wrapper" ref="swipe">
      <div id="scroller">
        <ul class="hdp-inner">
          <!--<li class="hdp-img" @click="jumpDetail(item.commodityId)" v-for="item in content">-->
          <li class="hdp-img" @click="jumpDetail(item.contentLinkAddress),window.Android.intent(item.contentLinkAddress+'&found_index=1')" v-for="item in content">
            <img v-lazy="item.contentImgUrl">
            <p class="p">{{item.name}}</p>
            <p v-if="item.promotionPrice && item.promotionPrice != ''"><span>¥<b>{{item.promotionPrice}}</b></span></p>
            <p v-if="!item.promotionPrice || item.promotionPrice == ''"><span>¥<b>{{item.salesPrice}}</b></span></p>
            <!-- <p><span>¥<b>{{item.salesPrice}}</b>元</span>/{{item.unit}}</p> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import router from '../../router.js'
  export default{
    props: {
      data: {}
    },
    name: 'themeIndex',
    data(){
      return {
        titleContent:'',
        content: [],
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        this.titleContent = newVal['title'].titleContent;
        this.content = newVal;
      }
    },
    mounted(){
//      this.swipeImgList()
    },
    methods: {

      jumpDetail(url1){
//        router.push({path: 'good_detail', query: {commodityId: id,found_index:1}})
          var u = navigator.userAgent
          if(url1.indexOf("?") != -1){
              if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
                window.Android.intent(url1+'&found_index=1')
              }else {//是IOS
                window.location.href = url1+'&found_index=1'+"://"
              }
          }else{
              if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
                window.Android.intent(url1+'?&found_index=1')
              }else {//是IOS
                window.location.href = url1+'?&found_index=1'+"://"
              }
          }
        
      }
    }
  }
</script>
<style scoped>
  .f-center{
    margin: 0 auto;
  }
  .hdp-header-img1{
    width: 32%;
    height: 0.5rem;
    float: left;
    margin-top: 1.5rem;
  }
  .hdp-header-img111{
    width: 32%;
    height: 0.5rem;
    float: left;
    margin-top: .5rem;
  }
  .hdp-header-img2{
    width: 32%;
    height: 0.5rem;
    float: left;
    margin-top: 1.5rem;
  }
  .f-hdp {
    overflow: hidden;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar {
    background-color: #fff;
    scrollbar-face-color: #fff ;
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track-piece{
    background-color: #fff;
  }
  .hdp-header {
    /*width: 100%;*/
    padding-top: 1rem;
    padding-bottom: 1rem;
    /*background: url("../../assets/images/divide-hdp.png") no-repeat;*/
    background-position: center;
    background-size: 50%;
    font-size: 1.5rem;
    float: left;
    display: inline-block;
    padding: 1rem 1rem;
  }

  .hdp-inner .p {
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    text-align: left;
    overflow: hidden;
  }
  .hdp-inner p{
    text-align: center;
    margin-left: 1rem;
    margin-top: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 1.2rem;
  }
  .hdp-img span, .hdp-img b {
    color: #cc141c;
    font-weight: 500;
    font-size: .9rem;
    text-align: left;
  }

  .hdp-img b {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }

  #wrapper {
    position: relative;
    z-index: 1;
    left: 0;
    width: 100%;
    /*overflow: hidden;*/
    height: 14.5rem;
    padding: 0 0.9rem 0 0.9rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 11;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: auto;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
  }

  #scroller ul {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }

  #scroller ul li {
    display: block;
    width: 10.5rem;
    margin-right: 1rem;
  }

  #scroller ul li a {
    display: block;
    overflow: hidden;
  }

  .hdp-img {
    color: #989898;
  }

  img {
    width: 10.5rem;
    height: 10.5rem;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
