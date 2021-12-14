/*
 * @Author: your name
 * @Date: 2020-04-27 23:54:54
 * @LastEditTime: 2020-06-20 22:21:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /emcs/lib/emcs.js
 */ 
/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Emcs extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
            const eqplist=['nothing'] 
            const whitelist=['nothing']
            const blacklist=['nothing']            
            await ctx.stub.putState('eqplist', Buffer.from(JSON.stringify(eqplist)));          
            await ctx.stub.putState('whitelist', Buffer.from(JSON.stringify(whitelist)));
            await ctx.stub.putState('blacklist', Buffer.from(JSON.stringify(blacklist)));
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEqp(ctx, eqpuuid) {
        try {
            const eqpAsBytes = await ctx.stub.getState(eqpuuid);
            const eqp=eqpAsBytes.toString(); 
            return eqp  
        } catch (error) {
            throw new Error(`${eqpuuid} does not exist`);
        }

        // const eqplistAsBytes = await ctx.stub.getState('eqplist');
        // // const eqplist=JSON.parse(eqplistAsBytes.toString());
        // const eqplist=eqplistAsBytes.toString()
        // console.log(eqplist);
        // if (!eqplist.includes(eqpuuid) || eqplist.length === 0) {
        //     throw new Error(`${eqpuuid} does not exist`);
        // }
        // console.log(eqp);
        // return eqp;
    }
    async queryEqpList(ctx) {
        var eqplist
        try {
            var eqplistAsBytes = await ctx.stub.getState('eqplist'); 
            eqplist=JSON.parse(eqplistAsBytes.toString()) 
            console.log(eqplist);   
        } catch (error) {
            eqplist=[]
        }
    //    // get the eqplist from chaincode state
    //     let eqplist
    //     if (!eqplistAsBytes || eqplistAsBytes.length === 0) {
    //         // throw new Error('eqplist does not exist');
    //         eqplist=null
    //     }else{
            
    //     }
    //     console.log(eqplistAsBytes.toString());
        return eqplist;
    }
    async queryWhiteList(ctx) {
        const whitelistAsBytes = await ctx.stub.getState('whitelist'); // get the whitelist from chaincode state
        if (!whitelistAsBytes || whitelistAsBytes.length === 0) {
            throw new Error('whitelist does not exist');
        }
        console.log(whitelistAsBytes.toString());
        return whitelistAsBytes.toString();
    }
    async queryblacklist(ctx) {
        const blacklistAsBytes = await ctx.stub.getState('blacklist'); // get the blacklist from chaincode state
        if (!blacklistAsBytes || blacklistAsBytes.length === 0) {
            throw new Error('blacklist does not exist');
        }
        console.log(blacklistAsBytes.toString());
        return blacklistAsBytes.toString();
    }
    async creatEqp(ctx, eqpuuid, eqpreq) {
        console.info('============= START : Create eqp ===========');
        try {
            await ctx.stub.putState(eqpuuid, Buffer.from(JSON.stringify(eqpreq))); 
            
        } catch (error) {
            return error
        }
        var eqplist =[]
        try {
            const eqplistAsBytes = await ctx.stub.getState('eqplist'); 
            eqplist =JSON.parse(eqplistAsBytes.toString())
            if(!eqplist.includes(eqpuuid)){
                eqplist.push(eqpuuid)
                console.log(eqplist)   
            }             
        } catch (error) {
            eqplist = [eqpuuid] 
        }
        console.log(eqplist);
        await ctx.stub.putState('eqplist', Buffer.from(JSON.stringify(eqplist)));   

        console.info('============= END : Create eqp ===========');
    }
    async setblacklist(ctx, blacklist) {        
        const blacklistarr=JSON.parse(blacklist) 
        await ctx.stub.putState('blacklist', Buffer.from(JSON.stringify(blacklistarr)));
        console.info('============= END : set blacklist ===========');
    }
    async setwhitelist(ctx, whitelist) {
        const whitelistarr=JSON.parse(whitelist) 
        await ctx.stub.putState('whitelist', Buffer.from(JSON.stringify(whitelistarr)));
        
        console.info('============= END : set whiteklist ===========');
    }    

    async inReg(ctx, eqpuuid) {
        console.info('============= START : inReg ===========');

        const eqpAsBytes = await ctx.stub.getState(eqpuuid); // get the eqp from chaincode state
        if (!eqpAsBytes || eqpAsBytes.length === 0) {
            throw new Error(`${eqpuuid} does not exist`);
        }
        console.log(eqpAsBytes.toString());
        let eqp = JSON.parse(JSON.parse(eqpAsBytes.toString()));        
        console.log(typeof(eqp));
        
        // let req={}
        // req.name=eqp.name
        // req.ip=eqp.ip
        // req.server=eqp.server
        eqp.isReg = 'true';
        await ctx.stub.putState(eqpuuid, Buffer.from(JSON.stringify(eqp)));
        console.info('============= END : changeeqpRule ===========');
    }
    async unReg(ctx, eqpuuid) {
        console.info('============= START : inReg ===========');

        const eqpAsBytes = await ctx.stub.getState(eqpuuid); // get the eqp from chaincode state
        if (!eqpAsBytes || eqpAsBytes.length === 0) {
            throw new Error(`${eqpuuid} does not exist`);
        }
        const eqp = JSON.parse(eqpAsBytes.toString());
        eqp.isReg = 'false';

        await ctx.stub.putState(eqpuuid, Buffer.from(JSON.stringify(eqp)));
        console.info('============= END : changeeqpRule ===========');
    }
    async setEqpWhitelist(ctx, eqpuuid,list) {
        console.info('============= START : regEqpAgina ===========');

        const eqpAsBytes = await ctx.stub.getState(eqpuuid,); // get the eqp from chaincode state
        if (!eqpAsBytes || eqpAsBytes.length === 0) {
            throw new Error(`${eqpuuid} does not exist`);
        }
        const eqp = JSON.parse(eqpAsBytes.toString());        
        eqp.statusOfreg = list;
        await ctx.stub.putState(eqpuuid, Buffer.from(JSON.stringify(eqp)));
        
        console.info('============= END : regEqpAgina ===========');
    }
}

module.exports = Emcs;
