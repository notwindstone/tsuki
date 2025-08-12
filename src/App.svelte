<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { RouterConfiguration } from "@/constants/routes";
  import { Router } from "@/lib/routing";
  import { initializeConfig } from "@/lib/config/initialize-config";
  import Layout from "@/Layout.svelte";
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";

  initializeConfig();

  const toEnableTransitions = $derived(
    getCurrentSettingsState().current.transitions,
  );

  $effect(() => {
    document.body.toggleAttribute("data-transitions-disabled", !toEnableTransitions);
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
