<template>
  <div class="publish_purchase">
    <div class="f-header">
        <div @click=back class="f-header-left">
          <img src="../../assets/images/returnFront1.png" alt="" style="height: 2rem; width: 1.2rem;">
        </div>
      <div class="f-header-center">发布采购信息</div>
    </div>
    <div class="input-wrap">
      <div class='tip-word'>您的采购信息将被网库好单品接收，会尽快联系您！</div>
      <textarea class='ms' maxlength="100" @input='inputCount' placeholder="对采购信息进行描述" type="textarea" rows="10" v-model="ms"></textarea>
    </div>
    <div class="tip">可输入{{this.wordCount}}字</div>
    <div class="input-wrap" style="margin-top: 1rem;">
      <input class='xmi' placeholder="姓名" v-model="xm">
    </div>
    <div class="input-wrap">
      <input class='xmi' placeholder="电话" v-model="dh">
    </div>

    <div class="submit-box">
      <mt-button class="btn-w" :class="{'btn-w-active':isbActive}" type="default" @click="postData">提交</mt-button>
    </div>
    <Tbox  :data='tipParam' :rd='tipParam.rd'></Tbox>
  </div>
</template>
<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import {router} from '../../router/index.js'
  import Tbox from '../../component/tipBox.vue'
  export default{
    data(){
      return {
        ms: '',
        xm: '',
        dh: '',
        wordCount:100,
        tipParam:{
          showtext:'',
          type:'',
          duration:1,
          rd:''
        },
        // isbActive:false
       
      }
    },
    components:{
        Tbox
    },
    mounted(){

    },
    methods: {
      inputCount(e){
        const  tag = e.currentTarget || e.target
        this.wordCount = 100 - tag.value.length
      
        
      },
      back(){
        let releaseBack = this.$route.query.releaseBack
        if(releaseBack=="001"){
            // var urlParams = window.location.href; //获取url中"?"符后的字串
            // var index = urlParams.indexOf('?')
            // this.urlRemain = urlParams.substring(index+1,urlParams.length)
            // window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index'
            this.$router.push({path: 'found_index'})
        }
        // else if(releaseBack=="002"){
        //     var urlParams = window.location.href; //获取url中"?"符后的字串
        //     var index = urlParams.indexOf('?')
        //     this.urlRemain = urlParams.substring(index+1,urlParams.length)
        //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'found_index?'+this.urlRemain
        // }else if(releaseBack=="003"){
        //   var urlParams = window.location.href; //获取url中"?"符后的字串
        //   var index = urlParams.indexOf('?')
        //   this.urlRemain = urlParams.substring(index+1,urlParams.length)
        //   window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'fg_search?'+this.urlRemain
        // }
        //找货到主题详情到商品详情到发布返回
        // else if(releaseBack=="004"){
        //   this.$router.go(-1)
        // }
        else{
          this.$router.go(-1)
        }
        // this.$router.go(-1)
      },
      postData () {
        if(this.ms.length >100){
          this.tipParam = {
             showtext:'描述信息小于100字',
            type:'',
            duration:2000,
            rd:Math.random()
          }
          // Toast({
          //   message: '描述信息小于100字',
          //   duration: 12000,
          //   className: "toast"
          // });
          return
        }
        if(this.xm.length >10){
          this.tipParam = {
             showtext:'姓名不能大于10个字',
            type:'',
            duration:2000,
            rd:Math.random()
          }
          // Toast({
          //   message: '姓名不能大于10个字',
          //   duration: 12000,
          //   className: "toast"
          // });
          return
        }
        let reg=/^[0-9]*$/
        if(!reg.test(this.dh)){
          this.tipParam = {
             showtext:'电话应为数字',
            type:'',
            duration:2000,
            rd:Math.random()
          }
          return
        }
        /* var resource = this.$resource(HOST_HDPUSER + '/purchase/savePurchase')
        resource.save({}, {'descrition':this.ms,'mobile':this.dh,'name':this.xm}).then((response) => {
          this.isbActive = !this.isbActive
          if (response.body.code == 200) {
           
            this.tipParam = {
              showtext:'提交成功',
              type:'success',
              duration:2000,
              rd:Math.random()
            }
            setTimeout(fn,2000)
            function fn() {
              router.push({path: 'found_index'})
            }
          } else {
            this.tipParam = {
              showtext:response.body.message,
              type:'',
              duration:2000,
              rd:Math.random()
            }
            
          }
        }, (response) => {
           this.tipParam = {
              showtext:'接口错误',
              type:'',
              duration:2000,
              rd:Math.random()
            }
        }) */
        this.$api_post({
          url:HOST_HDPUSER + '/purchase/savePurchase',
          data:{
            'descrition':this.ms,
            'mobile':this.dh,
            'name':this.xm
          }

        }).then( response =>{
          // this.isbActive = !this.isbActive
          if (response.code == 200) {
           
            this.tipParam = {
              showtext:'提交成功',
              type:'success',
              duration:2000,
              rd:Math.random()
            }
            setTimeout(fn,2000)
            function fn() {
              router.push({path: 'found_index'})
            }
          } else {
            this.tipParam = {
              showtext:response.body.message,
              type:'',
              duration:2000,
              rd:Math.random()
            }
            
          }
        }).catch(response =>{
            this.tipParam = {
              showtext:'接口错误',
              type:'',
              duration:2000,
              rd:Math.random()
            }
        })
      }
    },
    computed: {
      isbActive: () => {
        return this.ms!= '' && this.xm!= '' && this.dh!= ''
      },
      // wordCount:() => {
      //   debugger
      //   return this.$refs.inputWords
      // }
    }
  }
