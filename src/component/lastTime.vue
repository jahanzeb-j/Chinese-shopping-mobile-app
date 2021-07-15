<template>
  <span>
    <span class="last-time">
        <span class="clock">{{h}}</span>
        <span :class="unitsClass">{{units[0]}}</span>
        <span class="clock">{{m}}</span>
        <span :class="unitsClass">{{units[1]}}</span>
        <span class="clock second">{{s}}</span>
        <span :class="unitsClass">{{units[2]}}</span>
        <span >{{lastTime2}}</span>
    </span>
  </span>
</template>
<script type="text/ecmascript-6">
export default{
    props: {
        lastTime: {
            default: 0,
            type: [String,Number]
        },
        handle: {
            default: () => {},
            type: Function
        },
        endTimeWord: {
            default: '付款超时',
            type: String
        },
        units: {
            default: function(){
                return [':',':','']
            },
            type: Array
        },
        unitsClass: {
            default: '',
            type: String
        }
    },
    name: 'lastTime',
    data () {
        return{
            lastTime2:'',
            timer:'',
            h:'',
            m:'',
            s:'',
        }
    },
    methods:{
    // 倒计时countdown
        
        countdown (time) {
            if(time){
               this.timer= setInterval(() => {
                    this.h = Math.floor(time / 1000 / 60 / 60)
                    this.m = Math.floor(time / 1000 / 60 % 60)
                    this.s = Math.floor(time / 1000 % 60)
                    if(this.h<10){
                        this.h= '0'+this.h
                    }
                    if(this.m<10){
                        this.m= '0'+this.m
                    }
                    if(this.s<10){
                        this.s= '0'+this.s
                    }
                    // this.lastTime2 = h + this.units[0] + m + this.units[1] + s + this.units[2]
                    time = time - 1000
                    this.lastTime2 = ''
                    if(time <= 0){
                        clearInterval(this.timer)
                        this.h=0
                        this.m=0
                        this.s=0
                        this.lastTime2 = ''
                        this.$emit("handle")
                        return
                    }
               },1000)
            }
            
        },
    },
    mounted(){
      this.countdown(this.lastTime)
    },
    watch:{
        lastTime(val){
            //console.log(val)
            clearInterval(this.timer)
            this.countdown(this.lastTime)
        }
    }
}
</script>