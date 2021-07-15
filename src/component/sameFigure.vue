<template>
    <div class="figure" @click="jumpToThemeDetail(msg.id)">
        <figure>
            <div class="imgWrap">
                <img src='' alt="" class="big" :data-original=msg.listPic>
                <div class="figureDiv">
                    <img src="../assets/images/readNum.png" alt="" class="eye">
                    <span class="num">{{ msg.clicks }}</span>
                </div>
            </div>
            <!--<span class="word">{{ msg.name }}</span>-->
            <figcaption class="first1">
                {{ msg.name }}
            </figcaption>
            <figcaption class="first2">
                {{ msg.subtitle }}
            </figcaption>
        </figure>
    </div>
</template>

<style scoped>
    .figure{
        width: 100%;
        padding-bottom: 3rem;
        position: relative;
        background: #fff;
    }

    .imgWrap{
        position: relative;
    }

    .figure .figureDiv{
        width: 4.8rem;
        height: 1.8rem;
        font-size:1.2rem;
        color: #fff;
        position: absolute;
        right:0;
        bottom: 0;
        background: url('../assets/images/readBackground.png') no-repeat left top;
        background-size: 100% 100%;
        padding: 0 0.5rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
    }

    .figure .figureDiv .num{
        margin-left:0.5rem;
    }

    .figure .word{
        position: absolute;
        top:8rem;
        width:100%;
        z-index: 1121;
        font-size: 4rem;
        font-weight: bolder;
        color:#000;
        white-space: pre-wrap;
        left:0;
    }

    .figure .first1{
        font-size:1.8rem;
        font-weight: bolder;
        margin: 1.2rem 0 ;
    }

    .figure .first2{
        font-size:1.4rem;
        color: #666;
        padding: 0 0.8rem;
        line-height: 1.7rem;
    }

    .figure figure .big{
        width: 100%;
        height:20rem;
        position: relative;
    }

    .figure figure .eye{
        width: 1.1rem;
        height:0.7rem;
    }

</style>

<script>
    export default {
        name: 'sameFigure',
        props: ['msg'],
        created(){
        },
        methods: {
            //点击进入主题详情页面
            jumpToThemeDetail(id){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'theme_detail?id='+id;
            },
        }
    }
</script>