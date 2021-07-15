<template>
  <div class="found_index_android">
    <f-carousel :data="ModuleCarousel"></f-carousel>
    <f-advise :data="ModuleAdvise"></f-advise>
    <f-hdp :data="ModuleHDP"></f-hdp>
    <f-banner :data="ModuleBanner"></f-banner>
    <f-sp :data="ModuleZC"></f-sp>
    <div class="sidebar" :class={zIindex:isUp}>
      <transition name="slide-fade">
        <div class="sidebar-inner" v-if="isShowSidebar" :class="{addLv:isAddLv}">
          <div class="sidebar-header">
            <div class="sidebar-header-icon" @click="hideSidebar">
              <img src="../../assets/images/return-yellow.png" alt="" style="height: 50%;">
            </div>
            <div class="sidebar-header-text">选择分类</div>
          </div>
          <div id="sidebarContent">
            <ul class="sidebar-l1">
              <li v-for="item in list" @click="checkList(item)">{{item.categoryName}}<i
                v-if="item.categoryName==checkedName" class="pointer"></i></li>
              <li></li>
            </ul>
            <ul class="sidebar-l2" v-if='isAddLv'>
              <li v-for="item in subList" @click="search(item)">{{item.categoryName}}</li>
              <li></li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="blank" @click="hideSidebar">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import FHeader from '../../component/found_goods/header.vue'
  import FSearch from '../../component/found_goods/search.vue'
  import FCarousel from '../../component/found_goods/carouselApp.vue'
  import FAdvise from '../../component/found_goods/adviseApp.vue'
  import FHdp from '../../component/found_goods/hdpApp.vue'
  import FBanner from '../../component/found_goods/bannerApp.vue'
  import FSp from '../../component/found_goods/spApp.vue'
  import BottomTab from '../../component/bottomTab.vue'
  import {router} from '../../router/index.js'
  export default{
    data(){
      return {
        isShowSidebar: false,
        isUp: false,
        checkedName: '',
        isAddLv: false,
        list: [],
        subList: [],
        ModuleCarousel: '',
        ModuleAdvise: {},
        ModuleBanner: {},
        ModuleHDP: [],
        ModuleZC: [],
        globQuery:0,
        imgPic:''
      }
    },
    mounted(){

      this.getModule()
      this.getList()

    },
    methods: {
      hideSidebar(){
        let that = this
        this.isShowSidebar = false
        setTimeout(fn, 200)
        function fn() {
          that.isUp = false
        }
        this.isAddLv = false
        this.checkedName = ''
      },
      checkList(item){
        this.isAddLv = true
        this.checkedName = item.categoryName
        this.subList = item.childlist
      },
      getList(){
        this.$resource(HOST_HDPCOMMODITY + '/commodityFront/getCategoryList').get({}).then((response) => {
          if (response.status == 200) {
            this.list = response.body
          } else {
            Toast({
              message: 'code:' + response.status + ', 数据请求失败!',
              duration: 2000,
              className: "toast"
            });
          }
        })
      },
      getModule(){
        this.$resource(HOST_HDPMOBILEVIEW + '/moduleResources/moduleList').get({'viewId':'1487662711775705'}).then((response) => {
          if (response.status == 200) {
            console.log(response.body);
            for (let i = 0; i < response.body.length; i++) {
              for(var j in response.body[i].title) {
                if(response.body[i].title[j] == null) {
                  response.body[i].title[j] = '';
                }
              }
              if (response.body[i].viewDataId == 3) {
                // this.ModuleCarousel = response.body[i];
                let temp = response.body[i];
                // 临时删掉活动轮播图
                temp.content.forEach((e,i)=>{
                  if(e.contentLinkAddress =='http://zt.99114.com/yw/2017zt/cs/hdp/shaungshierapp/index.html'){
                    temp.content.splice(i,1)
                  }
                })
                this.ModuleCarousel = temp
              }
              if (response.body[i].viewDataId == 4) {
                this.ModuleAdvise = response.body[i]
              }
              if (response.body[i].viewDataId == 5) {
                var hdpArr = []
                var urlArr = []
                var ImgUrlArr = []
                var idArr = []
                let hdp = response.body[i].content
                let title = response.body[i].title
                var that = this
                for (let j = 0; j < hdp.length; j++) {
                  (function (id, idArr,url,ImgUrl,urlArr,ImgUrlArr) {
                    that.getShangPinById(id, idArr,url,ImgUrl,urlArr,ImgUrlArr)
                  })(hdp[j].contentExternalId, idArr,hdp[j].contentLinkAddress,hdp[j].contentImgUrl,urlArr,ImgUrlArr)
                }

                let idsArr = idArr.join(",")
//                调用商品列表数据
                this.$resource(HOST_HDPCOMMODITY + '/commodityFront/getThemeCommodityList').get({'commodityIds':idsArr,'version':'v1.2'}).then((response) => {
                  if (response.status == 200) {
                    hdpArr = response.body
                    for (let i = 0; i < hdpArr.length; i++){
                      if(hdpArr[i].fullSingleActivity){
                        hdpArr[i].fullSingleActivity =  JSON.parse(hdpArr[i].fullSingleActivity);
                      }
                      if ( hdpArr[i].pic.indexOf(',') != -1) {
                        hdpArr[i].pic = hdpArr[i].pic.substring(0, hdpArr[i].pic.indexOf(','))
                      }else{
                      }

                      hdpArr[i]["contentLinkAddress"] = urlArr[i]
                      hdpArr[i]["contentImgUrl"] = ImgUrlArr[i]

                    }
                  }
                  hdpArr['title'] = title;
                  this.ModuleHDP = hdpArr
                })

//                调用商品列表数据

              }
            
            if (response.body[i].viewDataId == 3) {
              this.ModuleCarousel = response.body[i];
            }
            if (response.body[i].viewDataId == 4) {
              this.ModuleAdvise = response.body[i]
            }
            if (response.body[i].viewDataId == 5) {
              var hdpArr = []
              var urlArr = []
              var ImgUrlArr = []
              var idArr = []
              let hdp = response.body[i].content
              let title = response.body[i].title
              var that = this
              for (let j = 0; j < hdp.length; j++) {
                (function (id, idArr,url,ImgUrl,urlArr,ImgUrlArr) {
                  that.getShangPinById(id, idArr,url,ImgUrl,urlArr,ImgUrlArr)
                })(hdp[j].contentExternalId, idArr,hdp[j].contentLinkAddress,hdp[j].contentImgUrl,urlArr,ImgUrlArr)
              }
            }
            if (response.body[i].viewDataId == 6) {
                this.ModuleBanner = response.body[i].content[0]
              }
              if (response.body[i].viewDataId == 7) {
                this.ModuleZC = []
                let module = []
                let idArr = []
                let imgPicArr = []
                let url1Arr = []

                let zc = response.body[i].content
                let title = response.body[i].title
                this.globQuery = zc.length
                var that = this
                for (let j = 0; j < zc.length; j++) {
//                  that.imgPic = zc[j].contentImgUrl
//                    alert(zc[0].contentImgUrl)
//                    alert(zc[1].contentImgUrl)
                  (function (id, zcArr,imgPic,url1,idArr,imgPicArr,url1Arr) {
                    that.getZhuanChangById(id, zcArr,imgPic,url1,idArr,imgPicArr,url1Arr)
                  })(zc[j].contentExternalId, this.ModuleZC,zc[j].contentImgUrl,zc[j].contentLinkAddress,idArr,imgPicArr,url1Arr)
                }



                let idsArr = idArr.join(",")
//                调用商品接口
                this.$resource(HOST_HDPCOMMODITY + '/commodityFront/getThemeCommodityList').get({'commodityIds': idsArr,'version':'v1.2'}).then((response) => {
//        //正确
                  if (response.status == 200) {
                  module = response.body
                  for(let i = 0; i < module.length; i++){
                    var str = module[i].detail;
                    if(str != null && str != "" ){
                      if (str.indexOf("<",1) != -1) {

                        module[i].detail = str.substring(str.indexOf(">")+1,str.indexOf("<",1));
                      }
                    }
                    if (module[i].pic.indexOf(',') != -1) {
                      module[i].pic = module[i].pic.substring(0, module[i].pic.indexOf(','))
                    }
                    if(this.globQuery%2==0){

                      this.ModuleZC.push({
                        r: '',
                        'l':module[i],
                        'imgL':imgPicArr[i],
                        'imgR':'',
                        'contentLinkAddressL':url1Arr[i],
                        'contentLinkAddressR':''
                      })
                    } else {
                      if(module[i].fullSingleActivity){
                        module[i].fullSingleActivity =  JSON.parse(module[i].fullSingleActivity);
                      }
                      for (var f1 in module[i].fullSingleActivity) {
                        if (module[i].fullSingleActivity[f1].promotionType == 2) {
                          this.howYuan = module[i].fullSingleActivity[f1].howYuan
                          this.fullLessCash = module[i].fullSingleActivity[f1].fullLessCash

                        }
                        if (module[i].fullSingleActivity[f1].promotionType == 1) {
                          this.howYuan = module[i].fullSingleActivity[f1].howYuan
                          this.fullLessCash = module[i].fullSingleActivity[f1].fullLessCash

                        }

                      }
                      this.ModuleZC[this.ModuleZC.length-1].r=module[i]
                      this.ModuleZC[this.ModuleZC.length-1].imgR=imgPicArr[i]
                      this.ModuleZC[this.ModuleZC.length-1].contentLinkAddressR=url1Arr[i]
                      this.ModuleZC[this.ModuleZC.length-1].howYuan=this.howYuan
                      this.ModuleZC[this.ModuleZC.length-1].fullLessCash=this.fullLessCash
                    }
                    this.globQuery--
                  }

                }
//        //正确
              })
//                调用商品接口
                this.ModuleZC['title'] = title;

              }
            }
          }
        })
      
    
      },
      getShangPinById(id,idArr,url1,ImgUrl,urlArr,ImgUrlArr){
        idArr.push(id)
        urlArr.push(url1)
        ImgUrlArr.push(ImgUrl)

      },
      getZhuanChangById(id, arr,imgPic,url1,idArr,imgPicArr,url1Arr){
        idArr.push(id)
        url1Arr.push(url1)
        imgPicArr.push(imgPic)
      },
      search(item){
        router.push({path: 'fg_search', query: {id: item.id, name: item.categoryName,acd:321}})
      },
    },
    components: {
      FHeader, FSearch, FCarousel, FAdvise, FHdp, FBanner, FSp, BottomTab
    }
  }
