import { expect, test } from "vitest";
import { debounce } from "./debounce";

const example = {
  "first" : "",
  "second": "",
};

const testData = [
  [
    [
      [
        () => example.first = "TUYU",
        () => example.first = "not TUYU",
      ],
      200,
    ],
    "TUYU",
    // object property
    "first",
  ],
  [
    [
      [
        () => example.second = "alps skcm cream damped",
        () => example.second = "gazzew boba u4",
      ],
      100,
    ],
    "gazzew boba u4",
    // object property
    "second",
  ],
] as const;

for (const [input, output, key] of testData) {
  const testName = `Debounce: ${input}`;
  const delay = input[1];

  test(testName, () => {
    for (const func of input[0]) {
      debounce(func, delay);
    }

    setTimeout(() => expect(example[key]).toBe(output), 150);
  });
}
