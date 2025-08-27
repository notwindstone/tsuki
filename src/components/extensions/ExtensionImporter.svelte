<script lang="ts">
    import { addExtensions } from "@/lib/extensions/add-extensions";
    import type { ManifestType } from "@/types/extensions/manifest.type";

  let {
    refetch,
  }: {
    "refetch": () => void;
  } = $props();
  let currentURL = $state<string>("");

  const importExtension = () => {
    if (currentURL.trim() === "") {
      return;
    }

    const extensionToImport: Record<string, ManifestType> = {};
    const timeBasedID = Date.now().toString();

    extensionToImport[timeBasedID] = {
      "id"        : timeBasedID,
      "logo"      : "/frieren-no-image.webp",
      "name"      : "An Extension, key: " + timeBasedID,
      "url"       : currentURL,
      "version"   : "0.0",
      "authors"   : ["unknown"],
      "languages" : ["en"],
      "categories": ["non-mal"],
    };

    addExtensions(extensionToImport);
    refetch();
  };
</script>

<div class="w-full flex flex-nowrap gap-4">
  <input
    type="text"
    class="h-9 w-full rounded-md bg-neutral-100 px-2 text-sm text-black outline-none ring-2 ring-transparent transition-[shadow] dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-black dark:focus:ring-white placeholder-neutral-500"
    placeholder="Paste a URL with plugin's bundled code"
    bind:value={currentURL}
  />
  <button
    disabled={currentURL.trim() === ""}
    aria-label="Import an extension from the URL"
    class="flex shrink-0 rounded-md bg-neutral-100 p-2 transition-[background-color] dark:bg-neutral-900 disabled:bg-transparent hover:bg-white dark:hover:bg-black disabled:hover:bg-transparent"
    onclick={importExtension}
  >
    <span class="i-lucide-plus block h-5 w-5"></span>
  </button>
</div>
