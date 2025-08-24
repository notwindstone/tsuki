<script lang="ts">
  import { getErrorFromEvent } from "@/lib/helpers/get-error-from-event";
  import ExtensionsLoader from "@/components/extensions/ExtensionsLoader.svelte";
  import ProgressBar from "@/components/layout/ProgressBar.svelte";
  import type { Snippet } from "svelte";
  import ConsoleError from "@/components/misc/ConsoleError.svelte";

  let {
    children,
  }: {
    "children": Snippet;
  } = $props();
</script>

<ProgressBar />
<video src="magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel" controls width="100%" data-title="Sintel"></video>
<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" charset="utf-8" async></script>
</svelte:head>
<!-- handle app-breaking global errors -->
<svelte:boundary>
  {@render children()}

  {#snippet failed(error)}
    <div class="h-screen w-full flex flex-col items-center justify-center bg-white max-h-svh dark:bg-black">
      <p class="select-none text-4xl text-black font-600 dark:text-white">
        tsuki
      </p>
      <div class="overflow-y-auto px-4 pt-4 text-center">
        <p class="opacity-80">Something went wrong.</p>
        <p class="mb-4">Error:</p>
        <ConsoleError currentError={getErrorFromEvent(error)} />
      </div>
    </div>
  {/snippet}
</svelte:boundary>
<!-- handle app-breaking extension system errors -->
<svelte:boundary>
  <ExtensionsLoader />

  {#snippet failed(error)}
    <div class="fixed bottom-2 right-2 z-50 max-w-[calc(100%-16px)] border border-black rounded-md bg-white px-2 py-1 text-black">
      <p class="font-semibold">
        Could not load extensions:
      </p>
      <p class="text-sm opacity-80">
        {getErrorFromEvent(error).message}
      </p>
    </div>
  {/snippet}
</svelte:boundary>
