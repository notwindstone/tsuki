<script lang="ts">
import { Link } from "@/lib/routing/index.js";
</script>

<!-- if browser supports `svh` (firefox 101+, chrome 108+) -->
<!-- then page will use `svh` as its max height -->
<!-- otherwise `vh` will be applied -->
<div class="flex flex-col gap-2 justify-center items-center max-h-svh h-screen w-full">
  <p class="font-600 text-4xl">
    404
  </p>
  <p class="font-600 text-2xl">
    Not Found
  </p>
  <Link
    class="cursor-pointer bg-red-500 rounded-md px-4 py-2 mt-2 focus:opacity-60 focus:cursor-default transition-[opacity]"
    href="/"
  >
    Home
  </Link>
</div>
