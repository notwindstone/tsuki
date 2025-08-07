<!--
  @component Generates an anchor element which will redirect to a route path.
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { QueryParams } from "@/lib/routing/types/query-params.type";
  import routerState from "@/lib/routing/logic/state.svelte";
  import type { Route } from "@/lib/routing";

  const props: {
    "class"?  : string | Array<string>;
    "style"?  : string;
    "children": Snippet;

    /**
     * Route path to redirect when the anchor is clicked.
     */
    "href": Route["path"];

    /**
     * URL query parameters; optional.
     */
    "params"?: QueryParams;
  } = $props();

  function clickAction(event: MouseEvent & { "currentTarget": EventTarget & HTMLAnchorElement }): void {
    event.preventDefault();

    if (window.location.pathname === props.href) {
      return;
    }

    routerState.navigate(props.href, props.params);
  }
</script>

<a
  class={props.class}
  style={props.style}
  href={routerState.generateFullUrl(props.href, props.params)}
  onclick={clickAction}
>
  {@render props.children()}
</a>
