<template>
  <div>
      <limitTimeBuy :showHead='showHead' ></limitTimeBuy>
  </div>
</template>
<script>
import limitTimeBuy from './limitTimeBuy.vue'
import {_deviceType} from '../../util/index.js'
export default {
  name: 'limitTimeBuyNative',
  components:{limitTimeBuy},
  data(){
      return {
          showHead:true,
          status:0
      }
  },
  created(){
      this.showHead=false
  },
  mounted(){
    //   this.status=this.$route.query.status
    //   console.log(this.status)
    //   let type=_deviceType()
    //   console.log(type)
    //   if(type == 'iosApp' || type == 'androidApp'){
        //   this.showHead=false
//       }else{
//           this.showHead=true
//       }
  }
}
</script>