<template>
  <div>
    <el-row class="headerLine">
      <el-col :span="24"><b>会话列表</b></el-col>
    </el-row>

    <!--content-->
    <div class="p-content">
      <el-row style="border: 1px solid #b2b2b2">
        <el-col :span="17">
          <div class="serviceLeft">
            <div class="serviceLeftTitle">
              <img src="http://img.99114.com/group1/M00/90/20/wKgGTFjQvfmAEPiRAAAUCIpuUkc122.png">
              <p>客服</p>
            </div>
            <div class="serviceLeftCon">
              <div style="overflow: hidden;">
                <div class="title" :class="{ active: isNow }" @click="tab('isNow')">在线会话<span v-if="isNow" class="el-icon-caret-top" style="color: #48ac2e;"></span></div>
                <div class="title" :class="{ active: isHistory }" @click="tab('isHistory')">历史记录<span v-if="isHistory" class="el-icon-caret-top" style="color: #48ac2e;"></span></div>
              </div>
              <div class="content">
                <div v-show="isNow">
                  <div v-for="(item,index) in userCount" class="isNowCon"  ref="tiaoshi" @click="isNowClick(item,index)" style="display:block">
                    <div style="position: relative">
                      <img :src="item.userInfor.headPicPath" >
                      <span v-if="item.unReadMsg.length!=0">{{item.unReadMsg.length}}</span>
                    </div>
                    <div style="display:none" class="thisUser">{{item.useId}}</div>
                    <p>{{item.userInfor.nickName}}</p>
                  </div>
                </div>
                <div v-if="isHistory">

                  <div v-for="(item,index) in oldConut" class="isHistoryCon"  ref="tiaoshi" @click="isHistoryClick(item,index)" style="display:block">
                    <div style="position: relative">
                      <img :src="item.userInfor.headPicPath">
                    </div>
                    <div style="display:none" class="thisUser2">{{item.id}}</div>
                    <p>{{item.userInfor.nickName}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="userCount.length != 0" v-for="(item,index) in userCount" class="serviceCenter" style="display: none">
            <div class="serviceCenterTitle">{{item.userInfor.nickName}}</div>
            <div class="serviceCenterCon" id="serviceCenterCon">
              <div class="noMore" @click="getHistory" v-show="currentUser.showMoreMessage">点击查看历史消息</div>
              <div class="content test" :id="item.useId" >
                <div v-for="(message,index) in item.nowMsg">
                  <div class="time" v-show="message.showTime">{{message.dateStr}}</div>

                  <div v-if="message.fromId != serviceId" class="msg_box_other">
                    <img :src="item.userInfor.headPicPath" alt="" class="new_left_img">
                    <div class="new_left_saojian"></div>
                    <div class="new_left_words">{{message.content}}</div>
                    <div style="clear:both"></div>
                  </div>

                  <div v-else-if="message.fromId == serviceId && message.contentType == 2" class="msg_box_other_right">
                    <img class="new_right_img" src="http://img.99114.com/group1/M00/90/20/wKgGTFjQvfmAEPiRAAAUCIpuUkc122.png">
                    <div class="new_right_saojian"></div><div class="new_right_words">{{message.content}}</div>
                    <div class="clear">
                    </div>
                  </div>

                  <div v-else-if="message.fromId == serviceId && message.contentType == 8" class="msg_box_other_right">
                    <img class="new_right_img"
                         src="http://img.99114.com/group1/M00/90/20/wKgGTFjQvfmAEPiRAAAUCIpuUkc122.png">
                    <!--<div class="new_right_saojian">-->
                    <!--</div>-->
                    <div class="">
                    </div>
                    <div class="new_right_words   new_right_sendImg" style="padding:0px;background:transparent;">
                      <img style="width:auto;height:auto;max-width:250px;max-height:250px;" :src="message.picUrl">
                    </div>
                    <div class="clear"></div>
                  </div>

                </div>
              </div>
            </div>
            <div class="serviceCenterInput">
              <div class="serviceCenterInputImg">
                <img style="margin-top:-2px;" src="http://img.99114.com/group1/M00/11/56/wKgGS1jTHu2AfX4tAAAGo2WpzBs692.png" alt="">

                <div class="fileInput left" styel="display:inline-block;">
                  <input type="file" name="msgFile" id="msgFile" class="upfile" @change="onFileChange"/>
                  <input class="upFileBtn" type="button" value="上传图片" onclick="document.getElementById('msgFile').click()" />
                </div>

              </div>



              <div class="serviceCenterInputCon">
                <textarea @keyup.enter="enterSendMsg" placeholder="请问，您想要咨询什么呢..." v-model="serviceCenterInput" id="wcl"></textarea>
                <div class="pushBtn" @click="sendMsg">发送</div>
              </div>
            </div>
          </div>

          <div v-if="oldConut.length != 0" v-for="(item,index) in oldConut" class="oldConutServiceCenter" style="display: none">
            <div class="oldConutServiceCenterTitle">{{item.userInfor.nickName}}</div>
            <div class="oldConutServiceCenterCon">
              <div class="noMore" @click="getHistory" v-show="currentUser.showMoreMessage">点击查看历史消息</div>
              <div class="content" :id="item.useId">
                <div v-for="(message,index) in item.nowMsg">
                  <div class="time" v-show="message.showTime">{{message.dateStr}}</div>

                  <div v-if="message.fromId != serviceId" class="msg_box_other">
                    <img :src="item.userInfor.headPicPath" alt="" class="new_left_img">
                    <div class="new_left_saojian"></div>
                    <div class="new_left_words">{{message.content}}</div>
                    <div style="clear:both"></div>
                  </div>
                  <div v-else-if="message.fromId == serviceId && message.contentType == 2" class="msg_box_other_right">
                    <img class="new_right_img" src="http://img.99114.com/group1/M00/90/20/wKgGTFjQvfmAEPiRAAAUCIpuUkc122.png">
                    <div class="new_right_saojian"></div><div class="new_right_words">{{message.content}}</div>
                    <div class="clear">
                    </div>
                  </div>

                  <div v-else-if="message.fromId == serviceId && message.contentType == 8" class="msg_box_other_right">
                    <img class="new_right_img"
                         src="http://img.99114.com/group1/M00/90/20/wKgGTFjQvfmAEPiRAAAUCIpuUkc122.png">
                    <div class="new_right_saojian"></div>
                    <div class="new_right_words   new_right_sendImg" style="padding:0px;background:transparent;">
                      <img style="width:auto;height:auto;max-width:250px;max-height:250px;" :src="message.picUrl">
                    </div>
                    <div class="clear"></div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </el-col>
        <el-col :span="7" class="serviceRight">
          <div class="serviceRightTitle">商品详情</div>
          <div class="no_history_order" v-show="noHistoryOrder">该客户还没有历史订单哦！</div>
          <div class="goodsDetails" v-show="showCurrent">
            <img :src="currentDetails.picShow">
            <div>
              <p style="margin-top:6px">{{currentDetails.name}}</p>
              <span style="display: block;margin-top:30px;">¥{{currentDetails.salesPrice}}</span>
            </div>
          </div>
          <div class="serviceRightTitle" style="margin-top: 10px">订单详情</div>
          <div style="max-height: 446px;overflow: auto;position:relative">
            <div v-for="item in rightOrderList" class="orderDetails">
              <div class="title">
                <p>订单号:{{item.orderCode}}</p>
                <p>日期:{{item.createDate}}</p>
              </div>
              <div class="goodsDetails">

                <div v-for="item2 in item.items">
                  <img :src="item2.imgUrl">
                  <div class="right">
                    <p>{{item2.pdName}}</p>
                    <span style="display: block">¥{{item2.pdPrice*item2.pdQuantity}}</span>
                  </div>

                </div>
              </div>
            </div>
            <!--<div class="more" v-if="!isNull">查看更多</div>-->
            <div class="more" v-if="isNull" @click="searchMore">查看更多</div>
            <p v-show="loadingEnd" style="color:red;text-align: center;" >没有更多数据了!</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--保存id-->
    <div class="id_box">
      <input type="text"   v-model="serviceId">
      <input type="text"  v-model="userId"  id="userId" ref="use">
    </div>
    <input type="text" style="display: none" id="currentUserId">
    <div class="history_text" v-show="showHistoryText">哈哈</div>
  </div>
</template>

<script>
  export default {
    name: 'sessionList',
    data () {
      return {
        /* 客服列表左侧 */
        isNow: true,
        isHistory: false,
        /* 客服列表中间输入框 */
        serviceCenterInput: '',
        serviceId: window.localStorage.getItem('serviceId'),
        userId: '',
        userCount:customerIdBox,
        oldConut:[],
        showHistoryText:false,
        orders:[],
        isNull:false,
        userGoodsId:'',
        currentDetails:{},
        showCurrent:false,
        size1:0,
        size2:0,
        startSize1:0,
        startSize2:0,
        //是否第一次点击查看历史消息
        isOneClick:0,
        //当前选中的聊天对象
        currentUser:{},
        loadingEnd:false,
        noHistoryOrder:false,
        rightOrderList:[],
        uploadFile:""
      }
    },
    mounted() {
      var that = this;
      setInterval(function() {
        var height = document.getElementsByClassName('view')[0].clientHeight;
        if(height >= 700) {
          that.resize(height);
        } else {
          that.resize(700);
        }
      },10);
      if(this.userCount.length != 0) {
        document.getElementsByClassName('isNowCon')[0].className = 'isNowCon isNowConActive';
        document.getElementsByClassName('serviceCenter')[0].style.display = 'block';
      }
      this.getHistoryUser()
    },
    methods: {
//      根据前台商品详情页id获取商品详情
      getGoodsdetailsByUser(userModel){

        let url=window.commentHOST+'/msg/getUserCommodityId'
        let serid=window.localStorage.getItem('serviceId')
        this.$resource(url).get({'serviceId':serid,'userId':userModel.useId}).then((response) => {
          console.log("获取的商品id",response);
          if (response.status==200){
            this.userGoodsId=response.body;
            if(typeof this.userGoodsId =="number"){
              let id = this.userGoodsId;
              let url=window.goodsHOST+'/commodityFront/getThemeCommodityList';
              this.$resource(url).get({'commodityIds':id}).then((response) => {
                console.log('response商品======',response);
                if (response.status==200){
                  this.currentDetails=response.body[0];
                  this.currentDetails.picShow = this.currentDetails.pic.split(',')[0]
                  this.showCurrent=true;
                }
              })

            }else{
              this.currentDetails=''
            }


          }
        })
      },


      //获取历史聊天的列表
      getHistoryUser(){
        let serviceId=window.localStorage.getItem('serviceId')
        let url=commentHOST+'/msg/getHistoryMsgUser'
        let that = this;
        this.$resource(url).get({'serviceId':serviceId}).then((response) => {
          if (response.status==200){
            console.log('获取历史聊天的列表',response);
            response.body.forEach(function (item,index){
              item.useId = item.id;
              item.nowMsg = [];
              that.getUserAvators(item.useId,function(infor){

                if (infor.nickName == undefined || infor.nickName.length == 0) {
                  infor.nickName = infor.account;
                }

                if (infor.headPicPath == undefined || infor.headPicPath.length == 0) {
                  infor.headPicPath = 'http://static.99114.cn/static/images/alb_h156.gif';
                }
                item.showMoreMessage = true;
                item.userInfor = infor;
                that.oldConut.push(item);
              })
            })
          }
        })
      },

      /**
       * 获取用户头像
       * @param memberId 用户id
       */
      getUserAvators(memberId,cb){
        let url= window.buyHOST +'/hdp/user/auth/getUserInfoById'
        this.$resource(url).get({'memberId':memberId}).then((response) => {
          if(response.body.code == 200){
            cb(response.body.respBody);//把获取的头像信息传给每个用户
          }
        })
      } ,

//发送消息
      sendMsg() {
        this.$nextTick(() => {
          this.userId = this.$refs.use.value
          let personId = this.userId;
          let wcl = document.getElementById('wcl')
          let pushmsg = document.getElementById('wcl').value;
          let to = document.getElementById('currentUserId').value
          let re = /^\s\s*\s$/
          if (!re.test(pushmsg) && pushmsg.length != 0) {
            var that = this;

            let message = {};
            message.content = pushmsg;
            message.to = to;
            message.contentType = "2";

            MsgManager.getInstance().sendMessage(message,function () {
              setTimeout(function () {
                that.scrollBottom(personId) ;
              }, 500);

            });

            this.serviceCenterInput = "";
          } else {
            alert('消息不能为空！')
          }
        })
      },
//      发送图片
      onFileChange(){
        console.log('接口上传图片');
        let message = {}
        MsgManager.getInstance().sendPic(this.currentUser.useId)

      },
//      查看历史消息
      getHistory(){
        // this.size1 +=6
        console.log("点击历史记录",this.currentUser.nowMsg);
        if (this.currentUser.nowMsg == undefined) {
          this.currentUser.nowMsg = [];
        }
        var that = this;
        WKYYIMManager.getInstance().getHistoryMessage(this.currentUser.useId + '',this.currentUser.nowMsg.length,5,function(response,showMoreMessage){
          console.log('查看lishi 图片',response);
          let tempArray = response.concat(that.currentUser.nowMsg);
          let dateline = 0;
          tempArray.forEach(function (item,index){
            if(index == 0) {
              item.showTime = true;
              dateline = item.dateline;
            }else {
              if(item.dateline - dateline < 5*60*1000){
                item.showTime = false;
              }else {
                item.showTime = true;
                dateline = item.dateline;
              }
            }

          })
          console.log("是否有更多消息",showMoreMessage);
          that.currentUser.nowMsg = [];
          that.currentUser.nowMsg = tempArray;
          that.currentUser.showMoreMessage = showMoreMessage;
        });

      },


      /* 客服列表左侧 */
      tab(flag) {
        this.noHistoryOrder = false;
        this.isNull = false;
        this.loadingEnd = false;
        this.rightOrderList = [];

        if (flag == 'isNow') {
          this.isNow = true;
          this.isHistory = false;
          let oldConutServiceCenter = document.getElementsByClassName('oldConutServiceCenter');
          for (let i = 0,len = oldConutServiceCenter.length; i < len; i ++) {
            oldConutServiceCenter[i].style.display = 'none';
          }
          let that = this;
          setTimeout(function () {
            if(that.userCount.length != 0) {
              document.getElementsByClassName('isNowCon')[0].className = 'isNowCon isNowConActive';
            }
          }, 10);
        } else {
          this.isNow = false;
          this.isHistory = true;
          let serviceCenter = document.getElementsByClassName('serviceCenter');
          for (let i = 0,len = serviceCenter.length; i < len; i ++) {
            serviceCenter[i].style.display = 'none';
          }
          let that = this;
          setTimeout(function () {
            if(that.oldConut.length != 0) {
              document.getElementsByClassName('isHistoryCon')[0].className = 'isHistoryCon isHistoryConActive';
            }
          }, 10);
        }

        this.currentUser.orderList = [];
        this.showCurrent = false;

      },
      /* 客服列表 选择客服 */
      isNowClick(item,index) {
        console.log("点击在线聊天",item);
        this.currentUser = item;
        //获取订单详情列表
        if(item.orderList == undefined || item.orderList.length == 0){
          this.getUserOrderByUser(item);
        }else {
          this.refreshOrderListByUser(item);
        }
        //获取商品详情
        this.getGoodsdetailsByUser(item);

        this.serviceCenterInput = "";
        this.userId = document.getElementsByClassName('thisUser')[index].innerHTML;
        let userIdNow = window.localStorage.getItem('msgUserId');

        item.unReadMsg = [];
        window.localStorage.setItem('msgUserId',item.userId);

        let wcl = document.getElementsByClassName('thisUser')[index].innerHTML;
        let test = document.getElementById('currentUserId');
        test.value = wcl;
        let isNowCon = document.getElementsByClassName('isNowCon');
        let serviceCenter = document.getElementsByClassName('serviceCenter');
        for (let i = 0, len = isNowCon.length; i < len; i++) {
          isNowCon[i].className = 'isNowCon';
          serviceCenter[i].style.display = 'none';
        }
        isNowCon[index].className = 'isNowCon isNowConActive';
        serviceCenter[index].style.display = 'block';
        this.scrollBottom(item.useId);
      },

      isHistoryClick(item,index) {
        this.currentUser = item;
        //获取订单详情列表
        if(item.orderList == undefined ||item.orderList.length == 0){
          this.getUserOrderByUser(item);
        }else {
          this.refreshOrderListByUser(item);
        }

        let thisIndex=index
        window.localStorage.setItem('historyIndex',thisIndex)
        window.localStorage.setItem('historyCuosterId',this.oldConut[index].id)
        let userIdNow = window.localStorage.getItem('msgUserId');

        this.showCurrent=false
        if(userIdNow) {
          if(userIdNow != this.userId) {
            window.localStorage.setItem('msgUserId',this.userId);
            for(var i = 0,len = this.userCount.length; i < len; i++) {
              if(this.userCount[i].useId == this.userId) {
                for(var j = 0,leng = this.userCount[i].unReadMsg.length; j < leng; j++) {
                  this.userCount[i].nowMsg.push(this.userCount[i].unReadMsg[j]);
                  this.userCount[i].unReadMsg.splice(j,1);
                }
                break;
              }
            }
          }
        }
        let wcl2=document.getElementsByClassName('thisUser2')[index].innerHTML;
        let test = document.getElementById('currentUserId');

        let isHistoryCon = document.getElementsByClassName('isHistoryCon');
        let oldConutServiceCenter = document.getElementsByClassName('oldConutServiceCenter');
        for (var i = 0, len = isHistoryCon.length; i < len; i++) {
          isHistoryCon[i].className = 'isHistoryCon';
          oldConutServiceCenter[i].style.display = 'none';
        }
        isHistoryCon[index].className = 'isHistoryCon isHistoryConActive';
        oldConutServiceCenter[index].style.display = 'block';
      },

      //获取订单列表信息
      getUserOrderByUser(userModel) {
        let url=orderHOST +'/order/sys/orderListAndItems'
        let body={
          "createTimeEnd": "",
          "createTimeEndStr": "",
          "createTimeStart": "",
          "createTimeStartStr": "",
          "hasRefund": 0,
          "memberId": userModel.useId,
          "orderCode": "",
          "organStatus": 0,
          "pageNo": userModel.orderPageNo == undefined ? 1:userModel.orderPageNo,
          "pageSize": userModel.orderPageSize == undefined ? 2:userModel.orderPageSize,
          "areaIds": [
            0
          ]
        }
        let that = this;
        console.log("参数",body);
        this.$resource(url).save({},body).then((response) => {
          console.log('response订单详情',response);
          if (response.status==200 && response.body.code == 200){
            userModel.orderPageNo = response.body.page.pageNo + 1;
            userModel.orderPageSize = response.body.page.pageSize;
            userModel.orderTotal = response.body.page.totalElement ;
            //设置时间格式
            for (let i=0;i< response.body.list.length;i++){
              response.body.list[i].createDate=new Date(response.body.list[i].createDate).getFullYear() + "/" +
                (new Date(response.body.list[i].createDate).getMonth() + 1) + "/" +
                new Date(response.body.list[i].createDate).getDate();
            }


            userModel.orderList = userModel.orderList == undefined ? response.body.list : userModel.orderList.concat(response.body.list)
            console.log(' userModel.orderList',userModel.orderList);
          }else {
            console.log('请检查返回的数据');
            userModel.orderPageNo = 1;
            userModel.orderPageSize = 2;
            if (userModel.orderList == undefined) {
              userModel.orderList = [];
            }

          }
          that.refreshOrderListByUser(userModel);
          console.log('最后返回的user',userModel);
          // return userModel;
        })
      },

      //订单列表页面赋值
      refreshOrderListByUser(userModel) {
        this.rightOrderList = userModel.orderList;
        if(userModel.orderTotal == userModel.orderList.length ){
          if(userModel.orderTotal!=0){
            this.loadingEnd = true;//没有更多数据加载显示
            this.isNull=false;//查看更对隐藏
            this.noHistoryOrder = false;//没有历史订单隐藏
          }else if(userModel.orderList.length == 0){
            this.loadingEnd = false;
            this.isNull=false;
            this.noHistoryOrder = true;//没有历史订单隐藏显示
          }
        }
        else{
          this.isNull=true;//查看更多显示
          this.loadingEnd = false;
          this.noHistoryOrder = false;
        }
      },

      //点击查看更多
      searchMore(){
        this.getUserOrderByUser(this.currentUser);
      },
      /**
       * 滚动到最底部
       * @param id
       */
      scrollBottom(id){
        var chatlist = document.getElementById(id);
        chatlist.scrollTop=chatlist.scrollHeight;
      },
      enterSendMsg(e){
        //回车键发送消息
        var e=e||window.event;
        if (e.keyCode == 13) {
          this.sendMsg();
        }
      }
    }
  }
</script>
<style>
  /*中间消息样式开始*/
  .center_msg_box{
    width:100%;
    margin-top:5.1rem;
    max-height: calc(100% - 11rem);
    overflow: auto;
  }
  .msg_box_other{
    width:50%;
    max-width:60%;
    padding:3px 5px;
    margin-bottom:12px;
    position: relative;
    overflow: hidden;
  }
  .msg_box_other_right{
    width:98%;
    padding:3px 5px;
    margin-bottom:12px;
    position: relative;
    float: right;
  }
  .new_left_img,.new_left_saojian,.new_left_words{
    float: left;
  }
  .new_left_img{
    width:34px;
    height:34px;
    border-radius: 3px;
  }
  .new_left_saojian{
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 14px solid #ebebeb;
    border-bottom: 7px solid transparent;
    margin-top: 3px;
    margin-left: 8px;
    background: transparent;
  }
  .new_left_words{
    padding: 3px 6px;
    border-radius: 3px;
    line-height: 18px;
    max-width: 60%;
    font-size: 12px;
    color: #252525;
    text-align: left;
    background: #fff;
    border:1px solid #ebebeb;

  }

  .new_right_img,.new_right_saojian,.new_right_words{
    float: right;
  }
  .new_right_img{
    width:34px;
    height:34px;
    border-radius: 6px;

  }
  .new_right_saojian{
    right: 14px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-left: 14px solid #48ac2e;
    border-bottom: 7px solid transparent;
    margin-top: 3px;
    margin-left: -2px;
    margin-right: 8px;
  }
  .new_right_words{
    padding: 3px 6px;
    border-radius: 3px;
    line-height: 18px;
    max-width: 60%;
    font-size:12px;
    color:#ffffff;
    text-align: left;
    background:#48ac2e;
    word-break: break-all;

  }
  .clear{
    clear:both;
  }
  /*中间消息样式结束*/
  /*上传图片*/
  .fileInput{width:45px;height:30px; background:url(http://img.99114.com/group1/M00/91/0A/wKgGTFjSUtCARjEcAAAFIFpnw10205.png) no-repeat;overflow:hidden;position:relative;    display: inline-block;margin:4px 0 0 10px;}
  .upfile{position:absolute;top:-8px;  width: 0px;left:35px;}
  .upFileBtn{width:102px;height:34px;opacity:0;filter:alpha(opacity=0);cursor:pointer;float:left;}
  .new_right_sendImg{
    background:url("../../assets/images/picAngle.png") -20px 0px no-repeat;
  }
</style>
<style scoped>
  .history_text{
    width:48%;
    height:500px;
    padding:0px 15px;
    position:absolute;
    z-index: 100;
    top:57px;
    left:28.3%;
    border-bottom:1px solid #858585;
    border-top:1px solid #858585;
    background:#fff;
    display: none;

  }
  /* 会话列表左侧 */
  .serviceLeft{
    float: left;
    width: 25%;
    height: 600px;
    background-color: #48ac2e;
  }
  .serviceLeftTitle{
    height: 50px;
    text-align: left;
    background-color: #daeed5;
    line-height: 50px;
    padding: 10px;
  }
  .serviceLeftTitle img{
    border-radius: 10px;
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 10px;
  }
  .serviceLeftTitle p{
    display: inline-block;
  }
  .serviceLeftCon .title{
    width:50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    float: left;
    background-color: #6dbd58;
    position: relative;
    cursor: pointer;
  }
  .serviceLeftCon .title span{
    position: absolute;
    left: 45%;
    bottom: -5px;
  }
  .serviceLeftCon .active{
    background-color: #428730;
  }
  .serviceLeftCon .content{
    overflow: auto;
    height:348px;
    padding: 10px 12px;
  }
  .isNowCon,.isHistoryCon{
    height: 48px;
    line-height:48px;
    padding: 0 2px;
    text-align: left;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .isNowCon img,.isHistoryCon img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    float: left;
    margin: 4px 3px;
  }
  .isNowCon p,.isHistoryCon p{
    display: inline-block;
    margin-left: 3px;
  }
  .isNowCon span,.isHistoryCon span{
    display: block;
    width: 18px;
    height: 18px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: -5px;
    background-color: #f04b51;
    color: #ffffff;
    font-size: 8px;
  }
  .isNowConActive,.isHistoryConActive{
    background-color: #6dbd58;
  }

  /* 会话列表中间部分 */
  .serviceCenter,.oldConutServiceCenter{
    display: none;
    float: left;
    width: 75%;
    height: 600px;
  }
  .serviceCenterTitle,.oldConutServiceCenterTitle{
    height: 29px;
    line-height: 30px;
    border-bottom: 1px solid #f4f4f4;
  }
  .serviceCenterCon{
    overflow:auto;
  }
  .serviceCenterCon,.oldConutServiceCenterCon{
    height: 379px;
    padding: 0px 15px;
    border-bottom: 1px solid #b2b2b2;
    overflow: auto;
  }
  .noMore,.time{
    font-size: 10px;
    color: #5c5c5c;
    line-height: 30px;
  }
  .noMore{
    cursor: pointer;
  }
  .serviceCenterCon .content,.oldConutServiceCenterCon .content{
    overflow: auto;
  }
  .serviceCenterCon .content img,.oldConutServiceCenterCon .content img{
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }


  .contentLeft{
    display: flex;
    display: -webkit-flex;
    width: 60%;
    text-align: left;
    float: left;
  }

  .contentRight{
    width: 60%;
    text-align: right;
    float: right;
    margin-bottom:12px;
  }
  .contentRight img{
    float: right;
  }

  .serviceCenterInput,.oldConutServiceCenterInput{
    height: 190px;
  }
  .serviceCenterInputImg,.oldConutServiceCenterInputImg{
    height: 36px;
    line-height: 36px;
    background-color: #ebebeb;
    text-align: left;
    text-indent: 20px;
  }
  .serviceCenterInputCon,.oldConutServiceCenterInputCon{
    position: relative;
    height:160px;
    text-align: right;
    padding: 1% 0;
  }
  textarea {
    width: 98%;
    height: 70%;
    line-height: 20px;
    border: none;
    outline: none;
    resize: none;
  }

  /* 会话列表右侧 */
  .serviceRight{
    height: 600px;
    padding: 10px;
    text-align: left;
    border-left: 1px solid #b2b2b2;
    position:relative;
  }
  .serviceRightTitle{
    line-height: 20px;
    text-indent: 5px;
    border-bottom: 1px solid #b2b2b2;
  }
  .goodsDetails{
    display: flex;
    display: -webkit-flex;
    padding: 10px 5px;
    overflow: hidden;
  }
  .goodsDetails img{
    width: 60px;
    height: 60px;
    float: left;
  }
  .goodsDetails p{
    margin-left: 10px;
    float: left;
  }
  .goodsDetails span{
    font-size: 16px;
    font-weight: bold;
    color: #f04b51;
    margin-left: 10px;
    margin-top: 22px;
  }
  .orderDetails .title{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    margin-top: 10px;
    padding: 0 5px;
    line-height: 20px;
    border-bottom: 1px solid #ebebeb;
  }
  .orderDetails .title p{
    color: #5c5c5c;
    font-size: 10px;
  }
  .more{
    color: #48ac2e;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  /*发送按钮样式*/
  .pushBtn{
    width:58px;
    height:32px;
    background:#48ac2e;
    color:#fff;
    line-height: 32px;
    text-align: center;
    letter-spacing: 2px;
    font-size:14px;
    position:absolute;
    right:100px;
    bottom:25px;
    border-radius: 3px;
    cursor: pointer;
  }
  .no_history_order{
    width:100%;
    height:100px;
    position:absolute;
    top:0;
    left:0;
    z-index: 10;
    background:#ffffff;
    line-height: 100px;
    text-align: center;
    font-size: 16px;
    color:#48ac2e;
    margin-top:145px;

  }

  .test{
    height: 348px!important;
  }
  .msg_box_other {
    max-width: 60%;
    padding: 3px 5px;
    margin-bottom: 12px;
    /* position: relative; */
    /* overflow: hidden; */
  }
</style>
