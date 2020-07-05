import { LOGIN_SUCCESS, RESTORE_SUCCESS, SIGN_OUT } from '../actions/types';

const initialState = {
    userId: null,
    token: null,    
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {                               
        case LOGIN_SUCCESS: {            
            return {
                ...state,
                userId: action.authData.userId,
                token: action.authData.token,                
            };
        }                 
        case RESTORE_SUCCESS: {            
            return {
                ...state,
                userId: action.authData.userId,
                token: action.authData.token,                
            };
        }             
        case SIGN_OUT: {
            return {
                ...state,
                userId: 0,
                token: '',                
            };
        }
        default: {
            return state;
        }
    }
};

export default authReducer;