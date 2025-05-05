import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import { 
  fetchTrending, 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies, 
  searchMulti 
} from './api/tmdbApi';

export default function App() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      const data = await searchMulti(query);
      setSearchResults(data.results || []);
    }, 500);
    
    return () => clearTimeout(searchTimeout);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header onSearch={handleSearch} />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-400">Loading...</div>
        </div>
      ) : (
        <div>
          {isSearching ? (
            <SearchResults query={searchQuery} results={searchResults} />
          ) : (
            <>
              <Hero featured={featured} />
              <div className="relative z-10 mt-4">
                <ContentRow title="Trending Now" items={trending} />
                <ContentRow title="Popular Movies" items={popular} />
                <ContentRow title="Top Rated" items={topRated} />
                <ContentRow title="Upcoming" items={upcoming} />
              </div>
            </>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
}