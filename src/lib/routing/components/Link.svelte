<!--
  @component Generates an anchor element which will redirect to a route path.
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { QueryParams } from "../logic/types";
  import routerState from "../logic/state.svelte";

  const props: {

    /**
     * Route path to redirect when the anchor is clicked.
     */
    "path": string;

    /**
     * URL query parameters; optional.
     */
    "params"? : QueryParams;
    "class"?  : string;
    "children": Snippet;
  } = $props();

  function clickAction(event: MouseEvent & { "currentTarget": EventTarget & HTMLAnchorElement }): void {
    event.preventDefault();

    routerState.navigate(props.path, props.params);
  }
</script>

<a
  class={props.class}
  href={routerState.generateFullUrl(props.path, props.params)}
  onclick={clickAction}
>
  {@render props.children()}
</a>
