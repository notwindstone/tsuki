<script lang="ts">
</script>

<div style="display: flex; width: 256px; height: 256px">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path class="book-icon book-icon__shell" fill="#e3e3e3" d="M 240 -80 q -33 0 -56.5 -23.5 T 160 -160 v -640 q 0 -33 23.5 -56.5 T 240 -880 h 480 q 33 0 56.5 23.5 T 800 -800 v 640 q 0 33 -23.5 56.5 T 720 -80 H 240 Z m 0 -80 h 480 v -640 h -80 v 280 l -100 -60 l -100 60 v -280 H 240 v 640 Z m 0 0 v -640 v 640 Z" />
        <path class="book-icon book-icon__bookmark" fill="" d="M 640 -440 m 0 -80 l -100 -60 l -100 60 v -280 H 640 Z" />
    </svg>
</div>

<style>
    .book-icon {
      will-change: d;
      transition-property: d;
      transition-duration: 200ms;
    }

    svg:hover .book-icon__shell {
      transition-timing-function: cubic-bezier(.75,.25,.75,.25);
      d: path("M 240 -80 q -33 0 -56.5 -23.5 T 160 -160 v -640 q 0 -33 23.5 -56.5 T 240 -880 h 480 q 33 0 56.5 23.5 T 800 -800 v 640 q 0 33 -23.5 56.5 T 720 -80 H 240 Z m 0 -80 h 480 v -640 h 0 v 640 l -180 0 l -300 0 v -640 H 240 v 640 Z m 0 0 v -640 v 640 Z");
    }

    svg:hover .book-icon__bookmark {
      transition-timing-function: cubic-bezier(.25,.75,.25,.75);
      transition-delay: 300ms;
      d: path("M 640 -440 m 0 -80 l -100 -60 l -100 60 v -320 H 640 Z");
    }
</style>
