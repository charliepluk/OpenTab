import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../stylesheet/styles";

export default class App extends Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Open up your tab</Text>

        <Text style={styles.emailHeader}>EMAIL ADDRESS</Text>

        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          selectionColor="#FF9466"
          underlineColor="#F1F1F1"
        />

        <Text style={styles.passwordHeader}>PASSWORD</Text>

        <TextInput
          style={styles.passwordInput}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          selectionColor="#FF9466"
          underlineColor="#F1F1F1"
        />

        <Text style={styles.forgotpasswordHeader}>Forgot Password?</Text>

        <Button
          style={styles.button}
          onPress={() => console.log("Login button is pressed")}
          mode="contained"
          compact="true"
          color="#FF9466"
        >
          <Text style={{ color: "white" }}>Login</Text>
        </Button>
      </View>
    );
  }
}
