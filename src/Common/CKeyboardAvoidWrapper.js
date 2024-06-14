// Library Imports
import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

// Local Imports
import { checkPlatform, moderateScale } from './Constant';

// KeyboardAvoidWrapper Component
export default CKeyBoardAvoidWrapper = ({
  children,
  containerStyle,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={
        checkPlatform() === 'ios' ? moderateScale(70) : null
      }
      style={[{flex:1}, containerStyle]}
      behavior={checkPlatform() === 'ios' ? 'padding' : null}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
