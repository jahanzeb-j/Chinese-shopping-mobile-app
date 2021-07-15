<template>
  <div class="goodsparent">
    <div class="header-box">
      <div class="header-left" @click="goHistory">
        <img src="../../assets/images/goback.png">
      </div>
      <div class="header-title">商品展厅</div>
    </div>
    <div class="body_top">
      <div class="top_left">
        <img :src="thisGoodsDate.pic" alt="" class="top_left_img">
      </div>
      <div class="top_right">
        <div class="top_right_lin1">{{thisGoodsDate.name}}</div>
        <div class="top_right_title">{{thisGoodsDate.companyName}}</div>
        <div class="top_right_price">
          <div class="price_left">￥<b style="font-size:1.6rem;color:#dd6268">{{thisGoodsDate.salesPrice}}</b ><b style="font-size:1.3rem;color:#dd6268">元</b>/{{thisGoodsDate.unit}}</div>
          <div class="price_right">已成交{{thisGoodsDate.salesNum}}笔</div>
        </div>
      </div>
    </div>
    <div class="zhanting_box">
      <div v-if="isShowLv">
        <div class="zhangting_title">入驻展厅</div>
        <div class="details" v-for="(item,index) in getdate" @click="toGoodsDetails(index)">
          <div class="details_left">
            <img :src="item.exhibitionImgUrl" alt="">
          </div>
          <div class="details_right">
            <div class="zhangting_name">{{item.name.length>11?item.name.slice(0,11)+'..':item.name}}</div>
            <div class="details_title">{{item.title}}</div>
            <div class="details_title">展品:{{item.commodityCount}}个</div>
            <div class="details_title">
              <div class="details_title_left">{{item.positionDetail}}</div>
              <div class="details_title_right" v-if="distance">距{{item.distanceStr}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  v-if="!isShowLv" class="nozhangting">
      <img src="../../assets/images/noSearch.png" alt="">
      <div class="no_word_alert">该商品暂未入住展厅</div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        getdate:[],
        thisGoodsDate:[],
        distance:true,
        isShowLv:true
      };
    },
    mounted(){
       this.getGoods()
       this.getGoodszhanting()


    },
    methods: {
//        点击进入商品详情页
      toGoodsDetails:function (index) {
          window.localStorage.setItem('zhanTingId',this.getdate[index].id)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) +
          'exhibition_details?to=1'
      },
//        获取商品详情
      getGoods:function(){
          let url=window.HOST_HDPCOMMODITY+'/commodityFront/getThemeCommodityList'
          let id=this.$route.query.commodityId
        this.$resource(url).get({commodityIds:id}).then((response) => {
//          console.log(response);
          if (response.status==200){
            this.thisGoodsDate=response.body[0];
            if(this.thisGoodsDate.pic.indexOf(',') != -1) {
              this.thisGoodsDate.pic = this.thisGoodsDate.pic.split(",")[0];
            }
            if (this.thisGoodsDate.salesNum==null){
              this.thisGoodsDate.salesNum=0
            }
          }
        })
      },

      goHistory:function(){
          var urlParams = window.location.href; //获取url中"?"符后的字串
          var index = urlParams.indexOf('?')
          var urlRemain = urlParams.substring(index+1,urlParams.length)
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'good_detail?goodsparent=1'+'&'+urlRemain +'&enterCount=1';
      },
        getGoodszhanting:function(){
            let id=this.$route.query.commodityId
          let url=window.HOST_HDBITION+'/hdpExhibition/getHdpExhibitionListByCommodityId'
          this.$resource(url).get({'commodityId':id}).then((response) => {
//            console.log(response.body.respBody);
            if (response.body.code==200){
              this.getdate=response.body.respBody
              if (this.getdate==null||this.getdate.length==0){
                  this.isShowLv=false
              }
              for (let i=0;i< this.getdate.length;i++) {
                if (this.getdate[i].distanceStr == null) {
                    this.distance=false
//                  this.getdate[i].distanceStr = 0+'km'
                }
                if (this.getdate[i].commodityCount==null){
                  this.getdate[i].commodityCount=0
                }
              }
            }

          })
        }
    }
  };
