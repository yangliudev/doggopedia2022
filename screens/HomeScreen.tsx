import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

import {useDispatch} from 'react-redux';
import {apiRequest} from '../redux/slices/apiRequest';
// import instance from '../utilities/axios';
import axios from 'axios';

const HomeScreen = () => {
  //   const dispatch = useDispatch()<any>;
  //   dispatch(apiRequest('Craig%20Noone'));

  const testGET = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow',
      )
      .then(response => {
        let responseData = response.data.query.pages;
        console.log('test get ', responseData);
      })
      .catch(error => {
        console.log('apiRequest.js error is ', error);
      });
  };

  const testGETDog = () => {
    axios
      .get(
        'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=German_Hound',
      )
      .then(response => {
        let responseData = response.data.query.pages;
        console.log('test get dog ', responseData);
      })
      .catch(error => {
        console.log('apiRequest.js error is ', error);
      });
  };

  return <Text>hello</Text>;
};

export default HomeScreen;
