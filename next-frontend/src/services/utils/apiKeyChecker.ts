// import { NextResponse } from 'next/server';

export function getApiKey() {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error('API key is missing in environment variables.');
    throw new Error('API key is missing');  // You can throw an error or handle it as needed
  }

  return apiKey;
}
