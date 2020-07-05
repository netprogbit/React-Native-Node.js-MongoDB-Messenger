import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from '../../src/navigation/navigator';
import { navigationRef } from '../navigation/root-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestore } from '../store/actions/auth.actions';
import { resetError } from '../store/actions/error.actions';
import { signOut } from '../store/actions/auth.actions';
import Error from './Error';

export default function App() {

    // Track changes   
    const error = useSelector(state => state.error.error);    
    const userToken = useSelector(state => state.auth.token);
    const selectedUser = useSelector(state => state.user.selectedUser);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRestore()); // Restore auth data from async storage
    }, []);

    if (error) {

        if (error.status === undefined)
            return <Error error={error} />;

        if (error.status === 401) {
            dispatch(signOut());                        
        }
        else {
            alert(error.message);
        }
        
        dispatch(resetError());
    }    

    return (
        <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
            <RootStackScreen userToken={userToken} selectedUser={selectedUser} />
        </NavigationContainer>
    );
}

const NavigationTheme = {
    dark: false,
    colors: {
        primary: '#D7D7D7',
        background: '#2A211C',
        card: '#4B3C34',
        text: '#FFB02E',
        border: '#464544',
    },
};
