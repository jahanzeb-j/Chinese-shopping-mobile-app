<template>
    <div>
      <div class="bk"></div>
      <div class="successImg"></div>
      <h3 class="successTip">恭喜~ 签到成功啦！</h3>  
      
      <div class="banner">

      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import {WeChatShareMixinZT} from '../../util/WeChatShareMixinZT.js'
import { alert_msg, _isWechat,formatDate} from '../../util/index.js'
import Vue from 'vue'
export default{
    data(){
        return {

        }
    },
    // mixins: [WeChatShareMixin],
    mounted(){
        this.wechatShare()
    },
    methods:{
        wechatShare(){
				let wcs= new WeChatShareMixinZT('网库好单品123',
                                                '',
												'网库好单品12',
												)
			},
    },
}
</script>


<style scoped>
.bk{
    width:100%;
    height:20rem;
    background:url(../../assets/images/registerAct.png) no-repeat;
    background-size: contain;
}
.successImg{
  height:14.85rem ;
  background:url(../../assets/images/successAct.png) no-repeat center;
  background-size: contain;
}
.successTip{
    font-size: 2.25rem;
    height:5.85rem;
    line-height:5.85rem;
   
    color:#fb2c2c;
    text-align: center;
    font-weight: bold;
}
.bannerTip{
    font-size:1.2rem;
    height:4.8rem;
    line-height:4.8rem;
    color:#424242;
    font-family: '楷体';
}
.banner{
    margin:0 3rem;
    box-sizing: border-box;
    background:#fb2c2c;
    
    height: 14.4rem;
}
</style>