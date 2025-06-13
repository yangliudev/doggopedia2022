import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

const DogInfoScreen = ({route}) => {
  const {dogName} = route.params;
  const navigation = useNavigation();

  const [dogInfo, setDogInfo] = useState('');
  const [dogImgUrl, setDogImgUrl] = useState('');

  useEffect(() => {
    getDogInfoFromApi();
    getDogImageFromApi();
    return () => {
      console.log('DogInfoScreen.tsx cleanup');
    };
  }, []);

  const getDogInfoFromApi = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' +
          dogName,
      )
      .then(response => {
        let responseData = response.data.query.pages;
        var values = Object.values(responseData);
        var extractValue = values[0].extract;
        setDogInfo(extractValue);
      })
      .catch(error => {
        console.log('getDogInfoFromApi() error is ', error);
      });
  };

  const getDogImageFromApi = () => {
    // Easter Egg for Eddie
    if (dogName === ' Rat Terrier') {
      setDogImgUrl(require('../assets/rat_terrier_eddie.jpg'));
      return;
    }

    axios
      .get(
        'https://en.wikipedia.org/w/api.php?action=query&titles=' +
          dogName +
          '&prop=pageimages&format=json&pithumbsize=300',
      )
      .then(response => {
        var data = response.data.query.pages;
        var firstKey = Object.keys(data)[0];
        var imgUrl = data[firstKey]['thumbnail']['source'];
        setDogImgUrl({uri: imgUrl});
      })
      .catch(error => {
        console.log('error is ', error);
      });
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        {dogImgUrl === '' ? (
          <MyAppText>Sorry! No image url found from API :C</MyAppText>
        ) : (
          <Image
            source={dogImgUrl}
            style={styles.imgStyle}
            resizeMode="cover"
          />
        )}

        <MyAppText style={styles.header}>{dogName}</MyAppText>
        <MyAppText style={styles.text}>{dogInfo}</MyAppText>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F8D7DA',
  },
  imgStyle: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
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
