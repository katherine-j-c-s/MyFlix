import { IMAGE_BASE_URL } from '../constants/config';

const SearchResults = ({ query, results }) => {
  if (results.length === 0) return null;

  return (
    <div className="min-h-screen pt-24 px-12 bg-black">
      <h2 className="text-xl font-bold text-gray-200 mb-6">
        Search Results for: "{query}"
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {results.map(item => (
          <div key={item.id} className="group relative">
            <img 
              src={item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : '/api/placeholder/300/450'} 
              alt={item.title || item.name}
              className="rounded w-full h-auto shadow-lg transform transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 rounded opacity-0 group-hover:opacity-100">
              <h3 className="text-white font-medium text-sm">
                {item.title || item.name}
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;