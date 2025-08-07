<script lang="ts">
import { Link, navigate } from "@/lib/routing";
import Search from "@/components/base/Search.svelte";

let searchState = $state<Record<"search", string>>({
  "search": "",
});
</script>

<div class="flex flex-col gap-2 items-center p-4">
  <Search searchState={searchState} />
</div>
