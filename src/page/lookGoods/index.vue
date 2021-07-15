<template>
  <div class="lookIndex">
    <div class="index-title">
      <div class="title-key">展厅</div>
      <div class="title-btn" @click="toggleCity">
        <div class="btn-words">{{cureentCity}}</div>
        <img src="../../assets/images/open-icon.png" class="btn-img">
      </div>
    </div>
    <div class="search-container">
      <input type="text" placeholder="搜索展厅" class="search-input" readonly="readonly" @click="toSerach_history">
      <img src="../../assets/images/search-icon.png" class="search-img">
    </div>
    <div id="amap-wrapper">
    </div>
    <div class="big_box" ref="bigBox" style="top:59.2rem;overflow: auto">
      <div class="resultlist" v-for="(item,index) in indexList" v-show="!showLoading">
        <div class="goods_container" @click="toDatiles(index)">
          <div class="goods_left">
            <img :src="item.exhibitionImgUrl" alt="">
          </div>
          <div class="goods_right">
            <!--<div class="right_icon"></div>-->
            <div class="zhantingname">{{item.name}}</div>
            <div class="zhantingtitle">{{item.title}}</div>
            <div class="zhantingaddress">{{item.position}}</div>
            <div class="iconbox">
              <div class="icon-img">
                <img src="../../assets/images/zhanpin.png" alt="">
                <span>{{item.commodityCount}}个</span>
              </div>
              <div class="icon-img" style="flex:1.8;-webkit-flex:1.8" v-show="showjuli">
                <img src="../../assets/images/mapicon.png" alt="">
                <span>距{{item.distanceStr}}</span>
              </div>
              <div class="icon-img" style="margin-right:0.2rem">
                <span style="float: right">预约{{item.appointmentNumber}}</span>
                <img src="../../assets/images/yuyue.png" style="float: right">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div style="clear: both"></div>
    <!--加载中-->
    <div class="loading" v-show="showLoading">
      <div class="onloading">
        <img src="../../assets/images/spinner2.png" class="onloading-img">
        <div class="onloading-words">加载中请稍后...</div>
      </div>
    </div>
    <!--数据请求失败-->
    <div class="falied" v-show="falied">暂无数据！</div>
    <div class="bottom-btn" ref="bottomBtn" style="top:43.8rem">
      <img src="../../assets/images/btn-icon.png" class="bbimg">
    </div>
    <!--本区域暂无数据提示-->
    <div class="alert_timeout" v-if="isTimeout">
      <div class="alert_timeout_words1">当前区域无展厅</div>
      <div class="alert_timeout_words2">已为您推荐其他展厅</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        cureentLng: '',
        cureentLat: '',
        cureentCity: '',
        nearestLng: '',
        nearestLat: '',
        lnglats: [],
        indexList: [],
        showLoading: false,
        falied: false,
        country: '',
        map: null,
        markerArr: [],
        curXzMarker: null,
        isTimeout: false,
        showjuli: true
      };
    },
    components: {},
    activated(){
      const isNeedCache = window.localStorage.getItem('isNeedCacheForMap')

      if (isNeedCache === '1' || !isNeedCache) {
        this.loadMap()
      }

    },
    deactivated (){
      window.localStorage.setItem('isNeedCacheForMap', 0)
    },
    mounted () {
      window.localStorage.setItem('isNeedCacheForMap', 1)
      this.shangla()
      this.toTop()
      this.setscollertop()
      this.getcurrentCityCode()

    },
    methods: {
//        获取当前城市areaCoade
      getcurrentCityCode: function () {
        if (window.localStorage.getItem('positionSwitch')) {
          this.currentCity = window.localStorage.getItem('positionSwitch')
          if (this.currentCity) {
            let url = window.HOST_HDBITION + '/area/getArea'
            this.$resource(url).get({'area': this.currentCity}).then((response) => {
              if (response.status == 200) {
                if (response.body.respBody[0].areaCode == null || !response.body.respBody[0].areaCode) {
                  window.localStorage.setItem('areaCode', '')
                } else {
                  window.localStorage.setItem('areaCode', response.body.respBody[0].areaCode)
                }

              }
            })
          }
        }
      },
      setscollertop: function () {
        this.$nextTick(() => {
          let body = document.getElementsByTagName('body')[0]
          body.scrollTop = 0
        })
      },
      toggleCity: function () {
        let nogps = this.$route.query.noGps

        if (nogps) {

          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'nogps';
        } else {

          window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'city_switch';
        }

      },
      toDatiles: function (index) {
        let newid = this.indexList[index].id
//        let zhantingDate=this.indexList[index]
//        window.localStorage.setItem('ZTdata',zhantingDate)
        window.localStorage.setItem('zhanTingId', newid)
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'exhibition_details?id=' + newid;
      },
      toTop: function () {
        this.$nextTick(() => {
          let box = this.$refs.bigBox;
          let boxvalue = parseFloat(box.style.top);
          let timer = setInterval(function () {
            boxvalue = boxvalue - 1.34
            box.style.top = boxvalue + 'rem'
            if (boxvalue < 45.8) {
              clearInterval(timer)
              return
            }
          }, 10)

        })
      },
      toBottom: function () {
        this.$nextTick(() => {
          let box = this.$refs.bigBox;
          box.style.top = '58.9rem'
        })
      },
      shangla: function () {
        let lnglats = []
        let box = this.$refs.bigBox;
        let bottomBtn = this.$refs.bottomBtn;
        let startX, startY, moveEndX, moveEndY, X, Y
        this.$nextTick(() => {
          bottomBtn.addEventListener('touchstart', function (event) {
            let e = event || window.event;

            e.preventDefault();
            startX = e.targetTouches[0].pageX
            startY = e.targetTouches[0].pageY
          })
          bottomBtn.addEventListener('touchmove', function (event) {
            let e = event || window.event;
            e.preventDefault();
            moveEndX = e.targetTouches[0].pageX
            moveEndY = e.targetTouches[0].pageY
            X = moveEndX - startX
            Y = moveEndY - startY

            if (Math.abs(Y) > Math.abs(X) && Y < -40) {
              let body = document.getElementsByTagName('body')[0]
              body.scrollTop = 0
              let boxvalue = parseFloat(box.style.top);
              let btnvalue = parseFloat(bottomBtn.style.top)
              if (boxvalue < 10.7) {
                return
              } else {
                let timer = setInterval(function () {
                  boxvalue = boxvalue - 1
                  box.style.top = boxvalue + 'rem'
                  if (boxvalue < 10.7) {
                    window.clearInterval(timer)
                    return
                  }
                }, 10)
              }
              if (btnvalue < 25.9) {
                return
              } else {
                let timer2 = setInterval(function () {
                  btnvalue = btnvalue - 17.9
                  bottomBtn.style.top = btnvalue + 'rem'
                  if (btnvalue < 25.9) {
                    window.clearInterval(timer2)
                    return
                  }
                }, 50)
              }

              bottomBtn.style.position = 'fixed';
            }
            else if (Math.abs(Y) > Math.abs(X) && Y > 10) {
              let body = document.getElementsByTagName('body')[0]
              body.scrollTop = 0
              let btnvalue = parseFloat(bottomBtn.style.top)
              let boxvalue = parseFloat(box.style.top);
              if (boxvalue > 44.8) {
                return
              } else {
                let timer = setInterval(function () {
                  boxvalue = boxvalue + 1
                  box.style.top = boxvalue + 'rem'
                  if (boxvalue > 44.8) {
                    window.clearInterval(timer)
                    return
                  }
                }, 10)
              }


              if (btnvalue > 25.9) {
                return
              } else {
                let timer2 = setInterval(function () {
                  btnvalue = btnvalue + 17.9
                  bottomBtn.style.top = btnvalue + 'rem'
                  if (btnvalue > 25.9) {
                    window.clearInterval(timer2)
                    return
                  }
                }, 50)
              }

//                 box.style.top='44.8rem'
              bottomBtn.style.position = 'fixed';
//              bottomBtn.style.top='43.8rem'
            }
            else {
              console.log("just touch")
            }
          })
        })
      },
      toSerach_history: function () {
        window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'serach_history';
      },

      loadMap: function () {
        //初始化地图对象，加载地图
        let _this = this
        var indexdate = ''
        var positionbox = []
        var geolocation;
        this.map = new AMap.Map('amap-wrapper', {
          resizeEnable: true,
          zoom: 16
        });
        let nogps = this.$route.query.noGps
        if (!nogps) {

          this.map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 6000,          //超过10秒后停止定位，默认：无穷大
              buttonOffset: false,//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: false,
              panToLocation: false
            });
            _this.showLoading = true;
            _this.map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            //解析定位结果
            function onComplete(data) {
              var lnglats = [];
              _this.cureentLng = data.position.getLng();
              _this.cureentLat = data.position.getLat();

              //获取后台数据
              _this.showLoading = true;
              let url = window.HOST_HDBITION + '/hdpExhibition/getHdpExhibitionByPosition'
              _this.$resource(url).get({
                'longitude': _this.cureentLng,
                'latitude': _this.cureentLat,
                'positionDetail': _this.cureentCity
              }).then((response) => {

                if (response.body.code == 200 && response.body.respBody instanceof Array && response.body.respBody.length != 0) {
                  _this.showLoading = false;
                  _this.nearestLng = response.body.respBody[0].longitude;
                  _this.nearestLat = response.body.respBody[0].latitude;
                  window.localStorage.setItem('longitude', _this.cureentLng)
                  window.localStorage.setItem('latitude', _this.cureentLat)
                  _this.indexList = response.body.respBody;
                  _this.initMarkers(response.body.respBody);
                } else {
//                    地区无数据的时候展示所有展厅
                  let url = window.HOST_HDBITION + '/hdpExhibition/getHdpExhibitionList'
                  _this.isTimeout = true

                  _this.$resource(url).get({}).then((response) => {
                    if (response.status == 200) {
                      _this.indexList = response.body.respBody;
                      setTimeout(function () {
                        _this.isTimeout = false
                      }, 1500)
                      for (let i = 0; i < _this.indexList.length; i++) {
                        if (_this.indexList[i].commodityCount == null) {
                          _this.indexList[i].commodityCount = 0
                        }
                        if (_this.indexList[i].appointmentNumber == null) {
                          _this.indexList[i].appointmentNumber = 0
                        }
                        if (_this.indexList[i].distanceStr == null) {
                          _this.showjuli = false
                        }
                      }
                    }
                  })
                  _this.showLoading = false;
//                  _this.falied=true;
                }
              })
            }

            //解析定位错误信息
            function onError(data) {
              alert('定位失败')
              this.showLoading = false
              window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'nogps';

            }
          });
        } else {//没有定位时的数据请求
          let _this = this
          let url = window.HOST_HDBITION + '/hdpExhibition/getHdpExhibitionByPositionDetail'
          let positionDetail = window.localStorage.getItem('positionSwitch')
          _this.$resource(url).get({'positionDetail': positionDetail}).then((response) => {

            if (response.status == 200) {
              _this.indexList = response.body.respBody
              for (let i = 0; i < _this.indexList.length; i++) {
                _this.indexList[i].distanceStr = ''
              }
              _this.showjuli = false
              _this.initMarkers(response.body.respBody);
              if (_this.indexList.length == 0) {//没有定位且数据返回为空时数据请求
                _this.isTimeout = true
                let url = window.HOST_HDBITION + '/hdpExhibition/getHdpExhibitionList'
                _this.$resource(url).get({}).then((response) => {
                  if (response.status == 200) {
                    setTimeout(function () {
                      _this.isTimeout = false
                    }, 1500)
                    _this.indexList = response.body.respBody;
                    for (let i = 0; i < _this.indexList.length; i++) {
                      if (_this.indexList[i].commodityCount == null) {
                        _this.indexList[i].commodityCount = 0
                      }
                      if (_this.indexList[i].appointmentNumber == null) {
                        _this.indexList[i].appointmentNumber = 0
                      }
                    }
                  }
                })

              }
              _this.showLoading = false;
//              this.falied=true
            }
          })
        }

        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {

          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              let GPSPosition = result.city;
              window.localStorage.setItem('gpsPosition', GPSPosition)
              let positionSwitch = window.localStorage.getItem('positionSwitch')
              if (positionSwitch) {
                if (positionSwitch.indexOf('区') != -1) {
                  _this.cureentCity = positionSwitch
                  _this.country = positionSwitch
                } else {
                  _this.cureentCity = positionSwitch
                  _this.country = positionSwitch
                }
              } else {
                _this.cureentCity = result.city.replace(/市/, '');
                _this.country = result.city.replace(/市/, '')

              }

              let cityName = _this.country;
              if (!cityName) {
                cityName = '北京市';
              }
              _this.map.setCity(cityName);

            }
          } else {
            alert(result.info);
          }
        });
      },
