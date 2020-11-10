import Axios from 'axios';
import { UrlAPI } from '../../supports/constants/UrlAPI.js';
import { HOTELS_LOADING, HOTELS_SHOWDATA, HOTELS_ERROR } from '../ActionTypes.js';

export const getAllHotels = (cityName, newStartDateFormat, newEndDateFormat) => {
    console.log('@ListsHotelAction: ' + cityName)
    console.log('@ListsHotelAction: ' + newStartDateFormat)
    console.log('@ListsHotelAction: ' + newEndDateFormat)

    return (dispatch) => {
        dispatch({
            type: HOTELS_LOADING 
        })

        Axios.get(UrlAPI + '/hotels/get-hotels/' + cityName + '/' + newStartDateFormat + '/' + newEndDateFormat)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type: HOTELS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: HOTELS_SHOWDATA,
                    payload: res.data.data
                })
            }
        })
        .catch((err) => {
            console.log(err.message)
            dispatch({
                type: HOTELS_ERROR,
                payload: err.message
            })
        })
    }
}