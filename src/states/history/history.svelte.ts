import type { HistoryType } from "./history.type";

let currentHistoryState = $state<HistoryType>({
  "page": 1,
});

export function getCurrentHistoryState() {
  function setPage(newValue: number) {
    currentHistoryState.page = newValue;
  }

  return {
    get "current"() {
      return currentHistoryState;
    },
    setPage,
  };
}
