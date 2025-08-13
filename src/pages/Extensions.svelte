<script lang="ts">
  import { Link } from "@/lib/routing/index.js";
  import { getExtensions } from "@/lib/extensions/get-extensions.js";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import { toggleExtension } from "@/lib/extensions/toggle-extension";
  import Toggle from "@/components/base/Toggle.svelte";
  import { removeExtension } from "@/lib/extensions/remove-extension";
  import { addExtensions } from "@/lib/extensions/add-extensions";

  // re-fetch query on state change
  const extensions = $derived(
    createQuery({
      // will be re-fetched on plugin list update
      "queryKey": ExtensionsQueryKey,
      "queryFn" : () => {
        const currentExtensions = getExtensions({
          "local": true,
        });

        return Object.entries(currentExtensions);
      },
    }),
  );

  const extensionsState = $derived(
    getCurrentExtensionsState().currentExtensionsState,
  );
</script>

<div class="flex flex-col gap-2 whitespace-pre">
  {JSON.stringify(extensionsState, null, 2)}
  {#if $extensions.data}
    {#each $extensions.data as extension (extension[0])}
      <p>
        Toggle {extension[0]}
      </p>
      <Toggle
        toggled={extension[1]?.enabled === true}
        toggle={() => {
          toggleExtension(extension[0]);
          // re-fetching all extension manifests from local storage on every toggle may be expensive tho
          $extensions.refetch();
        }}
      />
      <button class="flex" onclick={() => {
        removeExtension(extension[0]);
        $extensions.refetch();
      }}>
        Remove {extension[0]}
      </button>
    {/each}
  {/if}
  <button class="flex" onclick={() => {
    addExtensions({
      "vue": { "id": "hewwo :3", "logo": "hehe", "name": "lul what~", "url": "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js", "version": "semver", "authors": [], "languages": [], "categories": [] },
      "nso": { "id": "ame chan", "logo": "hehe", "name": "lul what~", "url": "https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/styles-needy-girl-overdose/bundle.js", "version": "semver", "authors": [], "languages": [], "categories": [] },
    });
    $extensions.refetch();
  }}>
    Add some extensions
  </button>
  <Link href="/">Home</Link>
</div>
