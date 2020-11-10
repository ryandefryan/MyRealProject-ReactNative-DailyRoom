import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_CHANGE_EMAIL, AUTH_CHANGE_PASSWORD, AUTH_ERROR, AUTH_LOADING } from './../ActionTypes.js';

let data = {
    token: '',
    error: '',
    loading: false,
    email: '',
    password: ''
}

const userReducer = (state = data, action) => {

    // Switch & Case Logikanya Sama Seperti :

    // if(action.type === 'ERROR'){
    //     return {error : action.payload, token : ''}
    // }else if(action.type === 'AUTH_SUCCESS'){
    //     return {token : action.payload,error : ''}
    // }
    // return data

    switch(action.type){
        case AUTH_ERROR:
            return {...state, token: '', error: action.payload, loading: false}
        case AUTH_SUCCESS:
            return {token: action.payload, error : '', loading: false}
        case AUTH_LOADING:
            return {...state, token: '', error: '', loading: true}
        case AUTH_LOGOUT:
            return {...data} // ...data 
        case AUTH_CHANGE_EMAIL: 
            return{...state, error: '', token: '', loading: false, email: action.payload}
        case AUTH_CHANGE_PASSWORD:
            return{...state, error: '', token: '', loading: false, password: action.payload}
        default: 
            return state
    }
}

export default userReducer