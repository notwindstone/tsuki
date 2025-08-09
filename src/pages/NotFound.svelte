<script lang="ts">
import { Link } from "@/lib/routing/index.js";
</script>

<!-- if browser supports `svh` (firefox 101+, chrome 108+) -->
<!-- then page will use `svh` as its max height -->
<!-- otherwise `vh` will be applied -->
<div class="h-screen w-full flex flex-col items-center justify-center gap-2 max-h-svh">
  <p class="text-4xl font-600">
    404
  </p>
  <p class="text-2xl font-600">
    Not Found
  </p>
  <Link
    class="mt-2 cursor-pointer rounded-md bg-red-500 px-4 py-2 transition-[opacity] focus:cursor-default focus:opacity-70"
    href="/"
  >
    Home
  </Link>
</div>
