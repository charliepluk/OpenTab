import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Pages
import CustomerLogin from "./components/customerLogin";
import Home from "./components/home";
import Restaurants from "./components/restaurants";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Restaurants" options={{ headerShown: false }}>
          {(props) => <Restaurants {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
