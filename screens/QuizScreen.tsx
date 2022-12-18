import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Text, StyleSheet, Image, Button} from 'react-native';

import axios from 'axios';

const QuizScreen = () => {
  const [dogImgUrlLink, setDogImgUrlLink] = useState('');

  useEffect(() => {
    getRandomDogImage();
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

  return (
    <Container>
      <Header>Who's that doggo?</Header>
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

export default QuizScreen;
