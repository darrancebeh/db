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

/**
 * Defines the concrete visual properties that will be passed to the 3D components.
 * This structure is the output of our visual data mapping utility.
 */
export interface CrystalVisualParams {
  // Color properties for the crystal's core and data motes
  coreColor: string;       // Hex color string (e.g., '#FF5733')
  moteColor: string;       // Hex color string

  // Intensity and activity properties
  coreIntensity: number;   // A normalized value (e.g., 0.1 to 1.0) for the core's brightness
  pulseFrequency: number;  // A value representing pulse speed (e.g., Hz or a simple factor)
  agitation: number;       // A normalized value for chaotic movement (e.g., of motes or crystal facets)

  // Density and flow properties
  moteCount: number;       // The absolute number of motes to render
  flowIntensity: number;   // A factor controlling the speed of mote flow
}