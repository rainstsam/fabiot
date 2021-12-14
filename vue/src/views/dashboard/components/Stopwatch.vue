<!--
 * @Author: your name
 * @Date: 2020-06-06 23:10:05
 * @LastEditTime: 2020-06-18 00:38:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit0
 * @FilePath: /vue/src/views/dashboard/components/Stopwatch.vue
--> 
 <template>
  <!-- <div class="timer"> 
    <div ref="startTimer"></div>
   </div> -->
<span ref="startTimer"></span>
<!-- <span>{{startTimer}}</span> -->
</template>
<script>
export default {
  name: "Timer",
  props: ["count"],
  data() {
    return {
      timer: 0,
      content: "0",
      //count: "",
      hour: 0,
      minutes: 0,
      seconds: 0,
      // startTimer:''
    };
  },

  created() {
    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    var totlecount = Date.parse(new Date()) / 1000 - this.count/1000;
    this.timer = parseInt(totlecount) + setInterval(this.startTimer, 1000);
    this.seconds = Math.round(this.timer % 60);
    var totleminutes = parseInt(this.timer / 60);
    this.minutes = Math.round(totleminutes % 60);
    this.hour = parseInt(this.timer / 3600);
  },
  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    startTimer() {
      this.seconds += 1;
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }

      if (this.minutes == 60) {
        this.minutes = 0;
        this.hour = this.hour + 1;
      }
      
      this.$refs.startTimer.innerHTML =
        this.hour +
        ":" +
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds);
   
      //  this.startTimer =
      //   this.hour +
      //   ":" +
      //   (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
      //   ":" +
      //   (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    }
  }
};
</script>
    <style>
</style>
