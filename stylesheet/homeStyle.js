import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navBar: {
    height: 120,
    backgroundColor: "#FF9466",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },

  navBar: {
    height: 120,
  },

  welcomeContainer: {
    flex: 2,
    backgroundColor: "#F6F6F6",
  },

  titleBox: {
    marginTop: 50,
    alignSelf: "center",
  },

  label: {
    color: "#FF9466",
    fontSize: 30,
    fontWeight: "bold",
  },

  title: {
    color: "#FF9466",
    fontSize: 120,
    fontWeight: "900",
    fontStyle: "italic",
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },

  startContainer: {
    flex: 1,
    backgroundColor: "#FF9466",
    alignContent: "center",
  },

  actionLabel: {
    alignSelf: "center",
    color: "#FEFEFE",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
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
});

export { styles };
