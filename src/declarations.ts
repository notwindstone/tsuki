declare global {
  // extend `window` to communicate with plugins
  interface Window {
    "__TSUKI__": {
      // user's search (needed for those plugins that can't use MAL ID)
      "search": string;
    };
  }
}
