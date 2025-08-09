<script lang="ts">
  import type { HistoryEntryType } from "@/types/history/history-entry.type";
  import { Link } from "@/lib/routing";

  let show = $state<boolean>(false);
  let {
    entry,
  }: {
    "entry": HistoryEntryType;
  } = $props();
</script>

<!-- show card only if idMal is defined -->
{#if entry.idMal !== undefined}
  <Link
    href="/anime"
    params={{ "idMal": entry.idMal }}
    class="aspect-poster relative flex flex-col justify-between overflow-clip rounded-md"
  >
    <div class="w-full flex flex-wrap justify-between p-2 text-xs">
      <div class="rounded-md bg-neutral-100 px-2 py-1 text-black leading-none dark:bg-neutral-900 dark:text-white">
        FINISHED
      </div>
      <div class="rounded-md bg-green-600 px-2 py-1 text-white leading-none">
        {(entry?.averageScore ?? 0) / 10}
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 p-2">
      <div class="w-fit rounded-md bg-neutral-900 px-2 py-1 text-xs text-white leading-none dark:bg-neutral-100 dark:text-black">
        {entry?.currentEpisode} / {entry?.episodes}
      </div>
      <p class="text-black dark:text-white">
        {entry?.title?.english}
      </p>
    </div>
    <img
      loading="lazy"
      class={[
        "absolute h-full w-full object-cover transition-[opacity]",
        show ? "opacity-100" : "opacity-0",
      ]}
      alt={`${entry?.title?.english}'s anime cover image`}
      src={entry?.coverImage?.extraLarge}
      onload={() => show = true}
    />
  </Link>
{/if}
