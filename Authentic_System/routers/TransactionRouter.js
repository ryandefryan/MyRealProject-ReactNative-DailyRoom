const express = require('express');
const Router = express.Router();
const transactionController = require('./../controllers/TransactionController.js');
const jwtVerify = require('./../middleware/jwt.js')

Router.post('/booking-room', transactionController.onBookingRoom)
Router.post('/payment-approved', jwtVerify, transactionController.onPaymentApproved)
Router.post('/get-my-bookings', jwtVerify, transactionController.getMyBookings)
Router.get('/get-my-bookings-with-redis', transactionController.getMyBookingsWithRedis)

module.exports = Router