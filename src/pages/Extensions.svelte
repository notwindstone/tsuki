<script lang="ts">
  import { fly } from "svelte/transition";
  import { Link } from "@/lib/routing/index.js";
  import { getExtensions } from "@/lib/extensions/get-extensions.js";
  import { createQuery } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import ExtensionCard from "@/components/extensions/ExtensionCard.svelte";
  import ExtensionsRepository from "@/components/extensions/ExtensionsRepository.svelte";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";
  import ExtensionImporter from "@/components/extensions/ExtensionImporter.svelte";

  const settingsState = getCurrentSettingsState().current;
  const transitionDuration = $derived(
    settingsState.transitions
      ? settingsState.transitionDuration
      : 0,
  );

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
    <Link class="flex flex-nowrap select-none items-center gap-2" href="/">
      <span class="i-lucide-arrow-left block"></span>
      <span>Back</span>
    </Link>
    {#if $extensions.data && $extensions.data.length > 0}
      <p class="text-2xl">
        Installed
      </p>
      {#each $extensions.data as extension (extension[0])}
        <div
          in:fly={{ "x": -16, "duration": transitionDuration }}
        >
          <ExtensionCard
            extension={extension}
            refetch={() => $extensions.refetch()}
          />
        </div>
      {/each}
    {/if}
    <p class="text-2xl">
      Import
    </p>
    <ExtensionImporter
      refetch={() => $extensions.refetch()}
    />
    <p class="text-2xl">
      Available
    </p>
    <ExtensionsRepository
      installedExtensions={installedExtensions}
      refetch={() => $extensions.refetch()}
    />
  </div>
</div>
