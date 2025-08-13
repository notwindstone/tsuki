<script lang="ts">
  import type { ManifestType } from "@/types/extensions/manifest.type";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import type { ExtensionFunctionType } from "@/types/extensions/extension-function.type";

  let {
    name,
    manifest,
  }: {
    "name"    : string;
    "manifest": ManifestType;
  } = $props();

  const initCurrentExtension = getCurrentExtensionsState().init;
  const setCurrentExtensionData = getCurrentExtensionsState().setCurrentExtensionData;

  const extension = createQuery({
    "queryKey": ["extensions", "entry", name],
    "queryFn" : async () => {
      // create an initial values in 'currentExtensionsState' for this key
      initCurrentExtension(name);

      // we keep track of how much time did each extension take at each step
      const fetchingStarted = performance.now();
      const response = await fetch(manifest.url);

      setCurrentExtensionData(name, {
        // next step
        "status"   : "reading",
        // which step we passed
        "timeKey"  : "fetching",
        // how much time did we lose to pass this step
        "timeValue": performance.now() - fetchingStarted,
      });

      const readingStarted = performance.now();
      const code = await response.text();

      setCurrentExtensionData(name, {
        // next step
        "status"   : "initializing",
        // which step we passed
        "timeKey"  : "reading",
        // how much time did we lose to pass this step
        "timeValue": performance.now() - readingStarted,
      });

      const initializingStarted = performance.now();
      const func = new Function("module", "exports", code) as ExtensionFunctionType;

      setCurrentExtensionData(name, {
        // next step
        "status"   : "executing",
        // which step we passed
        "timeKey"  : "initializing",
        // how much time did we lose to pass this step
        "timeValue": performance.now() - initializingStarted,
      });

      const executingStarted = performance.now();
      const exports = {};
      const module = { exports };

      console.log("hmmm");
      func(module, exports);

      setCurrentExtensionData(name, {
        // next step
        "status"   : "done",
        // which step we passed
        "timeKey"  : "executing",
        // how much time did we lose to pass this step
        "timeValue": performance.now() - executingStarted,
      });

      // indicate a success
      return {
        name,
        "success": true,
      };
    },
  });

  $effect(() => {
    console.log(
      "Extension loading:",
      $extension.data,
      "error:",
      $extension.isError,
    );
  });
</script>
