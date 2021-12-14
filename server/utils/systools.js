/*
 * @Author: your name
 * @Date: 2020-06-21 22:08:40
 * @LastEditTime: 2020-07-06 09:45:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /server/utils/systools.js
 */
const exec = require('child_process').exec;
releaseport = function (port) {
  let order = 'lsof -i :' + port;
  exec(order, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      return 
    } else {
      console.log(stdout);
      stdout.split('\n').filter((line) => {
        let p = line.trim().split(/\s+/);
        let pid = p[1]
        if (pid != undefined && pid != "PID") {
          exec('kill -9 ' + pid, (err, stdout, stderr) => {
            if (err) {
              console.log(stderr);
              return
            } else {
              console.log(stdout);
              return
            }
          })
        }
      })
    }
  })

}
module.exports = {
  releaseport
}
releaseport(3000)