import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navStyles } from "../stylesheet/navbarStyle";
import CloseIcon from "../assets/svg/close.svg";
import SyncStorage from "sync-storage";
import axios from "axios";
import { syncStringToArray, arrayToSyncString } from "../jsonStringFunctions";

export default class Order extends Component {
  state = {
    modalVisible: false,
    itemQuantity: 1,
    itemID: "",
    itemName: "",
    itemPrice: "",
    arrIndex: "",
    totalPrice: "",
    orderData: "",
  };

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
        "There are no items in your order, please add items to submit an order."
      );
    } else {
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
    customerOrderArray.splice(this.state.arrIndex, 1);
    this.updateArrayAndSyncString(customerOrderArray);
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
      customerOrderArray[
        this.state.arrIndex
      ].quantity = this.state.itemQuantity;
      customerOrderArray[this.state.arrIndex].totalPrice =
        this.state.itemQuantity * this.state.itemPrice;
      this.setState({
        modalVisible: false,
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
                  item.itemPrice,
                  item.totalPrice,
                  index
                )
              }
            >
              <View style={styles.itemImage}></View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.priceText}>${item.itemPrice}</Text>
                <Text style={styles.quantityText}>x{item.quantity}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.totalPriceText}>${item.totalPrice}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* end flatlist */}

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

//StyleSheet
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "75%",
    height: "64%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "stretch",
    elevation: 50,
  },
  modalButton: {
    backgroundColor: "#FF9466",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },

  modalItemName: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  modalQuantityText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 15,
  },

  drinksList: {
    backgroundColor: "#ECECEC",
    marginTop: 20,
    padding: 10,
    height: 85,
    width: 375,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
  drinksIcon: {
    backgroundColor: "#C4C4C4",
    marginBottom: 10,
    height: 80,
    width: 80,
    borderRadius: 10,
  },
});
