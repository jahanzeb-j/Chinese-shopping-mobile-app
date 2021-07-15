<template>
  
    <protocol :showHead='showHead'></protocol>
  

</template>

<script>
  import protocol from './protocol.vue'
  export default {
    name:"protocolNative",
    components:{protocol},
    data() {
      return {
        showHead:false
      }
      
    },
    mounted(){
      
    },
    methods:{
      
    }
  };
</script>
