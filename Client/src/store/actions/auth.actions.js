import {
    FETCH_REGISTER,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    FETCH_LOGIN,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    FETCH_RESTORE,    
    RESTORE,
    RESTORE_SUCCESS,
    RESTORE_FAILED,
    SIGN_OUT,       
} from './types';

// Register actions

export const fetchRegister = (userData) => {
    return { type: FETCH_REGISTER, userData: userData }
};

export const register = () => {
    return { type: REGISTER }
};

export const registerSuccess = () => {
    return { type: REGISTER_SUCCESS }
};

export const registerError = () => {
    return { type: REGISTER_FAILED }
};

// Login actions

export const fetchLogin = (userData) => {
    return { type: FETCH_LOGIN, userData: userData }
};

export const login = () => {
    return { type: LOGIN }
};

export const loginSuccess = (authData) => {
    return { type: LOGIN_SUCCESS, authData: authData }
};

export const loginError = () => {
    return { type: LOGIN_FAILED }
};

// Restore authentication data

export const fetchRestore = () => {
    return { type: FETCH_RESTORE }
};

export const restore = () => {
    return { type: RESTORE }
};

export const restoreSuccess = (authData) => {
    return { type: RESTORE_SUCCESS, authData: authData }
};

export const restoreError = () => {
    return { type: RESTORE_FAILED }
};

// Sign Out action
export const signOut = () => {
    return { type: SIGN_OUT }
};
