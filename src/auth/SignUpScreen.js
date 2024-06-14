import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChangeEmail = text => setEmail(text);
  const onChangeName = text => setName(text);
  const onChangeMobile = text => setMobile(text);
  const onChangePassword = text => setPassword(text);
  const onChangeConfirmPassword = text => setConfirmPassword(text);

  const userId = uuid.v4();
  const registerUser = () => {
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        email: email,
        name: name,
        mobile: mobile,
        password: password,
        userId: userId,
      })
      .then(res => {
        Alert.alert('User Registered Successfully');
        navigation.navigate('Login');
        setEmail('');
        setName('');
        setMobile('');
        setPassword('');
        setConfirmPassword('');
      });
  };

  const validate = () => {
    let isValid = true;
    if (!email || !name || !mobile || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      isValid = false;
    } else if (password !== confirmPassword) {
      Alert.alert('Password and Confirm Password should be same');
      isValid = false;
    }
    return isValid;
  };

  const onPressLogin = () => navigation.navigate('Login');
  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View style={styles.innerview}>
          <Text style={styles.title}>SignUpScreen</Text>
          <CTextInput
            title={'Email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={onChangeEmail}
          />
          <CTextInput title={'Name'} value={name} onChangeText={onChangeName} />
          <CTextInput
            title={'Mobile'}
            keyboardType={'phone-pad'}
            value={mobile}
            onChangeText={onChangeMobile}
          />
          <CTextInput
            title={'password'}
            value={password}
            onChangeText={onChangePassword}
          />
          <CTextInput
            title={'Confirm Password'}
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
          />
        </View>
        <CButton
          title={'Sign In'}
          extrabtn={styles.btn}
          extratitle={styles.btntitle}
          onPress={() => {
            if (validate()) {
              registerUser();
            }
          }}
        />
        <TouchableOpacity onPress={onPressLogin}>
          <Text style={styles.login}>Or Login</Text>
        </TouchableOpacity>
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
  btntitle: {
    color: '#797C7B',
  },
  innerview: {
    flex: 1,
    justifyContent: 'center',
  },
  login: {
    alignSelf: 'center',
    color: '#24786D',
    marginVertical: moderateScale(20),
    textDecorationLine: 'underline',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
});
