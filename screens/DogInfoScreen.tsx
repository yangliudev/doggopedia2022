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
  });

  const getDogInfoFromApi = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' +
          dogName,
      )
      .then(response => {
        let responseData = response.data.query.pages;
        console.log('test get ***** ', responseData);

        var values = Object.values(responseData);
        var extractValue = values[0].extract;
        console.log('test get !!!! ', extractValue);

        setDogInfo(extractValue);
      })
      .catch(error => {
        console.log('getDogInfoFromApi() error is ', error);
      });
  };

  const getDogImageFromApi = () => {
    axios
      .get(
        'http://en.wikipedia.org/w/api.php?action=query&titles=' +
          dogName +
          '&prop=pageimages&format=json&pithumbsize=300',
      )
      .then(response => {
        // let responseData = response.data.query.pages;
        // console.log('test get lmao ', responseData);

        var data = response.data.query.pages;
        var firstKey = Object.keys(data)[0];
        var imgUrl = data[firstKey]['thumbnail']['source'];
        setDogImgUrl(imgUrl);
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
            source={{uri: dogImgUrl}}
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
  },
  header: {
    fontSize: moderateScale(25),
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(20),
    fontWeight: 'bold',
  },
  text: {
    fontSize: moderateScale(20),
    marginBottom: moderateVerticalScale(20),
  },
  imgStyle: {
    height: 200,
    width: 'auto',
    marginTop: moderateVerticalScale(40),
    color: '#000',
  },
});

export default DogInfoScreen;
