import React from 'react';

const PerformanceMetricsTab: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <ul>
        <li>Latency: 150ms</li>
        <li>Memory Usage: 4.2GB</li>
        <li>Task Complexity: Medium</li>
      </ul>
    </div>
  );
};

export default PerformanceMetricsTab;