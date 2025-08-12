<script lang="ts">
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";
  import Toggle from "@/components/base/Toggle.svelte";

  const settingsState = getCurrentSettingsState().current;
  const setSettings = getCurrentSettingsState().setSettings;
</script>

<div class="flex justify-center p-4">
  <div class="max-w-320 w-full">
    <Toggle
      toggle={() => setSettings("confirmation", !settingsState.confirmation)}
      toggled={settingsState.confirmation}
    />
  </div>
</div>
