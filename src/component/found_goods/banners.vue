<template>
    <div class="banners" v-if="bannersData.length>0">
        <div class="banners_top" v-if="bannersData[0].disabled==1">
            <div class="title">
                <div v-if="title!=''&&title!=undefined" class="div1"><img src="../../assets/images/icon/1@2x.png" alt=""></div>
                <div class="div2">{{title}}</div>
            </div>
            <div class="min_title">{{subTitle}}</div>
        </div>
        <div class="banner_body">
            <ul>
                <li v-for="(item, index) in bannersData" :key="index" v-if="bannersData[index].disabled==1" @click="jumpUrl(bannersData[index].contentLinkUrl,bannersData[index].contentOperationType)">
                    <img :src="item.contentImgUrl" alt="">
                </li>
            </ul>
        </div>
        <div class="border"></div>

    </div>
</template>
<style scoped>
.banners {
    width: 100%;
    text-align: left;
}

.banners .banners_top {
    height: 8rem;
    font-family: PingFangSC-Regular;
    color: #333;
    padding-top: 2.1rem;
}

.banners .banners_top .title {
    font-size: 1.8rem;
    /*margin-left:3.2rem;*/
}

.title .div1 {
    float: left;
    width: 2rem;
    margin: 0rem 0.5rem 0rem 1rem;
}

.title .div1 img {
    width: 100%;
}

.title .div2 {
    text-align: left;
}

.banners .banners_top .min_title {
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-left: 1rem;
}

.banners .banner_body {
    padding: 0rem 1rem;
}

.banners .banner_body li {
    width: 100%;
    height: 15rem;
    background: #ccc;
    margin-bottom: 1rem;
}

.banners .banner_body li a {
    display: block;
}

.banners .banner_body li img {
    width: 100%;
    background: #f4f4f4;
}

.banner_body li:last-child {
    margin-bottom: 2rem;
}

.border {
    width: 100%;
    height: 1rem;
    background: #F4F4F4;
}
</style>
<script>
export default {
    props: {
        data: {},
    },
    data() {
        return {
            bannersData: '',
            dataList: [],
            title: '',
            subTitle: '',
        }
    },
    mounted() {

    },
    watch: {
        data: function(newVal, oldVal) {
            this.bannersData = newVal;
            if (this.bannersData.length > 0) {
                this.title = this.bannersData[0].title.titleContent;
                this.subTitle = this.bannersData[0].title.subTitle;
            }

        }
    },
    methods: {
        jumpDetail(id) {
            if (id.indexOf('?') != -1) {
                //          var u = navigator.userAgent
                //          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
                //            window.Android.intent(id+'&found_index=1')
                //            window.location.href = id+'&found_index=1'
                //          }else {//是IOS
                //            window.location.href = id+'&found_index=1'
                //          }
                window.location.href = id + '&found_index=1'
            } else {
                //          var u = navigator.userAgent
                //          if( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ){//是Android
                //            window.Android.intent(id+'&found_index=1')
                //            window.location.href = id+'&found_index=1'
                //          }else {//是IOS
                //            window.location.href = id+'&found_index=1'
                //          }
                window.location.href = id + '?&found_index=1'
            }
        },
        jumpUrl(url, type) {
            if (url != '无跳转' && url != '') {
                if (type == 1) {
                    //链接类型
                    if (window.Android) {
                        window.Android.intent(url)

                    } else {
                        window.location.href = url
                    }
                } else {

                    if (window.Android) {
                        window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url + '&found_index=1')

                    } else {
                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url + '&found_index=1'
                    }
                }
            }
        }

    }
}
</script>
