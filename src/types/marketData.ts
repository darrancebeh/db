// src/types/marketData.ts

/**
 * Represents the single, latest value object from the CoinMarketCap Fear & Greed Index.
 * Note: The API returns `update_time` for the latest endpoint, not `timestamp`.
 */
export interface FearAndGreedValue {
  value: number;
  value_classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed' | string;
  update_time: string;
}

/**
 * Represents the final, curated data object that our application's API
 * (/api/market-data) will provide to the frontend.
 */
export interface CombinedMarketData {
  latestFearAndGreed: FearAndGreedValue;
  // This interface is extensible for future data additions.
}

// --- Helper types for server-side fetching ---

interface CmcStatus {
  timestamp: string;
  error_code: number | string; // CMC sometimes returns error_code as a string "0"
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice?: string | null; // Notice is optional
}

/**
 * Represents the full, raw API response from the LATEST Fear & Greed endpoint.
 * Note: The `data` property is an OBJECT, not an array.
 */
export interface CmcLatestFearAndGreedApiResponse {
  data: FearAndGreedValue;
  status: CmcStatus;
}