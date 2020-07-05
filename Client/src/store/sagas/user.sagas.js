import { takeLatest, put, call } from 'redux-saga/effects';
import { getUsersSuccess } from '../actions/user.actions';
import { setError } from '../actions/error.actions';
import { FETCH_USERS } from '../actions/types';
import { ApiService } from '../../services/api.service';

export function* watchFetchUsers() {
    yield takeLatest(FETCH_USERS, fetchUsersAsync);
}

function* fetchUsersAsync(action) {
    try {        
        let response = yield call(ApiService.getUsers, action.userData);
        const res = yield call(ApiService.parseResponse, response);       

        if (res.error) {                                    
            yield put(setError(res.error));
            return;
        }                

        yield put(getUsersSuccess(res.data));        
    } catch (error) {        
        yield put(setError(error));
    }
}