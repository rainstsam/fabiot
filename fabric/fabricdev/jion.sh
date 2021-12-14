sudo docker exec \
  -e CORE_PEER_ID=peer$1.work.sam.com \
  -e CORE_PEER_ADDRESS=peer$1.work.sam.com:7051 \
  -e CORE_PEER_LOCALMSPID=WorkMSP \
  cli peer channel join \
    -b /etc/hyperledger/fabric/artifacts/samchannel.block
