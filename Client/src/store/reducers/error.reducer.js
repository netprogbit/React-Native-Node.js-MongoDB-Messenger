import { SET_ERROR, RESET_ERROR } from '../actions/types';

const initialState = {
    error: null,    
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {                
        case SET_ERROR: {            
            return {
                ...state,
                error: action.error,                                
            };
        }
        case RESET_ERROR: {            
            return {
                ...state,
                error: null,                                
            };
        }              
        default: {
            return state;
        }
    }
};

export default errorReducer;