// src/utils/visualDataMapping.ts

import * as THREE from 'three';
import { CombinedMarketData, HorizonVisualParams } from '@/types/marketData';

const HORIZON_PALETTE = {
  FEAR: new THREE.Color('#5c7cfa'),
  NEUTRAL: new THREE.Color('#ffffff'),
  GREED: new THREE.Color('#ffc95c'),
};

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const clampedValue = Math.max(inMin, Math.min(value, inMax));
  return ((clampedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Interpolates a color based on the Fear & Greed value (0-100).
 * @param value The Fear & Greed value (0-100).
 * @returns A THREE.Color object.
 */
function getDiskColorFromValue(value: number): THREE.Color {
  // --- CORRECTION ---
  // The 'if/else' now returns a value directly, allowing 'color' to be a const.
  if (value < 50) {
    const alpha = mapRange(value, 0, 50, 0, 1);
    return new THREE.Color().copy(HORIZON_PALETTE.FEAR).lerp(HORIZON_PALETTE.NEUTRAL, alpha);
  } else {
    const alpha = mapRange(value, 50, 100, 0, 1);
    return new THREE.Color().copy(HORIZON_PALETTE.NEUTRAL).lerp(HORIZON_PALETTE.GREED, alpha);
  }
}

/**
 * The main new mapping function for Pass 2.
 * @param marketData The raw market data object from our hook.
 * @returns A HorizonVisualParams object, or null if input is invalid.
 */
export function mapMarketDataToHorizonParams(
  marketData: CombinedMarketData | undefined
): HorizonVisualParams | null {
  if (!marketData?.latestFearAndGreed) {
    return null;
  }

  const { value } = marketData.latestFearAndGreed;

  // 1. Get the THREE.Color object from our helper function.
  const colorObject = getDiskColorFromValue(value);
  // Convert it to a hex string for the final params object.
  const diskColor = `#${colorObject.getHexString()}`;

  // 2. Disk Velocity
  const diskVelocity = mapRange(value, 0, 100, 0.5, 2.0);

  // 3. Disk Turbulence
  const distanceFromNeutral = Math.abs(value - 50);
  const diskTurbulence = mapRange(distanceFromNeutral, 0, 50, 0.1, 1.0);

  // 4. Lensing Strength (placeholder)
  const lensingStrength = 0.0;

  const visualParams: HorizonVisualParams = {
    diskColor,
    diskVelocity,
    diskTurbulence,
    lensingStrength,
  };

  return visualParams;
}