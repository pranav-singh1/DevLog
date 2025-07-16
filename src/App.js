import React from 'react';
import BuildLog from './BuildLog';
import NextPlans from './NextPlans';
import Chart from './Chart';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Compact Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
               DevLog
            </h1>
            <p className="text-gray-600 text-sm">
              Your personal development progress tracker
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Column - Build Log (1/3 width) */}
          <div className="lg:col-span-1">
            <BuildLog />
          </div>
          
          {/* Right Column - Future Features Area (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Feature Placeholder 1 - Main Feature */}
            <div>
              <Chart />
            </div>

            {/* Feature Placeholder 2 & 3 - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Feature Placeholder 2 */}
              <div>
                Coming Soon
              </div>

              {/* Feature Placeholder 3 */}
              <div>
                <NextPlans />
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* Footer - Sticks to Bottom */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-gray-500 text-sm mt-auto">
        <p>Keep building, keep growing!</p>
      </footer>
    </div>
  );
}

export default App;
