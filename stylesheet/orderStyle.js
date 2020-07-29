import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },

  title: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontSize: 20,
    fontWeight: "bold",
    height: 57,
  },

  restTitle: {
    alignSelf: "center",
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    height: 57,
    paddingTop: 10,
  },

  restView: {
    width: "100%",
  },

  close: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },

  orderList: {
    backgroundColor: "#F6F6F6",
    width: "100%",
  },

  item: {
    backgroundColor: "#e0e0e0",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    height: 80,
    display: "flex",
    flexDirection: "row",
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

  buttonContainer: {
    backgroundColor: "#FF9466",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  button: {
    backgroundColor: "#F6F6F6",
    color: "#FF9466",
    width: 276,
    height: 46,
    justifyContent: "center",
    borderRadius: 0,
    alignSelf: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "75%",
    height: "64%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "stretch",
    elevation: 50,
  },
  modalButton: {
    backgroundColor: "#FF9466",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },

  modalItemName: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  modalQuantityText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 15,
  },

  drinksList: {
    backgroundColor: "#ECECEC",
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    height: 85,
    width: 375,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
  drinksIcon: {
    backgroundColor: "#C4C4C4",
    marginBottom: 10,
    height: 80,
    width: 80,
    borderRadius: 10,
  },
});
export { styles };
