<template v-if="show == true">
    <div class="tab-bottom">
        <div class="tab-bottom-item">
            <router-link  to="/found_index" repalce>
                <span>
                    <img src="../assets/images/tab/zhaohuo_nor@2x.png" alt="" class="img1" >
                    <img src="../assets/images/tab/zhaohuo_sel@2x1.png" alt="" class="img1 img-active" >
                </span>
                <span class="sp1 songti">主页</span>
            </router-link>
        </div>

        <div class="tab-bottom-item" >
            <router-link  to="/classifyIndex" repalce>
                <span>
                    <img src="../assets/images/tab/fenlei_nor@2x1.png" alt="" class="img2">
                    <img src="../assets/images/tab/fenlei_sel@2x1.png" alt="" class="img-active" >
                </span>
                <span class="sp2 songti">分类</span>
            </router-link>
        </div>
        <div class="tab-bottom-item" @click="checkLogin1">
            <router-link  to="/shopping" repalce>
                <span>
                    <img src="../assets/images/tab/xiaoxi@2x1.png" alt="" class="img4" style="width:2.2rem; height: 2.2rem;">
                    <img src="../assets/images/tab/news-sel@2x.png" alt="" class="img-active" style="width:2.2rem; height: 2.2rem;">
                </span>
                <span class="songti">购物车</span>
            </router-link>
        </div>
        <div class="tab-bottom-item" >
            <router-link  to="/myIndex" repalce>
                <span>
                    <img src="../assets/images/tab/wo_nor@2x1.png" alt="" class="img5" >
                    <img src="../assets/images/tab/wo_nor@2x.png" alt="" class="img-active" >
                </span>
                <span class="songti">我的</span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { _isLogin } from '../util/api.js'
    export default {
        name: 'bottomTab',
        data(){
            return{
                isActive:true,
                loginCode: '',
                defaultActive: false,
                loginCode: '',
                show:false
            }
        },
        created(){
            this.checkDefaultUrl()
        },
        methods: {
            //判断是否登录
            async checkLogin(){
                // let url = HOST_HDPUSER+'/user/isLogin';
                // this.loginCode= window.localStorage.getItem('loginCode')
                // this.userId= window.localStorage.getItem('userId')
                // if(this.loginCode != "" && this.loginCode != null){
                //     this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
                //         if (response.status == 200) {
                //             if(response.data.code<0){
                //                 window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
                //             }
                //             else if(response.data.code==200){
                //                 window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "myIndex"
                //             }
                //             else{
                //                 window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
                //             }
                //         }
                //     })
                // }else{
                //     window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
                // }
                let { loginStatus } = await _isLogin()
                if(loginStatus){
                    this.$router.replace({path: 'myIndex',query:{voluntary:'001'}})
                }else{
                    window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=002"
                }
            },
            //判断是否登录
            checkLogin1(){
                let url = HOST_HDPUSER + '/user/isLogin';
				this.loginCode = window.localStorage.getItem('loginCode')
				this.userId = window.localStorage.getItem('userId');
				if(this.loginCode != "" && this.loginCode != null) {
					var carUrl = window.location.href;
					var index = carUrl.indexOf('?')
					if(this.$route.query.shopping == 1 && this.$route.query.shoppingBack != "001") {
						var urlRemain = carUrl.slice(index + 1, carUrl.length - 10)
					} else if(this.$route.query.shopping == 1 && this.$route.query.shoppingBack == "001") {
						var urlRemain = carUrl.slice(index + 1, carUrl.length)
					} else {
						var urlRemain = carUrl.slice(index + 1, carUrl.length + 1)
					}
					if(this.$route.query.shoppingBack == 1) {
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + urlRemain
					} else if(this.$route.query.shoppingBack == "001") {
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + urlRemain
					} else {
						console.log('else')
						window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'shopping?' + 'shoppingBack=1' + '&' + urlRemain + '&enterCount=1'
						console.log(window.location.href);
					}
				} else {
					var carUrl1 = window.location.href;
					var index1 = carUrl1.indexOf('?')
					var urlRemain1 = carUrl1.slice(index1 + 1, carUrl1.length + 1)
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=120" + '&' + urlRemain1
				}
            },
            //判断是否登录
            // checkLogin2(){
            //     let url = HOST_HDPUSER+'/user/isLogin';
            //     this.loginCode= window.localStorage.getItem('loginCode')
            //     this.userId= window.localStorage.getItem('userId')
            //     if(this.loginCode != "" && this.loginCode != null){
            //         this.$resource(url).get({loginCode:this.loginCode}).then((response) => {
            //         if (response.status == 200) {
            //         if(response.data.code<0){
            //             window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=005"
            //         }
            //         else if(response.data.code==200){
            //             window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "lookIndex"
            //         }
            //         else{
            //             window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=005"
            //         }
            //         }
            //     })
            //     }
            //     else{
            //         window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + "login?loginBack=005"
            //     }
            // },
            //判断默认进来的页面
            checkDefaultUrl(){
                let hash = window.location.hash
                hash = hash.split('/')[1]
                if( hash == '' ){
                    this.defaultActive = true
                }
            }
        }
    }
