<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { RouterConfiguration } from "@/constants/routes";
  import { Router } from "@/lib/routing";
  import Layout from "@/Layout.svelte";

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
