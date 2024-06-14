import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from '../Common/Constant';

export default function Users() {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>ChatBox Chat App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: moderateScale(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#24786D',
  },
});
