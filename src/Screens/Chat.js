import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import CSafeAreaView from '../Common/CSafeAreaView';
import firestore from '@react-native-firebase/firestore';

export default function Chat({route}) {
  const {data, id} = route.params;
  const [messages, setMessages] = useState([]);

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
    <CSafeAreaView extraStyle={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: id,
          }}
        />
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
