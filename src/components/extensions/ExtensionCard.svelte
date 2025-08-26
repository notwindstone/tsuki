<script lang="ts">
  import { toggleExtension } from "@/lib/extensions/toggle-extension";
  import { removeExtension } from "@/lib/extensions/remove-extension";
  import Image from "@/components/base/Image.svelte";
  import Toggle from "@/components/base/Toggle.svelte";
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { Link, type Route } from "@/lib/routing";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";

  let {
    extension,
    refetch,
  }: {
    "extension": [string, ManifestType];
    "refetch"  : () => void;
  } = $props();

  const currentExtensionState = $derived(
    getCurrentExtensionsState().currentExtensionsState[extension[0]],
  );

  /*
   * assure typescript that this is an array of 'Route["path"]' typed elements even if it is not.
   * this is needed, because a 'Link' element accepts only 'Route["path"]' typed urls, but extensions can make
   * custom routes that are not in 'Route["path"]' type
   */
  const pages = (extension[1].pages ?? []) as Array<Route["path"]>;
</script>

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
    <div class="flex flex-nowrap items-center gap-2 pr-8">
      <Toggle
        toggled={extension[1]?.enabled === true}
        toggle={() => {
          toggleExtension(extension[0]);
          // re-fetching all extension manifests from local storage on every toggle may be expensive tho
          refetch();
        }}
      />
    </div>
  </div>
  {#if extension[1].categories && extension[1].categories.length > 0}
    <div>
      <p class="text-sm">
        Categories:
      </p>
      <p class="text-sm opacity-70">
        {extension[1].categories.join(", ")}
      </p>
    </div>
  {/if}
  {#if extension[1].languages && extension[1].languages.length > 0}
    <div>
      <p class="text-sm">
        Languages:
      </p>
      <p class="text-sm opacity-70">
        {extension[1].languages.join(", ")}
      </p>
    </div>
  {/if}
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
  {#if pages && pages.length > 0}
    <div>
      <p class="text-sm">
        Pages:
      </p>
      {#each pages as url (url)}
        <Link class="mr-2 text-sm opacity-70 transition-[opacity] hover:opacity-100" href={url}>
          {url}
        </Link>
      {/each}
    </div>
  {/if}
  {#if currentExtensionState !== undefined}
    <div>
      <p class="text-sm">
        Status:
      </p>
      <div class="flex gap-2 break-all text-sm opacity-70">
        {currentExtensionState.status} - {JSON.stringify(currentExtensionState.time)}
      </div>
    </div>
  {/if}
  <button
    aria-label="Remove this extension"
    class="absolute flex rounded-md bg-neutral-200 p-2 transition-[background-color] -right-2 -top-2 dark:bg-neutral-800 hover:bg-white dark:hover:bg-black"
    onclick={() => {
      removeExtension(extension[0]);
      refetch();
    }}
  >
    <span class="i-lucide-x block h-5 w-5"></span>
  </button>
</div>
