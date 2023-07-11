import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  Image,
  Alert,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {moderateVerticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

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

        const parts = responseData.message.split('/');
        const breedPart = parts[parts.length - 2];

        setDogImgUrlLink(responseData.message);
        setDogName(breedPart);
        setUserInput('');

        console.log('quiz responseData ', responseData, breedPart);
      })
      .catch(error => {
        console.log('getRandomDogImage() error is ', error);
      });
  };

  const handleUserInput = (input: any) => {
    setUserInput(input);
  };

  function checkInputGuess() {
    const m = userInput.length;
    const n = dogName.length;

    // Create a 2D array to store the Levenshtein distances
    const dp = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1).fill(0));

    // Initialize the first row and column
    for (let i = 1; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 1; j <= n; j++) {
      dp[0][j] = j;
    }

    // Calculate the Levenshtein distance
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (userInput[i - 1] === dogName[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // deletion
            dp[i][j - 1] + 1, // insertion
            dp[i - 1][j - 1] + 1, // substitution
          );
        }
      }
    }

    // The Levenshtein distance is the value at the bottom-right corner
    const levenshteinDistance = dp[m][n];

    // Adjust the threshold as desired (lower value means a closer match)
    const threshold = 3;

    // Return true if the Levenshtein distance is within the threshold
    if (levenshteinDistance <= threshold) {
      Alert.alert('Congratulations!', 'You got it :)');
      getRandomDogImage();
    } else {
      Alert.alert('Sorry!', 'Better luck next time! :(');
    }
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <Layout>
      <MyAppText style={{fontSize: 26}}>Who's that doggo?</MyAppText>
      <Image
        style={styles.image}
        source={{
          uri: dogImgUrlLink,
        }}
      />
      {/* <Button title="Shuffle doggo" onPress={() => getRandomDogImage()} /> */}
      <Ionicons
        name="ios-shuffle"
        style={{fontSize: 36, color: '#000'}}
        onPress={() => getRandomDogImage()}
      />

      <Separator />

      <TextInputStyled
        onChangeText={text => handleUserInput(text)}
        value={userInput}
      />

      <Separator />
      <Separator />

      <TouchableOpacity style={styles.button} onPress={() => checkInputGuess()}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const TextInputStyled = styled.TextInput`
  width: 150px;
  height: 40px;
  border-radius: 5px;
  background-color: #c5ddfa;
  color: #000;
`;

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '25%',
    borderRadius: 10,
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(20),
  },
  separator: {
    marginVertical: moderateVerticalScale(5),
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuizScreen;
