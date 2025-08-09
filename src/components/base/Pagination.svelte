<script lang="ts">
  import type { HistoryEntryType } from "@/types/history/history-entry.type";

  let {
    data,
    size,
    chunkSize,
  }: {
    "data"     : Record<number, Array<HistoryEntryType>>;
    "size"     : number;
    "chunkSize": number;
  } = $props();
</script>

<div>

</div>
