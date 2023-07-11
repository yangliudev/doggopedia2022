import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';

interface MyAppTextProps {
  children: ReactNode;
  style?: TextStyle;
}

const MyAppText: React.FC<MyAppTextProps> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterTight-Light',
    color: '#000',
  },
});

export default MyAppText;
