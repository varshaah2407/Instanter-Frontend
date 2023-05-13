

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import * as Location from "expo-location";

import Header from "../Header";

const API_KEY = "990047931f88e58615a7767e1c09847e";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const ALERTS_API_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}&exclude=current,minutely,hourly,daily&units=metric`;
const EARTHQUAKE_API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

export default function Newsletter() {
  const [weather, setWeather] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      fetch(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        });

      fetch(`${ALERTS_API_URL}&lat=${latitude}&lon=${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.alerts) {
            setAlerts(data.alerts);
          }
        });

      fetch(
        `${EARTHQUAKE_API_URL}?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=200`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features) {
            setEarthquakes(data.features);
          }
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>
        {weather.main
          ? `Current temperature: ${weather.main.temp}°C`
          : "Loading..."}
      </Text>
      {alerts.length > 0 ? (
        <View style={styles.alerts}>
          <Text style={styles.alertTitle}>Severe Weather Alerts:</Text>
          {alerts.map((alert, index) => (
            <Text key={index} style={styles.alert}>
              {alert.event}: {alert.description}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noAlerts}>
          No severe weather alerts at this time.
        </Text>
      )}
      {earthquakes.length > 0 ? (
        <View style={styles.alerts}>
          <Text style={styles.alertTitle}>Recent Earthquakes:</Text>
          {earthquakes.map((earthquake, index) => (
            <Text key={index} style={styles.alert}>
              Magnitude {earthquake.properties.mag} -{" "}
              {earthquake.properties.place}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noAlerts}>No recent earthquakes within 200km.</Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>LATEST NDRF RESCUES</Text>
        <View style={styles.preContainer}>
          <Text style={styles.preTitle}>During Flood in Maharastra</Text>
          <Text style={styles.tutorial}>
          According to local authorities, the town's river reached record-breaking levels, Emergency services, including the National Disaster Response Force (NDRF), have been deployed to the area to assist with rescue operations and provide aid to those affected by the disaster.

As of now,  at least 10,000 people have been forced to evacuate their homes, seeking shelter in temporary relief camps set up by the government. Many roads and bridges have been washed away, making it difficult for rescue workers to reach remote areas of the town.


          </Text>
        </View>
        <View style={styles.preContainer}>
          <Text style={styles.preTitle}>During Landslides in Sikkim</Text>
          <Text style={styles.tutorial}>
        
It was reported that at least 10,000 people have been forced to evacuate their homes, seeking shelter in temporary relief camps set up by the government. Many roads and bridges have been washed away, making it difficult for rescue workers to reach remote areas of the town.

The situation in Riverside remains dire, with officials warning that the floodwaters may not recede for several days. The NDRF has urged residents to take precautions and follow safety protocols to avoid any further loss of life or property damage.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e3ebf1",
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  alerts: {
    marginHorizontal: 20,
    backgroundColor: "#f5c6cb",
    padding: 10,
    borderRadius: 5,
  },
  alertTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  alert: {
    fontSize: 14,
    marginBottom: 3,
  },
  noAlerts: {
    fontSize: 16,
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    paddingTop: 45,
    paddingBottom: 20,
    paddingLeft: 30,
  },
  tutorial: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  preTitle: {
    fontSize: 20,
    paddingLeft: 30,
    paddingTop: 15,
    // paddingBottom: 10,
  },
  preContainer: {
    width: deviceWidth - 25,
    height: 430,
    borderRadius: 20,
    marginBottom: 25,
    backgroundColor: "rgba(199, 215, 230, 0.6)", // adjust opacity to your liking
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
