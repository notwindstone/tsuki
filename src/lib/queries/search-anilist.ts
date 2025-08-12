import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
import { createAnilistQuery } from "@/lib/graphql/create-anilist-query";
import { getAnimeEntryFromUnknown } from "@/lib/helpers/get-anime-entry-from-unknown";

export async function searchAnilist(search: string, chunkSize: number): Promise<
  Array<AnimeEntryType>
> {
  // if search value is empty no need for fetching data
  if (search === "") {
    return [];
  }

  const searchAsNumber = Number(search);
  // set one of these fields based on 'Number.isNaN' check
  const toApply: Partial<{
    "idMal" : number;
    "search": string;
  }> = Number.isNaN(searchAsNumber)
    ? { "search": search }
    : { "idMal": searchAsNumber };

  const response = await fetch("https://graphql.anilist.co", {
    "method" : "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify(
      createAnilistQuery({
        "queries": [
          {
            "alias" : "search",
            "name"  : "Page.Media",
            "fields": [
              "id",
              "idMal",
              "title.romaji",
              "title.native",
              "title.english",
              "coverImage.extraLarge",
              "status",
              "averageScore",
              "episodes",
              "streamingEpisodes.title",
              "streamingEpisodes.url",
              "streamingEpisodes.thumbnail",
              "nextAiringEpisode.episode",
            ],
            "variables": {
              "media": {
                "type": "ANIME",
                ...toApply,
              },
              "page": {
                "page"   : 1,
                "perPage": chunkSize,
              },
            },
          },
        ],
      }),
    ),
  });
  const data: unknown = await response.json();

  /** maybe i should actually use runtime json validators */
  if (
    // check if data is an object and has the 'data' property
    typeof data !== "object" ||
    data === null ||
    !("data" in data) ||
    // check if data.data is an object and has the 'Search' property
    typeof data.data !== "object" ||
    data.data === null ||
    !("Search" in data.data) ||
    // check if data.data.Search is an object and has the 'media' property
    typeof data.data.Search !== "object" ||
    data.data.Search === null ||
    !("media" in data.data.Search) ||
    // check if data.data.Search.media is an array
    !Array.isArray(data.data.Search.media)
  ) {
    return [];
  }

  const unknownList: Array<unknown> = data.data.Search.media;

  return unknownList.map((entry: unknown) => getAnimeEntryFromUnknown(entry));
}
