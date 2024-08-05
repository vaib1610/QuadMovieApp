import axios from 'axios';

const API_URL = 'https://api.tvmaze.com/search/shows?q=all';
import { Movie, Show } from '../Types/types';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const groupMoviesByGenre = (movies: Show[]): Record<string, Show[]> => {
  const grouped = {};
  movies.forEach(movie => {
    const genres = movie.show.genres;
    genres.forEach(genre => {
      if (!grouped[genre]) {
        grouped[genre] = [];
      }
      grouped[genre].push(movie.show);
    });
  });
  return grouped;
};

export const searchMovies = async (query: string): Promise<Show[]> => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.map((item: any) => item.show);
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };
