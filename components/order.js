import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

import CloseIcon from "../assets/svg/close.svg";
import SyncStorage from "sync-storage";

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
    //gets json obj as string from sync strage and turns it into array of json obj
    var customerOrderString = SyncStorage.get("currentCustomerOrder");
    var char = ",\n";
    var i = 0;
    var j = 0;
    var customerOrderArray = [];
    var count = 0;

    //takes each line from the customerOrderString, parses it into a JSON obj and pushes it into the array
    while ((j = customerOrderString.indexOf(char, i)) !== -1) {
      customerOrderArray.push(JSON.parse(customerOrderString.substring(i, j)));
      count++;
      i = j + 1;
    }

    //condenses the customerOrderArray into an array where the same items merge into a single object with the proper quantity
    var arrLength = customerOrderArray.length;
    var uniqueValues = [];
    var reducedArray = [];
    var completedIDs = [];
    var currentID = 0;
    var checkedAgainstID = 0;
    var countItem = 0;
    for (i = 0; i < arrLength; i++) {
      checkedAgainstID = customerOrderArray[i].itemID;
      if (!completedIDs.includes(checkedAgainstID)) {
        completedIDs.push(checkedAgainstID);
        for (j = 0; j < arrLength; j++) {
          currentID = customerOrderArray[j].itemID;
          if (checkedAgainstID == currentID) {
            countItem++;
          }
        }
        //create object with proper quantity for item (checkedAgainstID)
        var condensedItem = {
          itemID: checkedAgainstID,
          itemName: customerOrderArray[i].itemName,
          quantity: countItem,
          itemPrice: customerOrderArray[i].itemPrice,
          totalPrice: countItem * customerOrderArray[i].itemPrice,
        };
        reducedArray.push(condensedItem);
        countItem = 0;
      }
    }
    console.log(reducedArray);

    this.setState({
      orderData: reducedArray,
    });
  }

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
          <Button
            style={styles.button}
            onPress={() =>
              console.log("From order page: " + currentCustomerOrder)
            }
          >
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
