<div id="extensions-root-id" style="position: relative; border-radius: 8px; height: 400px; display: flex; flex-wrap: wrap">
  {#each Array.from({ "length": 20000 }) as item, index (index)}
    <div style={`font-size: ${Math.floor(Math.random() * 12) * ((index % 3) + 1)}px`}>
      Lol apparently it works {item} {index + Math.random()}
    </div>
  {/each}
</div>

<script lang="ts">
  console.log("loaded");
</script>
