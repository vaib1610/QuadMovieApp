
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import { fetchMovies, groupMoviesByGenre } from '../apis/Networks';
import { Show } from '../Types/types';
import { RootStackParamList } from '../Types/navigation'; 

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;

const HomeScreen = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Show[]>>({});
  const navigation = useNavigation<HomeScreenNavigationProp>(); 
  const handlePress = (movie: Show) => {
    navigation.navigate('details/DetailsScreen', { movie });
  };

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies();
      setMoviesByGenre(groupMoviesByGenre(movies));
    };
    getMovies();
  }, []);

  const renderMovie = ({ item }: { item: Show }) => (
    <TouchableOpacity
      // onPress={() => navigation.navigate('details', { movie: item })}
      onPress={() => handlePress(item)}
      style={styles.movieContainer}
    >
      <Image source={{ uri: item.image?.original }} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.movieContent}>
        <Image source={{ uri: item.image?.original }} style={styles.thumbnail} />
        <View style={styles.movieDetails}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.summary}>{item.summary?.replace(/<[^>]+>/g, '')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGenre = (genre: string) => (
    <View style={styles.genreContainer} key={genre}>
      <Text style={styles.genreTitle}>{genre}</Text>
      <FlatList
        data={moviesByGenre[genre]}
        renderItem={renderMovie}
        keyExtractor={(movie) => movie.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {Object.keys(moviesByGenre).map((genre) => renderGenre(genre))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  genreContainer: {
    marginVertical: 10,
  },
  genreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  movieContainer: {
    width: width - 20, 
    margin: 10,
    height: 200, 
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3, 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  movieContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  thumbnail: {
    width: 120, 
    height: 180, 
    marginRight: 10,
    borderRadius: 5,
    opacity: 0.8, 
  },
  movieDetails: {
    flex: 1,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 1, 
  },
  summary: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    flexShrink: 1, 
    flexGrow: 1, 
    flexWrap: 'wrap', 
  },
});

export default HomeScreen;








