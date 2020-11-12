var sendNotification = function(data, response) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YzZkYzcwOTctYzUyZi00ZTk3LWE0ZjctNTg0ZWZiZDcwOTRl"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {  
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));

            let dataToSend = JSON.parse(data)
            response.send({
                error : false,
                message : "Send Notification Transaction Success",
                data : dataToSend
            })
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};
  
module.exports = sendNotification;