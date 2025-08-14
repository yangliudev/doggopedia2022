import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';
import type {NavigationProp} from '@react-navigation/native';
import type {HomeStackParamList} from '../types/navigation';
import cleanedData from '../api/cleanedData.json';

interface Props {
  navigation: NavigationProp<HomeStackParamList>;
}

const QuizScreen: React.FC<Props> = ({navigation}) => {
  const [dogImgUrlLink, setDogImgUrlLink] = useState<string>('');
  const [dogName, setDogName] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dogBreedsList, setDogBreedsList] = useState<string[]>([]);

  // Load dog breeds from the cleaned data JSON
  useEffect(() => {
    const loadDogBreeds = () => {
      try {
        const wikiJsonString = cleanedData[0]?.dogBreeds;
        const breeds = wikiJsonString
          ? wikiJsonString.split(',').map((breed: string) => breed.trim())
          : [];
        setDogBreedsList(breeds);
      } catch (error) {
        console.error('Error loading dog breeds:', error);
        Alert.alert(
          'Error',
          'Failed to load dog breeds. Please restart the app.',
        );
      }
    };

    loadDogBreeds();
  }, []);

  // Function to get a random dog image using MediaWiki API
  const getRandomDogImage = async () => {
    if (dogBreedsList.length === 0) {
      return;
    }

    setIsLoading(true);
    setUserInput('');

    // Select a random dog breed from the list
    const randomIndex = Math.floor(Math.random() * dogBreedsList.length);
    const randomBreed = dogBreedsList[randomIndex];

    try {
      // Fetch image using the MediaWiki API
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
          randomBreed,
        )}&prop=pageimages&format=json&pithumbsize=300&origin=*`,
      );

      if (response.data && response.data.query && response.data.query.pages) {
        const data = response.data.query.pages;
        const firstKey = Object.keys(data)[0];
        const imgUrl = data[firstKey]?.thumbnail?.source;

        if (imgUrl) {
          setDogImgUrlLink(imgUrl);
          setDogName(randomBreed);
        } else {
          // If no image found for this breed, try another one
          console.log(
            'No image found for',
            randomBreed,
            ', trying another breed',
          );
          getRandomDogImage();
          return;
        }
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Error fetching dog image:', error);
      Alert.alert('Error', 'Failed to load dog image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Select a random dog and fetch its image once the breeds list is loaded
  useEffect(() => {
    if (dogBreedsList.length > 0) {
      getRandomDogImage();
    }
    // We're intentionally not including getRandomDogImage in the dependency array
    // because it would cause an infinite loop. The function references dogBreedsList which
    // would trigger the effect again, causing an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogBreedsList]);

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

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
          <MyAppText style={styles.loadingText}>Loading dog...</MyAppText>
        </View>
      ) : (
        <Image source={{uri: dogImgUrlLink}} style={styles.image} />
      )}

      <TouchableOpacity
        onPress={() => getRandomDogImage()}
        style={styles.shuffleIcon}>
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
    height: 300,
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
  loadingContainer: {
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: moderateVerticalScale(16),
    alignSelf: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default QuizScreen;
