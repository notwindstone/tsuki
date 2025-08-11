<script lang="ts">
  import type { StatusType } from "@/types/anilist/status.type";
  import { HistoryEntriesLimit, HistoryLocalStorageKey } from "@/constants/app";
  import { getAnimeEntryFromUnknown } from "@/lib/helpers/get-anime-entry-from-unknown";
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";

  let {
    id,
    idMal,
    title,
    currentEpisode,
    coverImage,
    status,
    score,
    episodes,
  }: {
    "id"            : number;
    "idMal"         : number;
    "title"         : string;
    "currentEpisode": number;
    "coverImage"    : string;
    "status"        : StatusType;
    "score"         : number;
    "episodes"      : number;
  } = $props();

  $effect(() => {
    console.log("hello?");
    const storedHistory = localStorage?.getItem?.(HistoryLocalStorageKey) ?? "[]";

    let unknownHistory: unknown;

    try {
      unknownHistory = JSON.parse(storedHistory);
    } catch (error) {
      console.log(error);

      unknownHistory = [];
    }

    if (!Array.isArray(unknownHistory)) {
      return;
    }

    const parsedHistory: Array<AnimeEntryType> = unknownHistory.map(
      (unknownEntry: unknown) => getAnimeEntryFromUnknown(unknownEntry),
    );

    parsedHistory.push({
      id,
      idMal,
      status,
      episodes,
      currentEpisode,
      "title": {
        // it's not always english tho
        "english": title,
      },
      "coverImage": {
        "extraLarge": coverImage,
      },
      "averageScore": score,
      "date"        : (new Date).toISOString(),
    });

    if (parsedHistory.length > HistoryEntriesLimit) {
      const toRemove = parsedHistory.length - HistoryEntriesLimit;

      parsedHistory.splice(0, toRemove);
    }

    localStorage?.setItem?.(HistoryLocalStorageKey, JSON.stringify(parsedHistory));
  });
</script>
