import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import CKeyboardAvoidWrapper from '../Common/CKeyboardAvoidWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Screen1({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');

  const onChangeEmail = text => setEmail(text);
  const onChangeName = text => setName(text);
  const onChangeMobile = text => setMobile(text);
  const onChangeGender = text => setGender(text);

  const validate = () => {
    let isValid = true;
    if (!email || !name || !mobile || !gender) {
      Alert.alert('All fields are required');
      isValid = false;
    } else if (!email.includes('@')) {
      Alert.alert('Invalid email');
      isValid = false;
    }
    return isValid;
  };

  const getUserData = async () => {
    const data = {
      email: email,
      name: name,
      mobile: mobile,
      gender: gender,
    };
    await AsyncStorage.setItem('USERDATA', JSON.stringify(data));
    Alert.alert('Data saved successfully');
    navigation.navigate('Screen2');
  };

  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <CKeyboardAvoidWrapper>
          <View style={styles.innerview}>
            <Text style={styles.title}>User Data</Text>
            <CTextInput
              title={'Email'}
              keyboardType={'email-address'}
              value={email}
              onChangeText={onChangeEmail}
            />
            <CTextInput
              title={'Name'}
              value={name}
              onChangeText={onChangeName}
            />
            <CTextInput
              title={'Mobile'}
              keyboardType={'phone-pad'}
              value={mobile}
              onChangeText={onChangeMobile}
            />
            <CTextInput
              title={'Gender'}
              value={gender}
              onChangeText={onChangeGender}
            />
          </View>
        </CKeyboardAvoidWrapper>
        <CButton
          title={'Save'}
          onPress={() => {
            if (validate()) {
              getUserData();
            }
          }}
        />
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: moderateScale(18),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  btn: {
    backgroundColor: '#F3F6F6',
    marginVertical: moderateScale(0),
    marginTop: moderateScale(20),
  },

  innerview: {
    flex: 1,
    justifyContent: 'center',
    marginTop: moderateScale(100),
  },
});
