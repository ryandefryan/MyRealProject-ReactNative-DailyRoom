import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FormBooking from './../screens/FormBooking/FormBooking.js';
import PaymentMethod from '../screens/PaymentMethod/PaymentMethod.js';
import Payment from './../screens/Payment/Payment.js';

const Stack = createStackNavigator()

export default() => {
    return(
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='FormBooking' component={FormBooking} />
            <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
            <Stack.Screen name='Payment' component={Payment} />
        </Stack.Navigator>
    )
}