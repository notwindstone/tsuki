<script lang="ts">
  import { Link } from "@/lib/routing";

  let count: number = $state(0);

  function increment() {
    count++;
  }
</script>

<div class="flex flex-col gap-2">
  <button class="w-fit" onclick={increment}>
    Clicked {count} times
  </button>
  <Link href="/">
    home page
  </Link>
  <div id="extensions-root-id" class="relative h-128 w-full rounded-md"></div>
</div>
