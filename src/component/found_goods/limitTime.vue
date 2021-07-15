﻿<template>
  <div>
    <div class="f-hdp" v-if="limitShow ">
      <div class='text_box'>
          <div class="text_top" @click="jumpLimit">
              <div class="text_fl">
                <div class="div1"><img src="../../assets/images/icon/3@2x.png" alt=""></div>
                <div class="div2">{{content.title.titleContent}}</div>
              </div>
              <!--<i class="iconfont icon-xianshigengduo fr"></i>-->
              <div class="text-bom">
                  {{content.title.subTitle}}
              </div>
          </div>
          <div class="hdp_date">
              <h3 id='killList1'><lastTime :lastTime="cutDown" :handle="timeEndEvent" endTimeWord=" "></lastTime></h3>
          </div>
      </div>
      <div class="hdp_goods" id="wrapper1">
          <div id="scroller1">
            <ul class="ul2" >
                <li v-for="(item, index) in content.list" :key="index" @click="jumpDetail(item.commodityId)">
                    <div class="goods_icon">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="goods_text">
                        {{item.name}}
                    </div>
                    <div class="goods_m">
                        <span class="span1" v-if="item.promotionPrice && item.promotionPrice != ''"><span>¥<b>{{item.promotionPrice}}</b></span></span>
                        <span class="span1" v-if="!item.promotionPrice || item.promotionPrice == ''"><span>¥<b>{{item.salePrice}}</b></span></span>
                        <span class="span2" style="color:#999;font-size:1.2rem"><span><s>¥ {{item.salePrice}}</s></span></span>
                    </div>
                </li>
            </ul>
          </div>
      </div>
      <div >
        <span class="cut_off"></span>
        <span class="cut_off_text" @click="jumpLimit">更多抢购</span>
        <span class="cut_off"></span>
      </div>
    </div>  
  </div>
</template>
<script type="text/ecmascript-6">
import lastTime from  '../../component/lastTime'
import router from '../../router.js'
  export default{
    name:'limitTime',
    props: {
      data: {
       
      }
    },
    name: 'themeIndex',
    data(){
      return {
        content: {
          title:{
            titleContent:''
          }
        },
        isShow:true,
        limitShow:true,
        onKilling:[],
        cutDown:0  ,//倒计时时间戳
        titleList:''
      }
    },
    watch: {
      data: function (newVal, oldVal) {
       
        // this.titleContent = newVal.title;
        // this.titleList=newVal.content
        
        this.content = newVal;
        this.limitShow=this.content.disabled == 1  && this.content.list.length > 2
        if(this.content.list.length > 0){
          this.cutDown = this.content.list[0].countdown
        }
        
        
      }
    },
    mounted(){
      // this.getAdvanceList()
      
    },
    components:{
        lastTime
    },
    methods: {
        // 跳转到商品详情
        jumpDetail(commodityId){
            if(window.Android){
              window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+commodityId+'&found_index=1')
            }else{
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "good_detail?commodityId="+commodityId+'&found_index=1'
            }
            // this.$router.push({path: 'good_detail', query: {commodityId: commodityId, found_index: 1}})
        },
            //   跳转URL
        jump(url){
            if(window.Android){
              window.Android.intent(url)
            }else{
              window.location.href = url
            }
        },
        // 获取限时秒杀商品
        getAdvanceList(){
            let data={
                pageNum:1,
                pageSize:10,
                salesLable:1,
                status:2
            }
            let url=HOST_HDPUSER+"/salespromotion/findPromotionCommodityList"
            this.$api_get_no({
                url:url,
                data:data
            }).then(res=>{
                if(res.code ==200){
                    if(res.respBody.onKilling && res.respBody.onKilling.length > 0){
                        // this.limitShow =res.respBody.onKilling.length > 2  
                        
                        let killList = res.respBody.onKilling
                        killList.forEach(e=>{
                            e.pic = e.pic.split(',')[0]
                            this.cutDown = e.countdown
                        })
                        this.onKilling = killList
                    }else{
                       
                    }
                }
            })
        },
        
        // 跳到限时秒杀列表
        jumpLimit(){
            if(!window.Android){
                this.$router.push({path: 'limitTimeBuy', query: {status: 2}})
            }
        },
        // 倒计时结束事件，刷新接口
        timeEndEvent(){
            this.getAdvanceList()
        }
    
  }
  }
</script>
<style>
#killList1 .clock{
    width:2.5rem;
    height:2.5rem;
    font-size:1.7rem;
    line-height: 2.5rem;
    border:0.05rem solid #858585;
    display: inline-block;
    color:#333;
    border-radius: 0.1rem ; 
    /* padding:0.4rem 0.3rem 0.45rem; */
}
#killList1 .second{
    background-color:#DCBE86;
    color:#333;
    border: none;
}
::-webkit-scrollbar{
     width: 0px !important; 
     height: 0px !important; 
}
</style>
<style scoped>
  .f-hdp {
    /*height:28.05rem;*/
  }
  .text_box{
    height: 7rem;
    width:100%;
  }
  .f-hdp .text_top{
    float: left;
    height:1.7rem;
    margin-top:1.9rem;
  }
  .f-hdp .text_top .text_fl{
    height:1.7rem;
    font-size:1.8rem;
    font-family:PingFangSC-Regular;
    color:#333;
    /*margin-left:3.4rem;*/
  }
  .text_fl .div1{
    float: left;
    width:2rem;
    /*margin:0 1rem;*/
     margin:0rem 0.5rem 0rem 1rem;
  }
  .text_fl .div1 img{
    width:100%;
  }
  .text_fl .div2{
    /*width:13rem;*/
    text-align:left;
  }
  .f-hdp .text_top i{
    width:0.7rem;     
    height:1.2rem;
    font-size:1.2rem;
    font-family:PingFangSC-Regular;
    color:#333;
    margin-right:1.55rem;
  }
