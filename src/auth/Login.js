import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import firestore from '@react-native-firebase/firestore';
import {CLoader} from '../Common/CLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CModalLang from '../Common/CModalLang';
import {translation} from '../utils/languages';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [langVisible, setLangVisible] = useState(false);
  const [language, setLanguage] = useState(0);

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
      .then(result => {
        setIsLoading(false);
        if (result.docs.length > 0) {
          const user = result.docs[0].data();
          gotoNext(user.name, user.email, user.userId);
        } else {
          setIsLoading(false);
          Alert.alert('No user found!');
        }
      });
  };

  const saveSelectedLang = async lang => {
    await AsyncStorage.setItem('LANGUAGE', String(lang));
  };

  const gotoNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', String(name)),
      await AsyncStorage.setItem('EMAIL', String(email)),
      await AsyncStorage.setItem('USERID', String(userId));
    navigation.navigate('Home');
  };
  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <MaterialIcons
          name="language"
          size={35}
          color={'#24786D'}
          style={styles.language}
          onPress={() => setLangVisible(!langVisible)}
        />
        <View style={styles.innerview}>
          <Text style={styles.title}>
            {language === 0
              ? translation[0].English
              : language === 1
              ? translation[0].Hindi
              : language === 2
              ? translation[0].Punjabi
              : language === 3
              ? translation[0].Tamil
              : translation[0].Urdu}
          </Text>
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
        <CModalLang
          langVisible={langVisible}
          setLangVisible={setLangVisible}
          onselectLang={lang => {
            setLanguage(lang);
            saveSelectedLang(lang);
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
  language: {
    alignSelf: 'flex-end',
    marginHorizontal: moderateScale(20),
  },
});
