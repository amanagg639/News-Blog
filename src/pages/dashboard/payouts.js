import { useState, useEffect } from 'react';

const Payouts = () => {
  const [payoutRate, setPayoutRate] = useState(5); // Example payout rate per article
  const [articles, setArticles] = useState([
    { author: 'John Doe', title: 'Tech News 1', payout: 0 },
    { author: 'Jane Smith', title: 'Tech News 2', payout: 0 },
  ]);

  useEffect(() => {
    // Example: Calculate payout for each article based on the rate
    setArticles((prevArticles) =>
      prevArticles.map((article) => ({
        ...article,
        payout: payoutRate,
      }))
    );
  }, [payoutRate]);

  const totalPayout = articles.reduce((acc, article) => acc + article.payout, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payouts</h1>
      <div className="mb-4">
        <label className="block text-sm">Payout Rate</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={payoutRate}
          onChange={(e) => setPayoutRate(e.target.value)}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Article</th>
            <th className="border px-4 py-2">Payout</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{article.author}</td>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">{article.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 font-bold">Total Payout: {totalPayout}</p>
    </div>
  );
};

export default Payouts;
