<template>
  <div class="city_switch">
    <div class="header">
      <div class="title">中国</div>
      <div class="open_close" @click="toLookIndex">
        <img src="../../assets/images/shutDownCart.png" alt="">
      </div>
    </div>
    <div class="search-container">
      <input type="text" placeholder="输入城市名" class="search-input"  v-model="searchName" maxlength="10">
      <img src="../../assets/images/search-icon.png" class="search-img" v-show="isShowSearchIcon">
    </div>
    <div class="cur_box" @click="showArea">
      <div class="cur_left">当前：{{currentCity}}全城</div>
      <div class="cur_right">
        <img src="../../assets/images/opendingwei.png" ref="rotatoImg">
        <div>选择区县</div>
      </div>
    </div>
    <!--选择区县-->
    <div class="country" v-show="showCountry">
      <div class="country_name" @click="goSearch($event)" style="background:#f4f4f4">全城</div>
      <div class="country_name" v-for="item in thisCountry" @click="goSearch($event)">{{item.name}}</div>
    </div>
    <div style="clear:both"></div>
    <div class="position_city">
      <div class="now_position" style="padding-top:0rem;">定位城市</div>
      <div class="now_city_name" @click="goSearch($event)" ref="gps">北京</div>
    </div>
    <div style="clear: both"></div>
    <div class="history_city" v-show="showNear">
      <div class="now_position">最近访问城市</div>
      <div class="history_city_list" style="overflow: hidden">
        <div class="history_name"  @click="goSearch($event)" v-for="item in houseHistory" style="margin-bottom:-0.2rem">{{item}}</div>
      </div>
    </div>
    <!--热门城市-->
    <div style="clear: both"></div>
    <div class="history_city" >
      <div class="now_position">热门城市</div>
      <div class="history_city_list">
        <div class="history_name" @click="goSearch($event)">北京</div>
        <div class="history_name" @click="goSearch($event)">邯郸</div>
        <div class="history_name" @click="goSearch($event)">重庆</div>
        <div class="history_name" @click="goSearch($event)">石家庄</div>
        <div class="history_name" @click="goSearch($event)">西安</div>
        <div class="history_name" @click="goSearch($event)">烟台</div>
        <div class="history_name" @click="goSearch($event)">唐山</div>
        <div class="history_name" @click="goSearch($event)">许昌</div>
        <div class="history_name" @click="goSearch($event)">上饶</div>
        <div class="history_name" @click="goSearch($event)">白山</div>
      </div>
      <div style="clear: both"></div>
      <div class="divide" ></div>
    </div>
    <div style="clear: both"></div>
    <div style="clear:both"></div>
    <div class="city_container" ref="container">
      <div class="all_city_box" v-for="(item,index) in cityBox"  ref="bodyLetter">
        <div  class="zimu_title">{{item.letter}}</div>
        <div class="zimu_city" v-for="item2 in item.cityName" @click="goSearch($event)">{{item2.name}}</div>
      </div>
    </div>
    <!--英文字母-->
    <div class="zibu_box">
      <div v-for="(item,index) in cityBox" ref="rightLetter" @click="setIndex($event,index)">{{item.letter}}</div>
    </div>
    <!--搜索联想功能-->
    <div class="levone_box" v-if="isFocus">
      <div class="levone_cover" v-if="isLevoneCover"></div>
      <div v-if="isLevoneWords">
        <div class="levone_words" v-for="item in levoeDate" @click="goSearch($event)">{{item.name}}</div>
      </div>
      <div class="levone_words" v-if="isLevoneNo">没有找到相关位置，请尝试修改后重新搜索！</div>

    </div>

  </div>
</template>

