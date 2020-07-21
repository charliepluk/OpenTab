import React, { Component } from "react";
import { Text } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Pages
import LandingPage from "./components/landingPage";
import CustomerSignup from "./components/customerSignup";
import CustomerLogin from "./components/customerLogin";
import Home from "./components/home";
import Restaurants from "./components/restaurants";
import RestaurantView from "./components/restaurantView";
import Order from "./components/order";

import RootStackScreen from "./components/rootStackScreen";

// Import Drawer Content
import DrawerContent from "./components/drawerContent";

//Import Async-Storage functions
import { getData, storeData } from "./AsyncFunctions.js";
import AsyncStorage from "@react-native-community/async-storage";
import SyncStorage from "sync-storage";

// Disable Font Scaling on iOS
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// Create Stack Navigators
const HomeStack = createStackNavigator();

// Implement Stack Navigators
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" options={{ headerShown: false }}>
      {(props) => <Home {...props} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="Restaurants" options={{ headerShown: false }}>
      {(props) => <Restaurants {...props} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="RestaurantView" options={{ headerShown: false }}>
      {(props) => <RestaurantView {...props} />}
    </HomeStack.Screen>
  </HomeStack.Navigator>
);

// Create React Navigation Drawer

const Drawer = createDrawerNavigator();
export default function App() {
  var test = SyncStorage.get("userID");
  console.log(test);
  if (test == "noUser" || test == undefined) {
    return <NavigationContainer>{<RootStackScreen />}</NavigationContainer>;
  } else {
    return (
      <NavigationContainer>
        {/* <RootStackScreen /> */}
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          initialRouteName="Home"
        >
          <Drawer.Screen
            name="LandingPage"
            component={LandingPage}
            headerMode="none"
          />
          <Drawer.Screen
            name="CustomerSignup"
            component={CustomerSignup}
            headerMode="none"
          />
          <Drawer.Screen
            name="CustomerLogin"
            component={CustomerLogin}
            headerMode="none"
          />
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          <Drawer.Screen name="Order" options={{ headerShown: false }}>
            {(props) => <Order {...props} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
