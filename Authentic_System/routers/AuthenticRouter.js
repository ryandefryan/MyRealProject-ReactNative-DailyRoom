const express = require('express')
const Router = express.Router()
const authenticController = require('./../controllers/AuthenticController.js')
const jwtVerify = require('./../middleware/jwt.js')

Router.post('/register', authenticController.register)
Router.patch('/confirmed-email-verification', authenticController.confirmedEmailVerification)
Router.post('/activation-email-verification', authenticController.activationEmailVerification)
Router.post('/login', authenticController.login)
Router.post('/user-verify-status', jwtVerify, authenticController.userVerifyStatus)
Router.post('/testmail', authenticController.testingSendEmailVerification)
Router.get('/user-profile/:token', authenticController.getUserProfile)
Router.patch('/update-user-profile/:token', authenticController.updateUserProfile)
Router.patch('/update-image-profile/:token', authenticController.updateImageProfile)

module.exports = Router