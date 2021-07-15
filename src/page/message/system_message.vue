<template>
  <div class="system_message" ref="systembody">
    <div class="header-box">
      <div class="header-left" @click="toMessageIndex">
        <img src="../../assets/images/goback.png">
      </div>
      <div class="header-title">系统消息</div>
    </div>
    <div style="width:100%;height:1px;margin-top:4.4rem;"></div>
      <div class="msg_box" v-for="item in SystemMsg" v-if="!showLast">
        <div class="msg_line1">
          <div class="ling1_left">{{item.sendDate}}</div>
        </div>
        <div class="msg_line2">
          <div class="line2_left"></div>
          <div class="line2_right">
            <div class="leftsanjiao"></div>
            <div class="msg_words">{{item.content}}</div>
          </div>
        </div>
      </div>

    <div v-if="showLast">
      <div class="msg_box" >
        <div class="msg_line1">
          <div class="ling1_left">{{lastData2.sendDate}}</div>
        </div>
        <div class="msg_line2">
          <div class="line2_left"></div>
          <div class="line2_right">
            <div class="leftsanjiao"></div>
            <div class="msg_words">{{lastData2.content}}</div>
          </div>
        </div>
      </div>
      <div class="msg_box" >
        <div class="msg_line1">
          <div class="ling1_left">{{lastData.sendDate}}</div>
        </div>
        <div class="msg_line2">
          <div class="line2_left"></div>
          <div class="line2_right">
            <div class="leftsanjiao"></div>
            <div class="msg_words">{{lastData.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        SystemMsg:[],
        lastData:[],
        lastData2:[],
        showLast:true

      };
    },
    mounted () {

       this.getSystemMsg()
      this.shangla()

    },
    methods:{
      shangla:function(){
          let _this=this
        let systembody=this.$refs.systembody;
        let startX ,startY,moveEndX,moveEndY,X,Y
        this.$nextTick(() =>{
          systembody.addEventListener('touchstart', function(event) {
            let e = event || window.event;
            startX = e.targetTouches[0].pageX
            startY = e.targetTouches[0].pageY
          })
          systembody.addEventListener('touchmove', function(event) {
            let e = event || window.event;
            moveEndX = e.targetTouches[0].pageX
            moveEndY = e.targetTouches[0].pageY
            X = moveEndX - startX
            Y = moveEndY - startY
            if ( Math.abs(Y) > Math.abs(X) && Y >80) {
                if ( _this.showLast==true){
                  _this.showLast=false

                }


            }

          })
        })
      },
//        获取后台数据
      getSystemMsg:function(){
          let _this=this
      let url=window.HOST_HDBMESSAGE+'/msg/sysMsg'
      let id=window.localStorage.getItem('userId')
      _this.$resource(url).get({'userId':id}).then((response) => {
        if (response.status==200){
          _this.SystemMsg=response.body

          let last=_this.SystemMsg.length-1
          for (let i=0;i<_this.SystemMsg.length;i++){
              _this.lastData=_this.SystemMsg[last];
            _this.lastData2=_this.SystemMsg[last-1];

          }

        }

      })
    },
    toMessageIndex:function(){
      window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'messageIndex';
    }
  },


  }
</script>
<style scoped>
  .system_message{
    width:100%;
    height:100%;
    background:#f4f4f4;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    overflow-scrolling: touch;
    padding-bottom:4.4rem;
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
    color: #333;
    text-align: center;
    position: absolute;
    top: 0;
    left: 4.4rem;
  }
  /*头部样式结束*/
  .msg_box{
    width:100%;
    margin-top:0.2rem;
    border:none !important;
  }
  .msg_line1,.msg_line2{
    width:100%;
    float: left;
  }
  .msg_line1{
    margin-top:1.7rem;
    margin-bottom:1.7rem;
    font-size:1.2rem;
    color:#868686;
  }
  .ling1_left{
    float: left;
    width:100%;
  }
  .ling1_left{
    text-align: center;
  }

  .line2_left,.line2_right{
    float: left;

  }
  .line2_left{
    margin-left:0.8rem;
    width:4rem;
    height:4rem;
    background:url("../../assets/images/system_logo.png") no-repeat;
    background-size: 100%;
    border-radius: 50%;
  }
  .line2_right{
    margin-left:1.5rem;
    position:relative;
    max-width: 23.75rem;
    border-radius: 6px;
    border:1px solid #d8d8d8;
  }
  .leftsanjiao{
    position:absolute;
    top:0.8rem;
    left:-0.7rem;
    width: 0;
    height: 0;
    border-top: 0.7rem solid transparent;
    border-right: 1.4rem solid #fff;
    border-bottom: 0.7rem solid transparent;
  }
  .msg_words{
    padding: 0.8rem;
    top:0;
    left:0.7rem;
    background:#fff;
    border-radius: 6px;
    font-size: 1.6rem;
    color:#252525;
    line-height: 2.2rem;
    text-align: left;
  }
</style>
