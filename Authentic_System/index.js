// Initialize All Packages
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const loggingAPI = require('./middleware/loggingAPI.js')
const authenticRouter = require('./routers/AuthenticRouter.js')
const hotelRouter = require('./routers/HotelRouter.js')
const transactionRouter = require('./routers/TransactionRouter.js')

// Initialize Body Parser 
app.use(express.json())
app.use('/supports', express.static('supports'))

// Initialize PORT
const PORT = 4000

// Root Route
app.get('/', (req, res) => {
    res.send('Authentic System "Ready"')
})
app.use(loggingAPI)
app.use('/authentic-system', authenticRouter)
app.use('/hotels/', hotelRouter)
app.use('/transactions/', transactionRouter)

app.listen(PORT, () => console.log('API RUNNING ON PORT ' + PORT))