import React, { Component } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Pages
import Home from "./components/home";
import Restaurants from "./components/restaurants";
import RestaurantView from "./components/restaurantView";
import Order from "./components/order";

import RootStackScreen from "./components/rootStackScreen";

// Import Drawer Content
import DrawerContent from "./components/drawerContent";

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
  return (
    <NavigationContainer>
      {/* <RootStackScreen /> */}
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Order" options={{ headerShown: false }}>
          {(props) => <Order {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
