import React, { useState, useEffect } from 'react';

function BuildLog() {
  // Load initial data from localStorage or use empty array
  const [log, setLog] = useState('');
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('buildLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Save to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem('buildLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (log.trim() !== '') {
      setLogs([...logs, { text: log, date: new Date().toLocaleString() }]);
      setLog('');
    }
  };

  const handleDeleteLogs = () => {
    const confirmed = window.confirm("Are you sure you want to delete all logs?");
    if (confirmed) {
      setLogs([]);
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Header Section - More Compact */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-4 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          🛠️ Build Log
        </h2>
        <p className="text-blue-100 text-sm mt-1">Track your daily progress</p>
      </div>

      {/* Form Section - More Compact */}
      <div className="bg-white rounded-b-xl shadow-lg p-4 border-t-4 border-blue-500">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="logEntry" className="block text-xs font-medium text-gray-700 mb-1">
              What did you build today?
            </label>
            <textarea 
              id="logEntry"
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-sm"
              rows="3"
              placeholder="Describe your progress..."
              value={log}
              onChange={(e) => setLog(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={!log.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm"
          >
            Add to Build Log ✨
          </button>
        </form>
      </div>

      {/* Logs Section */}
      {logs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📚 Your Build History
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
            </span>
          </h3>
          
          <button onClick={handleDeleteLogs}
  className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded">
            Clear Logs
          </button>
          
          <div className="space-y-4">
            {[...logs].reverse().map((entry, index) => (
              <div 
                key={logs.length - index - 1}  // Use original index for key
                className="bg-white rounded-xl p-5 shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{entry.text}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      #{logs.length - index}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                     {entry.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {logs.length === 0 && (
        <div className="mt-8 text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No build logs yet</h3>
          <p className="text-gray-500">Start tracking your development journey by adding your first entry above!</p>
        </div>
      )}
    </div>
  );
}

export default BuildLog;
