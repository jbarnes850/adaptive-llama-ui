import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

export async function POST(request: Request) {
  const { prompt, model } = await request.json();

  if (!API_URL) {
    return NextResponse.json({ error: 'API URL is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ prompt, model }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling backend API:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}