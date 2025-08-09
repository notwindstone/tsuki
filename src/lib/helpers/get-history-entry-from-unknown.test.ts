import { expect, test } from "vitest";
import { getHistoryEntryFromUnknown } from "./get-history-entry-from-unknown";

const testData = [
  [
    {
      "idMal": 0,
      "title": {
        "romaji": "kawaikute gomen",
      },
      "unknown"       : 100,
      "currentEpisode": 1,
    },
    JSON.stringify({
      "idMal": 0,
      "title": {
        "romaji": "kawaikute gomen",
      },
      "currentEpisode": 1,
    }),
  ],
  [
    {},
    JSON.stringify({}),
  ],
  [
    {
      "DECO*": "27",
    },
    JSON.stringify({}),
  ],
  [
    {
      "idMal"         : undefined,
      "title"         : undefined,
      "coverImage"    : undefined,
      "episodes"      : undefined,
      "averageScore"  : undefined,
      "currentEpisode": undefined,
      "date"          : undefined,
    },
    JSON.stringify({
      "title"     : {},
      "coverImage": {},
    }),
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `History Entry: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(
      JSON.stringify(
        getHistoryEntryFromUnknown(input),
      ),
    ).toBe(output);
  });
}
