import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

const HomeScreen = () => {
  return (
    <Container>
      <Text>Hello world</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default HomeScreen;
