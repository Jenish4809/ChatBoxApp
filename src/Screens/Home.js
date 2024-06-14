import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import {moderateScale} from '../Common/Constant';
import images from '../assets/images';
import Users from '../tabs/Users';
import Settings from '../tabs/Settings';

export default function Home() {
  const [selectedTab, setSelectedTab] = React.useState(0);
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
        {selectedTab === 0 ? <Users /> : <Settings />}
        <View style={styles.bottomTab}>
          <CommonButton
            onPress={() => setSelectedTab(0)}
            title={'User'}
            source={images.user}
            extra={[
              styles.img,
              {tintColor: selectedTab === 0 ? '#fff' : '#000'},
            ]}
          />
          <CommonButton
            onPress={() => setSelectedTab(1)}
            title={'Chat'}
            source={images.setting}
            extra={[
              styles.img,
              {tintColor: selectedTab === 1 ? '#fff' : '#000'},
            ]}
          />
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
    backgroundColor: '#24786D',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: moderateScale(30),
    width: moderateScale(30),
    color: 'white',
  },
});
