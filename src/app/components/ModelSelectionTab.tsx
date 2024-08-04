import React from 'react';
import { useAppContext } from '../context/AppContext';
import Tooltip from './Tooltip';

const ModelSelectionTab: React.FC = () => {
  const { apiResponse, complexity } = useAppContext();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Model Selection</h2>
      {apiResponse ? (
        <>
          <p>
            Selected Model:{' '}
            <span className="font-bold">{apiResponse.model}</span>
            <Tooltip content="The model is selected based on the complexity of the input task.">
              <span className="ml-1 cursor-help text-gray-500">ⓘ</span>
            </Tooltip>
          </p>
          <p className="mt-2">Reason: {complexity.level} task complexity detected</p>
        </>
      ) : (
        <p>No model selected yet. Send a prompt to see the selection.</p>
      )}
    </div>
  );
};

export default ModelSelectionTab;