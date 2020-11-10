const express = require('express');
const Router = express.Router();
const hotelController = require('./../controllers/HotelController.js');

Router.get('/get-hotels/:cityName/:startDate/:endDate', hotelController.getAllHotels)
Router.get('/hotel/:idHotel/:startDate/:endDate', hotelController.getDetailHotel)

module.exports = Router