import { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  
  return (
    <header className="fixed top-0 w-full z-50 transition-all px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-red-600 text-3xl font-bold mr-8">MYFLIX</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-sm font-medium">Home</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">TV Shows</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Movies</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">New & Popular</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">My List</a>
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
          <Bell size={20} />
          <div className="flex items-center">
            <User size={20} className="mr-1" />
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;