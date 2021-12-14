<!--
 * @Author: your name
 * @Date: 2020-06-06 22:44:46
 * @LastEditTime: 2020-07-22 08:46:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/dashboard/components/Equipment-monit.vue
--> 
<template>
  <el-col :span="4">
    <!-- {{eqpstation}} -->
    <div class="box-card">
      <!-- 无设备 -->
      <el-tag v-if="station=='0'" class="station0">
        <i class="el-icon-s-tools"></i>
        无设备
      </el-tag>
      <!-- 网关离线 -->
      <el-popover
        v-if="eqpstation=='1'"
        placement="right"
        title="标题"
        width="600"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span style=" 
                  float:left
                  font-size: 16px">uuid：</span>
            <span style=" 
                  float:right
                  font-size: 14px">{{eqp}}</span>
          </div>
        </el-card>
        <el-tag class="station1" slot="reference" @click="getEqpDetail">
          <i class="el-icon-s-tools"></i>
          网关离线
        </el-tag>
      </el-popover>
      <!-- 未注册网关接入 -->
      <el-popover
        v-if=" eqpstation=='2'"
        placement="right"
        :title="title"
        width="600"
        trigger="hover"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span style=" 
                  float:left
                  font-size: 16px">uuid：</span>
            <span
              style=" 
                  float:right
                  font-size: 14px"
            >{{eqp.uuid}}</span>
          </div>

          <div>
            <el-col :span="24">
              <div style="float:left">
                <table border="1">
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >网关名称：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.name}}</span>
                      <el-input v-model="input" label="设备名称"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >网关地址：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.ip}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >是否有接入许可：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.isReg}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >在线时长：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >
                        <timer v-if="eqp.onlinetime>1000" :count="eqp.onlinetime*1"></timer>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </el-col>
            <el-col :span="24">
              <div style="float:right">
                <el-button type="primary" @click="submitreg">登记网关</el-button>
              </div>
            </el-col>
          </div>
        </el-card>

        <el-tag class="station2" slot="reference" @click="getEqpDetail">
          <i class="el-icon-s-tools"></i>
          {{keyword1}}
        </el-tag>
      </el-popover>
      <!-- 注册网关上线 -->
      <el-popover
        v-if="eqpstation=='3'"
        placement="right"
        title="标题"
        width="600"
        trigger="hover"
        content="eqpinfo"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span style=" 
                  float:left
                  font-size: 18px">uuid：</span>
            <span
              style=" 
                  float:right
                  font-size: 16px"
            >{{eqp.uuid}}</span>
          </div>

          <div>
            <el-col :span="24">
              <div style="float:left">
                <table border="1" wight="100%">
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >网关名称：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >网关地址：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.ip}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >是否有接入许可：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >{{eqp.isReg}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >在线时长：</span>
                    </td>
                    <td>
                      <span
                        style=" 
                  float:left
                  font-size: 16px"
                      >
                        <timer :count="eqp.onlinetime"></timer>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </el-col>
            <el-col :span="24">
              <div style="float:left">
                <el-button type="primary" @click="submitcnt">允许设备接入</el-button>
              </div>
            </el-col>
          </div>
        </el-card>
        <el-tag class="station3" slot="reference" @click="getEqpDetail">
          <i class="el-icon-s-tools"></i>
          接入请求确认中
        </el-tag>
      </el-popover>
      <!-- 设备接入 -->
      <el-popover
        v-if="eqpstation=='4'"
        placement="right"
        title="标题"
        width="400"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <div>
          <el-col :span="24">
            <div style="float:left">
              <table border="1" wight="100%">
                <tr>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >网关名称：</span>
                  </td>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >{{eqp.name}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >网关地址：</span>
                  </td>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >{{eqp.ip}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >是否有接入许可：</span>
                  </td>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >{{eqp.isReg}}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >在线时长：</span>
                  </td>
                  <td>
                    <span style=" 
                  float:left
                  font-size: 16px">
                      <timer :count="eqp.onlinetime"></timer>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style=" 
                  float:left
                  font-size: 16px"
                    >设备连线时长：</span>
                  </td>
                  <td>
                    <span style=" 
                  float:left
                  font-size: 16px">
                      <timer :count="eqp.connecttime*1"></timer>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
        </div>
        <el-tag class="station4" slot="reference" @click="getEqpDetail">
          <i class="el-icon-s-tools"></i>设备在线---
          <timer :count="eqp.connecttime"></timer>
        </el-tag>
      </el-popover>
    </div>
  </el-col>
</template>
<script>
import timer from "./Stopwatch.vue";

import { fetchEqpDetai, seteqpreg, seteqpcnt } from "@/api/info";
export default {
  name: "equimentmonit",
  components: {
    timer: timer
  },
  props: ["eqpkey", "title"],
  data() {
    return {
      // station:' '1',
      listLoading: false,
      eqpstation: "",
      // keyword1: "",
      uuid: "",
      eqp: {
        ip: "",
        name: "",
        uuid: "",
        isReg: "",
        isOline: "",
        isCnt: "",
        voterule: "",
        whiterlist: "",
        regtime: "",
        onlinetime: "",
        connnecttime: "",
        errmsg: "",
        lasttime: "",
        onlinetime: ""
      },
      input: "",
      test: ""
    };
  },

  created() {
    this.getEqpDetail();
    // this.seteqpstation()
    this.timerrun();
  },
  methods: {
    timerrun() {
      return setTimeout(() => {
        this.getEqpDetail();
        // alert(this.keyword1)
        // this.seteqpstation()
      }, 3000);
    },
    getEqpDetail() {
      this.listLoading = true;
      if (this.eqpkey * 1 < this.$store.state.eqpinfo.gatewaylist.length) {
        this.uuid = this.$store.state.eqpinfo.gatewaylist[this.eqpkey];
        fetchEqpDetai(this.uuid)
          .then(response => {
            let reglist = response.data.reglist;
            let onlinegatewaylist = response.data.onlinegatewaylist;
            let connectlist = response.data.connectlist;
            let eqp = response.data.eqp;
            if (eqp !== null) {
              this.eqp.ip = eqp.ip;
              this.eqp.uuid = eqp.uuid;
              this.eqp.name = eqp.name;
              this.eqp.isReg = eqp.isReg;
              this.eqp.isOline = eqp.isOline;
              this.eqp.isCnt = eqp.isCnt;
              this.eqp.voterule = eqp.voterule;
              this.eqp.whitelist = eqp.whitelist;
              this.eqp.onlinetime = eqp.onlinetime;
              this.eqp.regtime = eqp.regtime;
              this.eqp.connecttime = eqp.connecttime;
              this.eqp.lasttime = eqp.lasttime;
              this.eqp.errmsg = eqp.errmsg;
              this.input = eqp.name;
              if (this.station == "0") {
                this.eqpstation = "0";
              } else {
                if (
                  onlinegatewaylist.length == 0 ||
                  !onlinegatewaylist.includes(this.uuid)
                ) {
                  this.eqpstation = "1";
                } else {
                  if (
                    connectlist.length !== 0 &&
                    connectlist.includes(eqp.uuid)
                  ) {
                    this.eqpstation = "4";
                  } else if (eqp.isReg == 'confim') {
                    this.eqpstation = "3";
                  } else {
                    this.eqpstation = "2";
                    // if (eqp.isReg == 'false') {
                    //   this.keyword1 = '新网关等待登记'
                    // } else if (eqp.isReg == 'true') {
                    //   this.keyword1 = '登记确认中'
                    // } else if (eqp.isReg == 'refuse') {
                    //   this.keyword1 = '登记信息错误'
                    // } else if (eqp.isReg == 'confim') {
                    //   this.keyword1 = '等待设备接入'
                    // }
                  }
                }
              }
              // else if (onlinegatewaylist.length!==0&&onlinegatewaylist.includes(eqp.uuid)){
              //   this.eqpstation='2'
              //   if (eqp.isReg='false') {
              //     this.keyword1='新网关等待登记'
              //   } else if(eqp.isReg='true'){
              //     this.keyword1='登记确认中'
              //   }else if(eqp.isReg='refuse'){
              //     this.keyword1='登记信息错误'
              //   }else if(eqp.isReg='confim'){
              //     this.keyword1='等待设备接入'
              //   }

              // }else if(this.station=='1'){
              //   this.eqpstation='1'
              // }else{
              //   this.eqpstation='0'
              // }
            }
            console.log(response.code);

            setTimeout(() => {
              this.listLoading = false;
            }, 1.5 * 1000);
          })
          .catch(err => {
            console.log("err:" + err);
          });
      }
    },
    // seteqpstation() {
    //   if (this.station == '0') {
    //    this.eqpstation = '0'
    //   } else {
    //     if (Date.now() - this.eqp.lasttime > 20000) {
    //      this.eqpstation = '1'
    //     } else {
    //       if (this.eqp.isReg == 'false'||this.eqp.isReg == 'true'||this.eqp.isReg == 'refuse'||this.eqp.isReg == 'black') {
    //        this.eqpstation = '2'
    //       } else {
    //         if (this.eqp.isReg == 'confim') {
    //          this.eqpstation = '3'
    //         } else if (this.eqp.isCnt == 'true'){
    //          this.eqpstation = '4'
    //         }
    //       }
    //     }
    //   }
    // },
    submitreg() {
      this.eqp.name = this.input;
      this.eqp.isReg = "true";
      this.eqp.errmsg = "同意" + this.eqp.name + "注册登记";
      this.eqp.lasttime = Date.now();
      let req = this.eqp;

      // let data = JSON.stringify(req)
      seteqpreg(req)
        .then(reqs => {
          alert("注册请求已成功发送,请等待");
        })
        .catch(err => {
          alert("错误,请重试");
        });
    },
    submitcnt() {
      this.eqp.name = this.input;
      this.eqp.isCnt = "true";
      this.eqp.errmsg = "同意" + this.eqp.name + "设备接入";
      this.eqp.lasttime = Date.now();
      let req = this.eqp;
      seteqpcnt(req)
        .then(reqs => {
          alert("接入许可已发出,请等待");
        })
        .catch(err => {
          alert("错误,请重试");
        });
    }
  },
  watch: {
    station() {
      this.timerrun();
    }
    // eqpstation() {
    //   this.timerrun()
    // },
    // keyword1() {
    //   this.timerrun()
    // }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  computed: {
    station: function() {
      if (
        this.$store.state.eqpinfo.gatewaylist.length == 0 ||
        this.$store.state.eqpinfo.gatewaylist.length < this.eqpkey + 1
      ) {
        return "0";
      } else {
        return "1";
      }
    },
    keyword1: function() {
      if (this.eqp.isReg == "false") {
        return "新网关等待登记"
      } else if (this.eqp.isReg == "true") {
        return "登记确认中"
      } else if (this.eqp.isReg == "refuse") {
        return "登记信息错误"
      } else if (this.eqp.isReg == "confim") {
        return "等待设备接入"
      }
    }
    // eqpstation: function() {
    //   if (this.station == '0') {
    //     return '0'
    //   } else {
    //     if (Date.now() - this.eqp.lasttime > 10000) {
    //       return '1'
    //     } else {
    //       if (this.eqp.isReg == 'false'||this.eqp.isReg == 'true'||this.eqp.isReg == 'refuse'||this.eqp.isReg == 'black') {
    //         return '2'
    //       } else {
    //         if (this.eqp.isReg == 'confim') {
    //           return '3'
    //         } else if (this.eqp.isCnt == 'true'){
    //           return '4'
    //         }
    //       }
    //     }
    //   }
    // },
  }
};
</script>
<style>
.box-card {
  width: 250px;
  max-width: 90%;
  margin: 1px auto;
}
.station0 {
  width: 180px;
  margin-top: 5px;
  background-color: #777777;
  color: #666666;
  font-size: 1rem;
  text-align: center;
  padding: 0px 0px;
  border-radius: 15px;
  display: inline-block;
}
.station1 {
  width: 180px;
  margin-top: 5px;
  background-color: #777777;
  color: #555555;
  font-size: 1rem;
  text-align: center;
  padding: 0px 0px;
  border-radius: 15px;
  display: inline-block;
}
.station2 {
  width: 180px;
  margin-top: 5px;
  background-color: #4093ef;
  color: #f53c3c;
  font-size: 1rem;
  text-align: center;
  padding: 0px 0px;
  border-radius: 15px;
  display: inline-block;
}
.station3 {
  width: 180px;
  margin-top: 5px;
  background-color: #4093ef;
  color: #e0e1e3;
  font-size: 1rem;
  text-align: center;
  padding: 0px 0px;
  border-radius: 15px;
  display: inline-block;
}
.station4 {
  width: 180px;
  margin-top: 5px;
  background-color: #67c23a;
  color: #303133;
  font-size: 0.5rem;
  text-align: center;
  padding: 0px 0px;
  border-radius: 15px;
  display: inline-block;
}
</style>
