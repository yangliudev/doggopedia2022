import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';

interface MyAppTextProps extends TextProps {
  children: ReactNode;
  style?: TextStyle;
}

const MyAppText: React.FC<MyAppTextProps> = ({children, style, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'InterTight-Light',
    color: '#000',
  },
});

export default MyAppText;
