import { StyleSheet } from "react-native";

const navStyles = StyleSheet.create({
  homeNavBar: {
    height: 110,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  navBar: {
    height: 110,
    backgroundColor: "#FF9466",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

  navTab: {
    height: 35,
    width: 35,
    marginTop: 10,
    marginLeft: 20,
  },

  orderTab: {
    height: 35,
    width: 35,
    marginTop: 10,
    marginRight: 20,
  },
});

export { navStyles };
