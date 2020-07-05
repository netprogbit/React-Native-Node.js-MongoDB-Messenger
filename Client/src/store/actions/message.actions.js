import {
    FETCH_SEND_MESSAGE,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED,
    FETCH_MESSAGES,
    GET_MESSAGES,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILED,
    ADD_MESSAGE,       
} from './types';

export const fetchSendMessage = (messageData) => {
    return { type: FETCH_SEND_MESSAGE, messageData: messageData }
};

export const sendMessage = () => {
    return { type: SEND_MESSAGE }
};

export const sendMessageSuccess = (message) => {
    return { type: SEND_MESSAGE_SUCCESS, message: message }
};

export const sendMessageError = () => {
    return { type: SEND_MESSAGE_FAILED }
};

export const fetchMessages = (searchData) => {
    return { type: FETCH_MESSAGES, searchData: searchData }
};

export const getMessages = () => {
    return { type: GET_MESSAGES }
};

export const getMessagesSuccess = (messages) => {
    return { type: GET_MESSAGES_SUCCESS, messages: messages }
};

export const getMessagesError = () => {
    return { type: GET_MESSAGES_FAILED }
};

export const addMessage = (message) => {
    return { type: ADD_MESSAGE, message: message }
};
