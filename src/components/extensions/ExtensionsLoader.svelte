<script lang="ts">
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";
  import { RouteSet } from "@/constants/routes";
  import { ApplicationNamespace } from "@/constants/app";
  import { shitty } from "@/pages/shit.json";
  import type { ExtensionFunctionType } from "@/types/extensions/extension-function.type";

  console.log("hello");

  let code: string | undefined = $state(undefined);
  let func: ExtensionFunctionType | undefined = $state(undefined);

  const gsdfgs = kjhas.asdasd;

  const pluginID = "vue-extension";

  const currentExtensionsState = getCurrentExtensionsState().currentExtensionsState;
  const initCurrentExtension = getCurrentExtensionsState().init;
  const setCurrentExtensionData = getCurrentExtensionsState().setCurrentExtensionData;

  initCurrentExtension(pluginID);

  const currentRouteState: any = {};

  let hasLoaded = $derived.by(() => currentExtensionsState[pluginID].status === "done");

  $effect(() => {
    if (!hasLoaded) {
      return;
    }

    if (!RouteSet.has(currentRouteState.current)) {
      return;
    }
    console.log("%c fired", "font-size: 24px", currentRouteState.current);

    window[ApplicationNamespace] = {
      ...window.__TSUKI__,
      // "currentRoute": currentRouteState.current,
    };
    window.postMessage("svelte_app_route_changed");
  });

  $effect(() => {
    window.__TSUKI__ = {
      ...window.__TSUKI__,
      // "dynamic": count,
    };
    window.postMessage("svelte_app_updated");
  });

  // const url = "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js";

  (async () => {
    if (hasLoaded) {
      return;
    }

    // const fetched = await fetch(url);

    setCurrentExtensionData(pluginID, {
      "status"   : "reading",
      "timeKey"  : "fetching",
      "timeValue": 0,
    });
    // code = await fetched.text();
    code = shitty;
  })();

  $effect(() => {
    if (hasLoaded) {
      return;
    }

    if (!code) {
      return;
    }

    const beforeLoad = performance.now();

    setCurrentExtensionData(pluginID, {
      "status"   : "initializing",
      "timeKey"  : "reading",
      "timeValue": 0,
    });
    // tell typescript that this is not just a Function type
    func = new Function("module", "exports", code) as ExtensionFunctionType;
    // func = new Function("module", "exports", "_tsuki", "with (_tsuki) { " + code + " }");

    if (!func) {
      return;
    }

    const exports = {};
    const module = { exports };

    console.log("running the plugin");
    setCurrentExtensionData(pluginID, {
      "status"   : "executing",
      "timeKey"  : "initializing",
      "timeValue": 0,
    });
    func(module, exports);

    setCurrentExtensionData(pluginID, {
      "status"   : "done",
      "timeKey"  : "executing",
      "timeValue": performance.now() - beforeLoad,
    });
  });
</script>
