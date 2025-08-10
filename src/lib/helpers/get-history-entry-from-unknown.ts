import type { HistoryEntryType } from "@/types/history/history-entry.type";

// it probably was better to use runtime validators like Typia...
export function getHistoryEntryFromUnknown(input: unknown): HistoryEntryType {
  const safeObject: HistoryEntryType = { "id": 0 };

  // early return if input is not an object
  if (
    typeof input !== "object" ||
    input === null
  ) {
    return safeObject;
  }

  // unfortunately, i can't use an array of 'HistoryEntryType' keys to apply fields to safeObject with 'for' loop
  if ("id" in input) {
    safeObject.id = typeof input.id === "number"
      ? input.id
      : 0;
  }

  if ("idMal" in input) {
    // check if a number
    safeObject.idMal = typeof input.idMal === "number"
      ? input.idMal
      : undefined;
  }

  if ("title" in input) {
    // check if an object
    safeObject.title = typeof input.title === "object" && input.title !== null
      ? input.title
      : {};
  }

  if ("coverImage" in input) {
    // check if an object
    safeObject.coverImage = typeof input.coverImage === "object" && input.coverImage !== null
      ? input.coverImage
      : {};
  }

  if ("status" in input) {
    // check if an anilist status
    switch (input.status) {
      case "FINISHED":
      case "RELEASING":
      case "NOT_YET_RELEASED":
      case "CANCELLED":
      case "HIATUS": {
        safeObject.status = input.status;

        break;
      }
      default: {
        break;
      }
    }
  }

  if ("averageScore" in input) {
    // check if a number
    safeObject.averageScore = typeof input.averageScore === "number"
      ? input.averageScore
      : undefined;
  }

  if ("episodes" in input) {
    // check if a number
    safeObject.episodes = typeof input.episodes === "number"
      ? input.episodes
      : undefined;
  }

  if ("currentEpisode" in input) {
    // check if a number
    safeObject.currentEpisode = typeof input.currentEpisode === "number"
      ? input.currentEpisode
      : undefined;
  }

  if ("date" in input) {
    // check if a string
    safeObject.date = typeof input.date === "string"
      ? input.date
      : undefined;
  }

  return safeObject;
}
