import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale} from '../Common/Constant';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../assets/images';

export default function Users({navigation}) {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let tempData = [];
    const emailId = await AsyncStorage.getItem('NAME');
    firestore()
      .collection('Users')
      .where('email', '!=', emailId)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.forEach(doc => {
            tempData.push(doc.data());
          });
          setUsers(tempData);
        }
      });
  };

  const renderUsers = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderview}
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Image source={images.user} style={styles.userimg} />
        <Text style={styles.username}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>ChatBox Chat App</Text>
      </View>
      <View style={styles.innerview}>
        <FlatList data={users} renderItem={renderUsers} />
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
  innerview: {
    flex: 1,
    marginTop: moderateScale(15),
  },
  renderview: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#24786D',
    margin: moderateScale(10),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    alignItems: 'center',
    gap: moderateScale(10),
  },
  username: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  userimg: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
});
