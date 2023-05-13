import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import Header from '../Header';

export default function AboutPage({navigation}) {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleText}>
                HOW TO USE THE APP
            </Text>
        <View style={styles.cardContainer}>
            <Text style={styles.tutorial}>
            To report a natural disaster, follow these steps:{"\n"}{"\n"}

            1. Tap the home button located in the bottom navigation bar. {"\n"}{"\n"}
            2. Tap the dropdown for selecting the type of disaster and choose the appropriate natural disaster you are currently experiencing.{"\n"}{"\n"}
            3. Select the number of people who require assistance from the dropdown options.{"\n"}{"\n"}
            4. Use the microphone icon to provide additional information about the current situation of the disaster.{"\n"} Tap the microphone icon again after speaking to generate a voice note.{"\n"}{"\n"}
            5. Tap the report button to submit the disaster report.{"\n"}{"\n"}
            6. While waiting for help to arrive, it is important to follow the given precautionary measures.{"\n"}{"\n"}

            </Text>
        </View>
        <Text style={styles.titleText}>
            SOME PRECAUTIONS DURING 
        </Text>
        <View style={styles.preContainer}>
            <Text style={styles.preTitle}>FLOOD</Text>
            <Text style={styles.tutorial}>
            1. Evacuate immediately if instructed or in low-lying areas.{"\n"}{"\n"}
            2. Avoid walking/driving in floodwaters.{"\n"}{"\n"}
            3. Do not touch electrical equipment or downed power lines.{"\n"}{"\n"}
            4. Store important items in waterproof containers.{"\n"}{"\n"}
            5. Avoid open flames in flooded areas.{"\n"}{"\n"}
            6. Seek medical attention if needed and avoid contact with floodwater.{"\n"}{"\n"}
            7. Avoid wading in floodwater.{"\n"}{"\n"}
            8. Signal for assistance if stranded.{"\n"}{"\n"}
            </Text>
        </View>
        <View style={styles.preContainer}>
            <Text style={styles.preTitle}>LANDSLIDES</Text>
            <Text style={styles.tutorial}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Text>
        </View>
        </ScrollView>
        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e3ebf1'
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
    cardContainer: {
        width: deviceWidth-25, 
        backgroundColor: '#d4e4f1',
        height: 450,
        borderRadius: 20,  
    },
    preTitle: {
        fontSize: 20,
        paddingLeft: 30,
        paddingTop: 15,
        // paddingBottom: 10,
    },
    preContainer: {
        width: deviceWidth-25, 
        height: 430,
        borderRadius: 20,
        marginBottom: 25,
        backgroundColor: 'rgba(199, 215, 230, 0.6)', // adjust opacity to your liking
    paddingHorizontal: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
      }
      
      
});