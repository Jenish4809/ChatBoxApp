import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import images from '../assets/images';

const CRadioButton = ({selected, onPress, label}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {selected ? (
        <Image source={images.radio} style={styles.img} />
      ) : (
        <Image source={images.radiobutton} style={styles.img} />
      )}
      <Text style={[styles.label, selected && styles.newLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#24786D',
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
  newLabel: {
    color: '#24786D',
  },
  img: {
    height: 35,
    width: 35,
    marginRight: 10,
    tintColor: '#24786D',
  },
});

export default CRadioButton;
