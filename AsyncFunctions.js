import AsyncStorage from "@react-native-community/async-storage";

//get data from async-storage
export const getData = async () => {
  try {
    var userID = JSON.stringify(await AsyncStorage.getItem("@userID"));
    console.log(userID);
    return userID;
  } catch (e) {
    // error reading value
  }
  return;
};

//store data into async-storage
export const storeData = async (value) => {
  try {
    const Value = value;
    await AsyncStorage.setItem("@userID", value);
  } catch (e) {
    // saving error
  }
};
