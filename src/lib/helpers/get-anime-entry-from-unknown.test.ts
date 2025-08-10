import { expect, test } from "vitest";
import { getAnimeEntryFromUnknown } from "./get-anime-entry-from-unknown";

const testData = [
  [
    { "id": 435 },
    JSON.stringify({ "id": 435 }),
  ],
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
      // it will always return an id
      "id"   : 0,
      "idMal": 0,
      "title": {
        "romaji": "kawaikute gomen",
      },
      "currentEpisode": 1,
    }),
  ],
  [
    {},
    JSON.stringify({ "id": 0 }),
  ],
  [
    {
      "DECO*": "27",
    },
    JSON.stringify({ "id": 0 }),
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
      "id"        : 0,
      "title"     : {},
      "coverImage": {},
    }),
  ],
  [
    {
      "status": "FINISHEd",
    },
    JSON.stringify({ "id": 0 }),
  ],
  [
    {
      "status": "FINISHED",
    },
    JSON.stringify({
      "id"    : 0,
      "status": "FINISHED",
    }),
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Anime Entry From Unknown: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(
      JSON.stringify(
        getAnimeEntryFromUnknown(input),
      ),
    ).toBe(output);
  });
}
