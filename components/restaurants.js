import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";

// Import Styles
import { styles } from "../stylesheet/restaurantsStyle";
import { navStyles } from "../stylesheet/navbarStyle";

// Import SVGs
import ArrowBack from "../assets/svg/arrow-back.svg";
import OrderIcon from "../assets/svg/order-alt.svg";

import SyncStorage from "sync-storage";
import { ScrollView } from "react-native-gesture-handler";

function RestaurantItem({
  props,
  title,
  address,
  city,
  hours,
  description,
  restID,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("RestaurantView", {
          title: { title },
          hours: { hours },
          address: { address },
          city: { city },
          description: { description },
          restID: { restID },
        })
      }
      style={itemStyle(restID)}
    >
      <View style={styles.restaurantImage}></View>
      {getRestaurantText(restID, title, hours, address, city)}
    </TouchableOpacity>
  );
}

function getRestaurantText(restID, title, hours, address, city) {
  if (restID == SyncStorage.get("connectedRestID")) {
    return (
      <View style={styles.restaurantInfo}>
        <Text style={styles.connectedRestaurantTitle}>{title}</Text>
        <Text style={styles.connectedInfoText}>Hours: {hours}</Text>
        <Text style={styles.connectedInfoText}>
          {address}, {city}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantTitle}>{title}</Text>
        <Text style={styles.infoText}>Hours: {hours}</Text>
        <Text style={styles.infoText}>
          {address}, {city}
        </Text>
      </View>
    );
  }
}

function itemStyle(restID) {
  if (restID == SyncStorage.get("connectedRestID")) {
    return {
      backgroundColor: "#FF9466",
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      padding: 10,
      height: 100,
      display: "flex",
      flexDirection: "row",
      color: "white",
    };
  } else {
    return {
      backgroundColor: "#ECECEC",
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      padding: 10,
      height: 100,
      display: "flex",
      flexDirection: "row",
    };
  }
}

export default class Restaurants extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("http://192.168.1.158:3000/requestRoutes/getRestaurants")
      .then((res) => {
        //console.log(res.data);
        this.setState({
          DATA: res.data,
        });
      })
      //catch any errors from the post call
      .catch((err) => {
        console.log("ERROR OCCURED: ");
        console.log(err);
      });
  }

  render() {
    return (
      <View>
        <SafeAreaView style={navStyles.navBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.goBack()}
          >
            <ArrowBack width={35} height={35} />
          </TouchableOpacity>

          <Text style={styles.title}>Restaurants</Text>

          <TouchableOpacity
            style={navStyles.orderTab}
            onPress={() => this.props.navigation.navigate("Order")}
          >
            <OrderIcon width={35} height={35} />
          </TouchableOpacity>
        </SafeAreaView>

        <FlatList
          style={styles.listContainer}
          data={this.state.DATA}
          keyExtractor={(item) => item.restID.toString()}
          renderItem={({ item }) => (
            <RestaurantItem
              props={this.props}
              title={item.restName}
              address={item.address}
              city={item.city}
              hours={
                item.openTime.toString() + " - " + item.closeTime.toString()
              }
              description={item.description}
              restID={item.restID}
            />
          )}
        />
      </View>
    );
  }
}
