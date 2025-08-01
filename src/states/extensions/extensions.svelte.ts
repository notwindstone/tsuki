import type { ExtensionsType } from "./extensions.type";

let currentExtensionsState = $state<ExtensionsType>({});

export function getCurrentExtensionsState() {
  function init(key: string) {
    if (currentExtensionsState[key] !== undefined) {
      return;
    }

    currentExtensionsState[key] = {
      "status"    : "fetching",
      "timeToLoad": 0,
    };
  }

  function setCurrentExtensionStatus(key: string, value: ExtensionsType[""]["status"]) {
    currentExtensionsState[key].status = value;
  }

  function setCurrentExtensionTime(key: string, value: ExtensionsType[""]["timeToLoad"]) {
    currentExtensionsState[key].timeToLoad = value;
  }

  return {
    get "currentExtensionsState"() {
      return currentExtensionsState;
    },
    init,
    setCurrentExtensionStatus,
    setCurrentExtensionTime,
  };
}
