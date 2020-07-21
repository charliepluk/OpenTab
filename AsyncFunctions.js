import AsyncStorage from "@react-native-community/async-storage";

//store data into async-storage
export const storeData = async (storeVar, value) => {
  try {
    await AsyncStorage.setItem(storeVar, value);
  } catch (e) {
    console.log("Error occured in storeData: \n" + e);
  }
};

//get data from async-storage
export const getData = async (storeVar) => {
  try {
    //var userID = JSON.stringify(await AsyncStorage.getItem(storeVar));
    // return JSON.stringify(await AsyncStorage.getItem(storeVar));
    return await AsyncStorage.getItem(storeVar);
  } catch (e) {
    console.log("Error occured in getData: \n" + e);
  }
};
