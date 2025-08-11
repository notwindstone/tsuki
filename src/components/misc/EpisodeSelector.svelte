<script lang="ts">
  import Image from "@/components/base/Image.svelte";

  let {
    episodes,
    setEpisode,
    toHideImages,
    selectedEpisode,
  }: {
    "episodes": Array<{
      "url"        : string;
      "title"      : string;
      "thumbnail"  : string;
      "description": string;
    }>;
    "setEpisode"     : (newEpisode: number) => void;
    "toHideImages"   : boolean;
    "selectedEpisode": number;
  } = $props();
</script>

<div class="mt-2 h-full flex flex-col overflow-y-auto">
  <!-- virtual list... maybe? -->
  {#each episodes as episode, index (episode.title)}
    <button
      onclick={() => setEpisode(index + 1)}
      class={[
        "w-full flex flex-nowrap gap-4 rounded-md p-2 transition-[background-color]",
        selectedEpisode === index + 1
          ? "bg-neutral-200 dark:bg-neutral-800"
          : "",
      ]}
    >
      {#if toHideImages}
        <Image
          classNames="!h-16 lg:!h-20 !w-auto rounded-md aspect-media opacity-20"
          src={undefined}
          alt={`${index + 1}'s episode blurred cover image`}
        />
      {:else}
        <Image
          classNames="!h-16 lg:!h-20 !w-auto rounded-md aspect-media"
          src={episode.thumbnail}
          alt={`${index + 1}'s episode cover image`}
        />
      {/if}
      <span
        title={episode.title + ": " + episode.description}
        class="flex flex-col justify-center text-start"
      >
        <span class="text-sm leading-none pb-1">
          {episode.title}
        </span>
        <span class="line-clamp-3 text-sm leading-none opacity-70">
          {episode.description}
        </span>
      </span>
    </button>
  {/each}
</div>
