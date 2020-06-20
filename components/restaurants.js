import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "../stylesheet/restaurantsStyle";

// Import Navbar Component
import NavBar from "./navbar";

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
        <Text>Hours: {hours}</Text>
        <Text>{address}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Restaurants extends Component {
  state = {};

  render() {
    return (
      <View>
        <NavBar></NavBar>
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
