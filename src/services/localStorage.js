import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromLocalStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
    return null;
    // throw new Error('Error storing the auth token');
  }
};
export const setToLocalStorage = (key, value) => {
  let storeValue =  value;
  if(typeof value !=  "string"){
  storeValue =  JSON.stringify(value);
  }
  AsyncStorage.setItem(key, storeValue);
};
export const removeLocalStorageItem = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (exception) {
    return false;
  }
};
