import ApiConfig from '../configs/api.config';
import AsyncStorage from '@react-native-community/async-storage';

// Working with REST API server

register = async (userData) => {
    const uri = ApiConfig.host + ApiConfig.register;
    const headers = await createHeaders();
    const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify(userData) };
    const response = await fetch(uri, requestOptions);
    return response;
};

login = async (userData) => {
    const uri = ApiConfig.host + ApiConfig.login;
    const headers = await createHeaders();
    const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify(userData) };
    const response = await fetch(uri, requestOptions);
    return response;
};

getUsers = async (userData) => {
    const uri = ApiConfig.host + ApiConfig.users;
    const headers = await createHeaders();
    const requestOptions = { method: 'POST', headers: headers, headers: headers, body: JSON.stringify(userData) };
    const response = await fetch(uri, requestOptions);
    return response;
};

addMessage = async (messageData) => {
    const uri = ApiConfig.host + ApiConfig.message;
    const headers = await createHeaders();
    const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify(messageData) };
    const response = await fetch(uri, requestOptions);
    return response;
};

getMessages = async (searchData) => {
    const uri = ApiConfig.host + ApiConfig.messages;
    const headers = await createHeaders();
    const requestOptions = { method: 'POST', headers: headers, body: JSON.stringify(searchData) };
    const response = await fetch(uri, requestOptions);
    return response;
};

createHeaders = async () => {
    const token = await AsyncStorage.getItem('userToken');
    return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
};

parseResponse = async (response) => {
    
    if (response.status === 401)
        return { data: null, error: { status: response.status, message: 'Unauthorized' } };

    const data = await response.json();

    if (!response.ok)
        return { data: null, error: { status: response.status, message: data.message } };
    
    return { data: data, error: null };
};

export const ApiService = {
    register,
    login,
    getUsers,
    addMessage,
    getMessages,
    parseResponse,
};