import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ApiResponse } from '../lib/api';

interface AppContextType {
  input: string;
  setInput: (input: string) => void;
  apiResponse: ApiResponse | null;
  setApiResponse: (response: ApiResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        apiResponse,
        setApiResponse,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}