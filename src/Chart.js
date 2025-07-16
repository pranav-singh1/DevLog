import React, { useState, useEffect } from 'react';

function Chart() {
    const [chartData, setChartData] = useState({
        totalLogs: 0,
        logsThisWeek: 0,
        currentStreak: 0,
        weeklyData: []
    });

    // Function to calculate chart data from logs
    const calculateChartData = (logs) => {
        if (logs.length === 0) {
            setChartData({
                totalLogs: 0,
                logsThisWeek: 0,
                currentStreak: 0,
                weeklyData: []
            });
            return;
        }

        // Calculate stats
        const totalLogs = logs.length;
        
        // Get last 7 days of data
        const today = new Date();
        const weeklyData = [];
        const logsPerDay = {};
        
        // Initialize last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            logsPerDay[dateStr] = 0;
            weeklyData.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: dateStr,
                count: 0
            });
        }
        
        // Count logs per day
        logs.forEach(log => {
            const logDate = new Date(log.date).toDateString();
            if (logsPerDay.hasOwnProperty(logDate)) {
                logsPerDay[logDate]++;
            }
        });
        
        // Update weekly data with actual counts
        weeklyData.forEach(day => {
            day.count = logsPerDay[day.date];
        });
        
        // Calculate logs this week
        const logsThisWeek = weeklyData.reduce((sum, day) => sum + day.count, 0);
        
        // Calculate current streak (consecutive days with logs)
        let currentStreak = 0;
        for (let i = weeklyData.length - 1; i >= 0; i--) {
            if (weeklyData[i].count > 0) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        setChartData({
            totalLogs,
            logsThisWeek,
            currentStreak,
            weeklyData
        });
    };

    useEffect(() => {
        // Load initial data
        const savedLogs = localStorage.getItem('buildLogs');
        const logs = savedLogs ? JSON.parse(savedLogs) : [];
        calculateChartData(logs);

        // Listen for updates from BuildLog component
        const handleLogsUpdate = (event) => {
            calculateChartData(event.detail.logs);
        };

        window.addEventListener('buildLogsUpdated', handleLogsUpdate);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('buildLogsUpdated', handleLogsUpdate);
        };
    }, []);

    const maxCount = Math.max(...chartData.weeklyData.map(d => d.count), 1);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[250px]">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    📊 Progress Stats
                </h3>
                <p className="text-gray-500 text-sm">Your development activity</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{chartData.totalLogs}</div>
                    <div className="text-xs text-gray-500">Total Logs</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{chartData.logsThisWeek}</div>
                    <div className="text-xs text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{chartData.currentStreak}</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                </div>
            </div>

            {/* Weekly Chart */}
            {chartData.weeklyData.length > 0 ? (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Last 7 Days</h4>
                    <div className="flex items-end justify-between gap-2 h-20">
                        {chartData.weeklyData.map((day, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                {/* Bar */}
                                <div className="w-full bg-gray-100 rounded-t flex flex-col justify-end" style={{ height: '60px' }}>
                                    {day.count > 0 && (
                                        <div 
                                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t relative"
                                            style={{ 
                                                height: `${(day.count / maxCount) * 60}px`,
                                                minHeight: day.count > 0 ? '8px' : '0px'
                                            }}
                                        >
                                            {/* Count label */}
                                            {day.count > 0 && (
                                                <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                                                    {day.count}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Day label */}
                                <div className="text-xs text-gray-500 mt-1">{day.day}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-8">
                    <div className="text-2xl mb-2">📈</div>
                    <p className="text-sm">Start logging to see your progress!</p>
                </div>
            )}
        </div>
    );
}

export default Chart;