const mysql = require('mysql')
const util = require('util')

const db = mysql.createConnection({
    user : 'root',
    password : '20121995',
    database : 'dailyroom',
    port : '3306'
})

const dbAsync = util.promisify(db.query).bind(db)

module.exports = dbAsync