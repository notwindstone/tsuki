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
  import Image from "@/components/base/Image.svelte";

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

<div class="flex justify-center p-4">
  <div class="max-w-144 w-full flex flex-col gap-4">
    {JSON.stringify(extensionsState, null, 2)}
    <button class="flex" onclick={() => {
      addExtensions({
        "vue"      : { "id": "hewwo :3", "logo": "hehe", "name": "lul what~", "url": "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js", "version": "1.0", "authors": ["wind", "notwind"], "languages": ["en", "ru"], "categories": ["mal", "cosmetic", "non-mal", "advanced"], "pages": ["/vue"], "description": "yooo coco what's up man?" },
        "nso"      : { "id": "ame chan", "logo": "hehe", "name": "lul what~", "url": "https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/styles-needy-girl-overdose/bundle.js", "version": "semver", "authors": [], "languages": [], "categories": [] },
        "anilibria": { "id": "qwerqwer", "logo": "hehe", "name": "lul what~", "url": "https://raw.githubusercontent.com/ame-chan-lol/anisun-anilibria-extension/refs/heads/main/dist/bundle.js", "version": "semver", "authors": [], "languages": [], "categories": [] },
      });
      $extensions.refetch();
    }}>
      Add some extensions
    </button>
    <Link href="/">Home</Link>
    {#if $extensions.data}
      {#each $extensions.data as extension (extension[0])}
        <div class="relative w-full flex flex-col gap-2 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
          <div class="flex justify-between gap-2">
            <div class="flex flex-nowrap gap-2">
              <Image
                classNames="!h-12 !w-12 shrink-0 rounded-md"
                alt={`${extension[1].name}'s extension logo`}
                src={extension[1].logo}
              />
              <div class="flex flex-col justify-center">
                <div class="flex items-center gap-2">
                <span>
                  {extension[1].name}
                </span>
                  <span class="text-sm opacity-70">
                  {extension[1].version}
                </span>
                </div>
                <p class="text-sm opacity-70">
                  {extension[1].authors.join(", ")}
                </p>
              </div>
            </div>
            <div class="flex flex-nowrap gap-2">
              <Toggle
                toggled={extension[1]?.enabled === true}
                toggle={() => {
                  toggleExtension(extension[0]);
                  // re-fetching all extension manifests from local storage on every toggle may be expensive tho
                  $extensions.refetch();
                }}
              />
            </div>
          </div>
          {#if extension[1].description}
            <div>
              <p class="text-sm">
                Description:
              </p>
              <p class="text-sm opacity-70">
                {extension[1].description}
              </p>
            </div>
          {/if}
          <button
            aria-label="Remove this extension"
            class="absolute flex rounded-md bg-neutral-200 p-2 transition-[background-color] -right-2 -top-2 dark:bg-neutral-800 hover:bg-white dark:hover:bg-black"
            onclick={() => {
              removeExtension(extension[0]);
              $extensions.refetch();
            }}
          >
            <span class="i-lucide-x block h-5 w-5"></span>
          </button>
        </div>
      {/each}
    {/if}
  </div>
</div>
