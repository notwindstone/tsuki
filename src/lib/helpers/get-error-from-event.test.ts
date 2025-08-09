import { expect, test } from "vitest";
import { getErrorFromEvent } from "./get-error-from-event";

const testData = [
  [
    { "filename": 1 },
    JSON.stringify({}),
  ],
  [
    { "filename": Promise.resolve("just a string") },
    JSON.stringify({}),
  ],
  [
    { "filename": "index.js" },
    JSON.stringify({ "filename": "index.js" }),
  ],
  [
    { "message": "hello", "filename": "https://localhost:5173/tsuki/assets/index-miside.js" },
    JSON.stringify({ "message": "hello", "filename": "index-miside.js" }),
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Error From Event: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(
      JSON.stringify(
        getErrorFromEvent(input),
      ),
    ).toBe(output);
  });
}
