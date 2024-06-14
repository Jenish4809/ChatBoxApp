import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {moderateScale} from './Constant';

export default function CTextInput(props) {
  let {onChangeText, value, keyboardType, title} = props;
  return (
    <View>
      <Text style={styles.titlesty}>{title}</Text>
      <TextInput
        style={styles.inputsty}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputsty: {
    borderColor: '#CDD1D0',
    borderBottomWidth: moderateScale(1),
    width: moderateScale(327),
    alignSelf: 'center',
    fontSize: moderateScale(16),
    padding: moderateScale(10),
  },
  titlesty: {
    fontSize: moderateScale(14),
    color: '#24786D',
    marginLeft: moderateScale(30),
    marginTop: moderateScale(25),
  },
});
