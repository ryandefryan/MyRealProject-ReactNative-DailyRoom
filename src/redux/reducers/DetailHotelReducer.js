import { DETAIL_HOTEL_LOADING, DETAIL_HOTEL_SHOWDATA, DETAIL_HOTEL_ERROR } from '../ActionTypes.js';

const data = {
    loading: false,
    data: null,
    error: null
}

function detailHotelReducer (state = data, action){
    switch(action.type){
        case DETAIL_HOTEL_LOADING: 
            return {loading: true, data: null, error: null}
        case DETAIL_HOTEL_SHOWDATA:
            return {loading: false, data: action.payload, error: null}
        case DETAIL_HOTEL_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default detailHotelReducer