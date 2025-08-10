import { expect, test } from "vitest";
import { getHueFromScore } from "./get-hue-from-score";

// need to explicitly set the type
const testData = [
  [

    /** Input - Score - ranges from 0 to 100 */
    100,

    /** Output - Hue - ranges from 0 to 150 */
    150,
  ],
  [80, 90],
  [60, 30],
  [50, 0],
  [40, 0],
  [0, 0],
] as const;

for (const [input, output] of testData) {
  const testName = `Get Hue From Score: ${input}`;

  test(testName, () => {
    expect(
      getHueFromScore(input),
    ).toBe(output);
  });
}
