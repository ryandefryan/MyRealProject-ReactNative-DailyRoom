const mysql = require('mysql')

// ############### BEFORE DEPLOY ###############
const db = mysql.createConnection({
    user : 'root',
    password : '20121995',
    database : 'dailyroom',
    port : '3306'
})

// ############### AFTER DEPLOY ###############
// const db = mysql.createConnection({
//     host : 'sql12.freemysqlhosting.net',
//     user : 'sql12369461',
//     password : '346V54Wkv2',
//     database : 'sql12369461',
//     port : '3306'
// })

module.exports = db