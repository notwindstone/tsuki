<script lang="ts">
  let count: number = $state(0);

  function increment() {
    count++;
  }
</script>

<div class="flex flex-col gap-2">
  <p style="view-transition-name:shit">
    shit
  </p>
  <button class="w-fit" onclick={increment}>
    Clicked {count} times
  </button>
  <div id="extensions-root-id" class="relative h-128 w-full rounded-md"></div>
</div>
