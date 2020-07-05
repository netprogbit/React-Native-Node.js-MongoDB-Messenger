import { GET_USERS_SUCCESS, SELECT_USER } from '../actions/types';

const initialState = {
    users: [],
    selectedUser: null,    
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {        
        case GET_USERS_SUCCESS: {
            return {
                ...state,
                users: action.users,                                
            };
        }        
        case SELECT_USER: {
            return {
                ...state,
                selectedUser: action.user,
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;