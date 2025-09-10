<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { RouterConfiguration } from "@/constants/routes";
  import { Router } from "@/lib/routing";
  import { initializeConfig } from "@/lib/config/initialize-config";
  import Layout from "@/Layout.svelte";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";
  import { initializeExtensions } from "@/lib/extensions/initialize-extensions";
  import { initializeWindow } from "@/lib/helpers/initialize-window";

  initializeConfig();
  initializeExtensions();

  const toEnableTransitions = $derived(
    getCurrentSettingsState().current.transitions,
  );

  // to communicate with extensions
  initializeWindow({
    // we don't care about state reactivity
    "toEnableTransitions": getCurrentSettingsState().current.transitions,
  });

  $effect(() => {
    if (toEnableTransitions) {
      document.body.removeAttribute("data-transitions-disabled");

      return;
    }

    document.body.setAttribute("data-transitions-disabled", "");
  });

  const queryClient = new QueryClient({
    "defaultOptions": {
      "queries": {
        // set queries cache time to Infinity (until the page reload tho)
        "staleTime": Infinity,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <Layout>
    <Router routerConfiguration={RouterConfiguration} />
  </Layout>
</QueryClientProvider>
