<script>
  import LoadingTooLong from "@/components/misc/LoadingTooLong.svelte";
</script>

<!-- if browser supports `svh` (firefox 101+, chrome 108+) -->
<!-- then page will use `svh` as its max height -->
<!-- otherwise `vh` will be applied -->
<div class="h-screen w-full flex flex-col items-center justify-center bg-white max-h-svh dark:bg-black">
  <p class="select-none text-4xl text-black font-600 dark:text-white">
    tsuki
  </p>
  <LoadingTooLong />
</div>
