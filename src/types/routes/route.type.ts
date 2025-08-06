import type { Routes } from "@/constants/routes";

export type RouteType = {
  // gets all possible routes from hard-coded object
  "current": typeof Routes[keyof typeof Routes];
};
