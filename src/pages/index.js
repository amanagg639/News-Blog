import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setFilteredArticles, fetchNews } from '../Redux/store/newsReducer.js';
import NewsCard from '../components/News/NewsCard';
import Link from 'next/link';

const initialFilters = {
  searchQuery: '',
  author: '',
  startDate: '',
  endDate: ''
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.news?.filters) || initialFilters;
  const articles = useSelector((state) => state.news?.articles) || [];
  const filteredArticles = useSelector((state) => state.news?.filteredArticles) || [];
  const status = useSelector((state) => state.news?.status) || 'idle';
  const error = useSelector((state) => state.news?.error);

  // Fetch news on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [dispatch, status]);

  // Filter articles when filters or articles change
  useEffect(() => {
    if (!articles.length) return;

    const filtered = articles.filter((article) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const title = article.title?.toLowerCase() || '';
        const description = article.description?.toLowerCase() || '';
        
        if (!title.includes(query) && !description.includes(query)) {
          return false;
        }
      }

      // Author filter
      if (filters.author) {
        const authorQuery = filters.author.toLowerCase();
        const articleAuthor = article.author?.toLowerCase() || '';
        
        if (!articleAuthor.includes(authorQuery)) {
          return false;
        }
      }

      // Date range filter
      if (filters.startDate && filters.endDate) {
        const articleDate = new Date(article.publishedAt);
        const start = new Date(filters.startDate);
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999); // Include the entire end date
        
        if (!(articleDate >= start && articleDate <= end)) {
          return false;
        }
      }

      return true;
    });

    dispatch(setFilteredArticles(filtered));
  }, [articles, filters, dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">News Dashboard</h1>

        {/* Search and Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {/* Search Query */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Author and Date Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Filter by author..."
              value={filters.author || ''}
              onChange={(e) => handleFilterChange('author', e.target.value)}
              className="p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="p-3 border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="p-3 border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
          {filteredArticles.length === 0 && articles.length > 0 && (
            <p className="text-gray-500">No articles match your filters</p>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article, index) => (
            <Link 
              key={article.url || index} 
              href={`/article/${encodeURIComponent(article.url)}`}
              className="h-full"
            >
              <NewsCard article={article} />
            </Link>
            
))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && status !== 'loading' && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;