<script lang="ts">
  import { Link } from "@/lib/routing/index.js";
  import { createQuery } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import { getExtensions } from "@/lib/extensions/get-extensions";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { BaseURL } from "@/constants/app";

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
  const currentPath = window.location.pathname;
  const isReservedByExtensionPage = $derived(
    ($extensions.data ?? [])
      .filter((filtering: [string, ManifestType]) => {
        return (filtering[1].pages ?? [])
          // initially pages are defined without the base url
          .map((page: string) => BaseURL + page)
          .includes(currentPath);
      }).length > 0,
  );
</script>

{#if !isReservedByExtensionPage}
  <!-- if browser supports `svh` (firefox 101+, chrome 108+) -->
  <!-- then page will use `svh` as its max height -->
  <!-- otherwise `vh` will be applied -->
  <div class="h-screen w-full flex flex-col items-center justify-center gap-2 max-h-svh">
    <p class="text-4xl font-600">
      404
    </p>
    <p class="text-2xl font-600">
      Not Found
    </p>
    <Link
      class="mt-2 cursor-pointer rounded-md bg-rose-500 px-4 py-2 transition-[opacity] focus:cursor-default focus:opacity-70"
      href="/"
    >
      Home
    </Link>
  </div>
{/if}
