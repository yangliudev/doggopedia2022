import React from 'react';
import {Text} from 'react-native';
import Layout from '../components/Layout';

const DogInfoScreen = ({route}) => {
  const {dogName} = route.params;
  return (
    <Layout>
      <Text>{dogName}</Text>
    </Layout>
  );
};

export default DogInfoScreen;
