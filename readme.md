# 功能说明

## server侧功能

### 网关接入认证

### 网关状态监测

### 设备接入状态监测

### 区块链账本查看

## 网关侧功能

### 发送设备接入请求

# 项目目录说明
### ./vue 前端  
### ./server api网关
### ./fabric 区块链环境
#### chaincode 链码示例
本项目链码 emcs
#### fabricdev 本项目区块链环境维护脚本
```
bin （fabric 1.4.X 可执行文件 ，有兴趣可编译其他版本）
configtx.yaml  （创世区块配置文件，节点、组织 用户等基本信息可在此配置）
crypto-config.yaml   （msp配置 生成的秘钥是应用访问区块链的凭证，生产环境会有配套的秘钥分发和证书管理系统）
Dockerfile  链码初始运行环境的dockerfile 其实就是node配了淘宝仓库
docker-compose.yaml
doall.sh 一键启动 （注意：会覆盖安装）
remove.sh   环境清理
create.sh 初始化：创建网络和通道的创世区块
jion.sh  其他节点加入网络和通道
installcc.sh  链码安装 
iinstantiatecc.sh  链码实例化（生成链码运行环境docker镜像）
```
#### chaincode-docker-devmaode 
官方链码调试环境（base 2.0.0 进入目录 运行脚本 scipt.sh ）




