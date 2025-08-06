<script lang="ts">
import { Link } from "@/lib/routing";
</script>

<div class="p-4">
  <Link href="/anime">click</Link>
  <div>
    Vite + Svelte
  </div>
  <div class="opacity-70">
    runtime loading of remote components written in any JS framework lul
  </div>
  <div class="opacity-40">
    shared variables possible too :3
  </div>
  {#each Array.from({ "length": 500 }) as _, index (index)}
    <div>{index}</div>
  {/each}
</div>
