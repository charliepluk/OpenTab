import React, { Component } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

// Import Styles
import { navStyles } from "../stylesheet/navbarStyle";
import { styles } from "../stylesheet/settingsStyle";

//Import async-storage functions
import SyncStorage from "sync-storage";

// Import SVGs
import ArrowBack from "../assets/svg/arrow-back.svg";

export default class settings extends Component {
  state = {
    email: SyncStorage.get("userEmail"),
    firstname: SyncStorage.get("userFirstname"),
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={navStyles.navBar}>
          <TouchableOpacity
            style={navStyles.navTab}
            onPress={() => this.props.navigation.goBack()}
          >
            <ArrowBack width={35} height={35} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Text style={styles.basicInfoText}>Basic information</Text>
          <Text style={styles.nameHeader}>Name</Text>
          <Text style={styles.nameText}>{this.state.firstname}</Text>
          <Text style={styles.emailHeader}>Email</Text>
          <Text style={styles.emailText}>{this.state.email}</Text>
        </View>
      </View>
    );
  }
}
