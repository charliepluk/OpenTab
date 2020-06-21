import React, { Component } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Pages
import CustomerLogin from "./components/customerLogin";
import Home from "./components/home";
import Restaurants from "./components/restaurants";

// Disable Font Scaling on iOS
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" options={{ headerShown: false }}>
      {(props) => <Home {...props} />}
    </HomeStack.Screen>

    <HomeStack.Screen name="Restaurants" options={{ headerShown: false }}>
      {(props) => <Restaurants {...props} />}
    </HomeStack.Screen>
  </HomeStack.Navigator>
);

// Create React Navigation Drawer
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
