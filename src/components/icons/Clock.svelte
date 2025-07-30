<script lang="ts">
</script>

<div
    aria-label="Library"
    class="group"
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path class="clock-icon" fill="#e3e3e3" d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
    </svg>
</div>

<style>
  .group {
    width: 32px;
    height: 32px;
  }

  .clock-icon {
    will-change: d;
    transition-property: d;
    transition-duration: 200ms;
  }

  .group:hover .clock-icon {
    transition-timing-function: cubic-bezier(.75,.25,.75,.25);
    d: path("m 612 -292 l 56 -56 l -148 -148 v -184 h -80 v 216 l 172 172 Z M 480 -80 q -83 0 -156 -31.5 T 197 -197 q -54 -54 -85.5 -127 T 80 -480 q 0 -83 31.5 -156 T 197 -763 q 54 -54 127 -85.5 T 480 -880 q 83 0 156 31.5 T 763 -763 q 54 54 85.5 127 T 880 -480 q 0 83 -31.5 156 T 763 -197 q -54 54 -127 85.5 T 480 -80 Z m 0 -400 Z m 0 0 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 q 0 0 0 0 T 480 -480 Z");
  }
</style>
