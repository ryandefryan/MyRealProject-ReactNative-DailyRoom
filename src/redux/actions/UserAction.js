import Axios from 'axios'
import { UrlAPI } from './../../supports/constants/UrlAPI.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_CHANGE_EMAIL, AUTH_CHANGE_PASSWORD, AUTH_ERROR, AUTH_LOADING } from './../ActionTypes.js';
const validator = require('validator');

export const onUserRegister = (email, password, confirmPassword) => {
    return (dispatch) => {
        try {
            dispatch(
                {
                    type : AUTH_LOADING
                }
            )

            if(!email || !password) throw new Error('Data Must Be Filled!')
            if(!(validator.isEmail(email))) throw new Error('Email Is Not Valid')
            if(password !== confirmPassword) throw new Error('Password Does Not Match!')

            Axios.post(UrlAPI + '/authentic-system/register', {email, password})
            .then((res) => {
                console.log(res)
                if(res.data.error){
                    dispatch(
                        {
                            type: AUTH_ERROR,
                            payload: res.data.message
                        }
                    )
                }else{
                    AsyncStorage.setItem('@token', res.data.token)
                    .then((respons) => {
                        dispatch(
                            {
                                type: AUTH_SUCCESS,
                                payload: res.data.token
                            }
                        )
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch(
                            {
                                type: AUTH_ERROR,
                                payload: err.message
                            }
                        )
                    })
                    
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch(
                    {
                        type: AUTH_ERROR,
                        payload: err.message
                    }
                )
            })
        } catch (error) {
            console.log(error)
            dispatch(
                {
                    type: AUTH_ERROR,
                    payload: error.message
                }
            )
        }
    }
}



export const onSaveToken = (token) => {
    return{
        type: AUTH_SUCCESS,
        payload: token
    }
}



export const onLogout = () => {
    return(dispatch) => {
        AsyncStorage.removeItem('@token')
        .then((res) => {
            dispatch(
                {
                    type: AUTH_LOGOUT
                }
            )
        })
        .catch((err) => {
            dispatch(
                {
                    type: AUTH_ERROR,
                    payload: err.message
                }
            )
        })
    }
}



export const onEmailChange = (text) => {
    return{
        type : AUTH_CHANGE_EMAIL,
        payload : text
    }
}



export const onPasswordChange = (text) => {
    return{
        type : AUTH_CHANGE_PASSWORD,
        payload : text
    }
}



export const onLogin = (email, password) => {
    return (dispatch) => {
        try {
            dispatch(
                {
                    type : AUTH_LOADING
                }
            )
            
            if(!email || !password) throw new Error('Data Must Be Filled!')
            
            Axios.post(UrlAPI + '/authentic-system/login', {email, password})
            .then((res) => {
                if(res.data.error){
                    dispatch(
                        {
                            type : AUTH_ERROR,
                            payload : res.data.message
                        }
                    )
                }else{
                    
                    AsyncStorage.setItem('@token', res.data.token)
                    .then((response) => {
                        dispatch(
                            {
                                type :AUTH_SUCCESS,
                                payload : res.data.token
                            }
                        )
                    })
                    .catch((err) => {
                        dispatch(
                            {
                                type : AUTH_ERROR,
                                payload : err.message
                            }
                        )
                    })
                    
                }
            })
            .catch((err) => {
                dispatch(
                    {
                        type : AUTH_ERROR,
                        payload : err.message
                    }
                )
            })
        } catch (error) {
            console.log(error)
            dispatch(
                {
                    type: AUTH_ERROR,
                    payload: error.message
                }
            )
        }
    }
}
