import React, { useState } from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const { height, width } = Dimensions.get('window');

// const data = [
//     { label: '1-10', value: '1' },
//     { label: '10-50', value: '2' },
//     { label: '50-150', value: '3' },
//     { label: '150-400', value: '4' },
//     { label: '400-900', value: '5' },
//     { label: '900+', value: '6' },
//   ]
const DropdownComponentTwo = ({data, setState, state}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
         
        </Text>
      );
    }
    return null;
  };

  console.log(data);

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
            
          />
        )}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
   
    // padding: 16,
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 200,
    backgroundColor: '#474747',
    marginLeft:20,
    
 
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 20,

  },
  placeholderStyle: {
   
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    width: 200,
    fontSize: 16,
  },
});

export default DropdownComponentTwo;