import { useState } from 'react';

const Settings = () => {
  const [payoutRate, setPayoutRate] = useState(5);

  const handleSaveSettings = () => {
    localStorage.setItem('payoutRate', payoutRate);
    alert('Settings saved');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label className="block text-sm">Payout Rate</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={payoutRate}
          onChange={(e) => setPayoutRate(e.target.value)}
        />
      </div>
      <button
        onClick={handleSaveSettings}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
