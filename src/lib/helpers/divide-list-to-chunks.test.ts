import { expect, test } from "vitest";
import { divideListToChunks } from "./divide-list-to-chunks";

// need to explicitly set the type
const testData: Array<
  [
    {
      "list"     : Array<string | number>;
      "chunkSize": number;
    },
    string,
  ]
> = [
  [
    {
      "list"     : [],
      "chunkSize": 1,
    },
    JSON.stringify({}),
  ],
  [
    {
      "list"     : ["moondrop", "space", "travel", "<3"],
      "chunkSize": 1,
    },
    JSON.stringify({
      "0": ["moondrop"],
      "1": ["space"],
      "2": ["travel"],
      "3": ["<3"],
    }),
  ],
  [
    {
      "list"     : ["why", "is", "blue archive", "so", "popular"],
      "chunkSize": 3,
    },
    JSON.stringify({
      "0": ["why", "is", "blue archive"],
      "1": ["so", "popular"],
    }),
  ],
  [
    {
      "list"     : ["svelte", "is", "cool", "like", "for", "real"],
      "chunkSize": 50,
    },
    JSON.stringify({
      "0": ["svelte", "is", "cool", "like", "for", "real"],
    }),
  ],
  [
    {
      "list"     : ["filian", "and", "weplay", "drama", "is", "insane"],
      "chunkSize": 2,
    },
    JSON.stringify({
      "0": ["filian", "and"],
      "1": ["weplay", "drama"],
      "2": ["is", "insane"],
    }),
  ],
  [
    {
      "list"     : ["mixed", 0, "with", 64_348, "some", "numbers", 12, 7_654, 9_085_436],
      "chunkSize": 2,
    },
    JSON.stringify({
      "0": ["mixed", 0],
      "1": ["with", 64_348],
      "2": ["some", "numbers"],
      "3": [12, 7_654],
      "4": [9_085_436],
    }),
  ],
];

for (const [input, output] of testData) {
  const testName = `Divide List To Chunks: ${JSON.stringify(input)}`;

  test(testName, () => {
    expect(
      JSON.stringify(
        divideListToChunks<string | number>(input),
      ),
    ).toBe(output);
  });
}
