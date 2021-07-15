<template>
    <div class="f_threenadv" v-if="bannerData.disabled == 1">
        <div class="border"></div>
        <div class="f_box">
            <div class="adv_left">
                <span @click="jumpUrl(bannerData[0].contentLinkUrl,bannerData[0].contentOperationType)" >
                    <img :src="img1" alt="">
                </span>
            </div>
            <div class="adv_right">
                <div class="top_img">
                    <span @click="jumpUrl(bannerData[1].contentLinkUrl,bannerData[1].contentOperationType)"   class="hdpGood">
                        <img :src="img2" alt="">
                    </span>
                </div>
                <div class="bottom_img">
                    <span @click="jumpUrl(bannerData[2].contentLinkUrl,bannerData[2].contentOperationType)"   class="hdpGood">
                        <img :src="img3" alt="">
                    </span>
                </div>
            </div>
        </div>
        <div class="border"></div>
    </div>
</template>
<style scode>
    *img{
        width:100%;
    }
    span{
        display:inline-block;
    }
    .f_threenadv{
        width: 100%;
        padding-bottom:0;
        /*background:#ccc;*/
    }
    .f_box{
         width: 100%;
         padding:1rem;
         overflow: hidden;
    }
    .f_threenadv .adv_left{
        float: left;
        width:50%;
        height:17rem;
        /*background:greenyellow;*/
        /*margin-right: 0.8rem;*/
    }
    .f_threenadv .adv_left img{
        width:17.5rem;
        height:17rem;
        background:#f4f4f4;
    }
    .f_threenadv .adv_right{
        float: right;
        width: 50%;
        height:17rem;
    }
    .f_threenadv .adv_right div{
        /*width: 100%;*/
        height: 8.2rem;
        margin-left:0.5rem;
    }
    .f_threenadv .adv_right .top_img{
        margin-bottom:0.5rem;
        height:8.2rem;
    }
    .f_threenadv .adv_right div img{
        width: 100%;
        height:8.2rem;
        background:#F4F4F4;
    }
    .border{
        width: 100%;
        height:0.8rem;
        background:#F4F4F4;
    }
</style>
<script>
    export default {
        props: {
            data: {},
        },
        data(){
            return{
                bannerData:'',
                img1:'',
                img2:'',
                img3:'',
            }
        },
        mounted(){

        },
        watch: {
            data: function (newVal, oldVal) {
                this.bannerData=newVal;
                // console.log(this.bannerData)
                this.img1=this.bannerData[0].contentImgUrl;
                this.img2=this.bannerData[1].contentImgUrl;
                this.img3=this.bannerData[2].contentImgUrl;
            }
        },
        methods:{
            jumpUrl(url,type){
                // console.log(url,type)
                // console.log(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url)
                if(url != '无跳转' && url != ''){
                if(type == 1){
                    //链接类型
                    // good_detail?commodityId=82510468 5
                    // good_detail?commodityId=85035169&navCurrentIndex=-2 undefined
                    if(window.Android){
                        window.Android.intent(url);
                    }else{
                        window.location.href = url;
                    }
                }else{
                    if(window.Android){
                        window.Android.intent(window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + url+'&found_index=1')
                    
                    }else{
                        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+url+'&found_index=1'
                    }
                }
                }
            },
        },
    }
</script>