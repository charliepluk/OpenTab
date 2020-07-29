import { StyleSheet } from "react-native";
//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },

  itemImage: {
    height: 60,
    width: 60,
    backgroundColor: "#C4C4C4",
  },

  itemInfo: {
    marginLeft: 10,
  },

  itemName: {
    fontSize: 25,
  },

  quantityText: {
    fontSize: 12,
  },

  totalPriceText: {
    fontSize: 12,
  },

  priceText: {
    fontSize: 12,
  },

  drinksList: {
    backgroundColor: "#ECECEC",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    height: 85,
    width: 375,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },

  title: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    height: 40,
  },
});
export { styles };
