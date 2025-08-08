<script lang="ts">
  import type { AppErrorType } from "@/types/misc/app-error.type";

  let {
    currentError,
  }: {
    "currentError": AppErrorType;
  } = $props();

  // true === this is not an error
  const isPlaceholder = currentError.message === "Errors will be shown below if any";
</script>

<!-- i'm using firefox console error colors lol -->
<div class={[
  "w-full flex flex-nowrap break-all border-t p-2 text-start text-sm",
  isPlaceholder
    ? "border-[#38383d] bg-[#232327] text-white"
    : "border-[#743e4c] bg-[#4b2f36] text-[#ffb3d2]",
]}>
  <div class={[
    "h-5 w-5 shrink-0",
    isPlaceholder ? "i-lucide-info" : "i-lucide-circle-alert",
  ]}></div>
  <p class="w-full pl-2">
    {currentError?.message}
  </p>
  <div class="shrink-0 pl-8 text-[#45a1ff]">
    {currentError?.filename}:{currentError?.lineno}:{currentError?.colno}
  </div>
</div>
