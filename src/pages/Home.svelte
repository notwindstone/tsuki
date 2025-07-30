<div id="extensions-root-id" style="position: relative; border-radius: 8px; height: 400px; display: flex; flex-wrap: wrap">
  {#each Array.from({ "length": 10000 }) as item, index (index)}
    <div style={`font-size: ${(index % 4) * 8}px`}>
      Lol apparently it works {item} {index * 2}
    </div>
  {/each}
</div>

<script lang="ts">
  console.log("loaded");
</script>
