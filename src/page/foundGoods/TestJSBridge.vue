<template>
  <div>
      <div>
          <input class="url-text"type="text" v-model="url">
      </div>
      <div>
          <button  class="jump-btn" @click="jump">跳转到本机地址测试</button>
      </div>
      <br>
      <br>
      <br>
      <div>
          <button @click="backHome">测试返回首页</button>
      </div>
      <br>
      <br>
      <br>
      <div>
          <button @click="close">测试关闭当前页</button>
      </div>
      <br>
      <br>
      <br>
      <div>
          <button @click="goodDetail">跳商品详情</button>
      </div>
      <br>
      <br>
      <br>
      <div>
          <button @click="themeDetail">跳主题详情</button>
      </div>
      <br>
      <br>
      <br>
      <div>
          <p>{{ua}}</p>
          <p>{{device}}</p>
      </div>
  </div>
</template>
<script>
// import { BridgeMixin } from 'src/globalBasicData'
import {_deviceType} from '../../util/index'
export default {
  data(){
    return{
        url:'http://',
        ua:'',
        device:''
    }
  },
//   mixins: [BridgeMixin],
  mounted(){
    //   this.init()
        this.ua  = navigator.userAgent
        this.device = _deviceType()
  },
  methods:{
    jump(){
        window.location.href = this.url
    },
    backHome(){
        // WebViewJavascriptBridge.callHandler('backHome', {'foo': 'bar'}, function(response){
        //     console.log(response)
        // })
        this.native('backHome=1')
    },
    close(){
        // WebViewJavascriptBridge.callHandler('close', {'foo': 'bar'}, function(response){
        //     console.log(response)
        // })
        this.native('close=1')
    },
    goodDetail(){
        
        if(_deviceType() === 'iosApp'){
            window.location.href = 'http://mtest.haodanpin.com/#/good_detail?commodityId=89985899&found_index=1'
        }else{
            window.location.href = 'http://mtest.haodanpin.com/#/good_detail?commodityId=89985899&found_index=2'
        }
        
    },
    themeDetail(){
        
        if(_deviceType() === 'iosApp'){
            window.location.href = 'http://mtest.haodanpin.com/#/theme_detail?id=1505358200541741&theme_list=1&found_index=1'
        }else{
            window.location.href = 'http://mtest.haodanpin.com/#/theme_detail?id=1505358200541741&theme_list=1&found_index=2'
        }
        
    },
    init(){
        let _this = this
        _this.getThemeDetailData()
            _this.getCommentData()
            _this.getReadNum()
            _this.getnicheng()
            // _this.savaThemeStatistics()
            _this.setupWebViewJavascriptBridge(function(bridge){
                bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
                    let responseData = { 'Javascript Says':'Right back atcha!' }
                    themeDetailIos = data
                    _this.setId()
                    _this.requestThumbTheme()
                    responseCallback(responseData)
                })
            })
    },
    native(query){
        let WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wkHdpBridge://?' + query
        document.documentElement.appendChild(WVJBIframe)
    }
  }
}
</script>
<style>
    .url-text{
        margin-top:4rem;
        display: block;
        height: 5rem;
        width:100%;
        border: 2px solid #eee;
        font-size:4rem;
    }
    button{
        height: 5rem;
        width:30rem;
        border: 2px solid #eee;
        font-size:2rem;
    }
</style>


