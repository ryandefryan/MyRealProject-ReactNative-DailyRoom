import { HOTELS_LOADING, HOTELS_SHOWDATA, HOTELS_ERROR } from './../ActionTypes.js';

const data = {
    loading: false,
    data: null,
    error: null
}

function hotelReducer (state = data, action){
    switch(action.type){
        case HOTELS_LOADING: 
            return {loading: true, data: null, error: null}
        case HOTELS_SHOWDATA:
            return {loading: false, data: action.payload, error: null}
        case HOTELS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default hotelReducer