export interface ApiResponse {
    response: string;
    model: string;
    metrics: {
      latency: number;
      memoryUsage: number;
      taskComplexity: string;
      modelUsage: {
        full: number;
        '8bit': number;
        '4bit': number;
      };
      memorySavings: number;
    };
  }
  
  export async function sendPrompt(prompt: string, model: 'full' | '8bit' | '4bit' = 'full'): Promise<ApiResponse> {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send prompt');
    }
  
    return response.json();
  }