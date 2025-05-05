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

export const fetchTVShows = async (category = 'popular') => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${category}`, options);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} TV shows:`, error);
    return { results: [] };
  }
};

export const fetchMovieGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return { genres: [] };
  }
};

export const fetchTVGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list`, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    return { genres: [] };
  }
};

export const fetchByGenre = async (mediaType, genreId, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/${mediaType}?with_genres=${genreId}&page=${page}`, 
      options
    );
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${mediaType} by genre:`, error);
    return { results: [] };
  }
};

export const fetchNewReleases = async () => {
  // Get movies released in the last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
  const toDate = today.toISOString().split('T')[0];
  
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&sort_by=popularity.desc`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return { results: [] };
  }
};

export const searchMulti = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error('Error searching:', error);
    return { results: [] };
  }
};