import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";

// Import Styles
import { styles } from "../stylesheet/restaurantViewStyle";
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
      DATA: customerOrder,
    });
  }

  render() {
    const { orderDateTime } = this.props.route.params;
    const { restName } = this.props.route.params;
    const { restLocation } = this.props.route.params;

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
          data={this.state.DATA}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <Text>
              x{item.quantity} - {item.itemName} = ${item.totalPrice}
            </Text>
          )}
        />
      </View>
    );
  }
}
