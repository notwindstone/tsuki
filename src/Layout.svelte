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
<!-- handle app-breaking global errors -->
<svelte:boundary>
  {@render children()}

  {#snippet failed(error)}
    <div class="h-screen w-full flex flex-col items-center justify-center bg-black max-h-svh">
      <p class="select-none text-4xl text-white font-600">
        tsuki
      </p>
      <div class="overflow-y-auto px-4 pt-4 text-center">
        <p class="opacity-70">Something went wrong.</p>
        <p class="mb-4">Console:</p>
        <ConsoleError currentError={getErrorFromEvent(error)} />
      </div>
    </div>
  {/snippet}
</svelte:boundary>
<!-- handle app-breaking extension system errors -->
<svelte:boundary>
  <ExtensionsLoader />

  {#snippet failed(error)}
    <div class="fixed bottom-2 right-2 max-w-[calc(100%-16px)] border border-black rounded-md bg-white px-2 py-1 text-black">
      <p class="font-semibold">
        Could not load extensions:
      </p>
      <p class="text-sm opacity-70">
        {getErrorFromEvent(error).message}
      </p>
    </div>
  {/snippet}
</svelte:boundary>
