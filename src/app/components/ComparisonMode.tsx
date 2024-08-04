import React, { useState } from 'react';

const ComparisonMode: React.FC = () => {
  const [isComparisonMode, setIsComparisonMode] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Comparison Mode</h2>
      <button
        className={`px-4 py-2 rounded ${
          isComparisonMode ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
        onClick={() => setIsComparisonMode(!isComparisonMode)}
      >
        {isComparisonMode ? 'Disable' : 'Enable'} Comparison Mode
      </button>
      {isComparisonMode && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {/* Add comparison results here */}
          <div>Full Model Results</div>
          <div>8-bit Model Results</div>
          <div>4-bit Model Results</div>
        </div>
      )}
    </div>
  );
};

export default ComparisonMode;