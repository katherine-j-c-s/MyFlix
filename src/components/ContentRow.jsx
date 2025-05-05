import ContentCard from './ContentCard';

const ContentRow = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mb-8 pl-12">
      <h2 className="text-lg font-bold text-gray-200 mb-4">{title}</h2>
      <div className="flex space-x-2 overflow-x-scroll scrollbar-hide pb-4">
        {items.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;