import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import {useDispatch, useSelector} from 'react-redux';
import {apiRequest} from '../redux/slices/apiRequest';
// import instance from '../utilities/axios';
import axios from 'axios';
import styled from 'styled-components';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()<any>;
  dispatch(apiRequest('Craig%20Noone'));

  const {dataInfo} = useSelector(state => state);

  const [selected, setSelected] = useState('');

  const [dropdownList, setdropdownList] = useState([]);

  console.log('adsfasdfadf', dataInfo);

  // JSON data scraped off of Wikipedia's Dog Breeds List
  let wikiJsonObj = require('../api/cleanedData.json');
  let wikiJsonString = wikiJsonObj[0].dogBreeds;
  let jsonDataArray = wikiJsonString.split(',');

  useEffect(() => {
    testGET();
    if (dropdownList.length === 0) populateDropdownList();
    return () => {
      console.log('clean up');
    };
  }, []);

  // const data = [
  //   {key: '1', value: 'Mobiles'},
  //   {key: '2', value: 'Appliances'},
  //   {key: '3', value: 'Cameras'},
  //   {key: '4', value: 'Computers'},
  //   {key: '5', value: 'Vegetables'},
  //   {key: '6', value: 'Diary Products'},
  //   {key: '7', value: 'Drinks'},
  // ];

  const populateDropdownList = () => {
    let data = [];

    for (let i = 0; i < jsonDataArray.length; i++) {
      data.push({key: i, value: jsonDataArray[i]});
    }

    setdropdownList(data);
  };

  const evalSelectedText = dogName => {
    console.log('SELECTED IS ', dogName);
    navigation.navigate('DogInfo');
  };

  const testGET = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=American Bully',
      )
      .then(response => {
        let responseData = response.data.query.pages;
        console.log('test get ', responseData);
      })
      .catch(error => {
        console.log('apiRequest.js error is ', error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Select a dog breed to learn more!</Text>
        {/* <Text>{wikiJsonString}</Text> */}
        <SelectList
          setSelected={val => setSelected(val)}
          data={dropdownList}
          save="value"
          onSelect={() => evalSelectedText(selected)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

// const Container = styled(View)`
//   flex: 1,
//   padding: 20,
// `;

export default HomeScreen;
