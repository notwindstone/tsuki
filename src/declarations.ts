declare global {
  interface Window {
    "__TSUKI__": {
      "currentRoute": string;
      "dynamic"     : number;
    };
  }
}
