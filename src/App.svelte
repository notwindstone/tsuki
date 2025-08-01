<script lang="ts">
  import { RouterConfiguration } from "@/constants/routes";
  import { Router } from "@/lib/routing";
  import Layout from "@/Layout.svelte";
</script>

<Layout>
  <Router routerConfiguration={RouterConfiguration} />
</Layout>