</script>
<style scoped>
  .tip-word {
        line-height: 2rem;
    font-size: 1.2rem;
    text-align: left;
    color: #f95200;
    background: #fffbe7;
    padding: .8rem 0 .8rem 2rem;
  }
  .mint-button {
    width: 3.9rem;
    margin: 1rem;
    font-size: 1.7rem !important;
    height: 4.3rem !important;
    margin: 0 !important;
    padding:0 !important;
  }
  .publish_purchase {
    background: #F4F4F4;
    min-height: 100%;
  }

  .f-header {
    background: #fff;
    height: 3.9rem;
    border-bottom: 1px solid #DCDCDC;
  }

  .f-header-left {
    float: left;
    height: 3.6rem;
    width: 3.3rem;
    padding-top: 1.1rem;
  }

  .f-header-center {
    font-size: 1.8rem;
    height: 3.6rem;
    line-height: 3.6rem;
    width: 90%;
  }

  .input-wrap{
    box-sizing: border-box;
    border-bottom: 1px solid #c4c0c0;
  }
  .ms,.xmi {
    box-sizing: border-box;
    height: 20rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: flex;
    display: -webkit-flex;
    border-radius: 3px;
    border: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: 0;
    line-height: 1.6;
    width: 100%;
    font-size: 1.5rem;
    align-items: center;
    -webkit-align-items: center;
    min-height: inherit;
    overflow: hidden;
    padding: 1rem 1.8rem;
    background: #fff;
  }

  .xmi {
    height: 4.5rem;
  }

  input::-webkit-input-placeholder {
    text-align: left;
    font-size: 1.5rem;
  }

  input::-ms-input-placeholder {
    text-align: left;
    font-size: 1.5rem;
  }

  .tip {
        text-align: right;
    padding-right: 1rem;
    color: #828282;
    position: absolute;
    right: 0;
    margin-top: -2rem;
    font-size: 1.3rem;
    color: #adadad;
  }
  .submit-box{
    margin-top: 3rem;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .btn-w{
    width: 100%;
    height: 4.3rem;
    background: #D8D8D8;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 600;
    height: 4.3rem;
    font-size: 1.7rem;
  }
  .btn-w-active{
    color: #fff;
    background: #F8BD2D;
  }
</style>
