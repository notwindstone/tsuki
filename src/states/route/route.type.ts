import { Routes } from "@/constants/routes";

export type RouteType = {
  "current": typeof Routes[keyof typeof Routes];
};
