<template>
    <div class="choose_address">
        <div class="add_address-img clearfix">
            地址选择
            <img @click="back()" src="../../assets/images/returnFront.png" >
        </div>
        <div class="add_address-line"></div>
        <div class="address_main">
            <div class='main_top'>
                 <span>
                    {{ chooseProvince }}
                </span>
                <span class="word">
                    请选择
                </span>
            </div>
           <ul class="ul1">
               <li v-for="(province,index) in provinces" @click="chooseProvice(province,index)" :class="{'active': index=== selected }">
                   {{ province.t }}
               </li>
           </ul>
        </div>
    </div>
</template>
<style scoped>
    .add_address-img{
        width:100%;
        position: fixed;
        top:0;
        width:100%;
        background: #fff;
        z-index: 111;
        display: block;
        color: #252525;
        font-size: 1.8rem;
        height: 4rem;
        line-height: 4rem;
    }
    .add_address-img img{
        width: 1.2rem;
        height: 2rem;
        margin-top: 1rem;
        position: absolute;
        left: 1.2rem;
        /*margin-left: -28rem;*/
    }
    .add_address-line{
        height: 1rem;
        background: #f4f4f4;
        width: 100%;
        border-top:1px solid #d8d8d8;
        margin-top: 4rem;
    }
    .address_main{
        text-align: left;
    }

    .address_main .main_top{
        height:2.5rem;
        line-height:2.5rem;
        font-size:1.6rem;
    }

    .address_main .main_top .word{
        font-size:1.5rem;
        color: red;
        width:2rem;
    }


    .address_main .ul1 li{
        height: 3rem;
        line-height: 3rem;
        padding-left: 0.5rem;
        position: relative;
        overflow: hidden;
        border-top: 1px solid #333;
        font-size:1.5rem;
    }

    .address_main .ul1 li.active{
        color: red
    }


</style>
<script>
    import Vue from 'vue'
    import { Toast } from 'mint-ui';
    export default{
        name: 'choose_address',
        data(){
          return{
              provinces: '',
              isSelected: false,
              selected: '',
              chooseProvince: ''
          }
        },
        created(){
          this.getProvinceName()

        },
        methods: {
            //返回
            back(){
                window.history.back()
            },

            //获取省份的名字
            getProvinceName(){
                let url = "../../../static/css/areas.json";
                this.$resource (url ).get({ }).then((response) => {
                    this.provinces = response.body
                    // console.log( this.provinces )
                })
            },

            //选择省份
            chooseProvice(item,index){
                this.selected = index
                this.chooseProvince = item.t
            }
        }
    }
</script>
