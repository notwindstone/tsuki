<script lang="ts">
  import { ApplicationNamespace } from "./constants/app";
  import Book from "@/components/icons/Book.svelte";
  import Clock from "@/components/icons/Clock.svelte";
  import Compass from "@/components/icons/Compass.svelte";
  import { RouterConfiguration, RouteSet } from "@/constants/routes";
  import { Link, Router } from "@/lib/routing";
  import { getCurrentRouteState } from "@/states/route/route.svelte";

  // let status: "fetching" | "reading" | "rendering" = $state("fetching");
  let count: number = $state(0);
  let code: string = $state("console.log('lol wha')");
  let func: Function | undefined = $state(undefined);
  let currentRoute: string = $state("home");
  let pluginLoaded: boolean = $state(false);

  $effect(() => {
    if (!pluginLoaded) {
      return;
    }

    if (!RouteSet.has(currentRoute)) {
      return;
    }
    console.log("%c fired", "font-size: 24px", currentRoute);

    window[ApplicationNamespace] = {
      ...window.__APP__,
      "route": currentRoute,
    };
    window.postMessage("svelte_app_route_changed");
  });

  $effect(() => {
    window.__APP__ = {
      "dynamic": count,
      "static" : "holy fuck",
    };
    window.postMessage("svelte_app_updated");
  });

  $effect(() => {
    if (!code) {
      return;
    }

    func = new Function("module", "exports", code);
  });

  const increment = () => {
    count += 1;
  };

  const url = "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js";

  (async () => {
    const fetched = await fetch(url);

    /*
     * status = "reading";
     * code = await fetched.text();
     */
  })();

  $effect(() => {
    if (!func) {
      return;
    }
    console.log("re-executing");
    // status = "rendering";
    const exports = {
      "svelte_shit": "holyyy is this a static shared variable???",
    };
    const module = { exports };

    func(module, exports);

    pluginLoaded = true;
  });

  const currentRouteState = getCurrentRouteState();
</script>

<main>
  <p class="bg-red-500 w-fit">
    {currentRouteState.currentRouteState.current}
  </p>
  <Link path="/recents">Go Home</Link>
  <Link path="/">Go Back</Link>

  <button onclick={increment}>
    Clicked {count} times
  </button>

  <Router routerConfiguration={RouterConfiguration} />

  <div style="display: flex; gap: 8px">
    <Book active={count % 3 === 0} />
    <Clock active={count % 3 === 1} />
    <Compass active={count % 3 === 2} />
  </div>

  <h1>Vite + Svelte</h1>
  <p style="opacity: 80%">runtime loading of remote components written in any JS framework lul</p>
  <p style="opacity: 40%">shared variables possible too :3</p>
</main>
