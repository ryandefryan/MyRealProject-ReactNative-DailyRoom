import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './../screens/Home/Home.js';
import DatePicker from './../screens/DatePicker/DatePicker.js';
import HotelLists from './../screens/HotelLists/HotelLists.js';
import HotelDetail from './../screens/HotelDetail/HotelDetail.js';
import BookingRouter from './BookingRouter.js';
import Inbox from './../screens/Inbox/Inbox.js';

const Stack = createStackNavigator()

export default() => {
    return(
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='Homeee' component={Home} />
            <Stack.Screen name='DatePicker' component={DatePicker} />
            <Stack.Screen name='HotelLists' component={HotelLists} />
            <Stack.Screen name='HotelDetail' component={HotelDetail} />
            <Stack.Screen name='FormBooking' component={BookingRouter} />
            <Stack.Screen name='Inbox' component={Inbox} />
        </Stack.Navigator>
    )
}