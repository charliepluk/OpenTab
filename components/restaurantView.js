import React, { Component } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";

// Import Styles
import { styles } from "../stylesheet/restaurantViewStyle";
import { navStyles } from "../stylesheet/navbarStyle";

// Import SVGs
import ArrowBack from "../assets/svg/arrow-back.svg";
import OrderIcon from "../assets/svg/order-alt.svg";

export default class restaurantView extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={navStyles.navBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.goBack()}
          >
            <ArrowBack width={35} height={35} />
          </TouchableOpacity>

          <TouchableOpacity style={navStyles.orderTab}>
            <OrderIcon width={35} height={35} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.restaurantImage}></View>
        <Text style={styles.restaurantName}>Cam's Tavern</Text>
        <Text style={styles.restaurantHours}>Hours here</Text>
        <Text style={styles.restaurantAddress}>Some address here</Text>
        <Text style={styles.restaurantDescription}>Description here</Text>
        <Button
          style={styles.connectButton}
          onPress={() => console.log("Connect button is pressed")}
          mode="contained"
          compact="true"
          color="#FF9466"
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>
            Connect
          </Text>
        </Button>

        <View style={styles.thinRectangle}></View>

        <Text style={styles.drinksHeader}>Drinks</Text>

        <TouchableOpacity
          style={styles.drinksList}
          onPress={() => console.log("Drink 1 clicked")}
        >
          <View style={styles.drinksIcon}></View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drinksList}
          onPress={() => console.log("Drink 2 clicked")}
        >
          <View style={styles.drinksIcon}></View>
        </TouchableOpacity>
      </View>
    );
  }
}
