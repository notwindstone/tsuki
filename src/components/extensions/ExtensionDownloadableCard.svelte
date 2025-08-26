<script lang="ts">
  import Image from "@/components/base/Image.svelte";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { addExtensions } from "@/lib/extensions/add-extensions";

  let {
    manifest,
    refetch,
  }: {
    "manifest": ManifestType;
    "refetch" : () => void;
  } = $props();

  const installExtension = () => {
    const extensionToAdd: Record<string, ManifestType> = {};

    extensionToAdd[manifest.id] = manifest;

    addExtensions(extensionToAdd);
  };
</script>

<div class="w-full flex flex-col justify-between gap-2 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
  <div class="w-full flex flex-col gap-2">
    <div class="flex flex-nowrap gap-2">
      <Image
        classNames="!h-12 !w-12 shrink-0 rounded-md"
        alt={`${manifest.name}'s extension logo`}
        src={manifest.logo}
      />
      <div class="flex flex-col justify-center">
        <div class="flex items-center gap-2">
          <span>
            {manifest.name}
          </span>
          <span class="text-sm opacity-70">
          {manifest.version}
        </span>
        </div>
        <p class="text-sm opacity-70">
          {manifest.authors.join(", ")}
        </p>
      </div>
    </div>
    {#if manifest.description}
      <p class="text-sm opacity-70">
        {manifest.description}
      </p>
    {/if}
  </div>
  <div class="flex justify-end">
    <button
      aria-label="Install this extension"
      class="flex rounded-md bg-neutral-200 p-2 transition-[background-color] -right-2 -top-2 dark:bg-neutral-800 hover:bg-white dark:hover:bg-black"
      onclick={() => {
        installExtension();
        refetch();
      }}
    >
      <span class="i-lucide-plus block h-5 w-5"></span>
    </button>
  </div>
</div>
