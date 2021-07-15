<template>
    <div >
        <!-- <div class="header">
            <img src="./images/header.jpg" alt="">
        </div> -->
        <div class="g-bd" id="g-bd">
            <div class="g-row">
                <img src="./images/guide1.jpg">
                <img src="./images/guide2.jpg">
            </div>
            <div class="g-row">
                <img src="./images/guide3.jpg">
                <img src="./images/guide4.jpg">
            </div>
            <a :href="downloadUrl" class="btn"  v-text="text" v-if="!wechat && this.deviceType !== 'iOS'"  download="网库好单品.apk"></a>
            <a :href="downloadUrl" class="btn"  v-text="text" v-if="!wechat && this.deviceType === 'iOS'"  ></a>
            <div class="btn"  v-text="text" v-if="wechat" @click="down" ></div>
            <div class="browser">
                <a :href="touchUrl">
                    使用触屏版浏览>>
                </a>
            </div>
        </div>
        <div ref="mask" class="mask" v-show="willShow" @click="maskClick()">

        </div>
       
        
    </div>
</template>
<script>
import {_iOSOrAndroid} from '../../util/index'
export default {
    data() {
        return {
            text: "下载好单品APP",
            willShow: false,
            touchUrl: HREF,
            downloadUrl: '/#/guide',
            getAppUrl: '',
            wechat: true,
            deviceType: '',
            openAppUrl:''
        }
    },
    mounted() {
        let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.$refs.mask.style.height = h + 'px';
        this.$refs.mask.style.width = w + 'px';
        
        this.deviceType = _iOSOrAndroid()
        // console.log(this.deviceType)
        if(this.deviceType === 'Android'){
            this.getAppUrl = HOST_APPMANAGE + '/version/getHdpAndriodUrl'
            this.openAppUrl = 'goodproduct://splash.app'
        }else if(this.deviceType === 'iOS'){
            this.getAppUrl = HOST_APPMANAGE + '/version/getHdpIOSUrl'
            // this.openAppUrl = 'wangkuHaoDanPin://HaoDanPin.wangkuInformation.com'
            this.openAppUrl = 'https://itunes.apple.com/us/app/Hao-Dan-Pin/id1118815448?l=zh&ls=1&mt=8'
            // this.openAppUrl = 'wx3acdec8071b6970e://HaoDanPin.wangkuInformation.com'
        }
        this.isWeixin()
        if(!this.wechat){
            this.openApp(this.openAppUrl)
        }
    },
    methods: {
        isWeixin: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.wechat = true
            } else{
                this.wechat = false
                
            }
            this.getAppDownloadUrl()
        },
        // 点击下载按钮
        down(){
            if(this.deviceType === 'iOS'){
                // window.location.href = this.openAppUrl
                this.openApp(this.openAppUrl)
            }else{
                this.willShow = this.wechat
            }
            
        },
        // 关闭遮罩
        maskClick: function() {
            this.willShow = false;
        },
        // 请求下载地址
        getAppDownloadUrl () {
            this.$api_get_no({
                url: this.getAppUrl,
            }).then(res => {
                this.downloadUrl = res.respBody
            })
        },
        // 默认打开APP
        openApp(url) {
            let i = document.createElement('iframe');
            i.setAttribute('src', url);
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function(){
                    i.remove();
                }, 90)
            }
            document.body.appendChild(i);
        },
       
    }
}

</script>
<style scoped>

.header {
    width: 100%;
    
}

.header img {
    width: 100%;
}

.g-bd {
    width: 100%;
    position: relative;
}

.g-row {
    width: 100%;
}

.g-row img {
    width: 100%;
    vertical-align: text-bottom;
}

.btn {
    position: absolute;
    width: 18.2rem;
    height: 5rem;
    left: 9.85rem;
    bottom: 25.375rem;
    background: #000;
    line-height: 5rem;
    text-align: center;
    font-size: 2rem;
    color: #fff;
    font-family: "Microsoft YaHei";
    border-radius: 8px;
}

.browser {
    position: absolute;
    width: 13rem;
    left: 50%;
    margin-left: -6.5rem;
    bottom: 22.6rem;
}

.browser a {
    display: block;
    color: #000;
    font-family: "Microsoft YaHei";
    /*font-weight: bold;*/
    font-size: 1.4rem;
    /*font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";*/
}

.mask {
    position: absolute;
    top: 0rem;
    background: rgba(0, 0, 0, 0.8) url(./images/icon.png) no-repeat 2rem 2rem;
    background-size: 33rem 12rem;
}
</style>
