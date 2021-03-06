import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9466",
    alignContent: "space-between",
  },

  firstLine: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 50,
    paddingTop: 100,
    paddingLeft: 50,
    color: "#FFFFFF",
  },

  secondLine: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 3,
    paddingTop: 3,
    paddingLeft: 50,
    color: "#FFFFFF",
  },

  thirdLine: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 90,
    paddingTop: 90,
    paddingLeft: 50,
    color: "#FFFFFF",
  },

  fourthLine: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 3,
    paddingTop: 1,
    paddingLeft: 50,
    color: "#FFFFFF",
  },

  pageContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    height: 210,
    width: 500,
    marginTop: 30,
  },

  loginButton: {
    flex: 0,
    marginTop: 35,
    marginLeft: 69,
    height: 55,
    width: 270,
    justifyContent: "center",
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#FF9466",
  },

  signupButton: {
    flex: 0,
    marginTop: 35,
    marginLeft: 69,
    height: 55,
    width: 270,
    justifyContent: "center",
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#FF9466",
  },
});

export { styles };
