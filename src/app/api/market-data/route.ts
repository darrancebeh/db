// app/api/market-data/route.ts

import { NextResponse } from 'next/server';
import { CmcLatestFearAndGreedApiResponse, FearAndGreedValue } from '@/types/marketData';

// Revalidate data every 60 minutes
export const revalidate = 3600;

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  const url = 'https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest';

  if (!apiKey) {
    console.error('API Error: CoinMarketCap API key is not configured.');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
      next: { revalidate: revalidate },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CMC API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Failed to fetch data from CoinMarketCap: ${response.statusText}`);
    }

    const result: CmcLatestFearAndGreedApiResponse = await response.json();
    
    // --- CORRECTION ---
    // Access `result.data` directly as it's an object, not an array.
    const latestFearAndGreed: FearAndGreedValue = result.data;

    // A simple check to ensure the object is not empty or malformed
    if (!latestFearAndGreed || typeof latestFearAndGreed.value === 'undefined') {
      throw new Error("Malformed data received from CMC Fear & Greed API.");
    }

    // This is the final, clean data object we send to the client.
    const responseData = {
      latestFearAndGreed,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('An unexpected error occurred in /api/market-data:', error);

    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}