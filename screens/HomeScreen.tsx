import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import type {NavigationProp} from '@react-navigation/native';
import type {HomeStackParamList} from '../types/navigation';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';
import DropdownComponent from '../components/DropdownComponent';

interface HomeScreenProps {
  navigation: NavigationProp<HomeStackParamList>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <Layout>
      <MyAppText style={styles.title}>Doggopedia</MyAppText>

      <Image source={require('../assets/dog.jpeg')} style={styles.image} />

      <MyAppText style={styles.subtitle}>
        Select a dog breed to explore:
      </MyAppText>

      <View style={styles.dropdownWrapper}>
        <DropdownComponent navigation={navigation} />
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => navigation.navigate('QuizScreen')}
        activeOpacity={0.85}>
        <MyAppText style={styles.quizButtonText}>Take the Dog Quiz</MyAppText>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: moderateVerticalScale(16),
  },
  image: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(80),
    marginBottom: moderateVerticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: '#444',
    marginBottom: moderateVerticalScale(12),
    textAlign: 'center',
  },
  dropdownWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(24),
  },
  quizButton: {
    backgroundColor: '#E91E63',
    paddingVertical: moderateVerticalScale(14),
    paddingHorizontal: moderateScale(36),
    borderRadius: moderateScale(30),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 4,
  },
  quizButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default HomeScreen;
