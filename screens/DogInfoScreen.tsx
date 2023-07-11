import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import axios from 'axios';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

const DogInfoScreen = ({route}) => {
  const {dogName} = route.params;

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
        {dogImgUrl === '' ? (
          <MyAppText>Sorry! No image url found from API :C</MyAppText>
        ) : (
          <Image
            source={dogImgUrl}
            style={styles.imgStyle}
            resizeMode="contain"
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
    justifyContent: 'center',
  },
  imgStyle: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default DogInfoScreen;
