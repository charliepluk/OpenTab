import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

// Import SVGs
import LogOut from "../assets/svg/logout.svg";
import HomeIcon from "../assets/svg/home.svg";
import HistoryIcon from "../assets/svg/orderHistory.svg";
import AccountIcon from "../assets/svg/account.svg";

//Import async-storage functions
import SyncStorage from "sync-storage";

export default function DrawerContent(props) {
  state = {
    firstName: SyncStorage.get("userFirstname"),
  };
  return (
    <View style={styles.drawer}>
      <SafeAreaView style={styles.nameSection}>
        <Text style={styles.greeting}>Hi, {this.state.firstName}</Text>
      </SafeAreaView>
      <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
        <View>
          <DrawerItem
            icon={() => <HomeIcon width={20} height={20} />}
            style={styles.drawerItem}
            label={() => (
              <Text style={{ color: "#FF9466", fontWeight: "bold" }}>Home</Text>
            )}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            icon={() => <HistoryIcon width={20} height={20} />}
            style={styles.drawerItem}
            label={() => (
              <Text style={{ color: "#FF9466", fontWeight: "bold" }}>
                Order History
              </Text>
            )}
            onPress={() => {
              props.navigation.navigate("OrderHistory");
            }}
          />
          <DrawerItem
            icon={() => <AccountIcon width={20} height={20} />}
            style={styles.drawerItem}
            label={() => (
              <Text style={{ color: "#FF9466", fontWeight: "bold" }}>
                Account Info
              </Text>
            )}
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.signOutSection}>
        <DrawerItem
          icon={() => <LogOut width={20} height={20} />}
          label={() => (
            <Text style={{ color: "#FF9466", fontWeight: "bold" }}>
              Log Out
            </Text>
          )}
          onPress={() => {
            SyncStorage.set("userID", "noUser");
            SyncStorage.set("connectedRestID", "noRestConnected");
            SyncStorage.set("currentCustomerOrder", "");
            SyncStorage.set("userFirstname", "");
            SyncStorage.set("connectedRestName", "No restaurant connection");
            props.navigation.navigate("LandingPage");
          }}
        />
      </View>
    </View>
  );
}

//props.navigation.navigate("LandingPage")
const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#F6F6F6",
    flex: 1,
  },

  nameSection: {
    justifyContent: "flex-end",
    height: 130,
    backgroundColor: "#FF9466",
  },

  greeting: {
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 20,
  },

  drawerContent: {
    flex: 1,
    paddingTop: 0,
    borderTopColor: "#F6F6F6",
  },

  drawerItem: {
    marginBottom: 0,
    marginTop: 0,
    justifyContent: "center",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  signOutSection: {
    paddingTop: 10,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
});
