import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import {useDispatch} from 'react-redux';
import {apiRequest} from '../redux/slices/apiRequest';
const HomeScreen = () => {
  const dispatch = useDispatch()<any>;
  dispatch(apiRequest());
  return (
    <Container>
      <Header>Doggopedia</Header>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 40px;
`;

const Header = styled.Text`
  font-size: 30px;
  text-align: center;
`;

export default HomeScreen;
