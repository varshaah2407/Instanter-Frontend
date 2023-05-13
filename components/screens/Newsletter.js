import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

import Header from '../Header';

const API_KEY = '990047931f88e58615a7767e1c09847e';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
const ALERTS_API_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}&exclude=current,minutely,hourly,daily&units=metric`;
const EARTHQUAKE_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

export default function Newsletter() {
  const [weather, setWeather] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      fetch(`${WEATHER_API_URL}&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
        });

      fetch(`${ALERTS_API_URL}&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          if (data.alerts) {
            setAlerts(data.alerts);
          }
        });

      fetch(`${EARTHQUAKE_API_URL}?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=200`)
        .then(response => response.json())
        .then(data => {
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
        {weather.main ? `Current temperature: ${weather.main.temp}°C` : 'Loading...'}
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
        <Text style={styles.noAlerts}>No severe weather alerts at this time.</Text>
      )}
      {earthquakes.length > 0 ? (
        <View style={styles.alerts}>
          <Text style={styles.alertTitle}>Recent Earthquakes:</Text>
          {earthquakes.map((earthquake, index) => (
            <Text key={index} style={styles.alert}>
              Magnitude {earthquake.properties.mag} - {earthquake.properties.place}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noAlerts}>No recent earthquakes within 200km.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3ebf1',
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  alerts: {
    marginHorizontal: 20,
    backgroundColor: '#f5c6cb',
    padding: 10,
    borderRadius: 5,
  },
  alertTitle: {
    fontWeight: 'bold',
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
});
