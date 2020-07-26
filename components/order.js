import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navStyles } from "../stylesheet/navbarStyle";
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
    //if user is not connected to a restaurant - this should really never happen
    if (this.state.orderData == "") {
      Alert.alert(
        "Empty order",
        "There are not items in your order, please add items to submit an order."
      );
    } else {
      axios
        .post("http://10.0.1.62:3000/requestRoutes/submitOrder", {
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
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={navStyles.navBar}>
          <View style={navStyles.navTab} />
          <Text style={styles.title}>Your Order</Text>
          <TouchableOpacity
            style={navStyles.orderTab}
            onPress={() => this.props.navigation.goBack()}
          >
            <CloseIcon width={35} height={35} />
          </TouchableOpacity>
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
            <Text style={{ color: "#FF9466" }}>Order</Text>
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

  title: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    height: 57,
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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#F6F6F6",
    color: "#FF9466",
    width: 276,
    height: 46,
    justifyContent: "center",
    borderRadius: 0,
    alignSelf: "center",
  },
});
