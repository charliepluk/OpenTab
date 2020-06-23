import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../stylesheet/landingPageStyle";

export default class landingPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.firstLine}>An easier way to order.</Text>

        <Text style={styles.secondLine}>A better way to enjoy your time.</Text>

        <Text style={styles.thirdLine}>Log in or create an account</Text>

        <Text style={styles.fourthLine}>Open up your tab today.</Text>

        <View style={styles.pageContainer}>
          <Button
            style={styles.loginButton}
            onPress={() => console.log("Log in button is pressed")}
            mode="contained"
            compact="true"
            color="#FFFFFF"
          >
            <Text style={{ color: "#FF9466" }}>Log in</Text>
          </Button>

          <Button
            style={styles.signupButton}
            onPress={() => console.log("Sign up button is pressed")}
            mode="contained"
            compact="true"
            color="#FFFFFF"
          >
            <Text style={{ color: "#FF9466" }}>Sign up</Text>
          </Button>
        </View>
      </View>
    );
  }
}
