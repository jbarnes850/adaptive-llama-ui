import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { sendPrompt, ApiResponse } from '../lib/api';

interface ComparisonResult {
  full: ApiResponse | null;
  '8bit': ApiResponse | null;
  '4bit': ApiResponse | null;
}

const ComparisonMode: React.FC = () => {
  const { isComparisonMode, setIsComparisonMode, input } = useAppContext();
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult>({
    full: null,
    '8bit': null,
    '4bit': null,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleComparisonToggle = () => {
    setIsComparisonMode(!isComparisonMode);
    if (!isComparisonMode) {
      runComparison();
    } else {
      setComparisonResults({ full: null, '8bit': null, '4bit': null });
    }
  };

  const [error, setError] = useState<string | null>(null);

  const runComparison = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fullModelResponse = await sendPrompt(input, 'full');
      const eightBitResponse = await sendPrompt(input, '8bit');
      const fourBitResponse = await sendPrompt(input, '4bit');

      setComparisonResults({
        full: fullModelResponse,
        '8bit': eightBitResponse,
        '4bit': fourBitResponse,
      });
    } catch (error) {
      console.error('Error running comparison:', error);
      setError('An error occurred while running the comparison. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderComparisonResults = () => {
    return (
      <div className="mt-4 grid grid-cols-3 gap-4">
        {Object.entries(comparisonResults).map(([model, result]) => (
          <div key={model} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">{model === 'full' ? 'Full Model' : `${model} Model`}</h3>
            {result ? (
              <>
                <p className="mb-2">{result.response}</p>
                <ul className="text-sm">
                  <li>Latency: {result.metrics.latency}ms</li>
                  <li>Memory Usage: {result.metrics.memoryUsage}GB</li>
                  <li>Task Complexity: {result.metrics.taskComplexity}</li>
                </ul>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Comparison Mode</h2>
      <button
        className={`px-4 py-2 rounded ${
          isComparisonMode ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
        onClick={handleComparisonToggle}
        disabled={isLoading}
      >
        {isComparisonMode ? 'Disable' : 'Enable'} Comparison Mode
      </button>
      {isLoading && <p className="mt-2">Running comparison...</p>}
      {isComparisonMode && renderComparisonResults()}
    </div>
  );
};

export default ComparisonMode;