// BJJ Technique Reference Library
// Categorized list of 50+ common techniques

export const TECHNIQUE_CATEGORIES = [
  { id: "guard", label: "Guard", icon: "Shield" },
  { id: "passing", label: "Passing", icon: "ArrowRightCircle" },
  { id: "submissions", label: "Submissions", icon: "Target" },
  { id: "sweeps", label: "Sweeps", icon: "RefreshCw" },
  { id: "takedowns", label: "Takedowns", icon: "ArrowDownCircle" },
  { id: "escapes", label: "Escapes", icon: "Unlock" },
  { id: "control", label: "Control & Pins", icon: "Lock" },
  { id: "back", label: "Back Attacks", icon: "Crosshair" },
];

export const TECHNIQUES = [
  // === GUARD ===
  { id: "t001", name: "Closed Guard Retention", category: "guard", belt: "white", notes: "Hip movement, angle creation, break posture" },
  { id: "t002", name: "Half Guard Underhook", category: "guard", belt: "white", notes: "Get the underhook, come to knees, take the back or sweep" },
  { id: "t003", name: "De La Riva Guard", category: "guard", belt: "blue", notes: "DLR hook with sleeve and ankle grip. Key: hip angle" },
  { id: "t004", name: "Spider Guard", category: "guard", belt: "blue", notes: "Bicep control with feet, lasso variations" },
  { id: "t005", name: "Butterfly Guard", category: "guard", belt: "white", notes: "Hooks in, overhook/underhook, elevate and sweep" },
  { id: "t006", name: "X-Guard", category: "guard", belt: "purple", notes: "Entry from single leg X or butterfly. Sweep by extending legs" },
  { id: "t007", name: "Rubber Guard", category: "guard", belt: "blue", notes: "Mission control → zombie → dead orchard/gogoplata" },
  { id: "t008", name: "Lasso Guard", category: "guard", belt: "blue", notes: "Deep lasso wrap around bicep, control distance" },
  { id: "t009", name: "Single Leg X (SLX)", category: "guard", belt: "blue", notes: "Inside hook on hip, outside hook behind knee. Heel hook territory" },
  { id: "t010", name: "Reverse De La Riva", category: "guard", belt: "purple", notes: "RDLR hook, knee shield, berimbolo entry" },
  { id: "t011", name: "Worm Guard", category: "guard", belt: "brown", notes: "Lapel wrap around leg, multiple sweep and submission options" },
  { id: "t012", name: "50/50 Guard", category: "guard", belt: "purple", notes: "Mirrored leg entanglement. Heel hook entries, sweep options" },

  // === PASSING ===
  { id: "t013", name: "Torreando Pass", category: "passing", belt: "white", notes: "Grip both knees/pants, push legs to one side, circle to side control" },
  { id: "t014", name: "Knee Slice / Knee Cut", category: "passing", belt: "white", notes: "Slide knee through, underhook far arm, flatten them out" },
  { id: "t015", name: "Over/Under Pass", category: "passing", belt: "blue", notes: "One arm over leg, one under. Pressure pass, walk hips around" },
  { id: "t016", name: "Leg Drag", category: "passing", belt: "blue", notes: "Drag ankle across centerline to hip, pin with knee pressure" },
  { id: "t017", name: "Stack Pass", category: "passing", belt: "white", notes: "Drive legs over their head, walk around. Pressure-based" },
  { id: "t018", name: "Long Step Pass", category: "passing", belt: "blue", notes: "From combat base, long step over guard, establish side control" },
  { id: "t019", name: "Smash Pass", category: "passing", belt: "blue", notes: "Half guard: crossface + shoulder pressure, free trapped leg" },
  { id: "t020", name: "Body Lock Pass", category: "passing", belt: "purple", notes: "Lock hands around waist, hip switch, heavy pressure passing" },

  // === SUBMISSIONS ===
  { id: "t021", name: "Rear Naked Choke (RNC)", category: "submissions", belt: "white", notes: "Choking arm under chin, lock with other arm. Squeeze elbows" },
  { id: "t022", name: "Armbar from Guard", category: "submissions", belt: "white", notes: "Control wrist, hip up, swing leg over face, squeeze knees" },
  { id: "t023", name: "Triangle Choke", category: "submissions", belt: "white", notes: "One arm in, one out. Lock figure-four with legs, angle off, squeeze" },
  { id: "t024", name: "Guillotine", category: "submissions", belt: "white", notes: "Chin strap grip, close guard, hip up. Arm-in vs no-arm variations" },
  { id: "t025", name: "Kimura", category: "submissions", belt: "white", notes: "Figure-four grip on wrist. Paintbrush behind back" },
  { id: "t026", name: "Americana / Keylock", category: "submissions", belt: "white", notes: "Figure-four grip, push wrist to mat toward their hip" },
  { id: "t027", name: "Ezekiel Choke", category: "submissions", belt: "blue", notes: "Sleeve grip, thread hand under chin. Works from mount and guard" },
  { id: "t028", name: "Cross Collar Choke", category: "submissions", belt: "white", notes: "Deep collar grips, palms up, pull elbows down" },
  { id: "t029", name: "Brabo Choke", category: "submissions", belt: "blue", notes: "Arm triangle from front headlock. Thread arm under neck and armpit" },
  { id: "t069", name: "Head and Arm Triangle", category: "submissions", belt: "white", notes: "Arm triangle from side control. Lock figure-four around head and arm, squeeze" },
  { id: "t030", name: "Anaconda Choke", category: "submissions", belt: "blue", notes: "Like D'Arce but opposite arm threading. Gator roll to finish" },
  { id: "t031", name: "North-South Choke", category: "submissions", belt: "blue", notes: "From north-south, wrap arm around neck, drop hip, squeeze" },
  { id: "t032", name: "Omoplata", category: "submissions", belt: "blue", notes: "Shoulder lock using legs. Control wrist, sit up, lean forward" },
  { id: "t033", name: "Heel Hook (Inside)", category: "submissions", belt: "purple", notes: "Control ashi garami, grip heel, rotate. Very dangerous — tap early" },
  { id: "t034", name: "Heel Hook (Outside)", category: "submissions", belt: "purple", notes: "From 50/50 or outside ashi. Grip heel, external rotation" },
  { id: "t035", name: "Straight Ankle Lock", category: "submissions", belt: "white", notes: "Ashi garami, blade of wrist on Achilles, arch back" },
  { id: "t036", name: "Toe Hold", category: "submissions", belt: "blue", notes: "Figure-four grip on foot, twist toward their butt" },
  { id: "t037", name: "Kneebar", category: "submissions", belt: "blue", notes: "Hips on thigh, control foot, extend hips. Hyperextends knee" },
  { id: "t038", name: "Bow & Arrow Choke", category: "submissions", belt: "blue", notes: "From back, deep collar grip + grab far knee. Extend and pull" },
  { id: "t039", name: "Gogoplata", category: "submissions", belt: "purple", notes: "Shin across throat from rubber guard. Pull head down" },
  { id: "t040", name: "Baseball Bat Choke", category: "submissions", belt: "blue", notes: "Cross collar grips like holding a bat. Roll to finish from knee on belly" },

  // === SWEEPS ===
  { id: "t041", name: "Scissor Sweep", category: "sweeps", belt: "white", notes: "Collar + sleeve grip, shin across belly, kick and pull" },
  { id: "t042", name: "Hip Bump Sweep", category: "sweeps", belt: "white", notes: "Post on hand, bump hips up into opponent, come to top" },
  { id: "t043", name: "Flower Sweep (Pendulum)", category: "sweeps", belt: "white", notes: "Underhook leg, swing pendulum leg, roll them over" },
  { id: "t044", name: "Butterfly Sweep", category: "sweeps", belt: "white", notes: "Overhook + underhook, elevate with hook, fall to side" },
  { id: "t045", name: "Berimbolo", category: "sweeps", belt: "purple", notes: "Invert from DLR, roll under, take the back" },
  { id: "t046", name: "Overhead Sweep", category: "sweeps", belt: "blue", notes: "From butterfly, grip collar + sleeve, extend legs overhead" },

  // === TAKEDOWNS ===
  { id: "t047", name: "Double Leg Takedown", category: "takedowns", belt: "white", notes: "Level change, penetration step, drive through. Head on hip" },
  { id: "t048", name: "Single Leg Takedown", category: "takedowns", belt: "white", notes: "Grab one leg, head on chest side. Trip, run the pipe, or dump" },
  { id: "t049", name: "Osoto Gari", category: "takedowns", belt: "white", notes: "Judo throw: reap outside leg while driving upper body back" },
  { id: "t050", name: "Arm Drag to Back", category: "takedowns", belt: "white", notes: "2-on-1 grip, yank arm across, circle to back" },
  { id: "t051", name: "Tomoe Nage (Sacrifice)", category: "takedowns", belt: "blue", notes: "Fall back, foot on hip, throw them overhead" },
  { id: "t052", name: "Seoi Nage", category: "takedowns", belt: "blue", notes: "Turn in, load onto back/hip, throw over shoulder" },
  { id: "t053", name: "Guard Pull to Sweep", category: "takedowns", belt: "blue", notes: "Controlled guard pull with immediate sweep attempt" },

  // === ESCAPES ===
  { id: "t054", name: "Bridge & Roll (Mount Escape)", category: "escapes", belt: "white", notes: "Trap arm + foot same side, bridge and roll to guard" },
  { id: "t055", name: "Elbow-Knee Escape (Shrimp)", category: "escapes", belt: "white", notes: "Frame, hip escape, insert knee, recover guard" },
  { id: "t056", name: "Side Control Escape to Guard", category: "escapes", belt: "white", notes: "Frame on neck + hip, shrimp out, re-guard" },
  { id: "t057", name: "Back Escape (Shoulder Walk)", category: "escapes", belt: "white", notes: "Fight hands, shoulder walk to mat, escape hips over hook" },
  { id: "t058", name: "Turtle Escape (Sit Out)", category: "escapes", belt: "white", notes: "From turtle, sit out and turn into opponent" },

  // === CONTROL & PINS ===
  { id: "t059", name: "Side Control (Cross-Side)", category: "control", belt: "white", notes: "Underhook head + far arm. Hip pressure, chest-to-chest" },
  { id: "t060", name: "Mount", category: "control", belt: "white", notes: "High mount vs low mount. Grapevine legs, posture up for attacks" },
  { id: "t061", name: "Knee on Belly", category: "control", belt: "white", notes: "Knee on solar plexus, grip collar + far knee. Pressure points" },
  { id: "t062", name: "North-South", category: "control", belt: "blue", notes: "Chest on chest, sprawl hips. Kimura and choke setups" },
  { id: "t063", name: "Kesa Gatame", category: "control", belt: "blue", notes: "Head and arm control, hip pressure. Judo-style pin" },

  // === BACK ATTACKS ===
  { id: "t064", name: "Seat Belt Control", category: "back", belt: "white", notes: "Over-under grip on chest. Hooks in or body triangle" },
  { id: "t065", name: "Body Triangle", category: "back", belt: "blue", notes: "Lock legs in triangle around torso. Superior back control" },
  { id: "t066", name: "Chair Sit Back Take", category: "back", belt: "blue", notes: "From turtle, hook near leg, sit back, insert second hook" },
  { id: "t067", name: "Truck Position", category: "back", belt: "purple", notes: "Lockdown on near leg, twister hook. Calf slicer and twister options" },
  { id: "t068", name: "Armbar from Back", category: "back", belt: "blue", notes: "When defending RNC, isolate arm, rotate to armbar" },
];

export const SESSION_TYPES = ["Gi", "No-Gi", "Open Mat", "Seminar", "Drilling", "Competition"];

export const BELT_COLORS = {
  white:  { bg: "#f5f5f5", text: "#1a1a1a" },
  blue:   { bg: "#3b82f6", text: "#ffffff" },
  purple: { bg: "#8b5cf6", text: "#ffffff" },
  brown:  { bg: "#92400e", text: "#ffffff" },
  black:  { bg: "#09090b", text: "#ffffff" },
};
