<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <img src="../../assets/images/returnFront1.png" @click="returnBack">
      <span>更多推荐</span>
    </div>

    <!-- 列表内容区 -->
    <div class="recommended">
      <div class='recommendedCon' v-for="item in recommendGoods" @click="enterRecommendedGoodDetail(item)">
        <img :src=item.pic class="recommendedPic">
        <div class="recommendedName">{{item.name}}</div>
        <div class="recommendedPrice">¥ <span>{{item.salesPrice}}</span></div>
      </div>
    </div>

    <div class="noMore">
      <img src="../../assets/images/dragDetailsLine.png">
      <span>已经到最底了</span>
      <img src="../../assets/images/dragDetailsLine.png">
    </div>

  </div>
</template>

<script>
  export default {
    name: 'recommendedMoreList',
    data () {
      return {
          recommendGoods: ''
      }
    },
    mounted() {
      document.getElementsByTagName('body')[0].scrollTop = 0;
      this.getList(1,10);
    },
    methods: {
        //返回
        returnBack(){
            window.history.back()
        },

        //获取推荐的商品
        getList(){
            let commodityId = this.$route.query.commodityId
            let userId = window.localStorage.getItem('userId')
            let url = HOST_HDPCOMMODITY + '/commodityFront/getCommodityDetailRecommendList'
            this.$resource (url ).get({ currNum: 2, pageSize: 8, version: 'v1.3', type: 1, commodityId: commodityId, userId: userId }).then((response) => {
                if( response.body.code == 200 ){
                    this.recommendGoods = response.body.respBody
                    let len = this.recommendGoods
                    for( let i = 0; i < len.length; i++ ){
                        len[i].pic = len[i].pic.split(',')[0]
                    }
                }
            })
        },

        //点击推荐的商品进入推荐商品的详情页
        enterRecommendedGoodDetail(item){
            window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?commodityId=' + item.commodityId + '&recommendedGood=1'
        },
    }
  }
</script>

<style scoped>
  /* 头部 开始 */
  .header{
    width: 100%;
    height: 4.4rem;
    line-height: 4.4rem;
    color: #333;
    font-size: 1.8rem;
    border-bottom: 1px solid #D6D6D6;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
  }
  .header img{
    width: 1.2rem;
    height: 2rem;
    float: left;
    margin-top: 1.2rem;
    margin-left: 0.8rem;
    vertical-align: middle;
  }
  /* 头部 结束 */

  /* 列表内容区 开始 */
  .recommended{
    width: 100%;
    background-color: #ffffff;
    margin-top: 4.4rem;
    margin-bottom: 1.5rem;
  }
  .recommendedCon{
    display: inline-block;
    margin: 0 0.4rem;
    margin-top: 1.5rem;
  }
  .recommendedPic{
    width: 17.5rem;
    height: 20rem;
    background-color: #f4f4f4;
    border-radius: 0.5rem;
  }
  .recommendedName{
    font-size: 1.3rem;
    color: #333;
    height: 2rem;
    line-height: 2rem;
      width: 17.5rem;
      overflow: hidden;
  }
  .recommendedPrice{
    font-size: 1rem;
    color: #cc141c;
    line-height: 2rem;
  }
  .recommendedPrice span{
    font-size: 1.3rem;
  }

  .noMore{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    background-color: #f4f4f4;
  }
  .noMore img{
    display: inline-block;
    width: 3rem;
    vertical-align: middle;
  }
  .noMore span{
    color: #adadad;
    margin: 1rem 1.5rem;
  }
  /* 列表内容区  结束 */
</style>
