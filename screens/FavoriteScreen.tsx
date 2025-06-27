import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import Layout from '../components/Layout';
import MyAppText from '../components/MyAppText';

import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../redux/store';
import {removeFavoriteDog} from '../redux/slices/favoritesSlice';

type DogState = {
  info: string;
  imgUrl?: any;
  isFavorite: boolean;
};

const FavoriteScreen: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites) as {
    [dogName: string]: DogState;
  };

  const favoriteDogs = Object.entries(favorites).filter(
    ([, dogData]) => dogData.isFavorite,
  );

  const handleRemove = (name: string) => {
    dispatch(removeFavoriteDog(name));
  };

  return (
    <Layout>
      <MyAppText style={styles.title}>My Favorite Dogs</MyAppText>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favoriteDogs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="heart-outline" size={64} color="#ccc" />
            <MyAppText style={styles.emptyText}>
              You haven't added any favorites yet.
            </MyAppText>
          </View>
        ) : (
          favoriteDogs.map(([name, dogData]) => (
            <View key={name} style={styles.card}>
              {dogData.imgUrl ? (
                <Image
                  source={dogData.imgUrl}
                  style={styles.dogImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.placeholderImage}>
                  <Icon name="dog" size={48} color="#ccc" />
                </View>
              )}
              <View style={styles.textContainer}>
                <MyAppText style={styles.cardTitle}>{name}</MyAppText>
                <MyAppText style={styles.cardInfo} numberOfLines={3}>
                  {dogData.info}
                </MyAppText>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(name)}
                hitSlop={10}>
                <Icon name="trash-can-outline" size={22} color="#D63384" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: moderateVerticalScale(20),
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: 40,
    width: '100%',
  },
  emptyContainer: {
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
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: moderateScale(12),
    borderRadius: 12,
    marginBottom: moderateVerticalScale(12),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    width: '100%',
  },
  dogImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: moderateScale(12),
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    padding: 6,
    marginLeft: 8,
  },
});

export default FavoriteScreen;
