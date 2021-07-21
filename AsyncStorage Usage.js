/** AsyncStorage Usage */ 

import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInfo = async() => {
    try{
        const value = await AsyncStorage.getItem('USER_INFO');
        if(value!==null){
            return JSON.parse(value);
        }
    } catch (e) {
        console.warn(e);
    }
}

const deltest = async() => {
    try{
        const value = await AsyncStorage.removeItem('USER_INFO');
        if(value!==null){
            console.log(JSON.parse(value));
        }
    } catch (e) {
        console.warn(e);
    }
}