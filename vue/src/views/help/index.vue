<!--
 * @Author: your name
 * @Date: 2020-06-06 19:33:09
 * @LastEditTime: 2020-07-08 00:16:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue/src/views/help/index.vue
--> 
<template>
    <el-col :span="24">
      <!-- 策略设置 -->
      <el-card class="box-card">
        <div slot="header">
          <span>
            <i class="el-icon-s-tools"></i>帮助
          </span>
        </div>
        <div class="box-item">
          <div class="grid-content bg-purple-dark">

    <h1>系统简介</h1>
<p>
      基于区块链的电力通信网泛在业务接入网关系统是根据国网江苏省科技项目“基于区块链的可信电力通信网络关键技术”的研究成果形成的演示验证系统。本系统基于区块链技术实现电力通信网络终端可信接入和认证功能，形成两个装置：基于区块链的电力通信网泛在业务接入网关系统和电力通信网区块链可信接入配置工具。系统主要针对电力通信网泛在接入特征进行终端分布式认证和边缘认证，可适应各通信站点物理位置分散、业务终端数量众多，各节点设备接入业务种类多的电力应用场景，可确保接入认证实时性和可靠性要求，能适配不同带宽的数据业务特征，包含间断通信与突发通信、实时业务与非实时业务、重负荷与轻负荷等不同情况的接入可靠性、安全性、及时性要求，可支撑自动化控制业务、生产调度业务、行政管理和信息化管理服务等多种业务类型。
</p>
<p>
  通过研制基于区块链的电力通信网泛在业务接入网关系统，实现各类电源、智能终端、各类用户等业务可实现随时随地、方便的泛在接入，无需依赖集中式的认证中心；同时，采用高效的接入机制，确保接入过程中各类物联网终端消耗的计算资源和存储空间最优。电力通信网络终端设备通过专用区块数据结构和智能合约，同区块链上各设备自主互动，协同认证，无需认证中心参与，实现终端节点接入认证的高度自治。
</p>

<h1>系统部署</h1>

<ul>
<li>将认证终端和服务器连入同一个交换机，配置好基础IP地址，做到设备间互联互通。</li>
<li>将业务系统通过认证终端的另一个网口相连。</li>
<li>加电启动设备，根据提示操作。</li>
</ul>

<h1>左侧菜单栏</h1>
<ul>
<li>首页：显示终端接入状态，区块链长度，区块信息等，可手动端口非法接入。</li>
<li>配置工具：可配置共识算法、智能合约、认证参数等信息</li>
<li>系统管理：可配置用户信息</li>
<li>帮助：显示帮助文档</li>
</ul>

          </div>
          <div class="grid-content bg-purple-dark">
            <votestrategy></votestrategy>
          </div>
        </div>
      </el-card>
    </el-col>
  
</template>
<script>

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
