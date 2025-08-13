<script lang="ts">
  import { getCurrentSettingsState } from "@/states/settings/settings.svelte";
  import Toggle from "@/components/base/Toggle.svelte";

  const settingsState = $derived(getCurrentSettingsState().current);
  const setSettings = getCurrentSettingsState().setSettings;
</script>

<div class="flex justify-center p-4">
  <div class="max-w-320 w-full flex flex-col items-center gap-2">
    <div class="flex flex-nowrap items-center gap-4">
      <p class="">
        Ask for confirmation upon deletion?
      </p>
      <Toggle
        toggle={() => setSettings("confirmation", !settingsState.confirmation)}
        toggled={settingsState.confirmation}
      />
    </div>
    <div class="flex flex-nowrap items-center gap-4">
      <p class="">
        Enable smooth transitions?
      </p>
      <Toggle
        toggle={() => setSettings("transitions", !settingsState.transitions)}
        toggled={settingsState.transitions}
      />
    </div>
    <div class="flex flex-nowrap items-center gap-4">
      <p class="">
        Hide episode cover images?
      </p>
      <Toggle
        toggle={() => setSettings("hideEpisodeImages", !settingsState.hideEpisodeImages)}
        toggled={settingsState.hideEpisodeImages}
      />
    </div>
  </div>
</div>
