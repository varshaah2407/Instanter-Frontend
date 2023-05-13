import React from "react";
import AppIcon from "../assets/appIcon.png";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={AppIcon} />
      <Text style={styles.baseText}>
        INSTAN
        <Text style={styles.innerText}> TER</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    // fontFamily: 'Quicksand',
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    marginHorizontal: width / 7,
  },
  innerText: {
    // fontFamily: 'Quicksand',
    color: "red",
    fontWeight: "bold",
  },
  container: {
    marginTop: 10,

    flexDirection: "row",
    width: width,
    alignItems: "center",
    height: height / 10,
    backgroundColor: "#474747",
  },
  icon: {
    width: width / 6,
    height: height / 10,
  },
  titleText: {
    flex: 1,
    textAlign: "center",
    // fontFamily: 'Quicksand',
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});

export default Header;
