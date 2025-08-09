<script lang="ts">
  import type { AppErrorType } from "@/types/misc/app-error.type";
  import { getErrorFromEvent } from "@/lib/helpers/get-error-from-event";
  import ConsoleError from "@/components/misc/ConsoleError.svelte";

  let loggedErrors = $state<Array<AppErrorType>>([
    {
      "message" : "Errors will be shown below if any",
      "filename": "tsuki",
      "lineno"  : "0",
      "colno"   : "0",
    },
  ]);
  let show = $state<boolean>(false);

  const handleConsole = (event: Event): void => {
    loggedErrors.push(getErrorFromEvent(event));
  };

  // set a timeout in the effect so we can destroy it on component unmount
  $effect(() => {
    const timeout = setTimeout(() => {
      show = true;
      // show user that something went wrong only after 7.5 seconds have elapsed
    }, 7_500);

    // return a method to clean the timeout (will be called on unmount)
    return () => clearTimeout(timeout);
  });
</script>

<!-- listen for app errors -->
<svelte:window onerror={handleConsole} onunhandledrejection={handleConsole} />
{#if show}
  <div class="overflow-y-auto px-4 pt-4 text-center">
    <p class="opacity-60">Application is loading too long... Something is off.</p>
    <p class="mb-4">Console:</p>
    <!-- using index as a key is safer here -->
    {#each loggedErrors as currentError, index (index)}
      <ConsoleError currentError={currentError} />
    {/each}
  </div>
{/if}
