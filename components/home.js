import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

// Import Stylesheets
import { styles } from "../stylesheet/homeStyle";
import { navStyles } from "../stylesheet/navbarStyle";

// Import SVGs
import MenuIcon from "../assets/svg/menu.svg";
import OrderIcon from "../assets/svg/order.svg";

//Import Async-Storage functions
import { getData, storeData } from "../AsyncFunctions.js";
import SyncStorage from "sync-storage";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={navStyles.homeNavBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.toggleDrawer()}
          >
            <MenuIcon width={35} height={35} />
          </TouchableOpacity>

          <TouchableOpacity
            style={navStyles.orderTab}
            onPress={() => this.props.navigation.navigate("Order")}
          >
            <OrderIcon width={35} height={35} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.welcomeContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.label}>Welcome to</Text>
            <Animatable.Text
              animation="fadeInLeftBig"
              duraton="2500"
              style={styles.title}
            >
              OPEN
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInLeft"
              duraton="1600"
              style={styles.title}
            >
              TAB
            </Animatable.Text>
          </View>
        </View>

        <View style={styles.startContainer}>
          <Text style={styles.actionLabel}>Start your tab!</Text>
          <Button
            style={styles.button}
            onPress={() => console.log(SyncStorage.get("userID"))}
          >
            <Text style={{ color: "#FF9466" }}>View Restaurants</Text>
          </Button>
        </View>
      </View>
    );
  }
}
//onPress={() => this.props.navigation.navigate("Restaurants")}
