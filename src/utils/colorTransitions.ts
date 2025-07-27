// Color scheme for different professional titles
export const colorScheme = {
  'Web3 DeFi Protocol Engineer': {
    particle: '#3b82f6',
    text: '#60a5fa',
    border: '#93c5fd',
    name: 'blue'
  },
  'US Market & Crypto Retail Quant': {
    particle: '#8b5cf6',
    text: '#a78bfa',
    border: '#c4b5fd',
    name: 'purple'
  },
  'Entrepreneur & Aspiring Founder': {
    particle: '#ec4899',
    text: '#f472b6',
    border: '#f9a8d4',
    name: 'pink'
  }
} as const;

export type TitleKey = keyof typeof colorScheme;

// Get color for a specific title
export const getColorForTitle = (title: string) => {
  return colorScheme[title as TitleKey] || colorScheme['Web3 DeFi Protocol Engineer'];
};

// Interpolate between two RGB colors
export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

  return rgbToHex(r, g, b);
};

// Get title array for cycling
export const titleArray: TitleKey[] = ['Web3 DeFi Protocol Engineer', 'US Market & Crypto Retail Quant', 'Entrepreneur & Aspiring Founder'];