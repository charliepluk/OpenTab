import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

import CloseIcon from "../assets/svg/close.svg";
import SyncStorage from "sync-storage";
import axios from "axios";
import { syncStringToArray } from "../jsonStringFunctions";

function OrderItem({ name, price, quantity, totalPrice }) {
  return (
    <TouchableOpacity
      onPress={() => console.log("Order Item Pressed")}
      style={styles.item}
    >
      <View style={styles.itemImage}></View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.priceText}>${price}</Text>
        <Text style={styles.quantityText}>x{quantity}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.totalPriceText}>${totalPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Order extends Component {
  state = {};

  componentDidMount() {
    //gets json string from sync storage
    var customerOrderString = SyncStorage.get("currentCustomerOrder");

    //send json string to function that will use string to create a reduced jsonOBJ
    var reducedArray = syncStringToArray(customerOrderString);

    //takes the reduced array to create a json string and stores it back in sync storage
    var reducedArrLength = reducedArray.length;
    var reducedCustomerOrderString = "";
    for (var i = 0; i < reducedArrLength; i++) {
      reducedCustomerOrderString += JSON.stringify(reducedArray[i]) + ",\n";
    }

    SyncStorage.set("currentCustomerOrder", reducedCustomerOrderString);

    this.setState({
      orderData: reducedArray,
    });
  }

  //submit users order to the DB
  submitOrder = () => {
    var userID = SyncStorage.get("userID");
    var connectedRestID = SyncStorage.get("connectedRestID");
    console.log(userID);
    axios
      .post("http://10.0.0.27:3000/requestRoutes/submitOrder", {
        restID: connectedRestID,
        userID: userID,
        orderItems: this.state.orderData,
      })
      .then((res) => {
        console.log("submit success");
        SyncStorage.set("currentCustomerOrder", "");
        this.props.navigation.goBack();
      })
      //catch any errors from the post call
      .catch((err) => {
        console.log("ERROR OCCURED: ");
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => this.props.navigation.goBack()}
          >
            <CloseIcon width={135} height={75} viewBox="0 0 24 15" />
          </TouchableOpacity>
          <Text style={styles.title}>Your Order</Text>
        </SafeAreaView>

        <FlatList
          // due to an error with paddingBottom for ScrollView (which FlatList extends) this is how paddingBottom needs to be set
          contentContainerStyle={{ paddingBottom: 15 }}
          style={styles.orderList}
          data={this.state.orderData}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <OrderItem
              name={item.itemName}
              quantity={item.quantity}
              price={item.itemPrice}
              totalPrice={item.totalPrice}
            />
          )}
        />

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => this.submitOrder()}>
            <Text style={{ color: "#F6F6F6" }}>Order</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },

  header: {
    justifyContent: "center",
    height: 100,
    width: "100%",
    backgroundColor: "#FF9466",
  },

  title: {
    alignSelf: "center",
    color: "#F6F6F6",
    fontSize: 20,
    fontWeight: "bold",
    height: "50%",
  },

  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },

  orderList: {
    backgroundColor: "#F6F6F6",
    width: "100%",
  },

  item: {
    backgroundColor: "#e0e0e0",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    height: 80,
    display: "flex",
    flexDirection: "row",
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

  buttonContainer: {
    backgroundColor: "#FF9466",
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#FF9466",
    borderWidth: 2,
    borderColor: "black",
    color: "#FF9466",
    width: 276,
    height: 46,
    justifyContent: "center",
    alignSelf: "center",
  },
});
