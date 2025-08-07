declare global {
  // extend `window` to communicate with plugins
  interface Window {
    "__TSUKI__": {
      // won't change
      "static": {
        "appName"  : string;
        "appRootId": string;
        "baseUrl"  : string;
      };
      // window message event will be fired on change
      "dynamic": {
        // user color scheme
        "theme" : "light" | "dark";
        // user's search (needed for those plugins that can't use MAL ID)
        "search": string;
      };
    };
  }
}