//      初始化覆盖物
      initMarkers: function (lsts) {
        var _this = this;
        if (lsts instanceof Array && 0 != lsts.length) {
          for (var r = 0; r < lsts.length; r++) {
            if (!lsts[r] || typeof(lsts[r]) == "undefined") {
              continue;
            }
            var rm = lsts[r];

            var marker = new AMap.Marker({
              position: [rm.positionArray[0], rm.positionArray[1]],
              icon: new AMap.Icon({
                size: new AMap.Size(40, 50),  //图标大小
                imageOffset: new AMap.Pixel(0, -60),
                image: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png",
              })
            });

            marker.xzicon = "http://img.99114.com/group1/M00/85/82/wKgGTFiuqEWANde0AAARx33045s164.png";
            marker.fxzicon = "http://img.99114.com/group1/M00/05/CE/wKgGS1iuqDGAXENcAAAW4Z_h1nw427.png";
            marker.content = '<div class="msg_box_other3"><div div class="msg_name2">' + rm.name + '</div><div class="msg_telephone">' + rm.telephone + '</div><div class="msg_title">' + rm.title + '</div><div class="msg_position">' + rm.position + '</div><div class="msg_distance">' + rm.distanceStr + '</div><div id="triangle-down"></div></div>';

            marker.setMap(this.map);
            marker.on('click', function (event) {
              var evt = event || window.event;
              var mak = evt.target || evt.srcElement;

              mak && new AMap.InfoWindow({
                isCustom: true, content: mak.content, offset: new AMap.Pixel(16, -45)
              }).open(_this.map, mak.getPosition());
              var xz = _this.curXzMarker;
              xz.setIcon(xz.fxzicon);
              mak.setIcon(mak.xzicon);
              _this.curXzMarker = mak;

            });

            if (0 == r) {
              this.curXzMarker = marker;
              marker.setIcon(marker.xzicon);
              new AMap.InfoWindow({
                isCustom: true, content: marker.content, offset: new AMap.Pixel(16, -45)
              }).open(this.map, marker.getPosition());
            } else {
              marker.setIcon(marker.fxzicon);
            }

          }
        }
      }
    }
  }

