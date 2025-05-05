import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import { 
  fetchNewReleases, 
  fetchTrending,
  fetchUpcomingMovies,
  fetchTVShows
} from '../api/tmdbApi';

const NewPopularPage = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewAndPopularData = async () => {
      try {
        // Fetch all necessary data
        const [newReleasesData, trendingData, upcomingData, popularTVData] = await Promise.all([
          fetchNewReleases(),
          fetchTrending(),
          fetchUpcomingMovies(),
          fetchTVShows('popular')
        ]);
        
        setNewReleases(newReleasesData.results || []);
        setTrending(trendingData.results || []);
        setUpcoming(upcomingData.results || []);
        setPopularTV(popularTVData.results || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new & popular data:', error);
        setLoading(false);
      }
    };
    
    fetchNewAndPopularData();
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <div className="pt-20 pb-10 px-12">
        <h1 className="text-4xl font-bold mb-8">New & Popular</h1>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-gray-400">Loading...</div>
          </div>
        ) : (
          <div>
            <ContentRow title="New Releases" items={newReleases} />
            <ContentRow title="Trending Now" items={trending} />
            <ContentRow title="Upcoming Movies" items={upcoming} />
            <ContentRow title="Popular TV Shows" items={popularTV} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default NewPopularPage;