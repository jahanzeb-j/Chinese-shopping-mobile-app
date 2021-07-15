<template>
  <div class="serach_history">
    <div class="serach_header">
      <input v-focus type="text" placeholder="搜索展厅" class="search" ref="inputbox" v-model="searchKey" v-on:keyup.13="clickEnter" maxlength="10">
      <div class="no_sure" @click="clickEnter" style="margin-top:1.1rem;"></div>
      <img src="../../assets/images/returnFront1.png" @click="toLookIndcex" class="search-img1">
    </div>
    <div class="history_body" v-show="showHistory">
      <div class="history_body_title">
        <div class="title_left">历史搜索</div>
        <div class="title_right" @click="clearHistory" style="margin-right:-0.2rem">清空记录</div>
      </div>
      <div style="clear: both"></div>
      <div class="history">
        <div class="history_jilu" @click="search(item)" v-for="item in  history">{{item}}</div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="nohistoryimg" v-show="showalert">
      <img src="../../assets/images/noSearch.png" alt="">
      <div class="historyalert">您还没有搜索记录哦!</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'serach_history',
    data(){
      return{
        showHistory:true,
        showalert:false,
        history: [],
        searchKey:'',
        list:[],
        historyKey:''
      }
    },
    mounted(){
      this.history = this.getStorage()

    },
    methods: {
      clearHistory:function(){
        localStorage.removeItem("house_history");
        this.history = []
        this.showHistory=false;
        this.showalert=true;
      },
      toLookIndcex:function(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
      },
      setStorage(str) {
        let arr = this.getStorage()
        if (!str){
          return
        }
        if (arr ) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] == str){
              return
            }
          }
          arr.unshift(str)
          if (arr.length > 6) {
            arr.pop()
          }
        } else {
          arr = []
          arr.unshift(str)
        }
        window.localStorage.setItem('house_history', JSON.stringify(arr))
      },
      getStorage(){
        return JSON.parse(window.localStorage.getItem('house_history'))
      },

      search(item){
        console.log(item)
        if(item){
          this.historyKey = item
        }
        window.localStorage.setItem('position',this.historyKey)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'searchresult';
//        let lng=window.localStorage.getItem('longitude')
//        let lat=window.localStorage.getItem('latitude')
//        let url=window.HOST_HDBITION+'/hdpExhibition/getHdpExhibitionByPosition'
//        this.$resource(url).get({'position':this.searchKey,'longitude':lng,'latitude':lat}).then((response) => {
//          if (response.status == 200 && response.body.length > 0){
//            this.list=response.body.respBody
//            for (let i = 0; i < this.list.length; i++) {
//              this.list[i].pic = this.list[i].pic.substring(0, this.list[i].pic.indexOf(','))
//            }
//          }
//
//        })
      },
      clickEnter:function(){
        let keys = this.searchKey
        window.localStorage.setItem('position',keys)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'searchresult';
        this.setStorage(keys)
        console.log(123)
      },

    }

  }
</script>
<style scoped>
  .serach_history{
    width:100%;
  }
  .serach_header{
    width:100%;
    height:4.4rem;
    font-size:1.4rem;
    border-bottom:1px solid #d6d6d6;
    line-height:4.4rem;
    position:relative;
  }
  .no_sure{
    float: right;
    height:2rem;
    width:2rem;
    margin-left:0.5rem;
    background:url("../../assets/images/search-icon1.png") no-repeat;
    background-size:100% 100%;
    margin-right:1.2rem;

  }
  .search{
    float:left;
    width:29rem;
    height:3.1rem;
    font-size:1.4rem;
    background:#f4f4f4;
    margin-top:0.65rem;
    border-radius: 5px;
    margin-left:3.6rem;
    padding-left:1rem;
    color:#858585;
  }
  .search-img{
    width:1.4rem;
    height:1.4rem;
    position:absolute;
    top:1.5rem;
    left:1.3rem;
  }
  .search-img1{
    width:1.1rem;
    height:1.9rem;
    position:absolute;
    top:1.25rem;
    left:0.8rem;
  }
  .history_body{
    width:100%;
    padding-bottom:1rem;
    background:#f4f4f4;
    margin-top:1rem;
    border-top:1px solid transparent;
    border-bottom: 1px solid transparent;
  }
  .history_body_title{
    width:94%;
    margin-left:0.8rem;
    margin-top:1.7rem;
    font-size:1.2rem;
  }
  .title_left{
    float: left;
  }
  .title_right{
    float:right;
    width:5.8rem;
    height:1.7rem;
    color:#acacac;
    background:#fff;
    border:1px solid #acacac;
    line-height: 1.7rem;
    text-align: center;
    border-radius: 5px;
  }
  .history{
    width:96%;
    margin-left:3%;
    margin-top:1.6rem;
    text-align: left;
  }
  .history_jilu{
    float:left;
    margin-right:0.5rem;
    padding:0.6rem 1rem;
    text-align: center;
    background:#fff;
    border:1px solid #acacac;
    font-size:1.2rem;
    border-radius: 3px;
    color:#333333;
    margin-bottom:1.2rem;
  }
  .nohistoryimg{
    width:100%;
    text-align: center;
    margin-top:calc(50% - 5.95rem);
  }
  .nohistoryimg img{
    display: block;
    width:13.2rem;
    height:13.05rem;
    margin-left:calc(50% - 6.6rem);
  }
  .historyalert{
    width:100%;
    font-size:1.6rem;
    color:#acacac;
    margin-top:2rem;
  }
</style>