</script>
<style>
  /*信息窗体样式开始*/
  .amap-info-content {
    width: 23.9rem;
  }

  .msg_box_other2, .msg_box_other3 {
    width: 23.9rem !important;

    background: #fff;
    border-radius: 5px;
    padding-top: 0.6rem;
    position: relative;
  }

  .msg_box_other2 {
    border: none !important;
  }

  .msg_distance {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.1rem;
    color: #858585;
  }

  .amap-info-close {
    font-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
  }

  .msg_name {
    width: 70%;
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-top: 0.5rem;
    text-align: left;
    padding-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .msg_name2 {
    width: 68%;
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-top: 0.5rem;
    text-align: left;
    padding-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4rem;

  }

  #triangle-down {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 20px solid #fff;
    position: absolute;
    left: 50%;
    top: 95%;

  }

  .msg_telephone {
    width: 100%;
    color: #f9be00;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    text-align: left;
    padding-left: 1rem;
  }

  .msg_title {
    width: 100%;
    font-size: 1.2rem;
    color: #858585;
    margin-top: 1rem;
    text-align: left;
    padding-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3rem;
  }

  .msg_position {
    width: 100%;
    font-size: 1.2rem;
    color: #858585;
    margin-top: 0.5rem;
    text-align: left;
    padding-left: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
  }

  /*信息窗体样式结束*/
