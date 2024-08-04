import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import Tooltip from './Tooltip';
import { analyzeComplexity } from '../lib/ComplexityAnalysis';
import { useAppContext } from '../context/AppContext';
import { sendPrompt } from '../lib/api';

interface ComplexityResult {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  factors: {
    length: number;
    uniqueWords: number;
    averageWordLength: number;
    specialCharacters: number;
  };
}

const InputTab: React.FC = () => {
  const { input, setInput, setApiResponse, setIsLoading } = useAppContext();
  const [complexity, setComplexity] = useState<ComplexityResult>({
    score: 0,
    level: 'Low',
    factors: { length: 0, uniqueWords: 0, averageWordLength: 0, specialCharacters: 0 },
  });

  const debouncedAnalyzeComplexity = useCallback(
    debounce((text: string) => {
      const result = analyzeComplexity(text);
      setComplexity(result);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedAnalyzeComplexity(input);
  }, [input, debouncedAnalyzeComplexity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sendPrompt(input);
      setApiResponse(response);
    } catch (error) {
      console.error('Error sending prompt:', error);
      setError('An error occurred while sending the prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getComplexityColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Input</h2>
      <textarea
        className="w-full h-32 p-2 border rounded"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your prompt here..."
      />
      <div className="mt-2">
        <p>
          Task Complexity:{' '}
          <span className={`font-bold ${getComplexityColor(complexity.level)}`}>
            {complexity.level}
          </span>
          <Tooltip content="Complexity is calculated based on input length, unique words, average word length, and special characters.">
            <span className="ml-1 cursor-help text-gray-500">ⓘ</span>
          </Tooltip>
        </p>
        <div className="mt-2 bg-white p-2 rounded border">
          <h3 className="font-semibold mb-1">Complexity Factors:</h3>
          <ul className="text-sm">
            <li>Input Length: {complexity.factors.length} characters</li>
            <li>Unique Words: {complexity.factors.uniqueWords}</li>
            <li>Avg. Word Length: {complexity.factors.averageWordLength.toFixed(2)} characters</li>
            <li>Special Characters: {complexity.factors.specialCharacters}</li>
          </ul>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(complexity.score / 100) * 100}%` }}
          ></div>
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Send Prompt
      </button>
    </div>
  );
};

export default InputTab;