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
        tsuki.
      </p>
      <div class="overflow-y-auto px-4 pt-4 text-center">
        <p class="opacity-60">Something went wrong.</p>
        <p class="mb-4">Console:</p>
        <ConsoleError currentError={getErrorFromEvent(error)} />
      </div>
    </div>
  {/snippet}
</svelte:boundary>
<ExtensionsLoader />
