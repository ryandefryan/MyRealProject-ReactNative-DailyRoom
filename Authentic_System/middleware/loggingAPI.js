const loggingAPI = (req, res, next) => {
    console.log(req.method + '||' + req.originalUrl + '||' + new Date())
    next()
}

module.exports = loggingAPI