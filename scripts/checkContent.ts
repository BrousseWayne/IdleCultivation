import { validateContent } from "@/game/data/validateContent";
import { activityData } from "@/game/data/activity";
import { places } from "@/game/data/places";
import { eventData } from "@/game/data/events";

// `npm run check:content` — the boot-time integrity check, runnable headlessly
// (pre-commit, CI, or just for peace of mind after an authoring session).

const errors = validateContent();

if (errors.length > 0) {
  console.error(`✗ invalid game content (${errors.length} error${errors.length > 1 ? "s" : ""}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `✓ content OK — ${activityData.length} activities, ${places.length} places, ${eventData.length} events`
);
