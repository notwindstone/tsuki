<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import {addExtensions} from '@/lib/extensions/add-extensions';

  const fetched = createQuery({
    // will be re-fetched on plugin list update
    "queryKey": ["extensions", "list", "remote", "github"],
    "queryFn" : async () => {
      // const response = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/manifests.json");

      // const manifests: unknown = await response.json();

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
  <div>
    Data: {JSON.stringify($fetched.data)}
  </div>
{/if}
