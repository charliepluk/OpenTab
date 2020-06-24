import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import LandingPage from "./landingPage";
import CustomerSignup from "./customerSignup";
import CustomerLogin from "./customerLogin";

const RootStack = createStackNavigator();

export default class RootStackScreen extends Component {
  render() {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name="LandingPage"
          component={LandingPage}
          headerMode="none"
        />
        <RootStack.Screen
          name="CustomerSignup"
          component={CustomerSignup}
          headerMode="none"
        />
        <RootStack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          headerMode="none"
        />
      </RootStack.Navigator>
    );
  }
}
