import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { Dimensions } from 'react-native';
import Header from './Header';

const { height, width } = Dimensions.get('window');

const SOSButton = ({apiData}) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
    // Perform SOS action here
  };

  const waveScale = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0.8, 2],
  });

  const waveOpacity = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0],
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <View   
        style={{
          width: 150,
          height: 150,
          borderRadius: 40,
          
          position: 'relative',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          
          marginTop: width/5,
        }}>
        <Animated.View

          style={{
           
            // position: 'relative',
            
            width: 200,
            height: 200,
            borderRadius: 40,
            borderWidth: 4,
            
            // position: 'relative',

            borderColor: 'white',
            transform: [{ scale: waveScale }],
            opacity: waveOpacity,
          }}
        />

      </View>
      {/* <Text style={{ color: 'white', fontWeight: 'bold' ,padding:20 }}>Report A Disaster</Text> */}
      {/* <Text>I'm another button</Text> */}

    </TouchableOpacity>
  );
};

export default SOSButton;



