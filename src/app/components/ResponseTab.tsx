import React from 'react';
import { useAppContext } from '../context/AppContext';

const ResponseTab: React.FC = () => {
  const { apiResponse, isLoading } = useAppContext();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Response</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : apiResponse ? (
        <div className="bg-white p-2 rounded border">
          <p>{apiResponse.response}</p>
        </div>
      ) : (
        <p>No response yet. Send a prompt to get started!</p>
      )}
    </div>
  );
};

export default ResponseTab;