.f-hdp .text-bom{
  font-size:1.3rem;
  font-family:PingFangSC-Regular;
  /*color:#7F7F7F;*/
  text-align: left;
  margin-left:1rem;
  margin-top:1rem;
}
.f-hdp .hdp_date{
  float: right;
  margin-top:3.25rem;
}
.f-hdp .hdp_date span{
  /* width:2.9rem;
  height:2.9rem;
  line-height: 2.9rem; */
  /* border:1px solid rgba(230,230,230,1); */
}
.f-hdp .hdp_date span,i{
  display:inline-block;
  font-size:1.9rem;
  font-family:PingFangSC-Regular;
  color: #333;
  border-radius: 0.1rem ; 
}
/* .f-hdp .hdp_date span:nth-child(even){
  display: inline;
  background:#fff;
  border:none;
} */
.f-hdp .hdp_date span:last-child{
  /* background:rgba(255,216,90,1); */
}
.hdp_goods{
  width:37.45rem;
  height:16.35rem;
  /*margin-top:2rem;*/
  overflow: hidden;
}
.hdp_goods ul{
  height:100%;
  flex-direction: row;
}
.hdp_goods li{
  height:100%;
  float: left;
  text-align: left;
}
.hdp_goods .goods_icon{
  width:12.5rem;
  height:12.5rem;
  line-height: 9rem;
  border-radius: 0.5rem ; 
  margin-left:1rem;
  margin-top:1.5rem;
}
.hdp_goods .goods_icon img{
  width:100%;
  height:100%;
  background:#fff;
  border-radius: 0.25rem;
}
.hdp_goods .goods_text{
  width:12rem;
  height:3rem;
  line-height: 1.5rem;
  font-size:1.2rem;
  font-family:PingFangSC-Regular;
  color:rgba(51,51,51,1);
  /* overflow: hidden; */
  margin-top:0.7rem;
  margin-left:1rem;
  margin-bottom:1rem;
  text-align: left;
   overflow: hidden;
  /*text-overflow:ellipsis;
  white-space: nowrap; */
}
.hdp_goods .goods_m{
  margin-bottom:2.35rem;
  margin-left:1rem;
}
.hdp_goods .goods_m .span1{
  display:inline-block;
  /*width:4.75rem;*/
  height:1rem;
  font-size:1.4rem;
  font-family:PingFangSC-Regular;
  color:#ED0000;
  /*letter-spacing:-1px;*/
}
.hdp_goods .goods_m .span2{
  display:inline-block;
  margin-left:0.5rem;  
  height:1rem;
  font-size:1.3rem;
  font-family:PingFangSC-Regular;
  color:rgba(235,84,77,1);
  /*width:1.9rem;*/
  border:none;
  height:0.8rem;
  /* font-size:1rem;
  font-family:PingFangSC-Light;
  color:rgba(179,179,179,1); */
  margin-left:0.25rem;
}
/*滑动*/
  #wrapper1 {
    width: 100%;
    height: 22rem;
    background: #fff;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
  #scroller1 {
    width: auto;
    /* height: 19.1rem; */
    position: absolute;
    z-index: 11;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  #scroller1 ul {
    /* height: 19.1rem; */
    display:flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }
  #scroller1 ul li {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }
  #scroller1 ul li img{
    width: 100%;
    height:100%;
    left:0;
  }
  #scroller1 ul li .word{
    position: absolute;
    top: 2.8rem;
    width:100%;
    left:0;
    font-size:1.5rem;
    color: #fff;
    font-weight: bolder;
    z-index:6;
  }
  #scroller1 ul li.recommendedMore{
    width: 13rem;
    height: 16rem;
    line-height: 16rem;
    font-size: 1.4rem;
    color: #adadad;
    border: 0.3rem solid #f4f4f4;
    border-radius: 0.5rem;
    margin: 0 0.8rem;
  }
  .numInputComplete{
    width: 100%;
    height: 4.3rem!important;
    color: #F9BE00;
    text-align: right;
    font-size: 1.7rem!important;
    background: #F4F4F4;
    padding-right: 1.8rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  
/*华丽分割线*/
.cut_off{
  width:13rem;
  height:1px;
  background:#E2E2E2;
  margin-bottom:0.5rem;
}
.cut_off_text{
  width:7rem;
  height: 2rem;
  line-height: 2rem;
  border:1px solid #999;
  border-radius:1rem;
  font-size:1.2rem;
  font-family:PingFangSC-Regular;
  color:rgba(188,161,116,1);
  margin:1rem 1.2rem;
  /*margin-bottom:2rem;*/

}
</style>
