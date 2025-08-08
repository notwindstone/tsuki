<script lang="ts">
  import type { AppErrorType } from "@/types/misc/app-error.type";

  let loggedErrors = $state<Array<AppErrorType>>([]);
  let show = $state<boolean>(false);

  const handleConsole = (event: Event): void => {
    const foundData: AppErrorType = {};

    if ("message" in event) {
      foundData["message"] = event.message;
    }

    if ("source" in event) {
      foundData["source"] = event.source;
    }

    if ("lineno" in event) {
      foundData["lineno"] = event.lineno;
    }

    if ("colno" in event) {
      foundData["colno"] = event.colno;
    }

    if ("error" in event) {
      foundData["error"] = event.error;
    }

    if (
      "filename" in event &&
      // check if event.filename has 'split()' method
      typeof event.filename === "string"
    ) {
      // still use safe chaining
      const filenamePaths = event.filename?.split?.("/");

      /*
       * event.filename by default looks like 'http://localhost:4173/tsuki/assets/polyfills-DmLhBDoD.js'
       * we want only the filename: 'polyfills-DmLhBDoD.js'
       */
      foundData["filename"] = filenamePaths?.[filenamePaths.length - 1];
    }

    loggedErrors.push(foundData);
  };

  // set timeout in the effect so we can destroy it on component unmount
  $effect(() => {
    const timeout = setTimeout(() => {
      show = true;
      // show user that something went wrong only after 7.5 seconds have elapsed
    }, 7_50);

    // return a method to clean timeout (will be called on unmount)
    return () => clearTimeout(timeout);
  });
</script>

<!-- listen for app errors -->
<svelte:window onerror={handleConsole} />
{#if show}
  <div class="overflow-y-auto px-4 pt-4 text-center">
    <p class="opacity-60">Application is loading too long... Something is off.</p>
    <p>Console:</p>
    <!-- i'm using firefox console error colors lol -->
    <!-- using index as a key is safer here -->
    {#each loggedErrors as currentError, index (index)}
      <div class="mt-4 w-full break-all border-t border-[#743e4c] bg-[#4b2f36] text-start">
        {JSON.stringify(currentError, null, 2)}
      </div>
    {/each}
  </div>
{/if}
