import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F6F6F6",
    height: "100%",
  },

  item: {
    backgroundColor: "#ECECEC",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    height: 100,
    display: "flex",
    flexDirection: "row",
  },

  restaurantImage: {
    height: 80,
    width: 80,
    backgroundColor: "#C4C4C4",
  },

  restaurantInfo: {
    marginLeft: 10,
  },

  restaurantTitle: {
    fontSize: 25,
  },

  infoText: {
    fontSize: 12,
  },
});

export { styles };
