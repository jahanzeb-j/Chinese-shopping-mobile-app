<template>
  <!--猜你喜欢-->
  <div class="fresh f-recommend" :class="{'f-recommend-app':showBottom}">
    <div class="border" v-show="content.length > 0"></div>
    <div class="fresh_heading" v-show="content.disabled == 1 ">
      <h3>{{content.title.titleContent}}</h3>
    </div>
    <div class="fresh_goods">
      <div class="goods fl" v-for="(item, index) in content.list" :key="index"  @click="jumpDetail(item.contentLinkAddress,item.commodityId)">
        <div class="fresh_goods_icon">
          <img  v-lazy="item.pic"  alt="">
          <div class="mask1" v-if="item.saleLable !== null ">{{item.saleLable}}</div>
          <div class="mask" v-if="item.saleLable == null && item.subName !== null">
            <!-- <span v-for="(type1,index1) in item.fullSingleActivity" :key="index1">
              <span class="all_reduce" v-if="type1.saleType == 1 || type1.saleType == 2 ">{{type1.promotionName}}</span>
              <span class="all_reduce" v-if="type1.saleType == 3">订单满{{type1.howYuan}}减{{type1.fullLessCash}}</span>
              <span class="all_reduce" v-if="type1.saleType == 4">满{{ type1.howYuan}}打{{ type1.fullDiscount }}折</span>
              <span class="all_reduce" v-if="type1.saleType == 5">满{{ type1.howPiece }}件减{{ type1.fullLessCash }}</span>
              <span class="all_reduce" v-if="type1.saleType == 6">满{{ type1.howPiece }}件打{{ type1.fullDiscount }}</span>
            </span> -->
            {{item.subName}}
          </div>
          <div class="mask" v-if="item.saleLable == null && item.subName == null">
            企业采购就在好单品
          </div>
        </div>
        <div class="fresh_goods_text">
          {{item.name}}
        </div>
        <div class="fresh_goods_m">
          <span>
            ¥<b v-if="item.promotionPrice !=null ">{{item.promotionPrice}}</b>
            <b v-else>{{item.salePrice}}</b>
          </span>
        </div>
      </div>
      <!-- <div class="goods fl">
        <div class="fresh_goods_icon">
          <img src="../../assets/images/icon/preferential5.png" alt="">
          <div class="mask1">订单满100减20</div>
        </div>
        <div class="fresh_goods_text">
          威士忌酒特调鸡尾的特调
        </div>
        <div class="fresh_goods_m">¥126.00</div> 
      </div>
      <div class="goods fl">
        <div class="fresh_goods_icon">
        <img src="../../assets/images/icon/preferential5.png" alt="">
        <div class="mask">精选千年老木头制作而成木头</div>
        </div>
        <div class="fresh_goods_text">
          威士忌酒特调鸡尾的特调
        </div>
        <div class="fresh_goods_m">¥126.00</div>
      </div>
      <div class="goods fl">
        <div class="fresh_goods_icon">
          <img src="../../assets/images/icon/preferential5.png" alt="">
          <div class="mask1">订单满100减20</div>
        </div>
        <div class="fresh_goods_text">
          威士忌酒特调鸡尾的特调
        </div>
        <div class="fresh_goods_m">¥126.00</div> 
      </div> -->
    </div>
    <!-- <div class="sp-bottom"><img src="../../assets/images/endWkhdp.png" style="vertical-align: middle;height: 1.3rem"></div> -->
  </div>
</template>
<script type="text/ecmascript-6">
export default{
    props: {
      data: {},
      showBottom:''
    },
    data(){
      return {
        titleContent: '',
        content: {
          title:{
            titleContent:''
          }
        },
        isApp:false,
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        
        this.content = newVal;
        
      }
    },
    methods: {
      jumpDetail(url,id){
        
        if(window.Android){
          // window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+commodityId+'&found_index=1')
          window.Android.intent(url)
        }else{
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+id+'&found_index=1'
          
        }
        // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+url1+'&found_index=1'
      },
    },
    mounted(){
     
    }
    
}
</script>
<style scoped>
.f-recommend {
  overflow: hidden;
  padding-bottom: 5rem;
  font-size: 1.3rem;
}
.f-recommend-app{
  padding-bottom: 0rem;
}
.fresh_heading h3{
  font-size: 1.8rem;
  float: left;
  margin-left:1rem;
}
.fresh_goods_text{
  overflow: hidden;
}
@import url('./good.less');
</style>
