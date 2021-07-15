<template>
    <div class="page-swipe" style="padding-bottom: 10rem">
        <mt-header fixed title="单品特选" class="head"></mt-header>
        <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                     @bottom-status-change="handleBottomChange">
            <!-- <div id="wrapper1" ref="swipe">
                <div id="scroller1">
                    <ul>
                        <li class='moveLi' @click="jumpToThemeList( listItem.id )" v-for="(listItem, index) in listItems">

                            <img :src=listItem.categoryPic alt="" class="goodPic" >
                        </li>
                    </ul>
                </div>
            </div> -->
            <!-- <div class="grayLine"> -->
            <!-- </div> -->
            <div class="carefullyChoose">
                <img src="../../assets/images/carefullyChoose1.png" alt="">
                <span class="centerChoose">精选推荐</span>
                <img src="../../assets/images/carefullyChoose2.png" alt="">
            </div>
            <div class="mainPic" @touchend="keepEnd">
                <sameFigureList v-for="(themeIndexItem,index) in themeIndexItems" :msg1='themeIndexItem'></sameFigureList>
            </div>
            <div class="noMore"><img src="../../assets/images/end-3x.png" style="vertical-align: middle;width:auto;height: 1.3rem"></div>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }" class="release">释放加载更多...</span>
                <span v-show="bottomStatus === 'loading'" >
                <mt-spinner type="snake">加载中...</mt-spinner>
            </span>
            </div>
        </mt-loadmore>
        <div id="backTop" @click="backTop" v-show="showBackTop">
            <img src="../../assets/images/backTop1.png" alt="">
        </div>
    </div>
</template>

<style>
    .mint-spinner-snake{
        display: block;
        bottom: 30px;
        left: -2rem;
        position: absolute;
    }

    .mint-loadmore-bottom{
        margin-top: 10%;
        margin-left: -18%;
    }
    .mint-button{
        border: 0 !important;
    }
</style>
<style scoped>
    ::-webkit-scrollbar {
        background-color: #fff;
        scrollbar-face-color: #fff ;
        -webkit-appearance: none;
        width: 0;
        height: 0;
        -webkit-overflow-scrolling: touch;
    }

    ::-webkit-scrollbar-track-piece{
        background-color: #fff;
    }

    .page-swipe {
        position: relative;
        padding-bottom:5rem!important;
        background: #f4f4f4;
    }

    .head {
        background: #fff;
        color: #333;
        font-size: 1.8rem;
        height: 3.5rem;
        border-bottom: 1px solid #CDCDCD;
        position: absolute;
        z-index: 22;
        top: 0;
        left: 0;
        width: 100%;
    }

    #wrapper1 {
        position: relative;
        z-index: 1;
        top: 3.5rem;
        left: 0;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        height: 8.8rem;
        padding: 0.9rem 0.9rem 0.9rem 0.9rem;
        -webkit-overflow-scrolling: touch;
        background: #fff;
    }

    #scroller1 {
        position: absolute;
        z-index: 11;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: auto;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
        height: 8.8rem;
    }

    #scroller1 ul {
        display: -webkit-flex;
        display:flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        height: 8.8rem;
    }

    #scroller1 ul li {
        display: block;
        width: 11.5rem;
        height: 7rem;
        margin-right: 0.7rem;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
    }

    #scroller1 ul li img{
        width: 100%;
        position: absolute;
        top:0;
        left:0;
    }
    .grayLine {
        width: 100%;
        height: 1.2rem;
        background: #f4f4f4;
        margin-top: 3.3rem;
    }

    .carefullyChoose {
        width: 100%;
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #fff;
    }

    .carefullyChoose img {
        width: 26%;
        height: 0.5rem;
    }

    .carefullyChoose .centerChoose {
        margin: 0 0.9rem;
        font-size:1.5rem;
    }

    #backTop {
        position: fixed;
        bottom: 5.9rem;
        right: 15px;
        z-index: 333;
        width:4rem;
        height:4rem;
    }

    #backTop img{
        width:100%;
        height:100%;
    }

    .release {
        font-size: 1.4rem;
        margin-left: 8rem;
    }

    .floatL {
        float: left;
    }

    .floatR {
        float: right;
    }

    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: visible
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
    import { Indicator } from 'mint-ui';
    import sameFigureList from '../../component/sameFigureList.vue'
    export default{
        name: 'themeIndex',
        data(){
            return {
                allLoaded: false,
                bottomStatus: '',
                wrapperHeight: '',
                startY: 0,
                endY: 0,
                startX: 0,
                moveX: 0,
                endX: 0,
                showBackTop: false,
                allLoaded: false,
                page_url: HOST_HDPTHEME,
                listItems: [],
                themeIndexItems: [],
                src1: '',
                someNumber: 0,
                noMore: false
            }
        },
        mounted(){
            this.getThemeIndexListData()
            this.getThemeIndexData()

        },
        activated(){

            if(localStorage.getItem('isNeedRefreshThemeIndex') === 'true'){
                this.someNumber = 0
                  this.themeIndexItems = []
                  this.getThemeIndexData()
                  localStorage.setItem('isNeedRefreshThemeIndex',false)
            }
        },
        methods: {
            //加载更多
            handleBottomChange(status){
                this.bottomStatus = status;
            },
            loadBottom(){
                if( this.allLoaded == false ){
                    this.getThemeIndexData();
                }

            },
            //返回顶部
            backTop(){
                window.scrollTo(0, 0)
            },

            //进入主题列表
            jumpToThemeList( categoryId ){
                this.$router.push({path:'theme_list' , query: { categoryId: categoryId }})

            },

            //主题首页头部列表的数据
            getThemeIndexListData(){
                let url = this.page_url + '/themeCategory/getCategoryListByCondition'
                this.$resource(url).get({ status:1}).then((response) => {
                    if( response.body.code == 200 ){
                        this.listItems = response.body.respBody.list
                    }
                })
            },

            //请求主题首页的数据
            getThemeIndexData(){
                let hash = window.location.hash
                hash = hash.split('/')
                let url = this.page_url + '/theme/getListByCondition'
                this.someNumber = this.someNumber + 1
                this.$resource(url).get({ pageSize: 6, currentPage: this.someNumber, status: 1 }).then((response) => {
                    if( response.body.code == 200 ){
                        var lists =  response.body.respBody.list
                        this.themeIndexItems = this.themeIndexItems.concat( lists )


                        for( var i = 0; i < this.themeIndexItems.length; i++ ){
                            if( this.themeIndexItems[i].clicks == null ){
                                this.themeIndexItems[i].clicks = 0
                            }else if(this.themeIndexItems[i].clicks > 999 ){
                                this.themeIndexItems[i].clicks =  (this.themeIndexItems[i].clicks)/1000+'K'
                            }else {
                                this.themeIndexItems[i].clicks =  this.themeIndexItems[i].clicks
                            }
                        }

                        if( this.someNumber == (response.body.respBody.pages) ){
                            this.allLoaded = true
                            this.noMore = true
                        }else{

                            //this.$refs.loadmore.onBottomLoaded();
                            this.loadBottom()
                        }
                    }
                })
            },

            //滑动结束的位置
            keepEnd(){
                if( document.body.scrollTop > 1000 ){
                    this.showBackTop = true
                }else {
                    this.showBackTop = false
                }
            }

        },
        components: {
            sameFigureList
        }
    }
</script>
