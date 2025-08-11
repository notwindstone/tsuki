import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
import { createAnilistQuery } from "@/lib/graphql/create-anilist-query";
import { getAnimeEntryFromUnknown } from "@/lib/helpers/get-anime-entry-from-unknown";

export async function fetchAnilistByIdMal(idMal: string): Promise<AnimeEntryType> {
  const integerIdMal = Number(idMal);

  // if it's not a number don't make a fetch
  if (Number.isNaN(integerIdMal)) {
    return {};
  }

  const response = await fetch("https://graphql.anilist.co", {
    "method" : "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify(
      createAnilistQuery({
        "queries": [
          {
            "alias" : "current",
            "name"  : "Media",
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
            ],
            "variables": {
              "media": {
                "type" : "ANIME",
                "idMal": integerIdMal,
              },
              "page": {},
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
    !("Current" in data.data)
  ) {
    return {};
  }

  return getAnimeEntryFromUnknown(data.data.Current);
}
