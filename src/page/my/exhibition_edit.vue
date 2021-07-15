<template>
  <div class="all">
    <div class="goods-img">
      编辑
      <img @click="back()" src="../../assets/images/returnFront.png" >
      <div class="goods_success" @click="back()">完成</div>
    </div>
    <!--<div class="phone_change1-line"></div>-->
    <div class="phone_change1-line"></div>
    <div class="goods_list clearfix" v-for="(checkb,index) in list">
      <div class="register-protocol" >
        <input  type="checkbox" class="shopCh" name="Sex" :value="checkb.id"  v-model='checkboxModel'  />
        <div class="option"></div>
      </div>
      <div class="goods_img"><img :src="checkb.collectionPics" ></div>
      <div class="goods_text">
        <div class="goods_detail1">{{checkb.collectionName.length>14?checkb.collectionName.slice(0,11)+'..':checkb.collectionName}}</div>
        <div class="goods_detail2">{{checkb.collectionRemark}}</div>
        <!-- <div class="goods_detail3" v-if="checkb.isAppointment">可预约</div>
        <div class="goods_detail3" v-if="!checkb.isAppointment">不可预约</div>
        <div class="goods_detail4">{{checkb.newGoodsNum?null:0}}上新</div>
        <div class="goods_detail5">{{checkb.allGoodsNum}}商品</div> -->
      </div>
      <div class="goods_line1"></div>
      <div class="goods_line">
        <div></div>
      </div>
    </div>
    <div class="shopping_mon">
      <div class="shopping_jieshuan" @click="delete1()">删除</div>
      <span class="shopping_money">已选择</span>
      <div class="shopping_money">项内容<span>{{checkboxModel.length}}</span></div>
    </div>
  </div>

