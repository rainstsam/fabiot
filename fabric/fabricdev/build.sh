##/bin/bash/
# 生成msp配置
./bin/cryptogen generate --config crypto-config.yaml
#生成system-chain
./bin/configtxgen -profile SamOrdererGenesis -channelID orderer-channel -outputBlock artifacts/genesis.block
# 生成channel配置交易账本
./bin/configtxgen -profile SamChannel -outputCreateChannelTx artifacts/samchannel.tx -channelID samchannel
# 生成org1的msp服务的锚节点更新账本
# ./bin/configtxgen -profile SamChannel -outputAnchorPeersUpdate artifacts/WorkMSPanchors.tx -channelID samchannel -asOrg WorkMSP
# 启动网络后在cli中建立通道，加入通道
sudo docker-compose up -d
# 在cli里创建通道把每个节点加入通道 执行create.sh
# sudo docker exec -i  cli peer channel create -c samchannel -f artifacts/samchannel.tx --outputBlock  artifacts/samchannel.block  -o orderer.sam.com:7050
# 在cli里将各peer加入通道 jion.sh
# 安装链码
# 实例化链码