<script lang="ts">
  import { ApplicationNamespace } from "@/constants/app";

  let {
    title,
    episode,
    idMal,
  }: {
    "title"  : string;
    "episode": number;
    "idMal"  : number;
  } = $props();

  $effect(() => {
    window[ApplicationNamespace].dynamic = {
      ...window[ApplicationNamespace].dynamic,
      "episode": episode,
      "title"  : title,
      "idMal"  : idMal,
    };
    window.postMessage("tsuki_updated_window", "*");
  });
</script>

<div
  id="extensions-player-id"
  class="aspect-media relative col-span-1 flex items-center justify-center border border-neutral-100 rounded-md bg-black lg:col-span-2 dark:border-neutral-900"
>
  <div id="player" class="h-full w-full overflow-hidden rounded-md bg-black outline-none focus:outline-none"></div>
  <script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" charset="utf-8" async></script>
  <script>
    function initPlayer() {
      window.webtor = window.webtor || [];
      window.webtor.push({
        id: 'player',
        width: '100%',
        magnet: 'magnet:?xt=urn:btih:b6ef1835a9ab9e195d20dc62ab392e29305acdad&dn=%5BEMBER%5D%20Seishun%20Buta%20Yarou%20wa%20Santa%20Claus%20no%20Yume%20wo%20Minai%20S01E11%20%5B1080p%5D%20%5BHEVC%20WEBRip%5D%20%28Rascal%20Does%20Not%20Dream%20of%20Santa%20Claus%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce',
        on: function (e) {
          console.log(e);
        },
        baseUrl: "http://94.156.114.215:8080",
      });
    }

    initPlayer();
  </script>
</div>
