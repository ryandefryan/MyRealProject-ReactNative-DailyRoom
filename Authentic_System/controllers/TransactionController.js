const db = require('./../database/MySQL.js');
const dbAsync = require('./../database/MySQLAsync.js');
const jwt = require('jsonwebtoken');

const sendNotification = require('./../helpers/SendNotification.js');

module.exports = {
    onBookingHotel : (req, res) => {
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
                    room_price: data.room_price
                }
                
                sqlQuery1 = `INSERT INTO transactions SET ?`
                db.query(sqlQuery1, data, (err, insertResult) => {
                    try {
                        if(err) throw err

                        sqlQuery2 = `SELECT t.id, u.id as user_id, h.name as hotel_name, r.hotel_id, r.name as room_name, r.price as room_price, t.check_in as check_in, t.check_out as check_out, t.expired_at as expired_at, t.status as status, GROUP_CONCAT(DISTINCT(ri.url)) AS room_image_url FROM transactions t
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
                                             ON SCHEDULE AT DATE_ADD(NOW(), INTERVAL 30 MINUTE)
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
        console.log(req.params.token)
        const token = req.params.token

        jwt.verify(token, '123abc', (err, dataToken) => {
            try {
                if(err) throw err

                db.query(`SELECT t.id, u.id as user_id, h.name as hotel_name, r.hotel_id, r.name as room_name, r.price as room_price, t.check_in as check_in, t.check_out as check_out, t.expired_at as expired_at, t.status as status, GROUP_CONCAT(DISTINCT(ri.url)) AS room_image_url FROM transactions t
                          JOIN rooms r ON t.room_id = r.id
                          JOIN room_images ri ON t.room_id = ri.room_id
                          JOIN hotels h ON r.hotel_id = h.id
                          JOIN users u ON t.user_id = u.id
                          WHERE u.id = ?
                          GROUP BY t.id
                          ORDER BY t.created_at DESC;`, dataToken.id, (err, result) => {
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
}