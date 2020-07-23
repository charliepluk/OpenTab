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
    const { orderID } = this.props.route.params;
    axios
      .post("http://10.0.0.27:3000/requestRoutes/getOrderItems", {
        orderID: orderID.orderID,
      })
      .then((res) => {
        console.log(res.data);
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
    const { restID } = this.props.route.params;
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
              {item.itemQuantity} - {item.itemName} = {item.totalPriceOfItems}
            </Text>
          )}
        />
      </View>
    );
  }
}
