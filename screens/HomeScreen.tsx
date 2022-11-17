import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import styled from 'styled-components/native';

import {useDispatch} from 'react-redux';
import {apiRequest} from '../redux/slices/apiRequest';
// import instance from '../utilities/axios';
import axios from 'axios';

const HomeScreen = () => {
  //   const dispatch = useDispatch()<any>;
  //   dispatch(apiRequest('Craig%20Noone'));

  const [dogImgUrlLink, setDogImgUrlLink] = useState('');

  useEffect(() => {
    getRandomDogImage();
    testGET();
    return () => {
      console.log('getRandomDogImage() cleanup');
    };
  }, []);

  const getRandomDogImage = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        let responseData = response.data;
        setDogImgUrlLink(responseData.message);
        console.log('responseData ', responseData);
      })
      .catch(error => {
        console.log('apiRequest.js error is ', error);
      });
  };

  const testGET = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow',
      )
      .then(response => {
        let responseData = response.data.query.pages;
        console.log('999999999 ', responseData);
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
      <Button title="Shuffle doggo" onPress={() => getRandomDogImage()} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 70;
`;

const Header = styled.Text`
  font-size: 30px;
`;

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '25%',
    borderRadius: 10,
    marginTop: 30,
  },
});

export default HomeScreen;
