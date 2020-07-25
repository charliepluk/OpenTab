import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

import CloseIcon from "../assets/svg/close.svg";
import SyncStorage from "sync-storage";

function ProfileScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("focused");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return <View />;
}

function OrderItem({ name, price }) {
  console.log("name: " + name);
  return (
    <TouchableOpacity
      onPress={() => console.log("Order Item Pressed")}
      style={styles.item}
    >
      <View style={styles.itemImage}></View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default class Order extends Component {
  state = {};

  componentDidMount() {
    //gets json obj as string from sync strage and turns it into array of json obj
    var test = SyncStorage.get("currentCustomerOrder");
    console.log(test);
    var char = ",\n";
    var i = 0;
    var j = 0;
    var testArray = [];
    var count = 0;
    while ((j = test.indexOf(char, i)) !== -1) {
      testArray.push(JSON.parse(test.substring(i, j)));
      count++;
      i = j + 1;
    }
    //console.log(JSON.stringify(testArray));
    this.setState({
      orderData: testArray,
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
            <CloseIcon width={35} height={35} />
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
              // quantity={item.quantity}
              price={item.itemPrice}
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
