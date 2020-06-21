import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// Import Styles
import { styles } from "../stylesheet/restaurantsStyle";
import { navStyles } from "../stylesheet/navbarStyle";

const DATA = [
  {
    id: "0",
    title: "Cam's Tavern",
    hours: "10AM - 1AM",
    address: "550 Huntington Ave, Boston, MA 02115",
  },
  {
    id: "1",
    title: "Patel's Best",
    hours: "10AM - 1AM",
    address: "550 Huntington Ave, Boston, MA 02115",
  },
];

function RestaurantItem({ title, address, hours }) {
  return (
    <TouchableOpacity
      onPress={() => console.log("Restaurant Item Pressed")}
      style={styles.item}
    >
      <View style={styles.restaurantImage}></View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantTitle}>{title}</Text>
        <Text style={styles.infoText}>Hours: {hours}</Text>
        <Text style={styles.infoText}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Restaurants extends Component {
  state = {};

  render() {
    return (
      <View>
        <SafeAreaView style={navStyles.navBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.goBack()}
          ></TouchableOpacity>

          <TouchableOpacity style={navStyles.orderTab}></TouchableOpacity>
        </SafeAreaView>

        <FlatList
          style={styles.listContainer}
          data={DATA}
          renderItem={({ item }) => (
            <RestaurantItem
              title={item.title}
              address={item.address}
              hours={item.hours}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
