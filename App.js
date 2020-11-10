import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal'

import SplashScreen from './src/screens/Splash/Splash.js';
import AuthenticRouter from './src/routers/AuthenticRouter';
import MainRouter from './src/routers/MainRouter';
import { onSaveToken } from './src/redux/actions/UserAction.js';

const App = ({user, onSaveToken}) => {
  const [isStorageChecked, setIsStorageChecked] = useState(false)

  useEffect(() => {
    const getStorageData = () => {
      AsyncStorage.getItem('@token')
      .then((data) => {
        console.log(data)
        if(data){
          onSaveToken(data)
        }
        setIsStorageChecked(true)
      })
      .catch((err) => {
        console.log(err)
        setIsStorageChecked(true)
      })
    }

    getStorageData()
  }, [])

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('3c2ef2b0-f8a3-4963-9bfc-995589f3dcd5', {
      kOSSettingsKeyAutoPrompt : false, 
      kOSSettingsKeyInAppLaunchURL: false, 
      kOSSettingsKeyInFocusDisplayOption:2
    });

    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

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


  if(isStorageChecked === false){
    return(
      <SplashScreen />
    )
  }
  return(
    <NavigationContainer>
      {
        user.token !== '' ?
          <MainRouter />
        :
          <AuthenticRouter />
      }
    </NavigationContainer>
  )
}

const mapDispatchToProps = {
  onSaveToken
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);