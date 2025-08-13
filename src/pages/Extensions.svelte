<script lang="ts">
  import { Link } from "@/lib/routing/index.js";
  import { getExtensions } from "@/lib/extensions/get-extensions.js";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import { toggleExtension } from "@/lib/extensions/toggle-extension";

  const queryClient = useQueryClient();
  const extensions = Object.entries(
    getExtensions({
      "local": true,
    }),
  );

  const extensionsState = $derived(
    getCurrentExtensionsState().currentExtensionsState,
  );
</script>

<div class="flex flex-col gap-2 whitespace-pre">
  {JSON.stringify(extensionsState, null, 2)}
  {#each extensions as extension (extension[0])}
    <button
      class="flex"
      onclick={() => {
        toggleExtension(extension[0]);
        queryClient.refetchQueries({ "queryKey": ExtensionsQueryKey });
      }}
    >
      Toggle {extension[0]}
    </button>
  {/each}
  <Link href="/">Home</Link>
</div>
