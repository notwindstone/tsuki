import { expect, test } from "vitest";
import { formatListToGraphqlFields } from "./format-list-to-graphql-fields";

// need to explicitly set the type
const testData: Array<
  [
    Array<string>,
    string,
  ]
> = [
  [
    ["id"],
    "id",
  ],
  [
    ["id", "title.romaji", "title.english"],
    "id title {romaji english}",
  ],
  [
    ["", "", ""],
    "",
  ],
  [
    // should never occur tho
    ["title", "title.native"],
    "title {native}",
  ],
  [
    [
      "id",
      "idMal",
      "episodes",
      "status",
      "coverImage.extraLarge",
      "coverImage.large",
      "coverImage.medium",
      "coverImage.color",
      "relations.edges.node.id",
      "relations.edges.node.relations.edges.node.relations.edges.node.id",
    ],
    "id idMal episodes status coverImage {extraLarge large medium color} relations {edges {node {id relations {edges {node {relations {edges {node {id}}}}}}}}}",
  ],
];

for (const [input, output] of testData) {
  const testName = `Format List To GraphQL Fields: ${input}`;

  test(testName, () => {
    expect(
      formatListToGraphqlFields(input),
    ).toBe(output);
  });
}
