import { HistoryLocalStorageKey } from "@/constants/app";
import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
import { getAnimeEntryFromUnknown } from "@/lib/helpers/get-anime-entry-from-unknown";

export function removeEntryFromHistory(date: string) {
  const storedHistory = localStorage?.getItem?.(HistoryLocalStorageKey) ?? "[]";

  let unknownHistory: unknown;

  try {
    unknownHistory = JSON.parse(storedHistory);
  } catch (error) {
    console.error(error);

    unknownHistory = [];
  }

  if (!Array.isArray(unknownHistory)) {
    return;
  }

  const parsedHistory: Array<AnimeEntryType> = unknownHistory.map(
    (unknownEntry: unknown) => getAnimeEntryFromUnknown(unknownEntry),
  );
  const filteredHistory = parsedHistory.filter((currentEntry: AnimeEntryType) => currentEntry.date !== date);

  localStorage?.setItem?.(HistoryLocalStorageKey, JSON.stringify(filteredHistory));
}
