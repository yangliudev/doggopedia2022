import React, {useEffect, useState} from 'react';
import {Text, Image, StyleSheet, Button} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

// import {useDispatch, useSelector} from 'react-redux';
import Layout from '../components/Layout';
// import {apiRequest} from '../redux/slices/apiRequest';
// import instance from '../utilities/axios';
// import axios from 'axios';
import MyAppText from '../components/MyAppText';

import DropdownComponent from '../components/DropdownComponent';

const HomeScreen = ({navigation}) => {
  // const dispatch = useDispatch()<any>;
  // dispatch(apiRequest('Craig%20Noone'));
  // const {dataInfo} = useSelector(state => state);

  const [dropdownList, setdropdownList] = useState([]);

  // JSON data scraped off of Wikipedia's Dog Breeds List
  let wikiJsonObj = require('../api/cleanedData.json');
  let wikiJsonString = wikiJsonObj[0].dogBreeds;
  let jsonDataArray = wikiJsonString.split(',');

  useEffect(() => {
    if (dropdownList.length === 0) populateDropdownList();
    return () => {
      console.log('clean up');
    };
  }, []);

  const populateDropdownList = () => {
    let data = [];

    for (let i = 0; i < jsonDataArray.length; i++) {
      data.push({key: i, value: jsonDataArray[i]});
    }

    setdropdownList(data);
  };

  return (
    <Layout>
      <MyAppText style={{fontSize: 36}}>Doggopedia</MyAppText>
      <Image source={require('../assets/doggoMain.png')} style={styles.image} />
      <MyAppText style={{fontSize: 16}}>
        Choose a dog breed to learn about:
      </MyAppText>
      <DropdownComponent navigation={navigation} />
      <Button title="QUIZ" onPress={() => navigation.navigate('QuizScreen')} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: moderateVerticalScale(20),
  },
});

export default HomeScreen;
