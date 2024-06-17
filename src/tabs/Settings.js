import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import {moderateScale} from '../Common/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const name = await AsyncStorage.getItem('NAME');
    setName(name);
  };

  const onPressLogOut = () => {
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.innerview}>
        <Text style={styles.usernameSty}>User Name : {name}</Text>
        <TouchableOpacity style={styles.btn} onPress={onPressLogOut}>
          <Text style={styles.btntext}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  innerview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  btn: {
    backgroundColor: '#24786D',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  btntext: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  usernameSty: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#24786D',
  },
});
