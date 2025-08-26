<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { addExtensions } from "@/lib/extensions/add-extensions";
  import { validateManifest } from "@/lib/extensions/validate-manifest";
  import ExtensionDownloadableCard from "@/components/extensions/ExtensionDownloadableCard.svelte";

  let {
    refetch,
  }: {
    "refetch": () => void;
  } = $props();

  const fetched = createQuery({
    // will be re-fetched on plugin list update
    "queryKey": ["extensions", "list", "remote", "github"],
    "queryFn" : async () => {
      const response = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/tsuki_temp.json");
      const unknownManifests: unknown = await response.json();

      if (!Array.isArray(unknownManifests)) {
        return [];
      }

      const validatedManifests: Array<ManifestType> = [];

      for (const entry of unknownManifests) {
        const validatedEntry = validateManifest(entry);

        if (validatedEntry === false) {
          continue;
        }

        validatedManifests.push(validatedEntry);
      }

      return validatedManifests;
    },
  });
</script>

{#if $fetched.isPending}
  <div>
    Loading...
  </div>
{:else if $fetched.isError}
  <div>
    Error: {JSON.stringify($fetched.error)}
  </div>
{:else if $fetched.data}
  <div class="grid cols-2 gap-4 lg:cols-3">
    <!-- Of course it is better to use contexts instead of prop drilling, but... -->
    {#each $fetched.data as manifest (manifest.id)}
      <ExtensionDownloadableCard
        manifest={manifest}
        refetch={refetch}
      />
    {/each}
  </div>
{/if}
