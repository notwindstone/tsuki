<script lang="ts">
  import { Link } from "@/lib/routing/index.js";
  import { getExtensions } from "@/lib/extensions/get-extensions.js";
  import { createQuery } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import ExtensionCard from "@/components/extensions/ExtensionCard.svelte";
  import ExtensionsRepository from "@/components/extensions/ExtensionsRepository.svelte";
  import type { ManifestType } from "@/types/extensions/manifest.type";

  const extensions = createQuery({
    // will be re-fetched on plugin list update
    "queryKey": ExtensionsQueryKey,
    "queryFn" : () => {
      const currentExtensions = getExtensions({
        "local": true,
      });

      return Object.entries(currentExtensions);
    },
  });
  const installedExtensions: Array<string> | undefined = $derived(
    $extensions.data?.map?.((installed: [string, ManifestType]) => installed[0]),
  );
</script>

<div class="flex justify-center p-4">
  <div class="max-w-144 w-full flex flex-col gap-4">
    <Link class="flex flex-nowrap items-center gap-2" href="/">
      <span class="i-lucide-arrow-left block"></span>
      <span>Back</span>
    </Link>
    {#if $extensions.data}
      <p class="text-2xl">
        Installed
      </p>
      {#each $extensions.data as extension (extension[0])}
        <ExtensionCard
          extension={extension}
          refetch={() => $extensions.refetch()}
        />
      {/each}
    {/if}
    <p class="text-2xl">
      Available
    </p>
    <ExtensionsRepository
      installedExtensions={installedExtensions}
      refetch={() => $extensions.refetch()}
    />
  </div>
</div>
