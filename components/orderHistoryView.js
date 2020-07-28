import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";

// Import Styles
import { navStyles } from "../stylesheet/navbarStyle";

// Import SVGs
import ArrowBack from "../assets/svg/arrow-back.svg";

export default class orderHistoryView extends Component {
  state = {};

  //get data to populate restaurants menu
  componentDidMount() {
    const { orderItems } = this.props.route.params;
    const customerOrder = JSON.parse(orderItems.orderItems);
    this.setState({
      orderData: customerOrder,
    });
  }

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
        </SafeAreaView>

        <FlatList
          data={this.state.orderData}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <View style={styles.drinksList}>
              <View style={styles.itemImage}></View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.priceText}>${item.itemPrice}</Text>
                <Text style={styles.quantityText}>x{item.quantity}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.totalPriceText}>${item.totalPrice}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },

  itemImage: {
    height: 60,
    width: 60,
    backgroundColor: "#C4C4C4",
  },

  itemInfo: {
    marginLeft: 10,
  },

  itemName: {
    fontSize: 25,
  },

  quantityText: {
    fontSize: 12,
  },

  totalPriceText: {
    fontSize: 12,
  },

  priceText: {
    fontSize: 12,
  },

  drinksList: {
    backgroundColor: "#ECECEC",
    marginTop: 10,
    padding: 10,
    height: 85,
    width: 375,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
});
