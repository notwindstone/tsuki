import type { ExtensionsType } from "./extensions.type";

let currentExtensionsState = $state<ExtensionsType>({});

export function getCurrentExtensionsState() {
  function init(key: string) {
    // if extension was already initialized, don't override its state
    if (currentExtensionsState[key] !== undefined) {
      return;
    }

    // initial state
    currentExtensionsState[key] = {
      "status": "fetching",
      "time"  : {
        "fetching"    : undefined,
        "reading"     : undefined,
        "initializing": undefined,
        "executing"   : undefined,
      },
    };
  }

  // sets extension statistics
  function setCurrentExtensionData(
    key: string,
    {
      status,
      timeKey,
      timeValue,
    }: {
      "status"   : ExtensionsType[string]["status"];
      "timeKey"  : keyof ExtensionsType[string]["time"];
      "timeValue": number;
    },
  ) {
    currentExtensionsState[key].status = status;
    currentExtensionsState[key].time[timeKey] = timeValue;
  }

  return {
    get "currentExtensionsState"() {
      return currentExtensionsState;
    },
    init,
    setCurrentExtensionData,
  };
}