<style scoped>
  .divide{
    width:100%;
    height:2px;
    border-top:1px solid #d6d6d6;
    margin-top:0.8rem;

  }
  .city_switch{
    width:100%;
    border-top:1px solid transparent;
    height:100%;
  }
  /*头部样式开始*/
  .header{
    position:fixed;
    width:100%;
    height:4.4rem;
    background:#ffffff;
    z-index: 1;
    top:-1px;

  }
  .title{
    width:100%;
    height:4.4rem;
    font-size:1.8rem;
    color:#333333;
    line-height:4.4rem;
    text-align: center;
    border-bottom:1px solid #d6d6d6;
  }
  .open_close{
    width:4.4rem;
    height:4.4rem;
    position:absolute;
    top:0;
    left:0;
  }
  .open_close img{
    position:absolute;
    width:1.9rem;
    height:1.9rem;
    top:1.25rem;
    left:0.8rem;
  }
  /*头部样式结束*/
  /*搜索样式开始*/
  .search-container{
    width:100%;
    margin-top:4.25rem;
    background:#ffffff;
    position: fixed;
    z-index: 1;

  }
  .search-input{
    width:96%;
    height:2.8rem;
    background:#f4f4f4;
    margin-top:0.6rem;
    margin-bottom:0.6rem;
    text-align: center;
    font-size:1.4rem;
    padding-left:0.9rem;
  }
  .search-img{
    width:1.4rem;
    height:1.4rem;
    position:absolute;
    top:1.25rem;
    left:calc(50% - 6.2rem);
  }
  /*搜索样式结束*/
  .cur_box{
    width:36rem;
    height:4.4rem;
    background:#ffffff;
    display:flex;
    display:-webkit-flex;
    margin-top:8.3rem;
    border-bottom: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .cur_left,.cur_right{
    flex:1;
    -webkit-flex:1;
  }
  .cur_left{
    text-align: left;
    padding-left:0.8rem;
    line-height:4.4rem;
    font-size:1.4rem;
    color:#333333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .cur_right{
    width:7rem;
    height:4.4rem;
    text-align: right;

  }
  .cur_right div{
    float:right;
    height:4.4rem;
    line-height:4.4rem;
    font-size:1.2rem;
    color:#858585;
  }
  .cur_right img{
    float:right;
    margin-right:0.5rem;
    margin-left:0.5rem;
    margin-top:1.9rem;

  }
  .position_city{
    width:100%;
    font-size:1.4rem;
    padding-left:0.8rem;
    /*margin-top:1.5rem;*/
    color:#858585;
    text-align: left;
    background: #f4f4f4;
  }

  .history_city{
    width:100%;
    font-size:1.4rem;
    padding-left:0.8rem;
    color:#858585;
    text-align: left;
    background: #f4f4f4;
  }

  .now_city_name{
    width:10.5rem;
    height:3.5rem;
    line-height: 3.5rem;
    border:1px solid #d6d6d6;
    border-radius: 3px;
    text-align: center;
    background:#ffffff;

    color:#333333;
  }
  .history_city_list{
    width:100%;

  }
  .history_name{
    float: left;
    width:10.5rem;
    height:3.5rem;
    line-height: 3.5rem;
    background:#fff;
    border:1px solid #d6d6d6;
    border-radius: 3px;
    text-align: center;
    margin-right:1.5rem;
    color:#333333;
    margin-bottom: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  /*全国城市列表样式开始*/
  .all_city_box{
    width:100%;
    background:#fff;
    display: block;
  }
  .zimu_title{
    width:calc(50% + 17.5rem);
    height:2.5rem;
    line-height: 2.5rem;
    text-align: left;
    font-size:1.3rem;
    color:#858585;
    background:#f4f4f4;
    padding-left:1.2rem;
    display: block;

  }
  .zimu_city{
    width:35rem;
    height:4.4rem;
    background:#ffffff;
    font-size:1.5rem;
    color:#333333;
    text-align: left;
    line-height: 4.4rem;
    margin:0 auto;
    border-bottom: 1px solid #d6d6d6;
  }
  .city_container{
    width:100%;
    background:#f4f4f4;
  }
  /*全国城市列表样式结束*/
  /*英文字母样式开始*/
  .zibu_box{
    width:1.5rem;
    background:#ffffff;
    font-size:1rem;
    color:#858585;
    font-weight: 600;
    position:fixed;
    right:0;
    top:8.3rem;
    padding-top:12rem;
    padding-bottom: 6.2rem;
  }
  .zibu_box div{
    margin-bottom: 0.3rem;
  }
  /*英文字母样式结束*/
  /*区县样式开始*/
  .country{
    width:36rem;
    background:#fff;
    border-top:1px solid #d6d6d6;
    overflow: hidden;
    padding-bottom: 1.5rem
  }
  .country_name{
    height:3.5rem;
    width:10.5rem;
    border:1px solid #d6d6d6;
    border-radius: 3px;
    color:#333;
    font-size:1.4rem;
    line-height: 3.5rem;
    text-align: center;
    margin-top:1.5rem;
    margin-left:0.7rem;
    margin-right:0.8rem;
    float: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  /*区县样式结束*/
  .now_position{
    line-height:4rem;
  }
  /*搜索联想功能样式开始*/
  .levone_box{
    width:100%;
    height:100%;
    overflow-y: auto;
    position:fixed;
    top:8.1rem;
    z-index: 1000;
    background:#fff;
    border-top:1px solid #d6d6d6;


  }
  .levone_cover{
    width:100%;
    height:100%;
    z-index: 1000;
    background:#333;
    opacity: 0.6;
  }
  .levone_words{
    width:calc(100% - 1.3rem);
    height:4.4rem;
    margin-left:1.3rem;
    line-height:4.4rem;
    color:#333;
    border-bottom: 1px solid #d6d6d6;
    font-size:1.5rem;
    text-align: left;
  }
  /*搜索联想功能样式结束*/
</style>

<script>
  export default{
    data(){
      return{
        cityBox:[],
        areaCode:null,
        searchName:'',
        thisCountry:[],
        showCountry:false,
        isShowSearchIcon:true,
        houseHistory:null,
        showNear:false,
        currentCity:null,
        levoeDate:[],
        isFocus:false,
        isLevoneCover:false,
        isLevoneWords:false,
        isLevoneNo:false

      }
    },
    mounted() {
//      this.countryMethod()

      this.showSearchIcon()
      this.getcityfrom()
      this.houseHistory=this.getStorage()
      if (this.houseHistory&&this.houseHistory.length!=0){
        this.showNear=true
      }
      this.getcontroyForm()
      this.getLeoveMsg()
    },
    methods:{

      //        获取后台城市列表数据
      getcityfrom:function(){
        let url=window.HOST_HDBITION+'/area/getBigArea'
        this.$resource(url).get({}).then((response) => {
          if (response.status==200){
            this.cityBox=response.body.respBody
          }
        })
      },

//联想查询功能
      getLeoveMsg:function(){
        let _this=this
        _this.$nextTick(() =>{
          let inputsearch=document.getElementsByClassName('search-input')[0];
          inputsearch.addEventListener('focus',function(){
            _this.isFocus=true
            _this.isLevoneCover=true
            _this.isLevoneWords=false
          })
          let timer=setTimeout(function(){
            inputsearch.addEventListener('keyup',function(){
              let url=window.HOST_HDBITION+'/area/getArea'
              if (_this.searchName!=''){
                _this.isFocus=true
                _this.isLevoneCover=false
                _this.isLevoneWords=true
                _this.$resource(url).get({'area':_this.searchName}).then((response) => {
                  if (response.status==200){
                    _this.levoeDate=response.body.respBody
                    if (_this.levoeDate==null||_this.levoeDate.length==0){
                      _this.isLevoneNo=true;
                      _this.isLevoneWords=false
                    }
                  }
                })
              }

            })
          },50)

          inputsearch.addEventListener('blur',function(){
            _this.isFocus=true
            _this.isLevoneCover=false
            _this.isLevoneWords=true
          })


        })

      },

//      获取当前城市下的区县
      getcontroyForm:function(){
        let areaCode= window.localStorage.getItem('areaCode')
        if (areaCode){
          let url=window.HOST_HDBITION+'/area/getAreaNextLevel'
          this.$resource(url).get({'areaCode':areaCode}).then((response) => {
            if (response.status==200&&response.body.respBody!=null&&response.body.respBody.length!=0){
              this.thisCountry=response.body.respBody

            }else{
              this.thisCountry=[]
            }
            this.currentCity=window.localStorage.getItem('positionSwitch')
          })
        }
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
        window.localStorage.setItem('newSearchCity', JSON.stringify(arr))
      },
      getStorage(){
        let testArrey=JSON.parse(window.localStorage.getItem('newSearchCity'))
        let testCity=[]
        if (testArrey){
          for (let i=0;i<3&&i<testArrey.length;i++){
            testCity.push(testArrey[i])
          }
          return testCity
        }

      },
    
      fouces:function(){
        this.isShowSearchIcon=false
      },
      showSearchIcon:function(){
        if (this.searchName.length!=0){
          this.isShowSearchIcon=false
        }
      },
      showArea:function(){
        this.$nextTick(() =>{
          let rotatoImg=this.$refs.rotatoImg
//              transform:rotate(7deg);
          if (this.showCountry==true){
            this.showCountry=false;
            rotatoImg.style.transform='rotate(0deg)'
          }else{
            this.showCountry=true;
            rotatoImg.style.transform='rotate(180deg)'
          }
        })


      },
//      countryMethod:function(){
//        let positionSwitch=window.localStorage.getItem('positionSwitch')
//        let mp=cities
//        var ress = (function(city){
//          var countries_in_city;
//          var find = false;
//          for(var o in mp){
//            if(!mp[o])continue;
//            var oc = mp[o];
//            var cities = oc.cityName;
//            for(var c = 0;c < cities.length;c++ ){
//              if(!cities[c])continue;
//              var oct = cities[c];
//              if(city == oct.name){
//                countries_in_city = oct.country;
//                find = true;
//                break;
//              }
//            }
//            if(find)break;
//          }
//          return countries_in_city;
//        })(positionSwitch);
//
//        this.thisCountry=ress;
//
//
//      },
      goSearch:function(event){
        let evt = event || window.event;
        let target = evt.target || evt.srcElement;
        
        window.localStorage.setItem('isNeedCacheForMap',1)
        if (target.innerHTML=='全城'){
          let gpsPosition=window.localStorage.getItem('gpsPosition')
          window.localStorage.setItem('position',gpsPosition)
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
        }
        else{
          window.localStorage.setItem('positionSwitch',target.innerHTML)
          this.setStorage(target.innerHTML)
          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
        }

      },
      setIndex:function(event,index){
        this.$nextTick(()=>{
          let topY=  this.$refs.bodyLetter[index].offsetTop-220
          document.body.scrollTop = topY
        })
      },
      toLookIndex:function(){
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'lookIndex';
      },
    }
  }
</script>
