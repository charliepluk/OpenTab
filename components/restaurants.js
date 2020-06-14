import React, { Component } from "react";
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { styles } from "../stylesheet/homeStyle";

// Import Navbar Component
import NavBar from "./navbar";

export default class Restaurants extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <NavBar></NavBar>

        <View style={styles.listContainer}></View>
      </View>
    );
  }
}
