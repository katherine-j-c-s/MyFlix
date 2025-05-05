import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { fetchMovieGenres, fetchTVGenres } from '../api/tmdbApi';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  return (
    <header className="fixed top-0 w-full z-50 transition-all px-12 py-4 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-red-600 text-3xl font-bold mr-8">MYFLIX</Link>
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`text-sm hover:text-white transition-colors ${location.pathname === '/' ? 'font-medium text-white' : 'text-gray-300'}`}
            >
              Home
            </Link>
            
            <Link 
              to="/tv-shows" 
              className={`text-sm hover:text-white transition-colors ${location.pathname === '/tv-shows' ? 'font-medium text-white' : 'text-gray-300'}`}
            >
              TV Shows
            </Link>
            
            <Link 
              to="/movies" 
              className={`text-sm hover:text-white transition-colors ${location.pathname === '/movies' ? 'font-medium text-white' : 'text-gray-300'}`}
            >
              Movies
            </Link>
            
            <Link 
              to="/new-popular" 
              className={`text-sm hover:text-white transition-colors ${location.pathname === '/new-popular' ? 'font-medium text-white' : 'text-gray-300'}`}
            >
              New & Popular
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-black bg-opacity-60 border border-gray-600 text-white px-3 py-1 w-36 focus:w-64 transition-all duration-300 focus:outline-none rounded"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search size={18} className="absolute right-2 top-1.5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;