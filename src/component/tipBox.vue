<template>
  <div class='Tbox' v-show='isShow'>
    <div class="appointment-alert">
    <div>
    <img v-if='data.type' src='../assets/images/adopt.png'> 
    </div>
      <div class='alert-word'>{{data.showtext}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['data','rd'],
    watch:{
      rd:function(){
        let _this = this
        this.isShow = true
        setTimeout(_=>{
          _this.isShow = false
        },this.data.duration)
      }
    },
    data(){
      return {
        isShow:false
      }
    },

    methods: {
     
    }
  }
</script>
<style scoped>
  .alert-word{
    font-size:1.5rem;
    color:#fffefe;
    padding:1rem;
  }
  .appointment-alert{
      width:20.2rem;
      height:9.5rem;
      background:#000000;
      opacity: 0.5;
      border-radius: 0.5rem;
      position:fixed;
      top:calc(50% - 4.75rem);
      left:calc(50% - 10.1rem);
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
</style>
