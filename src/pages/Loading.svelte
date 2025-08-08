<script>
  import LoadingTooLong from "@/components/misc/LoadingTooLong.svelte";
</script>

<!-- if browser supports `svh` (firefox 101+, chrome 108+) -->
<!-- then page will use `svh` as its max height -->
<!-- otherwise `vh` will be applied -->
<div class="h-screen w-full flex flex-col items-center justify-center bg-black max-h-svh">
  <p class="text-4xl text-white font-600">
    tsuki.
  </p>
  <LoadingTooLong />
</div>
