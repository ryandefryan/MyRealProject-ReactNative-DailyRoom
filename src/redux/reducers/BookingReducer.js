import { BOOKING_LOADING, BOOKING_SUCCESS, BOOKING_ERROR } from '../ActionTypes.js';

const data = {
    loading: false,
    data: null,
    error: null
}

function bookingReducer (state = data, action){
    switch(action.type){
        case BOOKING_LOADING: 
            return {loading: true, data: null, error: null}
        case BOOKING_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case BOOKING_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default bookingReducer