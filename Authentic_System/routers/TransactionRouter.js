const express = require('express');
const Router = express.Router();
const transactionController = require('./../controllers/TransactionController.js');
const jwtVerify = require('./../middleware/jwt.js')

Router.post('/booking-hotel', transactionController.onBookingHotel)
Router.post('/payment-approved', jwtVerify, transactionController.onPaymentApproved)
Router.get('/get-my-bookings/:token', transactionController.getMyBookings)

module.exports = Router