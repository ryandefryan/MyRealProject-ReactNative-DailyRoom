const db = require('./../database/MySQL.js');
const dbAsync = require('./../database/MySQLAsync.js');
const redis = require('./../database/Redis.js');
const jwt = require('jsonwebtoken');

const sendNotification = require('./../helpers/SendNotification.js');

module.exports = {
    onBookingRoom : (req, res) => {
        let data = req.body
        const token = data.token
        
        jwt.verify(token, '123abc', (err, dataToken) => {
            try {
                if(err) throw err

                data = {
                    check_in: data.check_in,
                    check_out: data.check_out,
                    user_id: dataToken.id,
                    fullname_guest: data.fullname_guest,
                    email_guest: dataToken.email,
                    address_guest: data.address_guest,
                    room_id: data.room_id,
                    hotel_name: data.hotel_name,
                    room_name: data.room_name,
                    room_price: data.room_price,
                    total: data.total
                }
                
                sqlQuery1 = `INSERT INTO transactions SET ?`
                db.query(sqlQuery1, data, (err, insertResult) => {
                    try {
                        if(err) throw err

                        sqlQuery2 = `SELECT t.id, u.id AS user_id, h.name AS hotel_name, r.hotel_id, r.name AS room_name, r.price AS room_price, t.check_in AS check_in, t.check_out AS check_out, t.expired_at AS expired_at, t.status AS status, t.total AS total, GROUP_CONCAT(DISTINCT(ri.url)) AS room_image_url FROM transactions t
                                     JOIN rooms r ON t.room_id = r.id
                                     JOIN room_images ri ON t.room_id = ri.room_id
                                     JOIN hotels h ON r.hotel_id = h.id
                                     JOIN users u ON t.user_id = u.id
                                     WHERE u.id = ?
                                     GROUP BY t.id
                                     ORDER BY t.created_at DESC;`
                        
                        db.query(sqlQuery2, dataToken.id, (err, dataResult) => {
                            try {
                                if(err) throw err
                                
                                sqlQuery3 = `CREATE EVENT auto_cancel_transaction_${insertResult.insertId}
                                             ON SCHEDULE AT DATE_ADD(NOW(), INTERVAL 15 SECOND)
                                             DO
                                                UPDATE transactions set status = 'Cancelled' where id = ${insertResult.insertId};`
                                db.query(sqlQuery3, (err, createEventResult) => {
                                    try {
                                        res.send({
                                            error: false,
                                            message : 'Booking Success',
                                            data: dataResult
                                        })
                                    } catch (error) {
                                        res.json({
                                            error : true,
                                            message : error.message,
                                            detail : error
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
                    } catch (error) {
                        res.json({
                            error : true,
                            message : error.message,
                            detail : error
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
    },



    onPaymentApproved : (req, res) => {
        let data = req.body

        db.query('UPDATE transactions SET status = "Success" WHERE id = ? AND user_id = ?', [data.id, req.dataToken.id], (err, result) => {
            try {
                if(err) throw err

                db.query(`DROP event auto_cancel_transaction_${data.id}`, (err, result) => {
                    try {
                        if(err) throw err

                        let dataNotif = {
                            app_id: "3c2ef2b0-f8a3-4963-9bfc-995589f3dcd5",
                            contents: {"en": "Transaction Approved"},
                            channel_for_external_user_ids: "push",
                            include_external_user_ids: [data.token]
                        }

                        sendNotification(dataNotif, res)
                    } catch (error) {
                        console.log(error)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        })
    },
    
    
    
    getMyBookings : (req, res) => {
        db.query(`SELECT t.id, u.id as user_id, h.name as hotel_name, r.hotel_id, r.name as room_name, r.price as room_price, t.check_in as check_in, t.check_out as check_out, t.expired_at as expired_at, t.status as status, GROUP_CONCAT(DISTINCT(ri.url)) AS room_image_url FROM transactions t
                    JOIN rooms r ON t.room_id = r.id
                    JOIN room_images ri ON t.room_id = ri.room_id
                    JOIN hotels h ON r.hotel_id = h.id
                    JOIN users u ON t.user_id = u.id
                    WHERE u.id = ?
                    GROUP BY t.id
                    ORDER BY t.created_at DESC;`, req.dataToken.id, (err, result) => {
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
    },



    getMyBookingsWithRedis : (req, res) => {
        var start = Date.now()

        redis.get('allTransactions', (err, redisDataResult) => {
            try {
                if(err) throw err

                if(redisDataResult){
                    var end = Date.now()
                    var responTime = end - start

                    var redisDataResultParsed = JSON.parse(redisDataResult)
                    res.send({
                        error: false, 
                        responTime: responTime,
                        redisDataResultParsed
                    })
                }else{
                    db.query('SELECT * FROM transactions', (err, result) => {
                        try {
                            if(err) throw err

                            var end = Date.now()
                            var responTime = end - start

                            var dbDataResultString = JSON.stringify(result)
                            redis.set('allTransactions', dbDataResultString, (err, ok) => {
                                try {
                                    if(err) throw err

                                    res.send({
                                        error: false, 
                                        responTime: responTime,
                                        result
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
}