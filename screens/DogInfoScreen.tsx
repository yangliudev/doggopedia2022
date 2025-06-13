import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ImageSourcePropType,
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

  // Sync local favorite state with Redux on mount and when favoriteData changes
  useEffect(() => {
    if (favoriteData) {
      setDogInfo(favoriteData.info);
      if (favoriteData.imgUrl) setDogImgUrl(favoriteData.imgUrl);
      setIsFavorite(favoriteData.isFavorite);
    } else {
      getDogInfoFromApi();
      getDogImageFromApi();
    }
  }, [dogName, favoriteData]);

  // Fetch dog info from API
  const getDogInfoFromApi = () => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${dogName}`,
      )
      .then(response => {
        const responseData = response.data.query.pages;
        const values = Object.values(responseData) as {extract: string}[];
        const extractValue = values[0]?.extract || 'No info available.';
        setDogInfo(extractValue);
      })
      .catch(error => {
        console.log('getDogInfoFromApi() error is ', error);
      });
  };

  // Fetch dog image from API
  const getDogImageFromApi = () => {
    if (dogName === ' Rat Terrier') {
      setDogImgUrl(require('../assets/rat_terrier_eddie.jpg'));
      return;
    }

    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${dogName}&prop=pageimages&format=json&pithumbsize=300`,
      )
      .then(response => {
        const data = response.data.query.pages;
        const firstKey = Object.keys(data)[0];
        const imgUrl = data[firstKey]?.thumbnail?.source;
        if (imgUrl) {
          setDogImgUrl({uri: imgUrl});
        }
      })
      .catch(error => {
        console.log('getDogImageFromApi() error is ', error);
      });
  };

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
        <MyAppText style={styles.text}>{dogInfo}</MyAppText>
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
});

export default DogInfoScreen;
