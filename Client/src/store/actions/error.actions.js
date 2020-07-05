import { SET_ERROR, RESET_ERROR } from './types';

export const setError = (error) => {
    return { type: SET_ERROR, error: error }
};

export const resetError = () => {
    return { type: RESET_ERROR }
};
