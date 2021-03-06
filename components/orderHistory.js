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

import SyncStorage from "sync-storage";

function OrderHistoryItem({
  props,
  orderDateTime,
  restName,
  address,
  city,
  orderItems,
  totalOrderPrice,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("OrderHistoryView", {
          orderItems: { orderItems },
          restName: { restName },
          orderDateTime: { orderDateTime },
          totalOrderPrice: { totalOrderPrice },
        })
      }
      style={styles.item}
    >
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantTitle}>{restName}</Text>
        <Text style={styles.infoText}>
          {address}, {city}
        </Text>
        <Text style={styles.infoText}>{orderDateTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class OrderHistory extends Component {
  state = {};

  componentDidMount() {
    axios
      .post("http://192.168.1.158:3000/requestRoutes/getCustomerOrderHistory", {
        userID: SyncStorage.get("userID"),
      })
      .then((res) => {
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

          <Text style={styles.title}>Order History</Text>
          <View style={navStyles.navTab} />
        </SafeAreaView>

        <FlatList
          style={styles.listContainer}
          data={this.state.DATA}
          keyExtractor={(item) => item.orderID.toString()}
          renderItem={({ item }) => (
            <OrderHistoryItem
              props={this.props}
              orderID={item.orderID}
              restID={item.restID}
              orderDateTime={item.orderDateTime}
              restName={item.restName}
              address={item.address}
              city={item.city}
              orderItems={item.orderItems}
              totalOrderPrice={item.totalOrderPrice}
            />
          )}
        />
      </View>
    );
  }
}
