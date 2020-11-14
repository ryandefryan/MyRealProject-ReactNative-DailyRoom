import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OneSignal from 'react-native-onesignal';

import Icon from 'react-native-vector-icons/FontAwesome';
import HomeRouter from './HomeRouter.js';
import Bookings from './../screens/MyBookings/MyBookings.js';
import Account from './AccountRouter.js';

const Tab = createBottomTabNavigator()
const MainRouter = ({ user }) => {

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('3c2ef2b0-f8a3-4963-9bfc-995589f3dcd5', {
      kOSSettingsKeyAutoPrompt : false, 
      kOSSettingsKeyInAppLaunchURL: false, 
      kOSSettingsKeyInFocusDisplayOption:2
    });

    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    console.log('@MainRouter :' + user.token)

    OneSignal.setExternalUserId(user.token, (results) => {
        // The results will contain push and email success statuses
      console.log('Results of setting external user id');
      console.log(results);
      
      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
          console.log('Results of setting external user id push status:');
          console.log(results.push.success);
      }
      
      // Verify the email is set or check that the results have an email success status
      if (results.email && results.email.success) {
          console.log('Results of setting external user id email status:');
          console.log(results.email.success);
      }
    })

    return() => {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }
  }, [])

  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
  }

    return(
        <Tab.Navigator
            tabBarOptions={{size: 6, activeTintColor: '#2f5ff0', inactiveTintColor: 'grey', labelStyle: {
                marginBottom: 3
              }}}
        >
            <Tab.Screen name='Home'
                options={{tabBarIcon: (props) => {
                    return(
                        <Icon name='circle' size={props.size} color={props.color} />
                    )
                }}}
                component={HomeRouter} 
            />
            <Tab.Screen name='Bookings' 
                options={{tabBarIcon: (props) => {
                    return(
                        <Icon name='list' size={props.size} color={props.color} />
                    )
                }}}
                component={Bookings} 
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

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(MainRouter);