import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
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

  addPressedItemToOrder = (itemID, itemName, itemPrice, restID, restName) => {
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
    } else {
      var jsonData = {
        itemID: itemID,
        itemName: itemName,
        quantity: 1,
        itemPrice: itemPrice,
      };

      //adds json object to sync storage as string
      var test = SyncStorage.get("currentCustomerOrder");
      SyncStorage.set(
        "currentCustomerOrder",
        test + JSON.stringify(jsonData) + ",\n"
      );
    }
  };

  //connects to a restaurant by updating SyncStorage variable
  connectToRestaurant = (restID, restName) => {
    var connectedRestID = SyncStorage.get("connectedRestID");

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

  render() {
    const { title } = this.props.route.params;
    const { hours } = this.props.route.params;
    const { address } = this.props.route.params;
    const { description } = this.props.route.params;
    const { restID } = this.props.route.params;

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
        <FlatList
          style={styles.restaurantList}
          ListHeaderComponent={
            <>
              <View style={styles.restaurantImage}></View>
              <Text style={styles.restaurantName}>{title.title}</Text>
              <Text style={styles.restaurantHours}>Hours: {hours.hours}</Text>
              <Text style={styles.restaurantAddress}>{address.address}</Text>
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
                this.addPressedItemToOrder(
                  item.itemID,
                  item.itemName,
                  item.itemPrice,
                  restID.restID,
                  title.title
                )
              }
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
