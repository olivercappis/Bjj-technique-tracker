import type { Position } from "@/types";

export const positions: Position[] = [
  // ── Guard ──────────────────────────────────────────────
  {
    id: "closed-guard",
    categoryId: "guard",
    name: "Closed Guard",
    slug: "closed-guard",
    description:
      "The most fundamental guard in BJJ. Your legs are wrapped around your opponent's waist, controlling their posture and distance.",
    keyPoints: [
      "Break opponent's posture by pulling them down with your legs and overhooks",
      "Control at least one wrist or sleeve at all times",
      "Keep your hips active — angle off to create attack opportunities",
      "Use your legs to off-balance your opponent and set up sweeps",
    ],
  },
  {
    id: "half-guard",
    categoryId: "guard",
    name: "Half Guard",
    slug: "half-guard",
    description:
      "You control one of your opponent's legs between yours. A versatile position with a deep game of sweeps and back takes.",
    keyPoints: [
      "Get the underhook on the side you're trapping — this is your lifeline",
      "Stay on your side, never flat on your back",
      "Use your knee shield to manage distance and prevent crossface",
      "The lockdown can stall your opponent while you work for sweeps",
    ],
  },
  {
    id: "de-la-riva",
    categoryId: "guard",
    name: "De La Riva Guard",
    slug: "de-la-riva",
    description:
      "An open guard where you hook behind your opponent's lead leg with your foot. Named after Ricardo De La Riva, it's a staple of modern BJJ.",
    keyPoints: [
      "Hook deep behind the lead knee with your DLR hook",
      "Grip the far ankle or pant leg to prevent them from stepping away",
      "Keep your other foot on the hip or bicep for distance management",
      "Combine with collar grip for powerful sweeps and back takes",
    ],
  },
  {
    id: "spider-guard",
    categoryId: "guard",
    name: "Spider Guard",
    slug: "spider-guard",
    description:
      "A gi-based guard where you grip both sleeves and place your feet on your opponent's biceps, creating a web of control.",
    keyPoints: [
      "Maintain sleeve grips — losing a grip compromises the position",
      "Push and pull with your feet on the biceps to off-balance",
      "Use lasso variations to add extra control",
      "Works best combined with other open guards like De La Riva",
    ],
  },
  {
    id: "butterfly-guard",
    categoryId: "guard",
    name: "Butterfly Guard",
    slug: "butterfly-guard",
    description:
      "A seated guard with both feet hooked inside your opponent's thighs. Excellent for sweeps and transitions.",
    keyPoints: [
      "Stay upright with good posture — don't lean back",
      "Underhooks are essential for sweep leverage",
      "Elevate with your hooks while off-balancing with your upper body",
      "Great for transitioning to single leg X or X-guard",
    ],
  },
  {
    id: "x-guard",
    categoryId: "guard",
    name: "X-Guard",
    slug: "x-guard",
    description:
      "Your legs form an X-shape under your opponent, with one hook behind the knee and the other on the hip. Outstanding for off-balancing.",
    keyPoints: [
      "One foot hooks behind the far knee, the other pushes on the near hip",
      "Control an ankle or heel to prevent your opponent from stepping out",
      "Extend your legs to stretch and off-balance your opponent",
      "Transitions smoothly into single leg X and technical standup sweeps",
    ],
  },

  // ── Guard Passing ──────────────────────────────────────
  {
    id: "headquarters",
    categoryId: "guard-passing",
    name: "Headquarters Position",
    slug: "headquarters",
    description:
      "A strong passing posture where you stand with one knee up between your opponent's legs. The launching pad for many guard passes.",
    keyPoints: [
      "Keep your lead knee between their legs with good upright posture",
      "Control their hips or legs to prevent guard retention",
      "You can go left or right from here — it's a decision point",
      "Maintain strong frames to prevent them from pulling you into guard",
    ],
  },
  {
    id: "half-guard-top",
    categoryId: "guard-passing",
    name: "Half Guard Top",
    slug: "half-guard-top",
    description:
      "You're in your opponent's half guard, working to free your trapped leg and advance to side control or mount.",
    keyPoints: [
      "Get the crossface and underhook to flatten your opponent",
      "Drive your weight through them — make them carry you",
      "Work to free your knee by backstopping and slicing through",
      "Be aware of their underhook — don't let them get to their side",
    ],
  },
  {
    id: "standing-in-guard",
    categoryId: "guard-passing",
    name: "Standing in Guard",
    slug: "standing-in-guard",
    description:
      "You've stood up inside your opponent's closed guard. The first step to opening and passing the closed guard.",
    keyPoints: [
      "Stand with good posture — hips forward, hands controlling their hips",
      "Open the guard by pushing down on their hips or knee",
      "Once open, immediately start your passing sequence",
      "Watch for sweeps as you stand — they'll attack during the transition",
    ],
  },

  // ── Mount ──────────────────────────────────────────────
  {
    id: "full-mount-top",
    categoryId: "mount",
    name: "Full Mount",
    slug: "full-mount-top",
    description:
      "The classic dominant position. You're sitting on your opponent's torso with both knees on the mat, controlling them from above.",
    keyPoints: [
      "Keep your hips heavy and low — grapevine their legs if needed",
      "Climb high toward their head for better submissions",
      "When they turn to escape, be ready to take the back",
      "Use the threat of submissions to bait the escape and vice versa",
    ],
  },
  {
    id: "s-mount",
    categoryId: "mount",
    name: "S-Mount",
    slug: "s-mount",
    description:
      "A high mount variation where one leg threads over your opponent's shoulder. Creates devastating armbar and triangle setups.",
    keyPoints: [
      "Slide one knee up past their shoulder while sitting on their chest",
      "Your other leg posts out wide for base",
      "This position makes the armbar extremely high percentage",
      "Control their far arm to prevent the hitchhiker escape",
    ],
  },
  {
    id: "mount-bottom",
    categoryId: "mount",
    name: "Mount Escapes",
    slug: "mount-bottom",
    description:
      "You're trapped under mount. Focus on protecting your neck, framing, and executing escapes before your opponent attacks.",
    keyPoints: [
      "Keep your elbows tight to protect against arm attacks",
      "Frame against their hips — don't push on their chest",
      "Bridge explosively and time it with their weight shifts",
      "The shrimp (hip escape) is your primary tool to recover guard",
    ],
  },

  // ── Side Control ───────────────────────────────────────
  {
    id: "side-control-top",
    categoryId: "side-control",
    name: "Side Control Top",
    slug: "side-control-top",
    description:
      "You're pinning your opponent from the side with chest-to-chest pressure. A strong control position with many submission options.",
    keyPoints: [
      "Drive your shoulder into their jaw or chest for maximum pressure",
      "Control their near hip to prevent them from shrimping",
      "Switch between underhook, crossface, and knee-on-belly to stay dynamic",
      "Use the threat of mount to bait submissions, and vice versa",
    ],
  },
  {
    id: "knee-on-belly",
    categoryId: "side-control",
    name: "Knee on Belly",
    slug: "knee-on-belly",
    description:
      "A dominant pin with your knee driving into your opponent's midsection. Scores points in competition and opens up many attacks.",
    keyPoints: [
      "Drive your knee across their belly with your toes pointed",
      "Keep your other foot posted out wide for base",
      "Grab the far collar and near hip for maximum control",
      "Use their reactions to your pressure to set up submissions",
    ],
  },
  {
    id: "side-control-bottom",
    categoryId: "side-control",
    name: "Side Control Escapes",
    slug: "side-control-bottom",
    description:
      "You're pinned under side control. The priority is creating frames, making space, and recovering your guard.",
    keyPoints: [
      "Frame against their neck and hip — never let them settle",
      "Bridge and shrimp to create space for your knee to come through",
      "Get on your side facing them — never stay flat on your back",
      "The underhook escape to knees is your secondary option if guard recovery fails",
    ],
  },

  // ── Back Control ───────────────────────────────────────
  {
    id: "back-mount",
    categoryId: "back-control",
    name: "Back Mount",
    slug: "back-mount",
    description:
      "The most dominant position in BJJ. You're behind your opponent with hooks in (or body triangle), attacking the neck.",
    keyPoints: [
      "Establish seatbelt grip — one arm over the shoulder, one under the arm",
      "Get both hooks in or lock a body triangle for maximum control",
      "Stay chest-to-back — don't let space develop between you",
      "Attack the neck constantly to force defensive reactions you can exploit",
    ],
  },
  {
    id: "back-defense",
    categoryId: "back-control",
    name: "Back Defense & Escapes",
    slug: "back-defense",
    description:
      "Your opponent has your back. Protect your neck, fight their grips, and work to escape before they secure a choke.",
    keyPoints: [
      "Tuck your chin and protect your neck with two-on-one grip fighting",
      "Work to get your shoulders to the mat on the choking arm side",
      "Clear the hooks one at a time — start with the bottom hook",
      "Escape toward the side of their underhook, not away from it",
    ],
  },

  // ── Turtle ─────────────────────────────────────────────
  {
    id: "turtle-top",
    categoryId: "turtle",
    name: "Turtle Attacks",
    slug: "turtle-top",
    description:
      "Your opponent is turtled up. You're on top looking to take the back, attack the neck, or turn them over.",
    keyPoints: [
      "Establish the seatbelt grip first — control before submission",
      "Work to get your hooks in for full back control",
      "The clock choke is available if they defend the hooks",
      "Spiral ride and snap downs keep them from recovering guard",
    ],
  },
  {
    id: "turtle-bottom",
    categoryId: "turtle",
    name: "Turtle Defense",
    slug: "turtle-bottom",
    description:
      "You're turtled up on all fours. Protect your neck and work to recover guard or come up to a wrestling position.",
    keyPoints: [
      "Tuck your elbows and chin — protect the neck at all costs",
      "Stay tight and compact — don't let them insert hooks",
      "The sit-out and granby roll are your primary escape tools",
      "If they commit too much weight forward, roll them over you",
    ],
  },

  // ── Standing ───────────────────────────────────────────
  {
    id: "clinch",
    categoryId: "standing",
    name: "Clinch & Collar Ties",
    slug: "clinch",
    description:
      "Close-range standing positions where you're tied up with your opponent. The setup position for most takedowns and throws.",
    keyPoints: [
      "Control the head and inside position with collar ties",
      "Pummel for underhooks — inside position wins the clinch battle",
      "Level change to set up your shots for takedowns",
      "In the gi, collar and sleeve grips give you throwing options",
    ],
  },
  {
    id: "open-distance",
    categoryId: "standing",
    name: "Open Distance",
    slug: "open-distance",
    description:
      "Standing at range before engagement. Setting up your entries for takedowns, guard pulls, or outside trips.",
    keyPoints: [
      "Control the distance — don't let them crash in on their terms",
      "Use grip fighting to set up your preferred entries",
      "Level changes and feints create openings for your attacks",
      "Decide early: are you taking them down or pulling guard?",
    ],
  },
];
