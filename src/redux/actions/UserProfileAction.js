import Axios from 'axios';
import { UrlAPI } from '../../supports/constants/UrlAPI.js';
import { USERPROFILE_LOADING, USERPROFILE_SHOWDATA, USERPROFILE_ERROR } from '../ActionTypes.js';

export const getMyProfile = (token) => {
    return (dispatch) => {
        dispatch({
            type: USERPROFILE_LOADING 
        })

        Axios.get(UrlAPI + '/authentic-system/user-profile/' + token)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type: USERPROFILE_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: USERPROFILE_SHOWDATA,
                    payload: res.data.data
                })
            }
        })
        .catch((err) => {
            console.log(err.message)
            dispatch({
                type: USERPROFILE_ERROR,
                payload: err.message
            })
        })
    }
}

export const updateMyProfile = (data, token) => {
    console.log('@UserProfileAction: ' + token)
    return (dispatch) => {
        dispatch({
            type: USERPROFILE_LOADING 
        })

        Axios.patch(UrlAPI + '/authentic-system/update-user-profile/' + token, data)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type: USERPROFILE_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: USERPROFILE_SHOWDATA,
                    payload: res.data.data
                })
            }
        })
        .catch((err) => {
            console.log(err.message)
            dispatch({
                type: USERPROFILE_ERROR,
                payload: err.message
            })
        })
    }
}