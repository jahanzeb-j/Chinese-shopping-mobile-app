<template>
  <div class="personal">
    <div class="personal-img clearfix">
      <div>昵称</div>
      <img @click="back()" src="../../assets/images/returnFront.png" >
      <span @click="back1()">保存</span>
    </div>
    <div class="personal-line"></div>
    <div class="myIndex_flow">
      <div class="myIndex_action_my">
        <input type="text" placeholder="昵称" v-model="niCheng">
      </div>
    </div>
  </div>
</template>
<style scoped>
  .personal-img div{
    display: inline-block;
    margin-left: 4.5rem;
  }
  .personal{
    width:100%;
    height:100%;
    background:#fff;
  }
  .personal-img{
    width:100%;
    /*position:relative;*/
    display: block;
    color: #252525;
    font-size: 1.8rem;
    height: 4rem;
    line-height: 4rem;
  }
  .personal-img img{
    width: 1.2rem;
    height: 2rem;
    margin-top: 1rem;
    position: absolute;
    left: 1.2rem;
    /*margin-left: -28rem;*/
  }
  .personal-img span{
    float: right;
    margin-right: 4%;
    font-size: 1.5rem;
  }
  .personal-line{
    height: 1rem;
    background: #f4f4f4;
    width: 100%;
    border-top:1px solid #d8d8d8;
  }
  .myIndex_flow{
    height: 5.5rem;
    line-height: 5.5rem;
    border-bottom: 1px solid #d6d6d6;
  }
  .myIndex_action_my input{
    color: #252525;
    font-size: 1.5rem;
    float: left;
    height: 2.8rem;
    line-height: 2.8rem;
    margin-top: 1.5rem;
    margin-left:4%;
    width: 90%;
  }
  .myIndex_action_look1{
    float: right;
    margin-right:4%;
    height: 4rem;
  }

  /*.activeW{*/
  /*border: 1px solid #d6d6d6;*/
  /*color: #bebebe;*/
  /*}*/

</style>
<script>
  export default{
    name: 'personal',
    data () {
      return {
        AlertChange:false,
        niCheng:'',
//        getLi:''
      }
    },
    mounted () {
//      this.getList();
      this.getLi()

    },
    methods:{
      back: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"personal"
      },
      getLi: function () {
        this.niCheng= window.localStorage.getItem('niCheng');
        if(window.localStorage.getItem('niCheng') == '' || window.localStorage.getItem('niCheng') == 'null'){
          this.niCheng = "昵称"
        }
      },
      back1: function () {
        window.localStorage.setItem('niCheng',this.niCheng);
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)+"personal"
      }
    }

  }
</script>
