import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale} from '../Common/Constant';

export default function Screen2() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

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

  const renderUserData = ({item}) => {
    return (
      <View style={styles.dataview}>
        <Text style={styles.datatext}>{item.email}</Text>
        <Text style={styles.datatext}>{item.name}</Text>
        <Text style={styles.datatext}>{item.mobile}</Text>
        <Text style={styles.datatext}>{item.gender}</Text>
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
});
