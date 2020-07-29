import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

// Import Styles
import { navStyles } from "../stylesheet/navbarStyle";
import { styles } from "../stylesheet/orderHistoryViewStyle";

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

          <Text style={styles.title}>Order Info</Text>
          <View style={navStyles.navTab} />
        </SafeAreaView>

        <FlatList
          data={this.state.orderData}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <View style={styles.drinksList}>
              <View style={styles.itemImage}></View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.priceText}>
                  ${item.itemPrice.toFixed(2)}
                </Text>
                <Text style={styles.quantityText}>x{item.quantity}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.totalPriceText}>
                  ${item.totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
