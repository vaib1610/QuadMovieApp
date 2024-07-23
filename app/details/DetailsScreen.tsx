import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Show } from '../Types/types';

type DetailsScreenRouteProp = RouteProp<{ Details: { movie: Show } }, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { movie } = route.params;

  // Function to handle link press
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.genres}>{movie.genres.join(', ')}</Text>
      <Text style={styles.summary}>{movie.summary?.replace(/<[^>]+>/g, '')}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Language: {movie.language}</Text>
        <Text style={styles.info}>Status: {movie.status}</Text>
        <Text style={styles.info}>Runtime: {movie.runtime} mins</Text>
        <Text style={styles.info}>Premiered: {movie.premiered}</Text>
        <Text style={styles.info}>Rating: {movie.rating.average}</Text>
        <Text style={styles.info}>Network: {movie.network?.name}</Text>
      </View>
      {movie.officialSite && (
        <TouchableOpacity onPress={() => handleLinkPress(movie.officialSite)} style={styles.linkButton}>
          <Text style={styles.linkText}>Official Site</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover', // Ensures the image is fully visible
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  genres: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  summary: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#E50914',
    borderRadius: 5,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DetailsScreen;
