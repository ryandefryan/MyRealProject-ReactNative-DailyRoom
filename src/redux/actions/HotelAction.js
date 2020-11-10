import Axios from 'axios';
import { UrlAPI } from './../../supports/constants/UrlAPI.js';
import { HOTELS_LOADING, HOTELS_SHOWDATA, HOTELS_ERROR } from './../ActionTypes.js';

export const getAllHotels = (cityName) => {
    return (dispatch) => {
        dispatch({
            type: HOTELS_LOADING 
        })

        console.log(cityName)
        Axios.get(UrlAPI + '/hotels/get-hotels/' + cityName)
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
            dispatch({
                type: HOTELS_ERROR,
                payload: err.message
            })
        })
    }
}