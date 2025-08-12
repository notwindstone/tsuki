<script lang="ts">
  import PaginationNav from "@/components/base/PaginationNav.svelte";
  import type { Snippet } from "svelte";
  import { getCurrentHistoryState } from "@/states/history/history.svelte";

  const historyState = getCurrentHistoryState().current;
  const setPage = getCurrentHistoryState().setPage;
  const page = $derived(historyState.page);

  let {
    children,
    size,
  }: {
    "children": Snippet;
    "size"    : number;
  } = $props();

  // show less pagination elements on small screen (tailwind's 'sm' breakpoint)
  const delta = window.innerWidth >= 640
    ? 2
    : 1;

  const goNext = () => {
    if (page >= size) {
      setPage(size);

      return;
    }

    setPage(page + 1);
  };
  const goPrevious = () => {
    if (page <= 1) {
      setPage(1);

      return;
    }

    setPage(page - 1);
  };
  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.target === null) {
      return;
    }

    // 'tagName' returns target element
    if (!("tagName" in event.target)) {
      return;
    }

    // handle keyboard navigation only if user didn't focus on some element (other than button)
    if (event.target.tagName !== "BODY" && event.target.tagName !== "BUTTON") {
      return;
    }

    const key = event.key.toLowerCase();

    switch (key) {
      case "arrowleft": {
        goPrevious();

        break;
      }
      case "arrowright": {
        goNext();

        break;
      }
    }
  };
</script>

<svelte:window onkeydown={handleKeyboard} />
<PaginationNav
  page={page}
  size={size}
  delta={delta}
  goNext={goNext}
  goPrevious={goPrevious}
  setPage={setPage}
/>
<div class="grid cols-2 w-full gap-2 md:cols-5 sm:cols-3">
  {@render children()}
</div>
<PaginationNav
  page={page}
  size={size}
  delta={delta}
  goNext={goNext}
  goPrevious={goPrevious}
  setPage={setPage}
/>
