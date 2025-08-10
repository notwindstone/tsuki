import type { StatusType } from "@/types/anilist/status.type";

export type HistoryEntryType = Partial<{
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
  "status"        : StatusType;
  // Anilist score
  "averageScore"  : number;
  // total episodes
  "episodes"      : number;
  // which episode user have opened
  "currentEpisode": number;
  // when have user opened a page with this anime
  "date"          : string;
}>;
