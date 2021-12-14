/*
 * @Author: Sam
 * @Date: 2020-04-30 14:29:12
 * @LastEditTime: 2020-06-13 16:01:04
 * @LastEditors: Please set LastEditors
 * @Description: mongoDB tools class
 * @FilePath: /server/utils/mongoDB.js
 */
var MongoClient=require('mongodb').MongoClient;
var MONGO_CFG=require('../setting').MONGO_CFG;

class MongoDb {
  static getInstance(){
    if (!MongoDb.instance) {
      MongoDb.instance=new MongoDb()
    } 
      return MongoDb.instance;    
  }
  constructor () {
    this.dbClient=''
    // this.connect()
  };
  connect () {
    let _that=this;
    if (!_that.dbClient) {
      return new Promise((resolve, reject) => {
        MongoClient.connect(MONGO_CFG.URL,{ useUnifiedTopology: true },(err,client) => {
          if (err) {
            reject(err)
          } else {            
            let db=client.db(MONGO_CFG.DBNAME)
            _that.dbClient=db
            console.log('connect OK!');
            resolve(_that.dbClient)
          }
        })
      });
    } else {
      console.log('connctted!');
      resolve(_that.dbClient) 
    }
  }
  // 查找
  find (table,json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(table).find(json,(err,data) => {
          if (err) {
            reject(err)
            return 
          } else {
            resolve(data.toArray())
          }
        })
      }).catch((err) => {
        reject(err)
        return
      });
    });
  }
  // 删除
  delete (table,json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(table).deleteOne(json,(err,res) => {
          if (err) {
            reject(err)
            return 
          } else {
            resolve(res)
          }
        })
      }).catch((err) => {
        reject(err)
        return
      });
    });
   }
  //增加数据
  insert (table,json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(table).insertOne(json,(err,res) => {
          if (err) {
            reject(err)
            return 
          } else {
            resolve(res)
          }
        })
      }).catch((err) => {
        reject(err)
        return
      });
    });
   }
  //增加多条数据
  insertMany (table,json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(table).insertMany(json,(err,res) => {
          if (err) {
            reject(err)
            return 
          } else {
            resolve(res)
          }
        })
      }).catch((err) => {
        reject(err)
        return
      });
    });
   }
  //修改数据
  update (table,json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(table).updateOne(json,(err,res) => {
          if (err) {
            reject(err)
            return 
          } else {
            resolve(res)
          }
        })
      }).catch((err) => {
        reject(err)
        return
      });
    });
   }
}
module.exports = MongoDb.getInstance()
// module.exports = MongoDb
