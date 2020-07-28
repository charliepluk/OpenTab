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
import OrderHistory from "./components/orderHistory";
import OrderHistoryView from "./components/orderHistoryView";
import Settings from "./components/settings";

import RootStackScreen from "./components/rootStackScreen";

// Import Drawer Content
import DrawerContent from "./components/drawerContent";

//Import Async-Storage functions
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
    <HomeStack.Screen name="OrderHistory" options={{ headerShown: false }}>
      {(props) => <OrderHistory {...props} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="OrderHistoryView" options={{ headerShown: false }}>
      {(props) => <OrderHistoryView {...props} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="Settings" options={{ headerShown: false }}>
      {(props) => <Settings {...props} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="Order" options={{ headerShown: false }}>
      {(props) => <Order {...props} />}
    </HomeStack.Screen>
  </HomeStack.Navigator>
);

// Create React Navigation Drawer
const Drawer = createDrawerNavigator();
export default function App() {
  var test = SyncStorage.get("userID");
  console.log("Sync-storage userID var = " + test);
  return (
    <NavigationContainer>
      {/* <RootStackScreen /> */}
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="LandingPage"
      >
        <Drawer.Screen
          name="LandingPage"
          component={LandingPage}
          headerMode="none"
          options={{
            gestureEnabled: false,
          }}
        />
        <Drawer.Screen
          name="CustomerSignup"
          component={CustomerSignup}
          headerMode="none"
          options={{
            gestureEnabled: false,
          }}
        />
        <Drawer.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          headerMode="none"
          options={{
            gestureEnabled: false,
          }}
        />
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        {/* <Drawer.Screen name="Order" options={{ headerShown: false }}>
          {(props) => <Order {...props} />}
        </Drawer.Screen> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
