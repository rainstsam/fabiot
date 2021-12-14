<!--
 * @Author: your name
 * @Date: 2020-05-27 14:24:16
 * @LastEditTime: 2020-06-06 01:54:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/views/tree/index.vue
--> 
<template>
  <el-row>
    <el-col :span="24">
      <div class="fiter">
        <el-row>
          <el-col :span="12">
            <div style="width:98%">
              <Filtercontainer
                v-bind:attackmodedisc="attackmodedisc"
                v-bind:operatordisc="operatordisc"
                class="filter-item"
              ></Filtercontainer>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <Timefilter style="width:96%" class="filter-item"></Timefilter>
            </div>
          </el-col>
          <el-col :span="4">
            <div>
              <el-select
                placeholder="刷新频率"
                v-model="trefcycle"
                clearable
                style="width:100%"
                class="filter-item"
              >
                <el-option
                  v-for="item in trefcycledisc"
                  :key="item"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="float:right">
              <el-button v-waves type="primary" icon="el-icon-search" @click="getiplist">提交</el-button>
            </div>
          </el-col>
          <el-col :span="24">
            <div>
              <el-tag
                type="primary"
                v-for="item in rulelist"
                :key="item.attackmode+
                item.operator+item.keyword"
                closable
              >
                {{ item.attackmode+
                item.operator+item.keyword }}
              </el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="24">
      <div>
        <el-row>
          <el-col :span="24">
            <div style="float:right">
              <el-button
                class="filter-item"
                style="margin-left: 10px;"
                type="primary"
                icon="el-icon-edit"
                @click="test"
              >Add</el-button>
              <el-button
                v-waves
                :loading="downloadLoading"
                class="filter-item"
                type="primary"
                icon="el-icon-download"
                @click="handleDownload"
              >Export</el-button>
            </div>
          </el-col>
          <el-col :span="24">
            <div>
              <el-table
                :data="list"
                style="width: 100%"
                empty-text="暂无数据"
                v-loading="listLoading"
                fit
                highlight-current-row
              >
                <el-table-column type="expand"></el-table-column>
                <el-table-column label="ID" prop="attid">
                  
                </el-table-column>
                <el-table-column label="攻击时间" prop="atttime">
                  
                </el-table-column>
                <el-table-column label="攻击类型" prop="attstate" >                  
                  
                </el-table-column>
                <el-table-column label="攻击方法" prop="attmethod" >                  
                  
                </el-table-column>  
                <el-table-column label="攻击源IP" prop="attresip" >                  
                  
                </el-table-column> 
                <el-table-column label="攻击目的" prop="attarmip" >                  
                  
                </el-table-column>                                              
  
                  <!-- <el-table-column v-for="item in tabledisc" :label="item.label" :porp="item.key" :key="item.key">
                   
                  </el-table-column> -->

              </el-table>

            </div>
          </el-col>
          <el-col :span="24">
            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getiplist"
            />
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import waves from "@/directive/waves";
// import { fetchInit, fetchList } from "@/api/ipinfo";
import Filtercontainer from "./components/filter-container";
import Timefilter from "./components/time-filter";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Filtercontainer,
    Timefilter,
    Pagination
  },
  directives: { waves },
  created() {
    this.initPage();
    this.rulelist = this.$store.state.ipinfo.rulelist;
  },
  data() {
    return {
      rulelist: this.$store.state.ipinfo.rulelist,
      trefcycle: "",
      attackmodedisc: this.$store.state.ipinfo.attackmodedisc,
      operatordisc: null,
      tabledisc: null,
      trefcycledisc: null,
      discLoading: true,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: "+id"
      }
    };
  },

  methods: {
    async initPage() {
      // this.discLoading = true;
      await this.$store.dispatch("init");
      // fetchInit().then(response => {
      this.attackmodedisc = this.$store.state.ipinfo.attackmodedisc;
      this.operatordisc = this.$store.state.ipinfo.operatordisc;
      this.tabledisc = this.$store.state.ipinfo.tabledisc;
      this.trefcycledisc = this.$store.state.ipinfo.trefcycledisc;
      this.discLoading = this.$store.state.ipinfo.discLoading;
      this.getiplist()
      // console.log(this.rulelist);
      // })
    },
    getiplist() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
        // console.log(this.list);
        // console.log(typeof this.list);
      });
    },
    test() {
      alert(this.tabledisc[3].key);
      console.log("dido....");
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 1;
  }
}
.el-col {
  border-radius: 4px;  
  min-height: 36px;
}
</style>
