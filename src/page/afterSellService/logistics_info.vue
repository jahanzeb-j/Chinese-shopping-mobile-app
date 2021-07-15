<template>
    <div class="logistics_info">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">物流信息</span>
        </div>
        <div class="grayLine"></div>
        <div class="main">
            <ul>
                <li class="li1">
                    <div class="div1">
                        <span class="left">物流公司 </span>
                        <span v-if="showWord" class="companySp1"  @click="chooseCompany">请选择物流公司</span>
                        <span v-if="!showWord" class="companySp1 companySp2"  @click="chooseCompany">{{ companyLabel }}</span>
                    </div>
                    <div class="div2" @click="chooseCompany">
                       <img src="../../assets/images/rightri.png" alt="" class="pic">
                    </div>
                </li>
                <li>
                    <div class="div1">
                        <span class="left">物流单号 </span>
                        <input type="text" placeholder="请输入物流单号" v-model="logisticsNo">
                    </div>
                </li>
                <li>
                    <div class="div1">
                        <span class="left">联系电话 </span>
                        <input type="text" placeholder="请输入11位手机号或0开头的固话" v-model="userPhone" class="textWord" id="userPhone">
                    </div>
                </li>
                <li>
                    <div class="div1">
                        <span class="left">退款说明 </span>
                        <input type="text" placeholder="选填" v-model="logistcsExplain">
                    </div>
                </li>
            </ul>
        </div>
        <div class="grayLine"></div>
        <div class="container">
            <!--    照片添加    -->
            <div class="z_photo">
                <div class="z_file" v-if="(!showAddPic && !isWeChat && !isIos) || ( isIos && !showAddPic)" @click="showNotPic">
                    <img src="../../assets/images/addImage.png" alt="">
                </div>
                <div class="z_file" v-if="(showAddPic && !isWeChat && !isIos ) || (isIos && showAddPic)">
                    <input type="file" name="file" id="file" value="" accept="image/*" @change="imgChange('z_photo','z_file');" />
                </div>

                <div class="z_file" v-if="(isWeChat && !isIos)" @click="upWeChatPic">
                    <img src="../../assets/images/addImage.png" alt="">
                </div>
                <div v-if="(isWeChat && !isIos)" class="weChatDiv">
                </div>
            </div>
        </div>
        <div class="apply">
            <mt-button size="small" class="submitApply" @click="submitApply">提交退货物流</mt-button>
        </div>
    </div>
</template>

<style scoped>
    img{
        width:100%;
        height:100%;
    }
    span{
        display: inline-block;
    }

    .grayLine{
        width:100%;
        height:1rem;
        background: #f4f4f4;
    }

    input{
        font-size:1.5rem;
    }

    .logistics_info{
        width:100%;
        background: #f4f4f4;
    }

    .logistics_info  .header{
        padding: 1.3rem 0;
        background: #fff;
    }

    .logistics_info  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .logistics_info  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .logistics_info .main{
        font-size:1.5rem;
        background: #fff;
    }

    .logistics_info .main ul li{
        display: flex;
        display: -webkit-flex;
        padding: 1.2rem 0.8rem;
        border: 1px solid #D8D9DB;
    }

    .logistics_info .main ul li.li1{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding-top: 0;
        padding-bottom: 0;
        height: 4.1rem;
        line-height: 4.1rem;
    }

    .logistics_info .main ul li.li1 .div1{
        width:100%;
        display: flex;
        display: -webkit-flex;
        justify-content:flex-start;
        -webkit-justify-content:flex-start;
    }

    .logistics_info .main ul li.li1 .div1 .companySp1{
        float: left;
        width:24rem;
        text-align: left;
        overflow: hidden;
    }

    .logistics_info .main ul li.li1 .div1 .companySp2{
        float: left;
        width:24rem;
        text-align: left;
        overflow: hidden;
        color:#000;
        font-size: 1.5rem;
        font-size: 1.5rem;
        font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
    }

    .logistics_info .main ul li .div2{
        width:4rem;
        display: flex;
        display: -webkit-flex;
        height: 100%;
        padding-top: 1.6rem;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
    }

    .logistics_info .main ul li .div2 .pic{
        width:0.6rem ;
        height:1rem;
    }

    .logistics_info .main ul li .left{
        margin-right:1.5rem;
        font-size: 1.6rem;
        color: #333;
    }

    .logistics_info .apply{
        margin: 2.5rem auto 0;
    }

    .logistics_info .apply .submitApply{
        width:35.9rem;
        background: #F9BE00;
        font-size:1.7rem !important;
        color:#fff;
        height:4.3rem !important;
    }

    .textWord{
        width:25rem;
    }

    .assess_image{
        width:100%;
        height: 7.5rem;
        line-height: 7.5rem;
        font-size: 1.5rem;
        color: #868686;
        text-align: left;
        display: flex;
        display: -webkit-flex;
        background: #fff;
        padding: 1rem 0.8rem;
        align-items: center;
    }

    .assess_image img{
        width:5.5rem;
        height:5.5rem;
        margin-right: 1rem;
    }

    .container {
        width: 100%;
        height: 100%;
        overflow: auto;
        clear: both;
    }

    .z_photo {
        width: 100%;
        height: 10rem;
        padding: 0.3rem;
        overflow: auto;
        clear: both;
        margin: 1rem auto;
        background: #fff;
        float: left;
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        -webkit-justify-content: flex-start;
        align-items: center;
        -webkit-align-items: center;
    }

    .z_photo img {
        width: 5.5rem;
        height: 5.5rem;
    }

    .z_addImg {
        float: left;
        margin-right: 0.2rem;
        width:5.5rem;
        height:5.5rem;
    }

    .z_addImg img{
        width:5.5rem;
        height:5.5rem;
    }

    #file{
        width:5.5rem;
        height:5.5rem;
    }

    .z_file {
        width: 5rem;
        height: 5rem;
        background: url(../../assets/images/addImage.png) no-repeat left top;
        background-size: 100% 100%;
        float: left;
        margin-right: 0.5rem;
    }

    .z_file input::-webkit-file-upload-button {
        width: 1rem;
        height: 1rem;
        border: none;
        position: absolute;
        outline: 0;
        opacity: 0;
    }

    .z_file input#file {
        display: block;
        width: auto;
        border: 0;
        vertical-align: middle;
        color: #fff;
    }

    .z_alert p{
        height:3.5rem;
        line-height: 3.5rem;
        font-size: 1.2rem;
    }

    .z_alert p:nth-child(2) span {
        display: inline-block;
        width: 49%;
        height: 3.5rem;
        line-height: 3.5rem;
        float: left;
        border-top: 1px solid #ddd;
    }

    .companySp1{
        color: #C2C2C2;
    }
