<template>
  <div>
    <mt-button type="primary" @click="popupVisible = true">primary</mt-button>
    <mt-popup
      v-model="popupVisible"
      :visible.sync="popupVisible"
      position="bottom">
      <div class="popupHeader" @click="popupVisible = false">完成</div>
      <div class="popupCon" id="popupCon">
        <div id="popupSelect" v-model="popupSelect">{{this.popupSelect}}</div>
        <ul id="popupConUl" style="transform: translateY(9rem)">
          <li v-for="item in popupConList">{{item}}</li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Button } from 'mint-ui';
  import { Popup } from 'mint-ui';

  export default {
    data () {
      return {
        popupVisible: false,
        popupConList: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人以上'],
        startPageY: 0,
        endPageY: 0,
        popupSelect: '1人'
      }
    },
    mounted() {
      this.scrollSelect();
    },
    methods: {
      scrollSelect() {
        var popupCon = document.getElementById('popupCon');
        popupCon.addEventListener('touchstart', function(e) {
          this.startPageY = e.targetTouches[0].pageY;
          this.popupConList = ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人以上'];
          popupCon.addEventListener('touchmove', function(e) {
            this.endPageY = e.targetTouches[0].pageY;
          })
        });
        popupCon.addEventListener('touchend', function(e) {
          var popupConUl = document.getElementById('popupConUl').style.transform;
          var translateYValue = Number(popupConUl.split('(')[1].split('rem)')[0]);
          if(this.startPageY - this.endPageY >= 50) {
            translateYValue -= 4.5 * Math.ceil((this.startPageY - this.endPageY) / 50);
          }
          if(this.endPageY - this.startPageY >= 50) {
            translateYValue += 4.5 * Math.floor((this.endPageY - this.startPageY) / 50);
          }
          if(translateYValue <= -Math.floor((this.popupConList.length - 3) * 4.5)) {
            translateYValue = -Math.floor((this.popupConList.length - 3) * 4.5);
          } else if(translateYValue >= 9) {
            translateYValue = 9;
          }
          document.getElementById('popupConUl').style.transform = 'translateY(' + translateYValue + 'rem)';
          var popupSelectIndex = Math.ceil(Math.abs((translateYValue - 9)) / 4.5);
          setTimeout(() => {
            document.getElementById('popupSelect').innerText = document.getElementById('popupConUl').childNodes[popupSelectIndex].innerText;
          },500);
        })
      }
    }
  }
</script>

<style scoped>
  .popupHeader{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    color: #f9be00;
    font-size: 1.8rem;
    text-align: right;
    padding-right: .8rem;
    background-color: #fff;
  }
  .popupCon{
    width: 100%;
    height: 22rem;
    color: #858585;
    font-size: 2rem;
    background-color: #f4f4f4;
    overflow: hidden;
  }
  .popupCon ul{
    transition: 1s;
  }
  .popupCon li{
    line-height: 4.4rem;
  }
  #popupSelect{
    width: 100%;
    height: 3.8rem;
    line-height: 3.8rem;
    color: #333;
    background-color: #fff;
    border-top: .05rem solid #D6D6D6;
    border-bottom: .05rem solid #D6D6d6;
    position: fixed;
    top: 14rem;
    z-index: 999;
  }
</style>
