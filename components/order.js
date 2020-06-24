import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

import CloseIcon from "../assets/svg/close.svg";

const DATA = [
  {
    id: "0",
    name: "Budweiser",
    quantity: "3",
    price: "6.50",
  },
  {
    id: "1",
    name: "Budlight",
    quantity: "2",
    price: "3",
  },
];

function OrderItem({ name, quantity, price }) {
  return (
    <TouchableOpacity
      onPress={() => console.log("Order Item Pressed")}
      style={styles.item}
    >
      <View style={styles.itemImage}></View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.quantityText}>QTY: {quantity}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Order extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => this.props.navigation.goBack()}
          >
            <CloseIcon width={35} height={35} />
          </TouchableOpacity>

          <Text style={styles.title}>Your Order</Text>
        </SafeAreaView>

        <FlatList
          style={styles.orderList}
          data={DATA}
          renderItem={({ item }) => (
            <OrderItem
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.buttonContainer}>
          <Button style={styles.button}>
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
    height: 140,
    width: "100%",
    backgroundColor: "#FF9466",
  },

  title: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
  },

  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },

  orderList: {
    backgroundColor: "#FF9466",
    width: "100%",
  },

  item: {
    backgroundColor: "#ECECEC",
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

  priceText: {
    fontSize: 12,
  },

  buttonContainer: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#FF9466",
    color: "#FF9466",
    width: 276,
    height: 46,
    justifyContent: "center",
    borderRadius: 0,
    alignSelf: "center",
  },
});
