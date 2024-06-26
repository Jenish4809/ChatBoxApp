import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CSafeAreaView from '../Common/CSafeAreaView';
import CTextInput from '../Common/CTextInput';
import {moderateScale} from '../Common/Constant';
import CButton from '../Common/CButton';
import CKeyboardAvoidWrapper from '../Common/CKeyboardAvoidWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CRadioButton from '../Common/CRadio';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function Screen1({navigation, route}) {
  const item = route?.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [userId, setUserId] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  const onChangeEmail = text => setEmail(text);
  const onChangeName = text => setName(text);
  const onChangeMobile = text => setMobile(text);

  const validate = () => {
    let isValid = true;
    if (!email || !name || !mobile || !gender || !date) {
      Alert.alert('All fields are required');
      isValid = false;
    } else if (!email.includes('@')) {
      Alert.alert('Invalid email');
      isValid = false;
    }
    return isValid;
  };

  const setUserData = async () => {
    const userData = {
      email,
      name,
      mobile,
      gender,
      id: userId,
      date,
    };

    let data = await AsyncStorage.getItem('USERDATA');
    let users = JSON.parse(data) || [];

    if (userId) {
      // Update existing user
      const index = users.findIndex(user => user.id === userId);
      if (index !== -1) {
        users[index] = userData;
      }
    } else {
      // Add new user
      userData.id = users.length + 1;
      users.push(userData);
    }

    await AsyncStorage.setItem('USERDATA', JSON.stringify(users));
    Alert.alert('Data saved successfully');
    navigation.navigate('Screen2');
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setMobile('');
    setGender('');
    setUserId(null);
  };

  useEffect(() => {
    if (item) {
      setEmail(item.email);
      setName(item.name);
      setMobile(item.mobile);
      setGender(item.gender);
      setUserId(item.id);
    }
  }, [item]);

  const onPressNext = () => {
    navigation.navigate('Screen2');
    resetForm();
  };

  return (
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View style={styles.header}>
          <AntDesign name="arrowright" size={25} onPress={onPressNext} />
        </View>
        <CKeyboardAvoidWrapper>
          <View style={styles.innerview}>
            <Text style={styles.title}>User Data</Text>
            <CTextInput
              title={'Email'}
              keyboardType={'email-address'}
              value={email}
              onChangeText={onChangeEmail}
            />
            <CTextInput
              title={'Name'}
              value={name}
              onChangeText={onChangeName}
            />
            <CTextInput
              title={'Mobile'}
              keyboardType={'phone-pad'}
              value={mobile}
              onChangeText={onChangeMobile}
            />
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radiobtnview}>
              <CRadioButton
                selected={gender === 'Male'}
                onPress={() => setGender('Male')}
                label="Male"
              />
              <CRadioButton
                selected={gender === 'Female'}
                onPress={() => setGender('Female')}
                label="Female"
              />
            </View>
            <View style={styles.dateview}>
              <CButton
                title={'Choose Date'}
                extrabtn={styles.datebtn}
                onPress={showDatePicker}
              />
              <Text style={styles.label}>
                {!!date ? `Date : ${date}` : 'Choose Date'}
              </Text>
            </View>
            <DateTimePickerModal
              buttonTextColorIOS="#24786D"
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
            />
          </View>
        </CKeyboardAvoidWrapper>
        <CButton
          title={'Save'}
          onPress={() => {
            if (validate()) {
              setUserData();
            }
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
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#F3F6F6',
    marginVertical: moderateScale(0),
    marginTop: moderateScale(20),
  },
  innerview: {
    flex: 1,
    justifyContent: 'center',
    marginTop: moderateScale(100),
  },
  header: {
    alignItems: 'flex-end',
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    marginVertical: moderateScale(20),
    color: '#24786D',
    marginLeft: moderateScale(30),
  },
  radiobtnview: {
    marginLeft: moderateScale(30),
    flexDirection: 'row',
    gap: moderateScale(20),
    alignItems: 'center',
  },
  datebtn: {
    width: moderateScale(150),
    alignSelf: 'flex-start',
    marginLeft: moderateScale(30),
  },
  dateview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: moderateScale(30),
  },
});
