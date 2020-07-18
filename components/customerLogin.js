import React, { Component } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../stylesheet/customerLogin-Signup";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import * as EmailValidator from "email-validator";
import { getData, storeData } from "../AsyncFunctions.js";

export default class CustomerLogin extends Component {
  state = {
    email: "cam@gmail.com",
    password: "test",
  };

  verifyLogin = () => {
    if (!EmailValidator.validate(this.state.email)) {
      Alert.alert(
        "Check email",
        "The email you entered is not valid, please try again."
      );
    } else {
      axios
        .post("http://192.168.1.20:3000/requestRoutes/verifyLogin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          //if: account doesn't exist
          if (res.data === "accountDoesntExist") {
            Alert.alert(
              "Account doesn't exist",
              "The email you input isn't registered with an OpenTab account."
            );
          }
          //else if: the password for the email is incorrect
          else if (res.data === "incorrectPassword") {
            Alert.alert(
              "Incorrect Password",
              'The password you entered for:\n"' +
                this.state.email +
                '", is incorrect, please try again.'
            );
          }
          //if: DB returned an error
          else if (res.data == "err") {
            Alert.alert(
              "Error",
              `An unexpected error occured, sorry about that!`
            );
          }
          //else: successful login, returns customerID from DB and the email, password is omitted
          else {
            this.props.navigation.navigate("Home");
            //storeData(res.data[0].customerID.toString());
            storeData("2");
            //console.log(getData());
          }
        })
        //catch any errors from the post call
        .catch((err) => {
          console.log("ERROR OCCURED: ");
          console.log(err);
        });
    }
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

        <TouchableOpacity
          onPress={() => console.log("Forgot password text clicked")}
        >
          <Text style={styles.forgotpasswordHeader}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.plainTextHeader}>New to OpenTab?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CustomerSignup")}
          >
            <Text style={styles.signupHeader}>Sign up!</Text>
          </TouchableOpacity>
        </View>

        <Button
          style={styles.button}
          //onPress={() => this.props.navigation.navigate("Home")}
          onPress={this.verifyLogin}
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
