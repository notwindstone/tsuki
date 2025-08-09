<script lang="ts">
  import { Link, navigate } from "@/lib/routing";
  import { useDebounce } from "@/lib/hooks/use-debounce.svelte.js";
  import Search from "@/components/base/Search.svelte";

  const debouncedSearch = useDebounce("", 300);
</script>

<div class="flex flex-col items-center gap-2 p-4">
  <Search
    setSearch={debouncedSearch.update}
    classNames="max-w-144"
    placeholder="Search anime by name or MAL ID..."
  />
  <Link href="/anime">
    next page
  </Link>
</div>
