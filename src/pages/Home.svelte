<script lang="ts">
  import { Link, navigate } from "@/lib/routing";
  import Search from "@/components/base/Search.svelte";
  import { useDebounce } from "@/lib/hooks/useDebounce.svelte";

  const debouncedSearch = useDebounce("", 300);
</script>

<div class="flex flex-col gap-2 items-center p-4">
  Current: {debouncedSearch.value}
  <Search
    setSearch={debouncedSearch.update}
    classNames="max-w-144"
  />
  <Link href="/anime">
    next page
  </Link>
</div>
