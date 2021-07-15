<template>
  <div class="messageIndex">
      <!-- <bottomTab></bottomTab> -->
     <div class="header-box">
      <div class="header-title">
        消息
        <img @click="back()" src="../../assets/images/returnFront.png" >
      </div>
    </div>
     <div class="message_box">
       <div class="message_kefu" @click="toCustomerService">
         <div class="kefu_left"></div>
         <div class="kefu_middle">
         <div class="middle1">好单品客服</div>
         <div class="middle2" id="msg_lastContent">{{lastContent}}</div>
         </div>
         <div class="kefu_right" id="msg_lastContent_time">{{lastTimeUser}}</div>
       </div>
       <div class="message_kefu">
         <div class="xitong_left"></div>
         <div class="kefu_middle" @click="toSystemMessage">
           <div class="middle1">系统消息</div>
           <div class="middle2">{{lastData}}</div>
         </div>
         <div class="kefu_right">{{sendTime}}</div>
       </div>
     </div>
  </div>
</template>
<script type="text/ecmascript-6">
    // import bottomTab from '../../component/bottomTab.vue'
    export default{
        name: 'messageIndex',
       data() {
        return {
          SystemMsg:[],
          lastData:null,
          sendTime:null,
          lastTimeUser:null,
          lastContent:null
        };
       },
      mounted () {
        this.initMsg()
        this.getSystemMsg()
      },
        components: {
            // bottomTab
        },
      methods:{
            initMsg:function(){
              WKYYIMManager.prototype.initYYIM();
            },
//            获取最后客服消息内容与时间
        //        获取后台数据
        getSystemMsg:function(){
          let url=window.HOST_HDBMESSAGE+'/msg/sysMsg'
          let id=window.localStorage.getItem('userId')
          this.$resource(url).get({'userId':id}).then((response) => {
            console.log(response)
            if (response.status==200){
              this.SystemMsg=response.body
              let aa=this.SystemMsg.length-1
             for (let i=0;i<this.SystemMsg.length;i++){
                  this.lastData=this.SystemMsg[aa].content
                  this.sendTime=this.SystemMsg[aa].sendDate
             }
            }
          })
        },
        toSystemMessage:function(){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'system_message';
        },
        toCustomerService:function(){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'customer_service';
        },
        back:function(){
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'myIndex';
        }
      }
    }
</script>
<style scoped>
  /*头部样式开始*/
  .header-box{
    width:100%;
    height:4.4rem;
    background:#fff;
    border-bottom:1px solid #d3d3d3 ;
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
  .header-title img{
    position: absolute;
    top:1rem;
    left:-2.5rem;
  }
  /*头部样式结束*/
  .message_box{
    width:100%;
  }
  .message_kefu,.message_xitong{
    height:6.8rem;
    width:96%;
    margin-left:2%;
    border-bottom:1px solid #d3d3d3 ;
    position:relative;
  }
   .kefu_left,.kefu_middle,.kefu_right,.xitong_left{
   float: left;
  }
  .kefu_left{
    width:5.1rem;
    height:5.1rem;
    background:url("../../assets/images/logo.png") no-repeat;
    background-size:100%;
    margin-top:0.85rem;
  }
  .xitong_left{
    width:5.1rem;
    height:5.1rem;
    background:url("../../assets/images/xitong.png") no-repeat;
    background-size:100%;
    margin-top:0.85rem;
  }
  .kefu_middle{
    height:5.1rem;
    margin-top:0.85rem;
    margin-left:1.1rem;
  }
  .middle1{
     font-size:1.7rem;
    color:#000000;
    text-align: left;
    margin-top:0.5rem;
  }
  .middle2{
    font-size:1.3rem;
    color:#acacac;
    margin-top:1rem;
    width:24.5rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    text-align: left;
        line-height: 1.5rem;
  }
  .kefu_right{
    position:absolute;
    top:1.5rem;
    right:0.5rem;
    color:#acacac;
    font-size:1.2rem;
  }
</style>