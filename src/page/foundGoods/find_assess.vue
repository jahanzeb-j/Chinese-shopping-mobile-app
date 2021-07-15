<template>
    <div class="find_assess">
       <div class="header" >
         <img src="../../assets/images/returnFront.png" alt="" @click="tohistory">
         <div class="header_title">评价</div>
       </div>
       <div class="find_body">
         <div v-if="detailNum.length == 0" style="line-height: 3.1rem;font-size: 1.2rem;"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
         <div v-for="item in detailNum">
           <div class="body_title">
             <img :src="item.userImg" class="user_logo">
             <div class="user_name">{{item.nickname}}</div>
             <img src="../../assets/images/oneStar.png" alt="" class="xingxing" v-show="item.commentStar == 1">
             <img src="../../assets/images/twoStar.png" alt="" class="xingxing" v-show="item.commentStar == 2">
             <img src="../../assets/images/threeStar.png" alt="" class="xingxing" v-show="item.commentStar == 3">
             <img src="../../assets/images/fourStar.png" alt="" class="xingxing" v-show="item.commentStar == 4">
             <img src="../../assets/images/fiveStar.png" alt="" class="xingxing" v-show="item.commentStar == 5">
             <div class="timer">{{item.createTime}}</div>
           </div>
           <div class="contents">{{item.commentContent}}</div>
           <div class="large_img">
             <img v-for="items in item.pics" :src="items" alt="">
           </div>
         </div>
         <div class="checMore" v-if="noMore" @click="lookMore">查看更多</div>
         <div class="checMore" v-if="!noMore" >没有更多</div>
       </div>
    </div>

</template>
<style scoped>
  .checMore{
    padding: 1.7rem 0;
    font-size: 1.2rem;
    color: #adadad;
    background: #f4f4f4;
  }
  .find_assess{
    width:100%;
    height:100%;
    background:#f4f4f4;
    border-top:1px solid transparent;
  }
  .header{
    width:100%;
    height:4.4rem;
    position: fixed;;
    background:#fff;
  }
  .header img{
    position:absolute;
    left:0.8rem;
    display: inline-block;
    width:1.2rem;
    height:1.9333rem;
    top:1.25rem;

  }
  .header_title{
    width:100%;
    height:100%;
    font-size:1.8rem;
    color:#333333;
    line-height: 4.4rem;
  }
/*评价内容开始*/
  .find_body{
    width:100%;
    background:#fff;
    margin-top:5.4rem;
    border-top:1px solid transparent;

  }
  .body_title{
    width:100%;
    background:#fff;
    overflow: hidden;

  }
  .body_title div,.body_title img{
    float: left;
  }
  .user_logo{
    display: inline-block;
    width:2.9rem;
    height:2.9rem;
    border-radius: 50%;
    margin-top:1.2rem;
    margin-left:0.8rem;
  }
  .user_name{
    font-size:1.2rem;
    color:#858585;
    margin-top:1.9rem;
    margin-left:1rem
  }
  .xingxing{
    margin-top:1.9rem;
    margin-left:1.5rem;
    width:11.58rem;
    height:1.08rem;
  }
  .body_title .timer{
    float: right;
    font-size: 1.2rem;
    color:#858585;
    margin-top:1.9rem;
    margin-right:0.8rem;
  }
  .contents{
    width:100%;
    background: #fff;
    margin-top:1.05rem;
    font-size: 1.4rem;
    color:#333333;
    padding-left: 0.8rem;
    text-align: left;
    line-height: 1.7rem;
    padding-right: 0.8rem;
  }
  .large_img{
    width:100%;
    background:#fff;
    margin-top:1rem;
    overflow: hidden;
    padding-left: 0.3rem;

  }
  .large_img img{
   float: left;
    width:8.2rem;
    height:8.2rem;
    margin-right:0.5rem;
    margin-left:0.5rem;

  }
</style>
<script type="text/ecmascript-6">
  export default {
    name: 'find_assess',
    data () {
      return {
        AlertChange:false,
        detailNum:[],
        someNumber:2,
        noMore:true
      }
    },
    mounted(){
        this.getCommentData()

    },
    methods:{
      lookMore: function () {
        let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
        let id=this.$route.query.commodityId
        this.$resource (url ).get({ externalId: id ,start:this.someNumber}).then((response) => {
//          console.log(response.body.list);
          if( response.status == 200 ){
          this.someNumber = this.someNumber + 1;
          this.detailNum = this.detailNum.concat(response.body.list);
          if(response.body.list.length<10){
            this.noMore = false
          }
        }
      })
      },
      tohistory:function(){
        window.history.go(-1)
      },
      find_assess: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'phone_change2'
      },
      back: function () {
        window.history.back();
      },
      //获取商品评论数据
      getCommentData(){
        let url = HOST_HDBMESSAGE + '/comment/getCommentByExternalId'
        let id=this.$route.query.commodityId
        this.$resource (url ).get({ externalId: id ,externalType:1}).then((response) => {
//          console.log(response.body.list);
          if( response.status == 200 ){
            this.detailNum = response.body.list
          }
        })
      },
    }
  }
</script>
