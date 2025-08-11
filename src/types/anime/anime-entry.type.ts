import type { StatusType } from "@/types/anilist/status.type";

export type AnimeEntryType = Partial<{
  // Anilist ID
  "id"   : number;
  // MyAnimeList ID
  "idMal": number;
  "title": Partial<{
    "romaji" : string;
    "native" : string;
    "english": string;
  }>;
  "coverImage": Partial<{
    // every other image size by Anilist is in shitty quality
    "extraLarge": string;
  }>;
  // Anilist status
  "status"           : StatusType;
  // Anilist score
  "averageScore"     : number;
  // total episodes
  "episodes"         : number;
  // sometimes Anilist returns a list of streaming episodes with thumbnails, titles, etc.
  "streamingEpisodes": Array<Partial<{
    "url"      : string;
    "title"    : string;
    "thumbnail": string;
  }>>;

  /** History only: which episode user have opened */
  "currentEpisode": number;

  /** History only: when have user opened a page with this anime */
  "date": string;
}>;
