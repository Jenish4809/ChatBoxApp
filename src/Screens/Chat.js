import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import CSafeAreaView from '../Common/CSafeAreaView';
import firestore from '@react-native-firebase/firestore';
import {moderateScale} from '../Common/Constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import renderBubble from '../Common/renderBubble';
import images from '../assets/images';
import strings from '../i18n/strings';

export default function Chat({route}) {
  const {data, id} = route.params;
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
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
    const typingStatusSubscriber = firestore()
      .collection('chats')
      .doc(data.userId + id)
      .collection('typingStatus')
      .doc(data.userId)
      .onSnapshot(docSnapshot => {
        if (docSnapshot.exists) {
          const {typing, userId} = docSnapshot.data();
          setIsTyping(typing && userId === data.userId);
        }
      });
    return () => {
      unsubscribe();
      typingStatusSubscriber();
    };
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

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.senview}>
          <MaterialIcons
            name="send"
            size={moderateScale(25)}
            color="white"
            style={styles.sendingContainer}
          />
        </View>
      </Send>
    );
  };

  const onInputTextChanged = text => {
    updateTypingStatus(text.length > 0);
  };

  const updateTypingStatus = isTyping => {
    firestore()
      .collection('chats')
      .doc(id + data.userId)
      .collection('typingStatus')
      .doc(id)
      .set({
        typing: isTyping,
        userId: id,
      });
  };

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
          placeholderTextColor={'#fff'}
          placeholder={strings.type}
          alwaysShowSend
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: id,
          }}
          renderBubble={renderBubble}
          textInputProps={{
            style: styles.textInput,
          }}
          onInputTextChanged={onInputTextChanged}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          isTyping={isTyping}
          messagesContainerStyle={{
            paddingBottom: moderateScale(15),
          }}
        />
      </ImageBackground>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
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
  textInput: {
    color: '#fff',
    borderRadius: moderateScale(25),
    borderWidth: 2,
    borderColor: '#24786D',
    fontSize: moderateScale(16),
    paddingHorizontal: moderateScale(15),
    height: moderateScale(40),
    width: '90%',
    margin: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  inputToolbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  inputPrimary: {
    alignItems: 'center',
    marginHorizontal: moderateScale(15),
    backgroundColor: 'transparent',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  senview: {
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
    backgroundColor: '#24786D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
