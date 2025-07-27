// src/types/marketData.ts

/**
 * Represents the single, latest value object from the CoinMarketCap Fear & Greed Index.
 */
export interface FearAndGreedValue {
  value: number;
  value_classification: string; // Keep as string for flexibility
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

/**
 * --- DEPRECATED ---
 * The CrystalVisualParams interface is no longer used and is replaced by HorizonVisualParams.
 * We are deleting the old interface to keep the codebase clean.
 */
// export interface CrystalVisualParams { ... } // This has been removed.


/**
 * --- NEW for Pass 2 ---
 * Defines the concrete visual properties that will be passed to the Event Horizon
 * components, specifically the AccretionDisk.
 */
export interface HorizonVisualParams {
  diskColor: string;       // A hex color string (e.g., '#FF5733') for the disk's base color.
  diskVelocity: number;    // A multiplier for the disk's orbital and turbulence speed.
  diskTurbulence: number;  // A factor from 0.0 to 1.0+ controlling the chaos in the shader.
  lensingStrength: number; // A placeholder for the future gravitational lensing effect.
}


// --- Helper types for server-side fetching (remain unchanged) ---

interface CmcStatus {
  timestamp: string;
  error_code: number | string;
  error_message: string | null;
  elapsed: number;
  credit_count: number;
  notice?: string | null;
}

export interface CmcLatestFearAndGreedApiResponse {
  data: FearAndGreedValue;
  status: CmcStatus;
}