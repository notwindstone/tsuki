import { expect, test } from "vitest";
import { createAnilistQuery } from "./create-anilist-query";
import { ChunkSize } from "@/constants/app";

const testData: Array<
  [
    // gets function arguments type
    Parameters<typeof createAnilistQuery>[number],
    {
      "query"    : string;
      "variables": string;
    },
  ]
> = [
  [
    // input
    {
      "queries": [
        {
          "alias"    : "main",
          "name"     : "Page.Media",
          "fields"   : ["id", "title.english", "title.romaji"],
          "variables": {
            "media": {
              "search": "sousou no frieren",
            },
            "page": {
              "page"   : 1,
              "perPage": ChunkSize,
            },
          },
        },
      ],
    },
    // output
    {
      "query"    : "query($searchMain: String, $pageMain: Int, $perPageMain: Int) { Main: Page(perPage" +
        ": $perPageMain, page: $pageMain) { media(search: $searchMain) { id title {english romaji} } } }",
      "variables": JSON.stringify({
        // 'Main' because of the alias
        "pageMain"   : 1,
        "perPageMain": ChunkSize,
        "searchMain" : "sousou no frieren",
      }),
    },
  ],
  [
    // input
    {
      "queries": [
        {
          "alias"    : "genres",
          "name"     : "GenreCollection",
          "fields"   : [],
          "variables": {
            "page" : {},
            "media": {},
          },
        },
        {
          "alias"    : "kasaneTeto",
          "name"     : "MediaTagCollection",
          "fields"   : ["id", "name", "category"],
          "variables": {
            "page" : {},
            "media": {},
          },
        },
        {
          "alias"    : "somewhereInNevada",
          "name"     : "Page.Media",
          "fields"   : ["id", "title.english", "title.romaji"],
          "variables": {
            "media": {
              "type"      : "ANIME",
              "seasonYear": 2024,
              "format"    : "TV",
              "sort"      : "POPULARITY_DESC",
            },
            "page": {
              "page"   : 34,
              "perPage": 2,
            },
          },
        },
      ],
    },
    // output
    {
      "query": "query($typeSomewhereInNevada: MediaType, $seasonYearSomewhereInNevada: Int" +
        ", $formatSomewhereInNevada: MediaFormat, $sortSomewhereInNevada: [MediaSort]" +
        ", $pageSomewhereInNevada: Int, $perPageSomewhereInNevada: Int) { Genres" +
        ": GenreCollection KasaneTeto: MediaTagCollection { id name category }" +
        " SomewhereInNevada: Page(perPage: $perPageSomewhereInNevada, page: $pageSomewhereInNevada)" +
        " { media(type: $typeSomewhereInNevada, seasonYear: $seasonYearSomewhereInNevada, format" +
        ": $formatSomewhereInNevada, sort: $sortSomewhereInNevada) { id title {english romaji} } } }",
      "variables": JSON.stringify({
        // 'Main' because of the alias
        "pageSomewhereInNevada"      : 34,
        "perPageSomewhereInNevada"   : 2,
        "typeSomewhereInNevada"      : "ANIME",
        "seasonYearSomewhereInNevada": 2024,
        "formatSomewhereInNevada"    : "TV",
        "sortSomewhereInNevada"      : "POPULARITY_DESC",
      }),
    },
  ],
];

for (const [input, output] of testData) {
  const testName = `Create Anilist Query: ${input}`;

  test(testName, () => {
    expect(
      createAnilistQuery(input),
    ).toStrictEqual(output);
  });
}
