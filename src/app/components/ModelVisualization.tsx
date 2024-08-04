import React from 'react';

const ModelVisualization: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Model Visualization</h2>
      {/* Add visual representation of the three models here */}
      <div className="flex justify-between">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <p>Full Model</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p>8-bit Model</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <p>4-bit Model</p>
        </div>
      </div>
    </div>
  );
};

export default ModelVisualization;