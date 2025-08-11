import type { SearchType } from "./search.type";

let currentSearchState = $state<SearchType>({
  "value": "",
});

export function getCurrentSearchState() {
  function setSearch(newValue: string) {
    currentSearchState.value = newValue;
  }

  return {
    get "current"() {
      return currentSearchState;
    },
    setSearch,
  };
}
