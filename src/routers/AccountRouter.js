import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyAccount from './../screens/Account/Account.js';
import MyDetailAccount from './../screens/DetailAccount/DetailAccount.js';

const Stack = createStackNavigator()

export default() => {
    return(
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='MyAccount' component={MyAccount} />
            <Stack.Screen name='MyDetailAccount' component={MyDetailAccount} />
        </Stack.Navigator>
    )
}