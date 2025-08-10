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
    class="group aspect-poster relative flex flex-col justify-between overflow-clip rounded-md"
  >
    <img
      loading="lazy"
      class={[
        "absolute h-full w-full object-cover transition-[opacity,transform] group-hover:scale-105",
        show ? "opacity-100" : "opacity-0",
      ]}
      alt={`${entry?.title?.english}'s anime cover image`}
      src={entry?.coverImage?.extraLarge}
      onload={() => show = true}
    />
    <div class="absolute h-full w-full bg-white opacity-60 transition-[opacity] dark:bg-black group-hover:opacity-40"></div>
    <div class="z-10 w-full flex flex-wrap justify-between gap-2 p-2 text-xs">
      <!-- data-tooltip styles are defined in globals.css -->
      <div
        data-tooltip="FINISHED"
        data-tooltip-hover="Anime status"
        class="rounded-md bg-neutral-100 px-2 py-1 text-black leading-none dark:bg-neutral-900 dark:text-white"
      >
        <!-- content is displayed by data-tooltip -->
      </div>
      {#if entry.averageScore}
        <div
          data-tooltip={entry.averageScore / 10}
          data-tooltip-hover="Others' score"
          class="rounded-md px-2 py-1 text-white leading-none"
          style={`background-color:hsl(${150 - 100 * 3 + entry.averageScore * 3},100%,30%)`}
        >
          <!-- content is displayed by data-tooltip -->
        </div>
      {/if}
    </div>
    <div class="z-10 w-full flex flex-col gap-2 p-2">
      <div
        data-tooltip={`${entry?.currentEpisode ?? 0} / ${entry?.episodes ?? 0}`}
        data-tooltip-hover="Episodes watched"
        class="w-fit rounded-md bg-neutral-900 px-2 py-1 text-xs text-white leading-none dark:bg-neutral-100 dark:text-black"
      >
        <!-- content is displayed by data-tooltip -->
      </div>
      <p class="line-clamp-3 text-black dark:text-white">
        {entry?.title?.english}
      </p>
    </div>
  </Link>
{/if}
