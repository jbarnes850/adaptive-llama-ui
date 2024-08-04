import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceDashboard: React.FC = () => {
  const { apiResponse, cumulativeMetrics } = useAppContext();

  const modelUsageData = {
    labels: ['Full Model', '8-bit Model', '4-bit Model'],
    datasets: [
      {
        data: apiResponse ? [
            apiResponse.metrics.modelUsage.full,
            apiResponse.metrics.modelUsage['8bit'],
            apiResponse.metrics.modelUsage['4bit'],
        ] : [0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Model Usage Distribution',
      },
    },
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Performance Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Average Response Time</h3>
          <p className="text-2xl font-bold">{cumulativeMetrics.averageLatency.toFixed(2)}ms</p>
          <p className="text-sm text-gray-500">Total Requests: {cumulativeMetrics.totalRequests}</p>
        </div>
        <div>
          <h3 className="font-semibold">Model Usage</h3>
          <div className="w-full h-40">
            <Pie data={modelUsageData} options={pieOptions} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Memory Savings</h3>
          <p className="text-2xl font-bold">{apiResponse ? `${apiResponse.metrics.memorySavings.toFixed(2)}%` : 'N/A'}</p>
          <p className="text-sm text-gray-500">Compared to always using full model</p>
        </div>
      </div>
      {apiResponse && (
        <div className="mt-4">
          <h3 className="font-semibold">Latest Request Performance</h3>
          <ul className="mt-2 space-y-1">
            <li>Model Used: <span className="font-bold">{apiResponse.model}</span></li>
            <li>Latency: <span className="font-bold">{apiResponse.metrics.latency}ms</span></li>
            <li>Memory Usage: <span className="font-bold">{apiResponse.metrics.memoryUsage}GB</span></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;