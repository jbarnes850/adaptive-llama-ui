export interface ApiResponse {
    response: string;
    model: string;
    metrics: {
      latency: number;
      memoryUsage: number;
      taskComplexity: string;
    };
  }
  
  export async function sendPrompt(prompt: string): Promise<ApiResponse> {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send prompt');
    }
  
    return response.json();
  }