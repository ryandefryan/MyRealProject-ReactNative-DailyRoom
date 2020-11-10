import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './../screens/GetStarted/GetStarted.js';
import Login from '../screens/Login/Login.js';
import Register from '../screens/Register/Register.js';
import Splash from './../screens/Splash/Splash.js';

const Stack = createStackNavigator()
const AuthenticRouter = () => {
    return(
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='GetStarted' component={GetStarted} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

export default AuthenticRouter