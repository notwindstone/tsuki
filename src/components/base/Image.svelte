<script lang="ts">
  import { NoImageURL } from "@/constants/app";

  let {
    classNames,
    alt,
    src,
  }: {
    "classNames"?: string;
    "alt"        : string;
    "src"        : string | undefined;
  } = $props();
  let show = $state<boolean>(false);
  // we will change this image on image load error
  let image = $state<string>(src ?? NoImageURL);
</script>

<img
  loading="lazy"
  class={[
    "h-full w-full object-cover transition-[opacity,transform] duration-300 group-hover:scale-105",
    show ? "opacity-100" : "opacity-0",
    classNames,
  ]}
  alt={alt}
  src={image}
  onload={() => show = true}
  onerror={() => image = NoImageURL}
/>
