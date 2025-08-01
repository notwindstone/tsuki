import type { RouteType } from "@/states/route/route.type";
import type { Component } from "svelte";
import Book from "@/components/icons/Book.svelte";
import Clock from "@/components/icons/Clock.svelte";
import Compass from "@/components/icons/Compass.svelte";

export const NavigationButtons: Array<{
  "Path" : RouteType["current"];
  "Icon" : Component<{ "active": boolean }>;
  "Label": string;
}> = [
  {
    "Path" : "/",
    "Icon" : Book,
    "Label": "Главная",
  },
  {
    "Path" : "/recents",
    "Icon" : Clock,
    "Label": "Недавние",
  },
  {
    "Path" : "/browse",
    "Icon" : Compass,
    "Label": "Поисковик",
  },
];
