import Axios from 'axios';
import { UrlAPI } from '../../supports/constants/UrlAPI.js';
import { BOOKING_LOADING, BOOKING_SUCCESS, BOOKING_ERROR } from '../ActionTypes.js';

export const onBookingRoom = (data) => {
    return async (dispatch) => {
        console.log('@BookingAction: ' + data)
        dispatch({
            type: BOOKING_LOADING 
        })

        try {
            let res = await Axios.post(UrlAPI + '/transactions/booking-room', data)
            dispatch({
                type: BOOKING_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: BOOKING_ERROR,
                payload: error.message
            })
        }
    }
}

export const getMyBookings = (token) => {
    return async (dispatch) => {
        dispatch({
            type: BOOKING_LOADING 
        })

        try {
            console.log('@BookingAction: ' + token)
            let res = await Axios.post(UrlAPI + '/transactions/get-my-bookings', {token})
            console.log(res.data)
            dispatch({
                type: BOOKING_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: BOOKING_ERROR,
                payload: error.message
            })
        }
    }
}