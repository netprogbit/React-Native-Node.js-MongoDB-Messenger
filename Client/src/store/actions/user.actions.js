import {
    FETCH_USERS,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    SELECT_USER,       
} from './types';

export const fetchUsers = (userData) => {
    return { type: FETCH_USERS, userData: userData }
};

export const getUsers = () => {
    return { type: GET_USERS }
};

export const getUsersSuccess = (users) => {
    return { type: GET_USERS_SUCCESS, users: users }
};

export const getUsersError = () => {
    return { type: GET_USERS_FAILED }
};

export const selectUser = (user) => {
    return { type: SELECT_USER, user: user }
};
