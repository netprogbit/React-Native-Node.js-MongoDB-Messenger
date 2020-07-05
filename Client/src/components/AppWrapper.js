import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { setError } from '../store/actions/error.actions';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

// JS errors handling
const handleJSException = (error, isFatal) => {         
    store.dispatch(setError(error));       
};
setJSExceptionHandler(handleJSException, true);

// Native errors handling
const handleNativeException = errorString => {
    store.dispatch(setError({ message: errorString, stack: ''}));
};
setNativeExceptionHandler(handleNativeException);

export default function AppWrapper() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    )
}