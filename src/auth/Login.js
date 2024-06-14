import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import firestore from '@react-native-firebase/firestore';
import {CLoader} from '../Common/CLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = text => setEmail(text);
  const onChangePassword = text => setPassword(text);

  if (isLoading) {
    return <CLoader />;
  }

  const onpressLogin = () => navigation.navigate('SignUpScreen');
  const loginUser = () => {
    setIsLoading(true);
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setIsLoading(false);
        setIsLoading(false);
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            gotoNext(
              documentSnapshot.data().email,
              documentSnapshot.data().name,
              documentSnapshot.data().userId,
            );
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data().email,
            );
          });
        } else {
          setIsLoading(false);
          Alert.alert('No user found!');
        }
      });
  };

  const gotoNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name),
      await AsyncStorage.setItem('EMAIL', email),
      await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Home')
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
