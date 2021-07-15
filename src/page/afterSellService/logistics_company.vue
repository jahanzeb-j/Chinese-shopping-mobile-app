<template>
    <div class="logistics_company">
        <div class="header">
            <span class="return" @click="returnBack"><img src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">物流公司</span>
        </div>
        <div class="searchDiv">
            <input type="text" placeholder="省份、行业" class="custom-input" id="search" v-model="searchName">
            <span class="sp1" @click="search">搜索</span>
        </div>
        <div class="list" id="list">
            <dl class="left">
                <li v-for="letter in letters" :id=letter class="leftLi" :name=letter>
                    <span class="leftSp">{{ letter }}</span>
                    <ul class="logisticUl">
                        <li v-for="logisticsItem in logisticsItems" @click="chooseCompany(logisticsItem)" v-if="letter==logisticsItem.value.substring(0,1)" class="logisticLi">
                            {{ logisticsItem.label }}
                        </li>
                    </ul>
                </li>
            </dl>
            <ul class="right">
                <li v-for="letter in letters" @click="clickRight(letter)">
                    {{ letter }}
                </li>
            </ul>
        </div>
        <div class="other">
            <div class="div1">其他</div>
            <div class="div2">
                <input type="text" v-model="other" placeholder="输入快递公司名称">
            </div>
            <div class="div3" @click="finsh">
                <mt-button type="default" class="finish" size="normal">
                    完成
                </mt-button>
            </div>
        </div>
    </div>
</template>


<style>
    .mint-indexlist-navitem{
        font-size:26px !important;
    }

    .mint-button{
        width: 8rem;
        margin: 1rem;
        font-size: 1.2rem !important;
        height:3rem !important;
    }

</style>

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

    .logistics_company{
        width:100%;
        padding-top: 11.5rem;
    }

    .logistics_company  .header{
        padding: 1.3rem 0;
        position: fixed;
        width:100%;
        background: #fff;
        z-index:111;
        top:0;
    }

    .logistics_company  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .logistics_company  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .logistics_company .custom-input {
        border-radius: 6px;
        background: #f4f4f4;
        width: 90%;
        height: 2.8rem;
        line-height: 2.8rem;
        background-image: url("../../assets/images/search-icon.png");
        background-repeat: no-repeat;
        background-position: 2% 38%;
        background-size: 4%;
        padding-left: 2.5rem;
        font-size: 1.4rem;
    }

    input::-webkit-input-placeholder {
        text-align: left;
        font-size: 1.4rem;
    }

    input::-ms-input-placeholder {
        text-align: left;
        font-size: 1.4rem;
    }

    .logistics_company .searchDiv{
        padding: 2rem 0.8rem;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        border-top: 1px solid #D6D6D6;
        border-bottom: 1px solid #D6D6D6;
        position: fixed;
        top: 4.6rem;
        background: #fff;
        width: 100%;
    }

    .logistics_company .searchDiv .sp1{
        font-size:1.4rem;
    }

    .logistics_company .list{
        text-align: left;
        padding: 0 0.2rem 0 0.8rem;
        font-size:1.3rem;
        overflow: hidden;
    }

    .mint-indexlist .mint-cell-wrapper .mint-cell-text{
        font-size:1.3rem !important;
    }

    .logistics_company .list .one{
        line-height: 4.4rem;
    }

    .logistics_company .list .one.active{
        background: red;
    }


    #list .mint-indexlist-nav .mint-indexlist-navlist .mint-indexlist-navitem{
        font-size:20px !important;
    }


    .logistics_company .left{
        float: left;
    }

    .logistics_company .left li{
        padding: 0.5rem 0;
    }

    .logistics_company .right{
        float: right;
        position: fixed;
        right: 0;
    }

    .logistics_company .other .div1{
        font-size:1.2rem;
        padding: 1rem 0.8rem;
        text-align: left;
        border-top:1px dashed #797979;
        border-bottom:1px dashed #797979;
    }

    .logistics_company .other .div2{
        width:100%;
        padding: 0 0.8rem;
    }

    .logistics_company .other .div2 input{
        width:100%;
        border: 1px solid #797979;
        height:4rem;
        line-height:4rem;
        font-size:1.2rem;
    }

    .logistics_company .other .div3{
        width:100%;
        text-align: right;
        padding-right:0.8rem;
    }

</style>

<script>
    import { Toast } from 'mint-ui'
    export default{
        name: 'afterSellService_list',
        data(){
            return{
                other: '',
                searchName: '',
                searchLogistics: '',
                params: 1,
                selected: '',
                logisticsItems: '',
                index2: '',
                letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            }
        },

        created() {
            this.getLogisticsName()

        },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //选择物流公司
            chooseCompany( name ){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'logistics_info?label='+name.label+ '&value='+name.value+'&refundCode='+this.$route.query.refundCode+'&orderItemId='+this.$route.query.orderItemId;
            },

            //获取物流公司的数据
            getLogisticsName(){
                let url = HOST_HDPORDERS + '/order/public/dictListByType/'
                this.$resource(url).get({ type: 'LOGISTICS_COMPANY'}).then((response) => {
                    // console.log(response )
                    this.logisticsItems = response.body.list
                    for( var i = 0; i < response.body.list.length; i++ ){
                        response.body.list[i].value = response.body.list[i].value.substring(0,1).toUpperCase() + response.body.list[i].value.substring(1)
                    }
                    this.$nextTick(()=>{
                        var leftLis = document.getElementsByClassName('leftLi')
                        var leftSps = document.getElementsByClassName('leftSp')
                            for( var i = 0; i < leftLis.length; i++ ){
                                var logisticLis = leftLis[i].getElementsByClassName('logisticUl')[0].getElementsByClassName('logisticLi')
                                if( logisticLis.length == 0 ){
                                    leftLis[i].style.display = 'none'
                                }
                            }
                    })
                })
            },

            //搜索物流公司
            search(){
                var logisticLis = document.getElementsByClassName('logisticLi')
                var searchName = this.searchName.substring(0,2)
                for( var i = 0; i < logisticLis.length; i++ ){
                    var logisticName = logisticLis[i].innerText.substring(0,2)
                    if( logisticName == searchName ){
                        var topY = logisticLis[i].offsetTop
                        document.body.scrollTop = topY - 266
                        this.params = 2
                    }
                }
                if( this.params === 1 ){
                    Toast({
                        message: '暂无此物流公司',
                        position: 'center',
                        duration: 3000
                    });
                }
            },

            //点击右边的索引值
            clickRight(index){
                Toast({
                    message: index,
                    position: 'center',
                    duration: 1000
                })
                var topY = document.getElementById(index).offsetTop
                document.body.scrollTop = topY - 230
            },

            //手动输入物流公司
            finsh(){
                var value = 'otherCompany'
                if( this.other == '' ){
                    Toast({
                        message: '请选择物流公司',
                        position: 'center',
                        duration: 3000
                    });
                }else {
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'logistics_info?label='+this.other+'&value='+value+'&refundCode='+this.$route.query.refundCode+'&orderItemId='+this.$route.query.orderItemId;
                }
            }
        }
    }
</script>
