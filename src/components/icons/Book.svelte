<script lang="ts">
</script>

<div
    aria-label="Library"
    class="group"
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path fill="#e3e3e3" d="M 240 -80 q -33 0 -56.5 -23.5 T 160 -160 v -640 q 0 -33 23.5 -56.5 T 240 -880 h 480 q 33 0 56.5 23.5 T 800 -800 v 640 q 0 33 -23.5 56.5 T 720 -80 H 240 Z m 0 -80 h 480 v -640 h -80 H 240 v 640 Z m 0 0 v -640 v 640 Z" />
        <path class="book-icon__inner book-icon__bookmark-first" fill="#e3e3e3" d="M 640 -440 m 0 -90 l -100 -60 l -100 60 v -280 H 640 Z" />
        <path class="book-icon__inner book-icon__bookmark-second" fill="black" d="M 640 -440 m 0 -440 l -100 -0 l -100 0 v 0 H 640 Z" />
    </svg>
</div>

<style>
    .book-icon__inner {
      will-change: d;
      transition-property: d;
      transition-duration: 200ms;
    }

    .group:hover .book-icon__bookmark-first {
      transition-timing-function: cubic-bezier(.75,.25,.75,.25);
      d: path("M 730 -440 m 0 290 l -100 0 l -400 0 v -680 H 730 Z");
    }

    .group:hover .book-icon__bookmark-second {
      transition-timing-function: cubic-bezier(.25,.75,.25,.75);
      transition-delay: 250ms;
      d: path("M 640 -440 m 0 -80 l -100 -60 l -100 60 v -360 H 640 Z");
    }
</style>