</template>
<style scoped>
  body{
    background-color:#f4f4f4;
  }
  .all{
    background-color:#f4f4f4;
    height: 100%;
  }
  .goods_list{
    background-color:#fff;
  }
  .goods_success{
    float: right;
    font-size: 1.3rem;
    position: absolute;
    right: 1.2rem;
    top: 0;
  }
  .goods-img{
    position: fixed;
    top: 0;
    z-index: 1111;
    background: #fff;
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
    background: #fff;
    padding: 0 1.3rem;
    text-align: center;
  }
  .goods-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .phone_change1-line{
    height: 5rem;
    background: #f4f4f4;
    width: 100%;
    border-top: 1px solid #d8d8d8;
  }
  .goods_img{
    width: 12rem;
    height: 12rem;
    float: left;
    margin-left: 3.8rem;
  }
  .goods_img img{
    width: 100%;
    height: 100%;

  }
  .goods_text{

    float: left;
    margin-left: 1rem;
    height: 12rem;
  }
  .goods_detail1{
    font-size: 1.5rem;
    color: #333;
    margin-top: 1.9rem;
    text-align: left;
    width: 20rem;
    line-height: 3rem;
    overflow: hidden;
  }
  .goods_detail2{
    font-size: 1.2rem;
    color: #adadad;
    margin-top: 1rem;
    text-align: left;
    width: 20rem;
  }

  .goods_text .goods_detail3{
    font-size: 1rem;
    color: #5dadfe;
    margin-top: 2.8rem;
    text-align: left;
    min-width: 4rem;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
    border: 1px solid #5dadfe;
    float: left;
    margin-right: .7rem;
  }
  .goods_text .goods_detail4{
    font-size: 1rem;
    color: #34bf86;
    margin-top: 2.8rem;
    text-align: left;
    min-width: 4rem;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
    border: 1px solid #34bf86;
    float: left;
    margin-right: .7rem;
  }
  .goods_text .goods_detail5{
    font-size: 1rem;
    color: #e95b4d;
    margin-top: 2.8rem;
    text-align: left;
    min-width: 4rem;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
    border: 1px solid #e95b4d;
    float: left;
    margin-right: .7rem;
  }
  .goods_line{
    width: 56%;
    height: 1rem;
    float: right;
  }
  .goods_line1{
    width: 20%;
    height: 1rem;
    float: left;
  }
  .goods_line div{
    border-bottom: 0.1rem solid #d6d6d6;
    margin-top: 0.5rem;
  }
  /*复选框*/
  .register-protocol{
    text-align: left;
    margin-top: 1.2rem;
    color: #cd141c;
    font-size: 1.1rem;
    height: 3rem;
    line-height: 3rem;
    float: left;
    z-index: 222;
    position: absolute;
    left: 1.3rem;
    /*background: url("../../assets/images/protocal.png") ;*/
  }
  .register-protocol .option{
    width: 1.5rem;
    height: 1.5rem;
    background-size: cover;
    background: url("../../assets/images/nocc.png") no-repeat;
    background-size: cover;
    display: inline-block;
    float: left;

    margin-top: 3.7rem;
  }
  .register-protocol input[type="checkbox"] {  /*为了保险起见，把原生样式隐藏掉*/
    display: inline-block ;
    width: 1rem;
    height: 2rem;
    /*margin-right: 15px ;*/
    opacity: 0 ;
    margin-top: 3.5rem;
    position: absolute;
  }
  input[type="checkbox"]:checked+div {  /*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
    background: url("../../assets/images/protocal.png") no-repeat;
    background-size: cover;
  }
  .shopping_mon{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 0 0 4%;
    height: 4.9rem;
    border-top: 1px solid #cecece;
    z-index: 33;
    background: #fff;
    display: block;
  }
  .shopping_money{
    height: 4.9rem;
    line-height: 4.9rem;
    color: #adadad;
    font-size: 1.2rem;
    float: left;
  }
  .shopping_money span{
    height: 4.9rem;
    line-height: 4.9rem;
    color: #cc141c;
    font-size: 1.6rem;
    float: left;
    font-weight: bolder;
  }
  .shopping_jieshuan{
    font-size: 1.7rem;
    color: #fff;
    background: #f9be00;
    width: 30%;
    float: right;
    height: 4.9rem;
    line-height: 4.9rem;
    margin-left: 1rem;
    font-weight: bold;
  }
  .floatL{float:left;}
  .floatR{float:right;}
  .clearfix{zoom:1;}
  .clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
</style>
<script>
  import Vue from 'vue'
  //  import collectionTab  from  '../../component/collectionTab.vue'
  import collectionTab  from  '../../component/collectionTab.vue'
  export  default{
    name: '',
    data () {
      return {
        checkboxModel:[],
        list:"",
        idArray:[]
      }
    },
    components: {
      collectionTab
    },
    mounted(){
      this.getList();

    },
    computed:{

//       checkboxModel:function(){
// //        this.orderParams =[];
//         for(let i = 0;i<this.checkboxModel.length;i++){
//           for(let j = 0;j<this.list.length;j++){
//             if( this.checkboxModel[i] == this.list[j].id){

//             }
//           }
//         }
//         sum = sum.toFixed(2);
//         return sum
//       },
    },
    methods:{
      getList(){
        let url = HOST_HDBMESSAGE + '/collection/findUserCollectionByType'
        this.userId = window.localStorage.getItem('userId')
        this.loginCode= window.localStorage.getItem('loginCode')
        if(this.loginCode != ""){
          //添加header
//           Vue.http.interceptors.push((request, next)  =>{
//             request.headers.set('loginCode', this.loginCode);
//           next((response) => {
// //            return response
//           });
//         });
          //添加header
          this.$resource (url).get({ userId: this.userId ,collectionType:2,page:1}).then((response) => {
//          console.log(response.body.list);
            if( response.status == 200 ){
//              if(response.data.respBody)
            this.list = response.data.respBody
            for(let i=0; i<this.list.length; i++){
              if(this.list[i].collectionPics[0].indexOf(',') != -1){
                this.list[i].collectionPics[0] = this.list[i].collectionPics[0].substring(0, this.list[i].collectionPics[0].indexOf(','))
                this.list[i].collectionPics = this.list[i].collectionPics[0]
//                  this.list[i]["img"] = this.list[i].collectionPics[0]
              }
              if(this.list[i].price != null){
                if (this.list[i].price.indexOf('-') != -1) {
                  this.list[i].price = this.list[i].price.substr(0,this.list[i].price.indexOf('-'))
                }
              }
            }

          }
        })
        }
      },
      delete1(){
        this.list
        this.idArray = []
        for(let k=0; k<this.checkboxModel.length; k++){
          for(let i=0; i<this.list.length; i++){
            if(this.checkboxModel[k] == this.list[i].id){
              this.idArray.push(this.list[i].id)
            }
          }
        }
        this.idArray = this.idArray.join(",")
        let url = HOST_HDBMESSAGE + '/collection/deleteUserCollection'
        console.log(this.idArray)
        this.loginCode= window.localStorage.getItem('loginCode')
        if(this.loginCode != ""){
          //添加header
//           Vue.http.interceptors.push((request, next)  =>{
//             request.headers.set('loginCode', this.loginCode);
//           next((response) => {
// //            return response
//           });
//         });
          //添加header
          this.$resource (url).get({ id: this.idArray}).then((response) => {
//          console.log(response.body.list);
            if( response.status == 200 ){
            window.location.reload();
          }
        })
        }
      },
      back(){
        window.history.back()
      }
    }
  }
</script>
