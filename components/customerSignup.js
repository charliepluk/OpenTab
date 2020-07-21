import React, { Component } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../stylesheet/customerLogin-Signup";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import * as EmailValidator from "email-validator";
import SyncStorage from "sync-storage";

export default class customerSignup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  //Sends data entered by the user to server to create a new account
  createAccount = () => {
    //if passwords match and valid email is entered, create post request to server to create account
    if (
      this.state.password === this.state.confirmPassword &&
      EmailValidator.validate(this.state.email)
    ) {
      axios
        .post("http://10.0.0.27:3000/requestRoutes/createAccount", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          //if the email has already been registered in the DB
          if (res.data === "dupEmail") {
            Alert.alert(
              "Account already exists",
              "The email you entered is already registered with an OpenTab account, please try another email."
            );
          }
          //else if err from db alert an error occured
          else if (res.data === "err") {
            Alert.alert(
              "Error Occured",
              "An error occured while trying to create your account."
            );
          }
          //else the account was successfully created
          else {
            //store the returned user information in Sync-storage
            SyncStorage.set("userID", res.data[0].customerID.toString());
            SyncStorage.set("userEmail", res.data[0].customerEmail.toString());
            this.props.navigation.navigate("Home");
          }
        })
        .catch((err) => {
          console.log("ERROR OCCURED: ");
          console.log(err);
        });
      //check if email is valid
    } else if (!EmailValidator.validate(this.state.email)) {
      Alert.alert(
        "Check email",
        "The email you entered is not valid, please try again."
      );
      //check if passwords match
    } else if (!(this.state.password === this.state.confirmPassword)) {
      Alert.alert(
        "Check passwords",
        "The passwords you entered don't match, please try again."
      );
    }
  };

  //Render method

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Start up your tab</Text>

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

        <Text style={styles.passwordHeader}>CONFIRM PASSWORD</Text>

        <TextInput
          style={styles.passwordInput}
          secureTextEntry={true}
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          selectionColor="#FF9466"
          underlineColor="#F1F1F1"
        />

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.plainTextHeader}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CustomerLogin")}
          >
            <Text style={styles.signupHeader}>Sign in!</Text>
          </TouchableOpacity>
        </View>

        <Button
          style={styles.button}
          onPress={this.createAccount}
          mode="contained"
          compact="true"
          color="#FF9466"
        >
          <Text style={{ color: "white" }}>SIGN UP</Text>
        </Button>
      </View>
    );
  }
}
