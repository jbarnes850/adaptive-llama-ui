import React from 'react';
import { useAppContext } from '../context/AppContext';

const ModelSelectionTab: React.FC = () => {
  const { apiResponse } = useAppContext();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Model Selection</h2>
      {apiResponse ? (
        <>
          <p>Selected Model: <span className="font-bold">{apiResponse.model}</span></p>
          <p className="mt-2">Reason: {apiResponse.metrics.taskComplexity} task complexity detected</p>
        </>
      ) : (
        <p>No model selected yet. Send a prompt to see the selection.</p>
      )}
    </div>
  );
};

export default ModelSelectionTab;