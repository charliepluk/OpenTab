import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Modal,
  TouchableHighlight,
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
import { ScrollView } from "react-native-gesture-handler";

export default class restaurantView extends Component {
  state = {
    connectText: "CONNECT",
    modalVisible: false,
    itemQuantity: 1,
    itemID: "",
    itemName: "",
    itemPrice: "",
  };

  componentDidMount() {
    const { restID } = this.props.route.params;

    //change text if user is connected to this restaurant
    var connectedRestID = SyncStorage.get("connectedRestID");
    if (connectedRestID == restID.restID) {
      this.setState({
        connectText: "DISCONNECT",
      });
    }

    //get restaurant menu
    axios
      .post("http://10.0.0.27:3000/requestRoutes/getRestaurantMenu", {
        restID: restID.restID,
      })
      .then((res) => {
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

  menuItemPressed = (itemID, itemName, itemPrice, restID, restName) => {
    var connectedRestID = SyncStorage.get("connectedRestID");
    //the user isn't connected to the restaurant they are currently viewing
    if (restID != connectedRestID) {
      const title = "Notice";
      const message =
        "You must connect to this restaurant to add items to your order, would you like to connect to " +
        restName +
        " now?\n\nConnecting will clear any existing order.";
      const buttons = [
        { text: "Cancel", type: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            //update connectedRestID variable, clear customer order and update connectText
            SyncStorage.set("connectedRestID", restID.toString());
            SyncStorage.set("currentCustomerOrder", "");
            SyncStorage.set("connectedRestName", restName.toString());
            this.setState({
              connectText: "DISCONNECT",
            });
          },
        },
        {
          text: "No",
        },
      ];
      Alert.alert(title, message, buttons);
    }

    //the user is connected to the restaurant, prompt them with quantity modal and set state variables for use in modal
    else {
      this.setState({
        modalVisible: true,
        itemID: itemID,
        itemName: itemName,
        itemPrice: itemPrice,
      });
    }
  };

  //called from modal, adds item to the order after user defines quantity
  addItemsToOrder = () => {
    //create json object to add item to customer order
    var jsonData = {
      itemID: this.state.itemID,
      itemName: this.state.itemName,
      quantity: this.state.itemQuantity,
      itemPrice: this.state.itemPrice,
    };

    //reset the state variables
    this.setState({
      itemID: "",
      itemName: "",
      itemQuantity: 1,
      itemPrice: "",
    });

    //adds json object to sync storage as string
    var test = SyncStorage.get("currentCustomerOrder");
    SyncStorage.set(
      "currentCustomerOrder",
      test + JSON.stringify(jsonData) + ",\n"
    );

    //rehide the modal
    this.setState({ modalVisible: false });
  };

  //connects to a restaurant by updating SyncStorage variable
  connectToRestaurant = (restID, restName) => {
    var connectedRestID = SyncStorage.get("connectedRestID");
    SyncStorage.set("connectedRestName", restName.toString());
    //the user is connected to the restaurant they are currently viewing
    if (this.state.connectText == "DISCONNECT") {
      const title = "Notice";
      const message =
        "Disconnecting from a restaurant will clear any existing order, are you sure you want to disconnect from " +
        restName +
        "?";
      const buttons = [
        { text: "Cancel", type: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            //update connectedRestID variable, clear customer order and update connectText
            SyncStorage.set("connectedRestID", "noRestConnected");
            SyncStorage.set("currentCustomerOrder", "");
            SyncStorage.set("connectedRestName", "No restaurant connection");
            this.setState({
              connectText: "CONNECT",
            });
          },
        },
        {
          text: "No",
        },
      ];
      Alert.alert(title, message, buttons);
    }

    //the user isn't connected to the restaurant they are currently viewing
    else {
      //the user is not connected to any restaurant
      if (
        connectedRestID == undefined ||
        connectedRestID == "noRestConnected"
      ) {
        SyncStorage.set("connectedRestID", restID.toString());
        this.setState({
          connectText: "DISCONNECT",
        });
        Alert.alert(
          "Connected Successfully",
          "You are now connected to " + restName + "."
        );
      }

      //the user is trying to connect to a new restaurant
      else {
        const title = "Notice";
        const message =
          "Connecting to a new restaurant will clear any existing order, are you sure you want to connect to " +
          restName +
          "?";
        const buttons = [
          { text: "Cancel", type: "cancel" },
          {
            text: "Yes",
            onPress: () => {
              //update connectedRestID variable, clear customer order and update connectText
              SyncStorage.set("connectedRestID", restID.toString());
              SyncStorage.set("currentCustomerOrder", "");
              this.setState({
                connectText: "DISCONNECT",
              });
            },
          },
          {
            text: "No",
          },
        ];
        Alert.alert(title, message, buttons);
      }
    }
  };

  incrementQuantity = () => {
    this.setState({ itemQuantity: this.state.itemQuantity + 1 });
  };
  decrementQuantity = () => {
    if (this.state.itemQuantity > 1) {
      this.setState({ itemQuantity: this.state.itemQuantity - 1 });
    }
  };

  render() {
    const { modalVisible } = this.state;
    const { title } = this.props.route.params;
    const { hours } = this.props.route.params;
    const { address } = this.props.route.params;
    const { city } = this.props.route.params;
    const { description } = this.props.route.params;
    const { restID } = this.props.route.params;

    return (
      <View style={styles.container}>
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
                  this.addItemsToOrder();
                }}
              >
                <Text style={styles.textStyle}>Add to order</Text>
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

        <SafeAreaView style={navStyles.navBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.goBack()}
          >
            <ArrowBack width={35} height={35} />
          </TouchableOpacity>

          <Text style={styles.title}>Restaurant Info</Text>

          <TouchableOpacity
            style={navStyles.orderTab}
            onPress={() => this.props.navigation.navigate("Order")}
          >
            <OrderIcon width={35} height={35} />
          </TouchableOpacity>
        </SafeAreaView>
        <FlatList
          style={styles.restaurantList}
          ListHeaderComponent={
            <>
              <View style={styles.restaurantViewItem}>
                <View style={styles.restaurantImage}></View>
                <Text style={styles.restaurantName}>{title.title}</Text>
                <Text style={styles.restaurantHours}>Hours: {hours.hours}</Text>
                <Text style={styles.restaurantAddress}>
                  {address.address}, {city.city}
                </Text>
              </View>

              <Text style={styles.restaurantDescription}>
                {description.description}
              </Text>

              <Button
                style={styles.connectButton}
                onPress={() =>
                  this.connectToRestaurant(restID.restID, title.title)
                }
              >
                <Text style={{ color: "#FFFFFF" }}>
                  {this.state.connectText}
                </Text>
              </Button>

              <View style={styles.thinRectangle}></View>

              <Text style={styles.drinksHeader}>Drinks</Text>
            </>
          }
          data={this.state.DATA}
          keyExtractor={(item) => item.itemID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.drinksList}
              onPress={() =>
                this.menuItemPressed(
                  item.itemID,
                  item.itemName,
                  item.itemPrice,
                  restID.restID,
                  title.title
                )
              }
            >
              <View style={styles.drinksIcon}></View>
              <Text>{item.itemName} - </Text>
              <Text>${item.itemPrice.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
