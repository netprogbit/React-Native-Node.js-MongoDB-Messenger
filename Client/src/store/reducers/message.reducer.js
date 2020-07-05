import { SEND_MESSAGE_SUCCESS, GET_MESSAGES_SUCCESS, ADD_MESSAGE } from '../actions/types';

const initialState = {
    messages: [],    
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {        
        case SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                messages: [...state.messages, action.message],                                
            };
        }                
        case GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                messages: action.messages,                                
            };
        }        
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.message],                               
            };
        }        
        default: {
            return state;
        }
    }
};

export default messageReducer;