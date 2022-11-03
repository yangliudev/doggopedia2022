import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {useDispatch} from 'react-redux';
import {apiRequest} from '../redux/slices/apiRequest';
import instance from '../utilities/axios';

const HomeScreen = () => {
  //   const dispatch = useDispatch()<any>;
  //   dispatch(apiRequest('Craig%20Noone'));

  const [dogImgUrlLink, setDogImgUrlLink] = useState('');

  useEffect(() => {
    getRandomDogImage();
    return () => {
      console.log('getRandomDogImage() cleanup');
    };
  }, []);

  const getRandomDogImage = () => {
    instance
      .get('/breeds/image/random')
      .then(response => {
        let responseData = response.data;
        setDogImgUrlLink(responseData.message);
        console.log('responseData ', responseData);
      })
      .catch(error => {
        console.log('apiRequest.js error is ', error);
      });
  };

  return (
    <Container>
      <Header>Doggopedia</Header>
      <Image
        style={styles.image}
        source={{
          uri: dogImgUrlLink,
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = styled.Text`
  font-size: 30px;
`;

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '25%',
    paddingTop: 100,
    textAlign: 'center',
  },
});

export default HomeScreen;
