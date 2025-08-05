declare global {
  // to communicate with plugins
  interface Window {
    "__TSUKI__": {
      "currentRoute": string;
      "dynamic"     : number;
    };
  }
}
