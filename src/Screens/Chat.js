import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import CSafeAreaView from '../Common/CSafeAreaView';
import firestore from '@react-native-firebase/firestore';
import {moderateScale} from '../Common/Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import renderBubble from '../Common/renderBubble';
import images from '../assets/images';
export default function Chat({route}) {
  const {data, id} = route.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(id + data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const unsubscribe = subscriber.onSnapshot(querySnapshot => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();
        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData,
        };
        return data;
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: id,
      receivedBy: data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc(id + data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc(data.userId + id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <CSafeAreaView extraStyle={styles.main}>
      <View style={styles.chatheader}>
        <AntDesign
          name="arrowleft"
          size={moderateScale(25)}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.userData}>{data.name}</Text>
      </View>
      <ImageBackground style={styles.innerview} source={images.chatbackground}>
        <GiftedChat
          placeholderTextColor={'#24786D'}
          placeholder={'Type a message...'}
          alwaysShowSend
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: id,
          }}
          renderBubble={renderBubble}
        />
      </ImageBackground>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerview: {
    flex: 1,
  },
  chatheader: {
    flexDirection: 'row',
    padding: moderateScale(15),
    backgroundColor: '#24786D',
    shadowColor: 'black',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: moderateScale(15),
  },
  userData: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});
