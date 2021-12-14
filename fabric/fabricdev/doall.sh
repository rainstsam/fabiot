#/bin/bash
sudo iptables -A INPUT -ptcp --dport  6079 -j ACCEPT
sudo iptables -A INPUT -ptcp --dport  3000 -j ACCEPT

./remove.sh
./build.sh
./create.sh
./jion.sh 0
./jion.sh 1
./jion.sh 2
./jion.sh 3
./installcc.sh emcs 1.0 node emcs 
# sudo docker ps -a   |grep dev-peer0.work.sam.com-emcs-1.0 
# until $? -ne 0 
# do
# sleep  2m
#     sudo docker ps -a   |grep dev-peer0.work.sam.com-emcs-1.0 
#     echo 'sleep'
# done

# sudo docker exec  peer0.work.sam.com  rm /var/hyperledger/production/chaincodes/emcs.1.0
# # sudo rm ./var/peer0/hyperledger/production/chaincodes/*
# ./installcc.sh emcs 1.0 node emcs 
./iinstantiatecc.sh emcs 1.0 '{"args":[]}'



