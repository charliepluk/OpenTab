import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

//Import styles
import { navStyles } from "../stylesheet/navbarStyle";
import { styles } from "../stylesheet/orderStyle";

import CloseIcon from "../assets/svg/close.svg";
import SyncStorage from "sync-storage";
import axios from "axios";
import { syncStringToArray, arrayToSyncString } from "../jsonStringFunctions";

export default class Order extends Component {
  state = {
    restName: "",
    modalVisible: false,
    itemQuantity: 1,
    itemID: "",
    itemName: "",
    itemPrice: 0,
    arrIndex: "",
    totalPrice: 0,
    orderData: "",
    totalOrderPrice: 0,
  };

  componentDidMount() {
    //gets json string from sync storage
    var customerOrderString = SyncStorage.get("currentCustomerOrder");

    //send json string to function that will use string to create a reduced jsonOBJ
    var reducedArray = syncStringToArray(customerOrderString);

    //takes the reduced array to create a json string and stores it back in sync storage
    var reducedArrLength = reducedArray.length;
    var reducedCustomerOrderString = "";
    var totalOrderPrice = 0;
    for (var i = 0; i < reducedArrLength; i++) {
      reducedCustomerOrderString += JSON.stringify(reducedArray[i]) + ",\n";
      totalOrderPrice += reducedArray[i].totalPrice;
    }

    SyncStorage.set("currentCustomerOrder", reducedCustomerOrderString);

    this.setState({
      orderData: reducedArray,
      totalOrderPrice: totalOrderPrice,
    });
  }

  //submit users order to the DB
  submitOrder = () => {
    var userID = SyncStorage.get("userID");
    var connectedRestID = SyncStorage.get("connectedRestID");
    //if the order is empty
    if (connectedRestID == undefined || connectedRestID == "noRestConnected") {
      Alert.alert(
        "No Restaurant Connection",
        "You are not connected to a restaurant, please connect to a restaurant to submit an order."
      );
    } else if (this.state.orderData == "") {
      Alert.alert(
        "Empty Order",
        "There are no items in your order, please add items to submit an order."
      );
    } else {
      axios
        .post("http://10.0.0.27:3000/requestRoutes/submitOrder", {
          restID: connectedRestID,
          userID: userID,
          orderItems: this.state.orderData,
          totalOrderPrice: this.state.totalOrderPrice,
        })
        .then((res) => {
          Alert.alert("Order Submitted Successfully!");
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

  orderItemPressed = (itemID, name, quantity, price, totalPrice, arrIndex) => {
    this.setState({
      modalVisible: true,
      itemID: itemID,
      itemName: name,
      itemPrice: price,
      itemQuantity: quantity,
      arrIndex: arrIndex,
      totalPrice: totalPrice,
    });
  };

  //takes the customerOrderArray as an arguement. Updates the currentCustomerOrder sync var and sets state of orderData to newly edited customerOrderArray
  updateArrayAndSyncString = (customerOrderArray) => {
    //take the edited array and store it in syncstorage to ensure it stays updated
    SyncStorage.set(
      "currentCustomerOrder",
      arrayToSyncString(customerOrderArray)
    );

    //set the state of orderData to the new array so the order page updates properly
    this.setState({
      orderData: customerOrderArray,
      modalVisible: false,
    });
  };

  //removes item from the order array. Called when "remove item" is clicked on modal or user sets quantity to 0 and confirms on modal
  removeOrderItem = (customerOrderArray) => {
    var removeFromTotal = customerOrderArray[this.state.arrIndex].totalPrice;
    customerOrderArray.splice(this.state.arrIndex, 1);
    this.updateArrayAndSyncString(customerOrderArray);
    this.setState({
      totalOrderPrice: this.state.totalOrderPrice - removeFromTotal,
    });
  };

  //this is called if the user edits the quantity otherwise the modal will just close
  editOrderItemQuantity = () => {
    var customerOrderArray = this.state.orderData;

    //the user set the quantity to 0
    if (this.state.itemQuantity == 0) {
      this.removeOrderItem(customerOrderArray);
    }

    //else edit the quantity
    else {
      var newCost =
        (this.state.itemQuantity -
          customerOrderArray[this.state.arrIndex].quantity) *
        this.state.itemPrice;
      //edit item quantity
      customerOrderArray[
        this.state.arrIndex
      ].quantity = this.state.itemQuantity;
      //edit total price of items
      customerOrderArray[this.state.arrIndex].totalPrice =
        this.state.itemQuantity * this.state.itemPrice;

      this.setState({
        modalVisible: false,
        totalOrderPrice: this.state.totalOrderPrice + newCost,
      });
    }
  };

  incrementQuantity = () => {
    this.setState({ itemQuantity: this.state.itemQuantity + 1 });
  };
  decrementQuantity = () => {
    if (this.state.itemQuantity > 0) {
      this.setState({ itemQuantity: this.state.itemQuantity - 1 });
    }
  };

  render() {
    const { modalVisible } = this.state;
    return (
      // nav bar
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
        {/* modal that pops up when pressing on an order item */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalItemName}>{this.state.itemName}</Text>
              <Text style={styles.modalQuantityText}>
                Quantity: {this.state.itemQuantity}
              </Text>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                underlayColor="#f28d61"
                onPress={() => {
                  this.incrementQuantity();
                }}
              >
                <Text style={styles.textStyle}>+</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                underlayColor="#f28d61"
                onPress={() => {
                  this.decrementQuantity();
                }}
              >
                <Text style={styles.textStyle}>-</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                underlayColor="#f28d61"
                onPress={() => {
                  this.removeOrderItem(this.state.orderData);
                }}
              >
                <Text style={styles.textStyle}>Remove item</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                underlayColor="#f28d61"
                onPress={() => {
                  this.editOrderItemQuantity();
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.modalButton }}
                underlayColor="#f28d61"
                onPress={() => {
                  this.setState({
                    itemID: "",
                    itemName: "",
                    itemQuantity: 1,
                    itemPrice: "",
                    modalVisible: false,
                  });
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {/* end modal */}

        {/* flatlist that generates customers order from this.state.orderData */}
        <View style={styles.restTitleView}>
          <Text style={styles.restTitle}>
            {SyncStorage.get("connectedRestName")}
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 15 }}
          data={this.state.orderData}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.drinksList}
              onPress={() =>
                this.orderItemPressed(
                  item.itemID,
                  item.itemName,
                  item.quantity,
                  // parseFloat(item.itemPrice).toFixed(2),
                  item.itemPrice,
                  item.totalPrice,
                  index
                )
              }
            >
              <View style={styles.itemImage}></View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.priceText}>
                  ${item.itemPrice.toFixed(2)}
                </Text>
                <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
              </View>

              <View style={styles.totalItemPriceView}>
                <Text style={styles.totalPriceText}>
                  ${item.totalPrice.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* end flatlist */}

        <View style={styles.orderTotalView}>
          <Text style={styles.orderTotalText}>
            Order Total = ${this.state.totalOrderPrice.toFixed(2)}
          </Text>
        </View>

        {/* order button */}
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => this.submitOrder()}>
            <Text style={{ color: "#FF9466" }}>Order</Text>
          </Button>
        </View>
      </View>
    );
  }
}
