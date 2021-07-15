<template>
    <div class="wrap">
      <div class="bk"></div>
      <div class="content">
            <h4 class="step"><span class="step1">手机号注册</span><span class="step1 active">填写地址</span><span>领取成功</span></h4>
            <div class="myIndex_flow">
                <input type="text" placeholder="收货人姓名"   maxlength="30" class="personName" v-model="personName" >
            </div>
            <div class="myIndex_flow">
                <input type="text"  placeholder="收货人电话" maxlength="30" class="personTel" v-model="personTel">
            </div>
            <div class="myIndex_flow clearfix" @click="chooseAddress">
                <div class="name">
                    所在地区
                </div>
                <div class="district" >
                    <span class="sp1" v-show="addressShow">
                        {{ finishProvince +'-'}}{{ finishCity}}

                        <span v-if="finishDistrict">{{'-'+finishDistrict}}</span>
                    </span>
                    <span ><img src="../../assets/images/icon_go.png"></span>
                </div>
            </div>
            <div class="myIndex_flow address">
                <input type="text" placeholder="详细地址"  maxlength="30" v-model="personAddress">
            </div>
            <div class="submit" :class="{submitActive:test}" @click="testRule">提交</div>
            
      </div>
      <div class="popup" v-show="address" @click="shutDown"></div>
      <div class="alertWindow" v-show="address">
            <div class="title">选择所在地区</div>
            <ul class="alertWindow_ul">
                <li class="li1" v-for="(province,index) in provinces" :key="index" @click="chooseProvince(province)" v-if="showProvince">
                    <span>
                        {{ province[1] }}
                    </span>
                </li>
                <li class="li1" v-for="(city,index) in CityList" :key="index" v-if="showCity" @click="chooseCity(city)">
                    <span>
                        {{ city[1] }} 
                    </span>
                </li>
                <li class="li1" v-for="(district,index) in districtList" :key="index" v-if="showDistrict" @click="chooseDistrict(district)">
                    <span>
                        {{ district[1] }}
                    </span>
                </li>
            </ul>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'mint-ui';
export default{
    data(){
        return{
            provinces: '',
            address: false,
            showProvince: true,
            showCity: false,
            showDistrict: false,
            finishProvince: '',
            finishCity: '',
            finishDistrict: '',
            addressShow:false,
            CityList: '',
            districtList: '',
            shutDownPop:0,
            test:false,
            personName:'',
            personTel:'',
            personAddress:'',
            code:'', //地区编码
            zero:1 ,//默认地址,
            userId:'',
            loginCode:''

        }
        
    },
    watch:{
        personName:function (val){
            console.log(val)
            if(this.personName !='' && this.personTel !='' && this.addressShow && this.personAddress !=''){
                this.test=true
            }else {
                this.test=false
            }
        },
        personTel:function(){
            if(this.personName !='' && this.personTel !='' && this.addressShow && this.personAddress !=''){
                this.test=true
            }else {
                this.test=false
            }
        },
        addressShow:function(){
            if(this.personName !='' && this.personTel !='' && this.addressShow && this.personAddress !=''){
                this.test=true
            }else {
                this.test=false
            }
        },
        personAddress:function(){
            if(this.personName !='' && this.personTel !='' && this.addressShow && this.personAddress !=''){
                this.test=true
            }else {
                this.test=false
            }
        }
    },
    mounted(){
        this.getAreaName()
    },
    methods:{
        //选择收货地址
      chooseAddress(){
          this.shutDownPop = 0
          this.addressShow = true
          this.address = true
          this.showProvince = true
      },

      //关闭地址遮罩层
      shutDown(){
          this.address = false
          this.showDistrict = false
      },
        //获取全国省市的名字
      getAreaName(){
        var listProvince = AreaMenu.getProvinceList()
        
        this.provinces = listProvince
      },
        //根据省选择市
      chooseProvince(province){
        this.CityList = AreaMenu.getSubList(province[3]+"");
        this.newProvince = province[1]
        this.showProvince = false
        this.showCity = true
      },

      //根据市选择地区
      chooseCity(city){
        this.districtList = AreaMenu.getSubList(city[3]+"");
        if(this.districtList.length == 0){
          this.sanya = true
          this.shutDownPop = 1
          this.newCity = city[1]
          this.code = city[3]
          this.showCity = false
          this.showDistrict = false
          this.address = false
          this.finishProvince = this.newProvince
          this.finishCity = this.newCity
          this.finishDistrict =""
          this.allchice = true
          this.choice = true
        }else{
          this.newCity = city[1]
          this.showProvince = false
          this.showCity = false
          this.showDistrict = true
        }
      },

        //选择县区
      chooseDistrict(district){
          this.shutDownPop = 1
          this.code = district[3]
          this.showCity = false
          this.showDistrict = false
          this.address = false
          this.finishProvince = this.newProvince
          this.finishCity = this.newCity
          this.finishDistrict = district[1]
          this.allchice = true
      },
      submit(){
          let url = HOST_HDPUSER+'/address/addTradeAddress';
          this.userId= window.localStorage.getItem('userId');
          this.loginCode= window.localStorage.getItem('loginCode');
          this.TradeAddress = {
              areaCode: this.code,
              areaName: this.finishProvince + '-' + this.finishCity +'-'+ this.finishDistrict ,
              isDefault: this.zero,
              linkMan: this.personName,
              memberId: this.userId,
              mobile: this.personTel,
              street: this.personAddress
          }
          this.$api_post({
            url:url,
            data:this.TradeAddress
          }).then(res=>{
              console.log(res)
              if(res.code == 200){
                Toast({
                    message: '填写地址成功',
                    duration: 1000,
                    className: "toast"
                });  
                this.$router.push({path:'successAct'}) 
              }else if(res.code == -100){
                Toast({
                    message: res.message,
                    duration: 1000,
                    className: "toast"
                });
              }else {
                Toast({
                    message: res.message,
                    duration: 1000,
                    className: "toast"
                });
              }
          })

      },
      testRule(){
        let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
        let flag = reg.test(this.personTel); //true
        if(this.personName == ''){
          
          Toast({
            message: '请填写收货人姓名',
            duration: 1000,
            className: "toast"
          });
          return;
        }else if(this.personTel == ''){
          Toast({
            message: '请填写收货人电话',
            duration: 1000,
            className: "toast"
          });  
          return
        }else if(!flag){
          Toast({
            message: '请输入正确的手机号',
            duration: 1000,
            className: "toast"
          }); 
          return  
        }else if(!this.addressShow){
            Toast({
                message: '请选择所在地区',
                duration: 1000,
                className: "toast"
            });
            return
        }else if(this.personAddress == ''){
            Toast({
                message: '请输入详细地址',
                duration: 1000,
                className: "toast"
            });
            return
        }else{
            this.test=true
            this.submit()
        }
      }
    }

    
}
</script>