</style>
<style scoped>

  html, body, .lookIndex {
    height: 100%;

  }

  .big_box {
    bottom: 5rem;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  /*地图样式开始*/
  #amap-wrapper {
    width: 100%;
    height: calc(100% - 15.3rem);
    color: #333333;

  }

  .info {
    border: solid 1px silver;
    width: 23.9rem;
  }

  div.info-top {
    position: relative;
    background: none repeat scroll 0 0 #F9F9F9;
    border-bottom: 1px solid #CCC;
    border-radius: 5px 5px 0 0;
  }

  div.info-top div {
    display: inline-block;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 31px;
    padding: 0 10px;
  }

  div.info-top img {
    position: absolute;
    top: 10px;
    right: 10px;
    transition-duration: 0.25s;
  }

  div.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
  }

  div.info-middle {
    font-size: 12px;
    padding: 6px;
    line-height: 20px;
  }

  div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
  }

  div.info-bottom img {
    position: relative;
    z-index: 104;
  }

  span {
    margin-left: 5px;
    font-size: 11px;
  }

  .info-middle img {
    float: left;
    margin-right: 6px;
  }

  /*地图样式结束*/
  /*头部标题样式开始*/
  .index-title {
    width: 100%;
    height: 4.4rem;
    border-bottom: 1px solid #d6d6d6;
    position: relative;
  }

  .title-key {
    width: 100%;
    height: 4.4rem;
    line-height: 4.4rem;
    text-align: center;
    font-size: 1.8rem;
  }

  .title-btn {
    width: 16rem;
    height: 4.4rem;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.6rem;
    padding-left: 0.6rem;

    text-align: left;
  }

  .btn-words {
    max-width: 13rem;
    float: left;
    display: inline-block;
    height: 4.4rem;
    font-size: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 4.4rem;

  }

  .btn-img {
    width: 1rem;
    height: 0.6rem;
    float: left;
    display: inline-block;
    vertical-align: middle;
    margin-top: 2.1rem;
    margin-left: 0.5rem;

  }

  /*头部标题样式结束*/
  .search-container {
    width: 100%;
    position: relative;
  }

  .search-input {
    width: 96%;
    height: 2.8rem;
    background: #f4f4f4;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    text-align: center;
    font-size: 1.4rem;
    padding-left: 0.9rem;
    border-radius: 0.2rem;
  }

  .search-img {
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    top: 1.5rem;
    left: calc(50% - 4.2rem);
  }

  .big_box {
    width: 100%;
    position: absolute;
    z-index: 300;
    background: #f4f4f4;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .bottom-btn {
    width: 100%;
    height: 2.2rem;
    background: #fff;
    position: fixed;
    z-index: 10000;
    top: 43.8rem;

  }

  .bbimg {
    width: 3.85rem;
    height: 0.55rem;
    position: absolute;
    left: calc(50% - 1.925rem);
    top: 0.75rem;
  }

  /*信息窗体样式开始*/
  .info {
    width: 63.8%;
    border-radius: 2px;
    position: relative;
  }

  .info-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-top: 10px;
  }

  /*信息窗体样式结束*/
  /*展品样式开始*/
  .resultlist {
    width: 100%;
    background: #fff;
    margin-top: 1rem;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }

  .goods_container {
    width: 96%;
    margin-left: 3%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    height: 13rem;
    background: #fff;
  }

  .goods_container div {
    float: left;
  }

  .goods_left {
    width: 13rem;
    height: 12rem;
  }

  .goods_left img {
    display: inline-block;
    width: 13rem;
    height: 12rem;
    margin-top: 0.5rem;

  }

  .goods_right {
    width: calc(98.5% - 14rem);
    height: 12rem;
    margin-left: 1rem;
    text-align: left;
    position: relative;
  }

  .right_icon {
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    top: 1.5rem;
    right: 0.2rem;
    background: url("../../assets/images/gongsi.png") no-repeat;
  }

  .zhantingname {
    width: 100%;
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #858585;
    height: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2rem;
  }

  .zhantingtitle {
    width: 100%;
    font-size: 1.5rem;
    color: #333333;
    font-weight: 600;
    margin-top: 1.75rem;
    height: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.7rem;
  }

  .zhantingaddress {
    width: 100%;
    color: #858585;
    margin-top: 1rem;
    font-size: 1.2rem;
    line-height: 1.5rem;
  }

  .amap-info-outer, .amap-menu-outer {
    box-shadow: 0 3px 14px rgba(0, 0, 100, .2)
  }

  .iconbox {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    display: -webkit-flex;
  }

  .iconbox div {
    flex: 1;
    -webkit-flex: 1;
    text-align: left;
  }

  .icon-img img {
    float: left;
    vertical-align: top;
  }

  .icon-img span {
    font-size: 1.1rem;
    float: left;
    margin-left: 0.5rem;
    line-height: 1.2rem;
  }

  /*展品样式结束*/
  /*加载中样式开始*/

  .onloading {
    width: 100%;
    height: 5rem;
    position: fixed;
    z-index: 302;
    top: 47.8rem;
  }

  .onloading-words {
    display: inline-block;
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
    color: #858585;
    margin-left: 3px;

  }

  .onloading-img {
    width: 2.5rem;
    height: 2.5rem;
    vertical-align: middle;
    animation-name: loadingimg;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes loadingimg {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);;
    }
  }

  /*加载中样式结束*/
  @keyframes shangla {
    from {
      background: red;
    }
    to {
      background: yellow;
    }
  }

  /*数据加载失败*/
  .falied {
    width: 100%;
    font-size: 1.4rem;
    color: #858585;
    position: fixed;
    top: 47.8rem;
    z-index: 305;
  }

  .alert_timeout {
    width: 17rem;
    height: 6.6rem;
    background-color: rgba(0, 0, 0, 0.65);
    color: #fff;
    font-size: 1.6rem;
    position: fixed;
    bottom: calc(50% - 3.3rem);
    bottom: -webkit-calc(50% - 3.3rem);
    text-align: center;
    left: calc(50% - 8.5rem);
    left: -webkit-calc(50% - 8.5rem);
    z-index: 100000;
    border-radius: 0.4rem;
  }

  .alert_timeout_words1 {
    width: 100%;
    text-align: center;
    margin-top: 1.4rem;
    font-size: 1.6rem;
    line-height: 1.7rem;
  }

  .alert_timeout_words2 {
    width: 100%;
    text-align: center;
    margin-top: 0.6rem;
    font-size: 1.6rem;
    line-height: 1.7rem;
  }
</style>
