import React, { Component } from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../stylesheet/homeStyle";

// Import Navbar Component
import NavBar from "./navbar";

export default class Home extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <NavBar></NavBar>

        <View style={styles.welcomeContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.label}>Welcome to</Text>
            <Text style={styles.title}>OPEN</Text>
            <Text style={styles.title}>TAB</Text>
          </View>
        </View>

        <View style={styles.startContainer}>
          <Text style={styles.actionLabel}>Start your tab!</Text>
          <Button
            style={styles.button}
            onPress={() => console.log("View Restaurant Button Clicked")}
          >
            <Text style={{ color: "#FF9466" }}>View Restaurants</Text>
          </Button>
        </View>
      </View>
    );
  }
}
