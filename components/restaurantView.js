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
import OrderIcon from "../assets/svg/order-alt.svg";

import SyncStorage from "sync-storage";

export default class restaurantView extends Component {
  state = {};

  //get data to populate restaurants menu
  componentDidMount() {
    const { restID } = this.props.route.params;
    axios
      .post("http://10.0.0.27:3000/requestRoutes/getRestaurantMenu", {
        restID: restID.restID,
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

          <TouchableOpacity
            style={navStyles.orderTab}
            onPress={() => this.props.navigation.navigate("Order")}
          >
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

        <FlatList
          data={this.state.DATA}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.drinksList}
              onPress={() => console.log(item.itemID)}
            >
              <View style={styles.drinksIcon}></View>
              <Text>{item.itemName}</Text>
              <Text>{item.itemPrice}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
