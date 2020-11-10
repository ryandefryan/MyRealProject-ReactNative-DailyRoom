function MonthFormat(month){
    let dataMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let stringMonth = String(month).split(' ')[2]
    
    let newMonthFormat = null
    for(var i = 0; i < dataMonth.length; i++){
        if(dataMonth[i] === stringMonth){
            if(i+1 < 10){
                newMonthFormat = '0' + String(i+1)
            }else{
                newMonthFormat = i+1
            }
        }
    }

    return Number(newMonthFormat)
}

export default MonthFormat