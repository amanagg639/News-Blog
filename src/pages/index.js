import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setFilteredArticles, fetchNews } from '../Redux/store/newsReducer.js';
import NewsCard from '../components/News/NewsCard';
import Link from 'next/link';
import Analytics from './dashboard/analytics.js';
import Payouts from './dashboard/payouts.js';
import Settings from './dashboard/settings.js';
import ExportPage from './dashboard/export.js';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('news');
  const filters = useSelector((state) => state.news?.filters) || {};
  const articles = useSelector((state) => state.news?.articles) || [];
  const filteredArticles = useSelector((state) => state.news?.filteredArticles) || [];
  const statuss = useSelector((state) => state.news?.statuss);

  const { status, session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/login');
  //   }
  // }, [status, router]);

  // const handleSignOut = async () => {
  //   try {
  //     await signOut({ redirect: true, callbackUrl: '/auth/login' });
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  const tabs = [
    { id: 'news', label: 'News' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'settings', label: 'Settings' },
    { id: 'export', label: 'Export' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics />;
      case 'payouts':
        return <Payouts />;
      case 'settings':
        return <Settings />;
      case 'export':
        return <ExportPage articles={articles} />;
      default:
        return (
          <>
            {/* Search and Filters Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={filters.searchQuery || ''}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

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
          </>
        );
    }
  };

  return (
   <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Messages */}
        {statuss === 'loading' && (
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;