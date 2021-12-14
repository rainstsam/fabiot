<!--
 * @Author: your name
 * @Date: 2020-06-06 19:41:56
 * @LastEditTime: 2020-07-09 01:07:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/setting/components/votestrategy.vue
-->
 
<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>投票策略</span>
    </div>

    <div class="block">
      <el-row :gutter="20">
        <el-col :span="12" :offset="2">
          <div class="grid-content bg-purple">
            <el-slider
              v-model="value"
              :show-tooltip="false"
              show-stops
              :marks="marks"
              :max="7"
              :step="3"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="gosubmit">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { setgvoterule } from "@/api/sysinfo";
export default {
  name: "votestrategy",
  data() {
    return {
      value: null,
      marks: {
        0: "所有注册网关投票",
        3: "所有在线注册网关投票",
        6: "所有设备连线网关投票"
      }
    };
  },
  created() {
    getsysinfo().then(res => {
      if (res.data.gvoterule == "gsr01") {
        this.value = 0;
      } else if (res.data.gvoterule == "gsr02") {
        this.value = 3;
      } else {
        this.value = 6;
      }
    });
  },
  methods: {
    gosubmit() {
      let that = this;
      let gvoterule;
      if (that.value == 0) {
        gvoterule = "gsr01";
      } else if (that.value == 3) {
        gvoterule = "gsr02";
      } else {
        gvoterule = "gsr03";
      }
      setgvoterule(gvoterule)
        .then(reqs => {
          alert("设置成功");
        })
        .catch(() => {
          alert("参数错误");
        });
    }
  }
};
</script>