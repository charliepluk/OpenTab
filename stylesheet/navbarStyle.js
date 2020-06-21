import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeNavBar: {
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  navBar: {
    height: 120,
    backgroundColor: "#FF9466",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  navTab: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    marginTop: 10,
    marginLeft: 20,
  },

  orderTab: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    marginTop: 10,
    marginRight: 20,
  },
});

export { styles };
