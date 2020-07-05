import { takeLatest, put, call } from 'redux-saga/effects';
import { loginSuccess, restoreSuccess, fetchLogin } from '../actions/auth.actions';
import { setError } from '../actions/error.actions';
import { FETCH_REGISTER, FETCH_LOGIN, FETCH_RESTORE, SIGN_OUT } from '../actions/types';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

// Registration

export function* watchFetchRegister() {
    yield takeLatest(FETCH_REGISTER, fetchRegisterAsync);
}

function* fetchRegisterAsync(action) {
    try {        
        const response = yield call(ApiService.register, action.userData);
        const res = yield call(ApiService.parseResponse, response);       

        if (res.error) {                        
            yield put(setError(res.error));
            return;
        }        
                
        yield put(fetchLogin({ email: action.userData.email, password: action.userData.password }));
    } catch (error) {                
        yield put(setError(error));
    }
}

// Signing In

export function* watchFetchLogin() {
    yield takeLatest(FETCH_LOGIN, fetchLoginAsync);
}

function* fetchLoginAsync(action) {
    try {                        
        const response = yield call(ApiService.login, action.userData);        
        const res = yield call(ApiService.parseResponse, response);       
        
        if (res.error) {                                    
            yield put(setError(res.error));
            return;
        }
                       
        yield call(StorageService.setAuthData, res.data);             
        yield put(loginSuccess(res.data));                        
    } catch (error) {        
        yield put(setError(error));
    }
}

// Restoring authentication data

export function* watchRestoreAuthData() {
    yield takeLatest(FETCH_RESTORE, restoreAuthDataAsync);
}

function* restoreAuthDataAsync() {
    try {        
        const authData = yield call(StorageService.getAuthData);
        yield put(restoreSuccess(authData));        
    } catch (error) {                
        yield put(setError(error));        
    }
}

// Singning out

export function* watchSignOut() {
    yield takeLatest(SIGN_OUT, signOutAsync);
}

function* signOutAsync() {
    try {        
        yield call(StorageService.removeAuthData);
        yield put(restoreSuccess({ userId: null, token: null }));        
    } catch (error) {        
        yield put(setError(error));
    }
}