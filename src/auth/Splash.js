import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
     checkLogin()
    }, 3000);
  }, []);

  const checkLogin = async()=>{
    const id = await AsyncStorage.getItem("USERID")
    if(id){
      navigation.navigate('Home')
    }else{
      navigation.navigate('Login')
    }  
  }
  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'transparent'}}>
      <View style={styles.main}>
        <Image source={images.splash} />
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 154,
    height: 123,
    resizeMode: 'cover',
  },
});
