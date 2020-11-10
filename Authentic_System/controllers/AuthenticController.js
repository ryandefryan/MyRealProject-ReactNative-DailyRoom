const validator = require('validator');
const handlebars = require('handlebars')
const fs = require('fs');
const jwt = require('jsonwebtoken')
const db = require('./../database/MySQL.js');
const hashPassword = require('./../helpers/Hash.js');
const transporter = require('./../helpers/Transporter.js');
const activationCode = require('./../helpers/ActivationCode.js');

// ############### REGISTER WITH AUTHENTIC SYSTEM ###############
const register = (req, res) => {
    // Step1. Ambil Semua Data Value
    // Step2. Validasi Data Value
    // Step3. Hashing Password
    // Step4. Store Data Value To Database

    // Step1
    const data = req.body

    // Step2 ---> Long Validation
    // if(data.email && data.password){
    //     if(!(validator.isEmail(data.email))){
    //         res.status(406).send({
    //             error : true,
    //             message : '( ! ) Wrong Email Format'
    //         })
    //     }

    //     if(data.password.length < 8){
    //         res.status(406).send({
    //             error : true,
    //             message : '( ! ) Password Length Must More Than 8 Characters'
    //         })
    //     }

    //     res.send('Success')
    // }else{
    //     res.status(406).send({
    //         error : true,
    //         message : '( ! ) Data Must Be Filled'
    //     })
    // }

    // Step2 ---> Simple Validation
    try {
        if(!data.email || !data.password) throw { message : 'Data Must Be Filled' }
        if(!(validator.isEmail(data.email))) throw { message : 'Email Is Not Valid' }
        if(data.password.length < 8) throw { message : 'Password Have Minumum Length 8 Characters' }
        // Step3
        const passwordHashed = hashPassword(data.password)
        data.password = passwordHashed
        data.activation_code = activationCode()

        var sqlQuery = 'SELECT * FROM users WHERE email = ?'
        db.query(sqlQuery, data.email, (err, result) => {
            try {
                if(err) throw err

                if(result.length > 0){
                    throw { message : 'Email Already Exist' }
                }
                
                db.query('INSERT INTO users SET ?', data, (err, result) => {
                    try {
                        if(err) throw err
                        
                        db.query(sqlQuery, data.email, (err, result) => {
                            try {
                                if(err) throw err

                                fs.readFile('E:/Purwadhika Digital Technology School/ReactNative/DailyRoom/Authentic_System/template/EmailConfirmation.html', {encoding : 'utf-8'},(err, file) => {
                                    if(err) throw err
                                    const template = handlebars.compile(file)
                                    const templateResult = template({email : data.email, directLink : 'http://localhost:3000/activate-account/' + result[0].id + '/' + result[0].password})
                                    transporter.sendMail({
                                        from : 'Tetring', // Sender Address
                                        to : data.email, // Who Receive Email Confirmation
                                        subject : 'Email Confirmation', // Subject
                                        html : templateResult
                                    })
                                
                                    .then((respons) => {
                                        console.log(respons)
                                        jwt.sign({id : result[0].id, email : result[0].email, email_confirmed : result[0].email_confirmed}, '123abc', (err, token) => {
                                            try {
                                                if(err) throw err
                    
                                                res.json({
                                                    error : false,
                                                    message : 'Check Email To Activate Account',
                                                    token : token
                                                })
                                            } catch (error) {
                                                res.json({
                                                    error : true,
                                                    message : error.message
                                                })
                                            }
                                        })
                                    })
                                    .catch((err) => {
                                        res.json({
                                            error : true,
                                            message : err.message
                                        })
                                    })
                                })

                            } catch (error) {
                                res.json({
                                    error : true,
                                    message : error.message
                                })
                            }
                        })
                    } catch (error) {
                        res.json({
                            error : true,
                            message : error.message
                        })
                    }
                })
                
            } catch (error) {
                res.json({
                    error : true,
                    message : error.message
                })
            }
        })
    } catch (error) {
        res.json({
            error : true,
            message : error.message
        })
    }
}



