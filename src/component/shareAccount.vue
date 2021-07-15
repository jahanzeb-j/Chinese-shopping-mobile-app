<template>
    <div class="shareAccount">
        <mt-popup
            v-model="isDisplay"
            position="bottom">
            <div class="bdsharebuttonbox" data-tag="share_1">
            <div class="shareList">
              <ul class="shareList_ul">
                <li class="li1">
                  <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                </li>
                <li class="li2">
                  <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                </li>
                <li class="li3">
                  <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                </li>
                <li class="li4">
                  <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                </li>
              </ul>
              <div class="cancel" @click="shutDown"><img src="../assets/images/shutDown.png" alt=""></div>
            </div>
            </div>
        </mt-popup>
    </div>
</template>

<style scoped>
  .bdsharebuttonbox{
    width:100%;
    background: #333;
  }

  .bdsharebuttonbox .shareList{
    width:100%;
    height:22rem;
  }

  .bdsharebuttonbox .shareList .shareList_ul{
    width:100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }

  .bdsharebuttonbox .shareList .shareList_ul .li1{
    width:7rem !important;
    height:7rem !important;
    background: url('../assets/images/weixinBig.png') no-repeat center center !important;
    background-size: 100% 100% !important;
  }

  .bdsharebuttonbox .shareList .shareList_ul .li2{
    width:7rem !important;
    height:7rem !important;
    background: url('../assets/images/friendCircle.png') no-repeat center center !important;
    background-size: 100% 100% !important;
  }
  .bdsharebuttonbox .shareList .shareList_ul .li3{
    width:7rem !important;
    height:7rem !important;
    background: url('../assets/images/qqBig.png') no-repeat center center !important;
    background-size: 100% 100% !important;
  }
  .bdsharebuttonbox .shareList .shareList_ul .li4{
    width:7rem !important;
    height:7rem !important;
    background: url('../assets/images/weiboBig.png') no-repeat center center !important;
    background-size: 100% 100% !important;
  }

  .bdsharebuttonbox .shareList .shareList_ul a{
    width:100%;
    height:100%;
    opacity:0;
  }

  .bdsharebuttonbox .shareList{
    padding-top:4rem;
  }

  .bdsharebuttonbox .shareList .shareList_ul li{
    width:7rem;
    height:7rem;
  }

  .bdsharebuttonbox .shareList .cancel{
    width:4.5rem;
    height:4.5rem;
    margin: 4.4rem auto;
  }

    .mint-popup{
        width:100%;
    }

</style>

<script>
    export default{
        name: 'shareAccount',
        props:{
            popupVisible:{
                type:[Boolean,Number],
            }
        },
        data(){
            return{
                isShow:true
            }
        },
        computed:{
            isDisplay:function(){
                // console.log('计算'+this.popupVisible +' '+  this.isShow)
                // console.log(this.popupVisible)
                return this.popupVisible != 0 && this.isShow
            } 
        },
        watch:{
            popupVisible:function(next){
                // console.log('监听')
                this.isShow = true
            }
        },
        created(){
             window._bd_share_main && window._bd_share_main.init()
        },
        mounted(){
            window._bd_share_main && window._bd_share_main.init()
            this.resolve
        },
        methods: {
            resolve(){
                window._bd_share_config={
                    "common": {
                        "bdSnsKey":{},
                        "bdText": "",
                        "bdMini": "1",
                        "bdMiniList": false,
                        "bdPic":"",
                        "bdStyle":"0",
                        "bdSize":"32",
                        "bdPic ":""
                    },
                    "share":{},
                    "image":{
                        "viewList": ["qzone","tsina","sqq","weixin"],
                        "viewText":"分享到：",
                        "viewSize":"32"
                    },
                    "selectShare":{
                        "bdContainerClass":null,
                        "bdSelectMiniList":["qzone","tsina","sqq","weixin"]}
                }
            },
            shutDown(){
                this.$nextTick(()=>{
                    this.isShow = false
                })
            }
        }
    }
</script>