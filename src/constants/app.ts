import type { Route } from "@/lib/routing";

export const ApplicationName = "tsuki";
export const ApplicationRootID = "tsuki_app";
export const ApplicationNamespace = "__TSUKI__";

export const HistoryLocalStorageKey = "@tsuki/history";
// localStorage limit is 5 MB, 10_000 entries should not exceed this value and be around ~2,5 MB
export const HistoryEntriesLimit = 10_000;
export const HistoryQueryKey = ["anime", "history", "localStorage"];

/*
 * in the future we can read localStorage to allow user change this value.
 * default: 30 is divisible by 2, 3 and 5
 */
export const ChunkSize = 30;

export const GithubLink = "https://github.com/notwindstone/tsuki";

// change to `/` if you are hosting it on "your.website.domain/" and not "your.website.domain/tsuki"
export const BaseURL = "/tsuki";

export const NoImageURL = `${BaseURL}/frieren-no-image.webp`;

export const HomePageLinks: Array<{
  "label": string;
  "href" : Route["path"];
}> = [
  {
    "label": "Extensions",
    "href" : "/extensions",
  },
  {
    "label": "Settings",
    "href" : "/settings",
  },
];
