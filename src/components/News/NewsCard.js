const NewsCard = ({ article }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"> 
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title} 
          className="w-full h-40 object-cover rounded-t-lg mb-4" 
        />
      )}
      <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
      <p className="text-sm text-gray-600">{article.author}</p>
      <p className="text-sm text-gray-600">{article.publishedAt}</p>
    </div>
  );
};

export default NewsCard;