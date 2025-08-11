<script lang="ts">
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
  import type { StatusType } from "@/types/anilist/status.type";
  import { Link } from "@/lib/routing";
  import { NoImageURL } from "@/constants/app.js";
  import { getHueFromScore } from "@/lib/colors/get-hue-from-score";

  let show = $state<boolean>(false);
  let {
    entry,
  }: {
    "entry": AnimeEntryType;
  } = $props();
  // we will change this image on image load error
  let image = $state<string>(entry?.coverImage?.extraLarge ?? NoImageURL);

  // assign a safe anime title
  const title: string = entry?.title?.english
    ?? entry?.title?.romaji
    ?? entry?.title?.native
    ?? "unknown";
  const status: StatusType = entry?.status ?? "FINISHED";
</script>

<!-- show card only if idMal is defined -->
{#if entry?.idMal !== undefined}
  <!-- redirects to /anime?idMal=SOME_NUMBER -->
  <Link
    href="/anime"
    params={{ "idMal": entry.idMal }}
    class="group aspect-poster relative flex flex-col justify-between overflow-hidden rounded-md"
  >
    <img
      loading="lazy"
      class={[
        "absolute h-full w-full object-cover transition-[opacity,transform] duration-300 group-hover:scale-105",
        show ? "opacity-100" : "opacity-0",
      ]}
      alt={`${title}'s anime cover image`}
      src={image}
      onload={() => show = true}
      onerror={() => image = NoImageURL}
    />
    <!-- darkens image background -->
    <div class="absolute h-full w-full bg-white opacity-60 transition-[opacity] dark:bg-black group-hover:opacity-40"></div>
    <!-- top badges -->
    <div class="z-10 w-full flex flex-wrap justify-between gap-2 p-2 text-xs">
      <!-- data-tooltip styles are defined in globals.css -->
      <div
        data-tooltip={status}
        data-tooltip-hover="Status"
        class="rounded-md bg-neutral-100 px-2 py-1 text-black leading-none dark:bg-neutral-900 dark:text-white"
      >
        <!-- content is displayed by data-tooltip -->
      </div>
      {#if entry?.averageScore}
        <div
          data-tooltip={entry.averageScore / 10}
          data-tooltip-hover="Score"
          class="rounded-md px-2 py-1 text-white leading-none"
          style={`background-color:hsl(${getHueFromScore(entry.averageScore)},100%,30%)`}
        >
          <!-- content is displayed by data-tooltip -->
        </div>
      {/if}
    </div>
    <!-- bottom badges & title name -->
    <div class="z-10 w-full flex flex-col gap-2 p-2">
      {#if entry?.currentEpisode}
        <div
          data-tooltip={`${entry.currentEpisode} / ${entry?.episodes ?? "?"}`}
          data-tooltip-hover="Episodes watched"
          class="w-fit rounded-md bg-neutral-900 px-2 py-1 text-xs text-white leading-none dark:bg-neutral-100 dark:text-black"
        >
          <!-- content is displayed by data-tooltip -->
        </div>
      {/if}
      <p class="line-clamp-3 text-black dark:text-white">
        {title}
      </p>
    </div>
  </Link>
{/if}
