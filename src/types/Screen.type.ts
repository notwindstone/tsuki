import { Screens } from "@/constants/screens";

export type ScreenType = {
  "state": typeof Screens[keyof typeof Screens] | undefined;
};
