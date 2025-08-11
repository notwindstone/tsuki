import { expect, test } from "vitest";
import { getHueFromScore } from "./get-hue-from-score";

const testData = [
  [

    /** Input - Score - ranges from 0 to 100 */
    100,

    /** Output - Hue - ranges from 0 to 160 */
    160,
  ],
  [80, 100],
  [60, 40],
  [50, 10],
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
