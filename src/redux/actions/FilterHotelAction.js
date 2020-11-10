import { ON_SET_FILTER_CITYNAME, ON_SET_FILTER_DATE, ON_SET_NEWSTARTDATEFORMAT, ON_SET_NEWENDDATEFORMAT } from '../ActionTypes.js';

export const onSetFilterCityName = (cityName) => {
    return{
        type: ON_SET_FILTER_CITYNAME,
        payload: cityName
    }
}

export const onSetFilterDate = (startDate, endDate) => {
    console.log('@FilterHotelAction: ' + String(startDate))
    let dayStartDate = String(startDate).split(' ')[0]
    let dateStartDate = String(startDate).split(' ')[2]
    let monthStartDate = String(startDate).split(' ')[1]
    let yearStartDate = String(startDate).split(' ')[3]
    
    let newStartDate = dayStartDate + ' ' + dateStartDate + ' ' + monthStartDate + ' ' + yearStartDate

    console.log('@FilterHotelAction: ' + String(endDate))
    let dayEndDate = String(endDate).split(' ')[0]
    let dateEndDate = String(endDate).split(' ')[2]
    let monthEndDate = String(endDate).split(' ')[1]
    let yearEndDate = String(endDate).split(' ')[3]

    let newEndDate = dayEndDate + ' ' + dateEndDate + ' ' + monthEndDate + ' ' + yearEndDate

    return{
        type: ON_SET_FILTER_DATE,
        payload: {newStartDate, newEndDate}
    }
}

export const onSetNewStartDateFormat = (newStartDateFormat) => {
    return{
        type: ON_SET_NEWSTARTDATEFORMAT,
        payload: newStartDateFormat
    }
}

export const onSetNewEndDateFormat = (newEndDateFormat) => {
    return{
        type: ON_SET_NEWENDDATEFORMAT,
        payload: newEndDateFormat
    }
}