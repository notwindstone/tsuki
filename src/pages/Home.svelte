<script lang="ts">
import { Link } from "@/lib/routing";
</script>

<div class="p-4">
  <Link href="/anime">click</Link>
  <h1>Vite + Svelte</h1>
  <p style="opacity: 80%">runtime loading of remote components written in any JS framework lul</p>
  <p style="opacity: 40%">shared variables possible too :3</p>
  {#each Array.from({ "length": 500 }) as _, index (index)}
    <div>{index}</div>
  {/each}
</div>
