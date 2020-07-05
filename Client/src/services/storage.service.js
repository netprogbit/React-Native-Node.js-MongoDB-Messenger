import AsyncStorage from '@react-native-community/async-storage';

// Working with async storage

setAuthData = async (authData) => {    
    await AsyncStorage.setItem('userId', authData.userId);
    await AsyncStorage.setItem('userToken', authData.token);
};

getAuthData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('userToken');
    return { userId: userId, token: token };
};

removeAuthData = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userToken');
};

export const StorageService = {
    setAuthData,
    getAuthData,
    removeAuthData,
};