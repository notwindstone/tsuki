declare global {
  // extend `window` to communicate with plugins
  interface Window {
    "__TSUKI__": {
      // won't change
      "fixed": {
        "appName"  : string;
        "appRootId": string;
        "baseUrl"  : string;
      };
      // window message event will be fired on change
      "dynamic": {
        // have user enabled smooth transitions or no
        "smooth" : boolean;
        // user color scheme
        "theme"  : "light" | "dark";
        // anime title (needed for those plugins that can't use MAL ID)
        "title"  : string;
        // anime MAL ID
        "idMal"  : number;
        // current anime episode
        "episode": number;
      };
    };
  }
}
