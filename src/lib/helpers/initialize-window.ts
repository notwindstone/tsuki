import { ApplicationName, ApplicationNamespace, ApplicationRootID, BaseURL } from "@/constants/app";

export function initializeWindow({
  toEnableTransitions,
}: {
  "toEnableTransitions": boolean;
}) {
  window[ApplicationNamespace] = {
    "fixed": {
      "appName"  : ApplicationName,
      "appRootId": ApplicationRootID,
      "baseUrl"  : BaseURL,
    },
    "dynamic": {
      "smooth" : toEnableTransitions,
      "theme"  : "dark",
      "title"  : "",
      "idMal"  : 0,
      "episode": 1,
    },
  };
}
