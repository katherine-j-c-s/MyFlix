import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import { ROUTES } from '../utils/routes';
import { 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies,
  fetchMovieGenres,
  fetchByGenre
} from '../api/tmdbApi';

const MoviesPage = ({ onSearch }) => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie categories
        const [popularData, topRatedData, upcomingData, genresData] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
          fetchMovieGenres()
        ]);
        
        setPopular(popularData.results || []);
        setTopRated(topRatedData.results || []);
        setUpcoming(upcomingData.results || []);
        setGenres(genresData.genres || []);
        
        // Fetch movies for first 5 genres
        const genreMoviesData = {};
        const genresToFetch = genresData.genres?.slice(0, 5) || [];
        
        await Promise.all(genresToFetch.map(async (genre) => {
          const data = await fetchByGenre('movie', genre.id);
          genreMoviesData[genre.id] = data.results || [];
        }));
        
        setGenreMovies(genreMoviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };
    
    fetchMovieData();
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Header onSearch={onSearch} currentPage={ROUTES.MOVIES} />

      <div className="pt-20 pb-10 px-12">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-400">Loading...</div>
          </div>
        ) : (
          <div>
            <ContentRow title="Popular Movies" items={popular} />
            <ContentRow title="Top Rated Movies" items={topRated} />
            <ContentRow title="Upcoming Movies" items={upcoming} />
            
            {genres.slice(0, 5).map(genre => (
              <ContentRow 
                key={genre.id} 
                title={genre.name} 
                items={genreMovies[genre.id] || []} 
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MoviesPage;
