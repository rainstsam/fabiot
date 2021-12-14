<!--
 * @Author: your name
 * @Date: 2020-06-06 19:44:19
 * @LastEditTime: 2020-06-10 18:37:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/setting/components/unit.vue
--> 
<template>
  <el-card >
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="primary">链码上传</el-button>
  <div slot="tip" class="el-upload__tip"></div>
</el-upload>
    <div class="text item">
      <el-button type="primary" class="float-right" v-on:click="gosubmit">提交</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [{
          name: 'chaincodev1.0.go',
          url: '127.0.0.1/132rewrqert/chaincodev1.0.go'
        }, {
          name: 'chaincodev1.1.go',
          url: '127.0.0.1/132rewrqert/chaincodev1.1.go'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
    gosubmit() {
        this.$alert('链码上传成功', '链码安装', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
            
          }
        });
      }
    }
  }
</script>