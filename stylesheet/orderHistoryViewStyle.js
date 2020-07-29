import { StyleSheet } from "react-native";
//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },

  itemImage: {
    height: "100%",
    width: "17.5%",
    backgroundColor: "#C4C4C4",
  },

  itemInfo: {
    marginLeft: 10,
    width: "55%",
  },

  itemName: {
    fontSize: 25,
  },

  quantityText: {
    fontSize: 12,
  },

  totalPriceText: {
    fontSize: 17,
  },

  priceText: {
    fontSize: 12,
  },

  drinksList: {
    flex: 1,
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

  totalItemPriceView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "27.5%",
  },

  title: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    height: 40,
  },
  restTitle: {
    alignSelf: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    height: 57,
    paddingTop: 20,
  },

  restTitleView: {
    width: "100%",
  },

  orderTotalText: {
    alignSelf: "center",
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    height: 57,
    paddingTop: 10,
  },

  orderTotalView: {
    width: "100%",
  },
});
export { styles };