// ############### CONFIRMED EMAIL VERIFICATION ###############
const confirmedEmailVerification = (req, res) => {
    const data = req.body
    
    var sqlQueryCheckAccount = `SELECT * FROM users WHERE id = ? AND password = ?`
    db.query(sqlQueryCheckAccount, [data.id, data.password], (err, result) => {
        try {
            if(err) throw err

            if(result.length > 0){
                var sqlQueryCheckAccountActived = `SELECT * FROM users WHERE id = ? AND password = ? AND email_confirmed = 0`  
                
                db.query(sqlQueryCheckAccountActived, [data.id, data.password], (err, result) => {
                    try {
                        if(result.length > 0){
                            var sqlQuery = `UPDATE users SET email_confirmed = 1 WHERE id = ? AND password = ?`

                            db.query(sqlQuery, [data.id, data.password], (err, result) => {
                                try {
                                    if(err) throw err

                                    res.json({
                                        error : false, 
                                        message : 'Account Active'
                                    })
                                } catch (error) {
                                    res.json({
                                        error : true, 
                                        message : error.message
                                    })
                                }
                            })
                        }else{
                            throw { message : 'Account Already Active' }
                        }
                    } catch (error) {
                        res.json({
                            error : true, 
                            message : error.message
                        })
                    }
                })
            }else{
                throw { message : 'Account Does Not Exist' }
            }
        } catch (error) {
            res.json({
                error : true,
                message : error.message
            })
        }
    })
}




// ############### ACTIVATION EMAIL VERIFICATION ###############
const activationEmailVerification = (req, res) => {
    const data = req.body
    
    try {
        if(!data.activation_code) throw { message : 'Data Must Be Filled'}

        var sqlQueryCheckAccount = `SELECT * FROM users WHERE id = ? AND password = ?`
        db.query(sqlQueryCheckAccount, [data.id, data.password], (err, result) => {
            try {
                if(err) throw err

                if(result.length > 0){
                    var sqlQueryCheckAccountActived = `SELECT * FROM users WHERE id = ? AND password = ? AND email_confirmed = 0`
                    
                    db.query(sqlQueryCheckAccountActived, [data.id, data.password], (err, result) => {
                        try {
                            if(err) throw err
                            
                            if(result.length > 0){
                                var sqlQueryCheckAccountActivationCode = `SELECT * FROM users WHERE id = ? AND password = ? AND email_confirmed = 0 AND activation_code = ?`
                            
                                db.query(sqlQueryCheckAccountActivationCode, [data.id, data.password, data.activation_code], (err, result) => {
                                    try {
                                        if(err) throw err

                                        if(result.length > 0){
                                            var sqlQuery = `UPDATE users SET email_confirmed = 1 WHERE id = ? AND password = ?`

                                            db.query(sqlQuery, [data.id, data.password], (err, result) => {
                                                try {
                                                    if(err) throw err

                                                    res.json({
                                                        error : false, 
                                                        message : 'Account Active'
                                                    })
                                                } catch (error) {
                                                    res.json({
                                                        error : true,
                                                        message : error.message
                                                    })
                                                }
                                            })
                                        }else{
                                            throw { message : ' Your Activation Code Does Not Match' }
                                        }
                                    } catch (error) {
                                        res.json({
                                            error : true,
                                            message : error.message
                                        })
                                    }
                                })
                            }else{
                                throw { message : 'Account Already Active' }
                            }
                        } catch (error) {
                            res.json({
                                error : true,
                                message : error.message
                            })
                        }
                    })
                }else{
                    throw { message : 'Account Does Not Exist' }
                }
            } catch (error) {
                res.json({
                    error : true,
                    message : error.message
                })
            }
        })
    } catch (error) {
        res.json({
            error : true,
            message : error.message
        })
    }
    // db.query('UPDATE users SET email_confirmed = 1 WHERE id = ? AND password = ?;', [data.id, data.password], (err, result) => {
    //     try {
    //         if(err) throw err
    //         res.status(201).send({
    //             error : false, 
    //             message : 'Email Verified'
    //         })
    //     } catch (error) {
    //         res.status(500).send({
    //             error : true, 
    //             message : error
    //         })
    //     }
    // })
}