<style scoped>
.clearfix{zoom:1;}
.clearfix:after{ content:"."; display:block; height:0; clear:both; overflow:hidden; visibility:visible}
.wrap{
    width:100%;
    height: 100%;
    
}
.bk{
    height:20rem;
    background:url(../../assets/images/registerAct.png) no-repeat;
    background-size: cover;
}
.content{
    width:100%;
    padding:0 3rem;
    box-sizing: border-box;
}
.step{
    font-size: 1.4rem;
    height:4.7rem ;
    line-height:4.7rem;
    color:#707070;
    margin-bottom: 1.5rem;

}
.step span{
    float: left;
    position: relative;
    width:33%;

}
.step .step1{
    padding-right:2.1rem;
    background:url(../../assets/images/registerIcon.png) no-repeat right;
}
.step .active{
    color:#252525;
}
.myIndex_flow{
    width:100%;
    font-size: 1.3rem;
    line-height:4.2rem;
    height: 4.2rem;
    color:#000000;
    border-bottom:1px solid #d8d8d8;
}
.myIndex_flow input{
    width:100%;
    font-size: 1.3rem;
    height: 4.2rem;
    line-height:4.2rem;
}
.name{
    font-size: 1.3rem;
    height: 4.2rem;
    line-height:4.2rem;
    float: left;
    text-align: left;
    width: 20%;
    color:#acacac;
}
.personName{
    color:#555555;
}
.presonTel{
    color:#555555;
}
.district {
    float: right;
    height: 100%;
    color:#acacac;
}
.district img{
    width: 0.7rem;
    margin-top: 2.1rem;
    float: right;
    margin-right:4%;
}
.district span{
    font-size: 1.3rem;
    float: right;
}

.district .sp1{
    float: left;
    margin-top: 0.2rem;
}
.address{
    color:#acacac;
}
.submit{
    margin-top:2.5rem;
    width:100%;
    height:4.3rem;
    font-size:1.5rem;
    line-height:4.3rem;
    background:#d8d8d8;
    color:#fff;
    border-radius: 0.4rem;
}
.submitActive{
    background:#f35953;
}
.alertWindow{
    width: 80%;
    height: 25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -12.5rem;
    margin-left:-40%;
    z-index:22;
    overflow: auto;
}

.alertWindow{
    background: #fff;
    border-radius: 2%;
}

.alertWindow .alertWindow_ul{
    text-align: left;
    font-size:1.2rem;
    margin-top: 3rem;
}

.alertWindow .title{
height: 3rem;
line-height: 3rem;
font-size: 1rem;
text-align: left;
position: fixed;
width: 80%;
background: #fff;
font-size: 1.6rem;
padding-left: 1.1rem;
}

.alertWindow .alertWindow_ul li{
    border-top: 1px solid #ccc;
    height:3.3rem;
    line-height:3.3rem;
}

.alertWindow .alertWindow_ul li span{
    margin-left: 1rem;
}
.popup{
    width:100%;
    height:100rem;
    background: #7A7A7A;
    position: fixed;
    top:0;
    z-index:11;
    opacity:0.5;
}
</style>
