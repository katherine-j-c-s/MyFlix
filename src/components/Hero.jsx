import { Play, Info } from 'lucide-react';
import { IMAGE_BASE_URL } from '../constants/config';

const Hero = ({ featured }) => {
  if (!featured) return null;
  
  const backdropPath = featured.backdrop_path 
    ? `${IMAGE_BASE_URL}/original${featured.backdrop_path}`
    : '/api/placeholder/1600/900';
    
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-black">
          <img 
            src={backdropPath}
            alt={featured.title || featured.name} 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      
      <div className="absolute bottom-32 left-12 text-white max-w-lg">
        <h1 className="text-5xl font-bold mb-4">
          {featured.title || featured.name}
        </h1>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-green-500 font-semibold">
            {Math.round(featured.vote_average * 10)}% Match
          </span>
          <span>{featured.release_date?.split('-')[0] || featured.first_air_date?.split('-')[0]}</span>
          <span className="border border-gray-500 px-1 text-xs">
            {featured.adult ? 'A' : 'PG-13'}
          </span>
        </div>
        <p className="text-sm text-gray-300 mb-6">{featured.overview}</p>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white text-black py-2 px-6 rounded font-semibold hover:bg-opacity-80">
            <Play size={20} className="mr-2" />
            Play
          </button>
          <button className="flex items-center bg-gray-500 bg-opacity-60 text-white py-2 px-6 rounded font-semibold hover:bg-opacity-40">
            <Info size={20} className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;