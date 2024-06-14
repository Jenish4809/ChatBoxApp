import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from './Constant';

export default function CButton({title, onPress, extratitle, extrabtn}) {
  return (
    <TouchableOpacity style={[styles.btn, extrabtn]} onPress={onPress}>
      <Text style={[styles.titlesty, extratitle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#24786D',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(48),
    width: moderateScale(327),
    borderRadius: moderateScale(16),
    marginVertical: moderateScale(20),
    alignSelf: 'center',
  },
  titlesty: {
    fontSize: moderateScale(16),
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