</style>

<script>
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui'
    import Vue from 'vue'
    export default{
        name: 'logistics_info',
        data(){
            return{
                showWord: true,
                loginCode: '',
                companyLabel: '',
                companyValue: '',
                logisticsNo: '',
                userPhone: '',
                logistcsExplain: '',
                refundGoodsImg: [],
                params: {
                    itemIds: '',
                    logistcsExplain: '',
                    logisticsCompany: '',
                    logisticsCompanyName: '',
                    logisticsNo: this.logisticsNo,
                    proofImgs: '',
                    senderTel: '',
                    targetId: ''
                },
                checkUserPhone: 0,
                showAddPic: true,
                timestamp: '',
                nonceStr: '',
                weixinSignature: '',
                isWeChat: '',
                localIds: '',
                serverId: '',
                orderItemId: '',
                isIos: ''
            }
        },
        created(){
          this.getCompany(),
          this.checkIsIosOrAndroid()

        },
        methods: {
            //返回
            returnBack(){
                // window.history.back()
                this.$router.push({path:"afterSellService_list"})
            },

            //选择物流公司
            chooseCompany(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'logistics_company?refundCode='+this.$route.query.refundCode+'&orderItemId='+this.$route.query.orderItemId;
            },

            //获取传递过来的物流公司
            getCompany(){
                (function(doc, win) {
                    var docEl = doc.documentElement,
                        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                        recalc = function() {
                            var clientWidth = docEl.clientWidth;
                            if (!clientWidth) return;
                            if (clientWidth >= 640) {
//                    docEl.style.fontSize = '100px';
                            } else {
//                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                            }
                        };
//
                    if (!doc.addEventListener) return;
                    win.addEventListener(resizeEvt, recalc, false);
                    doc.addEventListener('DOMContentLoaded', recalc, false);
                })(document, window);
                if( this.$route.query.label == "" || this.$route.query.label == undefined ){
                    this.showWord = true
                }else {
                    this.showWord = false
                }
                this.companyLabel = this.$route.query.label
                this.companyValue = this.$route.query.value
            },

            //判断是IOS还是Android
            checkIsIosOrAndroid(){
                var u = navigator.userAgent
                if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
                    this.isIos = false
                    this.checkIsWeChat()
                }else {//是IOS
                    this.isIos = true
                }
            },

            //判断是否是从微信进入的
            checkIsWeChat(){
                this.$nextTick(()=>{
                    //先判断是否是在微信中打开的
                    var ua = navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i)=="micromessenger") {
                        //是在微信中打开
                        this.isWeChat = true
                        this.getSignature()
                    } else {
                        //不是在微信中打开
                        this.isWeChat = false
                    }
                })
            },

            //获取签名
            getSignature(){
                // 请求后台接口获取签名
                let url = HOST_HDPUSER + '/weixin/getSignature'
                let urlParam = window.location.href.split('#')[0]
                this.nonceStr = Math.random().toString(36).substr(2)
                this.timestamp = new Date().getTime().toString().substr(0,10);
                this.$resource(url).get({ url: urlParam,nonceStr:this.nonceStr, timestamp: this.timestamp }).then((response) =>{
                    if( response.body.code == 200 ){
                        this.weixinSignature = response.body.signature
                        wx.config({
//                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: 'wxa7187fa65b31924e', // 公众号的唯一标识
                            timestamp:this.timestamp, // 生成签名的时间戳
                            nonceStr: this.nonceStr, // 生成签名的随机串
                            signature: this.weixinSignature,// 签名
                            jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    }else {
                        Toast({
                            message: response.body.msg,
                            position: 'center',
                            duration: 3000
                        });
                    }
                })
            },

            //在微信中上传图片
            upWeChatPic(){
                var _this = this
                var imgList = document.getElementsByClassName("z_addImg");
                if( imgList.length >= 4 ){
                    Toast({
                        message: '最多上传4张图片',
                        duration: 2000,
                        className: "toast"
                    });
                }else {
                    wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在的接口，
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (res) {
                                _this.localIds = res.localIds ; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                wx.uploadImage({
                                    localId: _this.localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function (res) {
                                        var serverId = res.serverId; // 返回图片的服务器端ID
                                        let url = HOST_HDPORDERS + '/order/public/uploadWeiXinWebFile'
                                        _this.$resource( url ).get({ mediaId: serverId,ext: 'jpg' }).then((response) =>{
                                            if( response.body.code == 200 ){
                                                _this.picUrl = 'http://'+( HOST_IMGFILEPATH + response.body.entity )
                                                var img = document.createElement("img");
                                                img.setAttribute("src", _this.picUrl);
                                                img.setAttribute("width", '110px');
                                                img.setAttribute("height", '110px');
                                                var imgAdd = document.createElement("span");
                                                imgAdd.appendChild(img);
                                                imgAdd.setAttribute("class", "z_addImg");
                                                var parentDiv = document.getElementsByClassName('weChatDiv')[0]
                                                parentDiv.appendChild(imgAdd);
                                                img.onload = function () {
                                                    this.onclick = function () {
                                                        MessageBox.confirm('确定要删除该图片吗?').then(action => {
                                                            this.parentNode.remove()
                                                        },function () {
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    },
                                    fail: function(res){
                                        alert("上传失败，msg："+JSON.stringify(res));
                                    }
                                });
                            }
                        });
                    });
                }
            },

            imgChange(obj1, obj2) {
                var imgList = document.getElementsByClassName("z_addImg");
                var _this = this
                //获取点击的文本框
                var file = document.getElementById("file");
                //存放图片的父级元素
                var imgContainer = document.getElementsByClassName(obj1)[0];
                //获取的图片文件
                var fileList = file.files;
                //文本框的父级元素
                var input = document.getElementsByClassName(obj2)[0];
                var imgArr = [];
                //遍历获取到得图片文件
                for (var i = 0; i < fileList.length; i++) {
                    var imgUrl =file.files[i];
                    if(imgUrl.type.indexOf('image') !== -1) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var dataURL = e.target.result;
                            _this.picBase = dataURL
                        }
                        reader.readAsDataURL(imgUrl);
                    }
                    setTimeout(function () {
                        if( _this.picBase ){
                            let url = HOST_UPIMAGES;
                            var fileStr = {
                                fileStr: _this.picBase
                            }
                            
                            // _this.$resource ( url ).save( fileStr ).then((response) => {
                            //     if( response.body.code == 200 ){
                            //         _this.picUrl = 'http://'+(HOST_IMGFILEPATH + response.body.filePath)
                            //         imgArr.push( _this.picUrl );
                            //         var img = document.createElement("img");
                            //         img.setAttribute("src", _this.picUrl);
                            //         img.setAttribute("width", '110px');
                            //         img.setAttribute("height", '110px');
                            //         var imgAdd = document.createElement("span");
                            //         imgAdd.setAttribute("class", "z_addImg");
                            //         imgAdd.appendChild(img);
                            //         imgContainer.appendChild(imgAdd);
                            //         img.onload = function () {
                            //             if( imgList.length >= 4 ){
                            //                 _this.showAddPic = false
                            //             }
                            //             this.onclick = function () {
                            //                 MessageBox.confirm('确定要删除该图片吗?').then(action => {
                            //                     this.parentNode.remove()
                            //                 if( imgList.length < 4 ){
                            //                     _this.showAddPic = true
                            //                 }
                            //                 },function () {
                            //                 })
                            //             }
                            //         }
                            //     }
                            
                            // })
                            _this.$api_post({
                                url:url,
                                data:fileStr
                            }).then(res=>{
                                
                                if( res.code == 200 ){
                                    _this.picUrl = 'http://'+(HOST_IMGFILEPATH + res.filePath)
                                    imgArr.push( _this.picUrl );
                                    var img = document.createElement("img");
                                    img.setAttribute("src", _this.picUrl);
                                    img.setAttribute("width", '110px');
                                    img.setAttribute("height", '110px');
                                    var imgAdd = document.createElement("span");
                                    imgAdd.setAttribute("class", "z_addImg");
                                    imgAdd.appendChild(img);
                                    imgContainer.appendChild(imgAdd);
                                    img.onload = function () {
                                        if( imgList.length >= 4 ){
                                            _this.showAddPic = false
                                        }
                                        this.onclick = function () {
                                            MessageBox.confirm('确定要删除该图片吗?').then(action => {
                                                this.parentNode.remove()
                                            if( imgList.length < 4 ){
                                                _this.showAddPic = true
                                            }
                                            },function () {
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    },300)
                };
            },

            //提示只能上传4张图片
            showNotPic(){
                Toast({
                    message: '最多上传4张图片',
                    duration: 2000,
                    className: "toast"
                });
            },

            //提交货运申请
            submitApply(){
                var companySp1 = document.getElementsByClassName('companySp1')[0].innerHTML
                if( companySp1 == '' || companySp1 == '请选择物流公司' ){
                    Toast({
                        message: '请选择物流公司',
                        duration: 2000,
                        className: "toast"
                    });
                }else if( this.logisticsNo == '' ){
                    Toast({
                        message: '请输入物流单号',
                        duration: 2000,
                        className: "toast"
                    });
                }else{
                    let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
                    let flag = reg.test( this.userPhone ); //true
                    if( this.userPhone == ""){
                        var userPhone = document.getElementById("userPhone");
                        userPhone.focus();
                        Toast({
                            message: '请输入手机号',
                            duration: 2000,
                            className: "toast"
                        });
                    } else if( !flag ){
                        var userPhone = document.getElementById("userPhone");
                        userPhone.focus();
                        Toast({
                            message: '请输入正确手机号',
                            duration: 2000,
                            className: "toast"
                        });
                    }else{
                        let url = HOST_HDPORDERS + '/order/front/buyerRefundSend/'
                        this.loginCode= window.localStorage.getItem('loginCode')
                        // Vue.http.interceptors.push((request, next)  =>{
                        //     request.headers.set('loginCode', this.loginCode);
                        //     next((response) => {
                        //         return response
                        //     });
                        // });
                        var z_addImgs = document.getElementsByClassName('z_addImg')
                        if(  z_addImgs.length > 0 ){
                            for( var i = 0; i < z_addImgs.length; i++ ){
                                this.refundGoodsImg.push(z_addImgs[i].getElementsByTagName('img')[0].src)
                            }
                        }
                        if( this.refundGoodsImg.length > 1){
                            this.refundGoodsImg = this.refundGoodsImg.join(',')
                        }else if( this.refundGoodsImg.length == 1) {
                            this.refundGoodsImg = this.refundGoodsImg[0]
                        }else {
                            this.refundGoodsImg = ''
                        }
                        this.params = {
                            itemIds: this.$route.query.orderItemId,
                            logistcsExplain: this.logistcsExplain,
                            logisticsCompany: this.companyValue,
                            logisticsCompanyName:this.companyLabel ,
                            logisticsNo: this.logisticsNo,
                            proofImgs: this.refundGoodsImg,
                            senderTel: this.userPhone,
                            targetId: this.$route.query.refundCode
                        }
                        // this.$resource(url).save({}, this.params ).then((response) => {
                        //     if( response.status == 200 ){
                        //         if( response.body.code == 200 ){
                        //             window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'afterSellService_detail?refundCode='+ this.$route.query.refundCode;
                        //         }else {
                        //             MessageBox('提示', response.body.msg);
                        //         }
                        //     }
                        // })
                        this.$api_post({
                            url:url,
                            data:this.params
                        }).then(res=>{
                            if( res.code == 200 ){
                                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'afterSellService_detail?refundCode='+ this.$route.query.refundCode;
                            }else {
                                MessageBox('提示', res.msg);
                            }
                        })
                    }
                }
            }
        }
    }
</script>
