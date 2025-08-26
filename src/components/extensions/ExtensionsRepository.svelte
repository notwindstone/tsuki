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
      const response = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/manifests.json");
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

      const manifests: Array<ManifestType> = [
        {
          "id"        : "kodik",
          "logo"      : "https://raw.githubusercontent.com/ame-chan-lol/anisun-kodik-extension/refs/heads/main/kodik-logo.png",
          "name"      : "Kodik Player",
          "url"       : "https://raw.githubusercontent.com/ame-chan-lol/anisun-kodik-extension/refs/heads/main/dist/bundle.js",
          "version"   : "1.0",
          "authors"   : ["windstone"],
          "languages" : ["ru"],
          "categories": ["mal"],
        },
        {
          "id"         : "essentials",
          "logo"       : "https://raw.githubusercontent.com/EssentialsX/Assets/refs/heads/master/logo.svg",
          "name"       : "Essentials",
          "url"        : "",
          "version"    : "1.0.0",
          "authors"    : ["windstone"],
          "languages"  : ["en"],
          "categories" : ["cosmetic", "advanced"],
          "description": "Adds various improvements to the app",
          "pages"      : ["/essentials"],
        },
      ];

      addExtensions({
        "kodik": {
          "id"        : "kodik",
          "logo"      : "https://raw.githubusercontent.com/ame-chan-lol/anisun-kodik-extension/refs/heads/main/kodik-logo.png",
          "name"      : "Kodik Player",
          "url"       : "https://raw.githubusercontent.com/ame-chan-lol/anisun-kodik-extension/refs/heads/main/dist/bundle.js",
          "version"   : "1.0",
          "authors"   : ["windstone"],
          "languages" : ["ru"],
          "categories": ["mal"],
        },
      });

      // return validatedManifests;
      return manifests;
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
