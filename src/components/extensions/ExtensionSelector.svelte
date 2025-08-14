<script lang="ts">
  import { createQuery  } from "@tanstack/svelte-query";
  import { ExtensionsQueryKey } from "@/constants/extensions";
  import { getExtensions } from "@/lib/extensions/get-extensions";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";

  const extensionsState = $derived(
    getCurrentExtensionsState().currentExtensionsState,
  );
  const extensions = createQuery({
    // will be re-fetched on plugin list update
    "queryKey": ExtensionsQueryKey,
    "queryFn" : () => {
      const currentExtensions = getExtensions({
        "local": true,
      });

      return Object.entries(currentExtensions);
    },
  });

  let selected = $state<string | undefined>(undefined);
</script>

<div class="w-full flex flex-wrap items-center gap-4">
  {#if $extensions.data}
    {#each $extensions.data as extension (extension[0])}
      <!-- show selector only if extension was loaded, enabled and can be a player -->
      {#if
        extensionsState[extension[0]]?.status === "done" &&
        extension[1]?.enabled &&
        (
          extension[1]?.categories?.includes?.("mal") ||
          extension[1]?.categories?.includes?.("non-mal")
        )
      }
        <button
          disabled={selected === extension[0]}
          class={[
            "flex-1 rounded-md text-nowrap text-center p-2 transition-[background-color]",
            selected === extension[0]
              ? "bg-rose-500"
              : "bg-neutral-100 bg-neutral-900",
          ]}
          onclick={() => {
            if (selected === extension[0]) {
              return;
            }

            selected = extension[0];
            window.postMessage(`tsuki_player_${extension[0]}`, "*");
          }}
        >
          {extension[1].name}
        </button>
      {/if}
    {/each}
  {/if}
</div>
