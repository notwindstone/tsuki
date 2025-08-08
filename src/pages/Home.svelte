<script lang="ts">
  import { Link, navigate } from "@/lib/routing";
  import Search from "@/components/base/Search.svelte";
  import { useDebounce } from "@/lib/hooks/use-debounce.svelte.js";
  import { createQuery } from "@tanstack/svelte-query";

  const debouncedSearch = useDebounce("", 300);
  const query = createQuery({
    "queryKey": ["todos"],
    "queryFn" : async () => {
      const plugin = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/styles-needy-girl-overdose/bundle.js");

      return await plugin.text();
    },
  });
</script>

<div class="flex flex-col items-center gap-2 p-4">
  {#if $query.isLoading}
    <p>
      Loading...
    </p>
  {:else if $query.isError}
    <p>
      Error: {$query.error.message}
    </p>
  {:else if $query.isSuccess}
    <p class="line-clamp-8 break-all">
      {JSON.stringify($query.data)}
    </p>
  {/if}
  Current: {debouncedSearch.value}
  <Search
    setSearch={debouncedSearch.update}
    classNames="max-w-144"
  />
  <Link href="/anime">
    next page
  </Link>
</div>
