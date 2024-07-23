// app/tabs/search.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { searchMovies } from '../apis/Networks'; // Adjust path if needed
import { Show } from '../Types/types';
import {TabBarIcon} from '@/components/navigation/TabBarIcon'; // Import TabBarIcon

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const performSearch = async () => {
      if (query.length === 0) {
        setResults([]);
        return;
      }
      setLoading(true);
      const searchResults = await searchMovies(query); // Implement searchMovies in your API
      setResults(searchResults);
      setLoading(false);
    };

    performSearch();
  }, [query]);

  const handlePress = (movie: Show) => {
    navigation.navigate('details/DetailsScreen', { movie });
  };

  const renderMovie = ({ item }: { item: Show }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.movieContainer}>
      <Image source={{ uri: item.image?.medium }} style={styles.thumbnail} />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <TabBarIcon name="search" color="white" size={24} style={styles.icon} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          placeholderTextColor='white' // Ensure placeholder text is also white
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  searchContainer: {
    position: 'relative', // To position icon absolutely inside
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute', // Position icon absolutely inside container
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // Center icon vertically
  },
  searchInput: {
    height: 40,
    flex: 1, // Allow input to take remaining space
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    paddingLeft: 40, // Space for the icon
  },
  icon: {
    // Additional styles if needed
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loading: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
