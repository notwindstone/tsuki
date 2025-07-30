<script lang="ts">
  import { colors } from "unocss/preset-mini";

  let {
    active,
  }: {
    "active": boolean;
  } = $props();
</script>

<svg
  class={["w-32 h-32", { active }]}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -960 960 960"
>
  <path
    class="compass-icon"
    fill="#e3e3e3"
    d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"
  />
</svg>

<style>
.compass-icon {
  will-change: d;
  transition-property: d;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(.75,.25,.75,.25);
}

.active .compass-icon {
  d: path("m 300 -300 l 280 -80 l 80 -280 l -280 80 l -80 280 Z m 180 -120 q -25 0 -42.5 -17.5 T 420 -480 q 0 -25 17.5 -42.5 T 480 -540 q 25 0 42.5 17.5 T 540 -480 q 0 25 -17.5 42.5 T 480 -420 Z m 0 340 q -83 0 -156 -31.5 T 197 -197 q -54 -54 -85.5 -127 T 80 -480 q 0 -83 31.5 -156 T 197 -763 q 54 -54 127 -85.5 T 480 -880 q 83 0 156 31.5 T 763 -763 q 54 54 85.5 127 T 880 -480 q 0 83 -31.5 156 T 763 -197 q -54 54 -127 85.5 T 480 -80 Z m 0 -400 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 Z m 27 -183 Z");
}
</style>
