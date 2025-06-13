import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

// Define type for dog favorite (adjust as needed)
type Dog = {
  name: string;
};

const FavoriteScreen: React.FC = () => {
  const favorites: Dog[] = []; // Replace with actual data or props/state

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <MyAppText style={styles.title}>My Favorite Dogs</MyAppText>

        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="heart-outline" size={64} color="#ccc" />
            <MyAppText style={styles.emptyText}>
              You haven't added any favorites yet.
            </MyAppText>
          </View>
        ) : (
          favorites.map((dog, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <MyAppText style={styles.cardText}>{dog.name}</MyAppText>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20),
    flexGrow: 1,
    backgroundColor: '#FFF5F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: moderateVerticalScale(20),
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateVerticalScale(40),
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(16),
    borderRadius: 12,
    marginBottom: moderateVerticalScale(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardText: {
    fontSize: 20,
    color: '#333',
  },
});

export default FavoriteScreen;
