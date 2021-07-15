<template>
  <div class="searchresult">
    <loading v-show="showLoading"></loading>
    <div class="search-container">
      <img src="../../assets/images/goback.png"  class="go_back" @click="tolookindex">
      <input type="text" placeholder="搜索展厅" class="search-input" readonly="readonly" @click="toSerach_history" v-model="searchname">
      <img src="../../assets/images/search-icon.png" class="search-img">
    </div>
    <div class="resultlist" v-for="(item,index) in getdate">
      <div class="goods_container" @click="toDetails(index)">
        <div class="goods_left">
          <img :src=item.exhibitionImgUrl alt="">
        </div>
        <div class="goods_right">
          <!--<div class="right_icon"></div>-->
          <div class="zhantingname">{{item.name}}</div>
          <div class="zhantingtitle">{{item.title}}</div>
          <div class="zhantingaddress">{{item.position}}</div>
          <div class="iconbox">
            <div class="icon-img">
              <img src="../../assets/images/zhanpin.png" alt="">
              <span>{{item.commodityCount}}个</span>
            </div>
            <div class="icon-img" style="flex:1.8;-webkit-flex:1.8">
              <img src="../../assets/images/mapicon.png" alt="">
              <span>距{{item.distanceStr}}</span>
            </div>
            <div class="icon-img" style="margin-right:0.2rem">
              <span style="float: right">预约{{item.appointmentNumber}}</span>
              <img src="../../assets/images/yuyue.png" style="float: right">
            </div>
          </div>
        </div>
      </div>
    </div>
   <div class="null_search" v-show="showSearch">
     <div class="null_box">
       <img src="../../assets/images/noSearch.png" alt="">
       <div class="nullalert">没有相关的搜索结果！</div>
       <!--<div class="goshop" @click="tolookindex">去逛逛</div>-->
     </div>
   </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import loading from '../../component/loading.vue'
  export default{
    data() {
      return {
          getdate:[],
         showLoading:false,
        showSearch:false,
        searchname:null
      };
    },
    mounted(){
        this.getDate()

     this.getTitle()
    },
    methods: {
//        获取搜索的标题
      getTitle:function(){
          let aa=window.localStorage.getItem('position')

        if (aa){
             this.searchname= window.localStorage.getItem('position')
        }
      },

      toDetails:function(index){
        window.localStorage.setItem('zhanTingId',this.getdate[index].id);
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?to=2';
      },
      toSerach_history:function(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'serach_history';
      },
      tolookindex:function(){

        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
      },

//      获取后台数据
      getDate:function(){
          this.showLoading=true;
        let _position=window.localStorage.getItem('position')
        let lng=window.localStorage.getItem('longitude')
        let lat=window.localStorage.getItem('latitude')
        let url=window.HOST_HDBITION+'/hdpExhibition/getHdpExhibitionByPosition'
        let url2=window.HOST_HDBITION+'/hdpExhibition/getHdpExhibitionByPositionDetail'
        if ((lng!=''&&lat!='')&&(lng!=null&&lat!=null)){
          this.$resource(url).get({'positionDetail':_position,'longitude':lng,'latitude':lat}).then((response) => {
            if (response.body.code==200){
              this.getdate=response.body.respBody
              for(let i=0;i<this.getdate.length;i++){
                if (this.getdate[i].commodityCount==null){
                  this.getdate[i].commodityCount=0
                }
              }
              this.showLoading=false
              if (response.body.respBody.length==0||response.body.respBody.length==null){
                this.showSearch=true
              }
            }

          })
        }else{
          this.$resource(url2).get({'positionDetail':_position}).then((response) => {
            if (response.body.code==200){
            this.getdate=response.body.respBody
            for(let i=0;i<this.getdate.length;i++){
              if (this.getdate[i].commodityCount==null){
                this.getdate[i].commodityCount=0
              }
            }
            this.showLoading=false

            if (response.body.respBody.length==0||response.body.respBody.length==null){
              this.showSearch=true
            }
          }

        })
        }

      },


    },
    components:{
        loading
    }
  }
</script>
<style scoped>
  .searchresult{
    background:#f4f4f4;

  }
  /*搜索框样式开始*/
  .search-container{
    width:100%;
    position:relative;
    border-bottom:1px solid #d3d3d3;
    background:#fff;
    border-top:1px solid transparent;
  }
  .go_back{
    display: inline-block;
    height: 1.5rem;
    position: absolute;
    top: 1.3rem;
    left: 0.8rem;
  }
  .search-input{
    width:85%;
    height:2.8rem;
    background:#f4f4f4;
    margin-top:0.6rem;
    margin-bottom:0.6rem;
    text-align: left;
    font-size:1.4rem;
    padding-left:3.4rem;
    margin-left:5%;
  }
  .search-img{
    width:1.4rem;
    height:1.4rem;
    position:absolute;
    top:1.3rem;
    left:4.8rem;
  }
  /*搜索框样式结束*/
  /*展品样式开始*/
  .resultlist{
    width:100%;
    background:#fff;
    margin-top:1rem;
    border-top:1px solid transparent;
    border-bottom:1px solid transparent;
  }
  .goods_container{
    width:96%;
    margin-left: 2.22%;
    margin-top:0.5rem;
    margin-bottom:0.5rem;
    height:13rem;
    background:#fff;
  }
   .goods_container div{
     float: left;
   }
  .goods_left{
    width:13rem;
    height:12rem;
  }
  .goods_left img{
    display: inline-block;
    width:12rem;
    height:12rem;
    margin-top:0.5rem;

  }
  .goods_right{
    width:calc(98.5% - 14rem);
    height:12rem;
    margin-left:1rem;
    text-align: left;
    position:relative;
  }
  .right_icon{
    width:1.4rem;
    height:1.4rem;
    position:absolute;
    top:1.5rem;
    right:0.2rem;
    background:url("../../assets/images/gongsi.png") no-repeat;
  }
  .zhantingname{
    width:100%;
    margin-top:1.5rem;
    font-size:1.2rem;
    height:1.2rem;
    color:#858585;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .zhantingtitle{
    width:100%;
    font-size:1.5rem;
    color:#333333;
    font-weight: 600;
    margin-top:1.75rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height:1.5rem;

  }
  .zhantingaddress{
    width:100%;
    color:#858585;
    margin-top:1rem;
    font-size:1.2rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .iconbox{
    width:100%;
    margin-top:2rem;
    display: flex;
    display: -webkit-flex;
  }
  .iconbox div{
    flex:1;
    -webkit-flex:1;
    text-align: left;
  }
  .icon-img img{
    float: left;
    vertical-align: top;
  }
  .icon-img span{
    float: left;
    margin-left:0.5rem;
  }
  /*展品样式结束*/
  /*没有搜索结果*/
  .null_search{
    width:100%;
    position:fixed;
    left:0;
    z-index:500;
    background:#f3f3f3;
  }
  .null_box{
    border-top:1px solid transparent;
    width:100%;
    margin-top:calc(50% - 1rem);
  }
  .null_box{
    display: block;
    width:11.5rem;
    height:11.5rem;
    margin-left:calc(50% - 5.75rem);
  }
  .nullalert{
    width:20rem;
    text-align: center;
    font-size: 1.3rem;
    margin-top:2rem;
    color:#858585;
    margin-left:calc(50% - 9rem)
  }
  .goshop{
    width:6rem;
    height:3rem;
    border:1px solid #f9be00;
    border-radius: 3px;
    line-height: 3rem;
    font-size: 1.4rem;
    text-align: center;
    margin-top:2rem;
    margin-left:calc(50% - 3rem);
    color:#f9be00;
  }
</style>
