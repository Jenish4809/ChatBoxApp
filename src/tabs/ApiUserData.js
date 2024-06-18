import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from '../Common/Constant';

export default function ApiUserData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const limit = 10;
  const totalItems = 50;

  const renderPost = ({item}) => {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredData(data);
    } else {
      const newData = data.filter(item => {
        const itemData = `${item.title.toUpperCase()}`;
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    }
  }, [search, data]);

  const fetchData = async () => {
    if (loading || data.length >= totalItems) return;

    setLoading(true);
    setPage(prevPage => prevPage + 1);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          page * limit
        }&_limit=${limit}`,
      );
      const newData = await response.json();
      setData(prevData => [...prevData, ...newData]);
      setFilteredData(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(0);
    setData([]);
    setFilteredData([]);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Api User Data</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.inputsty}
          placeholder="Search..."
          placeholderTextColor={'#24786D'}
          value={search}
          onChangeText={text => setSearch(text)}
        />
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            loading ? (
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#24786D" />
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: moderateScale(60),
    paddingHorizontal: moderateScale(10),
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
  body: {
    flex: 1,
    marginTop: moderateScale(10),
  },
  postContainer: {
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  postBody: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(60),
    width: '90%',
  },
  inputsty: {
    borderColor: '#24786D',
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    width: '100%',
    alignSelf: 'center',
    fontSize: moderateScale(16),
    padding: moderateScale(10),
  },
});
