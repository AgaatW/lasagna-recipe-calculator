// /src/assets/js/bakingRules.js

export const BAKING_RULES = {
  types: {
    standard: { baseTime: 40, colorTheme: 'classic' },
    vegan: { baseTime: 35, colorTheme: 'vegan' },
    'gluten-free': { baseTime: 25, colorTheme: 'gf' }
  },
  STANDARD_AREA: 900,
  traySizes: {
    small: 0.85,
    midi: 1.0,
    large: 1.15
  },
  trayDepths: {
    4: 0.85,
    6: 1.0,
    8: 1.2
  }
};