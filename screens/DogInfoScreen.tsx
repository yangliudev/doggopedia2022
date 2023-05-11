import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import axios from 'axios';

import Layout from '../components/Layout';

const DogInfoScreen = ({route}) => {
  const {dogName} = route.params;

  const [dogInfo, setDogInfo] = useState('');

  useEffect(() => {
    getDogInfoFromApi();
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

  return (
    <Layout>
      <Text style={styles.header}>{dogName}</Text>
      <Text style={styles.text}>{dogInfo}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: moderateScale(25),
    marginBottom: moderateVerticalScale(20),
    fontWeight: 'bold',
  },
  text: {
    fontSize: moderateScale(20),
    marginBottom: moderateVerticalScale(20),
  },
});

export default DogInfoScreen;
