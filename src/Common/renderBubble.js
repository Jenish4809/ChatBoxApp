import React from 'react';
import {StyleSheet} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';
import {moderateScale} from './Constant';

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: styles.leftBubble,
        right: styles.rightBubble,
      }}
      containerStyle={{
        left: {right: moderateScale(40)},
      }}
      textStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: 'white',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  leftBubble: {
    backgroundColor: '#fff',
    padding: moderateScale(5),
  },
  rightBubble: {
    backgroundColor: '#24786D',
    padding: moderateScale(5),
  },
});

export default renderBubble;
