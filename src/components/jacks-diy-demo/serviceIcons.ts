import {
  FrameCorners,
  Hammer,
  HouseLine,
  Lightning,
  Package,
  PaintBrush,
  SquaresFour,
  Television,
  Tree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

// Category icons for jacksAllServices, keyed by its `icon` field
export const serviceIcons: Record<string, Icon> = {
  lightning: Lightning,
  television: Television,
  hammer: Hammer,
  package: Package,
  "paint-brush": PaintBrush,
  "squares-four": SquaresFour,
  "frame-corners": FrameCorners,
  tree: Tree,
  "house-line": HouseLine,
};
