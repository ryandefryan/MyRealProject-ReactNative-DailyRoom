import counterReducer from './CounterReducer.js';
import userReducer from './UserReducer.js';
import userProfileReducer from './UserProfileReducer.js';
import filterHotelReducer from './FilterHotelReducer.js';
import listsHotelReducer from './ListsHotelReducer.js';
import detailHotelReducer from './DetailHotelReducer.js';
import bookingReducer from './BookingReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
    {
        user: userReducer,
        userProfile: userProfileReducer,
        filterHotel: filterHotelReducer,
        counter: counterReducer,
        hotels: listsHotelReducer,
        detailHotel: detailHotelReducer,
        booking: bookingReducer
    }
)

export default rootReducer