/*
 * @Author: your name
 * @Date: 2020-04-27 17:05:58
 * @LastEditTime: 2020-07-05 22:04:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/utils/blockchian.js
 */
var Client = require('fabric-client');
var BC_CFG = require('../setting').BC_CFG;
var fs = require('fs');
// var client=new Client();
class BCUitls {
  // static getInstance(){
  //   if (!BCUitls.instance) {
  //     BCUitls.instance=new BCUitls()
  //   } 
  //     return BCUitls.instance;    
  // }
  constructor() {
    this.client = null
    this.user = null
    this.peer = null
    this.orderer = null
    this.channel = null
  }

  async init() {
    this.client = null
    this.user = null
    this.peer = null
    this.orderer = null
    this.channel = null
    this.client = new Client();
    this.privateKeyPEM = fs.readFileSync(BC_CFG.MSP_DIR + 'peerOrganizations/work.sam.com/users/Admin@work.sam.com/msp/keystore/priv_sk')
    this.certPem = fs.readFileSync(BC_CFG.MSP_DIR + 'peerOrganizations/work.sam.com/users/Admin@work.sam.com/msp/signcerts/Admin@work.sam.com-cert.pem')
    this.userOps = {
      username: BC_CFG.USER,
      mspid: BC_CFG.MSP_ID,
      cryptoContent: {
        privateKeyPEM: this.privateKeyPEM,
        signedCertPEM: this.certPem
      },
      skipPersistence: true
    }
    this.user = await this.client.createUser(this.userOps);
    this.peer = this.client.newPeer(BC_CFG.PEER0_URL)
    this.orderer = this.client.newOrderer(BC_CFG.ODERER_URL)
    await this.client.setUserContext(this.user, true);
    this.channel = this.client.newChannel(BC_CFG.CHAANNEL)
    this.channel.addPeer(this.peer)
    this.channel.addOrderer(this.orderer)
  }

  // set privateKeyPEM(keydir) {
  //   this.privateKeyPEM = fs.readFileSync(keydir)
  // }
  // set certPem(pemdir) {
  //   this.certPem = fs.readFileSync(pemdir)
  // }
  //   set user(userOps) {
  //   this.user =this.client.creatUser(userOps);
  // }
  // set channel(req) {
  //   this.client.setUserContext(this.user, true);
  //   this.channel = this.client.newChannel(req.channelid)
  //   this.channel.addPeer(this.client.newPeer(req.peerurl))
  //   this.channel.addOrderer(this.client.newOrderer(req.ordererurl))
  // }
  // set peer(peerurl) {
  //   this.peer = this.client.newPeer(peerurl);
  // }
  // get privateKeyPEM() {
  //   return this.privateKeyPEM;
  // }
  // get certPem() {

  //   return this.certPem
  // }
  // get userOps() {
  //   return this.userOps
  // }

  // set userOps(username, mspid, key, certPem) {
  //   this.userOps = {
  //     username: username,
  //     mspid: mspid,
  //     cryptoContent: {
  //       privateKeyPEM: key,
  //       signedCertPEM: certPem
  //     },
  //     skipPersistence: true
  //   }
  // }
  // get user() {
  //   return this.user;
  // }
  // get channel() {
  //   return this.channel;
  // }
  // get peer() {
  //   return this.peer;
  // }

  async queryCC(chaincodeId, fcn, args) {
    await this.init()
    let txId = this.client.newTransactionID(true)
    let req = {
      chaincodeId: chaincodeId,
      fcn: fcn,
      args: args,
      txId: txId
    }/*  */
    try {
      let data = await this.channel.queryByChaincode(req)
      this.clealres()
      return {
        code: '200',
        data: data
      }
    } catch (error) {
      this.clealres()
      return {
        code: '510',
        data: '区块链查询失败!'
      }
    }

    // let data = await this.channel.queryByChaincode(req, (err, res) => {
    //   if (err) {
    //     return {
    //       code: '510',
    //       data: '区块链查询失败!'
    //     }
    //   } else {
    //     console.log(res.toString());
    //     return {
    //       code: '200',
    //       data: res          
    //     }

    //   }
    // });
    // console.log(data.toString());
    // return data
  }
  clealres() {
    this.channel = null
    this.user = null
    this.peer = null
    this.client = null
  }
  async invokeCC(chaincodeId, fcn, args) {
    await this.init()
    let txId = this.client.newTransactionID(true)
    console.log(txId);
    let req = {
      chaincodeId: chaincodeId,
      fcn: fcn,
      args: args,
      txId: txId
    }
    try {
      var prsp = await this.channel.sendTransactionProposal(req)
    } catch (error) {
      return {
        code: '510',
        data: '背书失败!'
      }
    }
    try {
      await this.channel.sendTransaction({
        proposalResponses: prsp[0],
        proposal: prsp[1]
      })
      this.clealres()
      return {
        code: '200',
        data: {
          msg: '交易提交成功',
          txId: req.txId._transaction_id,
        }
      }
    } catch (error) {
      this.clealres()
      return {
        code: '510',
        data: '交易失败!'
      }
    }
    // return new Promise(async(resolve,reject) => {
    //     await this.channel.sendTransactionProposal(req, (err, prsp) => {
    //       console.log(prsp);
    //       if (err) {
    //         reject({
    //           code: '510',
    //           data: '背书失败!'
    //         })
    //         return
    //       } else {
    //         await this.channel.sendTransaction({
    //           proposalResponses: prsp[0],
    //           proposal: prsp[1]
    //         }, (err, res) => {
    //           if (err) {
    //             reject({
    //               code: '510',
    //               data: '交易提交失败!'
    //             })
    //             return
    //           } else {
    //             resolve({
    //               code: '200',
    //               data: {
    //                 req: req,
    //                 res: res,
    //                 restime: Date.now()
    //               }
    //             })

    //           }
    //         })
    //       }
    //     })       
    //   })
    //   .then((res) => {
    //     return res
    //   })
    //   .catch((err) => {
    //     return err
    //   });

    //获取peer背书
    // if (prsp.code == '510') {
    //   return prsp
    // } else {
    //   let prp = await this.channel.sendTransaction({ //提交交易
    //     proposalResponses: prsp[0],
    //     proposal: prsp[1]
    //   }, (err) => {
    //     if (err) {
    //       return {
    //         code: '510',
    //         data: '背书失败!'
    //       }
    //     } else {
    //       return {
    //         code: '200',
    //         data: {
    //           msg: '交易提交成功',
    //           txId: req.txId
    //         }
    //       }
    //     }
    //   })
    //   return prp

  }
  async queryBCHeight() {
    await this.init()
    let res = null
    try {
      res = await this.channel.queryInfo(this.peer)
    } catch (error) {
      res = null
    }
    this.clealres()
    return res
  }
  async queryblockinfo(height) {
    await this.init()
    try {
      let res = await this.channel.queryBlock(height, this.peer)
      let block = {}
      block.height = res.header.number
      block.previous_hash = res.header.previous_hash
      block.data_hash = res.header.data_hash
      block.blockinfo = JSON.stringify(res)
      block.data = JSON.stringify(res.data.data)
      block.metadata = JSON.stringify(res.metadata.metadata)
      this.clealres()
      return {
        code: '200',
        data: block
      }
    } catch (err) {
      this.clealres()
      return {
        code: '510',
        data: err
      }
    }

  }
}

module.exports = BCUitls
// module.exports = BCUitls.getInstance()