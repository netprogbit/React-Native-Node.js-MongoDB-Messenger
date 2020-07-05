import { all, fork } from 'redux-saga/effects';
import {
  watchFetchRegister,
  watchFetchLogin,
  watchRestoreAuthData,
  watchSignOut,
} from './auth.sagas';
import { watchFetchUsers } from './user.sagas';
import {
  watchFetchSendMessage,
  watchFetchMessages,  
} from './message.sagas';

// Root Saga
export function* rootSaga() {
  yield all([    
    fork(watchFetchRegister),
    fork(watchFetchLogin),
    fork(watchRestoreAuthData),
    fork(watchSignOut),
    fork(watchFetchUsers),
    fork(watchFetchSendMessage),
    fork(watchFetchMessages),
  ]);
};