import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import Header from '../Header';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponentTwo from '../DropDownTwo';
import AudioTest from "../AudioTest";
import SOSButton from '../SOSButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

  // Define the dropdown data for disaster types and number of people
  const data1 = [
    { label: 'Landslide', value: '1' },
    { label: 'Flood', value: '2' },
    { label: 'Earthquake', value: '3' },
    { label: 'Fire', value: '4' },
    { label: 'Cyclone', value: '5' },
    { label: 'Other', value: '6' },
  ];

  const data2 = [
    { label: '1-10', value: '1' },
    { label: '10-50', value: '2' },
    { label: '50-150', value: '3' },
    { label: '150-400', value: '4' },
    { label: '400-900', value: '5' },
    { label: '900+', value: '6' },
  ];

  // Define state variables for the selected disaster type, number of people, and recordings
  const [selectedDisasterType, setSelectedDisasterType] = useState(null);
  const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState(null);
  const [recordings, setRecordings] = useState([]);

  const addDisaster =  () =>{
    var data = JSON.stringify({
      "type": selectedDisasterType,
      "people": selectedNumberOfPeople,
      // "audio":recordings.pop()
    });
    console.log(data);
    let id = AsyncStorage.getItem('id').then(res=>{
      console.log('res id :',res);
      var config = {
        method: 'post',
        url: `https://disaster-management-project-default-rtdb.asia-southeast1.firebasedatabase.app/users/${res}/disaster.json`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
  
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }

  // Handle the button press for sending an SOS
  const handleSOSButtonPress = () => {
    console.log(`Audio Files: ${recordings}`);
    console.log(`Disaster type: ${selectedDisasterType}`);
    console.log(`Number of people: ${selectedNumberOfPeople}`);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container2}>
        <Text style={styles.texting}>REPORT A DISASTER</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.textin}>Type of Disaster:</Text>
        <DropdownComponentTwo data={data1} state={selectedDisasterType} setState={setSelectedDisasterType} />
      </View>
      <View style={styles.container3}>
        <Text style={styles.textin}>Number of People Need Help:</Text>
        <DropdownComponentTwo data={data2} state={selectedNumberOfPeople} setState={setSelectedNumberOfPeople} />
      </View>
      <View style={styles.container3}>
        <Text style={styles.textin}>Description:</Text>
      </View>
      <View style = {styles.container4}>
        <AudioTest recordings={recordings} setRecordings={setRecordings} />
      </View>
       <View >
      <Button title='Report'  onPress={addDisaster} />
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3ebf1',
    height: height,
    width: width,
    margin: 0.7,
    flex: 1,
  },
  texting: {
    color: '#e81e25',
    fontWeight: 'bold',
    fontSize: 25,
  },
  container2: {
    width: width,
    height: height / 9,
    justifyContent: 'center',
    alignItems: 'center'
   
  },

    container3: {
        width: width,
        height: height/8,
    },
    textin: {
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        
    },
    container4: {
      borderRadius:20,
      paddingTop: 20,
      width: 700,
      marginLeft: 20,
      paddingTop:120,  

    },
   audio: {
    paddingTop:20,
   }
})

export default HomeScreen;
