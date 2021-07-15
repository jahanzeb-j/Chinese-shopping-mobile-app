<template>
    <div class="choose_card">
        <div class="header">
            <span class="return" @click="returnBack"><img  style="height: 2rem;width:1.2rem" src="../../assets/images/returnFront.png" alt=""></span>
            <span class="orderTitle">选择银行卡</span>
        </div>
        <div class="grayLine"></div>
        <div class="current">
            <div class="word">
                当前银行卡
            </div>
            <div class="currentCard" @click="chooseDefault">
                <div class="currentCardLeft">
                    <div class="div1">
                        <img :src=defaultBank.bankImgPath alt="">
                    </div>
                    <div class="div2">
                        <span class="div2_1" >{{ defaultBank.bank_name }}</span>
                        <span v-show="defaultBank.card_type ==2" class="div2_2">储蓄卡</span>
                        <span v-show="defaultBank.card_type ==3" class="div2_2">信用卡</span>
                    </div>
                </div>
                <div class="currentCardRight">
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp2">{{defaultBank.card_no}}</span>
                </div>
            </div>
        </div>
        <div class="grayLine"></div>
        <div class="ableChooseCard">
            <div class="word">
                可选用银行卡
            </div>
            <div class="currentCard" v-for="item in noDefaultBank" @click="chooseThisCard(item)">
                <div class="currentCardLeft">
                    <div class="div1">
                        <img :src=item.bankImgPath alt="">
                    </div>
                    <div class="div2">
                        <span class="div2_1" >{{ item.bank_name }}</span>
                        <span v-show="item.card_type ==2" class="div2_2">储蓄卡</span>
                        <span v-show="item.card_type ==3" class="div2_2">信用卡</span>
                    </div>
                </div>
                <div class="currentCardRight">
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp1">****</span>
                    <span class="sp2">{{item.card_no}}</span>
                </div>
            </div>
        </div>
        <div class="newCard">
            <mt-button type="default" class="useNewCard" @click="useNewCard">使用新卡支付</mt-button>
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

    .choose_card{
        width:100%;
    }

    .choose_card  .header{
        padding: 1.3rem 0;
    }

    .choose_card  .header .orderTitle{
        font-size:1.6rem;
        color: #333;
    }

    .choose_card  .header .return{
        float: left;
        margin-left:0.9rem;
        width:1rem;
        height:2rem;
    }

    .choose_card .current{
        padding: 0 0.8rem 1rem 0.8rem;
    }

    .choose_card .current .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
    }

    .currentCard{
        padding: 1.1rem 0;
        background: #5DC6DD;
        border-radius: 3%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        color: #fff;
        margin-bottom: 1rem;
    }

    .currentCard .currentCardLeft{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
    }

    .currentCard .currentCardLeft .div1{
        width:5rem;
        height:5rem;
        border-radius: 50%;
        background: #fff;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        margin-right: 0.6rem;
    }

    .currentCard .currentCardLeft .div1 img{
        width:3rem;
        height:3rem;
    }

    .currentCard .currentCardLeft .div2{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
    }

    .currentCard .currentCardLeft .div2 .div2_1{
        font-size: 1.3rem;
        font-weight: bolder;
    }

    .currentCard .currentCardLeft .div2 .div2_2{
        font-size: 1rem;
        margin-top:0.5rem;
    }

    .currentCard .currentCardRight{
        font-size:1.2rem;
    }

    .currentCard .currentCardRight .sp1{
        margin-right:0.7rem;
    }

    .currentCard .currentCardRight .sp2{
        margin-right:1rem;
    }

    .choose_card .ableChooseCard{
        padding: 0 0.8rem;
    }

    .choose_card .ableChooseCard .word{
        width:100%;
        font-size:1.4rem;
        text-align: left;
        padding: 1.6rem 0 1rem 0;
    }

    .choose_card .newCard{
        width:100%;
        padding: 0 0.8rem;
        margin-top:1rem;
    }

    .choose_card .newCard .useNewCard{
        width:95%;
        background: #fff;
        border:1px dashed #333;
        border-radius: 3%;
        font-size:1.4rem;
        color:#333;
        height:3rem;
        line-height: 3rem;
    }

</style>

<script>
    export default{
        name: 'choose_card',
        data(){
            return{
                orderCode: '',
                totalMoney: '',
                bank_name: '',
                card_no: '',
                card_type: '',
                bankLists: '',
                no_agree: '',
                defaultBank: '',
                noDefaultBank: '',
            }
        },
        created(){
            this.getCurrentCard()

        },
        methods: {
            //返回
            returnBack(){
                window.history.back()
            },

            //使用新卡支付
            useNewCard(){
                var orderCode = JSON.parse( window.localStorage.getItem('orderCode') )
                window.location.href =  window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'add_bank_card?orderCode='+orderCode;
            },

            //获取当前卡的信息同时获取卡列表
            getCurrentCard(){
                this.$nextTick(()=>{
                    this.orderCode = window.localStorage.getItem('orderCode')
                    this.totalMoney = window.localStorage.getItem('totalMoney')
                    this.defaultBank = JSON.parse(window.localStorage.getItem('defaultBank'))
                    var noDefaultBank = JSON.parse(window.localStorage.getItem('noDefaultBank'))
                    if (noDefaultBank != null && noDefaultBank.length >= 1) {
                        this.noDefaultBank = noDefaultBank
                    }
                })
            },

            //选择此银行卡为默认卡，改变localstorage
            chooseThisCard(item){
                window.localStorage.setItem('defaultBank',JSON.stringify(item))
                for( var i = 0; i < this.noDefaultBank.length; i++ ){
                    if( this.noDefaultBank[i].no_agree == item.no_agree ){
                        this.noDefaultBank.splice(i,1)
                    }
                }
                this.noDefaultBank.push( this.defaultBank )
                window.localStorage.setItem('noDefaultBank',JSON.stringify(this.noDefaultBank))
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'current_card?orderCode='+this.orderCode+'&totalMoney='+this.totalMoney;
            },

            //选择当前的卡，不作处理
            chooseDefault(){
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'current_card?orderCode='+this.orderCode+'&totalMoney='+this.totalMoney;
            }
        }
    }
</script>
