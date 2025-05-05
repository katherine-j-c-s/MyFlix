import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/TVShowsPage';
import NewPopularPage from './pages/NewPopularPage';
import SearchResults from './components/SearchResults';
import { searchMulti } from './api/tmdbApi';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
        {isSearching ? (
          <SearchResults query={searchQuery} results={searchResults} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage onSearch={handleSearch} />} />
            <Route path="/movies" element={<MoviesPage onSearch={handleSearch} />} />
            <Route path="/tv-shows" element={<TVShowsPage onSearch={handleSearch} />} />
            <Route path="/new-popular" element={<NewPopularPage onSearch={handleSearch} />} />
          </Routes>
        )}
      </div>
  );
}