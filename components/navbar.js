import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import { styles } from "../stylesheet/navbarStyle";

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
    return <SafeAreaView style={this.getStyle()}></SafeAreaView>;
  }
}
