<!--
 * @Author: your name
 * @Date: 2020-06-06 19:41:56
 * @LastEditTime: 2020-06-10 18:37:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/setting/components/voterights.vue
--> 
<template>
  <el-card >
    <div slot="header" class="clearfix">
      <span>投票权重策略（优先级高的节点具有高选举权）</span>
    </div>
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="1">在线总时间（TT=SUM（Ti））</el-radio>
        <br />
        <br />
        <el-radio :label="2">本次在线时长（ST=Ti 默认值）</el-radio>
        <br />
        <br />
        <el-radio :label="3">平均在线率（RT=AVG（Ti））</el-radio>
      </el-radio-group>
    </div>

    <div class="text item">
      <el-button type="primary" class="float-right" v-on:click="gosubmit">提交</el-button>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "voterights",
  props: ["voterights"],
  data() {
    return {
      radio: null
    };
  },
  created() {
    var that = this;
    this.$http
      .get("/set/getvoterights")
      .then(response => {
        //  alert(JSON.stringify(response.data.votesrtategy))
        const voterights = response.data.voterights;
        if (voterights == "在线总时间（TT=SUM（Ti））") {
          this.radio = 1;
        } else if (voterights == "本次在线时长（ST=Ti 默认值）") {
          this.radio = 2;
        } else if (voterights == "平均在线率（RT=AVG（Ti））") {
          this.radio = 3;
        }
      })
      .catch(function(error) {
        console.log("error");
      });
  },
  methods: {
    gosubmit() {
      var voterights;
      if (this.radio == 1) {
        voterights = "在线总时间（TT=SUM（Ti））";
      } else if (this.radio == 2) {
        voterights = "本次在线时长（ST=Ti 默认值）";
      } else if (this.radio == 3) {
        voterights = "平均在线率（RT=AVG（Ti））";
      }
      // alert("3"+votesrtategy)
      this.$http
        .post("/set/setvoterights", {
          voterights: voterights
        })
        .then(function(response) {
          console.log(response);
          // alert("2"+ JSON.stringify(response))
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$alert("修改成功", "权重策略", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `所有网关已离线，将于半分钟后重新连接`
          });
        }
      });
    }
  },
  mounted() {}
};
</script>