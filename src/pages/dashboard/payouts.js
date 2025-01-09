import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Payouts = () => {
  const articles = useSelector((state) => state.news?.articles) || [];
  const [payoutRate, setPayoutRate] = useState(() => {
    return Number(localStorage.getItem('payoutRate')) || 5;
  });
  const [calculatedArticles, setCalculatedArticles] = useState([]);

  useEffect(() => {
    const articlesWithPayout = articles.map(article => ({
      ...article,
      payout: Number(payoutRate),
      title: article.title || 'Untitled',
      author: article.author || 'Unknown Author'
    }));
    setCalculatedArticles(articlesWithPayout);
  }, [articles, payoutRate]);

  const totalPayout = calculatedArticles.reduce((acc, article) => acc + article.payout, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4  text-gray-700">Payout Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Articles</p>
            <p className="text-2xl font-bold  text-gray-500">{calculatedArticles.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Rate per Article</p>
            <p className="text-2xl font-bold  text-gray-500">${payoutRate}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Total Payout</p>
            <p className="text-2xl font-bold text-gray-500">${totalPayout}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payout Rate per Article
        </label>
        <input
          type="number"
          min="0"
          step="0.1"
          className="w-full md:w-1/3 p-2 border rounded-md focus:ring-2 focus:ring-blue-200  text-gray-500"
          value={payoutRate}
          onChange={(e) => setPayoutRate(Number(e.target.value))}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Article Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Published Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                Payout
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calculatedArticles.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                  {article.author}
                </td>
                <td className="px-6 py-4  text-gray-500">
                  {article.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right  text-gray-500">
                  ${article.payout}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-800">
            <tr>
              <td colSpan="3" className="px-6 py-4 text-right font-medium">
                Total
              </td>
              <td className="px-6 py-4 text-right font-bold">
                ${totalPayout}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Payouts;