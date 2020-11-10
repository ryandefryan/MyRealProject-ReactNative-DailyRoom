function activationCode(){
    var activationCodeNumber = ''

    for(var i = 0; i < 5; i++){
        activationCodeNumber += Math.floor(Math.random() * 10)
    }

    return activationCodeNumber
}

module.exports = activationCode