// Service to fetch CoinMarketCap CMC100 Index and Fear & Greed Index
import type { CMC100Index, CMCFearGreedIndex, MarketDataState } from '../types/marketData';

const CMC100_URL = 'https://pro-api.coinmarketcap.com/v3/index/cmc100-latest';
const FEAR_GREED_URL = 'https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest';

export async function fetchCMC100Index(apiKey: string): Promise<CMC100Index | null> {
  try {
    const res = await fetch(CMC100_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      data: {
        index_name: data.data.index_name ?? '',
        index_value: typeof data.data.index_value === 'number' ? data.data.index_value : 0,
        index_value_change_24h: typeof data.data.index_value_change_24h === 'number' ? data.data.index_value_change_24h : 0,
        index_value_change_7d: typeof data.data.index_value_change_7d === 'number' ? data.data.index_value_change_7d : 0,
        index_value_change_30d: typeof data.data.index_value_change_30d === 'number' ? data.data.index_value_change_30d : 0,
        index_value_change_90d: typeof data.data.index_value_change_90d === 'number' ? data.data.index_value_change_90d : 0,
        index_value_change_180d: typeof data.data.index_value_change_180d === 'number' ? data.data.index_value_change_180d : 0,
        index_value_change_365d: typeof data.data.index_value_change_365d === 'number' ? data.data.index_value_change_365d : 0,
        last_updated: data.data.last_updated ?? '',
      }
    };
  } catch {
    return null;
  }
}

export async function fetchFearGreedIndex(apiKey: string): Promise<CMCFearGreedIndex | null> {
export async function fetchFearGreedIndex(apiKey: string): Promise<CMCFearGreedIndex | null> {
  try {
    const res = await fetch(FEAR_GREED_URL, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      data: {
        value: typeof data.data.value === 'number' ? data.data.value : 0,
        value_classification: typeof data.data.value_classification === 'string' ? data.data.value_classification : '',
        timestamp: data.data.timestamp ?? '',
        time_until_update: data.data.time_until_update ?? '',
      }
    };
  } catch (e) {
    return null;
  }
}

export async function fetchMarketData(apiKey: string): Promise<MarketDataState> {
  let error: string | null = null;
  let cmc100: CMC100Index | null = null;
  let fearGreed: CMCFearGreedIndex | null = null;
  const lastUpdated = Date.now();
  try {
    const [cmc, fg] = await Promise.all([
      fetchCMC100Index(apiKey),
      fetchFearGreedIndex(apiKey),
    ]);
    if (!cmc || !fg) {
      error = 'Failed to fetch one or more market data endpoints.';
    } else {
      cmc100 = cmc;
      fearGreed = fg;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }
  return {
    cmc100,
    fearGreed,
    loading: false,
    error,
    lastUpdated,
  };
}
