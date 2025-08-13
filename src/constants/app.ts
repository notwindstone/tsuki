import type { Route } from "@/lib/routing";
import type { ConfigType } from "@/types/config/config.type";

export const ApplicationName = "tsuki";
export const ApplicationRootID = "tsuki_app";
export const ApplicationNamespace = "__TSUKI__";

export const ConfigLocalStorageKey = "@tsuki/config";
export const HistoryLocalStorageKey = "@tsuki/history";
export const ExtensionsLocalStorageKey = "@tsuki/extensions";

// localStorage limit is 5 MB, 10_000 entries should not exceed this value and be around ~2,5 MB
export const HistoryEntriesLimit = 10_000;
export const HistoryQueryKey = ["anime", "history", "localStorage"];

export const GithubLink = "https://github.com/notwindstone/tsuki";

// change to `/` if you are hosting it on "your.website.domain/" and not "your.website.domain/tsuki"
export const BaseURL = "/tsuki";

export const NoImageURL = `${BaseURL}/frieren-no-image.webp`;

export const DefaultConfig: ConfigType = {
  "hideEpisodeImages" : true,
  "transitionDuration": 200,
  "chunkSize"         : 30,
  "confirmation"      : false,
  // will be overwritten in 'initialize-config.ts'
  "transitions"       : false,
};

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
