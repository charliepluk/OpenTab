import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

import { styles } from "../stylesheet/homeStyle";
import { navStyles } from "../stylesheet/navbarStyle";

export default class Home extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={navStyles.homeNavBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.toggleDrawer()}
          ></TouchableOpacity>

          <TouchableOpacity style={navStyles.orderTab}></TouchableOpacity>
        </SafeAreaView>

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
            onPress={() => this.props.navigation.navigate("Restaurants")}
          >
            <Text style={{ color: "#FF9466" }}>View Restaurants</Text>
          </Button>
        </View>
      </View>
    );
  }
}
