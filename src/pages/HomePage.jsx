import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import { ROUTES } from '../utils/routes';
import { 
  fetchTrending, 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies,
  fetchTVShows
} from '../api/tmdbApi';

const HomePage = ({ onSearch, searchQuery, searchResults, isSearching }) => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch trending content
        const trendingData = await fetchTrending();
        setTrending(trendingData.results || []);
        
        // Set a random trending item as featured content
        if (trendingData.results && trendingData.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingData.results.length);
          setFeatured(trendingData.results[randomIndex]);
        }
        
        // Fetch popular movies
        const popularData = await fetchPopularMovies();
        setPopular(popularData.results || []);
        
        // Fetch top rated movies
        const topRatedData = await fetchTopRatedMovies();
        setTopRated(topRatedData.results || []);
        
        // Fetch upcoming movies
        const upcomingData = await fetchUpcomingMovies();
        setUpcoming(upcomingData.results || []);
        
        // Fetch popular TV shows
        const popularTVData = await fetchTVShows('popular');
        setPopularTV(popularTVData.results || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Header onSearch={onSearch} currentPage={ROUTES.HOME} />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-400">Loading...</div>
        </div>
      ) : (
        <>
          <Hero featured={featured} />
          <div className="relative z-10 mt-4">
            <ContentRow title="Trending Now" items={trending} />
            <ContentRow title="Popular Movies" items={popular} />
            <ContentRow title="Popular TV Shows" items={popularTV} />
            <ContentRow title="Top Rated" items={topRated} />
            <ContentRow title="Upcoming" items={upcoming} />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default HomePage;