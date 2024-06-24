import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from './Constant';
import images from '../assets/images';
import CButton from './CButton';

export default function CModalLang({
  langVisible,
  setLangVisible,
  onselectLang,
}) {
  const [selectedLang, setSelectedLang] = useState(0);
  const [language, setLanguage] = useState([
    {name: 'English', selected: true},
    {name: 'हिंदी', selected: false},
    {name: 'ਪੰਜਾਬੀ', selected: false},
    {name: 'தமிழ்', selected: false},
    {name: 'اردو', selected: false},
  ]);

  const onSelect = index => {
    let temp = language;
    temp.map((item, i) => {
      if (index === i) {
        item.selected = true;
        setSelectedLang(index);
      } else {
        item.selected = false;
      }
    });
    setLanguage([...temp]);
  };

  const renderLanguage = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.languageview,
          {
            borderColor: item.selected === true ? '#24786D' : '#000',
          },
        ]}
        onPress={() => {
          onSelect(index);
        }}>
        {item.selected ? (
          <Image
            source={images.radio}
            style={[
              styles.radio,
              {
                tintColor: item.selected === true ? '#24786D' : '#000',
              },
            ]}
          />
        ) : (
          <Image
            source={images.radiobutton}
            style={[
              styles.radio,
              {
                tintColor: item.selected === true ? '#24786D' : '#000',
              },
            ]}
          />
        )}
        <Text
          style={[
            styles.langtext,
            {color: item.selected === true ? '#24786D' : '#000'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      transparent={true}
      visible={langVisible}
      animationType="slide"
      onRequestClose={() => setLangVisible(!langVisible)}>
      <View style={styles.main}>
        <View style={styles.innerview}>
          <Text style={styles.modaltitle}>Select Language</Text>
          <FlatList data={language} renderItem={renderLanguage} />
          <View style={styles.closebtn}>
            <CButton
              extrabtn={styles.cancelbtn}
              title={'Cancel'}
              onPress={() => {
                setLangVisible(false);
              }}
            />
            <CButton
              title={'Apply'}
              extrabtn={styles.cancelbtn}
              onPress={() => {
                setLangVisible(false);
                onselectLang(selectedLang);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '10%',
  },
  innerview: {
    backgroundColor: '#fff',
    padding: moderateScale(30),
    borderRadius: moderateScale(10),
    width: '80%',
  },
  languageview: {
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    margin: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  langtext: {
    fontSize: moderateScale(20),
  },
  modaltitle: {
    fontSize: moderateScale(18),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  radio: {
    height: moderateScale(24),
    width: moderateScale(24),
    marginRight: moderateScale(10),
  },
  cancelbtn: {
    width: '40%',
    marginVertical: moderateScale(10),
  },
  closebtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
