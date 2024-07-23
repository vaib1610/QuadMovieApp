// import {  StyleSheet,View,Text } from 'react-native';

// // import { HelloWave } from '@/components/HelloWave';
// // import ParallaxScrollView from '@/components/ParallaxScrollView';
// // import { ThemedText } from '@/components/ThemedText';
// // import { ThemedView } from '@/components/ThemedView';
// // import { View,Text } from 'react-native-reanimated/lib/typescript/Animated';

// export default function HomeScreen() {
//   return (
//     <View>
// <Text>

// </Text>
//     </View> 
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Correct import
import { fetchMovies, groupMoviesByGenre } from '../apis/Networks';
import { Show } from '../Types/types';
import { RootStackParamList } from '../Types/navigation'; // Import your types

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;

const HomeScreen = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Show[]>>({});
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Use the correct type
  const handlePress = (movie: Show) => {
    navigation.navigate('Details/DetailsScreen', { movie });
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
    width: width - 20, // Adjust width as needed
    margin: 10,
    height: 200, // Fixed height
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3, // Reduced opacity for the background image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay for better text readability
  },
  movieContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  thumbnail: {
    width: 120, // Adjust width as needed
    height: 180, // Adjust height as needed
    marginRight: 10,
    borderRadius: 5,
    opacity: 0.8, // Thumbnail image opacity
  },
  movieDetails: {
    flex: 1,
    flexDirection: 'row', // Ensure title and summary are in a row
    flexWrap: 'wrap', // Allows wrapping of summary if it's too long
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flexShrink: 1, // Allows title to shrink if needed
  },
  summary: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    flexShrink: 1, // Allows summary to shrink if needed
    flexGrow: 1, // Allows summary to expand and take more horizontal space
    flexWrap: 'wrap', // Wraps text to the next line if it's too long
  },
});

export default HomeScreen;








