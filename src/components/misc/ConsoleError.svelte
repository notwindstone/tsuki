<script lang="ts">
  import type { AppErrorType } from "@/types/misc/app-error.type";

  let {
    currentError,
  }: {
    "currentError": AppErrorType;
  } = $props();
</script>

<!-- i'm using firefox console error colors lol -->
<div class="w-full flex flex-nowrap break-all border-t border-[#743e4c] bg-[#4b2f36] p-2 text-start text-sm text-[#ffb3d2]">
  <div class="i-lucide-circle-alert h-5 w-5 shrink-0"></div>
  <p class="w-full pl-2">
    {currentError?.message}
  </p>
  <div class="shrink-0 pl-8 text-[#45a1ff]">
    {currentError?.filename}:{currentError?.lineno}:{currentError?.colno}
  </div>
</div>
