import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { styles } from "../stylesheet/navbarStyle";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class NavBar extends Component {
  state = {};

  getStyle = () => {
    if (this.props.onPage === "Home") {
      return styles.homeNavBar;
    } else {
      return styles.navBar;
    }
  };

  render() {
    return (
      <SafeAreaView style={this.getStyle()}>
        <TouchableOpacity style={styles.navTab}></TouchableOpacity>
        <TouchableOpacity style={styles.orderTab}></TouchableOpacity>
      </SafeAreaView>
    );
  }
}
