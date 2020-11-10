import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeRouter from './HomeRouter.js';
import MyBookings from './../screens/MyBookings/MyBookings.js';
import Account from './AccountRouter.js';

const Tab = createBottomTabNavigator()
const MainRouter = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{size: 6, activeTintColor: '#2f5ff0', inactiveTintColor: 'grey', labelStyle: {
                marginBottom: 3
              }}}
        >
            {/* <Tab.Screen name='Splash' component={Splash} /> */}
            <Tab.Screen name='Home'
                options={{tabBarIcon: (props) => {
                    return(
                        <Icon name='circle' size={props.size} color={props.color} />
                    )
                }}}
                component={HomeRouter} 
            />
            <Tab.Screen name='My Bookings' 
                options={{tabBarIcon: (props) => {
                    return(
                        <Icon name='list' size={props.size} color={props.color} />
                    )
                }}}
                component={MyBookings} 
            />
            <Tab.Screen name='Account' 
                options={{tabBarIcon: (props) => {
                    return(
                        <Icon name='user-circle' size={props.size} color={props.color} />
                    )
                }}}
                component={Account} 
            />
        </Tab.Navigator>
    )
}

export default MainRouter