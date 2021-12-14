<!--
 * @Author: your name
 * @Date: 2020-06-06 22:44:46
 * @LastEditTime: 2020-06-21 18:48:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/dashboard/components/Blockchain-monit.vue
--> 
<template>
  <div>
    <el-card>
      <el-row>
        <el-button v-on:click="gobegin">--</el-button>
        <el-button v-on:click="goback">-</el-button>
        <el-button v-on:click="getblockinfo(count[0])">{{count[0]}}</el-button>
        <el-button v-on:click="getblockinfo(count[1])">{{count[1]}}</el-button>
        <el-button v-on:click="getblockinfo(count[2])">{{count[2]}}</el-button>
        <el-button v-on:click="getblockinfo(count[3])">{{count[3]}}</el-button>
        <el-button v-on:click="getblockinfo(count[4])">{{count[4]}}</el-button>
        <el-button v-on:click="getblockinfo(count[5])">{{count[5]}}</el-button>
        <el-button v-on:click="getblockinfo(count[6])">{{count[6]}}</el-button>
        <el-button v-on:click="getblockinfo(count[7])">{{count[7]}}</el-button>
        <el-button v-on:click="getblockinfo(count[8])">{{count[8]}}</el-button>
        <el-button v-on:click="getblockinfo(count[9])">{{count[9]}}</el-button>
        <el-button v-on:click="goahend">+</el-button>
        <el-button v-on:click="goend">++</el-button>
      </el-row>
      <el-row>
        区块高度：{{blockchina.high}}
        <el-input type="textarea" rows="10" v-model="textarea" show-word-limit disabled=true></el-input>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { fetchBchight, fetchBcinfo } from "@/api/info";
// import BCinfo from "@/mock/blockchian.json";
export default {
  // props: "blockchina",
  data() {
    return {
      textarea: "",
      page: "",
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      blockchina: {
        high: "",
        blockinfo: {
          Currenthigh: "",
          Currenthash: "",
          Currentblock: ""
        }
      }
    };
  },
  created() {
    this.getbchight();
  },
  methods: {
    getbchight(){
      fetchBchight().then((res) => {
       this.blockchina.high = res.data.bchight 
      })
    },
    getblockinfo(sum) {
      //sumi=sum%10;
      fetchBcinfo(sum-1).then((res) => {
       let bcinfo = res.data
       this.textarea =
        "当前区块高度:" +
        bcinfo.height +
        "\n" +
        "previous_hash:" +
        bcinfo.previous_hash +
        "\n" +
        "块hash" +
        bcinfo.data_hash+
        "\n" +
        "区块信息:" +
        bcinfo.blockinfo; 
      })
      
    },
    gobegin: function() {
      this.page = 1;
      for (
        var i = 0;
        i < this.count.length || this.count[i] < this.blockchina.high;
        i++
      ) {
        this.count[i] = (this.page - 1) * 10 + i;
      }

      this.textarea = "已经到最开始了";
    },
    goback() {
      this.page = this.page - 1;
      for (var i = 0; i < this.count.length; i++) {
        this.count[i] = (this.page - 1) * 10 + i;
      }

      this.textarea = this.page;
    },
    goahend() {
      this.page++;
      for (var i = 0; i < this.count.length; i++) {
        this.count[i] = (this.page - 1) * 10 + i;
      }
      this.textarea = this.page;
    },
    goend() {
      this.page = Math.ceil(this.blockchina.high / 10);
      var length = this.blockchina.high % 10;
      for (var i = 0; i < length; i++) {
        this.count[i] = (this.page - 1) * 10 + i;
      }
      this.textarea = "已经到最后了";
    }
  }
};
</script>
