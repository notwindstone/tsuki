import { cubicOut } from "svelte/easing";

export default function slideFade(
  node: HTMLElement,
  params: { "delay"?: number; "duration"?: number; "easing"?: (t: number) => number },
) {
  return {
    "delay"   : params.delay || 0,
    "duration": params.duration || 400,
    "easing"  : params.easing || cubicOut,
    "css"     : (t: number, u: number) => `opacity: ${t};transform: translate3d(${u * 64}px, 0, 0)`,
  };
}
