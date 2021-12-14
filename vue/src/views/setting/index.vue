<!--
 * @Author: your name
 * @Date: 2020-06-06 19:35:01
 * @LastEditTime: 2020-07-08 15:47:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /vue/src/views/setting/index.vue
--> 
<template>
  <el-row>
    <el-col :span="24">
      <!-- 系统设置 -->
      <el-card class="box-card">
        <div slot="header">
          <span>
            <i class="el-icon-s-tools"></i>系统设置
          </span>
        </div>
        <div class="box-item">
          <div class="grid-content bg-purple-dark">
            <unit></unit>
          </div>

        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <!-- 策略设置 -->
      <el-card class="box-card">
        <div slot="header">
          <span>
            <i class="el-icon-s-tools"></i>策略设置
          </span>
        </div>
        <div class="box-item">
          <div class="grid-content bg-purple-dark">
            <autoconnect></autoconnect>
          </div>
          <div class="grid-content bg-purple-dark">
            <votestrategy></votestrategy>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

import votestrategy from './components/votestrategy.vue'
import unit from './components/unit.vue'
import autoconnect from './components/autoconnect.vue'
export default {
  name: 'setting',
  components: {
    votestrategy: votestrategy,
    unit: unit,
    autoconnect: autoconnect
  },
  data() {
    return {
      title1: '配置共识算法',
      title2: '编辑智能合约'

    }
  }
}
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