// ############### LOGIN ###############
const login = (req, res) => {
    const data = req.body
    const emailUser = data.email
    
    try {
        if(!data.email || !data.password) throw { message : 'Data Must Be Filled' }
    } catch (error) {
        res.json({
            error : true,
            message : error.message
        })
    }

    try {
        const passwordHashed = hashPassword(data.password)
        data.password = passwordHashed

        var sqlQuery = `SELECT * FROM users WHERE email = ? AND password = ?`
        db.query(sqlQuery, [emailUser, passwordHashed], (err, result) => {
            try {
                if(result.length === 1){
                    jwt.sign({id : result[0].id, email : result[0].email, email_confirmed : result[0].email_confirmed}, '123abc', (err, token) => {
                        try {
                            if(err) throw err

                            res.json({
                                error : false,
                                message : 'Login Success',
                                token : token
                            })
                        } catch (error) {
                            res.json({
                                error : true,
                                message : error.message
                            })
                        }
                    })
                }else{
                    throw { message : 'Your Email / Password Does Not Match' }
                }
            } catch (error) {
                res.json({
                    error : true,
                    message : error.message
                })
            }
        })
    } catch (error) {
        res.json({
            error : true,
            message : 'Failed To Hash Password'
        })
    }
}



// ############### USER VERIFY STATUS ###############
const userVerifyStatus = (req, res) => {
    const data = req.dataToken
    
    sqlQuery = `SELECT * from users WHERE id = ?`
    db.query(sqlQuery, data.id, (err, result) => {
        try {
            if(err) throw err

            res.json({
                error : false,
                email_confirmed : result[0].email_confirmed
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message,
                detail : error
            })
        }   
    })
}



// ############### TEST TO SENDING EMAIL VERIFICATION ###############
const testingSendEmailVerification = (req, res) => {
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

    transporter.sendMail({
        from : 'Ryan Defryan in Here', // Sender Address
        to : 'ryan.fandy@gmail.com', // Who Receive Email Confirmation
        subject : 'Email Confirmation', // Subject
        html : '<b> Hi, Welcome With Us! </b>'
    })

    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}



// ############### GET USER PROFILE ###############
const getUserProfile = (req, res) => {
    console.log(req.params.token)
    const token = req.params.token

    jwt.verify(token, '123abc', (err, dataToken) => {
        try {
            if(err) throw err

            db.query(`SELECT * FROM users WHERE id = ?`, dataToken.id, (err, result) => {
                try {
                    if(err) throw err
                    
                    res.send({
                        error: false,
                        message : 'Fetch Data Success',
                        data : result
                    })
                } catch (error) {
                    res.send({
                        error: true,
                        message : error.message
                    })
                }
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message,
                detail : error
            })
        }
    })
}



// ############### UPDATE USER PROFILE ###############
const updateUserProfile = (req, res) => {
    let data = req.body
    const token = req.params.token

    jwt.verify(token, '123abc', (err, dataToken) => {
        try {
            if(err) throw err

            var sqlQuery = `UPDATE users SET fullname = ?, address = ?, phone = ? WHERE id = ?`

            db.query(sqlQuery, [data.fullname, data.address, data.phone, dataToken.id], (err, result) => {
                try {
                    if(err) throw err

                    db.query(`SELECT * FROM users WHERE id = ?`, dataToken.id, (err, result) => {
                        try {
                            if(err) throw err
                            
                            res.send({
                                error: false,
                                message : 'Update Data Success',
                                data : result
                            })
                        } catch (error) {
                            res.send({
                                error: true,
                                message : error.message
                            })
                        }
                    })
                } catch (error) {
                    res.json({
                        error : true, 
                        message : error.message
                    })
                }
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message,
                detail : error
            })
        }
    })
}

module.exports = {
    register : register, 
    confirmedEmailVerification : confirmedEmailVerification,
    activationEmailVerification : activationEmailVerification,
    login : login,
    userVerifyStatus : userVerifyStatus,
    testingSendEmailVerification : testingSendEmailVerification,
    getUserProfile : getUserProfile,
    updateUserProfile : updateUserProfile
}