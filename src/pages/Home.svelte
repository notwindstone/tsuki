<script lang="ts">
  import { Link, navigate } from "@/lib/routing";
  import { useDebounce } from "@/lib/hooks/use-debounce.svelte.js";
  import Search from "@/components/base/Search.svelte";
  import { HomePageLinks } from "@/constants/app";

  const debouncedSearch = useDebounce("", 300);
</script>

<div class="flex flex-col items-center gap-2 p-4">
  <div class="flex flex-nowrap gap-2">
    {#each HomePageLinks as link (link.href)}
      <Link
        class="flex flex-nowrap items-center gap-2 rounded-md bg-neutral-900 px-2 py-1 transition-[opacity] focus:cursor-default focus:opacity-70"
        href={link.href}
      >
        <div class={[
          "h-4 w-4",
          // presetIcons() does not detect icon strings defined in other places lol
          link.href === "/settings"
            ? "i-lucide-settings"
            : "i-lucide-blocks",
        ]}></div>
        <div>
          {link.label}
        </div>
      </Link>
    {/each}
  </div>
  <Search
    setSearch={debouncedSearch.update}
    classNames="max-w-144"
    placeholder="Search anime by name or MAL ID..."
  />
</div>
