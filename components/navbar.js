import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import { styles } from "../stylesheet/navbarStyle";

export default class NavBar extends Component {
  state = {};

  render() {
    return (
      <SafeAreaView style={styles.navBar}>
        <Text>Hello</Text>
      </SafeAreaView>
    );
  }
}
