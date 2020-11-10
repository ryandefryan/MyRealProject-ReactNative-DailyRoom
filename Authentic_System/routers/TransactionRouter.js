const express = require('express');
const Router = express.Router();
const transactionController = require('./../controllers/TransactionController.js');

Router.post('/booking-hotel', transactionController.onBookingHotel)
Router.get('/get-my-bookings/:token', transactionController.getMyBookings)

module.exports = Router