<!--
 * @Author: your name
 * @Date: 2020-06-05 18:55:33
 * @LastEditTime: 2020-07-07 21:23:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/dashboard/index.vue
--> 

<template>
  <el-row>
    <el-col :span="24">
      <!-- 设备状态 -->
      <el-card class="box-card">
        <div slot="header">
          <span>
            <i class="el-icon-s-tools"></i>设备列表
          </span>
        </div>
        <div class="box-item">
          <el-row type="flex" justify="space-around">
            <eqipmentmonit v-for="item in eqplist1" :eqpkey="item.key" :title="item.title"></eqipmentmonit>
          </el-row>
          <el-row type="flex" justify="space-around">
            <eqipmentmonit v-for="item in eqplist2" :eqpkey="item.key" :title="item.title"></eqipmentmonit>
          </el-row>
          <el-row type="flex" justify="space-around">
            <eqipmentmonit v-for="item in eqplist3" :eqpkey="item.key" :title="item.title"></eqipmentmonit>
          </el-row>
          <el-row type="flex" justify="space-around">
            <eqipmentmonit v-for="item in eqplist4" :eqpkey="item.key" :title="item.title"></eqipmentmonit>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <!-- 接入请求监听 -->
      
    </el-col>
    <el-col :span="24">
      <!-- 系统状态 -->
          <el-card class="box-card">
        <div slot="header">
          <span>
            <i class="el-icon-s-tools"></i>区块链账本
          </span>
        </div>
        <div class="box-item">
          <blockchainmonit></blockchainmonit>
          
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import eqipmentmonit from "./components/Equipment-monit.vue";
import blockchainmonit from "./components/Blockchain-monit.vue";
import { fetchList, fetchBcinfo } from "@/api/info";
import { fetchEqpDetai, seteqpreg, seteqpcnt } from "@/api/info";

export default {
  name: "Dashboard",
  components: {
    eqipmentmonit: eqipmentmonit,
    blockchainmonit: blockchainmonit
  },
  data() {
    return {
      eqplist1: [
        { key: 0, title: "设备一" },
        { key: 1, title: "设备二" },
        { key: 2, title: "设备三" },
        { key: 3, title: "设备四" },
        { key: 4, title: "设备五" }
      ],
      eqplist2: [
        { key: 5, title: "设备六" },
        { key: 6, title: "设备七" },
        { key: 7, title: "设备八" },
        { key: 8, title: "设备九" },
        { key: 9, title: "设备十" }
      ],
      eqplist3: [
        { key: 10, title: "设备十一" },
        { key: 11, title: "设备十二" },
        { key: 12, title: "设备十三" },
        { key: 13, title: "设备十四" },
        { key: 14, title: "设备十五" }
      ],
      eqplist4: [
        { key: 15, title: "设备十六" },
        { key: 16, title: "设备十七" },
        { key: 17, title: "设备十八" },
        { key: 18, title: "设备十九" },
        { key: 19, title: "设备二十" }
      ],
      websock: null,
      eqpdetaillist: [],
      listLoading: false
    };
  },
  computed: {},
  created() {
    this.initWebSocket();
    this.initlist();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },

  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://127.0.0.1:3000";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { header: { req: "browser" } };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    async websocketonmessage(e) {
      //数据接收
      const msg = JSON.parse(e.data);
      console.log(msg);
      var req = msg.header.req;
      if (req === "resVote") {
        this.resVote(msg);
        return;
      } else if (
        req === "reqReg" ||
        req === "isReg" ||
        req === "online" ||
        req === "reqCnt"
      ) {
        this.setmsg(msg);
        return;
      } else {
        console.log("undefined message!");
        return;
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    async setmsg(msg) {
      // this.$store.commit("updatamsglist", msg);
      let uuid = msg.header.From;
      console.log(this.$store.state.eqpinfo.gatewaylist);
      if (
        this.$store.state.eqpinfo.gatewaylist.length == 0 ||
        !this.$store.state.eqpinfo.gatewaylist.includes(uuid)
      ) {
        this.$store.commit("updatagatewaylist", uuid);
      } // console.log(this.$store.state);
      if (
        this.$store.state.eqpinfo.onlinegatewaylist.length == 0 ||
        !this.$store.state.eqpinfo.onlinegatewaylist.includes(uuid)
      ) {
        this.$store.commit("updataonlinegatewaylist", uuid);
      }
      // this.eqpdetaillist = [];

      // for (
      //   let item = 0;
      //   item < this.$store.state.eqpinfo.gatewaylist.length;
      //   item++
      // ) {
      //   fetchEqpDetai(this.$store.state.eqpinfo.gatewaylist[item])
      //     .then(response => {
      //       console.log("aaaa" + JSON.stringify(response));

      //       let eqp = response.data;
      //       if (eqp !== null) {
      //         this.eqpdetaillist.push(eqp);
      //       }
      //       console.log(response.code);

      //       setTimeout(() => {
      //         this.listLoading = false;
      //       }, 1.5 * 1000);
      //     })
      //     .catch(err => {
      //       console.log("err:" + err);
      //     });
      // }
    },
    async gethight() {
      let h = await getbchight();
      console.log(h);
    },
    async initlist() {
      this.listLoading = true;
      await this.$store.dispatch("init");
      this.listLoading = false;
    }
  }
};
</script>

<style scoped>
.field-label {
  vertical-align: middle;
}
.box-card {
  width: 90%;
  max-width: 100%;
  background-color: #92969c;
  margin: 10px auto;
}

.block {
  padding: 20px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>
