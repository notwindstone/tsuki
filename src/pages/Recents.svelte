<script lang="ts">
  import { RouteSet } from "@/constants/routes";
  import { ApplicationNamespace } from "@/constants/app";
  import { getCurrentRouteState } from "@/states/route/route.svelte";
  import { getCurrentExtensionsState } from "@/states/extensions/extensions.svelte";
  import { shitty } from "./shit.json";

  let count: number = $state(0);
  let code: string | undefined = $state(undefined);
  let func: Function | undefined = $state(undefined);

  const pluginID = "vue-extension";

  const currentExtensionsState = getCurrentExtensionsState().currentExtensionsState;
  const initCurrentExtension = getCurrentExtensionsState().init;
  const setCurrentExtensionStatus = getCurrentExtensionsState().setCurrentExtensionStatus;
  const setCurrentExtensionTime = getCurrentExtensionsState().setCurrentExtensionTime;

  initCurrentExtension(pluginID);

  const currentRouteState = getCurrentRouteState().currentRouteState;

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
      "currentRoute": currentRouteState.current,
    };
    window.postMessage("svelte_app_route_changed");
  });

  $effect(() => {
    window.__TSUKI__ = {
      ...window.__TSUKI__,
      "dynamic": count,
    };
    window.postMessage("svelte_app_updated");
  });

  const url = "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js";

  (async () => {
    if (hasLoaded) {
      return;
    }

    const fetched = await fetch(url);

    setCurrentExtensionStatus(pluginID, "reading");
    //code = await fetched.text();
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

    setCurrentExtensionStatus(pluginID, "loading");
    func = new Function("module", "exports", "_tsuki", code);
    // func = new Function("module", "exports", "_tsuki", "with (_tsuki) { " + code + " }");

    if (!func) {
      return;
    }

    const exports = {};
    const module = { exports };

    console.log("running the plugin");
    setCurrentExtensionStatus(pluginID, "running");
    func(module, exports, {
      "damn" : "that's",
      "crazy": true,
    });

    setCurrentExtensionStatus(pluginID, "done");

    const afterLoad = performance.now();

    setCurrentExtensionTime(pluginID, afterLoad - beforeLoad);
  });
</script>

<div class="flex flex-col gap-2">
  <button class="w-fit" onclick={() => count++}>
    Clicked {count} times
  </button>
  <p>{currentExtensionsState[pluginID].status}</p>
  <p>{currentExtensionsState[pluginID].timeToLoad} ms to load this extension</p>
  <div id="extensions-root-id" class="relative h-128 w-full rounded-md"></div>
</div>
