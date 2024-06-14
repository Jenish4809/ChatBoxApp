import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import {moderateScale} from '../Common/Constant';
import images from '../assets/images';

export default function Home() {
  const CommonButton = ({onPress, source, extra}) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Image source={source} style={extra} />
      </TouchableOpacity>
    );
  };
  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View style={styles.bottomTab}>
          <CommonButton
            title={'User'}
            source={images.user}
            extra={styles.img}
          />
          <CommonButton title={'Chat'} />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomTab: {
    position: 'absolute',
    bottom: moderateScale(0),
    height: moderateScale(50),
    width: '100%',
    backgroundColor: '#24786D',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: 'red',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
});
