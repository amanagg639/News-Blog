import { useState } from 'react';

const ExportPage = ({ articles }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    const header = ['Author', 'Title', 'Payout'];
    const rows = articles.map((article) => [article.author, article.title, article.payout]);

    const csvContent = [
      header.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'payouts.csv');
    link.click();
    setIsExporting(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export Data</h1>
      <button
        onClick={handleExportCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isExporting}
      >
        {isExporting ? 'Exporting...' : 'Export as CSV'}
      </button>
    </div>
  );
};

// This can be fetched from the server or passed as a prop
export default ExportPage;
