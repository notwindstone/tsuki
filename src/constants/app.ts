import type { Route } from "@/lib/routing";

export const ApplicationName = "tsuki";
export const ApplicationRootID = "tsuki_app";
export const ApplicationNamespace = "__TSUKI__";

// change to `/` if you are hosting it on "your.website.domain/" and not "your.website.domain/tsuki"
export const BaseURL = "/tsuki";

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
