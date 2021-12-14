###
 # @Author: your name
 # @Date: 2020-04-24 01:24:53
 # @LastEditTime: 2020-05-18 15:15:13
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edi
 # @FilePath: /fabricdev/installcc.sh
### 
 # # $1 链码名 $2 版本  $3 语言 node
sudo  docker exec \
  -e CORE_PEER_ID=peer0.work.sam.com \
  -e CORE_PEER_ADDRESS=peer0.work.sam.com:7051 \
  -e CORE_PEER_LOCALMSPID=WorkMSP \
   cli peer chaincode install \
    -n $1 -v $2 -l $3 -p /opt/gopath/src/chaincode/$4