</script>
<style scoped>
  .f-sp {
    padding:0;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  .found_index_android {
    background: #fff;
  }
  .sidebar {
    background: rgba(0, 0, 0, .3);
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
  }
  .zIindex {
    z-index: 100 !important;
  }
  .sidebar-inner {
    background: #fff;
    width: 12rem;
    height: 100%;
  }
  .addLv {
    width: 26rem !important;
  }
  .sidebar-header {
    height: 4.9rem;
    background: #333333;
  }
  .sidebar-header-icon {
    float: left;
    height: 3.2rem;
    width: 4rem;
    margin-top: 1.5rem;
  }
  .sidebar-header-text {
    color: #FABE2D;
    text-align: left;
    line-height: 4.9rem;
    font-size: 1.6rem;
    padding-left: 2rem;
  }
  .sidebar-l1 {
    width: 12rem;
  }
  .sidebar-l2 {
    width: 14rem;
    background: #D6D6D6;
  }
  #sidebarContent {
    height: 90%;
    background: #fff;
  }
  .sidebar-l1, .sidebar-l2 {
    float: left;
    height: 100%;
    overflow: auto;
  }
  .sidebar-l1 li {
    height: 4.4rem;
    line-height: 4.4rem;
    width: 12rem;
    border-bottom: 1px solid #D7D7D7;
    position: relative;
    font-size: 1.6rem;
    overflow: hidden;
  }
  .sidebar-l1 li:last-child, .sidebar-l2 li:last-child {
    border-bottom: none;
  }
  .sidebar-l2 li {
    height: 4.4rem;
    line-height: 4.4rem;
    width: 12rem;
    margin: 0 auto;
    border-bottom: 1px solid #adadad;
    font-size: 1.6rem;
    overflow: hidden;
  }
  .pointer {
    position: absolute;
    width: 1rem;
    height: 1rem;
    display: block;
    background: #D6D6D6;
    transform: rotate(45deg);
    top: 50%;
    right: -0.5rem;
    margin-top: -0.5rem;
  }
  .blank {
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    width: 600rem;
    z-index: -1;
  }
  .picAddCar {
    position: fixed;
    right: 0;
    top: 75%;
    width: 4rem;
    z-index: 200;
    margin-right: .8rem;
  }
  .picAddCar img {
    width: 100%;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-44rem);
  }
</style>
