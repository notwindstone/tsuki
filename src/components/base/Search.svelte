<script lang="ts">
  let reference: HTMLInputElement;
  let {
    setSearch,
    classNames,
    placeholder,
    defaultValue,
  }: {
    "setSearch"   : (newValue: unknown) => void;
    "classNames"? : string;
    "placeholder"?: string;
    "defaultValue": string;
  } = $props();

  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.target === null) {
      return;
    }

    // 'tagName' returns target element
    if (!("tagName" in event.target)) {
      return;
    }

    const key = event.key.toLowerCase();

    // remove focus from the input element if user pressed escape on his keyboard
    if (event.target.tagName !== "BODY") {
      if (key !== "escape") {
        return;
      }

      reference?.blur?.();

      return;
    }

    if (key !== "enter") {
      return;
    }

    // focus the input element if user pressed enter on his keyboard
    reference?.focus?.();
  };
</script>

<svelte:window onkeydown={handleKeyboard} />
<div>meh: {defaultValue}</div>
<div
  class={[
    "relative h-10 w-full cursor-text overflow-clip rounded-md bg-neutral-100 ring-2 ring-transparent transition-[shadow] dark:bg-neutral-900 focus-within:ring-black dark:focus-within:ring-white",
    classNames,
  ]}
>
  <div class="pointer-events-none absolute h-10 w-10 flex items-center justify-center">
    <div class="i-lucide-search h-4 w-4"></div>
  </div>
  <input
    type="text"
    bind:this={reference}
    defaultValue={defaultValue}
    oninput={event => setSearch(event.currentTarget.value)}
    class="h-full w-full bg-transparent pl-10 text-sm text-black outline-none dark:text-white focus:outline-none placeholder-neutral-500"
    placeholder={placeholder}
  />
</div>
