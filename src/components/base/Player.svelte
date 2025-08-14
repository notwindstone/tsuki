<script lang="ts">
  import { ApplicationNamespace } from "@/constants/app";

  let {
    title,
    episode,
  }: {
    "title"  : string;
    "episode": number;
  } = $props();

  $effect(() => {
    window[ApplicationNamespace].dynamic = {
      ...window[ApplicationNamespace].dynamic,
      "episode": episode,
      "title"  : title,
    };
    window.postMessage("tsuki_updated_window", "*");
  });
</script>

<div
  id="extensions-player-id"
  class="aspect-media relative col-span-1 flex items-center justify-center rounded-md bg-neutral-100 lg:col-span-2 dark:bg-neutral-900"
>
  <span class="text-lg">
    Select an extension
  </span>
</div>
