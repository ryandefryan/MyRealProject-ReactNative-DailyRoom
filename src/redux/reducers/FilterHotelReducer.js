const { ON_SET_FILTER_CITYNAME, ON_SET_FILTER_DATE, ON_SET_NEWSTARTDATEFORMAT, ON_SET_NEWENDDATEFORMAT } = require('./../ActionTypes.js')

let today = new Date()
let tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)

let newStartDate = String(today).split(' ')[0] + ' ' + String(today).split(' ')[2] + ' ' + String(today).split(' ')[1] + ' ' + String(today).split(' ')[3]
let newEndDate = String(tomorrow).split(' ')[0] + ' ' + String(tomorrow).split(' ')[2] + ' ' + String(tomorrow).split(' ')[1] + ' ' + String(tomorrow).split(' ')[3]

const data = {
    cityName: null,
    startDate: newStartDate,
    endDate: newEndDate,
    night: '1 Night',
    newStartDateFormat: null,
    newEndDateFormat: null
}

function filterHotelReducer (state=data, action){
    switch(action.type){
        case ON_SET_FILTER_CITYNAME:
            return {...state, cityName: action.payload}
        case ON_SET_FILTER_DATE:
            let getStartDate = action.payload.newStartDate.split(' ')[1]
            let getEndDate = action.payload.newEndDate.split(' ')[1]

            return {...state, startDate: action.payload.newStartDate, endDate: action.payload.newEndDate, night: getEndDate - getStartDate + ' Night'}
        case ON_SET_NEWSTARTDATEFORMAT:
            return {...state, newStartDateFormat: action.payload}
        case ON_SET_NEWENDDATEFORMAT:
            return {...state, newEndDateFormat: action.payload}
        default:
            return state
    }
}

export default filterHotelReducer;