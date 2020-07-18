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

function RestaurantItem({ props, title, address, hours, description, restID }) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("RestaurantView", {
          title: { title },
          hours: { hours },
          address: { address },
          description: { description },
          restID: { restID },
        })
      }
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
  state = {
    DATA: [],
  };

  componentDidMount() {
    axios
      .get("http://192.168.1.20:3000/requestRoutes/getRestaurants")
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
    return (
      <View>
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

        <FlatList
          style={styles.listContainer}
          data={this.state.DATA}
          keyExtractor={(item) => item.restID.toString()}
          renderItem={({ item }) => (
            <RestaurantItem
              props={this.props}
              title={item.restName}
              address={item.restLocation}
              hours={
                item.restOpenTime.toString() +
                " - " +
                item.restCloseTime.toString()
              }
              description={item.restDescription}
              restID={item.restID}
            />
          )}
        />
      </View>
    );
  }
}
