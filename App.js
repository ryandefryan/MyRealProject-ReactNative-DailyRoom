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

  const homeConfig = {
    path : "Home",
    screens : {
      Home : 'Home',
      Inbox : {
        path: 'Inbox/:id',
        params: {
          id: null
        }
      }
    }
  }

  const linkingOptions = {
    prefixes : ['https://dailyroomApp.com','dailyroomApp://'],
    config : {
        Home: homeConfig,
        Bookings: 'Bookings',
        Account : "Account"  
    }
  }

  if(isStorageChecked === false){
    return(
      <SplashScreen />
    )
  }
  
  return(
    <NavigationContainer linking={linkingOptions}>
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