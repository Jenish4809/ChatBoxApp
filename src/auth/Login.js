import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import firestore from '@react-native-firebase/firestore';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = text => setEmail(text);
  const onChangePassword = text => setPassword(text);

  const onpressLogin = () => navigation.navigate('SignUpScreen');
  const loginUser = () => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
          });
        } else {
          Alert.alert('No user found!');
        }
      });
  };
  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View style={styles.innerview}>
          <Text style={styles.title}>Log in</Text>
          <CTextInput
            title={'Email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={onChangeEmail}
          />
          <CTextInput
            title={'password'}
            value={password}
            onChangeText={onChangePassword}
          />
        </View>
        <CButton
          title={'Log in'}
          extrabtn={styles.btn}
          extratitle={styles.btntitle}
          onPress={loginUser}
        />
        <TouchableOpacity onPress={onpressLogin}>
          <Text style={styles.login}>Or SignUp</Text>
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
    backgroundColor: '#24786D',
    marginVertical: moderateScale(0),
    marginTop: moderateScale(20),
  },
  btntitle: {
    color: '#fff',
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
