const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        service : 'gmail',
        auth : {
            user : 'ryan.fandy@gmail.com',
            pass : 'xhndttlldiewqclc'
        },
        tls : {
            rejectUnauthorized : false
        }
    }
)

module.exports = transporter