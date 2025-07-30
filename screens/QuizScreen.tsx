import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

interface Props {
  navigation: any;
}

const QuizScreen: React.FC<Props> = ({navigation}) => {
  const [dogImgUrlLink, setDogImgUrlLink] = useState('');
  const [dogName, setDogName] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    getRandomDogImage();
    return () => {
      console.log('QuizScreen cleanup');
    };
  }, []);

  const getRandomDogImage = async () => {
    try {
      const response = await axios.get(
        'https://dog.ceo/api/breeds/image/random',
      );
      if (response.data && response.data.message) {
        const parts = response.data.message.split('/');
        const breedPart = parts[parts.length - 2];
        setDogImgUrlLink(response.data.message);
        setDogName(breedPart || 'Unknown Breed');
        setUserInput('');
      } else {
        console.log('Invalid response structure:', response.data);
      }
    } catch (error) {
      console.log('Error fetching dog image:', error);
      Alert.alert('Error', 'Failed to load dog image. Please try again.');
    }
  };

  const checkInputGuess = () => {
    const m = userInput.length;
    const n = dogName.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      dp[i][0] = i;
    }
    for (let j = 1; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (userInput[i - 1] === dogName[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + 1,
          );
        }
      }
    }

    const levenshteinDistance = dp[m][n];
    const threshold = 3;

    if (levenshteinDistance <= threshold) {
      Alert.alert('Correct', 'Nice guess! Fetching a new dog...');
      getRandomDogImage();
    } else {
      Alert.alert('Incorrect', 'Try again or shuffle a new dog.');
    }
  };

  return (
    <Layout>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      <MyAppText style={styles.headerTitle}>Who's That Doggo?</MyAppText>

      <Image source={{uri: dogImgUrlLink}} style={styles.image} />

      <TouchableOpacity onPress={getRandomDogImage} style={styles.shuffleIcon}>
        <Ionicons name="ios-shuffle" size={32} color="#007AFF" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter dog breed"
        value={userInput}
        onChangeText={setUserInput}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={checkInputGuess}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(16),
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: moderateVerticalScale(16),
    alignSelf: 'center',
  },
  shuffleIcon: {
    marginBottom: moderateVerticalScale(12),
    alignSelf: 'center',
  },
  input: {
    width: '80%',
    height: 44,
    backgroundColor: '#EEF1F6',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    marginBottom: moderateVerticalScale(20),
  },
  button: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  topContainer: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateVerticalScale(16),
  },

  backButton: {
    alignSelf: 'flex-start', // ensures it aligns to the left
    marginLeft: 20,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F8D7DA',
    marginBottom: moderateVerticalScale(8), // spacing between button and title
  },

  headerTitle: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'left',
  },
});

export default QuizScreen;
