<script lang="ts">
  import { Link } from "@/lib/routing/index.js";
  import { getExtensions } from "@/lib/extensions/get-extensions.js";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";

  const extensionsState = $derived(
    getCurrentExtensionsState().currentExtensionsState,
  );
</script>

<div class="whitespace-pre">
  {JSON.stringify(extensionsState, null, 2)}
  <div>
    {JSON.stringify(getExtensions(), null, 2)}
  </div>
  <Link href="/">Home</Link>
</div>
