<script lang="ts">
  import svelteLogo from '/svelte.svg'
  import viteLogo from '/vite.svg'
  import shitty from "./shitty.json";
  import { Router, navigate, type RouterConf } from "svelte-mini-router";
  import {ApplicationNamespace} from "./constants/app";


  export const RouterConfiguration: RouterConf = {
    routes: [
      {
        path: "/",
        render: () => import("@/pages/Home.svelte"),
      },
      {
        path: "/shit",
        render: () => import("./Shit.svelte"),
      },
    ],
    render404: () => import("./pages/NotFound.svelte"),
  };
  const routePaths = new Set([
    "home",
    "shit",
  ]);

  let status: "fetching" | "reading" | "rendering" = $state("fetching");
  let count: number = $state(0);
  let code: string = $state(shitty.shit);
  let func: Function | undefined = $state(undefined);
  let currentRoute: string = $state("home");
  let pluginLoaded: boolean = $state(false);

  $effect(() => {
    if (!pluginLoaded) {
      return;
    }

    if (!routePaths.has(currentRoute)) {
      return;
    }
    console.log("%c fired", "font-size: 24px", currentRoute);

    window.postMessage("svelte_app_route_changed");
    window[ApplicationNamespace] = {
      ...window.__APP__,
      route: currentRoute,
    };
  });

  $effect(() => {
    window.__APP__ = {
      dynamic: count,
      static:  "holy fuck",
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
    count += 1
  }

  const url = "https://raw.githubusercontent.com/ame-chan-lol/anisun-vue-example-extension/refs/heads/main/dist/bundle.js";

  (async () => {
    const fetched = await fetch(url);

    status = "reading";
    //code = await fetched.text();
  })();

  $effect(() => {
    if (!func) {
      return;
    }
console.log("re-executing")
    status = "rendering";
    const exports = {
      svelte_shit: "holyyy is this a static shared variable???",
    };
    const module = { exports };

    func(module, exports);

    pluginLoaded = true;
  });
</script>

<main>
  {#if currentRoute === "home"}
    <button onclick={() => {
      navigate("/shit");
      currentRoute = "/shit";
    }}>settings</button>
  {:else}
    <button onclick={() => {
      navigate("/");
      currentRoute = "home";
    }}>home</button>
  {/if}

  <Router routerConf={RouterConfiguration} />

  <div style="display: flex; justify-content: center">
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>
  <p style="opacity: 80%">runtime loading of remote components written in any JS framework lul</p>
  <p style="opacity: 40%">shared variables possible too :3</p>

  <div class="card">
    <button onclick={increment}>
      Clicked {count} times
    </button>
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 128px;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
