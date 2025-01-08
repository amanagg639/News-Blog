import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query; // Changed from url to id
  const { articles, status } = useSelector((state) => state.news);

  // Find article by matching decoded URLs
  const article = articles.find((a) => decodeURIComponent(a.url) === decodeURIComponent(id || ''));

  // Handle loading state
  if (status === 'loading' || !router.isReady) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Handle no article found
  if (!article && articles.length > 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Article Not Found</h2>
          
          <div className="bg-gray-50 rounded p-4 mb-4">
            <h3 className="font-medium mb-2">Debug Information:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify({
                requestedUrl: id,
                availableArticles: articles.length,
                status: status
              }, null, 2)}
            </pre>
          </div>

          <Link 
            href="/"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            ← Back to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors mb-6"
        >
          ← Back to articles
        </Link>

        {/* Article content */}
        <article className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">By {article.author || 'Unknown Author'}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>

          {article.urlToImage && (
            <div className="mb-6">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="prose max-w-none">
            {article.description && (
              <p className="text-xl text-gray-700 mb-6 font-medium">
                {article.description}
              </p>
            )}

            {article.content && (
              <p className="text-gray-700 leading-relaxed">
                {article.content.replace(/\[\+\d+ chars\]$/, '')}
              </p>
            )}
          </div>

          {/* Source link */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Read full article at source →
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;