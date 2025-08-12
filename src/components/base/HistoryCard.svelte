<script lang="ts">
  import type { AnimeEntryType } from "@/types/anime/anime-entry.type";
  import type { StatusType } from "@/types/anilist/status.type";
  import { Link } from "@/lib/routing";
  import { getHueFromScore } from "@/lib/colors/get-hue-from-score";
  import Image from "@/components/base/Image.svelte";
  import CardDeleteButton from "@/components/base/CardDeleteButton.svelte";

  let {
    entry,
  }: {
    "entry": AnimeEntryType;
  } = $props();

  // assign a safe anime title
  const title: string = entry?.title?.english
    ?? entry?.title?.romaji
    ?? entry?.title?.native
    ?? "unknown";
  const status: StatusType = entry?.status ?? "NOT_YET_RELEASED";
</script>

<!-- show card only if idMal is defined -->
{#if entry?.idMal !== undefined}
  <!-- redirect to /anime?idMal=SOME_NUMBER&episode=SOME_NUMBER -->
  <Link
    href="/anime"
    params={{ "idMal": entry.idMal, "episode": entry?.currentEpisode }}
    class="group relative flex flex-col gap-0 overflow-hidden border-2 border-transparent rounded-md bg-neutral-100 transition-[border-color] hover:border-black dark:bg-neutral-900 dark:hover:border-white"
  >
    <!-- image part styles -->
    <div class="aspect-media relative w-full">
      <!-- deletion is available thanks to 'entry.date', otherwise there will be an error -->
      {#if entry?.date}
        <CardDeleteButton
          entryDate={entry.date}
        />
      {/if}
      {#if entry?.currentEpisode}
        <div
          data-tooltip={`${entry.currentEpisode} / ${entry?.episodes ?? "?"}`}
          data-tooltip-hover="Episodes watched"
          class="absolute bottom-2 left-2 z-10 w-fit rounded-md bg-neutral-900 px-2 py-1 text-xs text-white leading-none dark:bg-neutral-100 dark:text-black"
        >
          <!-- content is displayed by data-tooltip -->
        </div>
      {/if}
      <!-- data-tooltip styles are defined in globals.css -->
      <div
        data-tooltip={status}
        data-tooltip-hover="Status"
        class="absolute left-2 top-2 z-10 rounded-md bg-neutral-100 px-2 py-1 text-xs text-black leading-none dark:bg-neutral-900 dark:text-white"
      >
        <!-- content is displayed by data-tooltip -->
      </div>
      {#if entry?.averageScore}
        <div
          data-tooltip={entry.averageScore / 10}
          data-tooltip-hover="Score"
          class="absolute bottom-2 right-2 z-10 rounded-md px-2 py-1 text-xs text-white leading-none"
          style={`background-color:hsl(${getHueFromScore(entry.averageScore)},100%,30%)`}
        >
          <!-- content is displayed by data-tooltip -->
        </div>
      {/if}
      <!-- fill parent element with the 16/9 aspect ratio -->
      <Image
        classNames="absolute z-5 h-full w-full"
        src={entry?.coverImage?.extraLarge}
        alt={`${title}'s anime cover image`}
      />
      <!-- darken image background -->
      <div class="absolute z-8 h-full w-full bg-white opacity-60 transition-[opacity] dark:bg-black group-hover:opacity-40"></div>
    </div>
    <p class="line-clamp-3 w-full p-2 text-black dark:text-white">
      {title}
    </p>
  </Link>
{/if}
