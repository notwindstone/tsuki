const initialRange = 160;
const multiplier = 3;
const baseValue = 100 * multiplier;

export function getHueFromScore(score: number) {
  const scoreValue = score * multiplier;

  // returns a hue parameter for HSL color
  return Math.max(
    // hue should not go beyond 0-150 range
    0,
    initialRange - baseValue + scoreValue,
  );
}
