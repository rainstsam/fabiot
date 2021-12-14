<!--
 * @Author: your name
 * @Date: 2020-06-06 19:42:40
 * @LastEditTime: 2020-07-08 10:25:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/setting/components/gongshi.vue
--> 
<template>
  <el-card >
    <div slot="header" class="clearfix">
      <span>共识算法</span>
    </div>
    <div class="text item">
      <el-radio-group v-model="radio">
        <el-radio :label="1">DPOS</el-radio>
        <el-radio :label="2">PBFT</el-radio>
        <el-radio :label="3">RAFT(默认值)</el-radio>
        <el-radio :label="4">SOLO</el-radio>
      </el-radio-group>
    </div>

    <div class="text item">
      <el-button type="primary" class="float-right" v-on:click="gosubmit">提交</el-button>
    </div>
  </el-card>
</template>
<script>
import {connect} from '@/api/user'
export default {
  name: "help",
  data() {
    return {
      radio: null
    };
  },
  created() {
    var that = this;
    this.$http
      .get("/set/getgongshi")
      .then(response => {
        const gongshi = response.data.gongshi;
        if (gongshi == "DPOS") {
          that.radio = 1;
        } else if (this.$store.state.gongshi == "PBFT") {
          that.radio = 2;
        } else if (this.$store.state.gongshi == "RAFT(默认值)") {
          that.radio = 3;
        } else if (this.$store.state.gongshi == "SOLO") {
          that.radio = 4;
        }
      })
      .catch(function(error) {
        console.log("error");
      });
  },
  methods: {
    gosubmit(){
      let req={}
      req.name='admin'
      req.passwd='111111'
      
            connect(JSON.stringify(req) ).then(reqs => {
        if (reqs.code == 20000) {
          console.log("Its ok");
          this.test = reqs.data;
        } else {
          console.log("err");
        }
      });
    }

  },
  mounted() {}
};
</script>