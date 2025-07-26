// src/hooks/useMarketData.ts

import useSWR from 'swr';
import { CombinedMarketData } from '@/types/marketData';

/**
 * A generic fetcher function for use with SWR.
 * It takes a URL, fetches it, and returns the parsed JSON data.
 * @param url The URL to fetch data from.
 * @returns The JSON data from the response.
 */
const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the server responds with a non-OK status, throw an error to be caught by SWR.
  if (!res.ok) {
    const errorInfo = await res.json();
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    (error as any).info = errorInfo;
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

/**
 * Custom hook to fetch and manage the state of our combined market data.
 * It uses SWR for caching, revalidation, and state management.
 *
 * @returns An object containing:
 * - `marketData`: The fetched market data (type: CombinedMarketData) or undefined if loading/error.
 * - `isLoading`: A boolean indicating if the data is currently being fetched.
 * - `error`: An error object if the fetch failed.
 */
export const useMarketData = () => {
  const { data, error, isLoading } = useSWR<CombinedMarketData>(
    '/api/market-data', // The key for SWR is our API endpoint URL
    fetcher,            // The function used to fetch the data
    {
      // Optional: Configure SWR behavior
      revalidateOnFocus: true, // Automatically re-fetch when the window gains focus
      revalidateOnReconnect: true, // Automatically re-fetch on network reconnect
    }
  );

  return {
    marketData: data,
    isLoading,
    error,
  };
};