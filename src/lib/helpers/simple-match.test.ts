import { expect, test } from "vitest";
import { simpleMatch } from "./simple-match";

const testData = [
  [
    ["", ""],
    true,
  ],
  [
    ["Duh", "duh"],
    true,
  ],
  [
    ["lorem ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    true,
  ],
  [
    ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "lorem ipsum"],
    true,
  ],
  [
    ["lorem", "ipsum"],
    false,
  ],
  [
    ["friren", "frieren"],
    true,
  ],
  [
    ["soy family", "SPY FAMILY"],
    // well, simple-match was designed to implement really fast searching with some inaccuracies
    false,
  ],
  [
    ["sy family", "SPY FAMILY"],
    true,
  ],
  [
    ["lol", "loli"],
    true,
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Simple Match: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(
      simpleMatch(input[0], input[1]),
    ).toBe(output);
  });
}
