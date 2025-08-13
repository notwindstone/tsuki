import { expect, test } from "vitest";
import { validateConfig } from "./validate-config";
import { DefaultConfig } from "@/constants/app";

const testData = [
  ["", DefaultConfig],
  ["some string", DefaultConfig],
  [0, DefaultConfig],
  [1234, DefaultConfig],
  [[], DefaultConfig],
  [{}, DefaultConfig],
  [null, DefaultConfig],
  [true, DefaultConfig],
  [false, DefaultConfig],
  [undefined, DefaultConfig],
  [() => {}, DefaultConfig],
  // real tests
  [
    {
      "hideEpisodeImages": 0,
    },
    DefaultConfig,
  ],
  [
    {
      "hideEpisodeImages": true,
    },
    {
      ...DefaultConfig,
      "hideEpisodeImages": true,
    },
  ],
  [
    {
      "transitionDuration": true,
    },
    DefaultConfig,
  ],
  [
    {
      "transitionDuration": 5,
    },
    {
      ...DefaultConfig,
      "transitionDuration": 5,
    },
  ],
  [
    {
      "transitions"       : false,
      "hideEpisodeImages" : "",
      "transitionDuration": 1,
      "confirmation"      : true,
      "chunkSize"         : 0,
    },
    {
      ...DefaultConfig,
      "transitions"       : false,
      "transitionDuration": 1,
      "confirmation"      : true,
      "chunkSize"         : 0,
    },
  ],
  [
    {
      "transitions"       : true,
      "hideEpisodeImages" : true,
      "transitionDuration": 200,
      "confirmation"      : true,
      "chunkSize"         : 30,
    },
    {
      ...DefaultConfig,
      "transitions"       : true,
      "hideEpisodeImages" : true,
      "transitionDuration": 200,
      "confirmation"      : true,
      "chunkSize"         : 30,
    },
  ],
] as const;

for (const [input, output] of testData) {
  const testName = `Validate Config: ${input}`;

  test(testName, () => {
    expect(
      JSON.stringify(validateConfig(input)),
    ).toBe(
      JSON.stringify(output),
    );
  });
}
