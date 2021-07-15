<template>
    <div class="box">
        <header>分类</header>
        <div class="left-tab">
            <div class="inner" >
                <div class="list" >
                    <div class="list-container">
                        <div class="tab" 
                            :class="{active: index === tabActive}"
                            @click="chooseTab(index)"
                            v-for="(item,index) in categoryList" :key="index">
                            <span class="txt" @click="activethis(item.id)">{{item.categoryName}}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs-child" >
            <div class="child">
                <div class="list">
                    <router-link 
                        class="list-item" 
                        v-for="(item,index) in childList" :key="index"
                        :to="{path:'classifySecond',query:{categoryIndex:tabActive,categoryId:item.id,activeIndex:index}}" >
                        <div class="item-img">
                            <img :src="item.categoryPic" alt="">
                        </div>
                        <div class="item-text">{{item.categoryName}}</div>
                        
                    </router-link>
                </div>
            </div>
            
        </div>
        <quick-bar :purchase="true"></quick-bar>
        <!-- <bottom-tab></bottom-tab> -->
    </div>
  
</template>

<script>
// import BottomTab from '../../component/bottomTab'
import QuickBar from '../../component/QuickBar'
import { api_get_no } from '../../util/api.js'
export default {
//   props: ['tabs'],
  data () {
    return {
        screenHeight: '500px',
        tabActive: 0,
        categoryList: [],
        childList: []
    }
  },
  mounted(){
      this.getCategoryList()
  },
  methods: {
    activethis (id) {
      
    },
    // 获取类目
    getCategoryList (){
        api_get_no({
            url: HOST_HDPCOMMODITY + '/commodityFront/getCategoryList',
        }).then(res => {
            this.categoryList = res
            this.chooseTab(0)
        })
    },
    // 选择左侧tab事件
    chooseTab(index) {
        this.tabActive = index
        let temp = this.categoryList[index].childlist
        // 防止文字过长
        temp.forEach(e => {
            e.categoryName = e.categoryName.length <= 4 ? e.categoryName : e.categoryName.substring(0, 4) + '..'
        })
        this.childList = temp
        console.log(this.childList)
    }
  },
  components: { 
    //   BottomTab, 
      QuickBar 
}
}
</script>

<style scoped>

.box{
    display: flex;
    width: 100%;
    height:100%;
    position: relative;
    overflow: hidden;
    font-family: PingFang SC,Microsoft JhengHei;
}
header{
    width:100%;
    height: 4.4rem;
    line-height: 4.4rem;
    text-align: center;
    font-size:1.8rem;
    position: fixed;
    z-index:20;
    top:0;
    border-bottom: 1px solid #d6d6d6;
    background-color: #fff;
}
/* 左侧 */
.left-tab .mylist .inner .list{
  width: 100%;
  /* display: flex; */
  justify-content: space-around;
  
}
.left-tab {
    /* display: flex; */
    flex-flow: row nowrap;
    background-color: #f4f4f4;
    height: .8rem;
    position: absolute;
    top:4.4rem;
    left:0;
    width: 9rem;
    /* height: 1000px; */
    height:100%;
    border-right: 1px solid #d9d9d9;
    overflow: hidden;
    
}
.inner {
    /* display: flex; */
    /* flex-flow: row nowrap; */
    height: 100%;
    width: 100%;
    display: block;
    overflow-y:auto; 
}
.list {
    padding-bottom:9rem;
    overflow-x: none;
}
.list-container{
  /* display: flex; */
  /* flex-flow: row nowrap;; */
  /* flex-shrink: 0; */
  padding: 0 .4rem;
  overflow: scroll;
  overflow-x: hidden;
  display: block;
  z-index: 10000;
  padding: 0;
}
::-webkit-scrollbar
{
    width: 0px;
    height: 0px;
    background-color: transparent;
}

.left-tab .tab {
    /* display: flex; */
    /* flex-flow: row nowrap; */
    /* align-items: center; */
    justify-content: center;
    position: relative;
    z-index: 1;
    text-align: center;
}
.left-tab .tab {
    /* flex-shrink: 0; */
    position: relative;
    justify-content: flex-start;
    
}
.tab.active {
    background-color: #ffd85a
}
.left-tab .tab.active .txt {
    position: relative;
    color:#ffd85a;
    background-color: #fff;
}
.tab .txt {
    display: inline-block;
    width:100%;
    padding: 0 1.1rem 0 0rem;
    line-height: 6rem;
    font-size: 1.4rem;
    color: #333;
    text-align: center;
    margin-left:0.2rem;
}
.tab.active .txt:after {
    content: '';
    position: absolute;
    right:-0.3rem;
    bottom: 0;
    height: 100%;
    width: 0.4rem;
    background-color: #fff;
    z-index:20;
}



/* 右侧 */
.tabs-child{
    /* position: absolute; */
    /* top:4.4rem; */
    margin-top:4.4rem;
    margin-left:9rem;
    /* padding: 2.5rem 0rem 0rem 0rem; */
    /* flex: 1 1 7.8rem; */
    overflow: auto;
    /* height:100%; */
}
.tabs-child .child{
    /* position: absolute;
    overflow: auto; */
    height:100%;
    overflow: auto;
}
.tabs-child .list{
    /* overflow-y: auto; */
    overflow: hidden;
    width:100%;
    padding-bottom:7rem;
    padding-left:0.5rem;
}
.list .list-item{
    float:left;
    width: 6.0rem;
    height:8rem;
    margin: 2.5rem  0rem 0 2.5rem;
    box-sizing: border-box;
}
.list-item .item-img{
    width: 100%;
    height:5.5rem;
    
}
.list-item .item-text{
    width: 100%;
    line-height:3rem;
    font-size:1.2rem;
    color:#555;
}
.list-item img{
    width: 4rem;
    height:5rem;
}
</style>

