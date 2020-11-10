import Axios from 'axios';
import { UrlAPI } from '../../supports/constants/UrlAPI.js';
import { DETAIL_HOTEL_LOADING, DETAIL_HOTEL_SHOWDATA, DETAIL_HOTEL_ERROR } from '../ActionTypes.js';

export const getDetailHotel = (idHotel, startDate, endDate) => {
    return async (dispatch) => {
        dispatch({
            type: DETAIL_HOTEL_LOADING 
        })

        try {
            let res = await Axios.get(UrlAPI + '/hotels/hotel/' + idHotel + '/' + startDate + '/' + endDate)
            console.log(res.data)
            dispatch({
                type: DETAIL_HOTEL_SHOWDATA,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: DETAIL_HOTEL_ERROR,
                payload: error.message
            })
        }
    }
}