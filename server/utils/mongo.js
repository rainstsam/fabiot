/*
 * @Author: your name
 * @Date: 2020-04-26 21:01:23
 * @LastEditTime: 2020-05-08 20:48:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/utils/mongo.js
 */
var mongoDB={};
var mongoClient=require("mongodb").MongoClient;
const SYS_CFG=require('../setting')

// var setting=require("./setting");
//连接数据库
let url = SYS_CFG.MONGO_CFG.URL
var connect=function(callback){
    mongoClient.connect(url,{ useUnifiedTopology: true },function(error,client){
        if(error) throw error;
        callback(client);
    });
}
//查找方法
mongoDB.findAll=function(tablename,data,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).find(data).toArray(function(err,res){
            if(err) throw err;
            callback(res);
            client.close();
        });
    });
}
//增加单条数据
mongoDB.insertOne=function(tablename,data,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).insertOne(data,function(err,res){
            if(err) throw err;
            callback(res.result);
            client.close();
        });
    });
}
//增加多条数据
mongoDB.insertMany=function(tablename,data,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).insertMany(data,function(err,res){
            if(err) throw err;
            callback(res.result);
            client.close();
        });
    });
}
//删除单条数据
mongoDB.deleteOne=function(tablename,data,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).deleteOne(data,function(err,res){
            if(err) throw err;
            callback(res);
            client.close();
        });
    });
}
//修改单条数据
mongoDB.updateOne=function(tablename,data,set,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).updateOne(data,set,function(err,res){
            if(err) throw err;
            callback(res);
            client.close();
        });
    });
}
//数据分页
mongoDB.paging=function(tablename,now,num,sort,callback){
    connect(function(client){
        var dbbase=client.db(setting.dbname);
        dbbase.collection(tablename).find().skip(now).limit(num).sort(sort).toArray(function(err,res){
            if(err) throw err;
            callback(res);
            client.close();
        });
    });
}
module.exports=mongoDB