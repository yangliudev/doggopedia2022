import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Text, StyleSheet, Image, Button, TextInput} from 'react-native';

import axios from 'axios';

const QuizScreen = () => {
  const [dogImgUrlLink, setDogImgUrlLink] = useState('');
  const [dogName, setDogName] = useState('');

  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    getRandomDogImage();
    return () => {
      console.log('QuizScreen.tsx cleanup');
    };
  }, []);

  const getRandomDogImage = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        let responseData = response.data;
        findDogName(responseData.message);

        console.log('responseData ', responseData);
      })
      .catch(error => {
        console.log('getRandomDogImage() error is ', error);
      });
  };

  const findDogName = (responseString: any) => {
    setDogImgUrlLink(responseString);

    let startIndex;
    let endIndex;

    let count = 0;
    for (let i = 0; i < responseString.length; i++) {
      if (responseString[i] === '/' && count !== 4) {
        count++;
        i++;
        startIndex = i++;
      } else {
        if (responseString[i] === '/') {
          endIndex = i;
          break;
        }
        i++;
      }
    }
    let producedString = responseString.substr(startIndex, endIndex);
    console.log('STRING IS ', producedString);
  };

  const handleUserInput = (input: any) => {
    setUserInput(input);
  };

  const checkInputGuess = () => {
    console.log('user input is ', userInput);
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

      <TextInputStyled onChangeText={text => handleUserInput(text)} />

      <Button title="Check" onPress={() => checkInputGuess()} />
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

const TextInputStyled = styled.TextInput`
  width: 150px;
  height: 40px;
  border-radius: 5px;
  background-color: #c5ddfa;
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
