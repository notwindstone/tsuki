import { expect, test } from "vitest";
import { capitalizeWord } from "./capitalize-word";

const testData = [
  ["", ""],
  ["c", "C"],
  ["text", "Text"],
  ["Text", "Text"],
  ["ah yes", "Ah yes"],
  ["whaaar", "Whaaar"],
  ["weikav Lucky65v2", "Weikav Lucky65v2"],
  ["100", "100"],
  [
    "the 100 texts that are really, really, really, really, really long",
    "The 100 texts that are really, really, really, really, really long",
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Capitalize Word: ${input}`;

  test(testName, () => {
    expect(
      capitalizeWord(input),
    ).toBe(output);
  });
}
