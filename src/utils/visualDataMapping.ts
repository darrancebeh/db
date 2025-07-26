// src/utils/visualDataMapping.ts

import { CombinedMarketData, CrystalVisualParams, FearAndGreedValue } from '@/types/marketData';

// --- Visual Constants ---
// Define our color palette for market states.
const PALETTE = {
  EXTREME_FEAR: '#FF5353', // Vivid Red
  FEAR: '#FFa754',         // Orange
  NEUTRAL: '#FFF59D',      // Soft Yellow
  GREED: '#B2FF9D',        // Light Green
  EXTREME_GREED: '#69FFC4',// Bright Cyan/Green
};

/**
 * Maps the Fear & Greed classification to a specific hex color.
 * @param classification The string classification from the API.
 * @returns A hex color string.
 */
function getFearGreedColor(classification: FearAndGreedValue['value_classification']): string {
  switch (classification) {
    case 'Extreme Fear':
      return PALETTE.EXTREME_FEAR;
    case 'Fear':
      return PALETTE.FEAR;
    case 'Greed':
      return PALETTE.GREED;
    case 'Extreme Greed':
      return PALETTE.EXTREME_GREED;
    case 'Neutral':
    default:
      return PALETTE.NEUTRAL;
  }
}

/**
 * A simple utility to map a value from one range to another (normalization).
 * @param value The input value.
 * @param inMin The minimum of the input range.
 * @param inMax The maximum of the input range.
 * @param outMin The minimum of the output range.
 * @param outMax The maximum of the output range.
 * @returns The mapped value.
 */
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}


/**
 * The main mapping function. It takes raw market data and translates it
 * into a set of concrete visual parameters for the 3D scene.
 *
 * @param marketData The raw market data object from our hook.
 * @returns A CrystalVisualParams object, or null if input is invalid.
 */
export function mapMarketDataToVisualParams(
  marketData: CombinedMarketData | undefined
): CrystalVisualParams | null {
  if (!marketData?.latestFearAndGreed) {
    return null; // Return null if data is not yet loaded or is invalid
  }

  const { value, value_classification } = marketData.latestFearAndGreed;

  // --- Logic for mapping each visual parameter ---

  // Color is determined directly by classification.
  const color = getFearGreedColor(value_classification);

  // Intensity & Agitation are based on how far from neutral (50) the value is.
  const distanceFromNeutral = Math.abs(value - 50);
  const coreIntensity = mapRange(distanceFromNeutral, 0, 50, 0.2, 1.0); // Never fully dim
  const agitation = mapRange(distanceFromNeutral, 0, 50, 0.0, 1.0);

  // Pulse frequency also increases with distance from neutral.
  const pulseFrequency = mapRange(distanceFromNeutral, 0, 50, 0.5, 2.0); // e.g., 0.5Hz to 2Hz

  // Mote count and flow can be tied to the raw value.
  // More greed = more activity. More fear = less activity.
  const moteCount = Math.floor(mapRange(value, 0, 100, 1000, 5000)); // 1k to 5k motes
  const flowIntensity = mapRange(value, 0, 100, 0.5, 1.5);

  const visualParams: CrystalVisualParams = {
    coreColor: color,
    moteColor: color,
    coreIntensity,
    pulseFrequency,
    agitation,
    moteCount,
    flowIntensity,
  };

  return visualParams;
}