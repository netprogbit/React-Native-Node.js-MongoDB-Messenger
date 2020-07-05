import { takeLatest, put, call } from 'redux-saga/effects';
import { sendMessageSuccess, getMessagesSuccess } from '../actions/message.actions';
import { setError } from '../actions/error.actions';
import { FETCH_SEND_MESSAGE, FETCH_MESSAGES } from '../actions/types';
import { ApiService } from '../../services/api.service';

export function* watchFetchSendMessage() {
    yield takeLatest(FETCH_SEND_MESSAGE, fetchSendMessageAsync);
}

function* fetchSendMessageAsync(action) {
    try {        
        const response = yield call(ApiService.addMessage, action.messageData);
        const res = yield call(ApiService.parseResponse, response);       

        if (res.error) {                        
            yield put(setError(res.error));
            return;
        }          

        yield put(sendMessageSuccess(res.data));        
    } catch (error) {        
        yield put(setError(error));
    }
}

export function* watchFetchMessages() {
    yield takeLatest(FETCH_MESSAGES, fetchMessagesAsync);
}

function* fetchMessagesAsync(action) {
    try {        
        const response = yield call(ApiService.getMessages, action.searchData);
        const res = yield call(ApiService.parseResponse, response);       

        if (res.error) {                        
            yield put(setError(res.error));
            return;
        }        

        yield put(getMessagesSuccess(res.data));        
    } catch (error) {        
        yield put(setError(error));
    }
}