</script>
<style scoped>
    .tab-bottom{
		width: 100%;
		height: 5rem;
		padding: 0;
        /* background: url(../assets/images/tab/tab_bg@2x.png)
        background-size:100% 5rem; */
    }
    .tab-bg{
        position: absolute;
        bottom: 0.3rem;
        width:100%;
        height: 6.6rem;
        z-index:-1;
    }
    .tab-bg img{
        width:100%;
        height: 6.6rem;
    }
    .tab-bottom-item{
        text-align:center;
        color:#333333;
        font-size:1rem;
        width: 25%;
        float: left;
        background-color: #FAFAFA;
        border-top: 1px solid #E2E2E2 ;
    }
    .tab-bottom-item img{
        display: block;
        width:2.2rem;
        height: 2.2rem;
    }
    .tab-bottom-item span{
        display: block;
         color: #7F7F7F; 
        font-family: PingFang SC ,Microsoft JhengHei;
        font-size: 0.9rem;
        /*color:#eb3223;*/
    }
    .tab-bottom-item .img1{
         width: 2.2rem;
        height: 2.2rem;
    }
    .tab-bottom-item .active img1{
        /* width: 1.9rem; */
        height: 2.4rem;
    }
    .tab-bottom-item .img3{
        /* bottom: 2rem; */
        /* margin-bottom: 1.2rem; */
        /*width: 5.55rem;
        height: 5.7rem;
        position: fixed;
        bottom: 1.3rem;*/
        /* left: -0.4rem; */
        /*left: calc(49% - 2.4rem);
        border: 0.4rem solid #fff;
        border-radius: 50%;*/
        /* bottom: 2rem; */
        /* margin-bottom: 1.2rem; */
        /*width: 4.55rem;
        height: 4.7rem;
        position: fixed;
        bottom: 2.1rem;*/
        /* left: -0.4rem; */
        /*left: calc(50% - 2.2rem);*/
        /* border: 0.4rem solid #fff; */
        /*border-radius: 50%;*/
    }
    /* .tab-bottom-item .msg{ */
        /* width:4.5rem;
        height: 4.5rem;
        position: fixed;
        bottom: 1.8rem;
        left:calc(50% - 2.2rem); */
    /* } */
    /* .tab-bottom-item .img4{
        width: 2.2rem;
        height: 1.9rem;
    } */
    /* .tab-bottom-item .img5{
        width: 1.9rem;
        height: 1.9rem;
    } */
    .tab-bottom-item .img-active{
        display:none;
    }
    a{
        height:4.9rem;
        width:100%;
        display:-webkit-flex;
        display:flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
        padding-top:0.5rem;
        padding-bottom:0.7rem;
    }
    /*.tab-bottom img{
        position: fixed;
        bottom: 2rem;
    }*/
    .tab-bottom-item .active img{
        display:none;
    }
    /* .tab-bottom-item .active .img3{
        display: none;

    } */
    .tab-bottom-item .active .img-active{
        display:block;
    }
    .tab-bottom-item .active .img{
        display: block;
        position: fixed;
        bottom: 0rem;
        left:calc(50% - 2.2rem)
    }
    .tab-bottom-item .active1{
        display: none;
    }
    .tab-bottom-item .active2{
        display: block;
        position: fixed;
        bottom: 0;
        left:calc(50% - 2.2rem)
    }
    .tab-bottom-item .active .bigPic{
        display: block;
        position: absolute;
    }
    .tab-bottom-item .sp3{
        position: fixed;
        bottom: 0.5rem;
        left: calc(50% - 1.9rem );
        z-index: 111;
    }

    .tab-bottom-item .themeBackClass{
        display: block;
        position: absolute;
    }
    /*.img3box{
        width:7.3rem;
        height:8rem;
        bottom:0;
    }*/
    .img3box img{
        /* width:7.3rem;
        height:8rem; */
        position: absolute;
        bottom:0;
        left:50%;
        margin-left:-3.7rem;
        width:7.6rem;
        height:8rem;
    }
    .img3box a{
        height:100%;
    }
    .router-link-exact-active .songti{
         color:#FFAA39; 
        /*color:#eb3223;*/
    }
</style>