</script>
<style scoped>
  .goodsparent{
    width:100%;
    height:100%;
    background:#f4f4f4;
    border-top:1px solid transparent;
  }
  /*头部样式开始*/
  .header-box{
    width:100%;
    height:4.4rem;
    position:fixed;
    top:0;
    left:0;
    z-index:1;
    background:#fff;
    border-bottom:1px solid #d3d3d3 ;
  }
  .header-left{
    width:4.4rem;
    height:4.4rem;
    position:relative;
  }
  .header-left img{
    width:1.05rem;
    height:1.9rem;
    position:absolute;
    top:1.25rem;
    left:16px;
  }
  .header-title {
    width: calc(100% - 8.8rem);
    font-size: 1.8rem;
    line-height: 4.4rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    position: absolute;
    top: 0;
    left: 4.4rem;
  }
  /*头部样式结束*/
  .body_top{
    width:100%;
    margin-top:5.4rem;
    height:12.5rem;
    background: #fff;
  }
  .top_left{
    width:10.5rem;
    height:10.5rem;
    float: left;
    margin-top:1rem;
    margin-left:0.8rem;
  }
  .top_left_img{
    display: inline-block;
    width:100%;
    height:100%;
  }
  .top_right{
    float: left;
    width:24.5rem;
    margin-left:1rem;
    height:10.5rem;
    margin-top:1rem;
  }
  .top_right_lin1{
    width:100%;

    margin-top:1.2rem;
    font-size:1.2rem;
    color:#222222;
    text-align: left;
    line-height:1.6rem;

  }
  .top_right_title{
    font-size: 1.2rem;
    text-align: left;
    margin-top:0.9rem;
    color:#858585;
  }
  .top_right_price{
    width:100%;
    margin-top:2.8rem;
  }
  .top_right_price{
    font-size:1.2rem;
    width:100%;
    margin-top:1.9rem;
  }
  .price_left{
    float: left;
  }
  .price_right{
    float: right;
    color:#858585;
  }
  .zhanting_box{
    background: #fff;
    width:100%;
    padding-bottom:1rem ;
  }
  .zhangting_title{
    width:100%;
    height:4.3rem;
    font-size:1.4rem;
    color:#333333;
    line-height:4.3rem;
    padding-left:0.8rem;
    text-align: left;
    margin-top:1rem;
    border-bottom: 1px solid #d6d6d6;
  }
.details{
  width:100%;
  height:12rem;
}
  .details_left{
    float: left;
    margin-left:0.8rem;
    height:100%;
    width:10.5rem;
  }
  .details_left img{
    display: inline-block;
    width:10.5rem;
    height:10.5rem;
    margin-top:0.75rem;

  }
  .details_right{
    width:25.2rem;
    height:100%;
    border-bottom: 1px solid #858585;
    float: left;
    margin-left:1rem;

  }
  .zhangting_name{
    width:100%;
    margin-top:1.7rem;
    font-size:1.3rem;
    font-weight: 600;
    color:#222222;
    line-height:1.7rem;
    text-align: left;
    padding-right:0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .details_title{
    width:100%;
    text-align: left;
    font-size:1.3rem;
    color:#858585;
    margin-top:0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .details_title_left{
    float: left;
    width: 16rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .details_title_right{
    float: right;
    margin-right:0.7rem;
  }
  .no_word_alert{
    width:100%;
    font-size:1.5rem;
    color:#999;
    margin-top:2rem;
  }
  .nozhangting{
    margin-top:11.6rem;
  }
  .nozhangting img{
    display: block;
    width:13.2rem;
    height:13.05rem;
    margin-left:calc(50% - 6.6rem);
  }
</style>
