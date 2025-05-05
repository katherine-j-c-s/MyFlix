import { IMAGE_BASE_URL } from '../constants/config';

const ContentCard = ({ item }) => {
  if (!item) return null;
  
  return (
    <div className="flex-none w-48 relative group">
      <img 
        src={item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : '/api/placeholder/300/450'} 
        alt={item.title || item.name}
        className="rounded object-cover w-full h-72 shadow-lg transform transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 rounded opacity-0 group-hover:opacity-100">
        <h3 className="text-white font-medium text-sm">
          {item.title || item.name}
        </h3>
      </div>
    </div>
  );
};

export default ContentCard;