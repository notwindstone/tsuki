const initialRange = 150;
const multiplier = 3;
const baseValue = 100 * multiplier;

export function getHueFromScore(score: number) {
  const scoreValue = score * multiplier;

  // returns a hue parameter for HSL color
  return initialRange - baseValue + scoreValue;
}
