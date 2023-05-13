import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

export default function AudioTest() {

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");


async function startRecording() {
  try {
    ////console.log("Requesting permissions..");
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    //console.log("Starting recording..");
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
    //console.log("Recording started");
  } catch (err) {
    console.error("Failed to start recording", err);
  }
}

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
  
    });

    let b = await fetch(recording?._uri).then((r) =>  r.blob());
    var file = new File([b], "abc.webm",{type:"audio/webm", lastModified:new Date().getTime()})
    //console.log(file);
    let form_data = new FormData();
    form_data.append('file',file);
    fetch('http://127.0.0.1:5000/file',{
     method: 'POST',
     body: form_data,


    }).then ( val => {
      //console.log(val,"val")
    }).catch(err=> console.log(JSON.stringify(err)))

    
    
    //console.log(recording);
    // const obj = {
    //   config: {
    //     sampleRate: recording?._options?.android?.sampleRate,
    //     // sampleRate: recording?._options?.android?.sampleRate,
    //     // sampleRate: recording?._options?.android?.sampleRate,
    //     // sampleRate: recording?._options?.android?.sampleRate,

    //   },
    //   audio: {
    //     uri: recording?._uri,
    //   },
    // };

    // axios.post("", obj);
    //console.log(b, "b");
    // //console.log(obj, "obj");

  //  const obj  = {
    
  //     config: {
        
  //         encoding: recording?._encoding,
  //         sampleRate: recording.sampleRate,
  //     },
  //     audio: {
  //         uri: recording?._uri,
  //     }
  // }

  

  // // //console.log(obj); 
  // //   // const obj = {
  // //   //   config: {
  // //   //     spampleRate: recording.spampleRate,
  // //   //   },
  // //   //   audio: {
  // //   //     uri: recording?._uri,
  // //   //   },
  // //   // };
  //   //console.log(b);

    const uri = recording.getURI();
    //console.log({uri});
    //console.log("Recording stopped and stored at", uri);

    setRecordings(updatedRecordings);
}



 

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}> {index + 1}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          
        </View>
      );
    });
  }

  return (
    <View style={styles.container_a}>
      {/* <Text>{message}</Text> */}
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
        {/* icon={<FontAwesome name = {recording ? 'stop': 'microphone'} size = {24} color = "white" />}
       */}
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container_a: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#e3ebf1',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  },

  // recordButton: {
  //   backgroundColor : recording ? '#e74c3c' : '#2ecc71',
  //   borderRadius: 50,
  //   width: 64,
  //   height : 64,
  //    alignItems : 'center',
  //    justifyContent:'center',
  //    marginBottom: 16,
  


  }
);
