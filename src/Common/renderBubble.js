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
      textStyle={{
        left: {
          color: '#fff',
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
    backgroundColor: '#000',
    padding: moderateScale(5),
  },
  rightBubble: {
    backgroundColor: '#24786D',
    padding: moderateScale(5),
  },
});

export default renderBubble;
