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
  orderID,
  orderDateTime,
  restName,
  address,
  orderItems,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("OrderHistoryView", {
          orderID: { orderID },
          orderDateTime: { orderDateTime },
          restName: { restName },
          address: { address },
          orderItems: { orderItems },
        })
      }
      style={styles.item}
    >
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantTitle}>{restName}</Text>
        <Text style={styles.infoText}>{address}</Text>
        <Text style={styles.infoText}>{orderDateTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class OrderHistory extends Component {
  state = {};

  componentDidMount() {
    axios
      .post("http://10.0.0.27:3000/requestRoutes/getCustomerOrderHistory", {
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
              orderItems={item.orderItems}
            />
          )}
        />
      </View>
    );
  }
}
