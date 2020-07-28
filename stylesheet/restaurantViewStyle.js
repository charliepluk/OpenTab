import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },

  restaurantList: {
    marginBottom: 20,
  },

  restaurantViewItem: {
    marginBottom: 30,
  },

  restaurantImage: {
    marginTop: 40,
    marginLeft: 30,
    height: 110,
    width: 110,
    backgroundColor: "#C4C4C4",
  },

  restaurantName: {
    fontWeight: "bold",
    marginTop: -100,
    marginLeft: 150,
    fontSize: 24,
  },

  restaurantHours: {
    fontSize: 16,
    marginLeft: 152,
  },

  restaurantAddress: {
    fontSize: 16,
    marginLeft: 152,
    marginBottom: 0,
    paddingBottom: 0,
  },

  restaurantDescription: {
    fontSize: 16,

    marginLeft: 30,
  },

  connectButton: {
    marginTop: 150,
    marginLeft: 70,
    height: 46,
    width: 276,
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: "#FF9466",
  },

  thinRectangle: {
    backgroundColor: "grey",
    marginTop: 30,
    marginLeft: 30,
    height: 2,
    width: 350,
  },

  drinksHeader: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginLeft: 25,
  },

  drinksList: {
    backgroundColor: "#ECECEC",
    marginTop: 20,
    marginLeft: 40,
    padding: 10,
    height: 100,
    width: 325,
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

  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "75%",
    height: "55%",
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
    marginBottom: 15,
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
});

export { styles };
