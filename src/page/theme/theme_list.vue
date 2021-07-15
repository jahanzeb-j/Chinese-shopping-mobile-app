<template>
    <div class="page-swipe1">
        <header class="header">
            <span class="return" @click="back">
                <img src="../../assets/images/returnFront.png" alt="">
            </span>
            <span class="working">{{name}}</span>
        </header>
        <div class="main">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange">
                <div class="mainPic">
                    <sameFigureList v-for="(themeListItem,index) in themeListItems" :msg1='themeListItem'></sameFigureList>
                </div>
                <div v-show="noMore" class="noMore"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
                <div slot="bottom" class="mint-loadmore-bottom" style="background: #f4f4f4;">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }" class="release">释放加载更多•••</span>
                    <span v-show="bottomStatus === 'loading'">
                    <mt-spinner type="snake" class="snake">加载中•••</mt-spinner>
                </span>
                </div>
            </mt-loadmore>
            <div id="backTop" @click="backTop" v-show="showBackTop">
                <img src="../../assets/images/backTop.png" alt="">
            </div>
        </div>
    </div>
</template>

<style>
    .mint-spinner-snake{
        display: block;
        margin-left: 55%;
        margin-top: -20%;
    }

    .mint-loadmore-bottom{
        margin-top: 10%;
        margin-left: -18%;
        margin-bottom: -10% !important;
    }
</style>

<style scoped>

    .page-swipe1{
        width:100%;
        height:100%;
        background: #f4f4f4;
    }

    .header{
        background:#fff;
        color: #000;
        font-size: 1.8rem;
        height: 3.5rem;
        line-height: 3.5rem;
        border-bottom: 1px solid #CDCDCD;
        top: 0;
        left: 0;
        width: 100%;
        position: fixed;
        z-index: 333;
        top: 0;
        left:0;
    }

    .return{
        float: left;
        margin-left: 0.7rem;
        margin-top: 5px;
        width:1rem;
        height: 2rem;
    }

    .return img{
        width:100%;
    }

    .main{
        width: 100%;
        background: #f4f4f4;
    }

   .main .mainPic{
        padding-top: 4.5rem;
        width:100%;
        background: #fff;
    }

    #scroller1 ul{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
      -webkit-flex-direction: row;
        justify-content: space-around;
        height:8.8rem;
    }

    #scroller1 ul li{
        display: block;
        width: 11.5rem;
        height: 7rem;
        margin-right: 0.7rem;
    }

    #scroller1 ul li a{
        display: block;
        overflow: hidden;
    }

    #scroller1 ul li img{
        width:100%;
    }

    .carefullyChoose img{
        width: 26%;
        height: 0.5rem;
    }

    #backTop{
        position: fixed;
        bottom:50px;
        right:15px;
        z-index: 333
    }

    .release{
        font-size:1.4rem;
    }

    .noMore{
        font-size: 1.2rem;
        color: #333;
        height: 2rem;
        line-height: 2rem;
        width: 100%;
        margin-top: 2rem;
    }

</style>

<script type="text/ecmascript-6">
    import sameFigureList from '../../component/sameFigureList.vue'
    import { Indicator } from 'mint-ui';
    export default{
        name: 'theme_list',
        data(){
            return{
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: '',
                startY: 0,
                endY: 0,
                showBackTop: false,
                page_url: HOST_HDPTHEME,
                themeListItems:[],
                name: '',
                someNumber: 0,
                noMore: false
            }
        },
        created(){
            this.getThemeListData()
            this.initFirstScreen()
            window.addEventListener('scroll', this.lazyload)

        },
        methods: {
            //加载更多
            handleBottomChange(status){
                this.bottomStatus = status;
            },

            loadBottom(){
                setTimeout(() => {
                    if( this.allLoaded == false ){
                        this.getThemeListData()
                        this.$refs.loadmore.onBottomLoaded();
                    }else {
                        return false
                    }
                }, 1500);
            },

            //初始化首屏加载
            initFirstScreen(){
                var images = document.images
                // 加载首屏图片
                for (let i = 0, len = images.length; i < len; i++) {
                    var obj = images[i];
                    // 如果在可视区域并且还没被加载过
                    if (obj.getBoundingClientRect().top < document.documentElement.clientHeight && !obj.isLoad) {
                        obj.isLoad = true;
                        // 先调用 HTML5 方法
                        if (obj.dataset) {
                            this.imageLoaded(obj, obj.dataset.original);
                        } else {
                            this.imageLoaded(obj, obj.getAttribute('data-original'));
                        }
                    } else {  // 假设图片标签在 HTML 中的顺序和实际页面中顺序一致
                        break;
                    }
                }
            },

            //把占位图改为真实的图片
            imageLoaded( obj,src ){
                var img = new Image();
                img.onload = function() {
                    obj.src = src;
                };
                img.src = src;
            },

            //滑动的时候若图片出现到可视区的话就让真实的图片展示
            lazyload() {
                let lazy = 0;
                let images = document.images;
                for (let i = 0, len = images.length; i < len; i++) {
                    var obj = images[i];
                    if (obj.getBoundingClientRect().top - lazy < document.documentElement.clientHeight && !obj.isLoad) {
                        obj.isLoad = true;
                        if (obj.dataset){
                            this.imageLoaded(obj, obj.dataset.original);
                        } else{
                            this.imageLoaded(obj, obj.getAttribute('data-original'));
                        }
                    }
                }
            },

            //请求主题列表页面的数据
            getThemeListData(){
                let url = this.page_url + '/theme/getThemeByCategoryId'
                this.someNumber = this.someNumber + 1
                this.$resource(url).get({ categoryId: this.$route.query.categoryId, pageSize: 10,currentPage: this.someNumber}).then((response) => {
                    if( response.body.code == 200 ){
                        var lists =  response.body.respBody.list
                        this.themeListItems = this.themeListItems.concat( lists )
                        if( this.someNumber == response.body.respBody.pages ){
                            this.allLoaded = true
                            this.noMore = true
                        }
                        for( var i = 0; i < this.themeListItems.length; i++ ){
                            if( this.themeListItems[i].clicks == null ){
                                this.themeListItems[i].clicks =0
                            }else if(this.themeListItems[i].clicks > 999 ){
                                this.themeListItems[i].clicks = (this.themeListItems[i].clicks)/1000+'K'
                            }else {
                                this.themeListItems[i].clicks = this.themeListItems[i].clicks
                            }
                        }
                        this.name = response.body.respBody.list[0].categoryName
                    }
                })
            },

            //返回顶部
            backTop(){
                window.scrollTo(0, 0)
            },

            //返回上一级
            back(){
                this.$router.push({path:'themeIndex'})
               //window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'themeIndex';
            }
        },

        components: {
            sameFigureList
        }
    }
</script>


