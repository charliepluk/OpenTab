import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F6F6F6",
    height: "80%",
  },

  basicInfoText: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  nameHeader: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
  },

  nameText: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
  },

  emailHeader: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 20,
  },

  emailText: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    width: Dimensions.get("window").width,
  },
});

export { styles };
