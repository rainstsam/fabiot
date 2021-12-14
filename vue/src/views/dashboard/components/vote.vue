<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>设备名称:{{equipmentname}}</span>
      <br />
      <br />
      <span>设备状态：</span>
      <el-button
        style="float: right"
        v-bind:type="setstatus"
        v-bind:disabled="settstatus2"
        v-on:click="setsubstatus(equipmentid)"
        circle="ture"
      ></el-button>
    </div>
    <el-row type="flex" class="row-bg">
      <el-col :span="8">
        <div class="text item">持续在线时间:</div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <timer v-if="equipmentstatus=='on'" v-bind:count="timercount"></timer>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="8">
        <div class="text item">接入请求 :</div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <div class="text item">{{accessRequest }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="8">
        <div class="text item">我的决定 :</div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <div class="text item">{{accessVoet }}</div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <div class="text item">接入策略 :</div>
      </el-col>

      <el-col :span="6">
        <div class="text item">{{accessResult }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import timer from "./Stopwatch.vue";
import mqtt from "mqtt";
export default {
  props: [
    "equipmentname",
    "equipmentstatus",
    "equipmentid",
    "count",
    "accessResult",
    "accessVoet",
    "accessRequest",
    "online"
  ],
  methods: {
    setsubstatus: function(sum) {
      const options = {
        clientId:
          "mqttjs_" +
          Math.random()
            .toString(16)
            .substr(2, 8),
        username: "admin",
        password: "111111"
      };
      var topic = "setStaut" + sum;
      var msg;
      if (this.equipmentstatus == "on") {
        msg = "off";
        //this.equipmentstatus = "false";
      } else {
        msg = "on";
        //this.equipmentstatus = "true";
      }
      var client = mqtt.connect("ws://127.0.0.1:8083/mqtt", options, 0);
      client.publish(topic, msg);
      //(topic+msg);
      client.on();
    }
  },
  computed: {
    timercount: function String() {
      return this.count;
    },
    settstatus2: function Boolean() {
      if (this.online == "no") {
        return true;
      } else if (this.online == "yes") {
        return false;
      }
    },
    setstatus: function String() {
      if (this.equipmentstatus == "on") {
        return "primary";
      } else if (this.equipmentstatus == "off") {
        return "danger";
      }
    }
  },
  components: {
    timer: timer
  }
};
</script>
<style>
.text {
  font-size: 12px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
