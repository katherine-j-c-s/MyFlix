import { BASE_URL, API_TOKEN } from '../constants/config';

const options = {
  method: 'GET',
  headers: { 
    accept: 'application/json', 
    Authorization: `Bearer ${API_TOKEN}`
  }
};

export const fetchTrending = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/day`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending:', error);
    return { results: [] };
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { results: [] };
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return { results: [] };
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return { results: [] };
  }
};

export const searchMulti = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error('Error searching:', error);
    return { results: [] };
  }
};
