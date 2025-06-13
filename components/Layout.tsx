import React, {FC, ReactNode} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface Props extends ViewProps {
  children: ReactNode;
}

const Layout: FC<Props> = ({children, ...rest}) => {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffedfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Layout;
