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
<video src="magnet:?xt=urn:btih:INEZ2MOAKS3NEVAR5ZGYJPOUJPTLNSQI&dn=%5BSubsPlease%5D%20Witch%20Watch%20-%2021%20%28480p%29%20%5BEE1C24C5%5D.mkv&xl=388250892&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker3.itzmx.com%3A6961%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=http%3A%2F%2Fopen.acgnxtracker.com%3A80%2Fannounce&tr=wss%3A%2F%2Ftracker.openwebtorrent.com" controls width="100%" data-title="Sintel"></video>
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
