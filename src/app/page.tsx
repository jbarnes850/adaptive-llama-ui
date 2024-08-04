import { AppProvider } from './context/AppContext';
import ModelVisualization from './components/ModelVisualization';
import ModelSelectionTab from './components/ModelSelectionTab';
import InputTab from './components/InputTab';
import ResponseTab from './components/ResponseTab';
import PerformanceMetricsTab from './components/PerformanceMetricsTab';
import PerformanceDashboard from './components/PerformanceDashboard';
import ComparisonMode from './components/ComparisonMode';

export default function Home() {
  return (
    <AppProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <h1 className="text-3xl font-bold mb-8">Adaptive LLaMA Proxy (ALP)</h1>
        
        <div className="w-full max-w-4xl">
          <ModelVisualization />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <InputTab />
            <ModelSelectionTab />
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ResponseTab />
            <PerformanceMetricsTab />
          </div>
          
          <PerformanceDashboard />
          
          <ComparisonMode />
        </div>
      </main>
    </AppProvider>
  );
}