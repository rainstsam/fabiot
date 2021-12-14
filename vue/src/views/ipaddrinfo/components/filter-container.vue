<!--
 * @Author: your name
 * @Date: 2020-05-29 21:01:06
 * @LastEditTime: 2020-06-01 20:23:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-template/src/views/tree/components/filter-container.vue
--> 
<template>
  <el-popover placement="bottom-start" v-model="visible" width="800" trigger="focus" title="筛选条件">
    <div >
    <el-row>
      <el-col :span="6">
        <div>
          <el-select v-model="form.attackmode" placeholder="攻击方式">
                  <el-option
                  v-for="item in attackmodedisc"
                  :key="item"
                  :label="item.label"
                  :value="item.label"
                />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-select v-model="form.operator" placeholder="运算符">
                <el-option
                  v-for="item in operatordisc"
                  :key="item"
                  :label="item.label"
                  :value="item.key"
                />
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input v-model="form.keyword" placeholder="关键字"></el-input>
        </div>
      </el-col>
    </el-row>
        <div style="float:right">
          <el-button type="primary" @click="createrule">确 定</el-button>
        </div>
  </div>

    <el-input placeholder="点击添加筛选条件" slot="reference" class="filter-item">
      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
    </el-input>
  </el-popover>
</template>

<script>
export default {
  name: "filter-container",
  props:[  'attackmodedisc', 'operatordisc'],
  data() {
    return {
      form: {
        attackmode: "",
        operator: "",
        keyword: ""
      },
      visible: false,
      formLabelWidth: "120px"
    };
  },
   methods:{
     createrule(){
       let ruleobj={}
       ruleobj.attackmode=this.form.attackmode
       ruleobj.operator=this.form.operator
       ruleobj.keyword=this.form.keyword
       this.$store.commit('setrulelist', ruleobj)
      //  console.log(this.$store.state.ipinfo.rulelist);
       this.visible = false
     }
     
   }
};
</script>

<style>

</style>
<style scoped>
.filter-item{
   background: #000000;
}
</style>
