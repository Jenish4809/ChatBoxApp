import {StyleSheet, Text, TextInput, View, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import {useIsFocused} from '@react-navigation/native';

export default function Screen2({navigation}) {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getUserData();
  }, [isFocused]);

  const extractLetters = name => {
    const firstLetter = name.charAt(0).toUpperCase();
    const lastLetter = name.charAt(name.length - 1).toUpperCase();
    const result = `${firstLetter}${lastLetter}`;
    return result;
  };

  const getUserData = async () => {
    const data = await AsyncStorage.getItem('USERDATA');
    if (data) {
      setUserData(JSON.parse(data));
      setFilteredData(JSON.parse(data));
    }
  };

  const onChangeSearch = text => {
    setSearch(text);
  };

  const onPressDeteUser = async id => {
    Alert.alert('Delete', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const data = await AsyncStorage.getItem('USERDATA');
          let userData = JSON.parse(data);
          const newData = userData.filter(item => item.id !== id);
          await AsyncStorage.setItem('USERDATA', JSON.stringify(newData));
          getUserData();
        },
      },
    ]);
  };

  const onPressEditUser = item => {
    navigation.navigate('Screen1', {
      email: item.email,
      name: item.name,
      mobile: item.mobile,
      gender: item.gender,
      id: item.id,
      date: item.date,
    });
  };

  const renderUserData = ({item}) => {
    return (
      <View style={styles.dataview}>
        <Text style={styles.datatext}>{item.email}</Text>
        <View style={styles.nameview}>
          <Text style={styles.datatext}>{extractLetters(item.name)} :</Text>
          <Text style={styles.datatext}>{item.name}</Text>
        </View>
        <Text style={styles.datatext}>{item.mobile}</Text>
        <Text style={styles.datatext}>{item.gender}</Text>
        <Text style={styles.datatext}>{item.date}</Text>
        <View style={styles.btnview}>
          <CButton
            title={'Edit'}
            extrabtn={styles.editbtn}
            extratitle={styles.btntext}
            onPress={() => onPressEditUser(item)}
          />
          <CButton
            title={'Delete'}
            extrabtn={styles.editbtn}
            extratitle={styles.btntext}
            onPress={() => onPressDeteUser(item.id)}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    filterUserData();
  }, [search, userData]);

  const filterUserData = () => {
    if (search === '') {
      setFilteredData(userData);
    } else {
      const filtered = userData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <CSafeAreaView extraStyle={{backgroundColor: '#fff'}}>
      <View style={styles.main}>
        <Text style={styles.title}>UserData</Text>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          placeholderTextColor={'#24786D'}
          value={search}
          onChangeText={onChangeSearch}
        />
        <View style={styles.innerview}>
          <FlatList
            data={filteredData}
            renderItem={renderUserData}
            keyExtractor={(item, index) => index.toString()}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  dataview: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#F3F6F6',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#24786D',
    gap: 10,
    borderRadius: moderateScale(10),
  },
  innerview: {
    flex: 1,
    width: '100%',
  },
  datatext: {
    color: '#fff',
    fontSize: moderateScale(20),
  },
  input: {
    borderColor: '#24786D',
    borderWidth: 1,
    width: '90%',
    padding: 20,
    marginVertical: 10,
    borderRadius: moderateScale(10),
    fontSize: moderateScale(16),
  },
  editbtn: {
    backgroundColor: '#F3F6F6',
    padding: moderateScale(10),
    width: moderateScale(100),
    marginVertical: moderateScale(0),
  },
  btntext: {
    color: '#24786D',
    fontSize: moderateScale(16),
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  nameview: {
    flexDirection: 'row',
    gap: 10,
  },
});
