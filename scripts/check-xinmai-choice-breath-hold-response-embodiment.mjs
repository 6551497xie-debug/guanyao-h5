import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const gravity = read("src/pages/GravityPage.tsx");
const styles = read("src/styles/xinmai-choice-breath-hold-response.css");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  gravity,
  'data-choice-breath-duration-ms="1800"',
  "Choice must require one deliberate breath hold.",
);
requireSource(
  gravity,
  'data-choice-embodiment="USER_BODY_STAYS_WITH_LIFE_BODY"',
  "The user's bodily participation must remain with the same life body.",
);
requireSource(
  gravity,
  'data-choice-click-confirm="FORBIDDEN"',
  "A single click must not confirm the new response.",
);
requireSource(
  gravity,
  "onPointerDown",
  "Touch and pointer users need a press-and-hold entrance.",
);
requireSource(
  gravity,
  "onPointerUp={releaseBreathHold}",
  "Releasing before the breath ends must be observable.",
);
requireSource(
  gravity,
  "onPointerCancel={releaseBreathHold}",
  "Cancelled touch gestures must not complete Choice.",
);
requireSource(
  gravity,
  "onKeyDown",
  "Keyboard users need an equivalent held response.",
);
requireSource(
  gravity,
  "onKeyUp",
  "Keyboard release must preserve the same early-release boundary.",
);
requireSource(
  gravity,
  '"RELEASED_EARLY"',
  "Early release must return to stillness instead of claiming completion.",
);
requireSource(
  gravity,
  "按住生命核心 · 陪它完成一次呼吸",
  "The interaction must be framed as accompanying life, not submitting an answer.",
);
requireSource(
  styles,
  ".gy-choice-breath-hold__progress",
  "The breath hold needs a restrained visible duration trace.",
);
requireSource(
  styles,
  "1.8s linear",
  "The visual duration must match the held interaction.",
);

if (gravity.includes("onClick={onConfirm}")) {
  throw new Error("A legacy single-click Choice confirmation is still exposed.");
}

for (const forbidden of [
  "长按成功",
  "挑战完成",
  "正确回应",
  "奖励",
  "蓄力",
]) {
  if (gravity.includes(forbidden) || styles.includes(forbidden)) {
    throw new Error(`Forbidden embodied Choice language detected: ${forbidden}`);
  }
}

console.log("XINMAI Choice breath-hold response embodiment gate: PASS");
