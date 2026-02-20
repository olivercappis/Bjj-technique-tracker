import type { Technique } from "@/types";

export const techniques: Technique[] = [
  // ── Closed Guard (8) ─────────────────────────────────────

  {
    id: "cg-triangle-choke",
    positionId: "closed-guard",
    name: "Triangle Choke",
    slug: "triangle-choke-from-closed-guard",
    type: "submission",
    difficulty: "intermediate",
    description:
      "A blood choke applied by enclosing your opponent's head and one arm between your legs, forming a triangle shape. One of the highest-percentage submissions from closed guard, the triangle works by compressing the carotid arteries using the blade of your shin against one side of the neck and their own trapped shoulder against the other.",
    steps: [
      "Control one of your opponent's wrists and push it to the mat beside your hip, while pulling their opposite arm across your centerline using a collar or sleeve grip.",
      "Open your guard, place your foot on their hip on the controlled-wrist side, and shoot your opposite leg high over their shoulder and across the back of their neck.",
      "Lock your legs into a triangle by placing the ankle of your top leg into the pit of your bottom knee, squeezing your knees together.",
      "Adjust the angle by cutting at roughly 30 degrees to the side of the trapped arm, pulling their head down to tighten the choke.",
      "Squeeze your thighs together and lift your hips to finish the choke.",
    ],
    tips: [
      "The angle is everything. If you're directly in front of them, the choke is loose. Cut to the side of the trapped arm for maximum pressure.",
      "Pull the head down with both hands to break their posture before squeezing. A high-postured opponent is very hard to finish.",
      "If they stack you, underhook your own leg to maintain the triangle and consider transitioning to an omoplata.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-armbar",
    positionId: "closed-guard",
    name: "Armbar",
    slug: "armbar-from-closed-guard",
    type: "submission",
    difficulty: "beginner",
    description:
      "A fundamental joint lock that hyperextends the elbow. From closed guard, you isolate one arm, pivot your hips perpendicular to your opponent, and throw your leg over their head to control their posture while extending their arm against your hips.",
    steps: [
      "Break your opponent's posture by pulling them down with overhooks or collar grips. Control the target arm at the wrist with a two-on-one grip.",
      "Place your foot on their hip on the same side as the arm you're attacking, and swing your other leg high across their back.",
      "Pivot your hips out to a perpendicular angle, bringing your leg over their head and clamping down on it.",
      "Pinch your knees tightly together around their upper arm, keep their thumb pointing toward the ceiling, and extend your hips upward to finish the lock.",
    ],
    tips: [
      "Keep their arm tight to your chest throughout the technique. If space develops between your body and their arm, they'll pull it free.",
      "The hip pivot is the most critical step. If your hips stay square with theirs, you won't get the angle needed and they'll posture up.",
      "Squeeze your knees together before extending. Loose knees let them slip the arm out or stack you.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-kimura",
    positionId: "closed-guard",
    name: "Kimura",
    slug: "kimura-from-closed-guard",
    type: "submission",
    difficulty: "beginner",
    description:
      "A double wristlock that attacks the shoulder by rotating the arm behind the opponent's back. From closed guard, you grip their wrist and figure-four your arms, then use your entire body to torque the shoulder joint.",
    steps: [
      "When your opponent posts a hand on the mat, grab their wrist with your same-side hand and sit up toward them.",
      "Reach your other arm over the top of their arm and grip your own wrist, forming a figure-four lock.",
      "Fall back to the mat, keeping a tight squeeze on their arm and maintaining your closed guard to prevent them from rolling out.",
      "Slide their wrist toward their back in a paint-brush motion while keeping their elbow pinned to your chest, applying pressure to the shoulder.",
    ],
    tips: [
      "Keep your elbow clamp tight against your ribs. If their elbow floats away from your body, they can straighten the arm and escape.",
      "If they grab their own belt or shorts to defend, use the kimura grip to sweep them by bridging toward the trapped arm side.",
      "Hip out slightly to the side of the attack for better leverage on the rotation.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-guillotine",
    positionId: "closed-guard",
    name: "Guillotine Choke",
    slug: "guillotine-from-closed-guard",
    type: "submission",
    difficulty: "beginner",
    description:
      "A front headlock choke applied when your opponent dives their head below your chin. You wrap around their neck with your arm, grip your hands together, and arch your back to compress the trachea or carotid arteries.",
    steps: [
      "When your opponent drops their head — often while attempting a pass or a takedown — wrap your arm around their neck, placing the blade of your wrist against their throat.",
      "Clasp your hands together in a palm-to-palm or chin-strap grip, ensuring the choking arm's wrist is snug under their chin.",
      "Close your guard high around their back to prevent them from posturing up or passing to the side.",
      "Arch your back, pull your elbows to your ribs, and crunch upward while squeezing to finish the choke.",
    ],
    tips: [
      "Get your hips as high as possible under their chest. Walking your guard up toward their armpits dramatically increases finishing pressure.",
      "If they try to pass to the side of the choking arm, switch to a high-elbow (Marcelotine) variation by flaring your elbow upward.",
      "Don't just squeeze with your arms. The power comes from your full-body crunch and hip lift working together.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-hip-bump-sweep",
    positionId: "closed-guard",
    name: "Hip Bump Sweep",
    slug: "hip-bump-sweep",
    type: "sweep",
    difficulty: "beginner",
    description:
      "A powerful sweep that capitalizes on your opponent sitting upright in your closed guard. You sit up explosively, bump them with your hip, and drive them over to end in mount.",
    steps: [
      "Wait for your opponent to sit up or posture tall in your closed guard. Release any grips pulling them down.",
      "Open your guard, post one hand behind you on the mat, and explosively sit up toward your opponent at an angle.",
      "Bump your hip into their midsection on the side of your posting hand, using your free arm to overhook their same-side arm.",
      "Drive through them using your hips and posting hand, sweeping them over and following into the mount position.",
    ],
    tips: [
      "Timing is crucial. Execute the sweep the instant they sit up or try to create distance — that's when they're lightest.",
      "If they post their hand to block the sweep, their arm is extended and exposed. Immediately transition to a kimura or guillotine.",
      "The power comes from your hip thrust, not your arms. Explode with your hips and the sweep almost does itself.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-scissor-sweep",
    positionId: "closed-guard",
    name: "Scissor Sweep",
    slug: "scissor-sweep",
    type: "sweep",
    difficulty: "beginner",
    description:
      "A classic closed guard sweep where you use your legs like scissors to topple your opponent sideways. One knee shields across their chest while the other leg chops low at their knee, sweeping them over.",
    steps: [
      "From closed guard, secure a cross-collar grip and a same-side sleeve grip. Open your guard and hip out to create an angle.",
      "Bring your top knee across their chest as a shield, placing your shin horizontally across their torso.",
      "Your bottom leg extends low, hooking behind their knee or calf.",
      "Simultaneously pull with your grips, push with your knee shield, and chop your bottom leg backward to sweep them sideways. Follow them over into mount.",
    ],
    tips: [
      "You must break their posture first. The sweep is nearly impossible if they're sitting up tall with good base.",
      "The scissoring motion must be simultaneous — top leg pushes, bottom leg chops. If you do them separately, they'll base out.",
      "Grip their sleeve tightly to prevent them from posting a hand to stop the sweep.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-flower-sweep",
    positionId: "closed-guard",
    name: "Flower Sweep",
    slug: "flower-sweep",
    type: "sweep",
    difficulty: "beginner",
    description:
      "Also called the pendulum sweep. You swing your leg wide like a pendulum to generate momentum, sweeping your opponent over your body. An excellent sweep when they posture low.",
    steps: [
      "From closed guard, grip their same-side sleeve at the wrist and grab their same-side pant leg near the knee with your other hand.",
      "Open your guard and swing your leg on the sleeve-grip side out wide and high, generating a big pendulum arc.",
      "As your pendulum leg reaches its peak, sweep it across and over, pulling their sleeve and lifting their knee simultaneously to tip them over.",
      "Follow the sweep and come up into mount, keeping the sleeve grip to prevent them from recovering.",
    ],
    tips: [
      "The wider and higher you swing your pendulum leg, the more momentum you generate. Don't cut the arc short.",
      "Pull their sleeve toward your hip pocket to prevent them from posting. Without a post, they topple easily.",
      "Time the sweep when their weight is shifted forward. If they're sitting back, it's much harder to generate the needed momentum.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cg-open-guard-transition",
    positionId: "closed-guard",
    name: "Transition to Open Guard",
    slug: "transition-to-open-guard",
    type: "transition",
    difficulty: "beginner",
    description:
      "When your opponent stands up in your closed guard, you transition to an open guard such as De La Riva, spider, or collar-sleeve. This is a critical skill because holding closed guard against a standing opponent drains energy and exposes you to guard breaks.",
    steps: [
      "As your opponent stands, uncross your ankles and place both feet on their hips to maintain distance and control.",
      "Immediately establish strong grips — collar and sleeve in the gi, or wrist and collar tie in no-gi.",
      "Lower your legs into your preferred open guard: hook one foot behind their knee for DLR, place feet on biceps for spider, or hook inside thighs for butterfly.",
      "Stay active with your feet and grips to prevent them from establishing a passing position.",
    ],
    tips: [
      "Don't wait until they fully stand and break your guard. Begin transitioning as soon as you feel them posting a foot to stand.",
      "Keep your hips off the mat and active. Flat hips in open guard are an invitation to get passed.",
      "Have a plan before you open. Know which open guard you want and go there with purpose rather than just letting your guard get broken.",
    ],
    tags: ["gi", "no-gi"],
  },

  // ── Half Guard (6) ───────────────────────────────────────

  {
    id: "hg-kimura",
    positionId: "half-guard",
    name: "Kimura",
    slug: "kimura-from-half-guard",
    type: "submission",
    difficulty: "intermediate",
    description:
      "The kimura from half guard bottom is a versatile attack and sweep tool. When your opponent bases with a hand on the mat, you lock up the figure-four on their wrist and use it to either submit or sweep them.",
    steps: [
      "From half guard bottom, block their crossface with your nearside frame and wait for them to post their hand on the mat.",
      "Sit up on your elbow, grab their wrist with your nearside hand, and thread your far arm over the top of their arm to grip your own wrist.",
      "Fall back to the mat with the figure-four locked tight, keeping your elbow clamped to your body.",
      "To finish, slide their wrist toward their back while keeping their elbow pinned. If they resist, use the grip to sweep them toward the kimura side.",
    ],
    tips: [
      "The kimura from half guard works best as a sweep-submission combo. If they resist the sub, sweep. If they resist the sweep, submit.",
      "Keep your half guard tight throughout. If they free their leg during the attack, they can pass and you lose the position.",
      "If they grab their own shorts or belt to defend, bridge into them to break the grip or transition to a sweep.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hg-old-school-sweep",
    positionId: "half-guard",
    name: "Old School Sweep",
    slug: "old-school-sweep",
    type: "sweep",
    difficulty: "intermediate",
    description:
      "A fundamental half guard sweep popularized by Roberto 'Gordo' Correa. You get deep under your opponent with an underhook, grab their far leg, and sweep them over your body to come up on top.",
    steps: [
      "From half guard bottom, get on your side and fight for the underhook on the same side as your trapped leg.",
      "Dive deep under your opponent with the underhook, getting your head to their far hip.",
      "Reach your free hand around their body to grab their far thigh or knee.",
      "Bridge into them while lifting their far leg, sweeping them over you. Come up on top into half guard top or side control.",
    ],
    tips: [
      "You must get deep underneath them. If you stay shallow, you won't have the leverage to sweep and they'll crossface you back down.",
      "The underhook is your lifeline. If they pummel it out and get the crossface, re-pummel immediately before attempting the sweep.",
      "Time your bridge with the leg lift. Both actions together create the off-balancing force you need.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hg-deep-half-entry",
    positionId: "half-guard",
    name: "Deep Half Entry",
    slug: "deep-half-entry",
    type: "transition",
    difficulty: "advanced",
    description:
      "Transitioning from standard half guard to deep half guard, where you get completely under your opponent with your head near their hip. Deep half provides powerful sweep options and is very difficult to pass when played correctly.",
    steps: [
      "From half guard bottom with a knee shield, frame against their neck and hip to prevent them from pressuring forward.",
      "Drop your knee shield and dive underneath them, threading your body between their legs so your head emerges near their far hip.",
      "Wrap their trapped leg with both arms, hugging it tight to your chest. Your body should be perpendicular underneath them.",
      "Establish your position by keeping their weight loaded on top of you, with your hips bridged up to prevent them from flattening you.",
    ],
    tips: [
      "Timing the entry is everything. Go for it when they pressure forward into your knee shield — use their momentum to slide underneath.",
      "Hug the leg tight like you're holding a teddy bear. If they can free the leg, you're in a terrible position underneath them.",
      "Keep your inside shoulder elevated so you're on your side, not flat on your back under them.",
    ],
    tags: ["gi", "no-gi"],
  },
  {
    id: "hg-lockdown-electric-chair",
    positionId: "half-guard",
    name: "Lockdown to Electric Chair",
    slug: "lockdown-to-electric-chair",
    type: "sweep",
    difficulty: "advanced",
    description:
      "The lockdown is a half guard control where you figure-four your legs around their trapped leg and stretch it out. From there, you transition to the electric chair sweep by reaching under their far leg and lifting, splitting them to sweep.",
    steps: [
      "From half guard bottom, lock down their trapped leg by triangling your legs around it and pushing your feet outward to stretch their leg back (the lockdown).",
      "Whip your body up (the 'whip up'), using the lockdown's stretch to create space to get the underhook.",
      "Reach your underhook hand deep and thread it under their far leg, grabbing behind their knee or thigh.",
      "Release the lockdown, sweep them toward the electric chair side by lifting their far leg while driving your body upward. Come up on top in an open position.",
    ],
    tips: [
      "The whip-up motion is essential. Without it, you can't get deep enough for the underhook. Stretch them with the lockdown, then whip your body up using that stored energy.",
      "If you can't reach the far leg, use a series of whip-ups to gradually work deeper under them.",
      "Be careful with the electric chair stretch — it puts significant pressure on their groin and hip. Apply gradually in training.",
    ],
    tags: ["no-gi", "competition"],
  },
  {
    id: "hg-underhook-dogfight",
    positionId: "half-guard",
    name: "Underhook Escape to Dog Fight",
    slug: "underhook-escape-to-dog-fight",
    type: "escape",
    difficulty: "intermediate",
    description:
      "The dog fight is a 50/50 scramble position where both you and your opponent are on your knees with competing underhooks. Getting there from half guard bottom via the underhook is one of the most reliable ways to improve your position.",
    steps: [
      "From half guard bottom, get on your side and fight for the underhook. Use your knee shield to create the space you need to pummel inside.",
      "Once you have the underhook, drive your head into their chest and start coming up to your knees.",
      "Keep your half guard locked until you're upright, then release it as you rise into the dog fight position — both players on their knees with competing underhooks.",
      "From dog fight, look to take the back by circling behind them, or complete a takedown by running the pipe (driving forward with the underhook).",
    ],
    tips: [
      "The underhook must be deep — your hand should reach their far shoulder blade. A shallow underhook gets easily pummeled out.",
      "Drive your head into the center of their chest or under their chin as you rise. If your head is on the outside, they'll crossface you back down.",
      "Don't release your half guard too early. Keep it locked until you're at least on your knees and stable.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hg-back-take",
    positionId: "half-guard",
    name: "Back Take from Half Guard",
    slug: "back-take-from-half-guard",
    type: "transition",
    difficulty: "advanced",
    description:
      "A powerful transition where you use the underhook from half guard bottom to circle behind your opponent and take their back. This is one of the highest-value transitions in half guard, going from a defensive position directly to the most dominant one.",
    steps: [
      "From half guard bottom, secure a deep underhook and come up to the dog fight position on your knees.",
      "Use your underhook to start circling toward their back, keeping your head tight against their body.",
      "As you clear their hip, throw your top hook (leg) over their far hip and insert it between their legs.",
      "Establish the seatbelt grip (one arm over the shoulder, one under the arm), insert your second hook, and settle into back control.",
    ],
    tips: [
      "Speed and commitment are key during the transition. If you hesitate in the dog fight, they'll re-pummel and shut down the back take.",
      "Control their far wrist or elbow as you circle to prevent them from turning into you.",
      "Get the seatbelt before worrying about the hooks. The grip is your anchor; hooks come second.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── De La Riva Guard (4) ─────────────────────────────────

  {
    id: "dlr-berimbolo",
    positionId: "de-la-riva",
    name: "Berimbolo",
    slug: "berimbolo",
    type: "sweep",
    difficulty: "advanced",
    description:
      "A modern BJJ technique made famous by the Mendes Brothers and the Miyao Brothers. The berimbolo is an inversion from De La Riva guard that allows you to spin underneath your opponent and come up behind them to take the back. It's become a defining move of modern sport BJJ.",
    steps: [
      "From DLR guard, grip their far collar or belt and control their near ankle with your other hand.",
      "Pull them forward to load their weight over you while inverting your body, tucking your shoulder and rolling onto the back of your neck.",
      "As you invert, your DLR hook stays connected. Use it to pull their leg through as you spin underneath them.",
      "Complete the rotation until you're behind them. Establish your seatbelt grip and insert hooks for back control.",
      "If they turtle during the spin, follow them and secure back mount from there.",
    ],
    tips: [
      "The inversion should feel smooth, not forced. If you're straining to flip over, you likely don't have their weight loaded far enough forward.",
      "Maintain your DLR hook throughout the entire spin. Losing the hook mid-rotation is the number one reason this technique fails.",
      "Drill this move extensively before attempting it live. The coordination between the grip pull, inversion, and hook maintenance takes significant repetition.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "dlr-sweep",
    positionId: "de-la-riva",
    name: "DLR Sweep",
    slug: "dlr-sweep",
    type: "sweep",
    difficulty: "intermediate",
    description:
      "The basic De La Riva sweep, also called the tripod or hook sweep. You use your DLR hook to elevate and off-balance your standing opponent while pulling their far ankle, toppling them backward so you can come up on top.",
    steps: [
      "Establish DLR guard with your hook deep behind their lead knee. Grip their far ankle or pants with one hand and their near sleeve or collar with the other.",
      "Place your non-DLR foot on their far hip, creating a frame to control their distance.",
      "Extend your DLR hook while pulling their far ankle toward you and pushing their hip with your foot.",
      "As they fall backward, follow them up immediately, keeping control of their legs to pass or establish top position.",
    ],
    tips: [
      "Pulling the far ankle is essential. Without it, they simply step that foot back and rebase.",
      "The sweep works best when you coordinate all three actions simultaneously: extend the hook, push the hip, pull the ankle.",
      "If they resist the backward sweep, switch to a collar drag or berimbolo going the other direction.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "dlr-ankle-pick",
    positionId: "de-la-riva",
    name: "Ankle Pick from DLR",
    slug: "ankle-pick-from-dlr",
    type: "sweep",
    difficulty: "intermediate",
    description:
      "A sneaky sweep where you remove your DLR hook to kick their lead knee forward while grabbing their far ankle, collapsing their base and sweeping them to the mat.",
    steps: [
      "From DLR guard, establish grips on their far ankle and their near collar or sleeve.",
      "Remove your DLR hook and quickly place your foot on their lead knee, pushing it forward to break their stance.",
      "Simultaneously pull their far ankle toward you, taking away their ability to step back and rebase.",
      "As they collapse, come up on top immediately and establish a passing position.",
    ],
    tips: [
      "The timing of the kick to the knee and the ankle pull must be simultaneous. If there's a gap, they'll recover their balance.",
      "Grip the ankle low, near the heel, for maximum leverage. A grip too high on the calf doesn't give you enough pull.",
      "This works best as a second-attack option after they defend your primary DLR sweep.",
    ],
    tags: ["gi", "no-gi"],
  },
  {
    id: "dlr-to-xguard",
    positionId: "de-la-riva",
    name: "Transition to X-Guard",
    slug: "dlr-transition-to-x-guard",
    type: "transition",
    difficulty: "intermediate",
    description:
      "A smooth transition from De La Riva guard to X-guard. When your opponent defends your DLR sweeps by squaring up their stance, you thread your legs into the X-guard configuration underneath them for powerful new sweeping options.",
    steps: [
      "From DLR guard, pull your opponent's weight forward over you using your collar and ankle grips.",
      "Shoot your non-DLR leg between their legs and place that foot on their far hip.",
      "Thread your DLR hook deeper, converting it from behind the knee to a hook on the inside of their far thigh.",
      "You should now have an X-shape under them — one foot on the near hip, one hooking the far leg. Control their ankle with your hands and begin your X-guard attacks.",
    ],
    tips: [
      "You need to get your hips directly underneath theirs for a proper X-guard. If you're off to the side, it becomes a weaker variation.",
      "Keep at least one ankle grip at all times during the transition. Losing foot control means they can step out and pass.",
      "This transition is easiest when they try to square up to defend your DLR hooks. Use their movement to slide into position.",
    ],
    tags: ["gi", "no-gi"],
  },

  // ── Spider Guard (3) ─────────────────────────────────────

  {
    id: "sg-triangle",
    positionId: "spider-guard",
    name: "Triangle from Spider Guard",
    slug: "triangle-from-spider-guard",
    type: "submission",
    difficulty: "intermediate",
    description:
      "A triangle choke set up from spider guard by releasing one sleeve grip and pulling the opponent into the triangle. Spider guard's extended arm control makes it ideal for creating the asymmetry needed for a triangle entry.",
    steps: [
      "From spider guard with both feet on their biceps and both sleeve grips, release one foot from their bicep and plant it on their hip.",
      "Pull hard on the sleeve of the arm that still has your foot on the bicep, extending that arm away from their body.",
      "Release your hip-side foot and shoot that leg up and over their shoulder on the side where their arm is extended, locking your legs into a triangle.",
      "Pull their head down, adjust the angle, and squeeze to finish the triangle choke.",
    ],
    tips: [
      "Extend one arm far to the side first — this creates the arm-in, arm-out asymmetry you need for the triangle.",
      "Use your foot on their bicep to push them away and create the space needed to shoot your leg over their shoulder.",
      "If they posture up to defend, use both sleeve grips to pull them back down before attempting the triangle.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "sg-overhead-sweep",
    positionId: "spider-guard",
    name: "Overhead Sweep",
    slug: "overhead-sweep-from-spider",
    type: "sweep",
    difficulty: "intermediate",
    description:
      "A dynamic sweep from spider guard where you load your opponent's weight forward and use your feet on their biceps to launch them overhead. They land on their back behind you, and you follow them over into top position.",
    steps: [
      "From spider guard, grip both sleeves tightly and have both feet on their biceps.",
      "Pull them forward with your grips while extending your legs to load their weight over you.",
      "When their weight is committed forward, tuck your knees toward your chest and then explosively extend your legs upward and over your head.",
      "Guide them over with your sleeve grips as they fly overhead. Release at the right moment and come up on top.",
    ],
    tips: [
      "You must load their weight first. If you try to launch them when they're sitting back, nothing will happen.",
      "The sweep works best when they're driving forward into you. Use their forward pressure against them.",
      "Keep your sleeve grips tight throughout. Losing a grip mid-sweep means they can post and stop the momentum.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "sg-omoplata-setup",
    positionId: "spider-guard",
    name: "Omoplata Setup",
    slug: "omoplata-from-spider-guard",
    type: "submission",
    difficulty: "advanced",
    description:
      "An omoplata shoulder lock initiated from spider guard. By threading your leg over one of their arms and pivoting your body, you can trap their shoulder and apply a devastating rotational lock.",
    steps: [
      "From spider guard, clear one foot from their bicep to their hip. Maintain the sleeve grip on that side and keep your other foot on their far bicep.",
      "Using the sleeve grip, pull their arm across your body while swinging your hip-side leg up and over their shoulder, draping it across the back of their neck.",
      "Pivot your body perpendicular to theirs, sitting up and trapping their arm between your legs with your thigh over their shoulder blade.",
      "Control their hips to prevent the forward roll escape, then lean forward to apply pressure on their shoulder for the submission.",
    ],
    tips: [
      "The key to the omoplata from spider guard is clearing the arm across your centerline. If their arm stays on its own side, you can't get the angle.",
      "Once you have the omoplata position, control their far hip immediately. The most common escape is the forward roll, and hip control prevents it.",
      "If they resist the submission, use the omoplata as a sweep by driving forward and coming up on top.",
    ],
    tags: ["gi", "competition"],
  },

  // ── Butterfly Guard (4) ──────────────────────────────────

  {
    id: "bg-butterfly-sweep",
    positionId: "butterfly-guard",
    name: "Butterfly Sweep",
    slug: "butterfly-sweep",
    type: "sweep",
    difficulty: "beginner",
    description:
      "The most fundamental butterfly guard sweep. You use an underhook and your butterfly hook to elevate your opponent, then fall to the side to sweep them over. Simple, effective, and works at every level of the sport.",
    steps: [
      "From seated butterfly guard, get an underhook on one side and control their opposite arm at the elbow or wrist.",
      "Scoot your hips in close so your hook (foot on the underhook side) is deep between their legs.",
      "Off-balance them toward the underhook side by driving your head into their chest and pulling with your grips.",
      "Fall to the side opposite your underhook while elevating with your butterfly hook, sweeping them over your body. Come up on top into mount or half guard.",
    ],
    tips: [
      "You must be sitting upright and close to them. If you're leaning back or have too much distance, the sweep has no power.",
      "The underhook side and the elevating hook should be on the same side. This is the most common mistake beginners make.",
      "Don't just fall sideways — the sweep is a combination of the off-balance, the hook elevation, and falling to the side all at once.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bg-guillotine",
    positionId: "butterfly-guard",
    name: "Guillotine from Butterfly",
    slug: "guillotine-from-butterfly",
    type: "submission",
    difficulty: "intermediate",
    description:
      "The butterfly guard is one of the best positions to catch a guillotine choke because your opponent often ducks their head when trying to pass or when defending your sweep attempts. The seated position gives excellent finishing leverage.",
    steps: [
      "From butterfly guard, when your opponent drops their head (often in reaction to your sweep attempts), wrap your arm around their neck with the blade of your wrist against their throat.",
      "Clasp your hands together using a palm-to-palm grip or a chin-strap grip.",
      "Fall to your back while closing your guard, pulling them into you.",
      "Arch your back and squeeze, pulling your elbows toward your ribs while crunching upward to finish the choke.",
    ],
    tips: [
      "The guillotine and butterfly sweep work together beautifully. Threaten the sweep; when they duck the head to counter, catch the neck.",
      "Get your choking wrist deep under their chin before closing your guard. Once the guard is closed with a shallow grip, it's hard to readjust.",
      "Keep your hooks active even during the submission attempt. Your butterfly hooks can prevent them from passing to the side to escape.",
    ],
    tags: ["no-gi", "competition"],
  },
  {
    id: "bg-arm-drag-back-take",
    positionId: "butterfly-guard",
    name: "Arm Drag to Back Take",
    slug: "arm-drag-to-back-take-butterfly",
    type: "transition",
    difficulty: "intermediate",
    description:
      "A fast, explosive technique from butterfly guard where you drag your opponent's arm across your body, clearing a path to their back. The arm drag is one of the most effective ways to take the back from a seated guard position.",
    steps: [
      "From butterfly guard, grip their wrist with one hand and their tricep just above the elbow with your other hand.",
      "Explosively pull their arm across your body, dragging it past your hip while you simultaneously scoot your hips in the opposite direction, toward their back.",
      "As their arm clears, reach around their back and grab their far lat or belt to start securing back control.",
      "Insert your hooks one at a time, establish the seatbelt grip, and settle into full back control.",
    ],
    tips: [
      "The arm drag only works if you move your body, not just their arm. You need to scoot laterally as you pull their arm.",
      "Speed is more important than power here. A fast, snappy arm drag beats a slow, powerful one every time.",
      "If they turn to face you before you get the back, you can still often secure a single leg or go back to butterfly with a new angle.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bg-elevator-sweep",
    positionId: "butterfly-guard",
    name: "Elevator Sweep",
    slug: "elevator-sweep",
    type: "sweep",
    difficulty: "beginner",
    description:
      "A variation of the butterfly sweep where you hook one of your opponent's legs from the outside and elevate them over you. It's effective when they base wide to defend the standard butterfly sweep.",
    steps: [
      "From butterfly guard, when your opponent bases wide to resist the standard butterfly sweep, hook your foot under their thigh from the outside.",
      "Secure an overhook or underhook on the same side as your hook to control their upper body.",
      "Fall to the opposite side of your hook while elevating their leg with your foot, launching them over your body.",
      "Follow the momentum and come up on top, establishing your passing position or settling into mount.",
    ],
    tips: [
      "The elevator hook works best from the outside of their thigh, scooping under it. Think of your foot as a shelf lifting them up.",
      "If they post wide, the elevator sweep catches them at a wider angle than the standard butterfly sweep — use it as a counter to their wide base.",
      "Coordinate your upper body grips with the leg elevation. Pulling with your arms while elevating with your hook makes the sweep twice as powerful.",
    ],
    tags: ["gi", "no-gi"],
  },

  // ── X-Guard (3) ──────────────────────────────────────────

  {
    id: "xg-technical-standup-sweep",
    positionId: "x-guard",
    name: "Technical Standup Sweep",
    slug: "technical-standup-sweep-x-guard",
    type: "sweep",
    difficulty: "intermediate",
    description:
      "The bread-and-butter X-guard sweep. You off-balance your opponent with your X-guard hooks, then perform a technical standup while controlling their ankle, ending up on your feet with them on the ground.",
    steps: [
      "From X-guard, control one of their ankles with both hands. Your hooks should have their weight fully loaded on your legs.",
      "Extend your legs to stretch them out and off-balance them backward.",
      "While they're off-balance, remove your hooks, keep the ankle grip, and perform a technical standup — posting your free hand behind you and standing up to your feet.",
      "Once standing, you control their ankle and can pass, take them down, or move to a leg lock position.",
    ],
    tips: [
      "Fully extend your legs before standing up. If you try to stand while they still have their balance, they'll just push you back down.",
      "Keep the ankle grip tight throughout the standup. That ankle is your control point — without it, they simply recover their base.",
      "Practice the technical standup independently. A smooth, fast standup is essential for this sweep to work against resisting opponents.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "xg-ankle-lock-entry",
    positionId: "x-guard",
    name: "Ankle Lock Entry",
    slug: "ankle-lock-entry-from-x-guard",
    type: "submission",
    difficulty: "intermediate",
    description:
      "Transitioning from X-guard to a straight ankle lock (Achilles lock). X-guard naturally gives you access to your opponent's feet and ankles, making it an excellent launching point for leg lock attacks.",
    steps: [
      "From X-guard, control their near ankle and clear your hooks by extending your legs to off-balance them.",
      "Bring the controlled ankle to your chest, wrapping your arm around the Achilles tendon with the blade of your wrist against the tendon.",
      "Bring your legs into the ashi garami (single leg X / outside ashi) position for control, with your inside foot on their hip and outside leg over their far thigh.",
      "Arch your back, squeeze your knees together, and drive your hips forward while pulling the ankle to your chest to finish the lock.",
    ],
    tips: [
      "The ankle lock grip should be high on the ankle with the blade of your wrist on the Achilles. Too low (on the foot) and it becomes a crank rather than a lock.",
      "Pinch your knees to trap their leg. Without the leg control, they can simply pull the foot free.",
      "This entry is most effective when they defend your X-guard sweeps by trying to step back. Their retreating motion feeds the ankle right to you.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "xg-single-leg-x-transition",
    positionId: "x-guard",
    name: "Transition to Single Leg X",
    slug: "transition-to-single-leg-x",
    type: "transition",
    difficulty: "intermediate",
    description:
      "Transitioning from full X-guard to single leg X (ashi garami). Single leg X offers a different set of sweeps and leg lock entries, and switching between the two guards keeps your opponent guessing.",
    steps: [
      "From X-guard, release the hook that is on their far hip and bring that foot to the outside of their near leg.",
      "Keep your other hook behind their knee. Your inside foot stays on their hip as a frame.",
      "Clamp your outside leg over the top of their thigh, pinching your knees together to trap the leg.",
      "Control their ankle or heel with your hands. You're now in single leg X with a range of sweeps and leg lock entries available.",
    ],
    tips: [
      "The transition should be quick. If you slowly remove your far hook, they'll feel the opening and try to pass or disengage.",
      "Pinch your knees tight on their leg immediately after transitioning. Loose knees in single leg X means they pull the leg free easily.",
      "Use this transition when they start to defend your X-guard sweeps by widening their base. The shift to single leg X attacks a different angle.",
    ],
    tags: ["gi", "no-gi"],
  },

  // ── Headquarters (3) ────────────────────────────────────

  {
    id: "hq-knee-slice",
    positionId: "headquarters",
    name: "Knee Slice Pass",
    slug: "knee-slice-pass",
    type: "pass",
    difficulty: "intermediate",
    description:
      "The most popular guard pass in modern BJJ. From headquarters, you slice your knee across your opponent's thigh, pinning their bottom leg while driving your chest forward to complete the pass to side control.",
    steps: [
      "From headquarters, establish grips: cross-face with one hand (or collar grip in gi) and control their far knee or hip with the other.",
      "Angle your lead knee so it slides diagonally across their thigh, with your shin blocking their bottom leg from recovering guard.",
      "Drive your weight forward through the crossface, flattening their upper body while your knee slices across.",
      "Clear their legs, driving your hips to the mat on the far side, and settle into side control.",
    ],
    tips: [
      "The crossface is non-negotiable. Without it, they'll frame against your neck and re-guard before you can finish the pass.",
      "Don't lift your knee during the slice — keep it heavy on their thigh. Lifting creates space for their knee shield to come back in.",
      "Anticipate the underhook battle. They will fight for the underhook on the passing side. Use your crossface pressure to flatten them and deny it.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hq-long-step",
    positionId: "headquarters",
    name: "Long Step Pass",
    slug: "long-step-pass",
    type: "pass",
    difficulty: "intermediate",
    description:
      "A fluid passing option from headquarters where you take a long step over your opponent's bottom leg, essentially stepping around their guard to achieve side control. Particularly effective when the knee slice is being well defended.",
    steps: [
      "From headquarters, control their top knee with your hand, pinning it to the mat or pushing it across their body.",
      "Take a big step with your back leg over and past their bottom leg, landing it on the far side of their body.",
      "As you step, drive your hips low and forward, sliding past their guard. Your chest should pressure down onto them.",
      "Settle your hips to the mat, establish the crossface, and consolidate side control.",
    ],
    tips: [
      "The step must be long and committed. A short step leaves you in a half guard or quarter guard situation where they can still recover.",
      "Pin their top knee to prevent them from creating a new frame or knee shield as you step around.",
      "This pass pairs perfectly with the knee slice. If they defend the knee slice by framing, go long step. If they defend the long step by extending, go knee slice.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hq-leg-drag",
    positionId: "headquarters",
    name: "Leg Drag",
    slug: "leg-drag",
    type: "pass",
    difficulty: "intermediate",
    description:
      "A powerful pass where you drag your opponent's leg across their body, pinning it to the mat with your hip while you pass to the back or side control. The leg drag neutralizes the guard by controlling the hips.",
    steps: [
      "From headquarters, grip the bottom of their pants at the ankle or cup their heel. Control their other leg at the knee.",
      "Pull their leg across your body, dragging it past your hip so their knee crosses their centerline.",
      "Drop your near hip onto their dragged leg, pinning it to the mat. Establish a crossface or grab their far collar.",
      "Slide into side control or circle to the back, keeping their leg pinned under your hip throughout.",
    ],
    tips: [
      "Your hip pressure on their dragged leg is what makes this pass work. If you lift your hip, they'll recover their leg and guard.",
      "The angle should put you slightly behind them. A good leg drag almost gives you a back-take angle, which is why it's so dangerous.",
      "In no-gi, you can cup the heel or grip behind the knee instead of gripping the pants. The mechanics remain the same.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Half Guard Top (3) ──────────────────────────────────

  {
    id: "hgt-knee-cut",
    positionId: "half-guard-top",
    name: "Knee Cut Through",
    slug: "knee-cut-through",
    type: "pass",
    difficulty: "beginner",
    description:
      "The fundamental half guard pass. You use crossface pressure to flatten your opponent while cutting your trapped knee through their legs to free it and advance to side control.",
    steps: [
      "Establish the crossface by driving your shoulder into their jaw, and secure an underhook on the other side.",
      "Flatten your opponent onto their back using your shoulder pressure. They should be looking away from you.",
      "Backstep your trapped leg slightly to create an angle, then drive your knee across their thigh, cutting through their half guard.",
      "Free your leg completely and slide into side control, maintaining heavy crossface pressure throughout.",
    ],
    tips: [
      "Flatten them first, pass second. Trying to cut your knee through while they're on their side is exponentially harder.",
      "Use your underhook to control their far hip, preventing them from shrimping away as you cut through.",
      "If they lock down on your leg, backstep and windshield-wiper your foot to strip the lockdown before attempting the cut.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hgt-underhook-pass",
    positionId: "half-guard-top",
    name: "Underhook Pass to Mount",
    slug: "underhook-pass-to-mount",
    type: "pass",
    difficulty: "intermediate",
    description:
      "Instead of passing to side control, you use the underhook and crossface from half guard top to pass directly to mount. By stapling their leg and stepping over, you skip side control entirely.",
    steps: [
      "From half guard top, establish the crossface and underhook, flattening your opponent.",
      "Free your trapped leg by cutting through their half guard as in the standard knee cut.",
      "Instead of going to side control, immediately swing your free leg over their body to the other side.",
      "Settle into mount, keeping your weight heavy and your hips low. Grapevine if needed to secure the position.",
    ],
    tips: [
      "The transition from passing to mounting must be fast. If you settle into side control first and then try to mount, they'll frame and defend.",
      "Keep the crossface active through the entire transition. The moment you release head control, they'll turn and recover.",
      "Going directly to mount is worth the extra effort because mount scores more points and offers better submissions in competition.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "hgt-darce",
    positionId: "half-guard-top",
    name: "D'Arce Choke Setup",
    slug: "darce-choke-from-half-guard-top",
    type: "submission",
    difficulty: "advanced",
    description:
      "The D'Arce (or Brabo) choke from half guard top. When your opponent tries to underhook you from half guard bottom, you thread your arm under their neck and lock up a no-arm triangle using your arms. It's a devastating counter to the underhook.",
    steps: [
      "When your opponent gets the underhook from half guard bottom, overhook their arm and drive your choking arm under their chin, threading it through the space between their neck and their underhooking arm.",
      "Feed your choking hand through until you can grab your own bicep on the other side, forming a figure-four around their head and arm.",
      "Sprawl your legs back to apply downward pressure and tighten the choke.",
      "Squeeze your elbows together and drive your shoulder into them to finish. Walk your hips toward their head if needed for extra pressure.",
    ],
    tips: [
      "The D'Arce is a counter to the underhook. When you feel them pummel for the underhook, that's your cue to thread the choke.",
      "Get your arm deep. The most common failure point is not threading the choking arm far enough. Your hand should reach past their shoulder.",
      "Sprawling is essential to finish. If you stay tight in half guard, there isn't enough space to properly lock and squeeze the choke.",
    ],
    tags: ["no-gi", "competition"],
  },

  // ── Standing in Guard (2) ───────────────────────────────

  {
    id: "sig-toreando",
    positionId: "standing-in-guard",
    name: "Toreando Pass",
    slug: "toreando-pass",
    type: "pass",
    difficulty: "intermediate",
    description:
      "Also called the bullfighter pass. After standing up in your opponent's guard and opening it, you grip both of their legs and swing them to one side — like a matador redirecting a bull — then sprint around to side control.",
    steps: [
      "After standing and opening the guard, grip both of their pants at the knees (or their ankles in no-gi).",
      "Push both of their legs to one side, stacking them on top of each other and pinning them to the mat.",
      "Sprint around to the other side, keeping downward pressure on their legs to prevent them from recovering guard.",
      "As you clear their legs, drop your chest onto them and establish side control.",
    ],
    tips: [
      "Speed is the key to this pass. The toreando is a speed pass — if you move slowly, they'll recover guard every time.",
      "Push their legs to the mat and pin them before you move your body. If you release the legs too early, their hips are free and they'll re-guard.",
      "This pass combines beautifully with the stack pass. If they resist the toreando by pulling their legs back, stack them. If they resist the stack by pushing you away, toreando.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "sig-stack-pass",
    positionId: "standing-in-guard",
    name: "Stack Pass",
    slug: "stack-pass",
    type: "pass",
    difficulty: "beginner",
    description:
      "A pressure pass where you fold your opponent in half by driving their knees toward their face, stacking their weight on their neck and shoulders. While they're compressed, you walk around their guard to pass.",
    steps: [
      "After standing and opening the guard, underhook one of their legs at the thigh and drive forward, pushing their knee toward their face.",
      "Drop your weight onto them, compressing them into a ball with their hips elevated and weight on their shoulders.",
      "While maintaining the stack pressure, walk laterally around their guard, keeping your shoulder driving into their thigh.",
      "Once you've walked past their legs, drop into side control, keeping your weight heavy.",
    ],
    tips: [
      "Keep constant forward pressure. If you relieve the stack even for a moment, they'll straighten their legs and recover guard.",
      "Walk around, don't jump. Slow, grinding steps keep the pressure on. Jumping creates space they can exploit.",
      "Be aware of the triangle and omoplata threats when you're stacking. Keep your elbows tight and don't let an arm get isolated.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Full Mount Top (5) ──────────────────────────────────

  {
    id: "fmt-armbar",
    positionId: "full-mount-top",
    name: "Armbar",
    slug: "armbar-from-mount",
    type: "submission",
    difficulty: "beginner",
    description:
      "The armbar from mount is one of the most iconic submissions in BJJ. By isolating your opponent's arm and spinning perpendicular to their body, you hyperextend their elbow joint for the tap. Mount gives you gravity as an ally.",
    steps: [
      "From high mount, isolate one of your opponent's arms by pinning their wrist to the mat with both hands or trapping it against your body.",
      "Plant your foot near their head on the side of the trapped arm and swing your other leg over their face.",
      "Sit back, clamping your knees together tightly around their upper arm. Keep the arm controlled with your hands.",
      "Pinch your knees, keep their thumb pointing up, and raise your hips to hyperextend the elbow.",
    ],
    tips: [
      "Climb to high mount before going for the armbar. Attempting it from low mount gives them too much space to escape.",
      "The biggest mistake is leaning back too fast and losing the arm. Stay tight, keep the arm glued to your chest, then slowly recline.",
      "If they lock their hands together to defend, use both hands to peel the grip or switch to a mounted triangle setup.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "fmt-americana",
    positionId: "full-mount-top",
    name: "Americana",
    slug: "americana-from-mount",
    type: "submission",
    difficulty: "beginner",
    description:
      "A shoulder lock that attacks the arm when it's pinned to the mat in an 'L' shape. From mount, you figure-four grip their wrist and elbow, then paint their hand toward their hip to torque the shoulder.",
    steps: [
      "From mount, when your opponent pushes against your chest or has their arm pinned to the mat, pin their wrist to the mat with your same-side hand.",
      "Thread your other arm under their elbow and grip your own wrist, forming a figure-four lock.",
      "Keep their elbow pinned to the mat and slowly slide their wrist toward their hip in a paint-brush motion.",
      "Apply gradual pressure to the shoulder joint by continuing the rotation. The tap comes from the shoulder torque.",
    ],
    tips: [
      "Their elbow must stay pinned to the mat. If their elbow lifts, the leverage is lost and they can straighten the arm to escape.",
      "Go slow and use your body weight, not arm strength. Lay your chest on their face and use gravity to hold position while you apply the lock.",
      "If they straighten their arm to defend the americana, immediately switch to a straight armbar.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "fmt-ezekiel",
    positionId: "full-mount-top",
    name: "Ezekiel Choke",
    slug: "ezekiel-choke-from-mount",
    type: "submission",
    difficulty: "intermediate",
    description:
      "A choke that uses the inside of your gi sleeve as a fulcrum against their throat. Named after the Brazilian judoka Ezequiel Paraguassu, it's particularly sneaky from mount because it requires very little setup.",
    steps: [
      "From mount, slide one arm under their head, gripping the inside of your own opposite sleeve.",
      "With your free hand, thread your fingers (palm down) across their throat, using the trapped sleeve as an anchor point.",
      "Close the choke by extending your bottom arm outward while pressing your top hand downward across their neck.",
      "Squeeze both arms together and drive your weight down to finish the choke.",
    ],
    tips: [
      "The Ezekiel is best used when they're defending the cross collar choke by tucking their chin. It slips under their chin defense.",
      "Keep your hips heavy throughout. If you rise up to create the choke, they'll bridge and escape.",
      "This choke can also be done in no-gi by gripping the back of your own hand instead of the sleeve, though it's less powerful.",
    ],
    tags: ["gi"],
  },
  {
    id: "fmt-cross-collar-choke",
    positionId: "full-mount-top",
    name: "Cross Collar Choke",
    slug: "cross-collar-choke-from-mount",
    type: "submission",
    difficulty: "intermediate",
    description:
      "The classic gi choke from mount. You feed both hands deep into your opponent's collar, crossing them at the wrists, and squeeze to apply a devastating blood choke using the lapels against their carotid arteries.",
    steps: [
      "From mount, open their collar with one hand and feed your other hand deep into the collar, thumb inside, until your fingers reach the tag at the back of their neck.",
      "With your free hand, open the other side of their collar and feed your second hand in, crossing over your first hand, thumb inside, going equally deep.",
      "Lower your head beside theirs to prevent them from pushing you away. Bring your elbows to the mat on either side of their head.",
      "Expand your chest and drive your wrists into the sides of their neck, squeezing the lapels against both carotid arteries.",
    ],
    tips: [
      "Depth of your grips is the single most important factor. Get your hands as deep into the collar as possible — shallow grips don't choke.",
      "Getting the first hand in is easy. Getting the second hand in is the battle. Use the threat of the armbar or Ezekiel to force them to open up.",
      "Drop your forehead to the mat beside their head once both grips are in. This prevents them from straightening their arms to create space.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "fmt-mounted-triangle",
    positionId: "full-mount-top",
    name: "Mounted Triangle",
    slug: "mounted-triangle",
    type: "submission",
    difficulty: "advanced",
    description:
      "A triangle choke applied from the mount position. By isolating one arm and threading your leg over their shoulder, you lock a triangle while maintaining the dominant top position. Extremely difficult to escape due to the combination of the choke and your top control.",
    steps: [
      "From high mount, isolate one arm by pushing it across their body or trapping it under your knee. You need one arm in, one arm out.",
      "Slide your knee on the isolated-arm side up and over their shoulder, posting your foot on the mat on the other side of their head.",
      "Swing your other leg around their neck and lock the triangle by placing the ankle into the pit of your knee.",
      "Squeeze your knees, pull their head up from the mat, and consider transitioning to your back for a tighter finish if needed.",
    ],
    tips: [
      "Set it up by attacking the armbar first. When they defend by rolling to their side and tucking the arm, that's when you slide the knee over the shoulder.",
      "You can finish this from the top or choose to roll to your back for a more traditional triangle finish. Top position is harder to finish but safer.",
      "If the triangle is loose from the top, underhook their leg and roll to your back, bringing them into your closed guard triangle for a tighter squeeze.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── S-Mount (2) ─────────────────────────────────────────

  {
    id: "sm-armbar",
    positionId: "s-mount",
    name: "Armbar from S-Mount",
    slug: "armbar-from-s-mount",
    type: "submission",
    difficulty: "intermediate",
    description:
      "The armbar from S-mount is extremely high percentage because the S-mount position already has you in the perfect configuration. One leg is already over their shoulder, so you simply lean back and extend.",
    steps: [
      "From S-mount, control the near arm (the one your leg is draped over) by gripping their wrist with both hands.",
      "Squeeze your knees tight, keeping the arm pinned between your thighs.",
      "Slowly lean back, bringing your outside leg over their face to pin their head. Keep the arm hugged to your chest.",
      "Once your back touches the mat, pinch your knees together, keep their thumb up, and raise your hips to finish the armbar.",
    ],
    tips: [
      "The S-mount armbar is so high-percentage because you don't need to spin or reposition. You're already there — just lean back.",
      "Control the far arm before you commit to the armbar. If the far hand is free, they can grip and defend.",
      "If they try to hitchhiker escape (rotating to their knees), follow their rotation and keep the arm extended. Don't let go.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "sm-triangle",
    positionId: "s-mount",
    name: "Triangle from S-Mount",
    slug: "triangle-from-s-mount",
    type: "submission",
    difficulty: "advanced",
    description:
      "A transition from S-mount to a triangle choke. Since S-mount already has one leg over the opponent's shoulder with one arm isolated, you're halfway to a triangle. Thread your other leg around their neck to complete the figure.",
    steps: [
      "From S-mount with one leg draped over their shoulder, control their far arm to prevent them from framing.",
      "Swing your outside leg around, placing it over the back of their neck.",
      "Lock the triangle by feeding your ankle into the pit of your knee on the shoulder-side leg.",
      "Choose to finish from the top or roll to your back for a tighter squeeze. Pull their head up and squeeze your thighs.",
    ],
    tips: [
      "Use the S-mount triangle as an alternative when they defend the armbar by locking their hands together.",
      "The transition from armbar attempt to triangle attempt creates a powerful chain of attacks that is very hard to defend.",
      "If you finish from the top (mounted triangle), control their hips by hooking their leg with your hand to prevent them from bridging.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Mount Bottom (3) ────────────────────────────────────

  {
    id: "mb-trap-and-roll",
    positionId: "mount-bottom",
    name: "Trap and Roll",
    slug: "trap-and-roll",
    type: "escape",
    difficulty: "beginner",
    description:
      "Also called the upa or bridge escape. The most fundamental mount escape where you trap one of your opponent's arms and their same-side foot, then bridge explosively to roll them over. You end up in their closed guard.",
    steps: [
      "From under mount, hug one of their arms by wrapping it with both of yours, pulling it tight to your chest so they can't post.",
      "On the same side, trap their foot by hooking it with your foot, preventing them from basing out during the bridge.",
      "Bridge explosively by driving your hips straight up, then turning toward the trapped side to roll them over.",
      "Follow through and come up on top in their closed guard. Immediately begin working to posture up and pass.",
    ],
    tips: [
      "Both traps (arm and foot) on the SAME side are essential. If you only trap one, they'll base with the other and stop the roll.",
      "Bridge up first, then turn. Don't try to turn sideways from the mat — you need the vertical height from the bridge to create the rolling momentum.",
      "This escape works best when they reach for a submission. When they extend an arm to attack, that's your moment to trap it and bridge.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "mb-elbow-knee",
    positionId: "mount-bottom",
    name: "Elbow-Knee Escape",
    slug: "elbow-knee-escape",
    type: "escape",
    difficulty: "beginner",
    description:
      "The shrimp escape from mount. You frame against their hip, shrimp your hips out to create space, and slip your knee through the gap to recover half guard or full guard. This is the primary technical escape from mount.",
    steps: [
      "From under mount, frame against their hip on one side with your hand and forearm. Your other hand protects your neck.",
      "Bridge slightly to create space, then shrimp (hip escape) away from the side you're framing, shooting your hips out.",
      "Slip your knee through the gap between your body and their leg, establishing at least a half guard position.",
      "Continue shrimping and working your other leg free until you recover full guard.",
    ],
    tips: [
      "Frame on the hip, never push on the chest. Pushing the chest makes them heavier. Framing on the hip lets you shrimp your hips away.",
      "You often need multiple shrimp cycles to fully recover guard. Each shrimp gains a few inches — don't get discouraged if the first one doesn't get you all the way.",
      "This escape is a marathon, not a sprint. Consistent small movements beat one explosive attempt every time.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "mb-heel-drag",
    positionId: "mount-bottom",
    name: "Heel Drag Escape",
    slug: "heel-drag-escape",
    type: "escape",
    difficulty: "intermediate",
    description:
      "An escape where you hook their ankle with your foot and drag it over your leg to establish half guard. Particularly useful when your opponent has a low mount with grapevines, making the standard shrimp escape difficult.",
    steps: [
      "From under mount (especially low mount with grapevines), use your foot to hook behind their heel on one side.",
      "Drag their foot over your leg by pulling with your hooking foot, essentially putting yourself into half guard.",
      "Once you've captured their leg in half guard, immediately frame against their hip and begin your half guard game.",
      "Work to get the underhook and establish proper half guard positioning.",
    ],
    tips: [
      "This escape is specifically designed for when they grapevine your legs. The grapevine actually makes their ankles accessible to your feet.",
      "After the heel drag, transition to your half guard game immediately. Don't just hold half guard — start working for sweeps or escapes.",
      "Combine with the elbow-knee escape: heel drag to get to half guard, then shrimp to recover full guard if needed.",
    ],
    tags: ["gi", "no-gi"],
  },

  // ── Side Control Top (4) ────────────────────────────────

  {
    id: "sct-americana",
    positionId: "side-control-top",
    name: "Americana",
    slug: "americana-from-side-control",
    type: "submission",
    difficulty: "beginner",
    description:
      "The americana (keylock) from side control. When your opponent pushes against you with their near arm, you trap the wrist, thread the figure-four, and paint the hand down toward the mat to attack the shoulder.",
    steps: [
      "From side control, when your opponent's near arm pushes against your shoulder or is flat on the mat, pin their wrist to the mat with your hand.",
      "Thread your other arm under their elbow and grip your own wrist, creating the figure-four.",
      "Keeping their elbow glued to the mat, slowly rotate their wrist toward their hip in an arc along the mat.",
      "Apply steady pressure to the shoulder until they tap. Go slow — shoulder locks can injure quickly.",
    ],
    tips: [
      "Drop your weight onto their face and upper body so they can't bridge or turn into you while you apply the lock.",
      "If they straighten the arm, immediately transition to a straight armbar. The americana and armbar chain together perfectly.",
      "Keep their elbow on the mat throughout. If the elbow lifts, you lose all your leverage.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "sct-kimura",
    positionId: "side-control-top",
    name: "Kimura",
    slug: "kimura-from-side-control",
    type: "submission",
    difficulty: "intermediate",
    description:
      "The kimura from side control top, attacking when your opponent turns to their side and exposes their far arm. You step over their head to secure the grip and apply the double wristlock.",
    steps: [
      "From side control, when your opponent turns to their side (often to shrimp), grab their far wrist with your near hand.",
      "Step over their head with your nearside leg, placing your knee near their ear to pin their head.",
      "Thread your far arm over the top of their arm and grip your own wrist to form the figure-four.",
      "Pull their arm behind their back in the paint-brush motion while keeping their elbow tight against your body.",
    ],
    tips: [
      "Stepping over the head is critical. Without the head pin, they can simply sit up and escape the kimura.",
      "If they grab their own belt or shorts, pull their elbow toward the ceiling to break the grip, then continue the rotation.",
      "The kimura from side control can also be used as a transition tool. If you can't finish it, use the grip to roll them and take north-south or mount.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "sct-arm-triangle",
    positionId: "side-control-top",
    name: "Arm Triangle",
    slug: "arm-triangle-from-side-control",
    type: "submission",
    difficulty: "intermediate",
    description:
      "Also known as the kata gatame or head-and-arm choke. You trap their arm against their neck using your arms, then squeeze to use their own shoulder as one side of the choke. A fundamental side control submission.",
    steps: [
      "From side control, push their near arm across their face by driving your shoulder into it. Their bicep should be pressed against the side of their neck.",
      "Wrap your arm around the back of their head, connecting your hands together with a gable grip or palm-to-palm grip.",
      "Walk to the choke side (the side their arm is trapped on), dropping your hip to the mat near their ear.",
      "Squeeze your elbows together and drive your shoulder into them to finish the choke. Their own shoulder compresses one carotid while your arm compresses the other.",
    ],
    tips: [
      "The walk to the choking side is essential. If you stay square, the choke is dramatically weaker. You need the angle.",
      "Get their arm high up against their neck. If their arm is across their chest instead of their face, it won't function as part of the choke.",
      "Squeeze with your elbows, not your hands. Think about bringing your elbows together rather than squeezing your forearms.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "sct-mount-transition",
    positionId: "side-control-top",
    name: "Transition to Mount",
    slug: "transition-to-mount-from-side-control",
    type: "transition",
    difficulty: "beginner",
    description:
      "Advancing from side control to mount. This is a fundamental positional advance that scores points in competition and puts you in a more dominant attacking position.",
    steps: [
      "From side control, secure the crossface and control their far hip with your other hand to prevent them from shrimping.",
      "Slide your near knee across their belly, keeping your weight distributed so they can't bridge you off.",
      "Swing your far leg over their body, placing it on the other side.",
      "Settle your weight low in mount, grapevining their legs if necessary to secure the position.",
    ],
    tips: [
      "The most common mistake is going too fast and getting caught in half guard. Slide the knee across slowly and with pressure.",
      "Control the far hip throughout the transition. If they can shrimp, they'll create the space to get a knee in and recover guard.",
      "An alternative method is the knee slide mount, where you walk your feet toward their head and step over in a more controlled fashion.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Knee on Belly (3) ───────────────────────────────────

  {
    id: "kob-far-armbar",
    positionId: "knee-on-belly",
    name: "Far Side Armbar",
    slug: "far-side-armbar-from-kob",
    type: "submission",
    difficulty: "intermediate",
    description:
      "When your opponent pushes on your knee to relieve knee-on-belly pressure, you isolate their far arm and spin into an armbar. The push is the trigger — their extended arm becomes the target.",
    steps: [
      "From knee on belly, when your opponent reaches up to push your knee off, grab their far wrist with your near hand.",
      "Step your far leg over their head, placing your foot on the mat by their ear.",
      "Spin your body to face their legs, sitting down tight next to their shoulder while keeping the arm controlled.",
      "Pinch your knees together around their upper arm and extend your hips to finish the armbar.",
    ],
    tips: [
      "This attack is reactive — wait for them to push. Forcing it without the push means you give up knee on belly for a low-percentage attack.",
      "Your spin must be tight and close to their body. If you spin wide, they'll pull the arm free during the transition.",
      "Keep the arm hugged to your chest as you spin. The moment space appears between their arm and your body, the escape opens up.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "kob-baseball-bat-choke",
    positionId: "knee-on-belly",
    name: "Baseball Bat Choke",
    slug: "baseball-bat-choke",
    type: "submission",
    difficulty: "advanced",
    description:
      "A sneaky gi choke from knee on belly where you grip the collar with both hands in a baseball bat configuration, then spin through to north-south to complete the choke. Deceptive because the grips look harmless until the spin.",
    steps: [
      "From knee on belly, get a deep cross-collar grip with your bottom hand, thumb inside the collar.",
      "With your top hand, grip the other side of the collar from the outside, thumb outside. Your grips should look like you're holding a baseball bat.",
      "Spin toward their legs, moving from knee on belly through to north-south position while maintaining both collar grips.",
      "As you settle on the other side, drop your weight and squeeze your arms together to finish the choke. The rotation tightens the collar around their neck.",
    ],
    tips: [
      "Set up the grips before you spin. If you try to get grips and spin simultaneously, they'll feel it coming and defend.",
      "The choke doesn't feel tight until you spin through. Commit to the full spin even if it doesn't feel like it's working yet.",
      "If they push your knee off, let them — but keep the grips. The spin works even better when they push because they're focused on the knee, not the hands.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "kob-mount-transition",
    positionId: "knee-on-belly",
    name: "Transition to Mount",
    slug: "transition-to-mount-from-kob",
    type: "transition",
    difficulty: "beginner",
    description:
      "Moving from knee on belly to full mount. Knee on belly is an excellent stepping stone to mount because your opponent is already carrying your weight and reacting to pressure, making the mount transition smoother.",
    steps: [
      "From knee on belly, drive your knee across their belly to force a reaction.",
      "When they push on your knee or turn away, swing your far leg over to the other side of their body.",
      "Settle your hips low into mount, transitioning your knee from their belly to the mat beside their hip.",
      "Establish your mount grips and base, grapevining if they attempt to bridge immediately.",
    ],
    tips: [
      "Use the knee-on-belly pressure as bait. Most opponents will react to the pressure by turning or pushing, creating the perfect window to transition to mount.",
      "Don't jump into mount. Slide smoothly. Jumping creates a moment of zero contact where they can scramble and recover guard.",
      "If they turn toward you to escape knee on belly, take the mount. If they turn away, consider taking the back instead.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Side Control Bottom (3) ─────────────────────────────

  {
    id: "scb-shrimp-guard-recovery",
    positionId: "side-control-bottom",
    name: "Shrimp to Guard Recovery",
    slug: "shrimp-to-guard-recovery",
    type: "escape",
    difficulty: "beginner",
    description:
      "The most fundamental side control escape. You bridge to create space, shrimp your hips away, and insert your knee between you and your opponent to recover a guard position.",
    steps: [
      "From under side control, establish frames: one forearm against their neck/jaw and one against their hip.",
      "Bridge your hips up to create momentary space between your bodies.",
      "Immediately shrimp (hip escape) your hips away from them, sliding your body out from under their pressure.",
      "Insert your bottom knee between you and your opponent, establishing at least half guard. Continue shrimping to recover full guard.",
    ],
    tips: [
      "Bridge and shrimp are two separate movements. Bridge first (straight up), then shrimp (hips away). Don't try to do both simultaneously.",
      "You'll likely need 2-3 shrimp cycles to fully recover guard. Each one gains a few inches of space.",
      "Frame on their hip, not their chest. The hip frame prevents them from following your shrimp, while a chest frame just makes them heavier.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "scb-underhook-escape",
    positionId: "side-control-bottom",
    name: "Underhook Escape to Knees",
    slug: "underhook-escape-to-knees",
    type: "escape",
    difficulty: "intermediate",
    description:
      "An alternative side control escape where instead of recovering guard, you get an underhook, come up to your knees, and establish a wrestling-based position. Particularly useful in no-gi where guard retention is harder.",
    steps: [
      "From under side control, frame against their hip and bridge to create space.",
      "Pummel your near arm inside, fighting for an underhook on their far side.",
      "Once you have the underhook, drive your head into their chest and start coming up to your knees.",
      "Come up to a double-under or single-under wrestling position, and work to either take them down or disengage to your feet.",
    ],
    tips: [
      "The underhook must be deep — reach for their far lat or shoulder blade. A shallow underhook gets easily pummeled out.",
      "Drive your head into the center of their chest as you rise. If your head is on the outside, they'll push you back down with a crossface.",
      "This escape works especially well when they're not using the crossface. If they have a tight crossface, the guard recovery may be a better first option.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "scb-ghost-escape",
    positionId: "side-control-bottom",
    name: "Ghost Escape",
    slug: "ghost-escape",
    type: "escape",
    difficulty: "advanced",
    description:
      "An advanced escape where you turn away from your opponent, create a frame, and slide out the back door by pulling your body through the gap between you and the mat. Called the ghost escape because you seemingly disappear from under them.",
    steps: [
      "From under side control, frame against their hip and turn to face away from them, getting on your side.",
      "Create space by bridging and begin sliding your bottom arm and head through the gap between your body and the mat, moving toward their legs.",
      "Continue threading your body through, pulling your hips out from under their chest.",
      "Once you've cleared their pressure, turn back to face them and either recover guard or come up to a scramble position.",
    ],
    tips: [
      "This escape requires your opponent to be committed to a high crossface or head position. If they're controlling your hips, the standard shrimp escape is better.",
      "You must commit to turning away. Halfway measures leave you in a worse position. Once you start, follow through completely.",
      "The ghost escape is risky because turning away can expose your back. Be ready to defend the back take if they react quickly.",
    ],
    tags: ["no-gi"],
  },

  // ── Back Mount (4) ──────────────────────────────────────

  {
    id: "bm-rnc",
    positionId: "back-mount",
    name: "Rear Naked Choke",
    slug: "rear-naked-choke",
    type: "submission",
    difficulty: "beginner",
    description:
      "The king of submissions. The rear naked choke (RNC) is applied from back control by sliding your arm under their chin, gripping your bicep, and squeezing. It's the highest-percentage finish in MMA and submission grappling because there's no gi required and the opponent can't see it coming.",
    steps: [
      "From back control with seatbelt grip, fight to slide your choking arm (the over-the-shoulder arm) under their chin.",
      "Once your forearm is under their chin, place your choking hand on your opposite bicep.",
      "Place the hand of your supporting arm behind their head, creating a closed triangle with your arms.",
      "Squeeze your elbows together while expanding your chest, driving the back of their head forward with your rear hand to finish.",
    ],
    tips: [
      "Getting under the chin is 90% of the battle. Use your other hand to peel their chin-defending hands away, or attack from the side and slide under.",
      "Don't reach for the chin with a straight arm — they'll grab it and defend. Keep your elbow tight and slide it in gradually.",
      "Squeeze with your whole body, not just your arms. Expand your chest, squeeze your elbows, and drive their head forward with your back hand.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bm-bow-and-arrow",
    positionId: "back-mount",
    name: "Bow and Arrow Choke",
    slug: "bow-and-arrow-choke",
    type: "submission",
    difficulty: "intermediate",
    description:
      "A gi choke from back control that is considered one of the tightest chokes in all of BJJ. You grip their collar and their far leg, then extend your body like a bow, using the collar to crush their neck.",
    steps: [
      "From back control, feed your top hand deep into their collar on the choking side, getting a deep cross-collar grip.",
      "With your bottom hand, reach down and grab their far pant leg near the knee.",
      "Extend your top leg over their shoulder on the collar-grip side, placing your foot on the mat.",
      "Pull the collar with one hand and the pant leg with the other, stretching them like a bow. Simultaneously extend your legs to increase the pressure.",
    ],
    tips: [
      "The collar grip must be extremely deep. Feed your hand past their collar bone — the deeper the grip, the tighter the choke.",
      "Grabbing the pant leg prevents them from turning into you, which is their primary escape. Without this control, they'll simply rotate and escape.",
      "The bow and arrow should feel like you're making an arc with their body. Your arms pull in opposite directions while your legs extend.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "bm-armbar",
    positionId: "back-mount",
    name: "Armbar from Back",
    slug: "armbar-from-back",
    type: "submission",
    difficulty: "intermediate",
    description:
      "An armbar applied from back control. When your opponent defends the choke by protecting their neck with both hands, their arms become exposed for armbar attacks. You rotate your body and isolate the arm for the submission.",
    steps: [
      "From back control, when your opponent grips their own collar or defends their neck with both hands, isolate one arm by controlling their wrist with both of your hands.",
      "Shift your hips to the side of the arm you're attacking, rotating your body to create the armbar angle.",
      "Throw your top leg over their face, keeping the arm trapped between your thighs.",
      "Extend your hips and squeeze your knees to finish the armbar. Keep the arm tight to your chest throughout.",
    ],
    tips: [
      "The armbar from the back works best as a combination with the choke. Attack the neck, and when they bring both hands up to defend, attack the arm.",
      "Maintain at least one hook throughout the transition. Losing both hooks means they can escape before you complete the armbar.",
      "If they try to turn into you during the armbar, switch back to the choke. This choke-armbar cycle is extremely effective from the back.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bm-mount-transition",
    positionId: "back-mount",
    name: "Transition to Mount",
    slug: "transition-to-mount-from-back",
    type: "transition",
    difficulty: "intermediate",
    description:
      "When your opponent successfully clears your hooks and starts escaping your back control, you transition to mount rather than losing the position entirely. This is an essential skill because it converts a deteriorating position into another dominant one.",
    steps: [
      "When your opponent starts clearing your hooks and turning their back to the mat, don't fight to keep back control.",
      "As they flatten to the mat, use your seatbelt grip to keep your chest connected to theirs.",
      "Swing your legs over their body, transitioning from back control to mount as they turn face-up.",
      "Settle into mount, adjusting your grips from the seatbelt to standard mount control positions.",
    ],
    tips: [
      "Don't wait until you've lost back control completely. Start transitioning to mount the moment you feel your hooks being cleared.",
      "The seatbelt grip is your anchor during this transition. Keep it tight as they turn and only release once mount is established.",
      "This transition is better than stubbornly fighting for hooks. A smooth mount transition beats desperately trying to re-hook a nearly escaped opponent.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Back Defense (3) ────────────────────────────────────

  {
    id: "bd-shoulder-walk",
    positionId: "back-defense",
    name: "Shoulder Walk Escape",
    slug: "shoulder-walk-escape",
    type: "escape",
    difficulty: "intermediate",
    description:
      "A systematic back escape where you walk your shoulders to the mat on the choking-arm side, clearing hooks and pinning their back to the ground. You end up in their guard or side control.",
    steps: [
      "Protect your neck by gripping the choking arm with both hands, keeping your chin tucked tight.",
      "Identify which arm is the choking arm (over the shoulder). Begin walking your shoulders to the mat on that side.",
      "Clear the bottom hook first by pushing their foot off with your hands, then clear the top hook.",
      "Once both hooks are clear, pin their back to the mat by driving your weight onto them. You should end up in their guard or side control.",
    ],
    tips: [
      "Always escape toward the choking arm side (the arm over your shoulder). Escaping the other way gives them a deeper choke.",
      "Clear the bottom hook first, then the top. Reversing this order often gets you caught in a body triangle.",
      "Be patient. This escape is methodical, not explosive. Rushing leads to mistakes and getting choked.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bd-hand-fighting",
    positionId: "back-defense",
    name: "Hand Fighting Escape",
    slug: "hand-fighting-escape",
    type: "escape",
    difficulty: "beginner",
    description:
      "The first line of defense when someone has your back: grip fighting to prevent the choke. By controlling their hands and wrists, you prevent them from sinking in a choke while you work on clearing hooks and escaping.",
    steps: [
      "Immediately control the choking hand with a two-on-one grip (both your hands on their one wrist), preventing them from getting under your chin.",
      "Peel their choking hand away from your neck, pulling it down toward your chest while maintaining the two-on-one.",
      "Once the choke threat is neutralized, begin working to clear their hooks — start with the bottom hook.",
      "As you clear hooks, continue to control their choking hand and work to turn into them or slide your back to the mat.",
    ],
    tips: [
      "The two-on-one on the choking hand is your survival grip. Never let go of it to do something else until the choke threat is gone.",
      "Fight the hands, not the hooks. Beginners often try to remove hooks while ignoring the hands — this gets them choked. Hands first, hooks second.",
      "Stay calm and breathe. Back control is scary, but panicking wastes energy. Methodical hand fighting is far more effective than thrashing.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "bd-guard-recovery",
    positionId: "back-defense",
    name: "Counter to Guard Recovery",
    slug: "counter-to-guard-recovery",
    type: "escape",
    difficulty: "intermediate",
    description:
      "A proactive escape where you clear hooks and immediately transition to guard rather than just getting free. By framing and shrimping as you clear hooks, you can end up in a full guard position in one smooth motion.",
    steps: [
      "Control the choking hand with your two-on-one grip and begin clearing the bottom hook with your free hand or foot.",
      "As you clear the bottom hook, immediately shrimp your hips away and start turning to face your opponent.",
      "Clear the top hook as you turn, sliding your knee in front of their body to establish a frame.",
      "Complete the turn to face them fully, recovering closed guard or half guard around their body.",
    ],
    tips: [
      "Combine the hook clearance with the hip escape. Don't just remove hooks and sit there — shrimp and turn simultaneously.",
      "The goal is not just to escape back control but to recover a guard position. Escaping to a scramble where they can re-take the back is counterproductive.",
      "Practice this as one fluid motion: clear hook, shrimp, turn, recover guard. Four actions, one smooth movement.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Turtle Top (3) ──────────────────────────────────────

  {
    id: "tt-seatbelt-hooks",
    positionId: "turtle-top",
    name: "Seatbelt to Hook Entry",
    slug: "seatbelt-to-hook-entry",
    type: "transition",
    difficulty: "intermediate",
    description:
      "The fundamental method of taking the back from turtle position. You establish the seatbelt grip (one arm over their shoulder, one under their arm), then methodically insert your hooks to achieve full back control.",
    steps: [
      "From behind the turtled opponent, establish the seatbelt grip: one arm over their shoulder across their chest, the other arm under their armpit, hands connected.",
      "Drop your chest onto their back, keeping your weight heavy and driving them forward slightly.",
      "Insert your first hook (bottom hook) on the seatbelt's underhook side by sliding your foot between their legs.",
      "Roll them to the hook side, pulling them onto their side and inserting your second hook to complete full back mount.",
    ],
    tips: [
      "Always get the seatbelt before the hooks. The seatbelt is your connection; hooks without the seatbelt means they can just stand up and you slide off.",
      "Insert the bottom hook first. If you try the top hook first, they can easily defend by flattening that direction.",
      "When rolling them to insert the second hook, pull them toward the underhook side of the seatbelt for the smoothest transition.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "tt-clock-choke",
    positionId: "turtle-top",
    name: "Clock Choke",
    slug: "clock-choke",
    type: "submission",
    difficulty: "intermediate",
    description:
      "A gi choke applied from behind a turtled opponent. You grip their far collar and walk your body around their head like the hands of a clock, using the collar to compress their neck.",
    steps: [
      "From behind the turtle, reach under their chin and grip their far collar, getting as deep as possible.",
      "Place your near-side knee against their hip, preventing them from rolling away.",
      "Begin walking your body around their head in an arc, keeping the collar grip tight. Your legs walk in a circle like clock hands.",
      "As you walk, the collar tightens around their neck. Continue until they tap from the compression.",
    ],
    tips: [
      "Grip depth is everything. If your grip is shallow, walking around will just drag them but not choke them.",
      "Keep your hip connected to their body throughout the walk. If you create space, they can roll out.",
      "The choke gets tighter as you walk past the 12 o'clock position (directly in front of their head). Commit to walking all the way around.",
    ],
    tags: ["gi", "competition"],
  },
  {
    id: "tt-snap-down",
    positionId: "turtle-top",
    name: "Snap Down to Front Headlock",
    slug: "snap-down-to-front-headlock",
    type: "transition",
    difficulty: "beginner",
    description:
      "A wrestling-based technique where you snap down on the turtled opponent's head to flatten them and secure a front headlock. From the front headlock, you have access to guillotines, D'Arce chokes, and anaconda chokes.",
    steps: [
      "From behind the turtle, grip behind their neck with one hand and their far arm with the other.",
      "Apply downward pressure on their neck while pulling their arm, snapping them forward onto their belly.",
      "As they flatten, circle to their head and secure a front headlock position — your arm wraps around their neck with your chest on their back.",
      "From the front headlock, choose your attack: guillotine, D'Arce, anaconda, or simply spin behind for back control.",
    ],
    tips: [
      "The snap must be sharp and unexpected. A slow, grinding push gives them time to base out and resist.",
      "Once you have the front headlock, immediately get your hips low and sprawl your legs back. If you stay upright, they can shoot on your legs.",
      "The front headlock is a position, not just a grip. Settle into it and choose your attack rather than rushing a sloppy choke.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Turtle Bottom (2) ───────────────────────────────────

  {
    id: "tb-granby-roll",
    positionId: "turtle-bottom",
    name: "Granby Roll to Guard",
    slug: "granby-roll-to-guard",
    type: "escape",
    difficulty: "intermediate",
    description:
      "A dynamic inversion from turtle where you roll over your shoulder and come up facing your opponent in a guard position. Named after the Granby wrestling technique, it's an effective way to recover guard when turtled.",
    steps: [
      "From turtle bottom, tuck your chin and pick a direction to roll (away from your opponent's weight distribution).",
      "Roll over your near shoulder, inverting your body in a tight somersault motion, keeping your legs tucked.",
      "As you complete the roll, extend your legs toward your opponent, establishing butterfly guard or open guard hooks.",
      "Immediately secure grips and start your guard game before they can react to the scramble.",
    ],
    tips: [
      "The roll must be tight and compact. A loose, sprawling roll is slow and easy to follow. Tuck everything and roll like a ball.",
      "Roll away from where their weight is. If they're heavy on your right side, roll to your left.",
      "Timing is everything. Execute the roll before they fully establish their grips. Once they have the seatbelt locked, the granby becomes much harder.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "tb-sit-out",
    positionId: "turtle-bottom",
    name: "Sit-Out Escape",
    slug: "sit-out-escape",
    type: "escape",
    difficulty: "beginner",
    description:
      "A wrestling-based escape from turtle where you sit through and turn to face your opponent. By kicking your leg through and turning, you create space and end up in a front-facing position.",
    steps: [
      "From turtle bottom, post one hand firmly on the mat and prepare to kick the same-side leg through.",
      "In one explosive motion, kick that leg through while turning your body toward the posting hand.",
      "Sit through completely, sliding your hip to the mat and turning to face your opponent.",
      "Establish a guard position or use the momentum to come up to your knees for a wrestling exchange.",
    ],
    tips: [
      "The sit-out must be explosive. A slow sit-out gets stopped because they can follow your movement and maintain control.",
      "Clear their grip on that side before sitting out. If they have a tight seatbelt, the sit-out won't work.",
      "Post your hand wide for a bigger arc on the sit-through. A narrow post limits your range of motion.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },

  // ── Clinch (3) ──────────────────────────────────────────

  {
    id: "cl-double-leg",
    positionId: "clinch",
    name: "Double Leg Takedown",
    slug: "double-leg-takedown",
    type: "takedown",
    difficulty: "beginner",
    description:
      "The most fundamental wrestling takedown adapted for BJJ. You change levels, shoot your hips between their legs, grab both of their legs, and drive through them to take them to the mat.",
    steps: [
      "From the clinch or open distance, set up the shot with a jab, arm drag, or level change to get their hands up.",
      "Shoot forward, dropping your level by bending your knees (not your back). Drive your lead knee between their feet.",
      "Wrap both arms around their thighs, clasping your hands behind their legs. Drive your shoulder into their midsection.",
      "Cut the corner by stepping to one side and driving through, taking them to the mat. Land in side control or inside their guard.",
    ],
    tips: [
      "Change levels BEFORE you shoot. If you shoot from standing height, they'll see it coming and sprawl.",
      "Drive with your legs, not your upper body. The power of the takedown comes from your hips and legs pushing forward.",
      "In BJJ, be aware of the guillotine when shooting the double leg. Keep your head up and on the inside of their body to avoid getting your neck caught.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cl-single-leg",
    positionId: "clinch",
    name: "Single Leg Takedown",
    slug: "single-leg-takedown",
    type: "takedown",
    difficulty: "beginner",
    description:
      "A takedown where you grab one of your opponent's legs and use it as a lever to take them down. More versatile than the double leg because you can set it up from more positions and finish in multiple ways.",
    steps: [
      "From the clinch, change levels and shoot toward one of their legs. Wrap both arms around their thigh, gripping behind the knee.",
      "Drive your head into their chest or ribs on the outside of the captured leg. Stand up with the leg, lifting it off the mat.",
      "Step to the outside of their supporting leg while driving forward with your shoulder.",
      "Take them to the mat by either running the pipe (driving forward), tripping their supporting leg, or lifting and dumping.",
    ],
    tips: [
      "Keep your head on the outside (away from their body). Head on the inside risks the guillotine choke.",
      "Once you have the leg, stand tall with it. The higher you lift their leg, the more unstable they become on one foot.",
      "If they hop away to defend, keep driving forward. They can only hop for so long before they go down.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "cl-collar-drag",
    positionId: "clinch",
    name: "Collar Drag",
    slug: "collar-drag",
    type: "takedown",
    difficulty: "beginner",
    description:
      "A BJJ-specific takedown where you grip the collar and drag your opponent past you, ending up behind them. Similar to an arm drag but using the collar for leverage. Simple, effective, and requires very little athleticism.",
    steps: [
      "From standing, grip their collar on one side with a deep grip behind their neck.",
      "With your other hand, control their arm on the same side at the elbow or tricep.",
      "Pull the collar while pushing their arm, dragging them past your body in a circular motion.",
      "As they stumble past you, circle behind them and secure a body lock or take them down to turtle, immediately attacking for back control.",
    ],
    tips: [
      "The collar drag works best when they're pushing into you. Use their forward pressure to redirect them past you.",
      "Step off the line as you drag. Don't just pull them forward — move your body laterally so they go past you, not into you.",
      "In no-gi, this becomes a standard arm drag. The mechanics are the same, but you grip their wrist and tricep instead of the collar.",
    ],
    tags: ["gi", "competition"],
  },

  // ── Open Distance (2) ──────────────────────────────────

  {
    id: "od-guard-pull",
    positionId: "open-distance",
    name: "Guard Pull",
    slug: "guard-pull",
    type: "transition",
    difficulty: "beginner",
    description:
      "A BJJ-specific technique where you deliberately sit to the mat and establish a guard position. While not a takedown, guard pulling is a fundamental way to start a match if you prefer to play guard rather than wrestle for a takedown.",
    steps: [
      "From standing, establish strong grips: collar and sleeve in gi, or collar tie and wrist in no-gi.",
      "Step your lead foot onto their hip, using it as a platform.",
      "Sit down to the mat in a controlled manner, pulling them into your guard using your grips.",
      "Immediately establish your preferred guard — closed guard, De La Riva, or butterfly — and begin your bottom game.",
    ],
    tips: [
      "Never pull guard without grips. A guard pull without grips is just sitting down, and you'll get passed immediately.",
      "The foot on the hip is essential for a controlled descent. Without it, you crash to the mat and they can immediately start passing.",
      "In competition, be aware of the rules. Some rulesets penalize guard pulls, and double guard pulls can result in penalties.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
  {
    id: "od-ankle-pick",
    positionId: "open-distance",
    name: "Ankle Pick",
    slug: "ankle-pick-standing",
    type: "takedown",
    difficulty: "intermediate",
    description:
      "A low-risk takedown where you snap down on your opponent's head to get them to step forward, then pick up their lead ankle to take them to the mat. Popular in BJJ because it exposes you to very little risk compared to a wrestling shot.",
    steps: [
      "From standing, establish a collar tie or collar grip with one hand, controlling their posture.",
      "Snap their head down sharply, causing them to step their lead foot forward to catch their balance.",
      "As they step forward, drop your free hand to grab their lead ankle while continuing to snap their head down.",
      "Lift the ankle while pushing them backward with your collar tie. They'll sit to the mat with you on top.",
    ],
    tips: [
      "The snap down is the setup. Without a convincing snap, they won't step forward and the ankle won't be available.",
      "Time the pick with their step. You need to grab the ankle as the foot is planted and weight-bearing, not when it's in the air.",
      "This takedown is low risk because you never need to drop below their hips, minimizing the chance of getting caught in a guillotine or sprawled on.",
    ],
    tags: ["gi", "no-gi", "competition"],
  },
];
