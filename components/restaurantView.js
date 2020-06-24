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
    const { title } = this.props.route.params;
    const { hours } = this.props.route.params;
    const { address } = this.props.route.params;
    const { description } = this.props.route.params;

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
        <Text style={styles.restaurantName}>{title.title}</Text>
        <Text style={styles.restaurantHours}>Hours: {hours.hours}</Text>
        <Text style={styles.restaurantAddress}>{address.address}</Text>
        <Text style={styles.restaurantDescription}>
          {description.description}
        </Text>

        <Button
          style={styles.connectButton}
          onPress={() => console.log("Connect button is pressed")}
        >
          <Text style={{ color: "#FFFFFF" }}>Connect</Text>
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
