import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import { ROUTES } from '../utils/routes';
import { 
  fetchTVShows,
  fetchTVGenres,
  fetchByGenre
} from '../api/tmdbApi';

const TVShowsPage = ({ onSearch }) => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreTVShows, setGenreTVShows] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVData = async () => {
      try {
        // Fetch TV categories
        const [popularData, topRatedData, airingTodayData, genresData] = await Promise.all([
          fetchTVShows('popular'),
          fetchTVShows('top_rated'),
          fetchTVShows('airing_today'),
          fetchTVGenres()
        ]);
        
        setPopular(popularData.results || []);
        setTopRated(topRatedData.results || []);
        setAiringToday(airingTodayData.results || []);
        setGenres(genresData.genres || []);
        
        // Fetch TV shows for first 5 genres
        const genreTVShowsData = {};
        const genresToFetch = genresData.genres?.slice(0, 5) || [];
        
        await Promise.all(genresToFetch.map(async (genre) => {
          const data = await fetchByGenre('tv', genre.id);
          genreTVShowsData[genre.id] = data.results || [];
        }));
        
        setGenreTVShows(genreTVShowsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV data:', error);
        setLoading(false);
      }
    };
    
    fetchTVData();
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Header onSearch={onSearch} currentPage={ROUTES.TV_SHOWS} />

      <div className="pt-20 pb-10 px-12">
        <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-400">Loading...</div>
          </div>
        ) : (
          <div>
            <ContentRow title="Popular TV Shows" items={popular} />
            <ContentRow title="Top Rated TV Shows" items={topRated} />
            <ContentRow title="Airing Today" items={airingToday} />
            
            {genres.slice(0, 5).map(genre => (
              <ContentRow 
                key={genre.id} 
                title={genre.name} 
                items={genreTVShows[genre.id] || []} 
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TVShowsPage;