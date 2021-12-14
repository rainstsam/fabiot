###
# @Author: shimin
# @Date: 2020-04-24 03:12:22
 # @LastEditTime: 2020-04-29 22:43:19
 # @LastEditors: Please set LastEditors
# @Description: 链码实例化
# @FilePath: /fabricdev/iinstantiatecc.sh
###

sudo docker exec  \
-e CORE_PEER_ID=peer0.work.sam.com \
-e CORE_PEER_ADDRESS=peer0.work.sam.com:7051 \
-e CORE_PEER_LOCALMSPID=WorkMSP \
cli peer chaincode instantiate \
-o orderer.work.sam.com:7050 -C samchannel -n $1 -v $2 -c $3