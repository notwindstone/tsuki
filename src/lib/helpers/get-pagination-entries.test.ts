import { expect, test } from "vitest";
import { getPaginationEntries } from "./get-pagination-entries";

// need to explicitly set the type
const testData = [
  [
    { "current": 1, "last": 60, "delta": 2 },
    JSON.stringify([1, 2, 3, "dots", 60]),
  ],
  [
    { "current": 2, "last": 30, "delta": 1 },
    JSON.stringify([1, 2, 3, "dots", 30]),
  ],
  [
    { "current": 1, "last": 10, "delta": 1 },
    JSON.stringify([1, 2, "dots", 10]),
  ],
  [
    { "current": 23, "last": 100, "delta": 4 },
    JSON.stringify([1, "dots", 19, 20, 21, 22, 23, 24, 25, 26, 27, "dots", 100]),
  ],
  [
    { "current": 5, "last": 10, "delta": 100 },
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ],
  [
    // out of bounds
    { "current": 20, "last": 10, "delta": 1 },
    JSON.stringify([1, "dots", 10]),
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Pagination Entries: ${input}`;

  test(testName, () => {
    expect(
      JSON.stringify(
        getPaginationEntries(input),
      ),
    ).toBe(output);
  });
}
