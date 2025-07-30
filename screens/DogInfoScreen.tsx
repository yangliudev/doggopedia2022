import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../redux/store'; // adjust path to your store setup
import {
  addFavoriteDog,
  removeFavoriteDog,
} from '../redux/slices/favoritesSlice'; // adjust path

// Navigation types
type RootStackParamList = {
  DogInfo: {dogName: string};
};

type DogInfoRouteProp = RouteProp<RootStackParamList, 'DogInfo'>;

const DogInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DogInfoRouteProp>();
  const {dogName} = route.params;

  const dispatch = useDispatch();

  // Read favorite info from Redux store
  const favoriteData = useSelector(
    (state: RootState) => state.favorites[dogName],
  );

  const [dogInfo, setDogInfo] = useState<string>('');
  const [dogImgUrl, setDogImgUrl] = useState<ImageSourcePropType>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch dog info from API
  const getDogInfoFromApi = useCallback(() => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${dogName}`,
      )
      .then(response => {
        if (response.data && response.data.query && response.data.query.pages) {
          const responseData = response.data.query.pages;
          const values = Object.values(responseData) as {extract?: string}[];
          const extractValue = values[0]?.extract || 'No info available.';
          setDogInfo(extractValue);
        } else {
          setDogInfo('No info available.');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('getDogInfoFromApi() error is ', error);
        setDogInfo('Error loading information. Please try again.');
        setIsLoading(false);
      });
  }, [dogName]);

  // Fetch dog image from API
  const getDogImageFromApi = useCallback(() => {
    if (dogName === ' Rat Terrier') {
      setDogImgUrl(require('../assets/rat_terrier_eddie.jpg'));
      return;
    }

    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${dogName}&prop=pageimages&format=json&pithumbsize=300`,
      )
      .then(response => {
        if (response.data && response.data.query && response.data.query.pages) {
          const data = response.data.query.pages;
          const firstKey = Object.keys(data)[0];
          const imgUrl = data[firstKey]?.thumbnail?.source;
          if (imgUrl) {
            setDogImgUrl({uri: imgUrl});
          }
        }
      })
      .catch(error => {
        console.log('getDogImageFromApi() error is ', error);
      });
  }, [dogName]);

  // Sync local favorite state with Redux on mount and when favoriteData changes
  useEffect(() => {
    if (favoriteData) {
      setDogInfo(favoriteData.info);
      if (favoriteData.imgUrl) {
        setDogImgUrl(favoriteData.imgUrl);
      }
      setIsFavorite(favoriteData.isFavorite);
      setIsLoading(false);
    } else {
      getDogInfoFromApi();
      getDogImageFromApi();
    }
  }, [dogName, favoriteData, getDogImageFromApi, getDogInfoFromApi]);

  // Toggle favorite and update Redux store accordingly
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteDog(dogName));
      setIsFavorite(false);
    } else {
      dispatch(
        addFavoriteDog({
          name: dogName,
          info: dogInfo,
          imgUrl: dogImgUrl,
        }),
      );
      setIsFavorite(true);
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {dogImgUrl ? (
            <Image
              source={dogImgUrl}
              style={styles.imgStyle}
              resizeMode="cover"
            />
          ) : (
            <MyAppText>Sorry! No image url found from API :C</MyAppText>
          )}

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? '#D63384' : '#888'}
            />
          </TouchableOpacity>
        </View>

        <MyAppText style={styles.header}>{dogName}</MyAppText>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D63384" />
            <MyAppText style={styles.loadingText}>
              Loading information...
            </MyAppText>
          </View>
        ) : (
          <MyAppText style={styles.text}>{dogInfo}</MyAppText>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    // backgroundColor: '#FFF5F8',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F8D7DA',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  imgStyle: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 6,
    elevation: 3,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D63384',
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'left',
    color: '#444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default DogInfoScreen;
