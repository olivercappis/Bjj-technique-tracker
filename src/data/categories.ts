import type { PositionCategory } from "@/types";

export const categories: PositionCategory[] = [
  {
    id: "guard",
    name: "Guard",
    slug: "guard",
    description:
      "Bottom positions where you control your opponent using your legs. The foundation of BJJ's bottom game.",
    icon: "Shield",
    perspective: "bottom",
  },
  {
    id: "guard-passing",
    name: "Guard Passing",
    slug: "guard-passing",
    description:
      "Techniques and positions for getting past your opponent's guard to achieve a dominant position.",
    icon: "Swords",
    perspective: "top",
  },
  {
    id: "mount",
    name: "Mount",
    slug: "mount",
    description:
      "One of the most dominant positions in BJJ, sitting on top of your opponent's torso with full control.",
    icon: "Crown",
    perspective: "both",
  },
  {
    id: "side-control",
    name: "Side Control",
    slug: "side-control",
    description:
      "A dominant top position where you control your opponent from the side, pinning them with your chest and hips.",
    icon: "Grip",
    perspective: "both",
  },
  {
    id: "back-control",
    name: "Back Control",
    slug: "back-control",
    description:
      "The most dominant position in BJJ. You are behind your opponent with hooks or a body triangle controlling them.",
    icon: "Target",
    perspective: "both",
  },
  {
    id: "turtle",
    name: "Turtle",
    slug: "turtle",
    description:
      "A defensive position on all fours. A common transitional position with attacks and escapes for both players.",
    icon: "ShieldAlert",
    perspective: "both",
  },
  {
    id: "standing",
    name: "Standing & Takedowns",
    slug: "standing",
    description:
      "Where the fight begins. Takedowns, throws, and guard pulls to bring the fight to the ground on your terms.",
    icon: "Footprints",
    perspective: "both",
  },
];
