<script lang="ts">
  import { Link, navigate } from "@/lib/routing";
  import { useDebounce } from "@/lib/hooks/use-debounce.svelte.js";
  import { GithubLink, HomePageLinks } from "@/constants/app";
  import Search from "@/components/base/Search.svelte";
  import env from "@/constants/env-variables.json";

  const debouncedSearch = useDebounce("", 300);
</script>

<div class="flex flex-col items-center p-4">
  <div class="relative pb-8 pt-4">
    <span class="select-none text-6xl text-black font-600 dark:text-white">
      tsuki.
    </span>
    <a
      class="absolute bottom-4 left-[50%] translate-x-[-50%] rounded-md bg-neutral-100 px-2 py-1 text-sm text-neutral-700 opacity-60 transition-[opacity] dark:bg-neutral-900 dark:text-neutral-300 hover:opacity-100"
      href={`${GithubLink}/commit/${env.GIT_COMMIT_HASH}`}
    >
      {env.GIT_COMMIT_HASH}
    </a>
  </div>
  <div class="flex flex-nowrap gap-2 pb-2">
    {#each HomePageLinks as link (link.href)}
      <Link
        class="flex flex-nowrap items-center gap-2 rounded-md bg-neutral-100 px-2 py-1 transition-[background-color,opacity] focus:cursor-default dark:bg-neutral-900 hover:bg-neutral-200 focus:opacity-70 dark:hover:bg-neutral-800"
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
