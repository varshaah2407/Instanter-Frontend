import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../Header";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#e3ebf1",
  },
});
