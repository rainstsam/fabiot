<!--
 * @Author: your name
 * @Date: 2020-07-08 10:24:55
 * @LastEditTime: 2020-07-09 00:01:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /vue/src/views/setting/components/autoconnect.vue
--> 
<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>自动连接模式设置</span>
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
import { setautocnt, getsysinfo } from "@/api/sysinfo";
export default {
  name: "autoconnect",
  data() {
    return {
      value: null,
      marks: {
        0: "手动授权",
        3: "网关协同",
        6: "自动连接"
      }
    };
  },
  created() {
    getsysinfo().then(res => {
      if (res.data.autoconnect == "ac01") {
        this.value = 0;
      } else if (res.data.autoconnect == "ac02") {
        this.value = 3;
      } else {
        this.value = 6;
      }
    });
    // alert(this.$store.state.sysinfo.autoconnect)
  },
  methods: {
    gosubmit() {
      let that = this;
      let autoconnect;
      if (that.value == 0) {
        autoconnect = "ac01";
      } else if (that.value == 3) {
        autoconnect = "ac02";
      } else autoconnect = "ac03";
      setautocnt(autoconnect)
        .then(reqs => {
          alert("设置成功");
        })
        .catch(() => {
          alert("参数错误");
        });
    }
  },
  mounted() {}
};
</script>