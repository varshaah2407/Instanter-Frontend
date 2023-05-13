import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import * as Location from "expo-location";

import Header from "../Header";

export default function Map({navigation}) {
    const [mapRegion, setMapRegion] = useState({
        latitude: 28.57966,
        longitude: 77.32111,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    
      const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
    
        let location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        console.log(location.coords.latitude, location.coords.longitude);
      };
    
      useEffect(() => {
        userLocation();
      }, []);
    
    return (
        <View style={styles.container}>
            {/* <Header /> */}
            {/* <Text onPress={() => navigation.navigate('Home')}>
                Map Screen
            </Text> */}
            <MapView style={styles.map} region={mapRegion}>
                <Marker coordinate={mapRegion} title="Marker" />
                <Marker coordinate={{ latitude: 19.113646, longitude: 72.869736 }} pinColor={'blue'} title="Marker 1" />
                <Marker coordinate={{ latitude: 18.923950, longitude: 72.833267 }} pinColor={'blue'} title="Marker 2" />
            </MapView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
        backgroundColor: '#e3ebf1'
    },
    map: {
        width: "100%",
        height: "100%",
      },
})