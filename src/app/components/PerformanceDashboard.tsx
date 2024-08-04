import React from 'react';

const PerformanceDashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Performance Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Average Response Time</h3>
          <p>180ms</p>
        </div>
        <div>
          <h3 className="font-semibold">Model Usage</h3>
          <ul>
            <li>Full: 20%</li>
            <li>8-bit: 50%</li>
            <li>4-bit: 30%</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Memory Savings</h3>
          <p>45%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;