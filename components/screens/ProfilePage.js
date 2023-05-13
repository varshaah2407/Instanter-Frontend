import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";

import Header from "../Header";
export default function ProfilePage({navigation}) {
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    return (
     
        <View style={styles.container}>
            <Header />
            {/* <Text onPress={() => navigation.navigate('Home')}>
                Profile page Screen
            </Text> */}
            <StatusBar style="auto" />
      <View style={styles.back}></View>
      {/* <View
        style={{
          padding: 10,
          width: "100",
          backgroundColor: "#000",
          height: 150,
        }}
      ></View> */}
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/profile-pic.png")}
          style={{
            width: 160,
            height: 160,
            borderRadius: 100,
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        ></Image>
      </View>
      <SafeAreaView>
        <View style={styles.inputcontainer}>
          <Text style={styles.inputtext}>Location: </Text>
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.inputtext}>Name: </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Name"
            keyboardType="text"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.inputtext}>Phone Number: </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Number"
            keyboardType="numeric"
          />
        </View>
      </SafeAreaView>
        </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
      },
    
      inputtext: {
        textDecorationStyle: "solid",
        fontWeight: 500,
        fontSize: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 25,
        marginHorizontal: -120,
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        marginHorizontal: -120,
      },
})